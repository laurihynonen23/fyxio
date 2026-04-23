'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageContext'
import { translations } from '@/lib/translations'

gsap.registerPlugin(ScrollTrigger)

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2, color: 'var(--cyan)' }}>
    <path d="M2 7l4 4 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function PricingPage() {
  const { lang } = useLanguage()
  const t = translations[lang].pricing
  const PACKAGES = translations[lang].pricingPackages
  const LAUNCH_OPTIONS = translations[lang].pricingLaunchOptions
  const ONGOING = translations[lang].pricingOngoing
  const PRICE_FACTORS = translations[lang].pricingFactors

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
  }, [lang])

  return (
    <div ref={rootRef}>
      {/* HERO */}
      <section className="pricing-hero" style={{ position: 'relative', minHeight: '100svh', background: 'var(--navy)', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <div className="pricing-hero-bg" style={{ position: 'absolute', inset: 0 }}>
          <Image src="/work-laptop-desk.jpg" alt="" fill sizes="100vw" priority style={{ objectFit: 'cover', opacity: 0.2 }} aria-hidden="true" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--navy) 40%, rgba(26,23,20,0.5) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(196,113,74,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(196,113,74,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} aria-hidden="true" />
        </div>
        <div style={{ position: 'absolute', right: '-2rem', bottom: '-2rem', fontSize: 'clamp(12rem, 25vw, 22rem)', fontWeight: 900, color: 'rgba(196,113,74,0.04)', lineHeight: 1, letterSpacing: '-0.06em', userSelect: 'none', pointerEvents: 'none' }} aria-hidden="true">€</div>

        <div className="pricing-hero-content container" style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
          <p className="sh-meta" style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '1.75rem' }}>{t.eyebrow}</p>

          <h1 style={{ fontSize: 'clamp(3.5rem, 7.5vw, 8.5rem)', fontWeight: 800, color: 'white', lineHeight: 0.92, letterSpacing: '-0.04em', marginBottom: '2.5rem' }}>
            {t.heroTitle.map((line, i) => (
              <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                <span className="sh-word" style={{ display: 'block' }}>
                  {i === 1 ? <em style={{ fontStyle: 'italic', color: 'var(--cyan)' }}>{line}</em>
                    : i === 2 ? <span style={{ color: 'rgba(255,255,255,0.3)' }}>{line}</span>
                    : line}
                </span>
              </span>
            ))}
          </h1>

          <div className="sh-meta" style={{ display: 'flex', gap: 0, flexWrap: 'wrap', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, overflow: 'hidden', maxWidth: 560 }}>
            {PACKAGES.map((p, i) => (
              <div key={i} className="price-tier-badge" style={{
                flex: 1, padding: '1.25rem 1.5rem',
                background: p.featured ? 'rgba(196,113,74,0.12)' : 'rgba(255,255,255,0.02)',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                borderTop: p.featured ? '2px solid var(--cyan)' : '2px solid transparent',
              }}>
                <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: p.featured ? 'var(--cyan)' : 'rgba(255,255,255,0.3)', marginBottom: '0.375rem' }}>{p.tier}</p>
                <p style={{ fontSize: 'clamp(0.875rem, 1.4vw, 1.2rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1 }}>{p.price}</p>
              </div>
            ))}
          </div>

          <p className="sh-meta" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)', color: 'rgba(255,255,255,0.35)', maxWidth: '44ch', lineHeight: 1.65 }}>
            {t.heroSubNote}
          </p>
        </div>
      </section>

      {/* BUILD PACKAGES */}
      <section className="section">
        <div className="container">
          <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>{t.packagesEyebrow}</p>
          <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '3rem' }}>
            {t.packagesTitle.split('\n').map((line, i) => <span key={i} style={{ display: 'block' }}>{line}</span>)}
          </h2>

          <div className="pricing-grid" style={{ alignItems: 'stretch' }}>
            {PACKAGES.map((plan, i) => (
              <div key={i} className={`pricing-card${plan.featured ? ' pricing-card--featured' : ''}`} style={{ opacity: 0, display: 'flex', flexDirection: 'column' }}>
                {plan.badge && <span className="pricing-badge">{plan.badge}</span>}
                <p className="pricing-tier">{plan.tier}</p>
                <p className="pricing-price">{plan.price}</p>
                <p className="pricing-note">{plan.note}</p>
                <div className="pricing-divider" />
                <p style={{ fontSize: '0.9rem', color: plan.featured ? 'rgba(255,255,255,0.5)' : 'var(--slate-500)', lineHeight: 1.65, marginBottom: '1.25rem' }}>{plan.desc}</p>
                <ul className="pricing-features" style={{ flex: 1 }}>
                  {plan.features.map((f, j) => (
                    <li key={j} className="pricing-feature">
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`btn${plan.featured ? ' btn-primary' : ''}`}
                  style={!plan.featured
                    ? { border: '1px solid var(--slate-200)', color: 'var(--navy)', width: '100%', justifyContent: 'center', marginTop: '0.5rem' }
                    : { width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
                >
                  {t.startWith} {plan.tier} <Arrow />
                </Link>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ marginTop: '2rem', padding: '1.125rem 1.75rem', background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 10 }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)', lineHeight: 1.7 }}>{t.packagesNote}</p>
          </div>
        </div>
      </section>

      {/* LAUNCH SETUP */}
      <section className="section section--surface">
        <div className="container">
          <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>{t.launchEyebrow}</p>
          <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            {t.launchTitle.split('\n').map((line, i) => <span key={i} style={{ display: 'block' }}>{line}</span>)}
          </h2>
          <p className="reveal" data-delay="2" style={{ fontSize: '1rem', color: 'var(--slate-600)', lineHeight: 1.75, maxWidth: '52ch', marginBottom: '3rem' }}>{t.launchBody}</p>

          <div className="options-grid">
            {LAUNCH_OPTIONS.map((opt, i) => (
              <div key={i} className="reveal" data-delay={String(i)} style={{ background: 'var(--white)', border: '1px solid var(--slate-200)', borderRadius: 16, padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '0.375rem' }}>{t.bestFor}</p>
                <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--slate-500)', marginBottom: '1.25rem' }}>{opt.bestFor}</p>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>{opt.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: 1.65, marginBottom: '1.5rem' }}>{opt.desc}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', flex: 1 }}>
                  {opt.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--slate-600)' }}>
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
                <div style={{ borderTop: '1px solid var(--slate-200)', paddingTop: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.625rem', marginBottom: '0.5rem' }}>
                    <p style={{ fontSize: 'clamp(1.25rem, 2vw, 1.625rem)', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-0.03em' }}>{opt.price}</p>
                    {'oldPrice' in opt && opt.oldPrice && (
                      <s style={{ fontSize: '0.875rem', color: 'var(--slate-400)', fontWeight: 500 }}>{opt.oldPrice as string}</s>
                    )}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--slate-400)', lineHeight: 1.55 }}>{opt.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ marginTop: '2rem', padding: '1.125rem 1.75rem', background: 'rgba(196,113,74,0.06)', border: '1px solid rgba(196,113,74,0.18)', borderRadius: 10 }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--navy)' }}>{t.domainNote}</strong>{' '}{t.domainNoteSub}
            </p>
          </div>
        </div>
      </section>

      {/* ONGOING */}
      <section className="section">
        <div className="container">
          <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>{t.ongoingEyebrow}</p>
          <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '3rem' }}>
            {t.ongoingTitle.split('\n').map((line, i) => <span key={i} style={{ display: 'block' }}>{line}</span>)}
          </h2>

          <div className="options-grid" style={{ marginBottom: '1.5rem' }}>
            {ONGOING.map((item, i) => (
              <div key={i} className="reveal" data-delay={String(i)} style={{ background: 'var(--white)', border: '1px solid var(--slate-200)', borderRadius: 16, padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '0.875rem' }}>{item.label}</p>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-0.02em', marginBottom: '0.375rem' }}>{item.title}</h3>
                <p style={{ fontSize: 'clamp(1.5rem, 2.2vw, 1.875rem)', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '1rem' }}>{item.price}</p>
                <div style={{ height: 1, background: 'var(--slate-200)', marginBottom: '1rem' }} />
                <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.65, marginBottom: '1.25rem' }}>{item.body}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1 }}>
                  {item.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--slate-500)' }}>
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ padding: '1.5rem 2rem', background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--slate-400)', marginBottom: '0.375rem' }}>{t.hourlyLabel}</p>
              <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', lineHeight: 1.65, maxWidth: '52ch' }}>{t.hourlyDesc}</p>
            </div>
            <p style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-0.03em', flexShrink: 0 }}>{t.hourlyPrice}</p>
          </div>
        </div>
      </section>

      {/* AI BUILD SESSION */}
      <section style={{ background: 'var(--navy)', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(196,113,74,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(196,113,74,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} aria-hidden="true" />
        <div style={{ position: 'absolute', top: '-8rem', right: '-8rem', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,113,74,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} aria-hidden="true" />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--navy)', background: 'var(--cyan)', padding: '0.35rem 0.8rem', borderRadius: 999 }}>{t.aiSessionNew}</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>{t.aiSessionAvailable}</span>
          </div>

          <div className="ai-session-grid">
            <div className="ai-text">
              <h2 className="reveal" style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4.5rem)', fontWeight: 800, color: 'white', lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
                {t.aiSessionTitle}<br /><em style={{ fontStyle: 'italic', color: 'var(--cyan)' }}>{t.aiSessionTitleHighlight}</em>
              </h2>
              <p className="reveal" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: '50ch' }}>
                {t.aiSessionBody}
              </p>
            </div>

            <div className="ai-price reveal" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '2.5rem', minWidth: 260, textAlign: 'center' }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '1rem' }}>{t.aiSessionOneTime}</p>
              <p style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: '0.5rem' }}>{t.aiSessionPrice}</p>
              <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)', marginBottom: '2rem', lineHeight: 1.5 }}>
                {t.aiSessionNote.split('\n').map((line, i) => <span key={i} style={{ display: 'block' }}>{line}</span>)}
              </p>
              <Link href="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                {t.aiSessionBook} <Arrow />
              </Link>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)', marginTop: '1rem' }}>{t.aiSessionRemote}</p>
            </div>

            <div className="ai-bullets reveal">
              <div className="ai-bullets-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
                {t.aiSessionFeatures.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 3, color: 'var(--cyan)' }}>
                      <path d="M2 7l4 4 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="ai-prereqs reveal" style={{ padding: '1rem 1.375rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12 }}>
              <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '0.625rem' }}>{t.aiSessionPrereqLabel}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {t.aiSessionPrereqs.map((r, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--cyan)', flexShrink: 0, marginTop: 1 }}>·</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT AFFECTS PRICE */}
      <section className="section section--surface">
        <div className="container">
          <div className="price-factors-layout">
            <div>
              <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>{t.scopeEyebrow}</p>
              <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '2.5rem' }}>
                {t.scopeTitle.split('\n').map((line, i) => <span key={i} style={{ display: 'block' }}>{line}</span>)}
              </h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.9rem', paddingBottom: '2.5rem' }}>
                {PRICE_FACTORS.map((f, i) => (
                  <li key={i} className="reveal" data-delay={String(i % 3)} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem', fontSize: '1rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cyan)', flexShrink: 0, marginTop: '0.45rem', display: 'block' }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal" style={{ background: 'var(--navy)', borderRadius: 20, padding: '3rem' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '1.5rem' }}>{t.scopeNotSureLabel}</p>
              <h3 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.125rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'white', marginBottom: '1.25rem' }}>
                {t.scopeNotSureTitle.split('\n').map((line, i) => <span key={i} style={{ display: 'block' }}>{line}</span>)}
              </h3>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: '2.5rem' }}>{t.scopeNotSureBody}</p>
              <Link href="/contact" className="btn btn-primary">
                {t.scopeAskRec} <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-scene" style={{ padding: '8rem 0' }}>
        <div className="cta-content container">
          <p className="eyebrow eyebrow--dark reveal" style={{ marginBottom: '1.5rem' }}>{t.ctaEyebrow}</p>
          <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 800, color: 'white', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '2rem' }}>
            {t.ctaTitle}
          </h2>
          <div className="reveal" data-delay="2">
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
              {t.getInTouch} <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .ai-session-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          column-gap: 5rem;
          row-gap: 2.5rem;
          align-items: start;
        }
        .ai-text    { grid-column: 1; grid-row: 1; }
        .ai-price   { grid-column: 2; grid-row: 1 / 5; align-self: start; }
        .ai-bullets { grid-column: 1; grid-row: 2; }
        .ai-prereqs { grid-column: 1; grid-row: 3; }
        @media (max-width: 768px) {
          .ai-session-grid {
            grid-template-columns: 1fr;
            row-gap: 1.5rem;
          }
          .ai-text    { grid-column: 1; grid-row: 1; }
          .ai-price   { grid-column: 1; grid-row: 2; }
          .ai-bullets { grid-column: 1; grid-row: 3; }
          .ai-prereqs { grid-column: 1; grid-row: 4; }
          .ai-bullets-inner { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
