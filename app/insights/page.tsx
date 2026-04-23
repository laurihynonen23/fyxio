'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'
import { translations } from '@/lib/translations'

gsap.registerPlugin(ScrollTrigger)

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function InsightsPage() {
  const { lang } = useLanguage()
  const t = translations[lang].insights
  const ARTICLES = translations[lang].insightArticles
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sh-word', { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.07, ease: 'power4.out', delay: 0.2 })
      gsap.fromTo('.sh-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.9 })
      gsap.fromTo('.article-card', { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.article-grid', start: 'top 78%' } }
      )
    }, rootRef)
    return () => ctx.revert()
  }, [lang])

  return (
    <div ref={rootRef}>
      <section className="page-hero">
        <div className="container">
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '1rem' }}>{t.eyebrow}</p>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 800, color: 'var(--navy)', lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
            {t.heroTitle.map((line, i) => (
              <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                <span className="sh-word" style={{ display: 'block', transform: 'translateY(110%)' }}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="sh-sub" style={{ opacity: 0, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'var(--slate-600)', maxWidth: '52ch', lineHeight: 1.65 }}>
            {t.heroSub}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="article-grid">
            {ARTICLES.map((a, i) => (
              <Link key={i} href={`/insights/${a.slug}`} className="article-card" style={{ opacity: 0 }}>
                <span className="article-tag">{a.tag}</span>
                <h2 className="article-title">{a.title}</h2>
                <p className="article-excerpt">{a.excerpt}</p>
                <span className="link-arrow link-arrow--cyan" style={{ marginTop: 'auto' }}>{t.readArticle} <Arrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
