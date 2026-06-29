'use client'
import { useState } from 'react'
import { LinkedinLogo, WhatsappLogo, EnvelopeSimple, Briefcase } from '@phosphor-icons/react'
import ContactModal from './ContactModal'

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    Icon: LinkedinLogo,
    href: 'https://www.linkedin.com/in/mustafa-haider-034152176/',
  },
  {
    label: 'Upwork',
    Icon: Briefcase,
    href: 'https://www.upwork.com/freelancers/~01e19bb071ea911c71',
  },
  {
    label: 'WhatsApp',
    Icon: WhatsappLogo,
    href: 'https://wa.me/923485872275',
  },
]

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <footer
        className="bg-bg py-14"
        style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}
      >
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="font-display font-bold text-xl text-ink tracking-tight">
                Mustafa<span className="text-accent">.</span>dev
              </div>
              <p className="font-body text-sm text-muted mt-1.5 max-w-xs">
                Solo AI automation engineer. Building systems that run your business.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all"
                  style={{ border: '1px solid rgba(0,0,0,0.1)' }}
                >
                  <s.Icon size={18} weight="regular" aria-hidden="true" />
                </a>
              ))}

              {/* Email — opens contact modal */}
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                aria-label="Send an email"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all cursor-pointer"
                style={{ border: '1px solid rgba(0,0,0,0.1)', background: 'transparent' }}
              >
                <EnvelopeSimple size={18} weight="regular" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            className="mt-10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}
          >
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'rgba(110,107,98,0.4)' }}>
              2026 Mustafa Haider — Built with precision
            </span>
            <a
              href="/about"
              className="font-mono text-xs uppercase tracking-widest text-muted/40 hover:text-accent transition-colors"
            >
              About me →
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
