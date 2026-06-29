import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

/* ─────────────────────────────────────────────────────────────────────────
   1. RATE LIMITER  — 3 submissions per IP per hour (in-memory, per instance)
   ───────────────────────────────────────────────────────────────────────── */
const rateLimitMap = new Map()
const LIMIT  = 3
const WINDOW = 60 * 60 * 1000

function isRateLimited(ip) {
  const now = Date.now()
  let rec = rateLimitMap.get(ip)
  if (!rec || now > rec.resetAt) rec = { count: 0, resetAt: now + WINDOW }
  rec.count++
  rateLimitMap.set(ip, rec)
  return rec.count > LIMIT
}

/* ─────────────────────────────────────────────────────────────────────────
   2. HTML ENTITY ESCAPING  — prevents HTML/script injection inside the email.
   The current `clean()` stripped tags with a regex, but regexes can be
   bypassed with malformed tags like `<scr<script>ipt>`. Escaping every
   special character is the only reliable defence.
   ───────────────────────────────────────────────────────────────────────── */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#39;')
    .replace(/\//g, '&#x2F;')
}

/* ─────────────────────────────────────────────────────────────────────────
   3. HEADER INJECTION PREVENTION  — strips \r \n \t \0 from any value
   placed into email headers (from / to / replyTo / subject).
   Attack: `from_email = "x@x.com\r\nBcc: victim@other.com"` would silently
   add a Bcc header and copy the email to an attacker-controlled address.
   ───────────────────────────────────────────────────────────────────────── */
function noHeaders(str) {
  return String(str)
    .replace(/[\r\n\t\0\x0b\x0c]/g, ' ')
    .trim()
}

/* ─────────────────────────────────────────────────────────────────────────
   4. INPUT CLEANING  — length-limit + collapse excessive whitespace.
   Does NOT use a tag-stripping regex (replaced by escapeHtml above).
   ───────────────────────────────────────────────────────────────────────── */
function clean(val, maxLen = 500) {
  if (typeof val !== 'string') return ''
  return noHeaders(val)
    .replace(/\s{10,}/g, ' ')   // collapse suspiciously long whitespace runs
    .slice(0, maxLen)
}

/* ─────────────────────────────────────────────────────────────────────────
   5. SUSPICIOUS CONTENT PATTERNS  — block obvious attack payloads.
   These patterns match common email-borne attack vectors:
   - script/eval injection     → would execute if rendered as HTML
   - javascript:/data: URIs   → can run code in href attributes
   - common malware drop URLs  → .exe / .bat / powershell download commands
   ───────────────────────────────────────────────────────────────────────── */
