'use client'
import { useState, useEffect } from 'react'
import { X, User, EnvelopeSimple, Phone, CaretDown, CheckCircle, WarningCircle } from '@phosphor-icons/react'

const SERVICES = [
  'AI Chatbots',
  'Lead Generation',
  'Web Scraping',
  'RAG Pipelines',
  'n8n Workflows',
  'Voice AI',
  'FastAPI Backends',
  'LLM Integrations',
  'Agentic AI',
  'Other / Custom Query',
]

export default function ContactModal({ open, onClose, defaultService = '', defaultMessage = '' }) {
  const blank = () => ({ name: '', email: '', phone: '', service: defaultService, message: defaultMessage, _honey: '' })

  const [form, setForm]     = useState(blank)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  /* Lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  /* Reset to (possibly pre-filled) defaults when modal closes */
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => { setForm(blank()); setStatus('idle') }, 300)
      return () => clearTimeout(t)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from_name:    form.name,
          from_email:   form.email,
          from_phone:   form.phone,
          service_need: form.service,
          message:      form.message,
          _honey:       form._honey,
        }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const inputBase = {
    width: '100%',
    fontFamily: 'var(--font-body, Inter, sans-serif)',
    fontSize: '14px',
    color: '#141412',
    background: '#f9f8f5',
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: '10px',
    padding: '11px 14px',
    outline: 'none',
    transition: 'border-color 0.15s',
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 90,
          background: 'rgba(20,20,18,0.52)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
        }}
        aria-hidden="true"
      />

      {/* Modal wrapper — centres the card */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px',
          pointerEvents: 'none',
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Send a message"
          style={{
            pointerEvents: open ? 'auto' : 'none',
            width: '100%', maxWidth: '520px',
            background: '#ffffff',
            borderRadius: '18px',
            overflow: 'hidden',
            boxShadow: '0 24px 80px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.07)',
            transform: open ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.97)',
            opacity: open ? 1 : 0,
            transition: 'transform 0.32s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease',
          }}
        >
          {/* Accent bar */}
          <div style={{ height: '3px', background: 'linear-gradient(90deg,#ff7a18,#ffb060,#ff7a18)' }} />

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '22px 24px 18px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
            <div>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#141412', lineHeight: 1.2 }}>
                {defaultMessage ? 'Build something similar' : 'Send a message'}
              </h2>
              <p style={{ margin: '4px 0 0', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6e6b62' }}>
                {defaultMessage ? 'Tell me about your project — I reply within 24 hours.' : 'I reply within 24 hours, usually faster.'}
              </p>
            </div>
            <button
              onClick={onClose}
              style={{ marginLeft: '12px', padding: '6px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#6e6b62', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
              aria-label="Close"
            >
              <X size={18} weight="bold" />
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: '20px 24px 24px', maxHeight: '70vh', overflowY: 'auto' }}>

            {status === 'sent' ? (
              /* Success */
              <div style={{ padding: '32px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle size={32} weight="fill" style={{ color: '#22c55e' }} />
                </div>
                <div>
                  <h3 style={{ margin: '0 0 6px', fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#141412' }}>
                    Message sent!
                  </h3>
                  <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6e6b62', maxWidth: '280px' }}>
                    Thanks {form.name.split(' ')[0]}. I'll review your request and get back to you shortly.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  style={{ marginTop: '8px', padding: '10px 24px', background: '#ff7a18', color: '#fff', border: 'none', borderRadius: '8px', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
                >
                  Close
                </button>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                {/* Honeypot — invisible to humans, bots fill it, server rejects if non-empty */}
                <input
                  type="text"
                  name="website"
                  value={form._honey}
                  onChange={set('_honey')}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }}
                />

                {/* Name + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#6e6b62', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                      Full name <span style={{ color: '#ff7a18' }}>*</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(110,107,98,0.5)', pointerEvents: 'none', display: 'flex' }}>
                        <User size={14} />
                      </span>
                      <input
                        type="text" required placeholder="John Smith"
                        value={form.name} onChange={set('name')}
                        style={{ ...inputBase, paddingLeft: '34px' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(255,122,24,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#6e6b62', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                      Email <span style={{ color: '#ff7a18' }}>*</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(110,107,98,0.5)', pointerEvents: 'none', display: 'flex' }}>
                        <EnvelopeSimple size={14} />
                      </span>
                      <input
                        type="email" required placeholder="you@company.com"
                        value={form.email} onChange={set('email')}
                        style={{ ...inputBase, paddingLeft: '34px' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(255,122,24,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
                      />
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#6e6b62', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                    Phone / WhatsApp <span style={{ color: 'rgba(110,107,98,0.4)', fontWeight: 400 }}>(optional)</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(110,107,98,0.5)', pointerEvents: 'none', display: 'flex' }}>
                      <Phone size={14} />
                    </span>
                    <input
                      type="tel" placeholder="+1 234 567 8900"
                      value={form.phone} onChange={set('phone')}
                      style={{ ...inputBase, paddingLeft: '34px' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(255,122,24,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
                    />
                  </div>
                </div>

                {/* Service dropdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#6e6b62', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                    Service needed <span style={{ color: '#ff7a18' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select
                      required value={form.service} onChange={set('service')}
                      style={{
                        ...inputBase,
                        paddingRight: '32px',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        cursor: 'pointer',
                        color: form.service ? '#141412' : 'rgba(110,107,98,0.45)',
                      }}
                      onFocus={e => e.target.style.borderColor = 'rgba(255,122,24,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
                    >
                      <option value="" disabled>Select a service…</option>
                      {SERVICES.map(s => (
                        <option key={s} value={s} style={{ color: '#141412' }}>{s}</option>
                      ))}
                    </select>
                    <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', color: 'rgba(110,107,98,0.6)' }}>
                      <CaretDown size={13} />
                    </span>
                  </div>
                </div>

                {/* Message */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#6e6b62', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                    Describe your problem / needs <span style={{ color: '#ff7a18' }}>*</span>
                  </label>
                  <textarea
                    required rows={4}
                    placeholder="Tell me what you're trying to automate, what's breaking, or what you want to build. The more detail the better."
                    value={form.message} onChange={set('message')}
                    style={{ ...inputBase, resize: 'none', lineHeight: '1.6' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(255,122,24,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
                  />
                </div>

                {/* Error */}
                {status === 'error' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 14px', background: 'rgba(220,60,60,0.05)', border: '1px solid rgba(220,60,60,0.12)', borderRadius: '8px' }}>
                    <WarningCircle size={16} style={{ color: '#dc3545', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#b91c1c' }}>
                      Something went wrong. Email me directly at{' '}
                      <a href="mailto:mustafahaider758@gmail.com" style={{ color: '#ff7a18' }}>mustafahaider758@gmail.com</a>
                    </span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    marginTop: '4px',
                    width: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '13px 24px',
                    background: status === 'sending' ? 'rgba(255,122,24,0.7)' : '#ff7a18',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    transition: 'background 0.15s, transform 0.1s',
                  }}
                  onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.background = 'rgba(255,122,24,0.88)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = status === 'sending' ? 'rgba(255,122,24,0.7)' : '#ff7a18' }}
                >
                  {status === 'sending' ? (
                    <>
                      <span style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                      Sending…
                    </>
                  ) : 'Send message →'}
                </button>

              </form>
            )}
          </div>
        </div>
      </div>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </>
  )
}
