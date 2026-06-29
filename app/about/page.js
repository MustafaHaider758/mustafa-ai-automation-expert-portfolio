'use client'
import { useState } from 'react'
import Footer from '@/components/Footer'
import RevealObserver from '@/components/RevealObserver'
import ContactModal from '@/components/ContactModal'
import {
  MapPin,
  Star,
  GithubLogo,
  EnvelopeSimple,
  WhatsappLogo,
  ArrowRight,
} from '@phosphor-icons/react'

const NUMBERS = [
  { value: '15–25', unit: 'hrs', label: 'saved per week' },
  { value: '50+', unit: '', label: 'live pipelines' },
  { value: '10+', unit: '', label: 'countries served' },
  { value: '91%', unit: '', label: 'job success score' },
]

const BENTO = [
  {
    title: 'Automation Stack',
    span: 'col-span-2',
    accent: true,
    tools: ['n8n', 'Make.com', 'Zapier', 'GoHighLevel'],
  },
  {
    title: 'AI & LLMs',
    span: 'col-span-1',
    accent: false,
    tools: ['OpenAI API', 'Claude', 'LangChain', 'LangGraph', 'RAG Pipelines', 'NLP'],
  },
  {
    title: 'Backend & Data',
    span: 'col-span-1',
    accent: false,
    tools: ['Python', 'FastAPI', 'REST APIs', 'PostgreSQL', 'Supabase', 'Airtable'],
  },
  {
    title: 'Scraping & Intelligence',
    span: 'col-span-1',
    accent: true,
    tools: ['Playwright', 'Scrapy', 'Selenium', 'Proxy Rotation', 'Cloudflare Bypass'],
  },
  {
    title: 'CRM & Growth',
    span: 'col-span-1',
    accent: false,
    tools: ['HubSpot', 'GoHighLevel', 'Pipedrive', 'Zoho', 'Salesforce'],
  },
  {
    title: 'Web Dev',
    span: 'col-span-1',
    accent: false,
    tools: ['React', 'Node.js', 'JavaScript', 'MERN Stack'],
  },
  {
    title: 'Data & Ops',
    span: 'col-span-1',
    accent: false,
    tools: ['Google Sheets', 'Notion', 'Airtable', 'Google Workspace'],
  },
]

const TIMELINE = [
  {
    role: 'AI & Data Engineer',
    company: 'EUmatrix.eu · Brussels, Belgium',
    period: 'Oct 2025 – Present',
    desc: 'Architecting scalable backend systems and autonomous data pipelines for a European political intelligence platform. Crawling 850+ sources, LLM-based extraction with OpenAI and Claude, Supabase/PostgreSQL schema design.',
  },
  {
    role: 'AI / ML Engineer Intern',
    company: 'DEVROLIN',
    period: 'Jun 2025 – Sep 2025',
    desc: 'Built real-world automation workflows in n8n integrating APIs, databases, and third-party services. Contributed to ML model development with supervised learning, data preprocessing, and evaluation.',
  },
  {
    role: 'Freelance AI Automation Engineer',
    company: 'Upwork · Top Rated',
    period: '2024 – Present',
    desc: 'Delivered 10+ projects across n8n automations, web scraping, RAG pipelines, chatbots, and API orchestration. 50+ production automation pipelines live across clients worldwide.',
  },
  {
    role: 'Freelance Developer',
    company: 'Independent — EU / UK / US / Canada',
    period: '2022 – Present',
    desc: 'Delivering programming assignments and software projects for international students across Europe, the UK, the US, and Canada while completing my Bachelor\'s degree. Full-stack apps, data analysis, and algorithm solutions across multiple languages.',
  },
  {
    role: 'Bachelor of Computer Science',
    company: 'COMSATS Institute of Information Technology',
    period: '2020 – 2024',
    desc: 'Graduated with a focus on software engineering, data structures, machine learning, and distributed systems.',
  },
]

const BELIEFS = [
  {
    index: '01',
    heading: 'I\'m not a consultant who disappears.',
    body: 'I stay after delivery. You get documentation, monitoring, and I\'m available when something breaks.',
  },
  {
    index: '02',
    heading: 'No agency overhead, no project managers.',
    body: 'You\'re talking directly to the person building your system. Faster iterations, no telephone game.',
  },
  {
    index: '03',
    heading: 'Code that runs while you sleep.',
    body: 'The best automation is the one you forget about — because it just works.',
  },
]

