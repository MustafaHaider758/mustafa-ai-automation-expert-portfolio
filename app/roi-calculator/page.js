'use client'
import { useState, useMemo } from 'react'
import Footer from '@/components/Footer'
import RevealObserver from '@/components/RevealObserver'
import ContactModal from '@/components/ContactModal'
import { computeRoi, currency, ASSUMED_AUTOMATION_EFFICIENCY } from '@/lib/roiCalculations'
import { WhatsappLogo, EnvelopeSimple, ArrowSquareOut } from '@phosphor-icons/react'

const inputClass =
  'w-full font-body text-sm text-ink bg-white rounded-lg px-4 py-3 outline-none transition-colors focus:border-accent/60'

export default function RoiCalculatorPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({
    hours: 10,
    people: 1,
    hourlyRate: 30,
    projectFee: 1200,
    maintenance: 60,
  })

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const result = useMemo(
    () =>
      computeRoi({
        hours: form.hours,
        people: form.people,
        hourlyRate: form.hourlyRate,
        efficiency: ASSUMED_AUTOMATION_EFFICIENCY,
        projectFee: form.projectFee,
        maintenance: form.maintenance,
      }),
    [form]
  )

  return (
    <>
      <ContactModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService="Reporting"
        defaultMessage={`Hi Mustafa, I ran the ROI calculator: ${form.hours} hrs/week, ${form.people} people, $${form.hourlyRate}/hr. Here's my situation:\n`}
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
            className="absolute top-[8%] right-[10%] w-[420px] h-[420px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,122,24,0.08) 0%, transparent 68%)' }}
            aria-hidden="true"
          />
          <div className="max-w-3xl mx-auto px-5 relative z-10 text-center reveal">
            <p className="font-mono text-xs text-accent uppercase tracking-[0.16em] mb-4">Free Tool</p>
            <h1
              className="font-display font-extrabold tracking-tight text-ink leading-[1.05] mb-5"
              style={{ fontSize: 'clamp(34px, 5.5vw, 60px)' }}
            >
              See the ROI of automating this
            </h1>
            <p className="font-body text-muted text-base leading-relaxed max-w-xl mx-auto">
              Every hour your team spends on manual, repetitive work has a real cost. Enter your real
              numbers below and see the net savings, payback period, and the exact line to say out loud
              on a call.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-16" style={{ background: '#ffffff', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="max-w-4xl mx-auto px-5">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Inputs */}
              <div className="rounded-2xl p-6 reveal" style={{ background: '#f9f8f5', border: '1px solid rgba(0,0,0,0.07)' }}>
                <h2 className="font-display font-bold text-lg text-ink mb-5">Your real numbers</h2>
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
                      Hours/week on this task
                    </span>
                    <input
                      type="number" min="0" value={form.hours} onChange={set('hours')}
                      className={inputClass} style={{ border: '1px solid rgba(0,0,0,0.1)' }}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
                      People who touch it
                    </span>
                    <input
                      type="number" min="0" value={form.people} onChange={set('people')}
                      className={inputClass} style={{ border: '1px solid rgba(0,0,0,0.1)' }}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
                      Loaded hourly cost ($)
                    </span>
                    <input
                      type="number" min="0" value={form.hourlyRate} onChange={set('hourlyRate')}
                      className={inputClass} style={{ border: '1px solid rgba(0,0,0,0.1)' }}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
                      Project fee ($, one-time)
                    </span>
                    <input
                      type="number" min="0" value={form.projectFee} onChange={set('projectFee')}
                      className={inputClass} style={{ border: '1px solid rgba(0,0,0,0.1)' }}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
                      Maintenance ($/month)
                    </span>
                    <input
                      type="number" min="0" value={form.maintenance} onChange={set('maintenance')}
                      className={inputClass} style={{ border: '1px solid rgba(0,0,0,0.1)' }}
                    />
                  </label>
                </div>
              </div>

              {/* Results */}
              <div className="rounded-2xl p-6 reveal" style={{ background: '#141412' }}>
                <h2 className="font-display font-bold text-lg text-bg mb-5">What it's costing you</h2>
                <div className="flex flex-col gap-3.5">
                  {[
                    ['Weekly cost of this task', currency(result.weeklyCost)],
                    ['Annual cost of this task', currency(result.annualCost)],
                    ['Hours saved / week', `${result.hoursSavedPerWeek.toFixed(1)} hrs`],
                    ['Net savings, year 1', currency(result.netYear1Savings)],
                    ['ROI multiple', `${result.roiMultiple.toFixed(1)}x`],
                    ['Payback period', `${result.paybackMonths.toFixed(1)} months`],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between py-2.5"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <span className="font-body text-xs text-muted">{label}</span>
                      <span className="font-display font-bold text-bg">{value}</span>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-5 rounded-xl p-4"
                  style={{ background: 'rgba(255,122,24,0.12)', border: '1px solid rgba(255,122,24,0.25)' }}
                >
                  <p className="font-body text-sm text-bg leading-relaxed">
                    &ldquo;I help you create <strong>{currency(result.annualSavings)}</strong> of value a
                    year, and I do it for {result.totalInvestment > 0 ? currency(result.totalInvestment) : 'a fraction of that'}.&rdquo;
                  </p>
                </div>

                <p className="font-mono text-[10px] text-muted uppercase tracking-widest mt-4">
                  Suggested guarantee: {result.guaranteeHoursPerMonth.toFixed(1)} hrs/month saved (60% of
                  calculated hours), committable on the spot.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 reveal">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-accent text-white font-body font-bold text-[15px] rounded-xl hover:bg-accent/90 hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer"
              >
                <EnvelopeSimple size={18} />
                Get this built for me
              </button>
              <a
                href="https://www.automationslimited.com/agency-reporting"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 font-body font-semibold text-[15px] rounded-xl transition-all hover:-translate-y-0.5"
                style={{ border: '1.5px solid rgba(0,0,0,0.12)', color: 'rgba(20,20,18,0.85)' }}
              >
                See the agency reporting offer
                <ArrowSquareOut size={16} className="opacity-60" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
