const CHIPS = [
  'Lead Generation', 'Web Scraping', 'AI Chatbots',
  'RAG Pipelines',   'n8n Workflows', 'Voice AI',
  'LLM Integration', 'Agentic AI',
]

const METRICS = [
  { n: '10',  s: '+', l: 'Upwork projects'  },
  { n: '850', s: '+', l: 'Sources scraped'  },
  { n: '50',  s: '+', l: 'Live pipelines'   },
  { n: '100', s: '%', l: 'Job success'      },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center grid-bg bg-bg pt-16 overflow-hidden"
    >
      {/* ── Abstract floating shapes (desktop only) ────────────────────────── */}

      {/* Blob A: large organic — upper-left */}
      <div
        className="hidden xl:block absolute top-[8%] left-[-4%] sh1 pointer-events-none"
        aria-hidden="true"
        style={{
          width: '420px',
          height: '360px',
          background: 'rgba(255,122,24,0.09)',
        }}
      />

      {/* Ring: circle outline — upper-right */}
      <div
        className="hidden xl:block absolute top-[16%] right-[7%] sh2 pointer-events-none"
        aria-hidden="true"
        style={{
          width: '165px',
          height: '165px',
          borderRadius: '50%',
          border: '2.5px solid rgba(20,20,18,0.09)',
          background: 'transparent',
        }}
      />

      {/* Triangle: accent — right-mid */}
      <div
        className="hidden xl:block absolute top-[54%] right-[8%] sh3 pointer-events-none"
        aria-hidden="true"
        style={{
          width: '72px',
          height: '72px',
          background: 'rgba(255,122,24,0.14)',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        }}
      />

      {/* Blob B: second organic — lower-left */}
      <div
        className="hidden xl:block absolute bottom-[14%] left-[2%] sh4 pointer-events-none"
        aria-hidden="true"
        style={{
          width: '300px',
          height: '260px',
          background: 'rgba(255,148,50,0.07)',
        }}
      />

      {/* Dot: accent circle — lower-right */}
      <div
        className="hidden xl:block absolute bottom-[30%] right-[14%] sh5 pointer-events-none"
        aria-hidden="true"
        style={{
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: '#ff7a18',
        }}
      />

      {/* ── Main centered content ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-5 w-full py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Availability badge */}
          <div className="hero-fade hero-d0 inline-flex items-center gap-2.5 font-mono text-xs text-muted uppercase tracking-[0.14em] mb-8">
            <span className="w-2 h-2 rounded-full bg-accent pulse-accent flex-shrink-0" />
            Available — 1 project slot open
          </div>

          {/* Headline */}
          <h1
            className="hero-fade hero-d1 font-display font-extrabold leading-[1.04] tracking-tight text-ink mb-6"
            style={{ fontSize: 'clamp(40px,5.6vw,72px)' }}
          >
            I build systems that run
            <br />
            your business{' '}
            <em
              className="not-italic text-shimmer"
              style={{ paddingBottom: '3px', display: 'inline-block' }}
            >
              while you sleep.
            </em>
          </h1>

          {/* Subtext */}
          <p className="hero-fade hero-d2 font-body text-[17px] text-muted leading-relaxed max-w-[34rem] mx-auto mb-10">
            Solo AI automation engineer. Lead gen, scraping, chatbots, RAG. One engineer, end to end. No agency overhead.
          </p>

          {/* CTAs */}
          <div className="hero-fade hero-d3 flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <a
              href="https://wa.me/923485872275"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-4 bg-accent text-white font-body font-bold text-[15px] rounded-lg hover:bg-accent/90 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
            >
              Book a free audit
            </a>
            <a
              href="#case-studies"
              className="inline-flex items-center justify-center px-7 py-4 border text-ink font-body font-semibold text-[15px] rounded-lg hover:border-accent/50 hover:text-accent transition-all"
              style={{ borderColor: 'rgba(0,0,0,0.12)' }}
            >
              See live systems
            </a>
          </div>

          {/* Service chips */}
          <div className="hero-fade hero-d4 flex flex-wrap gap-2 justify-center">
            {CHIPS.map(c => (
              <span
                key={c}
                className="font-mono text-xs text-muted rounded-full px-3.5 py-1.5 hover:border-accent/40 hover:text-ink transition-all cursor-default"
                style={{ border: '1px solid rgba(0,0,0,0.1)' }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* ── Metrics strip ───────────────────────────────────────────────────── */}
        <div
          className="hero-fade hero-d5 mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 rounded-xl overflow-hidden"
          style={{
            gap: '1px',
            border: '1px solid rgba(0,0,0,0.08)',
            background: 'rgba(0,0,0,0.07)',
          }}
        >
          {METRICS.map(m => (
            <div key={m.l} className="bg-bg px-5 py-6 lg:py-8 text-center md:text-left">
              <div
                className="font-display font-extrabold tracking-tight"
                style={{ fontSize: 'clamp(26px,2.8vw,38px)' }}
              >
                <span className="text-ink">{m.n}</span>
                <span className="text-accent">{m.s}</span>
              </div>
              <div className="font-mono text-[10px] text-muted uppercase tracking-[0.14em] mt-1">
                {m.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
