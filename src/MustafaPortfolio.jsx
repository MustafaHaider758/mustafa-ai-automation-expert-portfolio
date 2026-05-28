import React, { useState, useCallback, useMemo } from 'react';
import {
  Sparkles, Menu, X, ArrowRight, Database,
  Mail, Calendar, Cpu, MessageSquare, Phone, Globe, Zap,
  TrendingUp, Workflow, ExternalLink, MessageCircle, BarChart3, Clock, AlertTriangle, ShieldCheck, PhoneCall, Network, CalendarCheck, Linkedin, BriefcaseBusiness
} from 'lucide-react';

// --- Static Data ---
const NAV_ITEMS = ['How It Works', 'Services', 'Case Studies', 'About'];

const TICKER_BRANDS = [
  'MAXWELL REALTY', 'APOGEE ROCKETS', 'PIZZA CLOUD',
  'SPAREROOM UK', 'SHEHZAD MILLS', 'MOYASAR'
];

const STATS_DATA = [
  { label: 'Client Projects', value: '8+', id: 'stat-1' },
  { label: 'Sources Monitored', value: '850+', id: 'stat-2' },
  { label: 'Production Workflows', value: '12+', id: 'stat-3' },
  { label: 'Job Success', value: '100%', id: 'stat-4' }
];

const PROJECTS_DATA = [
  {
    title: 'Autonomous Web Intelligence Engine',
    image: '/projects/web-intelligence.jpg',
    desc: 'Self-adaptive scraping ecosystem covering 850+ European political and government domains with multi-vector bot bypass, Cloudflare evasion, and 24/7 monitoring. Built at EUmatrix.eu (Brussels).',
    location: 'Belgium / EU • Data Engineering',
    tags: ['Python', 'FastAPI', 'Google Cloud', 'n8n', 'Playwright', 'Scrapy', 'Supabase'],
    stats: [
      { label: 'Sources Monitored', value: '850+', percent: 100 },
      { label: 'Cloudflare Bypass', value: 'Production', percent: 100 },
      { label: 'Reporting', value: '24/7', percent: 100 }
    ],
    challenge: 'Aggressive anti-bot measures and Cloudflare protection across hundreds of unique site architectures, with strict reliability targets.',
    solution: 'Waterfall strategy (proxy → Scrapy → Playwright stealth) with a feedback loop that adapts to successful vectors per source. Hot paths moved into FastAPI workers with retries and DLQ.'
  },
  {
    title: 'Multi-Site Scraping Pack (4 Websites)',
    image: '/projects/scraping-pack.jpg',
    desc: 'n8n + Python workflow scraping 4 different websites with separate parsing logic per source, deduplication, and structured output into Google Sheets. Delivered for an Upwork client (5.0 / Reliable).',
    location: 'Upwork Client • Data Engineering',
    tags: ['n8n', 'Python', 'Playwright', 'Google Sheets API'],
    stats: [
      { label: 'Client Rating', value: '5.0', percent: 100 },
      { label: 'Sites Covered', value: '4', percent: 100 },
      { label: 'Output', value: 'Structured', percent: 100 }
    ],
    challenge: 'Client needed clean, structured data from 4 sites with different layouts, anti-bot behavior, and update cadences.',
    solution: 'Per-source parser modules in an n8n orchestrator, with retries, content-hash dedup, and a normalized schema written to Google Sheets for the client team.'
  },
  {
    title: 'AI-Powered Social Media Automation',
    image: '/projects/social-media-automation.jpg',
    desc: 'End-to-end content automation: research, AI-generated copy, scheduling, and posting across channels using n8n, OpenAI and Supabase as the source of truth.',
    location: 'Global • Marketing Ops',
    tags: ['n8n', 'OpenAI API', 'Supabase', 'Webhooks'],
    stats: [
      { label: 'Manual Posting', value: 'Eliminated', percent: 100 },
      { label: 'Content Cycle', value: 'Daily', percent: 100 },
      { label: 'Channels', value: 'Multi-Platform', percent: 100 }
    ],
    challenge: 'Founder spending hours per day on copy, scheduling, and posting across multiple platforms with no central record.',
    solution: 'n8n orchestrator + OpenAI generation step, Supabase as content store, scheduled posting with retry and per-channel adapters.'
  },
  {
    title: 'AI-Driven Presentation Generator',
    image: '/projects/ai-presentation-generator.jpg',
    desc: 'Workflow that turns a prompt into a structured Google Slides deck using OpenAI for outline + content and the Slides API for layout — built in n8n.',
    location: 'Global • Productivity Tooling',
    tags: ['n8n', 'OpenAI API', 'Google Slides API'],
    stats: [
      { label: 'Deck Build Time', value: 'Minutes', percent: 100 },
      { label: 'Manual Editing', value: 'Minimized', percent: 100 },
      { label: 'API Orchestration', value: 'Automated', percent: 100 }
    ],
    challenge: 'Repetitive manual work building structured client decks from scratch.',
    solution: 'n8n workflow that drafts an outline with OpenAI, expands each slide, then calls the Google Slides API to render layouts and themes.'
  },
  {
    title: 'Gmail → Google Drive Attachment Workflow',
    image: '/projects/gmail-drive-workflow.jpg',
    desc: 'n8n workflow that automatically saves Gmail email attachments into structured Google Drive subfolders based on sender, label, and content rules. Delivered for a real Upwork client (5.0 rating).',
    location: 'Upwork Client • Operations',
    tags: ['n8n', 'Gmail API', 'Google Drive API', 'OAuth'],
    stats: [
      { label: 'Client Rating', value: '5.0', percent: 100 },
      { label: 'Manual Filing', value: 'Eliminated', percent: 100 },
      { label: 'Delivery Time', value: '3 Days', percent: 100 }
    ],
    challenge: 'Client receiving dozens of attachments daily, manually downloading and filing them into the correct project folders.',
    solution: 'n8n workflow with Gmail trigger, label/sender rules, deterministic folder routing, duplicate detection, and structured error logging.'
  },
  {
    title: 'EP Newsletter Preparation & Sending Pipeline',
    image: '/projects/ep-newsletter.jpg',
    desc: 'n8n workflow that prepares and sends a recurring European Parliament newsletter — pulling data from a database, formatting content, and dispatching email. Delivered for an Upwork client (5.0 / Reliable).',
    location: 'Upwork Client • Media / Policy',
    tags: ['n8n', 'PostgreSQL', 'Email APIs', 'Templating'],
    stats: [
      { label: 'Client Rating', value: '5.0', percent: 100 },
      { label: 'Cadence', value: 'Scheduled', percent: 100 },
      { label: 'Manual Edits', value: 'Removed', percent: 100 }
    ],
    challenge: 'Manual extraction, formatting, and email dispatch each newsletter cycle.',
    solution: 'Scheduled n8n flow pulling records from the database, applying templates, and sending tracked emails with safe retry on failure.'
  }
];