const SUSPECT_PATTERNS = [
  /javascript\s*:/i,
  /data\s*:\s*text\/html/i,
  /vbscript\s*:/i,
  /<\s*script/i,
  /on\w+\s*=/i,                           // onload=, onclick=, onerror=…
  /\beval\s*\(/i,
  /document\.(cookie|write|location)/i,
  /window\.(location|open)/i,
  /\.exe[^a-z0-9]/i,
  /powershell/i,
  /cmd\.exe/i,
  /base64[,;]/i,                          // base64 data URIs
  /fetch\s*\(|XMLHttpRequest/i,
  /import\s*\(/i,
]

function isSuspicious(text) {
  return SUSPECT_PATTERNS.some(p => p.test(text))
}

/* ─────────────────────────────────────────────────────────────────────────
   6. ALLOWED ORIGINS  — rejects API calls that don't originate from the
   portfolio itself. Stops scripted curl/Postman spam that bypasses the form.
   Always includes localhost for dev and the production Vercel domain.
   ───────────────────────────────────────────────────────────────────────── */
function originAllowed(request) {
  const origin  = request.headers.get('origin')
  const referer = request.headers.get('referer')
  // Fail-open: no headers present (proxies, some mobile browsers)
  if (!origin && !referer) return true
  const check = origin ?? referer ?? ''
  // Allow localhost (dev), any *.vercel.app deployment (prod + previews),
  // and any custom domain set via NEXT_PUBLIC_SITE_URL env var
  if (check.startsWith('http://localhost')) return true
  if (check.includes('.vercel.app'))        return true
  if (process.env.NEXT_PUBLIC_SITE_URL && check.startsWith(process.env.NEXT_PUBLIC_SITE_URL)) return true
  return false
}

/* ─────────────────────────────────────────────────────────────────────────
   EMAIL REGEX
   ───────────────────────────────────────────────────────────────────────── */
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/

/* ═══════════════════════════════════════════════════════════════════════════
   ROUTE HANDLER
   ═══════════════════════════════════════════════════════════════════════════ */
export async function POST(request) {

  /* 1 — Origin check */
  if (!originAllowed(request)) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
  }

  /* 2 — Rate limit */
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 })
  }

  /* 3 — Parse body */
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  /* 4 — Honeypot check  (bots fill hidden fields; humans never see them)
         Return 200 to not alert the bot that it was caught. */
  if (body._honey) {
    console.warn(`[honeypot] Bot submission from ${ip}`)
    return NextResponse.json({ success: true })
  }

  /* 5 — Sanitise inputs */
  const from_name    = clean(body.from_name,    100)
  const from_email   = clean(body.from_email,   150)
  const from_phone   = clean(body.from_phone,    50)
  const service_need = clean(body.service_need, 100)
  const message      = clean(body.message,     2000)

  /* 6 — Required field validation */
  if (!from_name || !from_email || !service_need || !message) {
    return NextResponse.json({ error: 'Required fields missing.' }, { status: 400 })
  }

  /* 7 — Email format validation */
  if (!EMAIL_RE.test(from_email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  /* 8 — Suspicious content detection  (covers all fields combined) */
  const allText = [from_name, from_email, from_phone, service_need, message].join(' ')
  if (isSuspicious(allText)) {
    console.warn(`[suspicious] Blocked submission from ${ip}: matched attack pattern`)
    return NextResponse.json({ error: 'Message contains disallowed content.' }, { status: 400 })
  }

  /* 9 — Env var guard */
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('Email credentials not configured.')
    return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 })
  }

  /* 10 — Build email with properly escaped user content.
          escapeHtml() converts < > " ' & / into HTML entities so nothing
          injected by a user can be interpreted as markup or script.         */
  const safeName    = escapeHtml(from_name)
  const safeEmail   = escapeHtml(from_email)
  const safePhone   = escapeHtml(from_phone)
  const safeService = escapeHtml(service_need)
  const safeMessage = escapeHtml(message)

  /* noHeaders() strips \r \n from values used in email headers             */
  const hdrName    = noHeaders(from_name)
  const hdrEmail   = noHeaders(from_email)
  const hdrService = noHeaders(service_need)

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:24px;background:#e8e6e0;font-family:Inter,Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#f9f8f5;border-radius:16px;overflow:hidden;border:1px solid rgba(0,0,0,0.08);box-shadow:0 4px 24px rgba(0,0,0,0.08)">
    <div style="height:4px;background:linear-gradient(90deg,#ff7a18,#ffb060,#ff7a18)"></div>
    <div style="padding:28px 28px 20px">
      <div style="font-family:'Courier New',monospace;font-size:10px;color:#6e6b62;text-transform:uppercase;letter-spacing:0.14em;margin-bottom:10px">New enquiry — Mustafa.dev</div>
      <h1 style="margin:0;font-size:26px;font-weight:800;color:#141412;line-height:1.2">${safeName}</h1>
      <div style="font-size:14px;color:#6e6b62;margin-top:6px">wants help with <strong style="color:#ff7a18">${safeService}</strong></div>
    </div>
    <div style="height:1px;background:rgba(0,0,0,0.07);margin:0 28px"></div>
    <div style="padding:20px 28px;display:flex;flex-direction:column;gap:10px">
      <div style="background:#ffffff;border:1px solid rgba(0,0,0,0.08);border-radius:10px;padding:14px 16px">
        <div style="font-family:'Courier New',monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.12em;color:#6e6b62;margin-bottom:5px">Email</div>
        <a href="mailto:${safeEmail}" style="color:#ff7a18;font-size:14px;font-weight:600;text-decoration:none">${safeEmail}</a>
      </div>
      <div style="background:#ffffff;border:1px solid rgba(0,0,0,0.08);border-radius:10px;padding:14px 16px">
        <div style="font-family:'Courier New',monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.12em;color:#6e6b62;margin-bottom:5px">Phone / WhatsApp</div>
        <div style="color:#141412;font-size:14px;font-weight:500">${safePhone || 'Not provided'}</div>
      </div>
      <div style="background:#ffffff;border:1px solid rgba(0,0,0,0.08);border-radius:10px;padding:14px 16px">
        <div style="font-family:'Courier New',monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.12em;color:#6e6b62;margin-bottom:8px">Their message</div>
        <div style="color:#141412;font-size:14px;line-height:1.7;white-space:pre-wrap">${safeMessage}</div>
      </div>
    </div>
    <div style="padding:16px 28px 24px">
      <a href="mailto:${safeEmail}" style="display:inline-block;background:#ff7a18;color:#ffffff;font-size:13px;font-weight:700;padding:11px 22px;border-radius:8px;text-decoration:none">Reply to ${safeName} &rarr;</a>
    </div>
    <div style="padding:12px 28px;background:#f0eee8;border-top:1px solid rgba(0,0,0,0.07)">
      <span style="font-family:'Courier New',monospace;font-size:10px;color:#6e6b62;text-transform:uppercase;letter-spacing:0.12em">Mustafa.dev &mdash; portfolio contact form</span>
    </div>
  </div>
</body>
</html>`

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  })

  try {
    await transporter.sendMail({
      from:    `"Mustafa.dev Contact" <${process.env.GMAIL_USER}>`,
      to:      process.env.GMAIL_USER,
      replyTo: hdrEmail,                                          // noHeaders() applied
      subject: `New enquiry from ${hdrName} — ${hdrService}`, // noHeaders() applied
      html,
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Mail send error:', err?.message)
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 })
  }
}
