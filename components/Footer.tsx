import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Image src="/fyxio-wordmark-light.svg" alt="Fyxio" width={160} height={30} className="footer-logo" />
            <p className="footer-tagline">Premium business websites,<br />built fast.</p>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            <div className="footer-col">
              <span className="footer-col-label">Services</span>
              <Link href="/services/custom-websites" className="footer-link">Custom Websites</Link>
              <Link href="/services/website-redesign" className="footer-link">Website Redesign</Link>
              <Link href="/services/wordpress-migration" className="footer-link">WordPress Migration</Link>
              <Link href="/services/hosting-maintenance" className="footer-link">Hosting &amp; Maintenance</Link>
            </div>
            <div className="footer-col">
              <span className="footer-col-label">Company</span>
              <Link href="/process" className="footer-link">Process</Link>
              <Link href="/work" className="footer-link">Work</Link>
              <Link href="/pricing" className="footer-link">Pricing</Link>
              <Link href="/about" className="footer-link">About</Link>
            </div>
            <div className="footer-col">
              <span className="footer-col-label">Insights</span>
              <Link href="/insights" className="footer-link">All Articles</Link>
              <Link href="/insights/wordpress-vs-modern-website" className="footer-link">WordPress vs Modern</Link>
              <Link href="/insights/how-much-does-a-business-website-cost" className="footer-link">Website Pricing Guide</Link>
            </div>
            <div className="footer-col">
              <span className="footer-col-label">Get in touch</span>
              <Link href="/contact" className="footer-link">Start a project</Link>
              <a href="mailto:lauri.hynonen@gmail.com" className="footer-link">lauri.hynonen@gmail.com</a>
            </div>
          </nav>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2025 Fyxio. All rights reserved.</p>
          <nav className="footer-legal">
            <Link href="#">Privacy Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
