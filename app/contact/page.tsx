'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { upload } from '@vercel/blob/client'
import { useLanguage } from '@/lib/LanguageContext'
import { translations } from '@/lib/translations'

const MAX_FILE_SIZE_MB = 50

export default function ContactPage() {
  const { lang } = useLanguage()
  const t = translations[lang].contact

  const rootRef = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<'question' | 'demo'>('question')
  const [files, setFiles] = useState<File[]>([])
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [dragOver, setDragOver] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sh-word', { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.07, ease: 'power4.out', delay: 0.2 })
      gsap.fromTo('.sh-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.9 })
      gsap.fromTo('.form-card', { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.5 })
    }, rootRef)
    return () => ctx.revert()
  }, [lang])

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

    try {
      const uploadedUrls: { name: string; url: string }[] = []
      for (const file of files) {
        const blob = await upload(`contact-uploads/${Date.now()}-${file.name}`, file, {
          access: 'private',
          handleUploadUrl: '/api/upload',
        })
        uploadedUrls.push({ name: file.name, url: blob.url })
      }

      const payload = {
        name: (form.elements.namedItem('name') as HTMLInputElement).value,
        email: (form.elements.namedItem('email') as HTMLInputElement).value,
        company: (form.elements.namedItem('company') as HTMLInputElement).value,
        current_site: (form.elements.namedItem('current_site') as HTMLInputElement).value,
        message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
        inquiry_type: mode,
        uploaded_urls: uploadedUrls,
      }

      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 15000)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
      clearTimeout(timeout)
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
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '1rem' }}>{t.eyebrow}</p>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, color: 'white', lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
            {t.heroTitle.map((line, i) => (
              <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                <span className="sh-word" style={{ display: 'block', transform: 'translateY(110%)' }}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="sh-sub" style={{ opacity: 0, fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', color: 'rgba(255,255,255,0.45)', maxWidth: '46ch', lineHeight: 1.65 }}>
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="contact-grid">
            {/* LEFT */}
            <div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800, color: 'var(--navy)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                {t.twoWaysTitle.split('\n').map((line, i) => <span key={i} style={{ display: 'block' }}>{line}</span>)}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ padding: '1.25rem', border: `1.5px solid ${mode === 'question' ? 'var(--cyan)' : 'var(--slate-200)'}`, borderRadius: 12, background: mode === 'question' ? 'rgba(34,211,238,0.04)' : 'var(--white)', cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => setMode('question')}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: mode === 'question' ? 'var(--cyan)' : 'var(--slate-400)', marginBottom: '0.375rem' }}>{t.optionALabel}</p>
                  <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.25rem' }}>{t.optionATitle}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', lineHeight: 1.55 }}>{t.optionADesc}</p>
                </div>
                <div style={{ padding: '1.25rem', border: `1.5px solid ${mode === 'demo' ? 'var(--cyan)' : 'var(--slate-200)'}`, borderRadius: 12, background: mode === 'demo' ? 'rgba(34,211,238,0.04)' : 'var(--white)', cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => setMode('demo')}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: mode === 'demo' ? 'var(--cyan)' : 'var(--slate-400)', marginBottom: '0.375rem' }}>{t.optionBLabel}</p>
                  <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.25rem' }}>{t.optionBTitle}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', lineHeight: 1.55 }}>{t.optionBDesc}</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--slate-600)' }}>
                  <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16, flexShrink: 0 }}><path d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1zm0 3v4l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  {t.replyTime}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--slate-600)' }}>
                  <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16, flexShrink: 0 }}><path d="M2 4l6 5 6-5M2 4h12v9H2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <a href="mailto:lauri.hynonen@gmail.com" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 2 }}>lauri.hynonen@gmail.com</a>
                </div>
              </div>

              <div style={{ padding: '1.25rem 1.5rem', background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 12 }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.7 }}>
                  <strong style={{ color: 'var(--navy)' }}>{t.demoRequestTitle}</strong><br />
                  {t.demoRequestBody}
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
                  <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.75rem' }}>{t.successTitle}</h3>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', lineHeight: 1.65 }}>
                    {t.successBody}{' '}
                    <a href="mailto:lauri.hynonen@gmail.com" style={{ color: 'var(--navy)', textDecoration: 'underline' }}>lauri.hynonen@gmail.com</a>.
                  </p>
                </div>
              ) : (
                <div className="form-card">
                  <div style={{ display: 'flex', marginBottom: '1.75rem', border: '1px solid var(--slate-200)', borderRadius: 10, overflow: 'hidden' }}>
                    {(['question', 'demo'] as const).map((m) => (
                      <button key={m} type="button" onClick={() => setMode(m)} style={{ flex: 1, padding: '0.75rem', fontSize: '0.8125rem', fontWeight: 600, border: 'none', cursor: 'pointer', background: mode === m ? 'var(--navy)' : 'transparent', color: mode === m ? 'white' : 'var(--slate-500)', transition: 'all 0.2s' }}>
                        {m === 'question' ? t.tabQuestion : t.tabDemo}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} noValidate>
                    <div className="form-honey" aria-hidden="true">
                      <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                    </div>

                    <div className="form-grid">
                      <div className="form-field">
                        <label className="form-label" htmlFor="name">{t.labelName} <span aria-hidden="true">*</span></label>
                        <input className="form-input" type="text" id="name" name="name" autoComplete="name" required />
                      </div>
                      <div className="form-field">
                        <label className="form-label" htmlFor="company">{t.labelCompany} <span className="form-optional">{t.optional}</span></label>
                        <input className="form-input" type="text" id="company" name="company" autoComplete="organization" />
                      </div>
                      <div className="form-field full-width">
                        <label className="form-label" htmlFor="email">{t.labelEmail} <span aria-hidden="true">*</span></label>
                        <input className="form-input" type="email" id="email" name="email" autoComplete="email" required />
                      </div>

                      <div className="form-field full-width">
                        <label className="form-label" htmlFor="site">{t.labelSite} <span className="form-optional">{t.optional}</span></label>
                        <input className="form-input" type="url" id="site" name="current_site" placeholder="https://..." />
                      </div>

                      {mode === 'demo' && (
                        <div className="form-field full-width">
                          <label className="form-label">{t.labelFiles} <span className="form-optional">{t.optionalMaxFile}</span></label>
                          <div
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files) }}
                            onClick={() => document.getElementById('file-input')?.click()}
                            style={{ border: `2px dashed ${dragOver ? 'var(--cyan)' : 'var(--slate-200)'}`, borderRadius: 10, padding: '1.75rem', textAlign: 'center', cursor: 'pointer', background: dragOver ? 'rgba(34,211,238,0.04)' : 'var(--slate-50)', transition: 'all 0.2s' }}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ margin: '0 auto 0.75rem', display: 'block', color: 'var(--slate-400)' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-600)', marginBottom: '0.25rem' }}>{t.dropFiles}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>{t.dropFilesHint}</p>
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
                          {mode === 'demo' ? t.labelMessageDemo : t.labelMessageQuestion}{' '}
                          <span aria-hidden="true">*</span>
                        </label>
                        <textarea
                          className="form-textarea"
                          id="message"
                          name="message"
                          rows={4}
                          required
                          placeholder={mode === 'demo' ? t.placeholderDemo : t.placeholderQuestion}
                        />
                      </div>
                    </div>

                    {status === 'error' && (
                      <p style={{ fontSize: '0.875rem', color: '#ef4444', marginBottom: '1rem' }}>
                        {t.errorMsg}
                      </p>
                    )}

                    <div className="form-submit">
                      <p className="form-note">{t.requiredFields}</p>
                      <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                        {status === 'sending' ? t.sending : mode === 'demo' ? t.sendDemo : t.sendInquiry}
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