const EXPERIENCE_DATA = [
  {
    role: 'AI & Data Engineer (Backend & Automation)',
    company: 'EUmatrix.eu',
    date: 'Oct 2025 - Present',
    desc: 'Architecting scalable backend systems and data pipelines for a European political intelligence platform (Brussels). Owning the autonomous web crawling engine over 850+ sources, LLM-based extraction with OpenAI and Claude, and Supabase/PostgreSQL schema design. Most production code under NDA (Belgian & Romanian law).'
  },
  {
    role: 'AI / ML Engineer (Internship)',
    company: 'DEVROLIN',
    date: 'Jun 2025 - Sep 2025',
    desc: 'Built real-world automation workflows in n8n integrating APIs, databases, and third-party services. Contributed to AI/ML model development with supervised learning, data preprocessing, and evaluation.'
  },
  {
    role: 'Freelance AI Automation Engineer',
    company: 'Upwork (Top Rated, 100% JSS)',
    date: '2024 - Present',
    desc: 'Delivered 8+ production engagements across n8n automations, web scraping, RAG/chatbots, and API orchestration for international clients. Consistently rated 5.0 / Reliable.'
  },
  {
    role: 'Technical Writer',
    company: 'EssayShark',
    date: '2022 - Present',
    desc: 'Producing technical documentation on AI, Data Science, and Automation for enterprise and academic audiences.'
  }
];

