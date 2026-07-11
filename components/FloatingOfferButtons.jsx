'use client'
import { FileText, Calculator } from '@phosphor-icons/react'

const FLOATING_LINKS = [
  {
    href: '/agency-reporting',
    Icon: FileText,
    title: 'Client Report Assembly Line',
    hint: 'For marketing agencies still building reports by hand — see the fix',
  },
  {
    href: '/roi-calculator',
    Icon: Calculator,
    title: 'ROI Calculator',
    hint: 'Plug in your real numbers, see what manual work is costing you',
  },
]

export default function FloatingOfferButtons() {
  return (
    <div className="hidden lg:flex flex-col gap-4 absolute right-6 top-1/2 -translate-y-1/2 z-20">
      {FLOATING_LINKS.map(({ href, Icon, title, hint }) => (
        <a
          key={href}
          href={href}
          className="group flex items-center h-14 w-14 hover:w-[308px] rounded-full overflow-hidden shadow-lg transition-[width] duration-300 ease-out"
          style={{
            background: '#141412',
            border: '1px solid rgba(255,122,24,0.3)',
          }}
        >
          <span className="flex items-center justify-center w-14 h-14 flex-shrink-0">
            <Icon size={20} weight="bold" className="text-accent" aria-hidden="true" />
          </span>
          <span className="flex flex-col justify-center pr-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100 whitespace-nowrap">
            <span className="font-display font-bold text-[13px] text-bg leading-tight">{title}</span>
            <span className="font-body text-[11px] text-muted leading-tight mt-0.5">{hint}</span>
          </span>
        </a>
      ))}
    </div>
  )
}
