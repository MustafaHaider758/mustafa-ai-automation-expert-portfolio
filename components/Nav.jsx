'use client'
import { useState } from 'react'
import { List, X, WhatsappLogo } from '@phosphor-icons/react'

const LINKS = [
  { label: 'Work',       href: '#case-studies' },
  { label: 'Services',   href: '#services'      },
  { label: 'Process',    href: '#how-it-works'  },
  { label: 'Background', href: '#about'          },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(249,248,245,0.92)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        <a
          href="#"
          className="font-display font-bold text-xl tracking-tight text-ink hover:opacity-80 transition-opacity"
        >
          Mustafa<span className="text-accent">.</span>dev
        </a>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {LINKS.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="font-body text-sm font-medium text-muted hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/923485872275"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white font-body font-bold text-sm rounded-lg hover:bg-accent/90 active:scale-95 transition-all"
          >
            <WhatsappLogo size={16} weight="fill" aria-hidden="true" />
            WhatsApp
          </a>
          <button
            className="lg:hidden text-ink p-1.5 hover:text-accent transition-colors"
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open
              ? <X size={22} weight="bold" />
              : <List size={22} weight="bold" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-bg-2" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
          <nav
            className="max-w-7xl mx-auto px-5 py-5 flex flex-col gap-1"
            aria-label="Mobile navigation"
          >
            {LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-body text-base font-medium text-ink py-3.5 hover:text-accent transition-colors"
                style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://wa.me/923485872275"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 px-5 py-3.5 bg-accent text-white font-body font-bold text-sm text-center rounded-lg"
            >
              <WhatsappLogo size={16} weight="fill" aria-hidden="true" />
              WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
