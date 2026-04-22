'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
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

const SERVICES = [
  {
    num: '01',
    title: 'Custom website builds',
    desc: 'For businesses that want a modern website built from scratch — not a template with a logo swap. Designed around your business, your offer, and the way you want to be seen.',
    tags: ['Design-led', 'Full ownership', 'Fast turnaround'],
    img: '/hero-main.png',
    href: '/services/custom-websites',
  },
  {
    num: '02',
    title: 'Full website redesigns',
    desc: 'For companies with a website that no longer feels good enough. Rethink the structure, messaging, visuals, and editing setup — then rebuild into something that actually supports the business.',
    tags: ['Visual audit', 'New architecture', 'Clean launch'],
    img: '/redesign-hero.png',
    href: '/services/website-redesign',
  },
  {
    num: '03',
    title: 'AI Build Sessions',
    desc: 'A focused hands-on session where I set up Claude Code or Codex in your project and teach you how to make real changes yourself — to your site or anything you want to build.',
    tags: ['Claude Code setup', 'Live walkthrough', 'Real project'],
    img: '/ai-build-session-setup.png',
    href: '/services/ai-build-sessions',
  },
  {
    num: '04',
    title: 'Custom AI workflows',
    desc: 'I help identify manual, repetitive, or high-value workflows and build practical AI-assisted solutions around them — content systems, internal tools, automation flows, document workflows.',
    tags: ['Workflow mapping', 'Practical build', 'Team handover'],
    img: '/ai-workflows-hero.png',
    href: '/services/ai-workflows',
  },
]

const STEPS = [
  { num: '01', title: 'Materials & direction', text: 'You send the essentials — texts, images, logo files, references, and any direction. The clearer the materials, the faster everything moves.' },
  { num: '02', title: 'First draft build', text: 'Once materials are in, I build the real site — not a mockup, not a long design phase. Usually done in 1–2 days.' },
  { num: '03', title: 'One refinement round', text: 'You review the draft and give one focused round of feedback. I refine based on that. No endless revision loops.' },
  { num: '04', title: 'Launch & handover', text: 'Site goes live, everything is verified, and you get full ownership of the code, domain, and hosting setup.' },
]

