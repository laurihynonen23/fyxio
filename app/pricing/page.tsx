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

const Check = ({ dark = false }: { dark?: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2, color: dark ? 'var(--cyan)' : 'var(--cyan)' }}>
    <path d="M2 7l4 4 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const PACKAGES = [
  {
    tier: 'Starter',
    price: 'From €699',
    subtitle: 'Simple website, fast launch',
    note: 'One-time project fee',
    featured: false,
    desc: 'For small businesses that need a clean, modern site quickly.',
    features: [
      'Up to 5 pages',
      'Custom design',
      'Mobile-responsive',
      'Contact form',
      'Basic SEO structure',
      'Fast launch setup',
      'Content editor included',
      '1 revision round',
    ],
  },
  {
    tier: 'Business',
    price: 'From €1,290',
    subtitle: 'More complete, more polished',
    note: 'One-time project fee',
    featured: true,
    badge: 'Most popular',
    desc: 'For companies that want a stronger, more complete website with better structure and a more polished first impression.',
    features: [
      'Up to 10 pages',
      'Custom design',
      'Mobile-responsive',
      'Contact form',
      'Better content structure',
      'Basic SEO structure',
      'Fast launch setup',
      'Editor-ready content setup',
      'Content editor included',
      '2 revision rounds',
    ],
  },
  {
    tier: 'Premium',
    price: 'From €2,490',
    subtitle: 'Custom scope',
    note: 'One-time project fee',
    featured: false,
    desc: 'For businesses that want a more refined, more impressive, and more custom website experience.',
    features: [
      'Larger custom site',
      'More refined visual direction',
      'Advanced sections and interactions',
      'Custom page layouts',
      'Editor-ready content setup',
      'Content editor included',
      'Priority turnaround',
      '2 revision rounds',
      'Launch support',
    ],
  },
]

const LAUNCH_OPTIONS = [
  {
    title: 'Managed for you',
    bestFor: 'Non-technical clients',
    desc: 'We host, launch, and maintain everything. You edit your own content anytime through the included editor — no code, no developer needed.',
    price: 'From €49/mo',
    features: [
      'Managed hosting setup',
      'Domain connection support',
      'SSL setup',
      'Basic uptime monitoring',
      'Edit your own content via the editor',
      'Technical maintenance',
    ],
    note: 'Best if you do not want to deal with GitHub, Vercel, DNS, or technical setup.',
  },
  {
    title: 'Client-owned setup',
    bestFor: 'Clients who want full ownership',
    desc: 'You own the hosting and code accounts. We set everything up and connect the site properly.',
    price: '€99',
    features: [
      'Setup on your own GitHub / hosting account',
      'Deployment setup',
      'Domain and DNS guidance',
      'Editor or content setup',
      'Handover call',
    ],
    note: 'One-time fee. Best if you want long-term ownership but still want us to handle the technical launch.',
  },
  {
    title: 'Code handover',
    bestFor: 'Technical teams',
    desc: 'We deliver the website code and documentation. Your team handles hosting, deployment, and maintenance.',
    price: 'Free',
    oldPrice: '€49',
    features: [
      'Full code handover',
      'Build instructions',
      'Basic documentation',
      'Optional handover call',
    ],
    note: 'Best if you already have a developer or technical team.',
  },
]

const ONGOING = [
  {
    label: 'AI-ASSISTED EDITING',
    title: 'Editor + AI',
    price: '€19.99/mo',
    body: 'Upgrade your included editor with AI support for rewriting, improving, and adjusting your website content whenever you want.',
    features: [
      'AI-assisted text improvements',
      'Tone and clarity adjustments',
      'SEO title and meta suggestions',
      'Faster content iterations',
      'Best for clients improving content over time',
    ],
  },
]

const PRICE_FACTORS = [
  'Number of pages',
  'Whether content is ready or needs editing',
  'Amount of custom design and animation',
  'Hosting and ownership setup',
  'Editor or AI-editor requirements',
  'Forms, integrations, or special features',
  'Migration from an old site',
  'Speed of delivery',
]

