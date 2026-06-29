const BRANDS = [
  'MAXWELL REALTY', 'EUMATRIX',    'PIZZA CLOUD',
  'SPAREROOM UK',   'SHEHZAD MILLS', 'MOYASAR',
  'APOGEE ROCKETS',
]

export default function Ticker() {
  const items = [...BRANDS, ...BRANDS, ...BRANDS]

  return (
    <section
      className="w-full py-10 bg-bg-2 overflow-hidden select-none"
      style={{
        borderTop:    '1px solid rgba(0,0,0,0.07)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
      }}
      aria-hidden="true"
    >
      <div className="flex overflow-hidden">
        <div className="animate-ticker whitespace-nowrap">
          {items.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="inline-block px-10 font-display font-black text-[22px] tracking-tight text-ink/[0.14] hover:text-accent/60 transition-colors cursor-default"
            >
              {b}
              <span className="mx-6 text-accent/15">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
