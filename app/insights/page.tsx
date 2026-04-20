'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ARTICLES = [
  { tag: 'Comparison', title: 'WordPress vs a modern website setup: which one actually makes sense?', excerpt: 'WordPress is not automatically the right answer for every business website. In some cases it is useful. In others, it adds more maintenance than the business really needs.', slug: 'wordpress-vs-modern-website' },
  { tag: 'Pricing', title: 'How much does a business website cost?', excerpt: 'Website pricing varies because not all projects are solving the same problem. A simple brochure site is very different from a custom redesign with migration work.', slug: 'how-much-does-a-business-website-cost' },
  { tag: 'Launch', title: 'How to launch a website properly.', excerpt: 'For many businesses, the website itself is not the hard part — the launch is. Hosting, domain settings, DNS changes, redirects, and final checks are where confusion typically starts.', slug: 'how-to-launch-a-website-properly' },
  { tag: 'Ownership', title: 'Who should own your domain, hosting, and website code?', excerpt: 'A lot of website problems are not design problems — they are ownership problems. Businesses often do not know who controls the domain, where the site is hosted, or how it could be moved.', slug: 'who-should-own-domain-hosting-and-code' },
  { tag: 'Preparation', title: 'How to prepare materials for a website project.', excerpt: 'Many website projects slow down because the materials are scattered, incomplete, or constantly changing. A well-prepared content folder can save days of unnecessary back-and-forth.', slug: 'how-to-prepare-materials-for-a-website-project' },
]

export default function InsightsPage() {
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
  }, [])

  return (
    <div ref={rootRef}>
      <section className="page-hero">
        <div className="container">
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '1rem' }}>Insights</p>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 800, color: 'var(--navy)', lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
            {['Insights on better', 'website projects.'].map((line, i) => (
              <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                <span className="sh-word" style={{ display: 'block', transform: 'translateY(110%)' }}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="sh-sub" style={{ opacity: 0, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'var(--slate-600)', maxWidth: '52ch', lineHeight: 1.65 }}>
            Most website problems start before design. They start with unclear ownership, weak materials, bloated setups, and messy launch processes.
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
                <span className="link-arrow link-arrow--cyan" style={{ marginTop: 'auto' }}>Read article <Arrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
