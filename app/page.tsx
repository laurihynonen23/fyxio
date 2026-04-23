'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
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

export default function Home() {
  const { lang } = useLanguage()
  const t = translations[lang].home
  const SERVICES = translations[lang].homeServices
  const STEPS = translations[lang].homeSteps
  const CLIENTS = translations[lang].homeClients

  const heroRef = useRef<HTMLElement>(null)
  const heroPhotoRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const valueRef = useRef<HTMLElement>(null)
  const ctaBgRef = useRef<HTMLDivElement>(null)

  const [activeService, setActiveService] = useState(0)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const switchService = useCallback((idx: number) => {
    setActiveService(idx)
  }, [])

  useEffect(() => {
    autoRef.current = setInterval(() => {
      setActiveService((prev) => (prev + 1) % SERVICES.length)
    }, 4000)
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [SERVICES.length])

  const handleTabClick = (idx: number) => {
    if (autoRef.current) clearInterval(autoRef.current)
    switchService(idx)
    autoRef.current = setInterval(() => {
      setActiveService((p) => (p + 1) % SERVICES.length)
    }, 4000)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl
        .fromTo('.hero-eyebrow', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo('.hero-word', { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.07 }, '-=0.6')
        .fromTo('.hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.5')
        .fromTo('.hero-speed-badge', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.7 }, '-=0.7')
        .fromTo('.hero-actions', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.3')

      gsap.to(heroPhotoRef.current, {
        yPercent: 25, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(heroContentRef.current, {
        yPercent: 18, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '55% top', scrub: true },
      })
      gsap.fromTo('.value-statement',
        { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'power3.out',
          scrollTrigger: { trigger: valueRef.current, start: 'top 70%' } }
      )
      document.querySelectorAll<HTMLElement>('.stat-num').forEach((el) => {
        const target = parseInt(el.dataset.target || '0', 10)
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target, duration: 1.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate() { el.textContent = Math.round(obj.val).toString() },
        })
      })
      document.querySelectorAll('.process-item').forEach((item) => {
        gsap.fromTo(item, { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 83%', onEnter: () => item.classList.add('revealed') } }
        )
      })
      gsap.to(ctaBgRef.current, {
        yPercent: 18, ease: 'none',
        scrollTrigger: { trigger: '.cta-scene', start: 'top bottom', end: 'bottom top', scrub: true },
      })
      gsap.fromTo('.cta-word', { yPercent: 115 },
        { yPercent: 0, duration: 1, stagger: 0.08, ease: 'power4.out',
          scrollTrigger: { trigger: '.cta-scene', start: 'top 72%' } }
      )
      document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
        const delay = parseFloat(el.dataset.delay || '0') * 0.08
        gsap.fromTo(el, { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.85, delay, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%' } }
        )
      })
    }, heroRef)
    return () => ctx.revert()
  }, [lang])

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="hero-scene" ref={heroRef} aria-label="Hero">
        <div className="hero-bg">
          <div ref={heroPhotoRef} style={{ position: 'absolute', inset: 0 }}>
            <Image src="/hero-main.png" alt="" fill priority sizes="100vw" className="hero-photo" aria-hidden="true" />
          </div>
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-gradient" aria-hidden="true" />
        </div>

        <div className="hero-content" ref={heroContentRef}>
          <div className="hero-eyebrow" aria-hidden="true">
            <span className="hero-eyebrow-dot" />
            {t.eyebrow}
          </div>

          <h1 className="hero-title">
            {t.heroTitle.map((line, i) => (
              <span key={i} className="word" style={{ display: 'block', overflow: 'hidden' }}>
                <span className="hero-word" style={{ display: 'block' }}>{line}</span>
              </span>
            ))}
          </h1>

          <div className="hero-speed-badge" style={{ opacity: 0, display: 'inline-flex', alignItems: 'center', gap: '0.625rem', background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: 100, padding: '0.5rem 1rem', marginBottom: '1.5rem' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', display: 'block', flexShrink: 0, animation: 'pulse 2s ease-in-out infinite' }} />
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
              {t.heroBadge} <strong style={{ color: 'var(--cyan)' }}>{t.heroBadgeHighlight}</strong>
            </span>
          </div>

          <p className="hero-subtitle">{t.heroSubtitle}</p>

          <div className="hero-actions" style={{ opacity: 0 }}>
            <Link href="/contact" className="btn btn-primary">
              {t.heroCta1} <Arrow />
            </Link>
            <Link href="/work" className="btn btn-outline">
              {t.heroCta2}
            </Link>
          </div>
        </div>

        <div className="hero-scroll" style={{ opacity: 0 }} aria-hidden="true">
          <span className="hero-scroll-label">{t.scroll}</span>
          <span className="hero-scroll-line" />
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────── */}
      <div className="marquee-section" aria-hidden="true">
        <div className="marquee-track">
          {[...Array(2)].flatMap((_, rep) =>
            t.marqueeItems.map((item, i) => (
              <span key={`${rep}-${i}`} className="marquee-item">
                {item}<span className="marquee-sep">✦</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── SPEED CALLOUT ────────────────────────────── */}
      <section style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <p className="eyebrow reveal" style={{ marginBottom: '1.25rem' }}>{t.whyEyebrow}</p>
              <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: 'white', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
                {t.whyTitle} <em style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>{t.whyTitleHighlight}</em>
              </h2>
              <p className="reveal" data-delay="2" style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: '44ch' }}>
                {t.whyBody}
              </p>
            </div>
            <div className="reveal" data-delay="1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
              {t.stats.map((s, i) => (
                <div key={i} style={{ padding: '2rem', background: 'var(--navy-mid)' }}>
                  <p style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: 'var(--cyan)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '0.375rem' }}>{s.num}</p>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUE STATEMENT ──────────────────────────── */}
      <section className="value-scene" ref={valueRef}>
        <div className="container">
          <p className="eyebrow eyebrow--dark" style={{ marginBottom: '2rem' }}>{t.believeEyebrow}</p>
          <p className="value-statement" style={{ fontSize: 'clamp(2.25rem, 5vw, 5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.035em', color: 'var(--navy)' }}>
            {t.valueStatement[0]}<em style={{ fontStyle: 'italic', color: 'var(--cyan)' }}>{t.valueStatement[1]}</em>{t.valueStatement[2]}<br />
            <span style={{ color: 'var(--slate-200)' }}>{t.valueStatement2}</span><br />
            {t.valueStatement3}
          </p>
        </div>
      </section>

      {/* ── SERVICES TAB SWITCHER ─────────────────────── */}
      <section style={{ background: 'var(--navy)', padding: '6rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem' }}>
            <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>{t.whatIDoEyebrow}</p>
            <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: 'white', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              {t.whatIDoTitle}<br />{t.whatIDoTitle2}
            </h2>
          </div>

          <div className="reveal" style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            {SERVICES.map((s, i) => (
              <button
                key={i}
                onClick={() => handleTabClick(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.625rem 1.125rem',
                  borderRadius: 100,
                  border: activeService === i ? '1px solid var(--cyan)' : '1px solid rgba(255,255,255,0.12)',
                  background: activeService === i ? 'rgba(34,211,238,0.1)' : 'transparent',
                  color: activeService === i ? 'var(--cyan)' : 'rgba(255,255,255,0.45)',
                  fontSize: '0.8125rem', fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>{s.num}</span>
                {s.title.split(' ').slice(0, 2).join(' ')}
              </button>
            ))}
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: '2.5rem', position: 'relative', overflow: 'hidden', borderRadius: 1 }}>
            <div
              key={activeService}
              style={{
                position: 'absolute', inset: 0,
                background: 'var(--cyan)',
                transformOrigin: 'left',
                animation: 'progressBar 4s linear forwards',
              }}
            />
          </div>

          <div className="services-panel-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'stretch', minHeight: 420 }}>
            <div key={activeService} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', animation: 'fadeSlideIn 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '1.25rem' }}>
                {t.serviceLabel} {SERVICES[activeService].num}
              </p>
              <h3 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 800, color: 'white', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
                {SERVICES[activeService].title}
              </h3>
              <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '1.75rem', maxWidth: '44ch' }}>
                {SERVICES[activeService].desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                {SERVICES[activeService].tags.map((tag) => (
                  <span key={tag} style={{ fontSize: '0.6875rem', fontWeight: 600, padding: '0.3rem 0.75rem', borderRadius: 100, border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={SERVICES[activeService].href} className="link-arrow link-arrow--cyan">
                {t.learnMore} <Arrow />
              </Link>
            </div>

            <div key={`img-${activeService}`} style={{ borderRadius: 16, overflow: 'hidden', position: 'relative', minHeight: 360, animation: 'fadeIn 0.6s cubic-bezier(0.16,1,0.3,1)' }}>
              <Image
                src={SERVICES[activeService].img}
                alt={SERVICES[activeService].title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,23,42,0.3), transparent)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────── */}
      <section className="process-scene">
        <div className="container">
          <div style={{ maxWidth: 600, marginBottom: '1rem' }}>
            <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>{t.howItWorksEyebrow}</p>
            <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: 'white', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              {t.processTitle}<br />{t.processTitle2}
            </h2>
          </div>

          <div className="process-list" style={{ marginTop: '4rem' }}>
            {STEPS.map((step, i) => (
              <div key={i} className="process-item">
                {i < STEPS.length - 1 && <div className="process-line" />}
                <div className="process-num-wrap">
                  <div className="process-num">{step.num}</div>
                </div>
                <div className="process-content">
                  <h3 className="process-title">{step.title}</h3>
                  <p className="process-text">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '4rem', paddingTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <Link href="/process" className="btn btn-outline reveal">{t.seeFullProcess}</Link>
          </div>
        </div>
      </section>

      {/* ── WORK / CLIENT TYPES ──────────────────────── */}
      <section className="work-scene" style={{ padding: '7rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
            <div>
              <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>{t.selectedWorkEyebrow}</p>
              <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
                {t.selectedWorkTitle}<br />{t.selectedWorkTitle2}
              </h2>
            </div>
            <Link href="/work" className="link-arrow reveal" data-delay="2" style={{ flexShrink: 0, marginBottom: '0.5rem' }}>
              {t.viewMyWork} <Arrow />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '4rem' }}>
            <article className="work-card reveal" style={{ gridColumn: '1 / -1' }}>
              <Image src="/work-athlos.png" alt="Athlos Oy website" fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'top center' }} />
              <div className="work-card-overlay" />
              <div className="work-card-body">
                <span className="work-card-tag">{t.caseStudyTag}</span>
                <h3 className="work-card-title">{t.caseStudyTitle}</h3>
                <p className="work-card-desc">{t.caseStudyDesc}</p>
                <a href="https://athlos.fi" className="link-arrow link-arrow--light" style={{ marginTop: '0.75rem', display: 'inline-flex' }}>
                  {t.visitSite} <Arrow />
                </a>
              </div>
            </article>
          </div>

          <div style={{ borderTop: '1px solid var(--slate-200)', borderBottom: '1px solid var(--slate-200)', padding: '1.5rem 0', overflow: 'hidden' }}>
            <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--slate-400)', marginBottom: '1rem', textAlign: 'center' }}>
              {t.builtForBusinesses}
            </p>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', gap: '3rem', animation: 'marquee 28s linear infinite', whiteSpace: 'nowrap', width: 'max-content' }}>
                {[...CLIENTS, ...CLIENTS].map((name, i) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-400)', flexShrink: 0 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--slate-300)', display: 'inline-block', flexShrink: 0 }} />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="cta-scene">
        <div ref={ctaBgRef} style={{ position: 'absolute', inset: 0 }}>
          <Image src="/redesign-hero.png" alt="" fill sizes="100vw" style={{ objectFit: 'cover', opacity: 0.12 }} aria-hidden="true" />
        </div>
        <div className="cta-content container">
          <p className="eyebrow eyebrow--dark reveal" style={{ marginBottom: '1.5rem' }}>{t.readyEyebrow}</p>
          <h2 className="cta-title">
            {t.ctaTitle.map((line, i) => (
              <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                <span className="cta-word" style={{ display: 'block' }}>
                  {i === 1 ? <em>{line}</em> : line}
                </span>
              </span>
            ))}
          </h2>
          <p className="cta-sub reveal">{t.ctaSub}</p>
          <div className="reveal" data-delay="2">
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
              {t.startConversation} <Arrow />
            </Link>
            <p style={{ marginTop: '1rem', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.2)' }}>
              {t.replyNote}
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-16px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes progressBar {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @media (max-width: 768px) {
          .services-panel-grid {
            grid-template-columns: 1fr !important;
            min-height: unset !important;
          }
          .services-panel-grid > div:last-child {
            min-height: 280px !important;
          }
        }
      `}</style>
    </>
  )
}
