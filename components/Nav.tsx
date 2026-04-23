'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/lib/LanguageContext'
import { translations } from '@/lib/translations'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const closeMenu = () => setOpen(false)
  const { lang, setLang } = useLanguage()
  const t = translations[lang].nav

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo" aria-label="Fyxio home">
            <Image src="/fyxio-wordmark-light.svg" alt="Fyxio" width={160} height={30} priority />
          </Link>
          <nav className="nav-links" aria-label="Main navigation">
            <Link href="/" className={`nav-link${pathname === '/' ? ' active' : ''}`}>{t.home}</Link>
            <div className="nav-item has-dropdown">
              <Link href="/services" className={`nav-link${pathname.startsWith('/services') ? ' active' : ''}`}>
                {t.services}{' '}
                <svg className="inline-block ml-0.5" width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <div className="nav-dropdown">
                <Link href="/services/custom-websites" className="nav-dropdown-link">{t.customWebsites}</Link>
                <Link href="/services/website-redesign" className="nav-dropdown-link">{t.websiteRedesign}</Link>
                <Link href="/services/ai-build-sessions" className="nav-dropdown-link">{t.aiBuildSessions}</Link>
                <Link href="/services/ai-workflows" className="nav-dropdown-link">{t.aiWorkflows}</Link>
              </div>
            </div>
            <Link href="/process" className={`nav-link${pathname === '/process' ? ' active' : ''}`}>{t.process}</Link>
            <Link href="/work" className={`nav-link${pathname.startsWith('/work') ? ' active' : ''}`}>{t.work}</Link>
            <Link href="/pricing" className={`nav-link${pathname === '/pricing' ? ' active' : ''}`}>{t.pricing}</Link>
            <Link href="/about" className={`nav-link${pathname === '/about' ? ' active' : ''}`}>{t.about}</Link>
            <Link href="/faq" className={`nav-link${pathname === '/faq' ? ' active' : ''}`}>{t.faq}</Link>
            <Link href="/blog" className={`nav-link${pathname.startsWith('/blog') ? ' active' : ''}`}>{t.blog}</Link>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="lang-toggle" aria-label="Language switcher">
              <button
                onClick={() => setLang('en')}
                className={`lang-btn${lang === 'en' ? ' lang-btn--active' : ''}`}
                aria-pressed={lang === 'en'}
              >
                EN
              </button>
              <span className="lang-sep">/</span>
              <button
                onClick={() => setLang('fi')}
                className={`lang-btn${lang === 'fi' ? ' lang-btn--active' : ''}`}
                aria-pressed={lang === 'fi'}
              >
                FI
              </button>
            </div>
            <Link href="/contact" className="nav-cta">{t.getInTouch}</Link>
          </div>
          <button
            className="nav-hamburger"
            id="hamburger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span style={{ transform: open ? 'rotate(45deg) translate(5px, 5px)' : '' }} />
            <span style={{ opacity: open ? 0 : 1 }} />
            <span style={{ transform: open ? 'rotate(-45deg) translate(5px, -5px)' : '' }} />
          </button>
        </div>
      </header>

      <div className={`nav-mobile${open ? ' open' : ''}`} aria-hidden={!open}>
        <Link href="/" className="nav-mobile-link" onClick={closeMenu}>{t.home}</Link>
        <Link href="/services" className="nav-mobile-link" onClick={closeMenu}>{t.services}</Link>
        <Link href="/process" className="nav-mobile-link" onClick={closeMenu}>{t.process}</Link>
        <Link href="/work" className="nav-mobile-link" onClick={closeMenu}>{t.work}</Link>
        <Link href="/pricing" className="nav-mobile-link" onClick={closeMenu}>{t.pricing}</Link>
        <Link href="/about" className="nav-mobile-link" onClick={closeMenu}>{t.about}</Link>
        <Link href="/faq" className="nav-mobile-link" onClick={closeMenu}>{t.faq}</Link>
        <Link href="/blog" className="nav-mobile-link" onClick={closeMenu}>{t.blog}</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem' }}>
          <button
            onClick={() => { setLang('en'); closeMenu() }}
            className={`lang-btn${lang === 'en' ? ' lang-btn--active' : ''}`}
          >
            EN
          </button>
          <span className="lang-sep">/</span>
          <button
            onClick={() => { setLang('fi'); closeMenu() }}
            className={`lang-btn${lang === 'fi' ? ' lang-btn--active' : ''}`}
          >
            FI
          </button>
        </div>
        <Link href="/contact" className="nav-mobile-cta" onClick={closeMenu}>{t.getInTouch} →</Link>
      </div>

      <style>{`
        .lang-toggle {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .lang-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.3);
          padding: 0.25rem 0.375rem;
          border-radius: 4px;
          transition: color 0.2s;
        }
        .lang-btn:hover {
          color: rgba(255,255,255,0.7);
        }
        .lang-btn--active {
          color: var(--cyan) !important;
        }
        .lang-sep {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.2);
          user-select: none;
        }
      `}</style>
    </>
  )
}
