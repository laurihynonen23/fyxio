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

const IMGS: Record<string, string> = {
  'custom-websites': '/hero-main.png',
  'website-redesign': '/redesign-hero.png',
  'ai-build-sessions': '/ai-build-session-setup.png',
  'ai-workflows': '/ai-workflows-hero.png',
}

export default function ServicesPage() {
  const { lang } = useLanguage()
  const t = translations[lang].services
  const serviceDataList = translations[lang].serviceDataList
  const websiteServices = serviceDataList.filter(s => s.group === 'website')
  const aiServices = serviceDataList.filter(s => s.group === 'ai')
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sh-word',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, stagger: 0.07, ease: 'power4.out', delay: 0.2 }
      )
      gsap.fromTo('.sh-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.9 }
      )

      document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
        const delay = parseFloat(el.dataset.delay || '0') * 0.08
        gsap.fromTo(el,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.85, delay, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%' } }
        )
      })

      document.querySelectorAll('.svc-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 48 },
          { opacity: 1, y: 0, duration: 0.8, delay: i * 0.06, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 82%' } }
        )
      })
    }, rootRef)
    return () => ctx.revert()
  }, [lang])

  return (
    <div ref={rootRef}>
      <section style={{ minHeight: '60vh', background: 'var(--navy)', display: 'flex', alignItems: 'flex-end', paddingBottom: '6rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/work-imac-design.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: 'cover', opacity: 0.12 }} aria-hidden="true" />
        </div>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(34,211,238,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} aria-hidden="true" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.3) 100%)' }} aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 72 }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '1rem' }}>{t.eyebrow}</p>
          <h1 style={{ fontSize: 'clamp(2.75rem, 6vw, 6.5rem)', fontWeight: 800, color: 'white', lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
            {t.heroTitle.map((line, i) => (
              <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                <span className="sh-word" style={{ display: 'block', transform: 'translateY(110%)' }}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="sh-sub" style={{ opacity: 0, fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', color: 'rgba(255,255,255,0.5)', maxWidth: '50ch', lineHeight: 1.7 }}>
            {t.heroSub}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <p className="eyebrow reveal" style={{ marginBottom: '0.75rem' }}>{t.websiteEyebrow}</p>
            <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--navy)', marginBottom: '0.75rem' }}>
              {t.websiteTitle}
            </h2>
            <p className="reveal" data-delay="2" style={{ fontSize: '1rem', color: 'var(--slate-500)', lineHeight: 1.65, maxWidth: '52ch' }}>
              {t.websiteSub}
            </p>
          </div>

          <div className="svc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {websiteServices.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="svc-card" style={{ opacity: 0, display: 'block', position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--slate-200)', transition: 'box-shadow 0.3s, border-color 0.3s' }}>
                <div style={{ aspectRatio: '16/7', position: 'relative', overflow: 'hidden' }}>
                  <Image src={IMGS[s.slug]} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.6), transparent)' }} />
                  <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
                    <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '0.25rem' }}>{s.num}</p>
                    <h2 style={{ fontSize: 'clamp(1.25rem, 2vw, 1.625rem)', fontWeight: 800, color: 'white', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{s.title}</h2>
                  </div>
                </div>
                <div style={{ padding: '1.75rem' }}>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', lineHeight: 1.65, marginBottom: '1.25rem' }}>{s.heroDesc}</p>
                  <span className="link-arrow link-arrow--cyan">{t.learnMore} <Arrow /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <p className="eyebrow reveal" style={{ marginBottom: '0.75rem' }}>{t.aiEyebrow}</p>
            <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--navy)', marginBottom: '0.75rem' }}>
              {t.aiTitle.split('\n').map((line, i) => (
                <span key={i} style={{ display: 'block' }}>{line}</span>
              ))}
            </h2>
            <p className="reveal" data-delay="2" style={{ fontSize: '1rem', color: 'var(--slate-500)', lineHeight: 1.65, maxWidth: '52ch' }}>
              {t.aiSub}
            </p>
          </div>

          <div className="svc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {aiServices.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="svc-card" style={{ opacity: 0, display: 'block', position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--slate-200)', background: 'var(--white)', transition: 'box-shadow 0.3s, border-color 0.3s' }}>
                <div style={{ aspectRatio: '16/7', position: 'relative', overflow: 'hidden' }}>
                  <Image src={IMGS[s.slug]} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.75), transparent)' }} />
                  <div style={{ position: 'absolute', top: '1.25rem', left: '1.5rem' }}>
                    <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--navy)', background: 'var(--cyan)', padding: '0.25rem 0.625rem', borderRadius: 999 }}>AI</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
                    <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '0.25rem' }}>{s.num}</p>
                    <h2 style={{ fontSize: 'clamp(1.25rem, 2vw, 1.625rem)', fontWeight: 800, color: 'white', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{s.title}</h2>
                  </div>
                </div>
                <div style={{ padding: '1.75rem' }}>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', lineHeight: 1.65, marginBottom: '1.25rem' }}>{s.heroDesc}</p>
                  <span className="link-arrow link-arrow--cyan">{t.learnMore} <Arrow /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-scene" style={{ padding: '8rem 0' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/work-laptop-outdoor.jpg" alt="" fill sizes="100vw" style={{ objectFit: 'cover', opacity: 0.1 }} aria-hidden="true" />
        </div>
        <div className="cta-content container">
          <p className="eyebrow eyebrow--dark reveal" style={{ marginBottom: '1.5rem' }}>{t.ctaEyebrow}</p>
          <h2 className="cta-title reveal" data-delay="1" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
            {t.ctaTitle.split('\n').map((line, i) => (
              <span key={i} style={{ display: 'block' }}>{line}</span>
            ))}
          </h2>
          <div className="reveal" data-delay="2" style={{ marginTop: '2rem' }}>
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
              {t.ctaBtn} <Arrow />
            </Link>
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 768px) {
          .svc-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
