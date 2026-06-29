const STEPS = [
  {
    n: '01',
    title: 'Diagnose',
    desc: 'Free 15-minute audit to find exactly where your operation leaks time or money. No pitch, just findings.',
  },
  {
    n: '02',
    title: 'Build',
    desc: 'Custom system built for your workflow. No templates. Documented at every step so you own it fully.',
  },
  {
    n: '03',
    title: 'Deploy',
    desc: 'Live, monitored, and handed over with full documentation. Available post-launch, no disappearing act.',
  },
]

export default function Process() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 bg-bg-2 overflow-hidden"
      style={{
        borderTop:    '1px solid rgba(0,0,0,0.07)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
      }}
    >
      {/* Floating circle ring shape — decorative */}
      <div
        className="hidden xl:block absolute top-[10%] right-[-2%] sh2 pointer-events-none"
        aria-hidden="true"
        style={{
          width: '130px',
          height: '130px',
          borderRadius: '50%',
          border: '2px solid rgba(20,20,18,0.07)',
          background: 'transparent',
        }}
      />

      <div className="max-w-7xl mx-auto px-5 relative z-10">

        <div className="mb-14 reveal">
          <h2
            className="font-display font-extrabold tracking-tight text-ink leading-none"
            style={{ fontSize: 'clamp(30px, 4vw, 54px)' }}
          >
            From first call to live system
          </h2>
        </div>

        <div
          className="grid md:grid-cols-3 rounded-xl overflow-hidden"
          style={{ gap: '1px', border: '1px solid rgba(0,0,0,0.08)', background: 'rgba(0,0,0,0.07)' }}
        >
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className="bg-bg-2 p-8 lg:p-10 relative group reveal"
              style={{ transitionDelay: `${i * 130}ms` }}
            >
              {i < STEPS.length - 1 && (
                <div
                  className="hidden md:block absolute top-[2.6rem] right-0 translate-x-[55%] z-10 font-mono text-xl"
                  style={{ color: 'rgba(0,0,0,0.1)' }}
                  aria-hidden="true"
                >
                  &rsaquo;
                </div>
              )}
              <div
                className="font-display font-black text-[60px] leading-none tracking-tight mb-6"
                style={{ color: 'rgba(255,122,24,0.15)' }}
              >
                {s.n}
              </div>
              <h3 className="font-display font-bold text-2xl text-ink mb-3 group-hover:text-accent transition-colors">
                {s.title}
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="https://wa.me/923485872275"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-body font-bold text-sm rounded-lg hover:bg-accent/90 active:scale-[0.98] transition-all"
          >
            Book a free audit
          </a>
        </div>
      </div>
    </section>
  )
}
