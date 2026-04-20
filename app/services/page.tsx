'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'
import { SERVICES } from '@/lib/serviceData'

gsap.registerPlugin(ScrollTrigger)

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IMGS = ['/work-imac-design.jpg', '/work-laptop-ecommerce.jpg', '/work-laptop-design.jpg', '/work-laptop-desk.jpg']

export default function ServicesPage() {
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
            scrollTrigger: { trigger: '.svc-grid', start: 'top 78%' } }
        )
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef}>
      {/* HERO */}
      <section style={{ minHeight: '60vh', background: 'var(--navy)', display: 'flex', alignItems: 'flex-end', paddingBottom: '6rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/work-imac-design.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: 'cover', opacity: 0.12 }} aria-hidden="true" />
        </div>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(34,211,238,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} aria-hidden="true" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.3) 100%)' }} aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 72 }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '1rem' }}>Services</p>
          <h1 style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', fontWeight: 800, color: 'white', lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
            {["Website services for", 'businesses that want', 'better.'].map((line, i) => (
              <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                <span className="sh-word" style={{ display: 'block', transform: 'translateY(110%)' }}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="sh-sub" style={{ opacity: 0, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'rgba(255,255,255,0.5)', maxWidth: '44ch', lineHeight: 1.65 }}>
            I help companies launch websites that look stronger, feel more current, and are easier to maintain than the average template-based setup.
          </p>
        </div>
      </section>

      {/* SERVICE CARDS */}
      <section className="section">
        <div className="container">
          <div className="svc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {SERVICES.map((s, i) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="svc-card" style={{ opacity: 0, display: 'block', position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--slate-200)', transition: 'box-shadow 0.3s, border-color 0.3s' }}>
                <div style={{ aspectRatio: '16/7', position: 'relative', overflow: 'hidden' }}>
                  <Image src={IMGS[i]} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.6), transparent)' }} />
                  <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
                    <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '0.25rem' }}>{s.num}</p>
                    <h2 style={{ fontSize: 'clamp(1.25rem, 2vw, 1.625rem)', fontWeight: 800, color: 'white', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{s.title}</h2>
                  </div>
                </div>
                <div style={{ padding: '1.75rem' }}>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', lineHeight: 1.65, marginBottom: '1.25rem' }}>{s.heroDesc}</p>
                  <span className="link-arrow link-arrow--cyan">Learn more <Arrow /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EDITING OPTIONS */}
      <section className="section section--surface">
        <div className="container">
          <div style={{ maxWidth: 640, marginBottom: '3rem' }}>
            <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>After launch</p>
            <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              How ongoing edits can work.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              { letter: 'A', title: 'Fully handed over', body: 'You or your team manage updates internally. Full code ownership at handover.' },
              { letter: 'B', title: 'Structured for easy edits', body: 'Content organised so routine updates can be made safely without technical knowledge.' },
              { letter: 'C', title: 'Managed updates', body: 'I handle updates, improvements, and maintenance on an ongoing basis. Billed separately.' },
            ].map((opt, i) => (
              <div key={i} className="reveal" data-delay={String(i)} style={{ padding: '2rem', border: '1px solid var(--slate-200)', borderRadius: 12, background: 'var(--white)' }}>
                <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--cyan)', marginBottom: '0.75rem' }}>{opt.letter}</p>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.5rem' }}>{opt.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: 1.65 }}>{opt.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-scene" style={{ padding: '8rem 0' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/work-laptop-outdoor.jpg" alt="" fill sizes="100vw" style={{ objectFit: 'cover', opacity: 0.1 }} aria-hidden="true" />
        </div>
        <div className="cta-content container">
          <p className="eyebrow eyebrow--dark reveal" style={{ marginBottom: '1.5rem' }}>Not sure which fits?</p>
          <h2 className="cta-title reveal" data-delay="1" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
            Tell me about your<br />current situation.
          </h2>
          <div className="reveal" data-delay="2" style={{ marginTop: '2rem' }}>
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
              Ask about your project <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
