'use client'
import {
  Robot, Funnel, Globe, BookOpen, GitBranch,
  Microphone, Terminal, Brain, Lightning,
} from '@phosphor-icons/react'

const SERVICES = [
  { n: '01', Icon: Robot,      title: 'AI Chatbots',       desc: 'Lead qual - support - 24/7 on WhatsApp and Web' },
  { n: '02', Icon: Funnel,     title: 'Lead Generation',   desc: 'Scraping - enrichment - auto-export to CRM or Sheets' },
  { n: '03', Icon: Globe,      title: 'Web Scraping',      desc: 'Playwright - Cloudflare bypass - proxy rotation - structured output' },
  { n: '04', Icon: BookOpen,   title: 'RAG Pipelines',     desc: 'Document Q&A - pgvector - Chroma - re-ranking' },
  { n: '05', Icon: GitBranch,  title: 'n8n Workflows',     desc: 'Triggers - branching - retries - SaaS integrations end to end' },
  { n: '06', Icon: Microphone, title: 'Voice AI',          desc: 'LiveKit - Deepgram - ElevenLabs - inbound and outbound agents' },
  { n: '07', Icon: Terminal,   title: 'FastAPI Backends',  desc: 'Async Python - type-safe schemas - structured logging - retry logic' },
  { n: '08', Icon: Brain,      title: 'LLM Integrations',  desc: 'OpenAI - Claude - extraction - classification - structured outputs' },
  { n: '09', Icon: Lightning,  title: 'Agentic AI',        desc: 'LangChain - LangGraph - multi-step agents - tool calling - memory' },
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-5">

        <div className="mb-14 reveal">
          <h2
            className="font-display font-extrabold tracking-tight text-ink leading-none"
            style={{ fontSize: 'clamp(30px, 4vw, 54px)' }}
          >
            What I build
          </h2>
          <p className="font-body text-muted mt-4 max-w-lg text-[15px]">
            Bespoke automation systems built to your workflow. From first call to production.
          </p>
        </div>

        <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
          {SERVICES.map((s, i) => (
            <div
              key={s.n}
              className="service-row group px-4 py-5 md:py-6 cursor-default reveal-left"
              style={{
                borderBottom: '1px solid rgba(0,0,0,0.07)',
                transitionDelay: `${i * 55}ms`,
              }}
            >
              {/* Desktop: 3-col grid | Mobile: stacked */}
              <div className="grid md:grid-cols-[44px_auto_1fr] gap-x-8 gap-y-1.5 items-center">
                <span className="font-mono text-xs text-muted/45 group-hover:text-accent transition-colors">
                  {s.n}
                </span>
                <div className="flex items-center gap-3">
                  <s.Icon
                    size={16}
                    weight="duotone"
                    className="text-accent/60 group-hover:text-accent transition-colors flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="font-display font-bold text-[19px] text-ink">{s.title}</span>
                </div>
                <span className="font-mono text-xs text-muted/55 group-hover:text-muted transition-colors pl-7 md:pl-0 md:text-right">
                  {s.desc}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="https://wa.me/923485872275"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg font-body font-bold text-sm rounded-lg hover:bg-accent/90 active:scale-[0.98] transition-all"
          >
            Discuss your project
          </a>
        </div>
      </div>
    </section>
  )
}
