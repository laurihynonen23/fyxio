'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageContext'
import { translations } from '@/lib/translations'

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function FAQPage() {
  const { lang } = useLanguage()
  const t = translations[lang].faq
  const FAQS = translations[lang].faqItems
  const rootRef = useRef<HTMLDivElement>(null)
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ '0-0': true })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sh-word', { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.07, ease: 'power4.out', delay: 0.2 })
      gsap.fromTo('.sh-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.9 })
    }, rootRef)
    return () => ctx.revert()
  }, [lang])

  function toggle(key: string) {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div ref={rootRef}>
      <section className="page-hero--dark" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/work-laptop-desk.jpg" alt="" fill sizes="100vw" priority style={{ objectFit: 'cover', opacity: 0.18 }} aria-hidden="true" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--navy) 50%, rgba(26,23,20,0.6) 100%)' }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '1rem' }}>{t.eyebrow}</p>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 800, color: 'white', lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
            {t.heroTitle.map((line, i) => (
              <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                <span className="sh-word" style={{ display: 'block', transform: 'translateY(110%)' }}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="sh-sub" style={{ opacity: 0, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'rgba(255,255,255,0.45)', maxWidth: '44ch', lineHeight: 1.65 }}>
            {t.heroSub}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          {FAQS.map((group, gi) => (
            <div key={gi} className="faq-group">
              <p className="faq-group-title">{group.group}</p>
              {group.items.map((item, qi) => {
                const key = `${gi}-${qi}`
                const open = !!openItems[key]
                return (
                  <div key={qi} className={`faq-item${open ? ' open' : ''}`}>
                    <button className="faq-q" onClick={() => toggle(key)} aria-expanded={open}>
                      {item.q}
                      <svg className="faq-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M9 4v10M4 9h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                    <div className="faq-a" style={{ maxHeight: open ? '500px' : '0' }}>
                      <div className="faq-a-inner">{item.a}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </section>

      <section className="section section--surface">
        <div className="container" style={{ maxWidth: 720, textAlign: 'center' }}>
          <p style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.35, letterSpacing: '-0.02em', marginBottom: '2rem' }}>
            {t.stillHaveQuestion}
          </p>
          <Link href="/contact" className="btn btn-primary">
            {t.sendDirectly} <Arrow />
          </Link>
        </div>
      </section>
    </div>
  )
}
