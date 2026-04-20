'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const FOCUS = [
  { title: 'Strong visual hierarchy', body: 'The most important information gets the most visual weight.' },
  { title: 'Better first impressions', body: 'Visitors decide within seconds. The site earns attention fast.' },
  { title: 'Cleaner structure', body: 'Navigation and layout that reduces thinking, not adds to it.' },
  { title: 'Faster execution', body: 'Working quickly without cutting corners on quality or detail.' },
  { title: 'Easier launch', body: 'Hosting, DNS, and deployment handled with a clear plan.' },
  { title: 'Clearer ownership', body: 'Domain, hosting, code — all documented clearly at handover.' },
]

export default function WorkPage() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state via GSAP (not inline styles) for reliable animation
      gsap.set('.sh-word', { yPercent: 110 })
      gsap.set('.sh-meta', { opacity: 0, y: 20 })
      gsap.set('.work-right-panel', { opacity: 0, x: 40 })

      gsap.to('.sh-word', { yPercent: 0, duration: 1.1, stagger: 0.07, ease: 'power4.out', delay: 0.15 })
      gsap.to('.sh-meta', { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.7 })
      gsap.to('.work-right-panel', { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 })

      gsap.to('.work-hero-bg', {
        yPercent: 18, ease: 'none',
        scrollTrigger: { trigger: '.work-hero', start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.work-hero-content', {
        yPercent: 12, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '.work-hero', start: 'top top', end: '60% top', scrub: true },
      })

      gsap.fromTo('.work-page-card', { opacity: 0, y: 44 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.work-page-grid', start: 'top 78%' } }
      )

      document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
        const delay = parseFloat(el.dataset.delay || '0') * 0.08
        gsap.fromTo(el, { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.85, delay, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%' } }
        )
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef}>
      {/* FULL-HEIGHT HERO — split layout */}
      <section className="work-hero" style={{ position: 'relative', minHeight: '100svh', background: 'var(--navy)', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>

        {/* Background grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(196,113,74,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(196,113,74,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} aria-hidden="true" />

        {/* Right image panel */}
        <div className="work-right-panel work-hero-bg" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', overflow: 'hidden' }}>
          <Image src="/work-imac-startup.jpg" alt="" fill sizes="50vw" priority style={{ objectFit: 'cover', opacity: 0.55 }} aria-hidden="true" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--navy) 0%, rgba(26,23,20,0.2) 60%, rgba(26,23,20,0.5) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,23,20,0.4) 0%, transparent 40%, rgba(26,23,20,0.4) 100%)' }} />
        </div>

        {/* Left gradient fade */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '55%', background: 'linear-gradient(to right, var(--navy) 65%, transparent)', zIndex: 1 }} />

        <div className="work-hero-content container" style={{ position: 'relative', zIndex: 2, paddingTop: 80 }}>
          <div style={{ maxWidth: '52%' }}>
            <p className="sh-meta" style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '1.75rem' }}>
              Selected work
            </p>

            <h1 style={{ fontSize: 'clamp(3.5rem, 6vw, 7.5rem)', fontWeight: 800, color: 'white', lineHeight: 0.92, letterSpacing: '-0.04em', marginBottom: '2rem' }}>
              {['Every project', 'has the same', 'core goal.'].map((line, i) => (
                <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                  <span className="sh-word" style={{ display: 'block' }}>
                    {i === 2 ? <><em style={{ fontStyle: 'italic', color: 'var(--cyan)' }}>core</em> goal.</> : line}
                  </span>
                </span>
              ))}
            </h1>

            <p className="sh-meta" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)', color: 'rgba(255,255,255,0.45)', maxWidth: '40ch', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Make the business look stronger online. Sharper design, cleaner structure, more credible from the first visit.
            </p>

            {/* Stats row */}
            <div className="sh-meta" style={{ display: 'flex', gap: '2.5rem' }}>
              {[['48h', 'Avg. delivery'], ['100%', 'Code ownership'], ['0', 'Template sites']].map(([num, label]) => (
                <div key={label}>
                  <p style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, color: 'var(--cyan)', letterSpacing: '-0.04em', lineHeight: 1 }}>{num}</p>
                  <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.3rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WORK GRID */}
      <section className="section">
        <div className="container">
          <div className="work-page-grid">
            <a
              href="https://athlos.fi"
              className="work-page-card"
              style={{ opacity: 0, display: 'block' }}
            >
              <Image src="/work-imac-startup.jpg" alt="Athlos Oy website on iMac" fill sizes="100vw" style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,23,20,0.92), rgba(26,23,20,0.1) 50%, transparent)' }} />
              <div className="work-page-body">
                <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cyan)', display: 'block', marginBottom: '0.375rem' }}>Custom Website</span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>Athlos Oy</h2>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1rem' }}>Premium website for a Finnish advanced X-ray imaging company. Delivered in 3 days.</p>
                <span className="link-arrow link-arrow--light">Visit athlos.fi <Arrow /></span>
              </div>
            </a>

            <article className="work-page-card" style={{ opacity: 0 }}>
              <Image src="/work-laptop-outdoor.jpg" alt="" fill sizes="50vw" style={{ objectFit: 'cover', opacity: 0.6 }} aria-hidden="true" />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,23,20,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 4v8M4 8h8" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Coming soon</p>
                <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8125rem' }}>More projects launching shortly</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FOCUS */}
      <section className="section section--surface">
        <div className="container">
          <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>What I focus on in every project</p>
          <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '3rem' }}>
            The same principles, every time.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--slate-200)', border: '1px solid var(--slate-200)', borderRadius: 16, overflow: 'hidden' }}>
            {FOCUS.map((item, i) => (
              <div key={i} className="reveal" data-delay={String(i % 3)} style={{ background: 'var(--white)', padding: '2rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.65 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-scene" style={{ padding: '8rem 0' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/work-laptop-outdoor.jpg" alt="" fill sizes="100vw" style={{ objectFit: 'cover', opacity: 0.08 }} aria-hidden="true" />
        </div>
        <div className="cta-content container">
          <p className="eyebrow eyebrow--dark reveal" style={{ marginBottom: '1.5rem' }}>Want something similar?</p>
          <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 800, color: 'white', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '2rem' }}>
            Let&apos;s build something<br /><em style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>worth showing.</em>
          </h2>
          <div className="reveal" data-delay="2">
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
              Start your project <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
