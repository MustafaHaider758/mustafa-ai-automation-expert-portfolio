import Nav             from '@/components/Nav'
import Hero            from '@/components/Hero'
import Ticker          from '@/components/Ticker'
import Services        from '@/components/Services'
import Process         from '@/components/Process'
import CaseStudies     from '@/components/CaseStudies'
import Experience      from '@/components/Experience'
import Contact         from '@/components/Contact'
import Footer          from '@/components/Footer'
import RevealObserver  from '@/components/RevealObserver'

export default function Home() {
  return (
    <>
      <RevealObserver />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <Process />
        <CaseStudies />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
