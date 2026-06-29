const EXPERIENCE = [
  {
    role: 'AI and Data Engineer',
    company: 'EUmatrix.eu',
    period: 'Oct 2025 - Present',
    desc: 'Architecting scalable backend systems and data pipelines for a European political intelligence platform (Brussels). Autonomous web crawling engine over 850+ sources, LLM-based extraction with OpenAI and Claude, and Supabase/PostgreSQL schema design.',
  },
  {
    role: 'AI / ML Engineer Internship',
    company: 'DEVROLIN',
    period: 'Jun 2025 - Sep 2025',
    desc: 'Built real-world automation workflows in n8n integrating APIs, databases, and third-party services. Contributed to AI/ML model development with supervised learning, data preprocessing, and evaluation.',
  },
  {
    role: 'Freelance AI Automation Engineer',
    company: 'Upwork - Top Rated, 100% JSS',
    period: '2024 - Present',
    desc: 'Delivered 10+ Upwork projects across n8n automations, web scraping, RAG pipelines, chatbots, and API orchestration. 50+ production automation pipelines live across clients. Consistently rated 5.0.',
  },
  {
    role: 'Freelance Developer',
    company: 'Independent — EU / UK / US / Canada',
    period: '2022 - Present',
    desc: 'Delivering programming assignments and software projects for international students across Europe, the UK, the US, and Canada while completing my Bachelor\'s degree. Built full-stack apps, data analysis scripts, and algorithm solutions across multiple languages and frameworks.',
  },
]

export default function Experience() {
  return (
    <section
      id="about"
      className="relative py-24 bg-bg-2 overflow-hidden"
      style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}
    >
      {/* Floating blob — decorative */}
      <div
        className="hidden xl:block absolute bottom-[10%] right-[-3%] sh4 pointer-events-none"
        aria-hidden="true"
        style={{
          width: '240px',
          height: '200px',
          background: 'rgba(255,148,50,0.06)',
        }}
      />

      <div className="max-w-5xl mx-auto px-5 relative z-10">

        <div className="mb-14 reveal">
          <h2
            className="font-display font-extrabold tracking-tight text-ink leading-none"
            style={{ fontSize: 'clamp(30px, 4vw, 54px)' }}
          >
            Background
          </h2>
        </div>

        <div
          className="relative pl-6"
          style={{ borderLeft: '2px solid rgba(255,122,24,0.2)' }}
        >
          {EXPERIENCE.map((e, i) => (
            <div
              key={`${e.company}-${i}`}
              className="relative mb-12 last:mb-0 group reveal-left"
              style={{ transitionDelay: `${i * 110}ms` }}
            >
              {/* Timeline dot */}
              <div
                className="absolute -left-[29px] top-1.5 w-4 h-4 rounded-full border-2 border-accent/40 group-hover:border-accent transition-colors"
                style={{ background: '#f0eee8' }}
                aria-hidden="true"
              />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-display font-bold text-xl text-ink">{e.role}</h3>
                  <div className="font-mono text-xs text-accent/75 uppercase tracking-widest mt-0.5">
                    {e.company}
                  </div>
                </div>
                <span
                  className="font-mono text-xs text-muted uppercase tracking-widest whitespace-nowrap px-3 py-1 rounded self-start"
                  style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.07)' }}
                >
                  {e.period}
                </span>
              </div>

              <p className="font-body text-sm text-muted leading-relaxed">{e.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Full About Me CTA ───────────────────────────────────────────────── */}
        <a
          href="/about"
          className="reveal group mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-6 rounded-2xl hover:-translate-y-1 transition-all"
          style={{ border: '1px solid rgba(255,122,24,0.18)', background: 'rgba(255,122,24,0.03)' }}
        >
          <div>
            <div className="font-mono text-[9px] text-accent uppercase tracking-[0.16em] mb-2">
              Full story
            </div>
            <h3 className="font-display font-bold text-xl text-ink group-hover:text-accent transition-colors leading-snug">
              Want to know the person behind the pipelines?
            </h3>
            <p className="font-body text-sm text-muted mt-1.5 max-w-md">
              Skills deep-dive, philosophy, what drives me, languages I speak, and why I moved from full-stack web dev into AI automation.
            </p>
          </div>
          <div
            className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-lg font-body font-bold text-sm text-white bg-accent group-hover:bg-accent/90 transition-colors whitespace-nowrap"
          >
            Read my full story
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </div>
        </a>

      </div>
    </section>
  )
}
