export type ServiceData = {
  slug: string
  num: string
  title: string
  shortTitle: string
  tagline: string
  heroDesc: string
  heroImg: string
  included: { title: string; desc: string }[]
  features: { eyebrow: string; title: string; body: string; img: string }[]
  cta: { title: string; sub: string }
}

export const SERVICES: ServiceData[] = [
  {
    slug: 'custom-websites',
    num: '01',
    title: 'Custom business websites',
    shortTitle: 'Custom Websites',
    tagline: 'Built for the quality of your business, not the budget of a template.',
    heroDesc: 'For companies that want a website that actually feels like them — not a theme with a logo swap. Every layout, section, and interaction is designed from scratch, for you.',
    heroImg: '/work-imac-design.jpg',
    included: [
      { title: 'Brand-aligned design', desc: 'Visual system built around your brand identity, not a generic template.' },
      { title: 'Page architecture', desc: 'Structure planned around how visitors actually read and make decisions.' },
      { title: 'Copywriting support', desc: 'Sharp, clear copy that positions the business correctly from the first word.' },
      { title: 'Mobile-first build', desc: 'Designed for every screen size with the same level of care.' },
      { title: 'Performance optimised', desc: 'Fast loading, clean code, no unnecessary bloat or dependencies.' },
      { title: 'Full handover', desc: 'You own the code, the domain, the hosting. No lock-in.' },
    ],
    features: [
      {
        eyebrow: 'Design philosophy',
        title: 'Looks expensive because it is designed well.',
        body: 'The gap between a template site and a custom site is not just aesthetic — it is strategic. Visual hierarchy, spacing, typography choices, and composition all signal quality. We make those decisions deliberately, not by default.',
        img: '/work-imac-startup.jpg',
      },
      {
        eyebrow: 'The build',
        title: 'Clean code. No plugins. Nothing you didn\'t ask for.',
        body: 'Custom websites are built with HTML, CSS, and JavaScript — no bloated CMS, no plugin dependency chains. What you get is fast, maintainable, and genuinely yours. No "you need to pay the plugin developer" conversations down the line.',
        img: '/work-laptop-design.jpg',
      },
    ],
    cta: {
      title: 'Ready for a site that earns attention?',
      sub: 'Tell me about your business and what you need. I\'ll tell you what makes sense.',
    },
  },
  {
    slug: 'website-redesign',
    num: '02',
    title: 'Website redesigns',
    shortTitle: 'Website Redesign',
    tagline: 'For when the site you have no longer reflects the business you\'ve built.',
    heroDesc: 'The site is there. But it feels outdated, slow, or unclear. A redesign is not just about new colours — it\'s about rethinking what the site needs to do and building something that actually does it.',
    heroImg: '/work-laptop-ecommerce.jpg',
    included: [
      { title: 'Current site audit', desc: 'Honest assessment of what is working, what is not, and what to keep.' },
      { title: 'Restructured architecture', desc: 'New page structure based on what visitors actually need to see.' },
      { title: 'Visual refresh', desc: 'Updated typography, spacing, colour, and photography direction.' },
      { title: 'Improved messaging', desc: 'Clearer positioning, sharper copy, better hierarchy.' },
      { title: 'Mobile overhaul', desc: 'Full responsive rebuild — not just a scaled-down version of desktop.' },
      { title: 'Smooth transition', desc: 'No downtime, no broken links, no panicked domain transfers.' },
    ],
    features: [
      {
        eyebrow: 'Where to start',
        title: 'A good redesign begins with an honest audit.',
        body: 'Before any design decisions, I review your current site and identify what is causing friction — unclear messaging, slow performance, weak visual hierarchy, poor structure. The redesign is built around fixing those specific problems.',
        img: '/work-imac-design.jpg',
      },
      {
        eyebrow: 'The result',
        title: 'Same URL. Completely different impression.',
        body: 'Visitors who knew your old site will notice. Visitors who are new will just think this is a company that takes itself seriously. Either way, the first three seconds will now work in your favour.',
        img: '/work-laptop-desk.jpg',
      },
    ],
    cta: {
      title: 'Tired of apologising for your website?',
      sub: 'Send me the current URL and tell me what is bothering you most. We\'ll figure out the rest.',
    },
  },
  {
    slug: 'wordpress-migration',
    num: '03',
    title: 'WordPress to modern stack migration',
    shortTitle: 'WordPress Migration',
    tagline: 'Escape the maintenance treadmill without losing your domain or your traffic.',
    heroDesc: 'WordPress was the right choice once. For a lot of businesses, it no longer is. Constant plugin updates, slow load times, security patches, and a bloated backend that nobody actually uses — there is a cleaner way.',
    heroImg: '/work-laptop-design.jpg',
    included: [
      { title: 'Content migration', desc: 'All pages, posts, and assets migrated cleanly. Nothing lost in the move.' },
      { title: 'Redirect mapping', desc: 'Every URL that matters is mapped and redirected correctly.' },
      { title: 'DNS & domain handling', desc: 'Domain transfer and DNS changes handled with zero downtime.' },
      { title: 'SEO continuity', desc: 'Existing rankings are protected through proper redirect and meta handling.' },
      { title: 'Faster performance', desc: 'No PHP, no plugin overhead. The new site loads significantly faster.' },
      { title: 'Simpler management', desc: 'Easier to update, cheaper to host, and nothing to patch every Monday.' },
    ],
    features: [
      {
        eyebrow: 'Why migrate',
        title: 'WordPress is maintenance, not just a website.',
        body: 'Plugin updates that break things. Security vulnerabilities. Slow load times from bloated themes. Database overhead for a five-page brochure site. For most business websites, WordPress is more complexity than the use case demands.',
        img: '/work-laptop-ecommerce.jpg',
      },
      {
        eyebrow: 'The process',
        title: 'The domain stays. The headaches don\'t.',
        body: 'We build the new site in parallel, migrate all content, map redirects, and cut over the domain when everything is verified and ready. Visitors and search engines see a smooth transition. You see a much simpler website to manage.',
        img: '/work-imac-startup.jpg',
      },
    ],
    cta: {
      title: 'Done with the WordPress treadmill?',
      sub: 'Send me your current site. I\'ll tell you what the migration looks like and what you\'ll gain from it.',
    },
  },
  {
    slug: 'hosting-maintenance',
    num: '04',
    title: 'Hosting, launch & maintenance',
    shortTitle: 'Hosting & Maintenance',
    tagline: 'The website is only finished when it is live, documented, and working properly.',
    heroDesc: 'A lot of website projects stumble at the end — wrong DNS settings, broken redirects, unclear ownership, no plan for updates. The launch is the part that most agencies rush. We do not.',
    heroImg: '/work-laptop-desk.jpg',
    included: [
      { title: 'Hosting setup', desc: 'Fast, reliable hosting configured for your specific setup.' },
      { title: 'Domain & DNS', desc: 'Domain transfer or DNS configuration handled end to end.' },
      { title: 'SSL & security', desc: 'HTTPS configured correctly from day one, no warnings, no gaps.' },
      { title: 'Redirect setup', desc: 'Old URLs mapped and redirected so nothing breaks after go-live.' },
      { title: 'Pre-launch checklist', desc: 'Every page, form, link, and load speed verified before launch.' },
      { title: 'Ownership documentation', desc: 'Clear record of where everything lives and how to manage it.' },
    ],
    features: [
      {
        eyebrow: 'At launch',
        title: 'No last-minute DNS panic. Just a clean handover.',
        body: 'DNS changes, SSL certificates, redirect rules, form integrations, analytics — all configured, verified, and documented before the site goes live. The launch is planned, not improvised.',
        img: '/work-laptop-outdoor.jpg',
      },
      {
        eyebrow: 'After launch',
        title: 'You decide how much involvement you want.',
        body: 'Some clients want full handover and to manage everything themselves. Others want managed updates handled on an ongoing basis. Either works. What matters is that you always know what you own and where it lives.',
        img: '/work-imac-design.jpg',
      },
    ],
    cta: {
      title: 'Want a launch that actually goes smoothly?',
      sub: 'Tell me about your current setup and where you are in the process. I\'ll tell you what is needed.',
    },
  },
]

export function getService(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
