'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'

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

const CREDENTIALS = [
  {
    label: 'Now',
    title: 'AI Analyst at Valuatum',
    body: 'Building AI-driven tools, workflows, and automations in a real business environment where speed and practicality matter.',
  },
  {
    label: 'Startup experience',
    title: 'CEO & Co-Founder of Emeric.ai',
    body: 'Led development of an AI agent system, worked across prompt engineering, product iteration, model testing, and execution.',
  },
  {
    label: 'Client work',
    title: 'Independent website projects',
    body: 'Delivering client websites such as Athlos.fi using an agent-based workflow built around fast, high-quality shipping.',
  },
  {
    label: 'Foundation',
    title: 'Aalto University + Aalto Ignite',
    body: 'Engineering background, startup accelerator experience, and practical exposure to validation, pitching, and product building.',
  },
]

const PRINCIPLES = [
  { title: 'AI should lower friction, not standards.', body: 'Modern tools should help clients get better websites faster and more affordably, not justify average work dressed up as innovation.' },
  { title: 'Fast is now part of the value.', body: 'When the materials are ready, a professional website should move in days. Speed is no longer a luxury feature — it is part of a modern service model.' },
  { title: 'Design still needs judgment.', body: 'AI can accelerate structure, implementation, and iteration, but strong visual taste, positioning, and clarity still come from the person behind the work.' },
  { title: 'The client should feel the leverage.', body: 'The advantage of a better system should show up in the outcome: lower cost, shorter timelines, cleaner collaboration, and a more credible final site.' },
]

