'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'
import type { ServiceData } from '@/lib/serviceData'

gsap.registerPlugin(ScrollTrigger)

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function ServicePage({ service }: { service: ServiceData }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Hero title entrance
      gsap.fromTo('.service-hero-title .sh-word',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, stagger: 0.06, ease: 'power4.out', delay: 0.2 }
      )
      gsap.fromTo('.service-hero-content .sh-meta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', delay: 0.7 }
      )

      // Hero photo parallax
      gsap.to('.sh-hero-img',
        {
          yPercent: 22,
          ease: 'none',
          scrollTrigger: { trigger: '.service-hero', start: 'top top', end: 'bottom top', scrub: true },
        }
      )

      // Feature images parallax
      document.querySelectorAll('.feature-media img').forEach((img) => {
        gsap.to(img, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })

      // Included items stagger
      gsap.fromTo('.included-item',
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: '.included-grid', start: 'top 80%' },
        }
      )

      // Feature rows
      document.querySelectorAll('.feature-row').forEach((row) => {
        const text = row.querySelector('.feature-text')
        const media = row.querySelector('.feature-media')

        if (text) gsap.fromTo(text,
          { opacity: 0, x: -32 },
          { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 75%' } }
        )
        if (media) gsap.fromTo(media,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 75%' } }
        )
      })

      // CTA
      gsap.fromTo('.service-cta-word',
        { yPercent: 110 },
        {
          yPercent: 0, duration: 1, stagger: 0.07, ease: 'power4.out',
          scrollTrigger: { trigger: '.service-cta', start: 'top 72%' },
        }
      )

      // Generic reveals
      document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
        const delay = parseFloat(el.dataset.delay || '0') * 0.08
        gsap.fromTo(el,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.85, delay, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%' } }
        )
      })

    }, rootRef)

    return () => ctx.revert()
  }, [service.slug])

  return (
    <div ref={rootRef}>
      {/* HERO */}
      <section className="service-hero">
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image
            src={service.heroImg}
            alt=""
            fill
            priority
            sizes="100vw"
            className="sh-hero-img"
            style={{ objectFit: 'cover', opacity: 0.15 }}
            aria-hidden="true"
          />
        </div>
        <div className="service-hero-grid" aria-hidden="true" />
        <div className="service-hero-overlay" aria-hidden="true" />

        <div className="service-hero-content container">
          <p className="service-hero-eyebrow sh-meta">
            Service {service.num} of 04
          </p>
          <h1 className="service-hero-title">
            {service.title.split(' ').reduce<string[][]>((lines, word, i) => {
              const lineIdx = Math.floor(i / 3)
              if (!lines[lineIdx]) lines[lineIdx] = []
              lines[lineIdx].push(word)
              return lines
            }, []).map((words, i) => (
              <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                <span className="sh-word" style={{ display: 'block' }}>
                  {words.join(' ')}
                </span>
              </span>
            ))}
          </h1>
          <p className="service-hero-desc sh-meta">{service.heroDesc}</p>
          <div className="sh-meta" style={{ marginTop: '2rem' }}>
            <Link href="/contact" className="btn btn-primary">
              Ask about this service <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* TAGLINE */}
      <section style={{ background: 'var(--slate-50)', borderBottom: '1px solid var(--slate-200)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: 760, textAlign: 'center' }}>
          <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>Overview</p>
          <h2
            className="reveal"
            data-delay="1"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
              fontWeight: 800,
              color: 'var(--navy)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '1.25rem',
            }}
          >
            What this service is for.
          </h2>
          <p className="reveal" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.35, letterSpacing: '-0.02em' }}>
            &ldquo;{service.tagline}&rdquo;
          </p>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 600, marginBottom: '1rem' }}>
            <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>What&apos;s included</p>
            <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              Everything you need.<br />Nothing you don&apos;t.
            </h2>
          </div>
          <div className="included-grid">
            {service.included.map((item, i) => (
              <div key={i} className="included-item" style={{ opacity: 0 }}>
                <p className="included-num">0{i + 1}</p>
                <h3 className="included-title">{item.title}</h3>
                <p className="included-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE ROWS */}
      <section className="feature-rows" style={{ borderTop: '1px solid var(--slate-200)' }}>
        <div className="container">
          {service.features.map((feat, i) => (
            <div key={i} className="feature-row">
              <div className="feature-text">
                <p className="eyebrow" style={{ marginBottom: '1rem' }}>{feat.eyebrow}</p>
                <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--navy)', marginBottom: '1.25rem' }}>
                  {feat.title}
                </h2>
                <p style={{ fontSize: '1.0625rem', color: 'var(--slate-600)', lineHeight: 1.7 }}>{feat.body}</p>
              </div>
              <div className="feature-media">
                <Image src={feat.img} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                <div className="feature-media-overlay" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OTHER SERVICES */}
      <section className="section section--surface">
        <div className="container">
          <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>While you&apos;re here</p>
          <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '3rem' }}>
            Other services.
          </h2>
          <div className="other-services-grid">
            {[
              { title: 'Custom Websites', href: '/services/custom-websites', num: '01' },
              { title: 'Website Redesign', href: '/services/website-redesign', num: '02' },
              { title: 'AI Build Sessions', href: '/services/ai-build-sessions', num: '03' },
              { title: 'AI Workflows', href: '/services/ai-workflows', num: '04' },
            ].filter((s) => !s.href.endsWith(service.slug)).slice(0, 3).map((s, i) => (
              <Link key={i} href={s.href} className="reveal other-services-card" data-delay={String(i)} style={{ display: 'block', padding: '2rem', border: '1px solid var(--slate-200)', borderRadius: 12, background: 'var(--white)', transition: 'box-shadow 0.2s, border-color 0.2s' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '0.75rem' }}>{s.num}</p>
                <p style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.75rem' }}>{s.title}</p>
                <span className="link-arrow link-arrow--cyan" style={{ fontSize: '0.8125rem' }}>Learn more <Arrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-scene service-cta">
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src={service.heroImg} alt="" fill sizes="100vw" style={{ objectFit: 'cover', opacity: 0.1 }} aria-hidden="true" />
        </div>
        <div className="cta-content container">
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 800, color: 'white', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
            {service.cta.title.split('\n').map((line, i) => (
              <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                <span className="service-cta-word" style={{ display: 'block' }}>{line}</span>
              </span>
            ))}
          </h2>
          <p className="cta-sub reveal">{service.cta.sub}</p>
          <div className="reveal" data-delay="1" style={{ marginTop: '2rem' }}>
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
              Get in touch <Arrow />
            </Link>
          </div>
        </div>
      </section>
      <style>{`
        .other-services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .other-services-grid {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            gap: 1rem;
            padding-bottom: 1rem;
            scrollbar-width: none;
          }
          .other-services-grid::-webkit-scrollbar { display: none; }
          .other-services-card {
            flex: 0 0 80vw;
            scroll-snap-align: start;
          }
        }
      `}</style>
    </div>
  )
}
