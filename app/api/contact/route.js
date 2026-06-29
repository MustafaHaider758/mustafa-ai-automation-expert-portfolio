import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

/* ── Simple in-memory rate limiter (3 submissions / IP / hour) ── */
const rateLimitMap = new Map()
const LIMIT    = 3
const WINDOW   = 60 * 60 * 1000 // 1 hour

function isRateLimited(ip) {
  const now = Date.now()
  let rec = rateLimitMap.get(ip)

  if (!rec || now > rec.resetAt) {
    rec = { count: 0, resetAt: now + WINDOW }
  }
  rec.count++
  rateLimitMap.set(ip, rec)
  return rec.count > LIMIT
}

/* ── Sanitise input: strip tags, limit length ── */
function clean(val, maxLen = 500) {
  if (typeof val !== 'string') return ''
  return val.replace(/<[^>]*>/g, '').replace(/[\r\n]{3,}/g, '\n\n').trim().slice(0, maxLen)
}

/* ── Loose email regex ── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const runtime = 'nodejs' // ensure nodemailer runs in Node.js, not Edge

export async function POST(request) {
  /* Rate limit by IP */
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  /* Sanitise and validate */
  const from_name    = clean(body.from_name,    100)
  const from_email   = clean(body.from_email,    150)
  const from_phone   = clean(body.from_phone,     50)
  const service_need = clean(body.service_need,  100)
  const message      = clean(body.message,      2000)

  if (!from_name || !from_email || !service_need || !message) {
    return NextResponse.json({ error: 'Required fields missing.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(from_email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  /* Guard against missing env vars */
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('Email credentials not configured.')
    return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  })

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:24px;background:#e8e6e0;font-family:Inter,Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#f9f8f5;border-radius:16px;overflow:hidden;border:1px solid rgba(0,0,0,0.08);box-shadow:0 4px 24px rgba(0,0,0,0.08)">
    <div style="height:4px;background:linear-gradient(90deg,#ff7a18,#ffb060,#ff7a18)"></div>
    <div style="padding:28px 28px 20px">
      <div style="font-family:'Courier New',monospace;font-size:10px;color:#6e6b62;text-transform:uppercase;letter-spacing:0.14em;margin-bottom:10px">New enquiry — Mustafa.dev</div>
      <h1 style="margin:0;font-size:26px;font-weight:800;color:#141412;line-height:1.2">${from_name}</h1>
      <div style="font-size:14px;color:#6e6b62;margin-top:6px">wants help with <strong style="color:#ff7a18">${service_need}</strong></div>
    </div>
    <div style="height:1px;background:rgba(0,0,0,0.07);margin:0 28px"></div>
    <div style="padding:20px 28px;display:flex;flex-direction:column;gap:10px">
      <div style="background:#ffffff;border:1px solid rgba(0,0,0,0.08);border-radius:10px;padding:14px 16px">
        <div style="font-family:'Courier New',monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.12em;color:#6e6b62;margin-bottom:5px">Email</div>
        <a href="mailto:${from_email}" style="color:#ff7a18;font-size:14px;font-weight:600;text-decoration:none">${from_email}</a>
      </div>
      <div style="background:#ffffff;border:1px solid rgba(0,0,0,0.08);border-radius:10px;padding:14px 16px">
        <div style="font-family:'Courier New',monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.12em;color:#6e6b62;margin-bottom:5px">Phone / WhatsApp</div>
        <div style="color:#141412;font-size:14px;font-weight:500">${from_phone || 'Not provided'}</div>
      </div>
      <div style="background:#ffffff;border:1px solid rgba(0,0,0,0.08);border-radius:10px;padding:14px 16px">
        <div style="font-family:'Courier New',monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.12em;color:#6e6b62;margin-bottom:8px">Their message</div>
        <div style="color:#141412;font-size:14px;line-height:1.7;white-space:pre-wrap">${message}</div>
      </div>
    </div>
    <div style="padding:16px 28px 24px">
      <a href="mailto:${from_email}" style="display:inline-block;background:#ff7a18;color:#ffffff;font-size:13px;font-weight:700;padding:11px 22px;border-radius:8px;text-decoration:none">Reply to ${from_name} →</a>
    </div>
    <div style="padding:12px 28px;background:#f0eee8;border-top:1px solid rgba(0,0,0,0.07)">
      <span style="font-family:'Courier New',monospace;font-size:10px;color:#6e6b62;text-transform:uppercase;letter-spacing:0.12em">Mustafa.dev — portfolio contact form</span>
    </div>
  </div>
</body>
</html>`

  try {
    await transporter.sendMail({
      from:    `"Mustafa.dev Contact" <${process.env.GMAIL_USER}>`,
      to:      process.env.GMAIL_USER,
      replyTo: from_email,
      subject: `New enquiry from ${from_name} — ${service_need}`,
      html,
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Mail send error:', err?.message)
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 })
  }
}
