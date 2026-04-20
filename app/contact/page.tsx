'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function ContactPage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sh-word',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, stagger: 0.07, ease: 'power4.out', delay: 0.2 }
      )
      gsap.fromTo('.sh-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.9 })
      gsap.fromTo('.form-card', { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.5 })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const honey = (form.elements.namedItem('website') as HTMLInputElement)?.value
    if (honey) return
    setTimeout(() => setSubmitted(true), 800)
  }

  return (
    <div ref={rootRef}>
      <section style={{ background: 'var(--navy)', paddingTop: 'calc(72px + 3rem)', paddingBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '1rem' }}>Let&apos;s talk</p>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, color: 'white', lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
            {["Let's talk about", 'your website.'].map((line, i) => (
              <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                <span className="sh-word" style={{ display: 'block', transform: 'translateY(110%)' }}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="sh-sub" style={{ opacity: 0, fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', color: 'rgba(255,255,255,0.45)', maxWidth: '46ch', lineHeight: 1.65 }}>
            If you want a site that looks sharper, launches cleaner, and feels easier to manage — send me the basics and I&apos;ll tell you what makes sense.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="contact-grid">
            <div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800, color: 'var(--navy)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                What helps me<br />give a useful answer
              </h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Include your current website, a short description of what you need, the pages you think the site should have, and whether you want to manage future edits yourself.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--slate-600)' }}>
                  <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16, flexShrink: 0 }}><path d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1zm0 3v4l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  Reply within 1–2 working days
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--slate-600)' }}>
                  <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16, flexShrink: 0 }}><path d="M2 4l6 5 6-5M2 4h12v9H2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <a href="mailto:lauri.hynonen@gmail.com" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 2 }}>lauri.hynonen@gmail.com</a>
                </div>
              </div>
              <div style={{ padding: '1.5rem', background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 12 }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.7 }}>
                  <strong style={{ color: 'var(--navy)' }}>What happens next:</strong><br />
                  I&apos;ll review your inquiry, tell you what kind of setup I would recommend, and let you know whether it makes sense to move forward — without pressure.
                </p>
              </div>
            </div>

            <div>
              {!submitted ? (
                <div className="form-card">
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="form-honey" aria-hidden="true">
                      <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                    </div>
                    <div className="form-grid">
                      <div className="form-field">
                        <label className="form-label" htmlFor="name">Name <span aria-hidden="true">*</span></label>
                        <input className="form-input" type="text" id="name" name="name" autoComplete="name" required />
                      </div>
                      <div className="form-field">
                        <label className="form-label" htmlFor="company">Company <span className="form-optional">(optional)</span></label>
                        <input className="form-input" type="text" id="company" name="company" autoComplete="organization" />
                      </div>
                      <div className="form-field full-width">
                        <label className="form-label" htmlFor="email">Email <span aria-hidden="true">*</span></label>
                        <input className="form-input" type="email" id="email" name="email" autoComplete="email" required />
                      </div>
                      <div className="form-field full-width">
                        <label className="form-label" htmlFor="site">Current website <span className="form-optional">(optional)</span></label>
                        <input className="form-input" type="url" id="site" name="current_site" placeholder="https://..." />
                      </div>
                      <div className="form-field full-width">
                        <label className="form-label" htmlFor="need">What do you need? <span aria-hidden="true">*</span></label>
                        <textarea className="form-textarea" id="need" name="what_you_need" rows={4} required placeholder="New website, redesign, migration..." />
                      </div>
                      <div className="form-field full-width">
                        <label className="form-label" htmlFor="timeline">Timeline <span className="form-optional">(optional)</span></label>
                        <select className="form-select" id="timeline" name="timeline">
                          <option value="">Flexible / not sure yet</option>
                          <option value="urgent">Urgent — within a month</option>
                          <option value="soon">Within 2–3 months</option>
                          <option value="planning">Planning ahead</option>
                        </select>
                      </div>
                      <div className="form-field full-width">
                        <label className="form-label" htmlFor="extra">Anything else? <span className="form-optional">(optional)</span></label>
                        <textarea className="form-textarea" id="extra" name="anything_else" rows={3} placeholder="Budget range, specific requirements, context..." />
                      </div>
                    </div>
                    <div className="form-submit">
                      <p className="form-note">* Required fields</p>
                      <button type="submit" className="btn btn-primary">Send inquiry →</button>
                    </div>
                  </form>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12l5 5L20 7" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.75rem' }}>Thanks — message received.</h3>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', lineHeight: 1.65 }}>
                    I&apos;ll review your inquiry and be in touch within 1–2 working days. If it&apos;s urgent, reach me at{' '}
                    <a href="mailto:lauri.hynonen@gmail.com" style={{ color: 'var(--navy)', textDecoration: 'underline' }}>lauri.hynonen@gmail.com</a>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
