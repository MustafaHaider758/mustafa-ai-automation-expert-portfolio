'use client'
import { useState } from 'react'
import Footer from '@/components/Footer'
import RevealObserver from '@/components/RevealObserver'
import ContactModal from '@/components/ContactModal'
import {
  Clock,
  WarningCircle,
  UsersThree,
  MagnifyingGlass,
  GearSix,
  Wrench,
  RocketLaunch,
  TrendUp,
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowSquareOut,
  EnvelopeSimple,
} from '@phosphor-icons/react'

const PAIN_POINTS = [
  {
    Icon: Clock,
    title: 'Hours lost every week',
    desc: 'Your team logs into 5+ platforms (Google Ads, Meta, GA4, and more) every week just to pull numbers and build reports by hand.',
  },
  {
    Icon: WarningCircle,
    title: 'Inconsistent, error-prone reports',
    desc: 'Manually assembled reports vary client to client and person to person, especially under deadline pressure at month-end.',
  },
  {
    Icon: UsersThree,
    title: 'A ceiling on how many clients you can take',
    desc: 'Hours lost to reporting are hours not spent on billable client work or landing new business, which caps how many clients your agency can carry.',
  },
]

const PROCESS = [
  { Icon: MagnifyingGlass, title: 'Audit', desc: 'Map exactly which platforms feed which reports today, and where the hours actually go. Free, about 20 minutes on a call.' },
  { Icon: GearSix, title: 'Strategy', desc: 'Design the dashboard structure around your standard report template before touching a single tool.' },
  { Icon: Wrench, title: 'Build', desc: 'Connect your ad platforms, analytics, and CRM into one dashboard that pulls the latest numbers automatically.' },
  { Icon: RocketLaunch, title: 'Launch', desc: 'Test it against your real past reports, not sample data, so formatting and edge cases are caught before a client ever sees it.' },
  { Icon: TrendUp, title: 'Ongoing Optimization', desc: 'Monitor the first few reporting cycles and tune the dashboard as your client list and platforms change.' },
]

const FOR_YOU = [
  'Your team spends real hours every week pulling numbers from ad platforms and analytics tools by hand.',
  'You run monthly or biweekly client reports and the process looks almost the same for every client.',
  'You want your existing stack (Google Ads, Meta, GA4, HubSpot, etc.) connected, not replaced.',
  "You'd rather have your account managers doing strategy and client work than formatting spreadsheets.",
]

const NOT_FOR_YOU = [
  'You run one or two clients and reporting takes you 20 minutes a month.',
  'You want a fully custom BI platform with a six-figure budget and a 6-month build timeline.',
  'Every client report is structured completely differently with no repeatable pattern.',
  "You're not the person who can greenlight a few hundred to low thousands of dollars for a workflow build.",
]

