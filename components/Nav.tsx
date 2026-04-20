'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const closeMenu = () => setOpen(false)

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
            <Link href="/" className={`nav-link${pathname === '/' ? ' active' : ''}`}>Home</Link>
            <div className="nav-item has-dropdown">
              <Link href="/services" className={`nav-link${pathname.startsWith('/services') ? ' active' : ''}`}>
                Services{' '}
                <svg className="inline-block ml-0.5" width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <div className="nav-dropdown">
                <Link href="/services/custom-websites" className="nav-dropdown-link">Custom Websites</Link>
                <Link href="/services/website-redesign" className="nav-dropdown-link">Website Redesign</Link>
                <Link href="/services/wordpress-migration" className="nav-dropdown-link">WordPress Migration</Link>
                <Link href="/services/hosting-maintenance" className="nav-dropdown-link">Hosting &amp; Maintenance</Link>
              </div>
            </div>
            <Link href="/process" className={`nav-link${pathname === '/process' ? ' active' : ''}`}>Process</Link>
            <Link href="/work" className={`nav-link${pathname.startsWith('/work') ? ' active' : ''}`}>Work</Link>
            <Link href="/pricing" className={`nav-link${pathname === '/pricing' ? ' active' : ''}`}>Pricing</Link>
            <Link href="/about" className={`nav-link${pathname === '/about' ? ' active' : ''}`}>About</Link>
          </nav>
          <Link href="/contact" className="nav-cta">Get in touch</Link>
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
        <Link href="/" className="nav-mobile-link" onClick={closeMenu}>Home</Link>
        <Link href="/services" className="nav-mobile-link" onClick={closeMenu}>Services</Link>
        <Link href="/process" className="nav-mobile-link" onClick={closeMenu}>Process</Link>
        <Link href="/work" className="nav-mobile-link" onClick={closeMenu}>Work</Link>
        <Link href="/pricing" className="nav-mobile-link" onClick={closeMenu}>Pricing</Link>
        <Link href="/about" className="nav-mobile-link" onClick={closeMenu}>About</Link>
        <Link href="/faq" className="nav-mobile-link" onClick={closeMenu}>FAQ</Link>
        <Link href="/contact" className="nav-mobile-cta" onClick={closeMenu}>Get in touch →</Link>
      </div>
    </>
  )
}
