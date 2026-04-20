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

const STEPS = [
  {
    num: '01',
    title: 'Materials & direction',
    duration: 'Start of project',
    body: 'You send the essentials: texts, images, videos, logo files, references, and any wishes for the site. The clearer the materials are, the faster everything moves. If something is missing, I will tell you directly what is needed before the build starts.',
  },
  {
    num: '02',
    title: 'First draft build',
    duration: 'Usually 1–2 days',
    body: 'Once the materials are in, I build the first draft of the actual website. Not a vague mockup, not a long design phase — the real site. This is usually the fastest part when the collaboration is clear and the content is ready.',
  },
  {
    num: '03',
    title: 'One refinement round',
    duration: 'After your feedback',
    body: 'You review the first draft and give one focused round of feedback. I refine the site based on that feedback and tighten the final result. The process is intentionally simple: one clear review round, not endless revision loops.',
  },
  {
    num: '04',
    title: 'Launch & handover',
    duration: 'Final step',
    body: 'After the refinements are done, I handle launch, final checks, and handover. That includes publishing the site, making sure everything works properly, and handing over the finished website with clear ownership of the code, domain, and hosting setup.',
  },
]

export default function ProcessPage() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sh-word',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, stagger: 0.07, ease: 'power4.out', delay: 0.2 }
      )
      gsap.fromTo('.sh-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.9 })

      document.querySelectorAll('.process-item').forEach((item) => {
        gsap.fromTo(item, { opacity: 0, x: -24 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 82%', onEnter: () => item.classList.add('revealed') } }
        )
      })

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
      <section className="page-hero--dark" style={{ paddingTop: 'calc(72px + 5rem)', paddingBottom: '5rem' }}>
        <div className="container">
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '1rem' }}>Process</p>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 800, color: 'white', lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
            {['A fast process,', 'built in real days.'].map((line, i) => (
              <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                <span className="sh-word" style={{ display: 'block', transform: 'translateY(110%)' }}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="sh-sub" style={{ opacity: 0, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'rgba(255,255,255,0.45)', maxWidth: '46ch', lineHeight: 1.65 }}>
            The process is simple: you send the materials, I build the first draft, we do one refinement round, and then the site goes live. Most of the speed comes from keeping the workflow clear and direct.
          </p>
        </div>
      </section>

      <section className="process-scene">
        <div className="container">
          <div className="process-list" style={{ marginTop: 0 }}>
            {STEPS.map((step, i) => (
              <div key={i} className="process-item">
                {i < STEPS.length - 1 && <div className="process-line" />}
                <div className="process-num-wrap">
                  <div className="process-num">{step.num}</div>
                </div>
                <div className="process-content">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.375rem' }}>
                    <p className="process-step-label" style={{ margin: 0 }}>Step {step.num}</p>
                    <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'block' }} />
                    <p style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)' }}>{step.duration}</p>
                  </div>
                  <h2 className="process-title">{step.title}</h2>
                  <p className="process-text">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container" style={{ maxWidth: 720, textAlign: 'center' }}>
          <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>Total timeline</p>
          <p className="reveal" data-delay="1" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: 'var(--navy)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
            Most projects are achievable in <em style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>a couple of days to one week.</em>
          </p>
          <p className="reveal" data-delay="2" style={{ fontSize: '1.0625rem', color: 'var(--slate-600)', lineHeight: 1.7 }}>
            Exact timing depends mostly on two things: how large the site is, and how quickly you send materials and feedback. Smaller projects can move extremely fast. Larger projects still move quickly, but they naturally need a bit more back-and-forth.
          </p>
        </div>
      </section>

      <section className="cta-scene" style={{ padding: '8rem 0' }}>
        <div className="cta-content container">
          <p className="eyebrow eyebrow--dark reveal" style={{ marginBottom: '1.5rem' }}>Start the process</p>
          <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 800, color: 'white', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '2rem' }}>
            Ready to move fast?
          </h2>
          <div className="reveal" data-delay="2">
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
              Send your materials <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