export default function AgencyReportingPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <ContactModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService="Reporting"
        defaultMessage="Hi Mustafa, I want to talk about automating our client reporting. Here's my situation:\n"
      />
      <RevealObserver />

      {/* Back navigation bar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-5"
        style={{
          background: 'rgba(249,248,245,0.94)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
        }}
      >
        <a
          href="/"
          className="flex items-center gap-2 font-body font-semibold text-sm text-ink hover:text-accent transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
          Back to portfolio
        </a>
        <span className="font-display font-bold text-base tracking-tight text-ink">
          Mustafa<span style={{ color: '#ff7a18' }}>.</span>dev
        </span>
        <a
          href="https://wa.me/923485872275"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-body font-bold rounded-lg text-white transition-all hover:opacity-90"
          style={{ background: '#ff7a18' }}
        >
          WhatsApp
        </a>
      </header>

      <main className="bg-bg text-ink pt-14">
        {/* Hero */}
        <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: '#f9f8f5' }}>
          <div
            className="absolute top-[10%] right-[8%] w-[440px] h-[440px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,122,24,0.08) 0%, transparent 68%)' }}
            aria-hidden="true"
          />
          <div className="max-w-3xl mx-auto px-5 relative z-10 text-center reveal">
            <p className="font-mono text-xs text-accent uppercase tracking-[0.16em] mb-4">
              For Marketing &amp; Digital Agencies
            </p>
            <h1
              className="font-display font-extrabold tracking-tight text-ink leading-[1.05] mb-5"
              style={{ fontSize: 'clamp(32px, 5.2vw, 58px)' }}
            >
              Stop wasting 10+ hours a week on manual client reporting
            </h1>
            <p className="font-body text-muted text-base leading-relaxed max-w-xl mx-auto mb-9">
              I build the Client Report Assembly Line: your ad platforms, analytics, and CRM feed into
              one dashboard that builds itself, so the report is ready before anyone has to pull a
              single number by hand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-accent text-white font-body font-bold text-sm rounded-xl hover:bg-accent/90 hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer"
              >
                Book a free reporting audit
                <ArrowRight size={16} />
              </button>
              <a
                href="/roi-calculator"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 font-body font-semibold text-sm rounded-xl transition-all hover:-translate-y-0.5"
                style={{ border: '1.5px solid rgba(0,0,0,0.12)', color: 'rgba(20,20,18,0.85)' }}
              >
                See what it's costing you first
              </a>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="py-20" style={{ background: '#ffffff', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="max-w-5xl mx-auto px-5">
            <div className="max-w-xl mx-auto text-center mb-12 reveal">
              <p className="font-mono text-xs text-accent uppercase tracking-[0.16em] mb-3">The Problem</p>
              <h2 className="font-display font-extrabold tracking-tight text-ink" style={{ fontSize: 'clamp(26px, 3.4vw, 40px)' }}>
                Drowning in reporting every single month?
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-5 reveal">
              {PAIN_POINTS.map((p) => (
                <div key={p.title} className="rounded-xl p-6" style={{ background: '#f9f8f5', border: '1px solid rgba(0,0,0,0.07)' }}>
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(255,122,24,0.1)' }}>
                    <p.Icon size={20} weight="bold" className="text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-bold text-base text-ink mb-2">{p.title}</h3>
                  <p className="font-body text-sm text-muted leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20" style={{ background: '#f0eee8', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="max-w-5xl mx-auto px-5">
            <div className="max-w-xl mx-auto text-center mb-12 reveal">
              <p className="font-mono text-xs text-accent uppercase tracking-[0.16em] mb-3">The Fix</p>
              <h2 className="font-display font-extrabold tracking-tight text-ink mb-3" style={{ fontSize: 'clamp(26px, 3.4vw, 40px)' }}>
                The Client Report Assembly Line
              </h2>
              <p className="font-body text-muted text-sm">
                A repeatable, five-step build. Not a one-off script that breaks the moment a client adds a platform.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 reveal">
              {PROCESS.map((step, i) => (
                <div key={step.title} className="rounded-xl p-5" style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.07)' }}>
                  <span className="font-mono text-[10px] text-muted/60 tracking-widest">{String(i + 1).padStart(2, '0')}</span>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center my-3" style={{ background: 'rgba(255,122,24,0.1)' }}>
                    <step.Icon size={17} weight="bold" className="text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-ink mb-1.5">{step.title}</h3>
                  <p className="font-body text-xs text-muted leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proof */}
        <section className="py-20" style={{ background: '#ffffff', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="max-w-3xl mx-auto px-5 text-center reveal">
            <p className="font-mono text-xs text-accent uppercase tracking-[0.16em] mb-3">Proof, Not Promises</p>
            <h2 className="font-display font-extrabold tracking-tight text-ink mb-4" style={{ fontSize: 'clamp(26px, 3.4vw, 40px)' }}>
              No agency case study yet, no invented numbers
            </h2>
            <p className="font-body text-muted text-sm leading-relaxed mb-8">
              Instead of a made-up result, run the same calculator used on discovery calls, or look at the
              production systems above in{' '}
              <a href="/#case-studies" className="text-accent font-semibold hover:underline">
                Selected work
              </a>{' '}
              — the real-time dashboard and social automation builds use the same underlying pattern:
              pulling scattered data into one place automatically.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/roi-calculator"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-accent text-white font-body font-bold text-sm rounded-xl hover:bg-accent/90 hover:-translate-y-0.5 transition-all"
              >
                Open the ROI calculator
                <ArrowRight size={16} />
              </a>
              <a
                href="https://www.automationslimited.com/agency-reporting"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 font-body font-semibold text-sm rounded-xl transition-all hover:-translate-y-0.5"
                style={{ border: '1.5px solid rgba(0,0,0,0.12)', color: 'rgba(20,20,18,0.85)' }}
              >
                View the official offer at Automations Limited
                <ArrowSquareOut size={15} className="opacity-60" />
              </a>
            </div>
          </div>
        </section>

        {/* Guarantee */}
        <section className="py-14" style={{ background: '#f0eee8', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="max-w-2xl mx-auto px-5 text-center reveal">
            <div className="rounded-2xl p-8" style={{ background: '#ffffff', border: '1.5px solid rgba(255,122,24,0.25)' }}>
              <h3 className="font-display font-bold text-lg text-ink mb-2">The Guarantee</h3>
              <p className="font-body text-muted text-sm leading-relaxed">
                I&rsquo;ll build your first automated report free, using your real client data. If it
                doesn&rsquo;t save you at least 8 hours in the first month, you owe me nothing.
              </p>
            </div>
          </div>
        </section>

        {/* Fit check */}
        <section className="py-20" style={{ background: '#ffffff', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="max-w-4xl mx-auto px-5">
            <div className="max-w-xl mx-auto text-center mb-12 reveal">
              <p className="font-mono text-xs text-accent uppercase tracking-[0.16em] mb-3">Fit Check</p>
              <h2 className="font-display font-extrabold tracking-tight text-ink" style={{ fontSize: 'clamp(26px, 3.4vw, 40px)' }}>
                Who this is for
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5 reveal">
              <div className="rounded-xl p-6" style={{ background: '#f9f8f5', border: '1px solid rgba(34,197,94,0.2)' }}>
                <h3 className="font-display font-bold text-sm text-ink mb-4">This is for you if...</h3>
                <ul className="flex flex-col gap-3">
                  {FOR_YOU.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 font-body text-sm text-muted leading-relaxed">
                      <CheckCircle size={17} weight="fill" className="text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl p-6" style={{ background: '#f9f8f5', border: '1px solid rgba(0,0,0,0.07)' }}>
                <h3 className="font-display font-bold text-sm text-ink mb-4">This is NOT for you if...</h3>
                <ul className="flex flex-col gap-3">
                  {NOT_FOR_YOU.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 font-body text-sm text-muted leading-relaxed">
                      <XCircle size={17} className="text-muted/60 shrink-0 mt-0.5" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-28" style={{ background: '#141412', borderTop: '1px solid rgba(0,0,0,0.12)' }}>
          <div className="max-w-2xl mx-auto px-5 text-center reveal">
            <p className="font-mono text-xs text-accent uppercase tracking-[0.16em] mb-5">Ready to fix this?</p>
            <h2 className="font-display font-extrabold tracking-tight text-bg mb-4" style={{ fontSize: 'clamp(30px, 4.4vw, 54px)' }}>
              20 minutes. No pitch.
            </h2>
            <p className="font-body text-muted leading-relaxed mb-10 mx-auto" style={{ maxWidth: '38ch', fontSize: '16px' }}>
              I&rsquo;ll map where your team&rsquo;s reporting time is actually going and give you a fixed
              price for automating it, no obligation either way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-accent text-bg font-body font-bold text-[15px] rounded-xl hover:bg-accent/90 hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer"
              >
                <EnvelopeSimple size={18} weight="fill" />
                Book a free reporting audit
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
