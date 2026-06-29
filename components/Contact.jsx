'use client'
import { useState } from 'react'
import { WhatsappLogo, EnvelopeSimple } from '@phosphor-icons/react'
import ContactModal from './ContactModal'

export default function Contact() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <section id="contact" className="py-24 bg-bg">
        <div className="max-w-7xl mx-auto px-5">
          <div
            className="relative rounded-2xl overflow-hidden p-10 md:p-16 lg:p-20"
            style={{
              background: '#141412',
              border: '1px solid rgba(255,122,24,0.15)',
            }}
          >
            {/* Top glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[260px] pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at top, rgba(255,122,24,0.1) 0%, transparent 70%)' }}
              aria-hidden="true"
            />

            {/* Floating blob */}
            <div
              className="hidden xl:block absolute bottom-[-10%] right-[-2%] sh1 pointer-events-none"
              aria-hidden="true"
              style={{ width: '280px', height: '240px', background: 'rgba(255,122,24,0.06)' }}
            />

            <div className="relative z-10 max-w-2xl">
              <h2
                className="font-display font-extrabold tracking-tight leading-none mb-5"
                style={{ fontSize: 'clamp(32px, 5vw, 64px)', color: '#f9f8f5' }}
              >
                Scale your business with AI.
              </h2>
              <p className="font-body text-lg mb-10 max-w-lg leading-relaxed" style={{ color: 'rgba(249,248,245,0.55)' }}>
                Book a free 15-minute audit. We find exactly where your operation leaks time, and I show you how to fix it with automation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* WhatsApp — primary */}
                <a
                  href="https://wa.me/923485872275"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-accent font-body font-bold text-base rounded-lg hover:bg-accent/90 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                  style={{ color: '#f9f8f5' }}
                >
                  <WhatsappLogo size={20} weight="fill" aria-hidden="true" />
                  Chat on WhatsApp
                </a>

                {/* Send a message — opens modal */}
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 font-body font-semibold text-base rounded-lg hover:-translate-y-0.5 transition-all cursor-pointer"
                  style={{
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(249,248,245,0.75)',
                  }}
                >
                  <EnvelopeSimple size={20} weight="regular" aria-hidden="true" />
                  Send a message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
