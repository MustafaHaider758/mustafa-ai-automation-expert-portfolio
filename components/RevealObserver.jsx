'use client'
import { useEffect } from 'react'

/**
 * Mounts once at the page root. Finds every element with class
 * `reveal` or `reveal-left` and observes it with IntersectionObserver.
 * Adding `visible` class triggers the CSS transition defined in globals.css.
 * CSS `transition-delay` on individual elements creates stagger effects.
 */
export default function RevealObserver() {
  useEffect(() => {
    // If user prefers reduced motion, make everything visible immediately
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      document.querySelectorAll('.reveal, .reveal-left').forEach(el =>
        el.classList.add('visible')
      )
      return
    }

    const els = document.querySelectorAll('.reveal, .reveal-left')

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    )

    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return null
}
