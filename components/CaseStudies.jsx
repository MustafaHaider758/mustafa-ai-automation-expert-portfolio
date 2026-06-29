'use client'
import { useState } from 'react'
import { ArrowSquareOut } from '@phosphor-icons/react'
import ContactModal from './ContactModal'

const PROJECTS = [
  {
    idx: '01',
    title: 'Autonomous Web Intelligence Engine',
    location: 'Belgium / EU',
    category: 'Data Engineering',
    service: 'Web Scraping',
    desc: 'Self-adaptive scraping ecosystem covering 850+ European political domains. Multi-vector bot bypass, Cloudflare evasion, and 24/7 automated monitoring built at EUmatrix.eu.',
    challenge: 'Aggressive anti-bot and Cloudflare protection across hundreds of unique site architectures.',
    solution: 'Waterfall strategy (proxy, Scrapy, Playwright stealth) with a feedback loop adapting per source.',
    tags: ['Python', 'FastAPI', 'n8n', 'Playwright', 'Scrapy', 'Supabase'],
    stats: ['850+ sources', 'Cloudflare bypass', '24/7 uptime'],
    glowColor: 'rgba(255,122,24,0.07)',
  },
  {
    idx: '02',
    title: 'Multi-Site Scraping Pack (4 Sites)',
    location: 'Upwork Client',
    category: 'Data Engineering',
    service: 'Web Scraping',
    desc: 'n8n and Python workflow scraping 4 different sites with separate parsing logic per source, deduplication, and structured output into Google Sheets. Rated 5.0.',
    challenge: 'Client needed clean data from 4 sites with different layouts, anti-bot behavior, and update cadences.',
    solution: 'Per-source parser modules in an n8n orchestrator with retries, content-hash dedup, and normalized schema.',
    tags: ['n8n', 'Python', 'Playwright', 'Google Sheets API'],
    stats: ['5.0 client rating', '4 sites covered', 'Structured output'],
    glowColor: 'rgba(80,140,255,0.06)',
  },
  {
    idx: '03',
    title: 'AI-Powered Social Media Automation',
    location: 'Global - Marketing Ops',
    category: 'Marketing Automation',
    service: 'n8n Workflows',
    desc: 'End-to-end content automation covering research, AI-generated copy, scheduling, and posting across channels using n8n, OpenAI, and Supabase.',
    challenge: 'Founder spending hours daily on copy, scheduling, and posting across multiple platforms with no central record.',
    solution: 'n8n orchestrator with OpenAI generation step, Supabase as content store, and per-channel posting adapters.',
    tags: ['n8n', 'OpenAI API', 'Supabase', 'Webhooks'],
    stats: ['Manual posting eliminated', 'Daily automated cycle', 'Multi-platform'],
    glowColor: 'rgba(160,80,255,0.06)',
  },
  {
    idx: '04',
    title: 'AI-Driven Presentation Generator',
    location: 'Global - Productivity',
    category: 'Productivity Tooling',
    service: 'n8n Workflows',
    desc: 'Workflow turning a prompt into a structured Google Slides deck. OpenAI drafts the outline and content; the Slides API handles layout and theme rendering.',
    challenge: 'Repetitive manual work building structured client decks from scratch every cycle.',
    solution: 'n8n workflow drafting an outline with OpenAI, expanding each slide, then calling the Slides API to render.',
    tags: ['n8n', 'OpenAI API', 'Google Slides API'],
    stats: ['Minutes per deck', 'Manual editing minimized', 'API orchestrated'],
    glowColor: 'rgba(30,200,150,0.06)',
  },
  {
    idx: '05',
    title: 'Gmail to Google Drive Workflow',
    location: 'Upwork Client',
    category: 'Operations',
    service: 'n8n Workflows',
    desc: 'n8n workflow auto-saving Gmail attachments into structured Drive subfolders based on sender, label, and content rules. Rated 5.0, delivered in 3 days.',
    challenge: 'Client receiving dozens of attachments daily, manually downloading and filing each into the correct project folder.',
    solution: 'n8n workflow with Gmail trigger, label/sender rules, deterministic folder routing, duplicate detection, and error logging.',
    tags: ['n8n', 'Gmail API', 'Google Drive API', 'OAuth'],
    stats: ['5.0 client rating', 'Manual filing eliminated', '3-day delivery'],
    glowColor: 'rgba(50,200,100,0.06)',
  },
  {
    idx: '06',
    title: 'EP Newsletter Preparation Pipeline',
    location: 'Upwork Client - Policy',
    category: 'Media / Policy',
    service: 'n8n Workflows',
    desc: 'n8n workflow preparing and sending a recurring European Parliament newsletter. Pulls from PostgreSQL, applies templates, and dispatches tracked emails.',
    challenge: 'Manual extraction, formatting, and email dispatch required each newsletter cycle.',
    solution: 'Scheduled n8n flow pulling from the database, applying templates, and sending with safe retry on failure.',
    tags: ['n8n', 'PostgreSQL', 'Email APIs', 'Templating'],
    stats: ['5.0 client rating', 'Scheduled cadence', 'Manual edits removed'],
    glowColor: 'rgba(255,180,30,0.06)',
  },
]

