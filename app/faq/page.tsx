'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import Image from 'next/image'

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const FAQS = [
  {
    group: 'Pricing & scope',
    items: [
      { q: 'Do you work with fixed prices or hourly rates?', a: 'All projects are priced as a fixed fee agreed upfront. You know exactly what you are paying before any work starts. Hourly rates (from €80/hr) apply only to content updates or work outside the original scope.' },
      { q: 'What does "from" mean in your pricing?', a: 'The starting price reflects the minimum scope for that tier — Starter from €699, Business from €1,290, Premium from €2,490. Most projects land close to the starting price. If your project is larger — more pages, more complexity, migration work — the final price reflects that. You get a specific number before anything starts.' },
      { q: 'Can I pay in instalments?', a: 'Yes. A deposit is required to begin — typically 50% upfront — and the remainder is due at project completion before handover.' },
    ],
  },
  {
    group: 'Process & timeline',
    items: [
      { q: 'How long does a typical project take?', a: 'Most projects are done in a couple of days to one week. The first draft of the real site is usually built in 1–2 days once materials are in. After one round of feedback, refinements are made and the site goes live. Larger or more complex projects take longer, but the process is always fast by default.' },
      { q: 'What do you need from me to get started?', a: 'Texts, images, videos, logo files, and any references or direction for the site. The clearer your materials are, the faster everything moves. If something is missing, I will tell you exactly what is needed before the build starts.' },
      { q: 'How many rounds of revisions are included?', a: 'The Starter package includes one revision round. Business and Premium include two. Beyond what is included, additional revision work is billed at an hourly rate. The goal of defined revision rounds is to keep feedback focused and productive.' },
    ],
  },
  {
    group: 'Technical',
    items: [
      { q: 'Do you build in WordPress?', a: 'No. Sites are built custom using modern frameworks — no WordPress, no page builders, no templates. If you are currently on WordPress and want to move away from it, that is one of the services offered specifically.' },
      { q: 'Who handles hosting?', a: 'There are three options. Managed hosting (from €49/mo) means everything is handled for you. Client-owned setup (€99 one-time) means your accounts, your hosting — I set it all up and hand it over cleanly. Or you can take the code directly for free and have your own technical team handle it. All options are clearly documented.' },
      { q: 'Will I be able to edit the site myself?', a: 'Yes. A content editor is included in every package — you can update text and images without touching code. There is also an optional AI-assisted editor upgrade at €19.99/mo that adds AI-powered text improvements, tone adjustments, and SEO suggestions directly in the editor.' },
    ],
  },
  {
    group: 'Ownership & handover',
    items: [
      { q: 'Who owns the code after the project?', a: 'You do. Full code ownership is transferred at handover. There are no licensing fees, no ongoing payments to keep the site running, and no lock-in of any kind.' },
      { q: 'What if I want to switch agencies or developers later?', a: 'You can. The code is yours, it is clean, and it is documented. Any competent developer can pick it up and continue working on it. That is by design.' },
    ],
  },
]

export default function FAQPage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ '0-0': true })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sh-word', { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.07, ease: 'power4.out', delay: 0.2 })
      gsap.fromTo('.sh-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.9 })
    }, rootRef)
    return () => ctx.revert()
  }, [])

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
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '1rem' }}>FAQ</p>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 800, color: 'white', lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
            {['Common questions,', 'honest answers.'].map((line, i) => (
              <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                <span className="sh-word" style={{ display: 'block', transform: 'translateY(110%)' }}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="sh-sub" style={{ opacity: 0, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'rgba(255,255,255,0.45)', maxWidth: '44ch', lineHeight: 1.65 }}>
            If you have a question that isn&apos;t here, send it to lauri.hynonen@gmail.com and I will answer directly.
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
            Still have a question?
          </p>
          <Link href="/contact" className="btn btn-primary">
            Send it directly <Arrow />
          </Link>
        </div>
      </section>
    </div>
  )
}