export default function AboutPage() {
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
  }, [])

  return (
    <div ref={rootRef}>
      {/* FULL-HEIGHT HERO */}
      <section className="about-hero" style={{ position: 'relative', minHeight: '100svh', background: 'var(--navy)', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>

        {/* Background */}
        <div className="about-hero-bg" style={{ position: 'absolute', inset: 0 }}>
          <Image src="/about-ignite-stage.jpeg" alt="" fill sizes="100vw" priority style={{ objectFit: 'cover', opacity: 0.22 }} aria-hidden="true" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--navy) 50%, rgba(26,23,20,0.3) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,23,20,0.3) 0%, transparent 30%, rgba(26,23,20,0.5) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(196,113,74,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(196,113,74,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} aria-hidden="true" />
        </div>

        {/* Decorative vertical rule */}
        <div style={{ position: 'absolute', left: 'calc(50% + 8rem)', top: '15%', bottom: '15%', width: '1px', background: 'rgba(196,113,74,0.12)', display: 'none' }} aria-hidden="true" />

        <div className="about-hero-content container" style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
          <div className="about-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '4rem', alignItems: 'center', maxWidth: '100%' }}>

            {/* Left: Main heading */}
            <div>
              <p className="sh-meta" style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '1.75rem' }}>
                About
              </p>

              <h1 style={{ fontSize: 'clamp(3.5rem, 7vw, 8rem)', fontWeight: 800, color: 'white', lineHeight: 0.9, letterSpacing: '-0.04em', marginBottom: '2.5rem' }}>
                {['AI-native builder.', 'Business-first execution.'].map((line, i) => (
                  <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                    <span className="sh-word" style={{ display: 'block' }}>
                      {i === 0 ? line : <><em style={{ fontStyle: 'italic', color: 'var(--cyan)' }}>Business-first</em> execution.</>}
                    </span>
                  </span>
                ))}
              </h1>

              <p className="sh-meta" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.125rem)', color: 'rgba(255,255,255,0.4)', maxWidth: '44ch', lineHeight: 1.7, marginBottom: '3rem' }}>
                I combine startup execution, AI systems, and a strong design bar to help companies get professional modern websites without the slow, expensive process that used to be accepted as normal.
              </p>

              <div className="sh-meta" style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
                {[['AI-native', 'Build model'], ['Finland', 'Based in'], ['Fast', 'Delivery style']].map(([val, label]) => (
                  <div key={label}>
                    <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.75rem)', fontWeight: 800, color: 'var(--cyan)', letterSpacing: '-0.03em', lineHeight: 1 }}>{val}</p>
                    <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.3rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</p>
                  </div>
                ))}
              </div>

            </div>

            {/* Right: manifesto quotes */}
            <div style={{ minWidth: 280, maxWidth: 320 }}>
              {[
                { num: '01', text: 'A serious company should not wait a month for a clean website.' },
                { num: '02', text: 'AI should improve the economics, not lower the standard.' },
                { num: '03', text: 'Speed only matters if the result still feels premium.' },
              ].map((q, i) => (
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

        {/* LinkedIn — outside the fading content, stays visible while scrolling */}
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Connect on LinkedIn"
          className="about-hero-li"
        >
          <LinkedInIcon size={16} />
          LinkedIn
        </a>
      </section>

      {/* WHO I AM */}
      <section className="section">
        <div className="container">
          <div className="about-split">
            <div className="about-text" style={{ opacity: 0 }}>
              <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>Who I am</p>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--navy)', marginBottom: '1.25rem' }}>
                Hi, I&apos;m Lauri.
              </h2>
              <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'var(--slate-600)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
                My background sits at the intersection of AI, startups, and execution. I currently work as an AI Analyst at Valuatum, previously co-founded Emeric.ai, and went through the Aalto Ignite startup accelerator while building practical experience in product, prompts, systems, and rapid iteration.
              </p>
              <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'var(--slate-600)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
                I studied engineering at Aalto University, which shaped how I approach work: build systems that are efficient, clear, and grounded in real constraints. That matters in websites too. A strong website is not only a visual outcome. It is structure, positioning, trust, and execution working together.
              </p>
              <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'var(--slate-600)', lineHeight: 1.75, marginBottom: '2rem' }}>
                I build websites the same way I build AI systems: fast, intentionally, and with a high quality bar. The point is not to ship something quickly just because AI makes it possible. The point is to use that leverage to produce a better result for the client.
              </p>
              <div className="about-link-row">
                <Link href="/contact" className="btn btn-primary">
                  Start a conversation <Arrow />
                </Link>
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="about-social-link">
                  <LinkedInIcon size={18} />
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="about-visuals" style={{ opacity: 0 }}>
              <div className="about-stage-card">
                <Image
                  src="/about-ignite-stage.jpeg"
                  alt="Lauri presenting at Aalto Ignite demo day"
                  width={5818}
                  height={5261}
                  quality={90}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div className="about-portrait-group">
                <div className="about-portrait-inner">
                  <Image
                    src="/about-portrait-suit.jpeg"
                    alt="Portrait of Lauri"
                    fill
                    sizes="220px"
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={{ maxWidth: 760, marginTop: '5rem' }}>
            <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>Relevant background</p>
            <h3 className="reveal" data-delay="1" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', color: 'var(--navy)' }}>
              Built on real operating experience, not generic freelancer positioning.
            </h3>
          </div>
          <div className="about-highlights">
            {CREDENTIALS.map((item, i) => (
              <div
                key={i}
                className={`about-highlight reveal${i === 0 ? ' about-highlight--featured' : ''}`}
                data-delay={String(i % 2)}
              >
                <p className="about-highlight-label">{item.label}</p>
                <h3 className="about-highlight-title">{item.title}</h3>
                <p className="about-highlight-body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY I STARTED THIS */}
      <section className="section section--surface">
        <div className="container">
          <div style={{ maxWidth: 640, marginBottom: '3rem' }}>
            <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>Why I started this</p>
            <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              A professional website should no longer be slow or overpriced.
            </h2>
            <p className="reveal" data-delay="2" style={{ fontSize: '1rem', color: 'var(--slate-600)', lineHeight: 1.8, marginTop: '1.5rem' }}>
              In the age of AI, there is no real reason a serious company should still be stuck with an outdated website because the process is too slow, too expensive, or too complicated. The tools have changed. The expectations should change with them.
            </p>
            <p className="reveal" data-delay="3" style={{ fontSize: '1rem', color: 'var(--slate-600)', lineHeight: 1.8, marginTop: '1rem' }}>
              I kept seeing companies pay 5,000€ or more for website projects that dragged on for over a month, even when the scope itself was not especially large. That gap stood out to me immediately. I knew those projects could be done faster, more cleanly, and at a more reasonable price point without sacrificing design quality.
            </p>
            <p className="reveal" data-delay="4" style={{ fontSize: '1rem', color: 'var(--slate-600)', lineHeight: 1.8, marginTop: '1rem' }}>
              That is why I built Fyxio as a side business around a different model. I developed an agent-based workflow using tools like Claude and Codex to help with structure, iteration, implementation, and refinement. The system makes the process far more effective. The judgment, taste, and final quality bar are still mine. That combination is the point.
            </p>
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
          <p className="eyebrow eyebrow--dark reveal" style={{ marginBottom: '1.5rem' }}>Work together</p>
          <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 800, color: 'white', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '2rem' }}>
            Let&apos;s see if it&apos;s<br /><em style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>a good fit.</em>
          </h2>
          <div className="reveal" data-delay="2">
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
              Get in touch <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