// Placeholder client names for the ticker
const CLIENTS = [
  'Healthcare startup', 'Law firm', 'Architecture studio', 'SaaS company',
  'Consulting firm', 'E-commerce brand', 'Tech agency', 'Financial advisor',
  'Creative studio', 'Manufacturing co.', 'Real estate firm', 'Medical clinic',
]

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const heroPhotoRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const valueRef = useRef<HTMLElement>(null)
  const ctaBgRef = useRef<HTMLDivElement>(null)

  const [activeService, setActiveService] = useState(0)
  const [prevService, setPrevService] = useState<number | null>(null)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const switchService = useCallback((idx: number) => {
    setPrevService(activeService)
    setActiveService(idx)
  }, [activeService])

  // Auto-advance services every 4s
  useEffect(() => {
    autoRef.current = setInterval(() => {
      setActiveService((prev) => (prev + 1) % SERVICES.length)
    }, 4000)
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [])

  const handleTabClick = (idx: number) => {
    if (autoRef.current) clearInterval(autoRef.current)
    switchService(idx)
    autoRef.current = setInterval(() => {
      setActiveService((p) => (p + 1) % SERVICES.length)
    }, 4000)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Hero entrance
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl
        .fromTo('.hero-eyebrow', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo('.hero-word', { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.07 }, '-=0.6')
        .fromTo('.hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.5')
        .fromTo('.hero-speed-badge', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.7 }, '-=0.7')
        .fromTo('.hero-actions', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.3')

      // Hero photo parallax
      gsap.to(heroPhotoRef.current, {
        yPercent: 25, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })

      // Hero content fades up on scroll
      gsap.to(heroContentRef.current, {
        yPercent: 18, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '55% top', scrub: true },
      })

      // Value statement reveal
      gsap.fromTo('.value-statement',
        { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'power3.out',
          scrollTrigger: { trigger: valueRef.current, start: 'top 70%' } }
      )

      // Stat counters
      document.querySelectorAll<HTMLElement>('.stat-num').forEach((el) => {
        const target = parseInt(el.dataset.target || '0', 10)
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target, duration: 1.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate() { el.textContent = Math.round(obj.val).toString() },
        })
      })

      // Process items
      document.querySelectorAll('.process-item').forEach((item) => {
        gsap.fromTo(item, { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 83%', onEnter: () => item.classList.add('revealed') } }
        )
      })

      // CTA bg parallax
      gsap.to(ctaBgRef.current, {
        yPercent: 18, ease: 'none',
        scrollTrigger: { trigger: '.cta-scene', start: 'top bottom', end: 'bottom top', scrub: true },
      })

      // CTA word reveal
      gsap.fromTo('.cta-word', { yPercent: 115 },
        { yPercent: 0, duration: 1, stagger: 0.08, ease: 'power4.out',
          scrollTrigger: { trigger: '.cta-scene', start: 'top 72%' } }
      )

      // Generic reveals
      document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
        const delay = parseFloat(el.dataset.delay || '0') * 0.08
        gsap.fromTo(el, { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.85, delay, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%' } }
        )
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="hero-scene" ref={heroRef} aria-label="Hero">
        <div className="hero-bg">
          <div ref={heroPhotoRef} style={{ position: 'absolute', inset: 0 }}>
            <Image src="/hero-main.png" alt="" fill priority sizes="100vw" className="hero-photo" aria-hidden="true" />
          </div>
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-gradient" aria-hidden="true" />
        </div>

        <div className="hero-content" ref={heroContentRef}>
          <div className="hero-eyebrow" aria-hidden="true">
            <span className="hero-eyebrow-dot" />
            Website builds &amp; AI services
          </div>

          <h1 className="hero-title">
            {['Premium', 'websites,', 'built fast.'].map((line, i) => (
              <span key={i} className="word" style={{ display: 'block', overflow: 'hidden' }}>
                <span className="hero-word" style={{ display: 'block' }}>
                  {i === 2 ? <>built <em>fast.</em></> : line}
                </span>
              </span>
            ))}
          </h1>

          {/* Speed badge — the key differentiator */}
          <div className="hero-speed-badge" style={{ opacity: 0, display: 'inline-flex', alignItems: 'center', gap: '0.625rem', background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: 100, padding: '0.5rem 1rem', marginBottom: '1.5rem' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', display: 'block', flexShrink: 0, animation: 'pulse 2s ease-in-out infinite' }} />
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
              Most projects delivered in <strong style={{ color: 'var(--cyan)' }}>24–48 hours</strong>
            </span>
          </div>

          <p className="hero-subtitle">
            For businesses that want a site that looks stronger, feels more current,
            and is easier to manage — without the usual 6-week agency timeline.
          </p>

          <div className="hero-actions" style={{ opacity: 0 }}>
            <Link href="/contact" className="btn btn-primary">
              Start a project <Arrow />
            </Link>
            <Link href="/work" className="btn btn-outline">
              See the work
            </Link>
          </div>
        </div>

        <div className="hero-scroll" style={{ opacity: 0 }} aria-hidden="true">
          <span className="hero-scroll-label">Scroll</span>
          <span className="hero-scroll-line" />
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────── */}
      <div className="marquee-section" aria-hidden="true">
        <div className="marquee-track">
          {[...Array(2)].flatMap((_, rep) =>
            ['Custom websites', 'Redesigns', 'WordPress migration', 'Hosting & launch', '24-hour delivery', 'Full ownership', 'No templates'].map((item, i) => (
              <span key={`${rep}-${i}`} className="marquee-item">
                {item}<span className="marquee-sep">✦</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── SPEED CALLOUT ────────────────────────────── */}
      <section style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <p className="eyebrow reveal" style={{ marginBottom: '1.25rem' }}>Why Fyxio</p>
              <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: 'white', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
                Your website ready in <em style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>24 to 48 hours.</em>
              </h2>
              <p className="reveal" data-delay="2" style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: '44ch' }}>
                Most agencies take 6–12 weeks. I work in focused sprints — one project at a time, no context switching, no internal handoffs. The result is faster delivery without cutting corners on quality.
              </p>
            </div>
            <div className="reveal" data-delay="1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
              {[
                { num: '24h', label: 'First draft delivered' },
                { num: '1', label: 'Project at a time' },
                { num: '100%', label: 'Code ownership' },
                { num: '0', label: 'Dependencies' },
              ].map((s, i) => (
                <div key={i} style={{ padding: '2rem', background: 'var(--navy-mid)' }}>
                  <p style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: 'var(--cyan)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '0.375rem' }}>{s.num}</p>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUE STATEMENT ──────────────────────────── */}
      <section className="value-scene" ref={valueRef}>
        <div className="container">
          <p className="eyebrow eyebrow--dark" style={{ marginBottom: '2rem' }}>What we believe</p>
          <p className="value-statement" style={{ fontSize: 'clamp(2.25rem, 5vw, 5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.035em', color: 'var(--navy)' }}>
            Your website is <em style={{ fontStyle: 'italic', color: 'var(--cyan)' }}>the first impression</em>.<br />
            <span style={{ color: 'var(--slate-200)' }}>It should earn attention</span><br />
            in the first three seconds.
          </p>
        </div>
      </section>

      {/* ── SERVICES TAB SWITCHER ─────────────────────── */}
      <section style={{ background: 'var(--navy)', padding: '6rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem' }}>
            <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>What I do</p>
            <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: 'white', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              Websites and AI.<br />One clear focus.
            </h2>
          </div>

          {/* Tab buttons */}
          <div className="reveal" style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            {SERVICES.map((s, i) => (
              <button
                key={i}
                onClick={() => handleTabClick(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.625rem 1.125rem',
                  borderRadius: 100,
                  border: activeService === i ? '1px solid var(--cyan)' : '1px solid rgba(255,255,255,0.12)',
                  background: activeService === i ? 'rgba(34,211,238,0.1)' : 'transparent',
                  color: activeService === i ? 'var(--cyan)' : 'rgba(255,255,255,0.45)',
                  fontSize: '0.8125rem', fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>{s.num}</span>
                {s.title.split(' ').slice(0, 2).join(' ')}
              </button>
            ))}
          </div>

          {/* Auto-progress bar */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: '2.5rem', position: 'relative', overflow: 'hidden', borderRadius: 1 }}>
            <div
              key={activeService}
              style={{
                position: 'absolute', inset: 0,
                background: 'var(--cyan)',
                transformOrigin: 'left',
                animation: 'progressBar 4s linear forwards',
              }}
            />
          </div>

          {/* Content panel */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'stretch', minHeight: 420 }}>
            {/* Left: text */}
            <div key={activeService} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', animation: 'fadeSlideIn 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '1.25rem' }}>
                SERVICE {SERVICES[activeService].num}
              </p>
              <h3 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 800, color: 'white', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
                {SERVICES[activeService].title}
              </h3>
              <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '1.75rem', maxWidth: '44ch' }}>
                {SERVICES[activeService].desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                {SERVICES[activeService].tags.map((tag) => (
                  <span key={tag} style={{ fontSize: '0.6875rem', fontWeight: 600, padding: '0.3rem 0.75rem', borderRadius: 100, border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={SERVICES[activeService].href} className="link-arrow link-arrow--cyan">
                Learn more <Arrow />
              </Link>
            </div>

            {/* Right: image */}
            <div key={`img-${activeService}`} style={{ borderRadius: 16, overflow: 'hidden', position: 'relative', minHeight: 360, animation: 'fadeIn 0.6s cubic-bezier(0.16,1,0.3,1)' }}>
              <Image
                src={SERVICES[activeService].img}
                alt={SERVICES[activeService].title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,23,42,0.3), transparent)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────── */}
      <section className="process-scene">
        <div className="container">
          <div style={{ maxWidth: 600, marginBottom: '1rem' }}>
            <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>How it works</p>
            <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: 'white', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              First draft in 24 hours.<br />Live in 48.
            </h2>
          </div>

          <div className="process-list" style={{ marginTop: '4rem' }}>
            {STEPS.map((step, i) => (
              <div key={i} className="process-item">
                {i < STEPS.length - 1 && <div className="process-line" />}
                <div className="process-num-wrap">
                  <div className="process-num">{step.num}</div>
                </div>
                <div className="process-content">
                  <h3 className="process-title">{step.title}</h3>
                  <p className="process-text">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '4rem', paddingTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <Link href="/process" className="btn btn-outline reveal">See full process →</Link>
          </div>
        </div>
      </section>

      {/* ── WORK / CLIENT TYPES ──────────────────────── */}
      <section className="work-scene" style={{ padding: '7rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
            <div>
              <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>Selected work</p>
              <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
                Built for businesses<br />across every sector.
              </h2>
            </div>
            <Link href="/work" className="link-arrow reveal" data-delay="2" style={{ flexShrink: 0, marginBottom: '0.5rem' }}>
              View my work <Arrow />
            </Link>
          </div>

          {/* Case study card */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '4rem' }}>
            <article className="work-card reveal" style={{ gridColumn: '1 / -1' }}>
              <Image src="/work-athlos.png" alt="Athlos Oy website" fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'top center' }} />
              <div className="work-card-overlay" />
              <div className="work-card-body">
                <span className="work-card-tag">Custom Website — Athlos Oy</span>
                <h3 className="work-card-title">X-ray imaging company, Finland</h3>
                <p className="work-card-desc">Premium website, clean structure, credible design, full launch setup. Delivered in 3 days.</p>
                <a href="https://athlos.fi" className="link-arrow link-arrow--light" style={{ marginTop: '0.75rem', display: 'inline-flex' }}>
                  Visit athlos.fi <Arrow />
                </a>
              </div>
            </article>
          </div>

          {/* Client type ticker */}
          <div style={{ borderTop: '1px solid var(--slate-200)', borderBottom: '1px solid var(--slate-200)', padding: '1.5rem 0', overflow: 'hidden' }}>
            <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--slate-400)', marginBottom: '1rem', textAlign: 'center' }}>
              Built for businesses like yours
            </p>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', gap: '3rem', animation: 'marquee 28s linear infinite', whiteSpace: 'nowrap', width: 'max-content' }}>
                {[...CLIENTS, ...CLIENTS].map((name, i) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-400)', flexShrink: 0 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--slate-300)', display: 'inline-block', flexShrink: 0 }} />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="cta-scene">
        <div ref={ctaBgRef} style={{ position: 'absolute', inset: 0 }}>
          <Image src="/redesign-hero.png" alt="" fill sizes="100vw" style={{ objectFit: 'cover', opacity: 0.12 }} aria-hidden="true" />
        </div>
        <div className="cta-content container">
          <p className="eyebrow eyebrow--dark reveal" style={{ marginBottom: '1.5rem' }}>Ready to start?</p>
          <h2 className="cta-title">
            {["Most sites live", 'in 24–48 hours.'].map((line, i) => (
              <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                <span className="cta-word" style={{ display: 'block' }}>
                  {i === 1 ? <em>in 24–48 hours.</em> : line}
                </span>
              </span>
            ))}
          </h2>
          <p className="cta-sub reveal">Send me your brief and materials. The faster you move, the faster it goes live.</p>
          <div className="reveal" data-delay="2">
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
              Start a conversation <Arrow />
            </Link>
            <p style={{ marginTop: '1rem', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.2)' }}>
              Reply within a few hours
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-16px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes progressBar {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </>
  )
}