const LANGS = [
  { flag: '🇬🇧', name: 'English', level: 'Fluent' },
  { flag: '🇵🇰', name: 'Urdu', level: 'Native' },
  { flag: '🏔️', name: 'Punjabi', level: 'Fluent' },
  { flag: '🇮🇳', name: 'Hindi', level: 'Conversational' },
]

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <RevealObserver />
      {/* ── Back navigation bar ── */}
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
      <main className="bg-bg text-ink">

        {/* ── Section 1: Hero intro strip ────────────────────────────────────── */}
        <section
          className="relative min-h-[80vh] flex items-center overflow-hidden pt-16"
          style={{ background: '#f9f8f5' }}
        >
          {/* Ambient orbs */}
          <div
            className="absolute top-[10%] right-[8%] w-[480px] h-[480px] rounded-full pointer-events-none orb-a"
            style={{ background: 'radial-gradient(circle, rgba(255,122,24,0.09) 0%, transparent 68%)' }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-[5%] left-[5%] w-[360px] h-[360px] rounded-full pointer-events-none orb-b"
            style={{ background: 'radial-gradient(circle, rgba(255,150,50,0.06) 0%, transparent 68%)' }}
            aria-hidden="true"
          />
          <div
            className="absolute top-[50%] left-[40%] w-[240px] h-[240px] rounded-full pointer-events-none orb-c"
            style={{ background: 'radial-gradient(circle, rgba(255,180,80,0.05) 0%, transparent 65%)' }}
            aria-hidden="true"
          />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.025) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
            aria-hidden="true"
          />

          <div className="max-w-5xl mx-auto px-5 w-full py-24 relative z-10">
            {/* Availability badge */}
            <div className="hero-fade hero-d0 inline-flex items-center gap-2.5 font-mono text-xs text-muted uppercase tracking-[0.14em] mb-10">
              <span className="w-2 h-2 rounded-full bg-accent pulse-accent flex-shrink-0" />
              <MapPin size={13} weight="fill" className="text-muted opacity-60" />
              Pind Dadan Khan, Pakistan · Available for new projects
            </div>

            {/* Giant heading */}
            <h1
              className="hero-fade hero-d1 font-display font-extrabold tracking-tight text-ink leading-[1.0] mb-6"
              style={{ fontSize: 'clamp(50px, 8vw, 90px)' }}
            >
              Hi.{' '}
              <span className="relative inline-block">
                I&rsquo;m Mustafa.
                <span
                  className="absolute bottom-0 left-0 h-[5px] w-full rounded-full bg-accent"
                  style={{ bottom: '-6px' }}
                  aria-hidden="true"
                />
              </span>
            </h1>

            {/* Subtext */}
            <p className="hero-fade hero-d2 font-body text-[18px] text-muted leading-relaxed max-w-[38rem] mt-8 mb-10">
              AI automation engineer. I architect efficiency through intelligent code — building systems that generate leads, scrape data, and run your operations without you lifting a finger.
            </p>

            {/* Quick stat pills */}
            <div className="hero-fade hero-d3 flex flex-wrap gap-3">
              <span
                className="inline-flex items-center gap-2 font-mono text-xs text-muted px-4 py-2 rounded-full"
                style={{ background: '#f0eee8', border: '1px solid rgba(0,0,0,0.07)' }}
              >
                <Star size={12} weight="fill" className="text-accent" />
                Top Rated on Upwork
              </span>
              <span
                className="inline-flex items-center gap-2 font-mono text-xs text-muted px-4 py-2 rounded-full"
                style={{ background: '#f0eee8', border: '1px solid rgba(0,0,0,0.07)' }}
              >
                <GithubLogo size={12} weight="fill" className="text-muted" />
                MustafaHaider758 · since 2022
              </span>
              <span
                className="inline-flex items-center gap-2 font-mono text-xs text-muted px-4 py-2 rounded-full"
                style={{ background: '#f0eee8', border: '1px solid rgba(0,0,0,0.07)' }}
              >
                $4K+ earned · 10 projects
              </span>
            </div>
          </div>
        </section>

        {/* ── Section 2: Pull quote ───────────────────────────────────────────── */}
        <section
          className="py-20 md:py-28"
          style={{ background: '#f0eee8', borderTop: '1px solid rgba(0,0,0,0.06)' }}
        >
          <div className="max-w-4xl mx-auto px-5 text-center reveal">
            <div
              className="font-display font-black leading-none select-none"
              style={{ fontSize: 'clamp(80px, 12vw, 130px)', color: 'rgba(255,122,24,0.15)', lineHeight: 0.7 }}
              aria-hidden="true"
            >
              "
            </div>
            <blockquote
              className="font-display font-extrabold italic tracking-tight text-ink"
              style={{ fontSize: 'clamp(24px, 3.8vw, 46px)', lineHeight: 1.2, marginTop: '-0.15em' }}
            >
              Manual work is a bug.
              <br />
              <em className="not-italic text-shimmer">I build the fix.</em>
            </blockquote>
          </div>
        </section>

        {/* ── Section 3: Numbers strip ────────────────────────────────────────── */}
        <section
          className="py-16"
          style={{ background: '#ffffff', borderTop: '1px solid rgba(0,0,0,0.06)' }}
        >
          <div className="max-w-5xl mx-auto px-5">
            <div
              className="grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden reveal"
              style={{ gap: '1px', background: 'rgba(0,0,0,0.06)' }}
            >
              {NUMBERS.map((n) => (
                <div key={n.label} className="bg-bg px-6 py-8 text-center">
                  <div
                    className="font-display font-extrabold tracking-tight leading-none"
                    style={{ fontSize: 'clamp(28px, 3vw, 42px)' }}
                  >
                    <span className="text-ink">{n.value}</span>
                    {n.unit && (
                      <span className="text-accent text-[0.6em] ml-0.5">{n.unit}</span>
                    )}
                  </div>
                  <div className="font-mono text-[10px] text-muted uppercase tracking-[0.14em] mt-2">
                    {n.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 4: Skills bento grid ───────────────────────────────────── */}
        <section
          className="py-20 md:py-28"
          style={{ background: '#f9f8f5', borderTop: '1px solid rgba(0,0,0,0.06)' }}
        >
          <div className="max-w-5xl mx-auto px-5">
            <div className="mb-12 reveal">
              <p className="font-mono text-xs text-accent uppercase tracking-[0.16em] mb-3">
                What I work with
              </p>
              <h2
                className="font-display font-extrabold tracking-tight text-ink"
                style={{ fontSize: 'clamp(28px, 3.8vw, 48px)' }}
              >
                The full stack.
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 reveal">
              {BENTO.map((tile) => (
                <div
                  key={tile.title}
                  className={`${tile.span} rounded-xl p-5`}
                  style={{
                    background: tile.accent ? '#ffffff' : '#f0eee8',
                    border: tile.accent
                      ? '1.5px solid rgba(255,122,24,0.28)'
                      : '1px solid rgba(0,0,0,0.07)',
                  }}
                >
                  <div
                    className="font-display font-bold text-ink mb-3"
                    style={{ fontSize: '15px' }}
                  >
                    {tile.title}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tile.tools.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] text-muted px-2.5 py-1 rounded-md"
                        style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.06)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 5: Background timeline ─────────────────────────────────── */}
        <section
          className="py-20 md:py-28"
          style={{ background: '#f0eee8', borderTop: '1px solid rgba(0,0,0,0.06)' }}
        >
          <div className="max-w-5xl mx-auto px-5">
            <div className="mb-12 reveal">
              <p className="font-mono text-xs text-accent uppercase tracking-[0.16em] mb-3">
                Where I've been
              </p>
              <h2
                className="font-display font-extrabold tracking-tight text-ink"
                style={{ fontSize: 'clamp(28px, 3.8vw, 48px)' }}
              >
                Background.
              </h2>
            </div>

            <div
              className="relative pl-6"
              style={{ borderLeft: '2px solid rgba(255,122,24,0.2)' }}
            >
              {TIMELINE.map((entry, i) => (
                <div
                  key={`${entry.company}-${i}`}
                  className="relative mb-12 last:mb-0 group reveal-left"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute -left-[29px] top-1.5 w-4 h-4 rounded-full border-2 transition-colors"
                    style={{
                      background: '#f0eee8',
                      borderColor: 'rgba(255,122,24,0.4)',
                    }}
                    aria-hidden="true"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-display font-bold text-xl text-ink">{entry.role}</h3>
                      <div className="font-mono text-xs text-accent uppercase tracking-widest mt-0.5 opacity-75">
                        {entry.company}
                      </div>
                    </div>
                    <span
                      className="font-mono text-xs text-muted uppercase tracking-widest whitespace-nowrap px-3 py-1 rounded self-start"
                      style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.07)' }}
                    >
                      {entry.period}
                    </span>
                  </div>

                  <p className="font-body text-sm text-muted leading-relaxed">{entry.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 6: Philosophy / beliefs ────────────────────────────────── */}
        <section
          className="py-20 md:py-28"
          style={{ background: '#ffffff', borderTop: '1px solid rgba(0,0,0,0.06)' }}
        >
          <div className="max-w-5xl mx-auto px-5">
            <div className="mb-14 reveal">
              <p className="font-mono text-xs text-accent uppercase tracking-[0.16em] mb-3">
                How I work
              </p>
              <h2
                className="font-display font-extrabold tracking-tight text-ink"
                style={{ fontSize: 'clamp(28px, 3.8vw, 48px)' }}
              >
                What I believe.
              </h2>
            </div>

            <div className="flex flex-col gap-0 divide-y" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
              {BELIEFS.map((b, i) => (
                <div
                  key={b.index}
                  className="py-10 flex flex-col md:flex-row gap-6 md:gap-12 reveal"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div
                    className="font-display font-extrabold text-accent flex-shrink-0"
                    style={{ fontSize: '40px', lineHeight: 1, minWidth: '56px' }}
                  >
                    {b.index}
                  </div>
                  <div>
                    <h3
                      className="font-display font-bold text-ink mb-3"
                      style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}
                    >
                      {b.heading}
                    </h3>
                    <p className="font-body text-muted leading-relaxed" style={{ maxWidth: '52ch' }}>
                      {b.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 7: Languages & personal ────────────────────────────────── */}
        <section
          className="py-20 md:py-24"
          style={{ background: '#f9f8f5', borderTop: '1px solid rgba(0,0,0,0.06)' }}
        >
          <div className="max-w-5xl mx-auto px-5">
            <div className="mb-10 reveal">
              <p className="font-mono text-xs text-accent uppercase tracking-[0.16em] mb-3">
                Languages
              </p>
              <h2
                className="font-display font-extrabold tracking-tight text-ink"
                style={{ fontSize: 'clamp(26px, 3.2vw, 40px)' }}
              >
                Fluent across borders.
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12 reveal">
              {LANGS.map((lang) => (
                <div
                  key={lang.name}
                  className="rounded-xl px-5 py-5"
                  style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.07)' }}
                >
                  <div className="text-3xl mb-2" aria-hidden="true">{lang.flag}</div>
                  <div className="font-display font-bold text-ink text-base">{lang.name}</div>
                  <div className="font-mono text-[10px] text-muted uppercase tracking-widest mt-0.5">
                    {lang.level}
                  </div>
                </div>
              ))}
            </div>

            <p className="font-body text-muted leading-relaxed max-w-[54ch] reveal" style={{ fontSize: '16px' }}>
              Based in Pind Dadan Khan, Pakistan. Working async with clients across the US, EU, and Middle East. I keep communication tight and documentation thorough — you never have to guess what&rsquo;s happening with your project.
            </p>
          </div>
        </section>

        {/* ── Section 8: CTA strip ───────────────────────────────────────────── */}
        <section
          className="py-20 md:py-28"
          style={{
            background: '#141412',
            borderTop: '1px solid rgba(0,0,0,0.12)',
          }}
        >
          <div className="max-w-5xl mx-auto px-5 text-center reveal">
            <p className="font-mono text-xs text-accent uppercase tracking-[0.16em] mb-5">
              Ready to automate?
            </p>
            <h2
              className="font-display font-extrabold tracking-tight text-bg mb-4"
              style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
            >
              Let&rsquo;s build something.
            </h2>
            <p className="font-body text-muted leading-relaxed mb-10 mx-auto" style={{ maxWidth: '38ch', fontSize: '17px' }}>
              Tell me about the repetitive work that&rsquo;s eating your team&rsquo;s time. I&rsquo;ll tell you exactly how to kill it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/923485872275"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-accent text-bg font-body font-bold text-[15px] rounded-xl hover:bg-accent/90 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
              >
                <WhatsappLogo size={18} weight="fill" />
                Book a free audit
              </a>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 font-body font-semibold text-[15px] rounded-xl transition-all cursor-pointer hover:-translate-y-0.5"
                style={{
                  border: '1.5px solid rgba(255,255,255,0.12)',
                  color: 'rgba(249,248,245,0.85)',
                  background: 'transparent',
                }}
              >
                <EnvelopeSimple size={18} />
                Send a message
                <ArrowRight size={14} className="opacity-60" />
              </button>
            </div>

            <p className="font-mono text-[10px] text-muted/40 mt-8 uppercase tracking-widest">
              mustafahaider758@gmail.com · +923485872275
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
