'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const FAQS = [
  {
    group: 'Pricing & scope',
    items: [
      { q: 'Do you work with fixed prices or hourly rates?', a: 'All projects are priced as a fixed fee agreed upfront. You know exactly what you are paying before any work starts. Hourly rates apply only to ongoing maintenance or work outside the original scope.' },
      { q: 'What does "from" mean in your pricing?', a: 'The starting price reflects the minimum scope for that tier. Most projects land within the range listed. If your project is larger — more pages, more complexity, migration work — the final price reflects that. You get a specific number before anything starts.' },
      { q: 'Can I pay in instalments?', a: 'Yes. A deposit is required to begin — typically 50% upfront — and the remainder is due at project completion before handover.' },
    ],
  },
  {
    group: 'Process & timeline',
    items: [
      { q: 'How long does a typical project take?', a: 'Most projects take 2–4 weeks from brief to launch. Smaller scopes can move faster if materials are ready. Larger or more complex projects take longer. Timeline is discussed and agreed before work starts.' },
      { q: 'What do you need from me to get started?', a: 'A clear brief, your brand assets (logo, colours if you have them), any content you already have, and access to your domain registrar if we\'re launching on your existing domain. I\'ll ask specific questions during intake.' },
      { q: 'How many rounds of revisions are included?', a: 'One structured round of revisions is included in every project. Revisions beyond that are billed at an hourly rate. The goal of one defined round is to keep feedback focused and productive.' },
    ],
  },
  {
    group: 'Technical',
    items: [
      { q: 'Do you build in WordPress?', a: 'No. Websites are built in clean HTML, CSS, and JavaScript — no WordPress, no page builders. If you\'re currently on WordPress and want to move away from it, that\'s one of the services I offer specifically.' },
      { q: 'Who handles hosting?', a: 'I can set up and manage hosting for you, or configure your site to run on hosting you already have. Either works. All hosting is documented clearly so you understand what you\'re paying for and why.' },
      { q: 'Will I be able to edit the site myself?', a: 'Depends on the setup we agree on. Some clients want full technical handover and handle everything internally. Others want the content structured so they can make text and image changes safely without touching code. We discuss this during the brief.' },
    ],
  },
  {
    group: 'Ownership & handover',
    items: [
      { q: 'Who owns the code after the project?', a: 'You do. Full code ownership is transferred at handover. There are no licensing fees, no ongoing payments to me to keep the site running, and no lock-in of any kind.' },
      { q: 'What if I want to switch agencies or developers later?', a: 'You can. The code is yours, it\'s clean, and it\'s documented. Any competent developer can pick it up and continue working on it. That is by design.' },
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
      <section className="page-hero">
        <div className="container">
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '1rem' }}>FAQ</p>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 800, color: 'var(--navy)', lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
            {['Common questions,', 'honest answers.'].map((line, i) => (
              <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                <span className="sh-word" style={{ display: 'block', transform: 'translateY(110%)' }}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="sh-sub" style={{ opacity: 0, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'var(--slate-600)', maxWidth: '44ch', lineHeight: 1.65 }}>
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