export default function MustafaPortfolio() {
  const [activeView, setActiveView] = useState({ 0: 'results', 1: 'results', 2: 'results', 3: 'results', 4: 'results' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const toggleView = useCallback((idx, view) => {
    setActiveView(prev => ({ ...prev, [idx]: view }));
  }, []);

  const fullTicker = useMemo(() => {
    const double = [...TICKER_BRANDS, ...TICKER_BRANDS, ...TICKER_BRANDS];
    return double.map((brand, i) => ({ name: brand, id: `ticker-${i}` }));
  }, []);

  return (
    <div className="bg-white min-h-screen font-heading selection:bg-emerald-500 selection:text-white">
      {/* NAVIGATION */}
      <nav className="fixed w-full z-50 transition-all duration-500 h-[72px] bg-white/80 backdrop-blur-md shadow-3d border-b border-black/5" aria-label="Main Navigation">
        <div className="container mx-auto h-full px-6 flex justify-between items-center">
          <a className="flex items-center gap-2 group" href="/" aria-label="Mustafa.ai Home">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-3d-primary">
              <Sparkles className="text-white w-5 h-5" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-emerald-500 transition-colors">
              Mustafa<span className="text-emerald-500">.ai</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="group relative transition-colors text-sm font-semibold text-muted hover:text-foreground">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full" aria-hidden="true" />
              </a>
            ))}
            <a href="https://wa.me/923485872275" target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-500 text-white rounded-xl text-sm font-bold transition-all shadow-3d-primary hover:scale-105 active:scale-95">
              Work with me
            </a>
          </div>

          <button
            className="lg:hidden text-foreground p-2 hover:bg-black/5 rounded-full transition-colors"
            aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(prev => !prev)}
          >
            {mobileMenuOpen
              ? <X className="w-6 h-6" aria-hidden="true" />
              : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-[72px] left-0 right-0 bg-white border-b border-black/5 shadow-3d animate-in slide-in-from-top-2">
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={`m-${item}`}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={closeMobileMenu}
                  className="text-base font-semibold text-foreground py-3 border-b border-black/5 hover:text-emerald-500 transition-colors"
                >
                  {item}
                </a>
              ))}
              <a
                href="https://wa.me/923485872275"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="mt-2 px-6 py-3 bg-emerald-500 text-white rounded-xl text-sm font-bold text-center shadow-3d-primary"
              >
                Work with me
              </a>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* HYBRID HERO SECTION (MUSTAFA'S LAYOUT + PREMIUM STYLE) */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-28 pb-20 bg-soft-glow">
          <div className="absolute inset-0 z-0 grid-bg opacity-[0.4] pointer-events-none" aria-hidden="true" />

          <div className="absolute top-[10%] left-[5%] w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] z-0 animate-pulse pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-[10%] right-[10%] w-64 h-64 bg-cyan-400/10 rounded-full blur-[100px] z-0 animate-pulse pointer-events-none" aria-hidden="true" />

          <div className="container mx-auto relative z-10 px-6 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-white shadow-3d border border-black/5 mb-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-sm font-bold text-foreground/80 tracking-tight">Available for Projects</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight leading-none">
                    Mustafa Haider <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-400">
                      AI Automation <br className="hidden md:block" /> Specialist
                    </span>
                  </h1>
                </div>

                <p className="text-lg md:text-xl text-muted max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                  At <span className="text-emerald-600 font-bold">Mustafa.ai</span>, we architect efficiency through intelligent code. I build production-grade AI systems that automate your workflows, saving you <span className="text-foreground font-bold underline decoration-emerald-500/30">20+ hours every week</span>.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-4">
                  <a href="https://wa.me/923485872275" target="_blank" rel="noopener noreferrer"
                    className="w-full sm:w-auto px-10 py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-lg transition-all shadow-3d-primary hover:shadow-primary-glow hover:-translate-y-1 flex items-center justify-center gap-3">
                    Get a Free Audit
                    <ArrowRight className="w-6 h-6" aria-hidden="true" />
                  </a>
                  <a href="#case-studies" className="w-full sm:w-auto px-10 py-5 bg-white border border-black/5 text-foreground rounded-2xl font-bold text-lg transition-all shadow-3d hover:shadow-3d-hover hover:-translate-y-1">
                    See Live Systems
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 pt-10 border-t border-black/5 lg:justify-start justify-center">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={`avatar-${i}`} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center font-bold text-[10px] text-muted shadow-sm">AI</div>
                    ))}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-black text-foreground">Trusted by Global Clients</div>
                    <div className="text-xs font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-emerald-500" aria-hidden="true" />
                      6 Countries • 15+ Projects
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative group">
                  {/* Decorative Elements */}
                  <div className="absolute -inset-4 bg-emerald-500/20 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none" aria-hidden="true" />
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

                  <div className="relative z-10 w-[300px] h-[400px] md:w-[400px] md:h-[500px] bg-white rounded-[2.5rem] p-4 shadow-3d-hover rotate-2 lg:rotate-6 group-hover:rotate-0 transition-all duration-700 overflow-hidden border border-black/5">
                    <img
                      src="/image.jpeg"
                      alt="Mustafa Haider - AI Automation Specialist"
                      className="w-full h-full object-cover rounded-[2rem] grayscale-[0.2] group-hover:grayscale-0 transition-all"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" aria-hidden="true" />
                  </div>

                  {/* Stats Overlay Cards */}
                  <div className="absolute -bottom-6 -left-10 z-20 bg-white p-6 rounded-3xl shadow-3d border border-black/5 animate-bounce-slow">
                    <div className="text-emerald-500 font-black text-2xl tracking-tighter">500+</div>
                    <div className="text-[10px] font-bold text-muted uppercase tracking-widest whitespace-nowrap">Hours Saved Annually</div>
                  </div>

                  <div className="absolute top-1/2 -right-16 z-20 bg-white p-6 rounded-3xl shadow-3d border border-black/5 animate-floating hidden md:block">
                    <div className="flex items-center gap-2 mb-1">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" aria-hidden="true" />
                      <span className="text-foreground font-bold">100% Success</span>
                    </div>
                    <div className="text-[10px] font-bold text-muted uppercase tracking-widest">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LOGO TICKER */}
        <section className="w-full border-y border-black/5 bg-white py-12 overflow-hidden relative select-none">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" aria-hidden="true" />
          <div className="container mx-auto px-6 mb-10 text-center flex flex-col items-center">
            <p className="text-xs font-black text-muted/40 uppercase tracking-[0.4em] mb-4">Trusted by Industry Leaders</p>
          </div>
          <div className="flex w-full overflow-hidden">
            <div className="animate-scroll whitespace-nowrap py-4">
              {fullTicker.map((brand) => (
                <span key={brand.id} className="inline-block px-12 font-heading font-black text-3xl tracking-tighter text-foreground/20 hover:text-emerald-500 transition-colors cursor-default drop-shadow-sm">
                  {brand.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ECOSYSTEM DIAGRAM */}
        <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none" aria-hidden="true" />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">The Ecosystem of <span className="text-emerald-500 italic">Seamless</span> Scaling</h2>
            <p className="text-muted max-w-2xl mx-auto font-medium mb-12">Your business tools are silos. AI turns them into a unified, high-speed engine.</p>

            <div className="w-full max-w-4xl mx-auto">
              <svg viewBox="0 0 1000 480" className="w-full h-auto overflow-visible" aria-label="Automation Ecosystem Diagram">
                <radialGradient id="cGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </radialGradient>
                <ellipse cx="500" cy="240" rx="130" ry="130" fill="url(#cGlow)" />

                <g stroke="#e2e8f0" strokeWidth="1.5" fill="none">
                  <path id="in-wa" d="M 110 100 C 305 100, 305 240, 500 240" />
                  <path id="in-voice" d="M 110 240 C 305 240, 305 240, 500 240" />
                  <path id="in-web" d="M 110 380 C 305 380, 305 240, 500 240" />
                  <path id="out-crm" d="M 500 240 C 695 240, 695 100, 890 100" />
                  <path id="out-email" d="M 500 240 C 695 240, 695 240, 890 240" />
                  <path id="out-cal" d="M 500 240 C 695 240, 695 380, 890 380" />
                </g>

                <g fill="#10b981">
                  <circle r="4"><animateMotion dur="2.3s" repeatCount="indefinite" path="M 110 100 C 305 100, 305 240, 500 240" /></circle>
                  <circle r="4"><animateMotion dur="2.1s" repeatCount="indefinite" path="M 110 240 C 305 240, 305 240, 500 240" /></circle>
                  <circle r="4"><animateMotion dur="2.5s" repeatCount="indefinite" path="M 110 380 C 305 380, 305 240, 500 240" /></circle>
                  <circle r="4"><animateMotion dur="2.8s" repeatCount="indefinite" path="M 500 240 C 695 240, 695 100, 890 100" /></circle>
                  <circle r="4"><animateMotion dur="2.4s" repeatCount="indefinite" path="M 500 240 C 695 240, 695 240, 890 240" /></circle>
                  <circle r="4"><animateMotion dur="3s" repeatCount="indefinite" path="M 500 240 C 695 240, 695 380, 890 380" /></circle>
                </g>

                <g>
                  <rect x="430" y="180" width="140" height="120" rx="24" fill="white" stroke="#10b981" strokeWidth="2" />
                  <foreignObject x="460" y="200" width="80" height="40">
                    <div className="flex items-center justify-center h-full w-full"><Cpu className="text-emerald-500 w-10 h-10" aria-hidden="true" /></div>
                  </foreignObject>
                  <text x="500" y="275" textAnchor="middle" fontSize="10" fontWeight="800" fill="#10b981" letterSpacing="0.15em">MUSTAFA ENGINE</text>
                </g>

                <g fontSize="10" fontWeight="bold" fill="#64748b" textAnchor="middle">
                  <g transform="translate(110, 100)"><circle r="30" fill="white" stroke="#e2e8f0" strokeWidth="1" /><foreignObject x="-12" y="-12" width="24" height="24"><MessageSquare className="text-emerald-500" aria-hidden="true" /></foreignObject><text y="45">WHATSAPP</text></g>
                  <g transform="translate(110, 240)"><circle r="30" fill="white" stroke="#e2e8f0" strokeWidth="1" /><foreignObject x="-12" y="-12" width="24" height="24"><Phone className="text-indigo-500" aria-hidden="true" /></foreignObject><text y="45">VOICE</text></g>
                  <g transform="translate(110, 380)"><circle r="30" fill="white" stroke="#e2e8f0" strokeWidth="1" /><foreignObject x="-12" y="-12" width="24" height="24"><Globe className="text-cyan-500" aria-hidden="true" /></foreignObject><text y="45">WEB</text></g>

                  <g transform="translate(890, 100)"><circle r="30" fill="white" stroke="#e2e8f0" strokeWidth="1" /><foreignObject x="-12" y="-12" width="24" height="24"><Database className="text-orange-500" aria-hidden="true" /></foreignObject><text y="45">CRM</text></g>
                  <g transform="translate(890, 240)"><circle r="30" fill="white" stroke="#e2e8f0" strokeWidth="1" /><foreignObject x="-12" y="-12" width="24" height="24"><Mail className="text-blue-500" aria-hidden="true" /></foreignObject><text y="45">EMAIL</text></g>
                  <g transform="translate(890, 380)"><circle r="30" fill="white" stroke="#e2e8f0" strokeWidth="1" /><foreignObject x="-12" y="-12" width="24" height="24"><Calendar className="text-purple-500" aria-hidden="true" /></foreignObject><text y="45">CALENDAR</text></g>
                </g>
              </svg>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="bg-slate-50 border-y border-black/5 py-12">
          <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS_DATA.map((s) => (
              <div key={s.id} className="text-center group">
                <div className="text-4xl font-black text-foreground group-hover:text-emerald-500 transition-colors">{s.value}</div>
                <p className="text-xs font-bold text-muted uppercase tracking-[0.2em] mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HIDDEN COST TRACKER */}
        <section id="why-automate" className="py-24 bg-white relative">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-3xl md:text-5xl font-black text-foreground">The Hidden Cost of <span className="text-red-500 italic">Ignoring</span> AI</h2>
              <p className="text-muted max-w-2xl mx-auto font-medium">Manual bottlenecks aren't just slow — they're expensive.</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-10">
              <div className="bg-white p-10 rounded-[2.5rem] border border-red-500/10 shadow-3d space-y-8">
                <div className="flex items-center gap-5 mb-10">
                  <div className="w-16 h-16 rounded-[1.25rem] bg-red-50 flex items-center justify-center border border-red-100"><AlertTriangle className="text-red-500 w-8 h-8" aria-hidden="true" /></div>
                  <div><h3 className="text-2xl font-black text-foreground">Manual Bottlenecks</h3><p className="text-red-500 font-bold uppercase text-[10px] tracking-widest mt-1">Leaking revenue 24/7</p></div>
                </div>
                <ul className="space-y-8">
                  {[
                    { icon: Clock, title: 'Staff Overwhelm', text: 'Managers spend 15+ hours weekly on repetitive queries.' },
                    { icon: TrendingUp, title: 'Response Latency', text: 'Late replies lead to dead prospects and lost deals.' },
                    { icon: Database, title: 'Data Fragmentation', text: 'Manual CRM updates lead to lost follow-up opportunities.' }
                  ].map((item, i) => (
                    <li key={`manual-${i}`} className="flex gap-5">
                      <div className="mt-1 bg-red-50 p-2 rounded-xl h-fit"><item.icon className="w-5 h-5 text-red-500" aria-hidden="true" /></div>
                      <div><h4 className="text-foreground font-bold mb-1 text-lg">{item.title}</h4><p className="text-muted text-sm leading-relaxed font-medium">{item.text}</p></div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-10 rounded-[2.5rem] border border-emerald-500/10 shadow-3d space-y-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-emerald-500/5 opacity-30 group-hover:opacity-50 transition-opacity pointer-events-none" aria-hidden="true" />
                <div className="relative z-10 flex items-center gap-5 mb-10">
                  <div className="w-16 h-16 rounded-[1.25rem] bg-emerald-500 flex items-center justify-center shadow-3d-primary group-hover:rotate-12 transition-transform"><Zap className="text-white w-8 h-8" aria-hidden="true" /></div>
                  <div><h3 className="text-2xl font-black text-foreground">The AI Advantage</h3><p className="text-emerald-500 font-bold uppercase text-[10px] tracking-widest mt-1">Scale without headcount</p></div>
                </div>
                <ul className="relative z-10 space-y-8">
                  {[
                    { icon: ShieldCheck, title: 'Instant 2-Sec Replies', text: 'Your brand is active 24/7, answering every lead instantly.' },
                    { icon: TrendingUp, title: 'Unlimited Capacity', text: 'Scale from 50 to 5,000 inquiries without extra hiring.' },
                    { icon: Zap, title: 'Autonomous Accuracy', text: 'AI syncs every detail with 100% data integrity.' }
                  ].map((item, i) => (
                    <li key={`advantage-${i}`} className="flex gap-5">
                      <div className="mt-1 bg-white p-2 rounded-xl h-fit shadow-md border border-emerald-500/20"><item.icon className="w-5 h-5 text-emerald-500" aria-hidden="true" /></div>
                      <div><h4 className="text-foreground font-bold mb-1 text-lg">{item.title}</h4><p className="text-muted text-sm leading-relaxed font-medium">{item.text}</p></div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section id="services" className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-6xl text-center">
            <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-4">What I Build <span className="text-emerald-500 italic">For You</span></h2>
            <p className="text-muted max-w-2xl mx-auto font-medium mb-16">Bespoke automation systems designed specifically to dissolve operational headaches.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 auto-rows-min text-left">
              {[
                { Icon: MessageSquare, color: 'text-[#25D366]', title: 'AI Chat Agents', desc: 'Intelligent agents qualifying leads, answering FAQs, and handling support 24/7 on WhatsApp & Web.' },
                { Icon: PhoneCall, color: 'text-emerald-500', title: 'Voice AI Systems', desc: 'Low-latency inbound and outbound agents (LiveKit, Deepgram, ElevenLabs) that book directly into CRM.' },
                { Icon: Database, color: 'text-cyan-500', title: 'RAG Pipelines', desc: 'Production document Q&A with chunking, embeddings, vector search (pgvector / Chroma) and re-ranking.' },
                { Icon: Workflow, color: 'text-orange-500', title: 'n8n & Make Workflows', desc: 'End-to-end orchestration: triggers, branching, retries, and clean integrations across SaaS tools.' },
                { Icon: Zap, color: 'text-emerald-500', title: 'FastAPI Backends', desc: 'Async Python services with type-safe schemas, structured logging, and proper retry / idempotency logic.' },
                { Icon: Cpu, color: 'text-indigo-500', title: 'LLM Integrations', desc: 'OpenAI & Claude pipelines for extraction, classification, summarization, and structured outputs.' },
                { Icon: Globe, color: 'text-blue-400', title: 'Web Scraping & Bot Bypass', desc: 'Resilient crawlers with Cloudflare evasion, proxy rotation, and Playwright fallback for protected sources.' },
                { Icon: Sparkles, color: 'text-violet-500', title: 'Agentic AI', desc: 'LangChain / LangGraph multi-step agents with tool calling, memory, and human-in-the-loop routing.' },
                { Icon: CalendarCheck, color: 'text-rose-400', title: 'Smart Booking & Sync', desc: 'Scheduling, calendar, and CRM synchronization that removes operational friction end-to-end.' }
              ].map((svc) => (
                <div key={svc.title} className="bg-white p-6 rounded-2xl border border-black/5 shadow-3d group relative flex flex-col hover:shadow-3d-hover transition-all">
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-3d-primary flex items-center justify-center mb-4">
                      <svc.Icon className={`w-6 h-6 ${svc.color}`} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-black text-foreground mb-2">{svc.title}</h3>
                    <p className="text-muted font-medium text-xs leading-relaxed">{svc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CASE STUDIES */}
        <section id="case-studies" className="py-24 bg-slate-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight underline decoration-emerald-500/20 underline-offset-8">Featured Case Studies</h2>
              <p className="text-muted max-w-2xl mx-auto font-medium">Bespoke technical solutions yielding verified results.</p>
            </div>

            <div className="space-y-16">
              {PROJECTS_DATA.map((project, idx) => (
                <div key={project.title} className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-3d border border-black/5 relative overflow-hidden group hover:shadow-3d-hover transition-all duration-500">
                  {project.image && (
                    <div className="mb-8 -mt-4 -mx-4 md:-mx-8 rounded-[2rem] overflow-hidden border border-black/5 bg-slate-50">
                      <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        className="w-full h-44 md:h-56 object-cover"
                      />
                    </div>
                  )}
                  <div className="grid lg:grid-cols-2 gap-12 relative z-10">
                    <div className="space-y-8 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-col gap-2 mb-6 text-center lg:text-left">
                          <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start"><h3 className="text-3xl font-black text-foreground">{project.title}</h3><div className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-xs font-bold border">Active</div></div>
                          <div className="flex items-center gap-4 text-sm font-bold text-muted uppercase tracking-widest justify-center lg:justify-start"><Globe className="w-4 h-4" /> {project.location}</div>
                        </div>
                        <p className="text-muted text-lg font-medium leading-relaxed mb-6">{project.desc}</p>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          <div className="p-6 bg-red-50/50 rounded-2xl border border-red-100 flex flex-col gap-2"><span className="text-red-500 text-[10px] font-black uppercase tracking-widest">Challenge</span><p className="text-foreground text-sm font-bold">{project.challenge}</p></div>
                          <div className="p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 flex flex-col gap-2"><span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">Solution</span><p className="text-foreground text-sm font-bold">{project.solution}</p></div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-6 border-t border-black/5 justify-center lg:justify-start">
                        {project.tags.map(tag => <span key={`tag-${project.title}-${tag}`} className="px-3 py-1.5 bg-white shadow-3d border border-black/5 rounded-lg text-xs font-black text-muted/80">{tag}</span>)}
                      </div>
                    </div>

                    <div className="bg-slate-50 p-8 md:p-10 rounded-[2rem] border border-black/5 flex flex-col justify-between shadow-inner h-full w-full">
                      <div className="flex items-center gap-4 mb-8 bg-black/5 p-1.5 rounded-2xl w-max self-center lg:self-start">
                        <button onClick={() => toggleView(idx, 'results')} aria-label="Show Results" className={`px-5 py-2.5 rounded-xl text-sm font-black flex items-center justify-center gap-2 transition-all ${activeView[idx] === 'results' ? 'bg-white shadow-sm text-emerald-500' : 'text-muted hover:text-foreground'}`}><BarChart3 className="w-4 h-4" aria-hidden="true" /> Results</button>
                        <button onClick={() => toggleView(idx, 'arch')} aria-label="Show Architecture" className={`px-5 py-2.5 rounded-xl text-sm font-black flex items-center justify-center gap-2 transition-all ${activeView[idx] === 'arch' ? 'bg-white shadow-sm text-emerald-500' : 'text-muted hover:text-foreground'}`}><Workflow className="w-4 h-4" aria-hidden="true" /> Architecture</button>
                      </div>
                      <div className="flex-grow">
                        {activeView[idx] === 'results' ? (
                          <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-bottom-2">
                            {project.stats.map((s) => (
                              <div key={`stat-${project.title}-${s.label}`} className="space-y-3">
                                <div className="flex justify-between items-end"><span className="text-muted font-black text-[10px] uppercase tracking-widest">{s.label}</span><span className="text-foreground font-black text-2xl tracking-tighter">{s.value}</span></div>
                                <div className="h-3 w-full bg-black/5 rounded-full overflow-hidden shadow-inner"><div className="h-full bg-emerald-500 shadow-3d-primary" style={{ width: `${s.percent}%` }} aria-hidden="true" /></div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-6 bg-white/50 rounded-2xl border border-black/5 font-mono text-[11px] leading-relaxed text-slate-600 animate-in fade-in slide-in-from-top-2">
                            <span className="text-emerald-500 font-bold">{"// Workflow Definition"}</span><br />
                            const config = {'{'}<br />
                            &nbsp;&nbsp;agents: ['GPT-4-Turbo', 'Whisper-V3'],<br />
                            &nbsp;&nbsp;logic: 'Self-Correcting-State-Machine',<br />
                            &nbsp;&nbsp;storage: 'Supabase-Vector-DB'<br />
                            {'}'};
                          </div>
                        )}
                      </div>
                      <a href="https://wa.me/923485872275" target="_blank" rel="noopener noreferrer" className="mt-8 w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-3d-primary hover:shadow-primary-glow hover:-translate-y-1 transition-all">
                        Secure Integration <ExternalLink className="w-5 h-5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section id="about" className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="flex items-center gap-4 mb-16"><span className="w-12 h-0.5 bg-emerald-500" aria-hidden="true" /><span className="text-xs font-black text-emerald-500 uppercase tracking-widest">About Mustafa</span></div>
            <div className="space-y-12">
              {EXPERIENCE_DATA.map((exp) => (
                <div key={`exp-${exp.company}`} className="relative pl-10 border-l-2 border-emerald-500/10 group">
                  <div className="absolute top-0 left-[-11px] w-5 h-5 bg-white border-2 border-emerald-500 rounded-full group-hover:scale-125 transition-transform" aria-hidden="true" />
                  <div className="flex justify-between items-start mb-1"><h4 className="text-xl font-black text-foreground">{exp.role}</h4><span className="text-[10px] font-black uppercase text-muted py-1 px-3 bg-slate-50 rounded-full">{exp.date}</span></div>
                  <div className="text-emerald-500 font-bold text-xs uppercase tracking-widest mb-4">{exp.company}</div>
                  <p className="text-muted text-sm font-medium leading-relaxed">{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LEAD CAPTURE */}
        <section id="contact" className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-6xl text-center">
            <div className="bg-[#0f172a] rounded-[4rem] p-10 md:p-20 relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-emerald-500/5 opacity-50 group-hover:opacity-70 transition-opacity" aria-hidden="true" />
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight relative z-10">Scale safely <br /> with AI.</h2>
              <p className="text-slate-400 text-xl font-medium mb-12 max-w-2xl mx-auto relative z-10">Book a free 15-minute audit. We'll find exactly where your operations are leaking profit.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                <a href="https://wa.me/923485872275" target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-emerald-500 text-white rounded-2xl font-black text-xl shadow-xl shadow-emerald-500/20 hover:scale-105 transition-transform flex items-center gap-3">
                  Chat on WhatsApp <MessageCircle className="w-6 h-6" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-black/10 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 pb-16 border-b border-black/5">
            <div className="text-center md:text-left space-y-4">
              <div className="text-2xl font-black text-foreground">Mustafa<span className="text-emerald-500">.ai</span></div>
              <p className="text-muted font-medium max-w-xs text-sm">Architecting efficiency through intelligent code and bespoke AI solutions.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/mustafa-haider-034152176/' },
                { label: 'Upwork', icon: BriefcaseBusiness, href: 'https://www.upwork.com/freelancers/~01e19bb071ea911c71' },
                { label: 'WhatsApp', icon: MessageCircle, href: 'https://wa.me/923485872275' },
                { label: 'Email', icon: Mail, href: 'mailto:mustafahaider758@gmail.com' }
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 group"
                  aria-label={link.label}
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-black/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-3d-primary group-hover:-translate-y-1">
                    <link.icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted group-hover:text-emerald-500 transition-colors">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-10 gap-6">
            <div className="text-muted text-xs font-bold tracking-widest uppercase flex items-center gap-2">
              <span className="w-4 h-px bg-emerald-500" aria-hidden="true" />
              © 2026 Mustafa Haider • Built with Precision
            </div>

            <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted/40">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
