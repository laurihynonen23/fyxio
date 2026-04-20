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

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="pricing-feature-icon">
    <path d="M2 7l4 4 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const PLANS = [
  {
    tier: 'Starter',
    price: '€990',
    note: 'One-time project fee',
    featured: false,
    features: ['Up to 5 pages', 'Custom design', 'Mobile-responsive', 'Contact form', 'Domain & hosting setup', 'Full code handover'],
  },
  {
    tier: 'Business',
    price: '€1,990',
    note: 'One-time project fee',
    featured: true,
    badge: 'Most popular',
    features: ['Up to 10 pages', 'Custom design', 'Mobile-responsive', 'Contact form', 'Domain & hosting setup', 'Full code handover', 'Copywriting support', 'Blog or news section', '2 rounds of revisions'],
  },
  {
    tier: 'Premium',
    price: '€4,000',
    note: 'One-time project fee',
    featured: false,
    features: ['Unlimited pages', 'Custom design', 'Mobile-responsive', 'All form types', 'Domain & hosting setup', 'Full code handover', 'Full copywriting', 'Multilingual support', 'Priority turnaround', 'Ongoing support (1 month)'],
  },
]

export default function PricingPage() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.sh-word', { yPercent: 110 })
      gsap.set('.sh-meta', { opacity: 0, y: 20 })
      gsap.set('.price-tier-badge', { opacity: 0, x: -16 })

      gsap.to('.sh-word', { yPercent: 0, duration: 1.1, stagger: 0.07, ease: 'power4.out', delay: 0.15 })
      gsap.to('.sh-meta', { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.7 })
      gsap.to('.price-tier-badge', { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.9 })

      gsap.to('.pricing-hero-bg', {
        yPercent: 20, ease: 'none',
        scrollTrigger: { trigger: '.pricing-hero', start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.pricing-hero-content', {
        yPercent: 15, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '.pricing-hero', start: 'top top', end: '60% top', scrub: true },
      })

      gsap.fromTo('.pricing-card', { opacity: 0, y: 44 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.pricing-grid', start: 'top 78%' } }
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
      {/* FULL-HEIGHT HERO */}
      <section className="pricing-hero" style={{ position: 'relative', minHeight: '100svh', background: 'var(--navy)', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <div className="pricing-hero-bg" style={{ position: 'absolute', inset: 0 }}>
          <Image src="/work-laptop-desk.jpg" alt="" fill sizes="100vw" priority style={{ objectFit: 'cover', opacity: 0.2 }} aria-hidden="true" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--navy) 40%, rgba(26,23,20,0.5) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(196,113,74,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(196,113,74,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} aria-hidden="true" />
        </div>

        {/* Decorative large price watermark */}
        <div style={{ position: 'absolute', right: '-2rem', bottom: '-2rem', fontSize: 'clamp(12rem, 25vw, 22rem)', fontWeight: 900, color: 'rgba(196,113,74,0.04)', lineHeight: 1, letterSpacing: '-0.06em', userSelect: 'none', pointerEvents: 'none' }} aria-hidden="true">
          €
        </div>

        <div className="pricing-hero-content container" style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
          <p className="sh-meta" style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '1.75rem' }}>Pricing</p>

          <h1 style={{ fontSize: 'clamp(3.5rem, 7.5vw, 8.5rem)', fontWeight: 800, color: 'white', lineHeight: 0.92, letterSpacing: '-0.04em', marginBottom: '2.5rem' }}>
            {['Transparent', 'pricing.', 'No surprises.'].map((line, i) => (
              <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                <span className="sh-word" style={{ display: 'block' }}>
                  {i === 0 ? line : i === 1 ? <em style={{ fontStyle: 'italic', color: 'var(--cyan)' }}>{line}</em> : <span style={{ color: 'rgba(255,255,255,0.3)' }}>{line}</span>}
                </span>
              </span>
            ))}
          </h1>

          {/* Tier price anchors */}
          <div className="sh-meta" style={{ display: 'flex', gap: '0', flexWrap: 'wrap', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, overflow: 'hidden', maxWidth: 560 }}>
            {PLANS.map((p, i) => (
              <div key={i} className="price-tier-badge" style={{
                flex: 1,
                padding: '1.25rem 1.5rem',
                background: p.featured ? 'rgba(196,113,74,0.12)' : 'rgba(255,255,255,0.02)',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                borderTop: p.featured ? '2px solid var(--cyan)' : '2px solid transparent',
              }}>
                <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: p.featured ? 'var(--cyan)' : 'rgba(255,255,255,0.3)', marginBottom: '0.375rem' }}>{p.tier}</p>
                <p style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1 }}>{p.price}</p>
              </div>
            ))}
          </div>

          <p className="sh-meta" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)', color: 'rgba(255,255,255,0.35)', maxWidth: '44ch', lineHeight: 1.65 }}>
            Fixed fee, agreed upfront. You know exactly what you&apos;re paying before any work starts.
          </p>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="section">
        <div className="container">
          <div className="pricing-grid" style={{ alignItems: 'stretch' }}>
            {PLANS.map((plan, i) => (
              <div key={i} className={`pricing-card${plan.featured ? ' pricing-card--featured' : ''}`} style={{ opacity: 0 }}>
                {plan.badge && <span className="pricing-badge">{plan.badge}</span>}
                <p className="pricing-tier">{plan.tier}</p>
                <p className="pricing-price">From {plan.price}</p>
                <p className="pricing-note">{plan.note}</p>
                <div className="pricing-divider" />
                <ul className="pricing-features">
                  {plan.features.map((f, j) => (
                    <li key={j} className="pricing-feature"><Check />{f}</li>
                  ))}
                </ul>
                <Link href="/contact" className={`btn${plan.featured ? ' btn-primary' : ''}`}
                  style={!plan.featured ? { border: '1px solid var(--slate-200)', color: 'var(--navy)', width: '100%', justifyContent: 'center' } : { width: '100%', justifyContent: 'center' }}>
                  Start with {plan.tier} <Arrow />
                </Link>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ marginTop: '3rem', padding: '2rem', background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 12 }}>
            <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--navy)' }}>Not sure which fits?</strong> These are starting points. Every project is scoped to what you actually need. Send me a brief and I&apos;ll tell you what makes sense — without pressure.
            </p>
          </div>
        </div>
      </section>

      {/* MAINTENANCE */}
      <section className="section section--surface">
        <div className="container">
          <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>Ongoing work</p>
          <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '3rem' }}>
            Hosting &amp; maintenance<br />billed separately.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {[
              { title: 'Basic hosting', price: '€20–40/mo', body: 'Managed hosting, SSL, uptime monitoring, and basic support.' },
              { title: 'Content updates', price: 'From €80/hr', body: 'Text edits, image swaps, page additions — billed at an hourly rate.' },
            ].map((item, i) => (
              <div key={i} className="reveal" data-delay={String(i)} style={{ padding: '2rem', border: '1px solid var(--slate-200)', borderRadius: 12, background: 'var(--white)' }}>
                <p style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-0.03em', marginBottom: '0.25rem' }}>{item.price}</p>
                <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>{item.title}</p>
                <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', lineHeight: 1.65 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-scene" style={{ padding: '8rem 0' }}>
        <div className="cta-content container">
          <p className="eyebrow eyebrow--dark reveal" style={{ marginBottom: '1.5rem' }}>Let&apos;s talk</p>
          <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 800, color: 'white', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '2rem' }}>
            Ready when you are.
          </h2>
          <div className="reveal" data-delay="2">
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
              Get in touch <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
