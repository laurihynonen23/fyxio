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

const LinkedInIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7.5 9.5V18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 18V13.5C12 11.8431 13.3431 10.5 15 10.5C16.6569 10.5 18 11.8431 18 13.5V18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.5 6.75C7.5 6.33579 7.16421 6 6.75 6C6.33579 6 6 6.33579 6 6.75C6 7.16421 6.33579 7.5 6.75 7.5C7.16421 7.5 7.5 7.16421 7.5 6.75Z" fill="currentColor" />
  </svg>
)

const LINKEDIN_URL = 'https://www.linkedin.com/in/lauri-hyn%C3%B6nen-18372b22b'

export default function AboutPage() {
  const { lang } = useLanguage()
  const t = translations[lang].about
  const CREDENTIALS = translations[lang].aboutCredentials
  const PRINCIPLES = translations[lang].aboutPrinciples

  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.sh-word', { yPercent: 110 })
      gsap.set('.sh-meta', { opacity: 0, y: 20 })
      gsap.set('.about-quote-line', { opacity: 0, x: -24 })

      gsap.to('.sh-word', { yPercent: 0, duration: 1.1, stagger: 0.07, ease: 'power4.out', delay: 0.15 })
      gsap.to('.sh-meta', { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.7 })
      gsap.to('.about-quote-line', { opacity: 1, x: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 1.0 })

      gsap.to('.about-hero-bg', {
        yPercent: 20, ease: 'none',
        scrollTrigger: { trigger: '.about-hero', start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.about-hero-content', {
        yPercent: 12, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '.about-hero', start: 'top top', end: '60% top', scrub: true },
      })

      gsap.fromTo('.about-visuals', { opacity: 0, y: 32, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.about-split', start: 'top 75%' } })
      gsap.fromTo('.about-text', { opacity: 0, x: -32 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.about-split', start: 'top 75%' } })

      gsap.fromTo('.belief-item',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.beliefs', start: 'top 78%' } }
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
      <section className="about-hero" style={{ position: 'relative', minHeight: '100svh', background: 'var(--navy)', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <div className="about-hero-bg" style={{ position: 'absolute', inset: 0 }}>
          <Image src="/about-ignite-stage.jpeg" alt="" fill sizes="100vw" priority style={{ objectFit: 'cover', opacity: 0.22 }} aria-hidden="true" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--navy) 50%, rgba(26,23,20,0.3) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,23,20,0.3) 0%, transparent 30%, rgba(26,23,20,0.5) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(196,113,74,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(196,113,74,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} aria-hidden="true" />
        </div>

        <div className="about-hero-content container" style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
          <div className="about-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '4rem', alignItems: 'center', maxWidth: '100%' }}>
            <div>
              <p className="sh-meta" style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '1.75rem' }}>
                {t.eyebrow}
              </p>

              <h1 style={{ fontSize: 'clamp(3.5rem, 7vw, 8rem)', fontWeight: 800, color: 'white', lineHeight: 0.9, letterSpacing: '-0.04em', marginBottom: '2.5rem' }}>
                {t.heroTitle.map((line, i) => (
                  <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                    <span className="sh-word" style={{ display: 'block' }}>
                      {i === 1
                        ? <><em style={{ fontStyle: 'italic', color: 'var(--cyan)' }}>{line.split(' ')[0]}</em>{' '}{line.split(' ').slice(1).join(' ')}</>
                        : line}
                    </span>
                  </span>
                ))}
              </h1>

              <p className="sh-meta" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.125rem)', color: 'rgba(255,255,255,0.4)', maxWidth: '44ch', lineHeight: 1.7, marginBottom: '3rem' }}>
                {t.heroSubtitle}
              </p>

              <div className="sh-meta" style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
                {t.heroStats.map(([val, label]) => (
                  <div key={label}>
                    <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.75rem)', fontWeight: 800, color: 'var(--cyan)', letterSpacing: '-0.03em', lineHeight: 1 }}>{val}</p>
                    <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.3rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ minWidth: 280, maxWidth: 320 }}>
              {t.manifestoQuotes.map((q, i) => (
                <div key={i} className="about-quote-line" style={{
                  padding: '1.25rem 0',
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                  ...(i === 2 ? { borderBottom: '1px solid rgba(255,255,255,0.07)' } : {}),
                }}>
                  <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--cyan)', marginBottom: '0.5rem' }}>{q.num}</p>
                  <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.55, fontStyle: 'italic' }}>&ldquo;{q.text}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="Connect on LinkedIn" className="about-hero-li">
          <LinkedInIcon size={16} />
          {t.linkedIn}
        </a>
      </section>

      {/* WHO I AM */}
      <section className="section">
        <div className="container">
          <div className="about-split">
            <div className="about-text" style={{ opacity: 0 }}>
              <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>{t.whoIAmEyebrow}</p>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--navy)', marginBottom: '1.25rem' }}>
                {t.hiName}
              </h2>
              <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'var(--slate-600)', lineHeight: 1.75, marginBottom: '1.25rem' }}>{t.bio1}</p>
              <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'var(--slate-600)', lineHeight: 1.75, marginBottom: '1.25rem' }}>{t.bio2}</p>
              <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'var(--slate-600)', lineHeight: 1.75, marginBottom: '2rem' }}>{t.bio3}</p>
              <div className="about-link-row">
                <Link href="/contact" className="btn btn-primary">
                  {t.startConversation} <Arrow />
                </Link>
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="about-social-link">
                  <LinkedInIcon size={18} />
                  {t.linkedIn}
                </a>
              </div>
            </div>
            <div className="about-visuals" style={{ opacity: 0 }}>
              <div className="about-stage-card">
                <Image src="/about-ignite-stage.jpeg" alt="Lauri presenting at Aalto Ignite demo day" width={5818} height={5261} quality={90} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
              <div className="about-portrait-group">
                <div className="about-portrait-inner">
                  <Image src="/about-portrait-suit.jpeg" alt="Portrait of Lauri" fill sizes="220px" style={{ objectFit: 'cover', objectPosition: 'top center' }} />
                </div>
              </div>
            </div>
          </div>
          <div style={{ maxWidth: 760, marginTop: '5rem' }}>
            <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>{t.relevantBackgroundEyebrow}</p>
            <h3 className="reveal" data-delay="1" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', color: 'var(--navy)' }}>
              {t.relevantBackgroundTitle}
            </h3>
          </div>
          <div className="about-highlights">
            {CREDENTIALS.map((item, i) => (
              <div key={i} className={`about-highlight reveal${i === 0 ? ' about-highlight--featured' : ''}`} data-delay={String(i % 2)}>
                <p className="about-highlight-label">{item.label}</p>
                <h3 className="about-highlight-title">{item.title}</h3>
                <p className="about-highlight-body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY I STARTED */}
      <section className="section section--surface">
        <div className="container">
          <div style={{ maxWidth: 640, marginBottom: '3rem' }}>
            <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>{t.whyStartedEyebrow}</p>
            <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              {t.whyStartedTitle}
            </h2>
            <p className="reveal" data-delay="2" style={{ fontSize: '1rem', color: 'var(--slate-600)', lineHeight: 1.8, marginTop: '1.5rem' }}>{t.whyStarted1}</p>
            <p className="reveal" data-delay="3" style={{ fontSize: '1rem', color: 'var(--slate-600)', lineHeight: 1.8, marginTop: '1rem' }}>{t.whyStarted2}</p>
            <p className="reveal" data-delay="4" style={{ fontSize: '1rem', color: 'var(--slate-600)', lineHeight: 1.8, marginTop: '1rem' }}>{t.whyStarted3}</p>
          </div>
          <div className="beliefs">
            {PRINCIPLES.map((b, i) => (
              <div key={i} className="belief-item" style={{ opacity: 0 }}>
                <p className="belief-num">0{i + 1}</p>
                <div>
                  <p className="belief-title">{b.title}</p>
                  <p className="belief-text">{b.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-scene" style={{ padding: '8rem 0' }}>
        <div className="cta-content container">
          <p className="eyebrow eyebrow--dark reveal" style={{ marginBottom: '1.5rem' }}>{t.workTogetherEyebrow}</p>
          <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 800, color: 'white', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '2rem' }}>
            {t.ctaTitle}<br /><em style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>{t.ctaTitleHighlight}</em>
          </h2>
          <div className="reveal" data-delay="2">
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
              {t.getInTouch} <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
