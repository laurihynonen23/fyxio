'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

const ARTICLES = [
  {
    slug: 'wordpress-vs-modern',
    category: 'Comparison',
    title: 'WordPress vs Modern Websites',
    desc: 'Why more businesses are moving away from WordPress — and what they are moving to. A straightforward breakdown of the real differences in speed, cost, ownership, and maintenance.',
    readTime: '6 min read',
  },
  {
    slug: 'website-pricing-guide',
    category: 'Guide',
    title: 'Website Pricing Guide',
    desc: 'What a professional website actually costs in 2025, why prices vary so much, and how to tell if a quote is reasonable. Everything you need to make a confident decision.',
    readTime: '8 min read',
  },
]

export default function BlogPage() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sh-word', { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.07, ease: 'power4.out', delay: 0.2 })
      gsap.fromTo('.sh-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.9 })
      gsap.fromTo('.blog-card', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.blog-grid', start: 'top 80%' } })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef}>
      {/* HERO */}
      <section className="page-hero--dark" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/work-laptop-design.jpg" alt="" fill sizes="100vw" priority style={{ objectFit: 'cover', opacity: 0.15 }} aria-hidden="true" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--navy) 50%, rgba(26,23,20,0.6) 100%)' }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '1rem' }}>Blog</p>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 800, color: 'white', lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
            {['Practical guides,', 'no fluff.'].map((line, i) => (
              <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                <span className="sh-word" style={{ display: 'block', transform: 'translateY(110%)' }}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="sh-sub" style={{ opacity: 0, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'rgba(255,255,255,0.45)', maxWidth: '44ch', lineHeight: 1.65 }}>
            Articles on websites, pricing, and modern web tools — written for business owners, not developers.
          </p>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="blog-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {ARTICLES.map((article, i) => (
              <div
                key={i}
                className="blog-card"
                style={{
                  opacity: 0,
                  position: 'relative',
                  background: 'var(--white)',
                  border: '1px solid var(--slate-200)',
                  borderRadius: 16,
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  cursor: 'default',
                }}
              >
                {/* Coming soon badge */}
                <span style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--slate-400)',
                  background: 'var(--slate-100)',
                  border: '1px solid var(--slate-200)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: 999,
                }}>
                  Coming soon
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cyan)' }}>{article.category}</span>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--slate-300)', display: 'block' }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>{article.readTime}</span>
                </div>

                <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 800, color: 'var(--navy)', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                  {article.title}
                </h2>
                <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', lineHeight: 1.7, maxWidth: '62ch' }}>
                  {article.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