export default function CaseStudies() {
  const [modalOpen, setModalOpen]       = useState(false)
  const [activeProject, setActiveProject] = useState(null)

  const openForProject = (p) => {
    setActiveProject(p)
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
    setActiveProject(null)
  }

  return (
    <>
      <ContactModal
        open={modalOpen}
        onClose={handleClose}
        defaultService={activeProject?.service ?? ''}
        defaultMessage={
          activeProject
            ? `Hi Mustafa, I came across your "${activeProject.title}" project and I need something similar.\n\nHere's my situation:\n`
            : ''
        }
      />

      <section id="case-studies" className="relative py-24 bg-bg overflow-hidden">
        {/* Floating triangle — decorative */}
        <div
          className="hidden xl:block absolute top-[8%] left-[2%] sh3 pointer-events-none"
          aria-hidden="true"
          style={{
            width: '55px',
            height: '55px',
            background: 'rgba(255,122,24,0.10)',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-5 relative z-10">

          <div className="mb-14 reveal">
            <h2
              className="font-display font-extrabold tracking-tight text-ink leading-none"
              style={{ fontSize: 'clamp(30px, 4vw, 54px)' }}
            >
              Selected work
            </h2>
            <p className="font-body text-muted mt-4 max-w-lg text-[15px]">
              Production systems with verified results. Each one built from scratch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {PROJECTS.map((p, i) => (
              <article
                key={p.idx}
                className="flex flex-col rounded-xl overflow-hidden group reveal"
                style={{
                  border: '1px solid rgba(0,0,0,0.08)',
                  transitionDelay: `${i * 90}ms`,
                }}
              >
                {/* Header: gradient with oversized bg number */}
                <div
                  className="relative h-28 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${p.glowColor}, #f9f8f5)`,
                    borderBottom: '1px solid rgba(0,0,0,0.07)',
                  }}
                >
                  <span
                    className="absolute -bottom-2 right-4 font-display font-black leading-none tracking-tighter select-none"
                    style={{ fontSize: '88px', color: 'rgba(0,0,0,0.05)' }}
                    aria-hidden="true"
                  >
                    {p.idx}
                  </span>
                  <span className="absolute top-4 left-5 font-mono text-[10px] text-accent/80 uppercase tracking-[0.15em]">
                    {p.category}
                  </span>
                  <span className="absolute top-4 right-5 font-mono text-[10px] text-ink/30 uppercase tracking-widest">
                    {p.location}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-6 bg-bg-card">
                  <h3 className="font-display font-bold text-xl text-ink mb-3 leading-snug group-hover:text-accent/90 transition-colors">
                    {p.title}
                  </h3>

                  <p className="font-body text-sm text-muted leading-relaxed mb-5">{p.desc}</p>

                  {/* Challenge / Solution blocks */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-5">
                    <div
                      className="p-3.5 rounded-lg"
                      style={{ background: 'rgba(220,60,60,0.04)', border: '1px solid rgba(220,60,60,0.1)' }}
                    >
                      <div className="font-mono text-[9px] text-red-500/60 uppercase tracking-widest mb-1.5">Challenge</div>
                      <p className="font-body text-xs text-ink/70 leading-relaxed">{p.challenge}</p>
                    </div>
                    <div
                      className="p-3.5 rounded-lg"
                      style={{ background: 'rgba(255,122,24,0.04)', border: '1px solid rgba(255,122,24,0.12)' }}
                    >
                      <div className="font-mono text-[9px] text-accent/70 uppercase tracking-widest mb-1.5">Solution</div>
                      <p className="font-body text-xs text-ink/70 leading-relaxed">{p.solution}</p>
                    </div>
                  </div>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tags.map(t => (
                      <span
                        key={t}
                        className="font-mono text-[10px] text-muted px-2.5 py-1 rounded"
                        style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.07)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Stats row */}
                  <div
                    className="flex flex-wrap gap-x-5 gap-y-1.5 pt-4 mb-5"
                    style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}
                  >
                    {p.stats.map(stat => (
                      <span key={stat} className="font-mono text-[10px] text-muted flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-accent/60 flex-shrink-0" aria-hidden="true" />
                        {stat}
                      </span>
                    ))}
                  </div>

                  {/* CTA button — opens modal pre-filled for this project */}
                  <div className="mt-auto">
                    <button
                      type="button"
                      onClick={() => openForProject(p)}
                      className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-accent/80 hover:text-accent transition-colors cursor-pointer group/btn"
                    >
                      Build something similar
                      <ArrowSquareOut
                        size={14}
                        weight="bold"
                        aria-hidden="true"
                        className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