export default function PricingPage() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.sh-word', { yPercent: 110 })
      gsap.set('.sh-meta', { opacity: 0, y: 20 })
      gsap.set('.price-tier-badge', { opacity: 0, x: -16 })

      gsap.to('.sh-word', { yPercent: 0, duration: 1.1, stagger: 0.07, ease: 'power4.out', delay: 0.15 })
      gsap.to('.sh-meta', { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.7 })
      gsap.to('.price-tier-badge', { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.9 })

      gsap.to('.pricing-hero-bg', {
        yPercent: 20, ease: 'none',
        scrollTrigger: { trigger: '.pricing-hero', start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.pricing-hero-content', {
        yPercent: 15, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '.pricing-hero', start: 'top top', end: '60% top', scrub: true },
      })

      gsap.fromTo('.pricing-card', { opacity: 0, y: 44 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.pricing-grid', start: 'top 78%' } }
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

      {/* ── HERO ──────────────────────────────────────── */}
      <section className="pricing-hero" style={{ position: 'relative', minHeight: '100svh', background: 'var(--navy)', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <div className="pricing-hero-bg" style={{ position: 'absolute', inset: 0 }}>
          <Image src="/work-laptop-desk.jpg" alt="" fill sizes="100vw" priority style={{ objectFit: 'cover', opacity: 0.2 }} aria-hidden="true" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--navy) 40%, rgba(26,23,20,0.5) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(196,113,74,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(196,113,74,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} aria-hidden="true" />
        </div>
        <div style={{ position: 'absolute', right: '-2rem', bottom: '-2rem', fontSize: 'clamp(12rem, 25vw, 22rem)', fontWeight: 900, color: 'rgba(196,113,74,0.04)', lineHeight: 1, letterSpacing: '-0.06em', userSelect: 'none', pointerEvents: 'none' }} aria-hidden="true">€</div>

        <div className="pricing-hero-content container" style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
          <p className="sh-meta" style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '1.75rem' }}>Pricing</p>

          <h1 style={{ fontSize: 'clamp(3.5rem, 7.5vw, 8.5rem)', fontWeight: 800, color: 'white', lineHeight: 0.92, letterSpacing: '-0.04em', marginBottom: '2.5rem' }}>
            {['Full custom', 'website build', 'from €699.'].map((line, i) => (
              <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                <span className="sh-word" style={{ display: 'block' }}>
                  {i === 1 ? <em style={{ fontStyle: 'italic', color: 'var(--cyan)' }}>{line}</em>
                    : i === 2 ? <span style={{ color: 'rgba(255,255,255,0.3)' }}>{line}</span>
                    : line}
                </span>
              </span>
            ))}
          </h1>

          <div className="sh-meta" style={{ display: 'flex', gap: 0, flexWrap: 'wrap', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, overflow: 'hidden', maxWidth: 560 }}>
            {PACKAGES.map((p, i) => (
              <div key={i} className="price-tier-badge" style={{
                flex: 1, padding: '1.25rem 1.5rem',
                background: p.featured ? 'rgba(196,113,74,0.12)' : 'rgba(255,255,255,0.02)',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                borderTop: p.featured ? '2px solid var(--cyan)' : '2px solid transparent',
              }}>
                <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: p.featured ? 'var(--cyan)' : 'rgba(255,255,255,0.3)', marginBottom: '0.375rem' }}>{p.tier}</p>
                <p style={{ fontSize: 'clamp(0.875rem, 1.4vw, 1.2rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1 }}>{p.price}</p>
              </div>
            ))}
          </div>

          <p className="sh-meta" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)', color: 'rgba(255,255,255,0.35)', maxWidth: '44ch', lineHeight: 1.65 }}>
            Starting prices. Final scope depends on what you need — scoped before any work starts.
          </p>
        </div>
      </section>

      {/* ── PART 1: BUILD PACKAGES ────────────────────── */}
      <section className="section">
        <div className="container">
          <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>Website packages</p>
          <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '3rem' }}>
            One-time build.<br />You own the result.
          </h2>

          <div className="pricing-grid" style={{ alignItems: 'stretch' }}>
            {PACKAGES.map((plan, i) => (
              <div key={i} className={`pricing-card${plan.featured ? ' pricing-card--featured' : ''}`} style={{ opacity: 0, display: 'flex', flexDirection: 'column' }}>
                {plan.badge && <span className="pricing-badge">{plan.badge}</span>}
                <p className="pricing-tier">{plan.tier}</p>
                <p className="pricing-price">{plan.price}</p>
                <p className="pricing-note">{plan.note}</p>
                <div className="pricing-divider" />
                <p style={{ fontSize: '0.9rem', color: plan.featured ? 'rgba(255,255,255,0.5)' : 'var(--slate-500)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                  {plan.desc}
                </p>
                <ul className="pricing-features" style={{ flex: 1 }}>
                  {plan.features.map((f, j) => (
                    <li key={j} className="pricing-feature">
                      <Check dark={plan.featured} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`btn${plan.featured ? ' btn-primary' : ''}`}
                  style={!plan.featured
                    ? { border: '1px solid var(--slate-200)', color: 'var(--navy)', width: '100%', justifyContent: 'center', marginTop: '0.5rem' }
                    : { width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
                >
                  Start with {plan.tier} <Arrow />
                </Link>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ marginTop: '2rem', padding: '1.125rem 1.75rem', background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 10 }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)', lineHeight: 1.7 }}>
              Prices are starting points. Final scope depends on page count, content, launch setup, editing needs, and special features. If you already have content ready, projects can move very fast.
            </p>
          </div>
        </div>
      </section>

      {/* ── PART 2: LAUNCH SETUP ─────────────────────── */}
      <section className="section section--surface">
        <div className="container">
          <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>Launch setup</p>
          <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Choose how you want the site<br />handled after build.
          </h2>
          <p className="reveal" data-delay="2" style={{ fontSize: '1rem', color: 'var(--slate-600)', lineHeight: 1.75, maxWidth: '52ch', marginBottom: '3rem' }}>
            Some clients want everything managed. Others want to own the accounts with a clean handover. Technical teams can take the code and handle the rest.
          </p>

          <div className="options-grid">
            {LAUNCH_OPTIONS.map((opt, i) => (
              <div key={i} className="reveal" data-delay={String(i)} style={{ background: 'var(--white)', border: '1px solid var(--slate-200)', borderRadius: 16, padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '0.375rem' }}>Best for</p>
                <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--slate-500)', marginBottom: '1.25rem' }}>{opt.bestFor}</p>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>{opt.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: 1.65, marginBottom: '1.5rem' }}>{opt.desc}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', flex: 1 }}>
                  {opt.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--slate-600)' }}>
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
                <div style={{ borderTop: '1px solid var(--slate-200)', paddingTop: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.625rem', marginBottom: '0.5rem' }}>
                    <p style={{ fontSize: 'clamp(1.25rem, 2vw, 1.625rem)', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-0.03em' }}>{opt.price}</p>
                    {'oldPrice' in opt && opt.oldPrice && (
                      <s style={{ fontSize: '0.875rem', color: 'var(--slate-400)', fontWeight: 500 }}>{opt.oldPrice as string}</s>
                    )}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--slate-400)', lineHeight: 1.55 }}>{opt.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ marginTop: '2rem', padding: '1.125rem 1.75rem', background: 'rgba(196,113,74,0.06)', border: '1px solid rgba(196,113,74,0.18)', borderRadius: 10 }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--navy)' }}>Your domain always stays yours.</strong>{' '}We only help connect it to the new site.
            </p>
          </div>
        </div>
      </section>

      {/* ── PART 3: EDITING & MAINTENANCE ────────────── */}
      <section className="section">
        <div className="container">
          <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>Ongoing work</p>
          <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '3rem' }}>
            Editing, hosting, and updates<br />are flexible.
          </h2>

          <div className="options-grid" style={{ marginBottom: '1.5rem' }}>
            {ONGOING.map((item, i) => (
              <div key={i} className="reveal" data-delay={String(i)} style={{ background: 'var(--white)', border: '1px solid var(--slate-200)', borderRadius: 16, padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '0.875rem' }}>{item.label}</p>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-0.02em', marginBottom: '0.375rem' }}>{item.title}</h3>
                <p style={{ fontSize: 'clamp(1.5rem, 2.2vw, 1.875rem)', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '1rem' }}>{item.price}</p>
                <div style={{ height: 1, background: 'var(--slate-200)', marginBottom: '1rem' }} />
                <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.65, marginBottom: '1.25rem' }}>{item.body}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1 }}>
                  {item.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--slate-500)' }}>
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Hourly rate */}
          <div className="reveal" style={{ padding: '1.5rem 2rem', background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--slate-400)', marginBottom: '0.375rem' }}>Content updates by me</p>
              <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', lineHeight: 1.65, maxWidth: '52ch' }}>
                Text edits, image swaps, new sections, new pages, and other content work can also be handled for you at an hourly rate.
              </p>
            </div>
            <p style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-0.03em', flexShrink: 0 }}>From €80/hr</p>
          </div>
        </div>
      </section>

      {/* ── AI BUILD SESSION ─────────────────────────── */}
      <section style={{ background: 'var(--navy)', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle grid bg */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(196,113,74,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(196,113,74,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} aria-hidden="true" />
        {/* Decorative glow */}
        <div style={{ position: 'absolute', top: '-8rem', right: '-8rem', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,113,74,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} aria-hidden="true" />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--navy)', background: 'var(--cyan)', padding: '0.35rem 0.8rem', borderRadius: 999 }}>New</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>Available as a standalone session</span>
          </div>

          <div className="ai-session-grid">
            {/* 1: heading + intro text */}
            <div className="ai-text">
              <h2 className="reveal" style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4.5rem)', fontWeight: 800, color: 'white', lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
                AI Build Session.<br /><em style={{ fontStyle: 'italic', color: 'var(--cyan)' }}>Take full control.</em>
              </h2>
              <p className="reveal" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: '50ch' }}>
                A focused hands-on session where I set up Claude Code or Codex in your project and teach you how to make major changes yourself — to your site or anything you want to build.
              </p>
            </div>

            {/* 2: price card */}
            <div className="ai-price reveal" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '2.5rem', minWidth: 260, textAlign: 'center' }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '1rem' }}>One-time session</p>
              <p style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: '0.5rem' }}>€199</p>
              <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)', marginBottom: '2rem', lineHeight: 1.5 }}>Single session.<br />No subscription.</p>
              <Link href="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Book a session <Arrow />
              </Link>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)', marginTop: '1rem' }}>Remote via video call</p>
            </div>

            {/* 3: bullet points */}
            <div className="ai-bullets reveal">
              <div className="ai-bullets-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
                {[
                  'Claude Code or Codex setup in your project',
                  'Live walkthrough — you follow along and build',
                  'Learn to make big changes without a developer',
                  'Works even if you have never written code before',
                  'Covers how to add pages, sections, and features',
                  'Foundation for building your own sites later',
                ].map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 3, color: 'var(--cyan)' }}>
                      <path d="M2 7l4 4 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* 4: prereqs */}
            <div className="ai-prereqs reveal" style={{ padding: '1rem 1.375rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12 }}>
              <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '0.625rem' }}>Before the session</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {[
                  'Active Claude or ChatGPT subscription — you\'ll be using the tools directly',
                  'AI tool installed on your laptop before we start',
                  'GitHub account recommended',
                ].map((r, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--cyan)', flexShrink: 0, marginTop: 1 }}>·</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── PART 4: WHAT AFFECTS PRICE ───────────────── */}
      <section className="section section--surface">
        <div className="container">
          <div className="price-factors-layout">
            <div>
              <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>Scope</p>
              <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '2.5rem' }}>
                What affects<br />the final price?
              </h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.9rem', paddingBottom: '2.5rem' }}>
                {PRICE_FACTORS.map((f, i) => (
                  <li key={i} className="reveal" data-delay={String(i % 3)} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem', fontSize: '1rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cyan)', flexShrink: 0, marginTop: '0.45rem', display: 'block' }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal" style={{ background: 'var(--navy)', borderRadius: 20, padding: '3rem' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '1.5rem' }}>Not sure which setup fits?</p>
              <h3 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.125rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'white', marginBottom: '1.25rem' }}>
                Tell me what you need.<br />I'll keep it simple.
              </h3>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                Send a short brief and I'll recommend the simplest setup for your situation — without pushing unnecessary tools or complexity.
              </p>
              <Link href="/contact" className="btn btn-primary">
                Ask for a recommendation <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────── */}
      <section className="cta-scene" style={{ padding: '8rem 0' }}>
        <div className="cta-content container">
          <p className="eyebrow eyebrow--dark reveal" style={{ marginBottom: '1.5rem' }}>Let&apos;s talk</p>
          <h2 className="reveal" data-delay="1" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 800, color: 'white', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '2rem' }}>
            Ready when you are.
          </h2>
          <div className="reveal" data-delay="2">
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
              Get in touch <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .ai-session-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          column-gap: 5rem;
          row-gap: 2.5rem;
          align-items: start;
        }
        .ai-text    { grid-column: 1; grid-row: 1; }
        .ai-price   { grid-column: 2; grid-row: 1 / 5; align-self: start; }
        .ai-bullets { grid-column: 1; grid-row: 2; }
        .ai-prereqs { grid-column: 1; grid-row: 3; }
        @media (max-width: 768px) {
          .ai-session-grid {
            grid-template-columns: 1fr;
            row-gap: 1.5rem;
          }
          .ai-text    { grid-column: 1; grid-row: 1; }
          .ai-price   { grid-column: 1; grid-row: 2; }
          .ai-bullets { grid-column: 1; grid-row: 3; }
          .ai-prereqs { grid-column: 1; grid-row: 4; }
          .ai-bullets-inner { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
