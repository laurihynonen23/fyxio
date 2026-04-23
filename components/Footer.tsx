'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageContext'
import { translations } from '@/lib/translations'

export default function Footer() {
  const { lang } = useLanguage()
  const t = translations[lang].footer

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Image src="/fyxio-wordmark-light.svg" alt="Fyxio" width={160} height={30} className="footer-logo" />
            <p className="footer-tagline">{t.tagline.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}</p>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            <div className="footer-col">
              <span className="footer-col-label">{t.services}</span>
              <Link href="/services/custom-websites" className="footer-link">{t.customWebsites}</Link>
              <Link href="/services/website-redesign" className="footer-link">{t.websiteRedesign}</Link>
              <Link href="/services/ai-build-sessions" className="footer-link">{t.aiBuildSessions}</Link>
              <Link href="/services/ai-workflows" className="footer-link">{t.aiWorkflows}</Link>
            </div>
            <div className="footer-col">
              <span className="footer-col-label">{t.company}</span>
              <Link href="/process" className="footer-link">{t.process}</Link>
              <Link href="/work" className="footer-link">{t.work}</Link>
              <Link href="/pricing" className="footer-link">{t.pricing}</Link>
              <Link href="/about" className="footer-link">{t.about}</Link>
            </div>
            <div className="footer-col">
              <span className="footer-col-label">{t.insights}</span>
              <Link href="/insights" className="footer-link">{t.allArticles}</Link>
              <Link href="/insights/wordpress-vs-modern-website" className="footer-link">{t.insightLink1}</Link>
              <Link href="/insights/how-much-does-a-business-website-cost" className="footer-link">{t.insightLink2}</Link>
            </div>
            <div className="footer-col">
              <span className="footer-col-label">{t.getInTouch}</span>
              <Link href="/contact" className="footer-link">{t.startProject}</Link>
              <a href="mailto:lauri.hynonen@gmail.com" className="footer-link">lauri.hynonen@gmail.com</a>
              <a href="https://www.linkedin.com/in/lauri-hyn%C3%B6nen-18372b22b" target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
            </div>
          </nav>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">{t.copyright}</p>
          <nav className="footer-legal">
            <Link href="#">{t.privacyPolicy}</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
