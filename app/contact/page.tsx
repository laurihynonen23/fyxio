'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const MAX_FILE_SIZE_MB = 50

export default function ContactPage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<'question' | 'demo'>('question')
  const [files, setFiles] = useState<File[]>([])
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [dragOver, setDragOver] = useState(false)

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

  function addFiles(incoming: FileList | null) {
    if (!incoming) return
    const valid = Array.from(incoming).filter(f => f.size <= MAX_FILE_SIZE_MB * 1024 * 1024)
    setFiles(prev => {
      const existing = new Set(prev.map(f => f.name + f.size))
      return [...prev, ...valid.filter(f => !existing.has(f.name + f.size))]
    })
  }

  function removeFile(i: number) {
    setFiles(prev => prev.filter((_, idx) => idx !== i))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const honey = (form.elements.namedItem('website') as HTMLInputElement)?.value
    if (honey) return

    setStatus('sending')
    const fd = new FormData(form)
    fd.set('inquiry_type', mode)
    files.forEach(f => fd.append('files', f))

    try {
      const res = await fetch('/api/contact', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('server error')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
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
            Ask a quick question, or send your materials and I&apos;ll come back with a landing page demo.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="contact-grid">

            {/* LEFT */}
            <div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800, color: 'var(--navy)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                Two ways<br />to get started
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ padding: '1.25rem', border: `1.5px solid ${mode === 'question' ? 'var(--cyan)' : 'var(--slate-200)'}`, borderRadius: 12, background: mode === 'question' ? 'rgba(34,211,238,0.04)' : 'var(--white)', cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => setMode('question')}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: mode === 'question' ? 'var(--cyan)' : 'var(--slate-400)', marginBottom: '0.375rem' }}>Option A</p>
                  <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.25rem' }}>Ask about your project</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', lineHeight: 1.55 }}>Tell me what you need and I&apos;ll reply with what makes sense.</p>
                </div>
                <div style={{ padding: '1.25rem', border: `1.5px solid ${mode === 'demo' ? 'var(--cyan)' : 'var(--slate-200)'}`, borderRadius: 12, background: mode === 'demo' ? 'rgba(34,211,238,0.04)' : 'var(--white)', cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => setMode('demo')}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: mode === 'demo' ? 'var(--cyan)' : 'var(--slate-400)', marginBottom: '0.375rem' }}>Option B</p>
                  <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.25rem' }}>Get a landing page demo</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', lineHeight: 1.55 }}>Send your logo, images, videos, and old site link — I&apos;ll come back with a demo.</p>
                </div>
              </div>

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

              <div style={{ padding: '1.25rem 1.5rem', background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 12 }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.7 }}>
                  <strong style={{ color: 'var(--navy)' }}>Demo request?</strong><br />
                  Upload your company images, videos, and logo. Add your current website link. I&apos;ll review and come back with a landing page demo — no commitment needed.
                </p>
              </div>
            </div>

            {/* RIGHT — form */}
            <div>
              {status === 'sent' ? (
                <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.75rem' }}>Thanks — message received.</h3>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', lineHeight: 1.65 }}>
                    I&apos;ll be in touch within 1–2 working days. If it&apos;s urgent:{' '}
                    <a href="mailto:lauri.hynonen@gmail.com" style={{ color: 'var(--navy)', textDecoration: 'underline' }}>lauri.hynonen@gmail.com</a>.
                  </p>
                </div>
              ) : (
                <div className="form-card">
                  {/* Mode toggle */}
                  <div style={{ display: 'flex', marginBottom: '1.75rem', border: '1px solid var(--slate-200)', borderRadius: 10, overflow: 'hidden' }}>
                    {(['question', 'demo'] as const).map((m) => (
                      <button key={m} type="button" onClick={() => setMode(m)} style={{ flex: 1, padding: '0.75rem', fontSize: '0.8125rem', fontWeight: 600, border: 'none', cursor: 'pointer', background: mode === m ? 'var(--navy)' : 'transparent', color: mode === m ? 'white' : 'var(--slate-500)', transition: 'all 0.2s' }}>
                        {m === 'question' ? 'Ask a question' : 'Request a demo'}
                      </button>
                    ))}
                  </div>

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

                      {/* Current website — always shown */}
                      <div className="form-field full-width">
                        <label className="form-label" htmlFor="site">Current website <span className="form-optional">(optional)</span></label>
                        <input className="form-input" type="url" id="site" name="current_site" placeholder="https://..." />
                      </div>

                      {/* File upload — only for demo mode */}
                      {mode === 'demo' && (
                        <div className="form-field full-width">
                          <label className="form-label">Company images &amp; videos <span className="form-optional">(optional, max {MAX_FILE_SIZE_MB}MB each)</span></label>
                          <div
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files) }}
                            onClick={() => document.getElementById('file-input')?.click()}
                            style={{ border: `2px dashed ${dragOver ? 'var(--cyan)' : 'var(--slate-200)'}`, borderRadius: 10, padding: '1.75rem', textAlign: 'center', cursor: 'pointer', background: dragOver ? 'rgba(34,211,238,0.04)' : 'var(--slate-50)', transition: 'all 0.2s' }}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ margin: '0 auto 0.75rem', display: 'block', color: 'var(--slate-400)' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-600)', marginBottom: '0.25rem' }}>Drop files here or click to browse</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>Images, videos, logos — anything you want on the new site</p>
                            <input id="file-input" type="file" multiple accept="image/*,video/*,.svg,.pdf" style={{ display: 'none' }} onChange={(e) => addFiles(e.target.files)} />
                          </div>
                          {files.length > 0 && (
                            <ul style={{ listStyle: 'none', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                              {files.map((f, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8125rem', color: 'var(--slate-600)', background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 7, padding: '0.5rem 0.75rem' }}>
                                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80%' }}>{f.name}</span>
                                  <button type="button" onClick={() => removeFile(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)', fontSize: '1rem', lineHeight: 1, flexShrink: 0, padding: '0 0.25rem' }}>×</button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}

                      <div className="form-field full-width">
                        <label className="form-label" htmlFor="message">
                          {mode === 'demo' ? 'Anything to add?' : 'What do you need?'}{' '}
                          <span aria-hidden="true">*</span>
                        </label>
                        <textarea
                          className="form-textarea"
                          id="message"
                          name="message"
                          rows={4}
                          required
                          placeholder={mode === 'demo'
                            ? 'Industry, tone, any specific requirements...'
                            : 'New website, redesign, question about pricing...'}
                        />
                      </div>
                    </div>

                    {status === 'error' && (
                      <p style={{ fontSize: '0.875rem', color: '#ef4444', marginBottom: '1rem' }}>
                        Something went wrong. Try again or email me directly at lauri.hynonen@gmail.com.
                      </p>
                    )}

                    <div className="form-submit">
                      <p className="form-note">* Required fields</p>
                      <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                        {status === 'sending' ? 'Sending...' : mode === 'demo' ? 'Send for a demo →' : 'Send inquiry →'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
