import { Bricolage_Grotesque, JetBrains_Mono, Inter } from 'next/font/google'
import './globals.css'

const displayFont = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
  preload: true,
})

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '700'],
  display: 'swap',
  preload: false,
})

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
})

const BASE_URL = 'https://mustafa-ai-automation-expert-portfolio.vercel.app'

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Mustafa Haider — AI Automation Engineer',
  description:
    'Solo AI automation engineer. Lead generation, web scraping, chatbots, and RAG pipelines for local businesses and growing teams.',
  keywords: [
    'AI automation', 'n8n workflows', 'web scraping', 'RAG pipelines',
    'AI chatbots', 'lead generation', 'FastAPI', 'LLM integrations',
    'Mustafa Haider', 'freelance AI engineer', 'Upwork automation'
  ],
  authors: [{ name: 'Mustafa Haider' }],
  creator: 'Mustafa Haider',
  robots: { index: true, follow: true },
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: 'Mustafa Haider — AI Automation Engineer',
    description: 'Lead gen, scraping, chatbots, RAG. End to end. No agency overhead.',
    url: BASE_URL,
    siteName: 'Mustafa.dev',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mustafa Haider — AI Automation Engineer',
    description: 'Lead gen, scraping, chatbots, RAG pipelines. Built for scale.',
    creator: '@mustafaghln8n',
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${monoFont.variable} ${bodyFont.variable}`}
    >
      <body className="bg-bg text-ink font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
