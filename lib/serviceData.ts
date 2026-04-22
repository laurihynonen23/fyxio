export type ServiceData = {
  slug: string
  num: string
  title: string
  shortTitle: string
  tagline: string
  heroDesc: string
  heroImg: string
  group: 'website' | 'ai'
  bestFor?: string[]
  canCover?: string[]
  included: { title: string; desc: string }[]
  features: { eyebrow: string; title: string; body: string; img: string }[]
  cta: { title: string; sub: string }
}

export const SERVICES: ServiceData[] = [
  {
    slug: 'custom-websites',
    num: '01',
    title: 'Custom website builds',
    shortTitle: 'Custom Websites',
    tagline: 'Built for the quality of your business, not the budget of a template.',
    heroDesc: 'For businesses that want a modern website built from scratch — not a template with a logo swap. Every page, section, and interaction is designed around your business, your offer, and the way you want to be seen.',
    heroImg: '/hero-main.png',
    group: 'website',
    bestFor: [
      'New websites',
      'Business websites',
      'Landing pages',
      'Service pages',
      'Fast launches',
      'Companies that want a premium look without a huge agency process',
    ],
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
        body: 'Custom websites are built with modern tooling — no bloated CMS, no plugin dependency chains. What you get is fast, maintainable, and genuinely yours. No "you need to pay the plugin developer" conversations down the line.',
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
    title: 'Full website redesigns',
    shortTitle: 'Website Redesign',
    tagline: 'For when the site you have no longer reflects the business you\'ve built.',
    heroDesc: 'For companies with a website that already exists, but no longer feels good enough. A redesign is a chance to rethink the structure, messaging, flow, visuals, and editing setup — then rebuild the site into something that feels current and actually supports the business.',
    heroImg: '/redesign-hero.png',
    group: 'website',
    bestFor: [
      'Outdated websites',
      'Unclear service pages',
      'Weak first impressions',
      'Slow or messy current setups',
      'Companies that have grown past their old site',
    ],
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
    slug: 'ai-build-sessions',
    num: '03',
    title: 'AI Build Sessions',
    shortTitle: 'AI Build Sessions',
    tagline: 'Learn to build and change things with AI — on a real project, in a focused session.',
    heroDesc: 'For people who want to learn how to use Claude Code, Codex, and AI tools to build and change things themselves. I set up the right tools with you, show you how to control them properly, and teach you how to make real changes to websites, pages, automations, or internal tools.',
    heroImg: '/ai-build-session-setup.png',
    group: 'ai',
    canCover: [
      'Claude Code or Codex setup',
      'GitHub basics for AI-assisted building',
      'How to edit or expand your own website',
      'How to add new pages, sections, and features',
      'How to manage context properly',
      'How to write better prompts for real work',
      'How to use design tools and AI design features',
      'How to create branded presentations with AI',
      'How to automate repetitive business tasks',
      'How to build simple internal tools',
    ],
    included: [
      { title: 'Tool setup', desc: 'Claude Code or Codex configured in your actual project before we start building.' },
      { title: 'Live walkthrough', desc: 'You follow along and build. Not a lecture — a working session.' },
      { title: 'Real project', desc: 'We work on something you actually need, not a toy example.' },
      { title: 'Prompt guidance', desc: 'How to give AI better context so the output is actually useful.' },
      { title: 'GitHub basics', desc: 'Safe version control so you can experiment without breaking things.' },
      { title: 'Follow-up notes', desc: 'Clear instructions so you can continue on your own after the session.' },
    ],
    features: [
      {
        eyebrow: 'What this is',
        title: 'Not a generic AI course. A practical build session.',
        body: 'We set up the tools, choose a real task, and work through it together. By the end, you understand how to give AI better context, guide the output, review changes, and keep control of the work — on your own terms.',
        img: '/work-laptop-design.jpg',
      },
      {
        eyebrow: 'Before the session',
        title: 'A few things to have ready.',
        body: 'You need an active Claude or ChatGPT subscription — you\'ll be using the tools directly. Ideally installed on your laptop before we start. A GitHub account is also recommended for coding sessions. Bring a real project or workflow you want to work on.',
        img: '/ai-build-session-setup.png',
      },
    ],
    cta: {
      title: 'Ready to learn how to actually use AI?',
      sub: 'Book a session. Bring a real project. We\'ll get it moving.',
    },
  },
  {
    slug: 'ai-workflows',
    num: '04',
    title: 'Custom AI workflows',
    shortTitle: 'AI Workflows',
    tagline: 'Practical AI-assisted systems built around real business tasks.',
    heroDesc: 'For businesses that want to use AI for more than chat. I help identify manual, repetitive, or high-value workflows and build practical AI-assisted solutions around them — internal tools, content systems, automation flows, document workflows, or custom AI-assisted processes.',
    heroImg: '/ai-workflows-hero.png',
    group: 'ai',
    bestFor: [
      'Repetitive admin work',
      'Content creation workflows',
      'Internal tools',
      'AI-assisted document or slide creation',
      'Business process automation',
      'Teams that want to understand what AI can actually do for them',
    ],
    included: [
      { title: 'Workflow mapping', desc: 'Map the current process and identify where AI actually helps.' },
      { title: 'Practical build', desc: 'A focused solution built around real inputs and real outputs.' },
      { title: 'Live testing', desc: 'Tested with actual data before handover.' },
      { title: 'Prompt system', desc: 'Custom prompts and context setup that produces consistent results.' },
      { title: 'Team handover', desc: 'Clear instructions so your team can use and maintain the workflow.' },
      { title: 'Scoped upfront', desc: 'Scope defined before any work starts — no surprises.' },
    ],
    features: [
      {
        eyebrow: 'The goal',
        title: 'Not AI for the sake of it. AI that saves real time.',
        body: 'Most businesses have workflows that are slower than they need to be — content approval chains, repetitive document work, manual formatting tasks, slow internal processes. AI does not fix everything, but it fixes a lot. The goal is to find where it actually helps and build something practical around that.',
        img: '/ai-workflows-hero.png',
      },
      {
        eyebrow: 'Examples',
        title: 'From content systems to internal tools.',
        body: 'AI-assisted content workflows, branded presentation generation, document summarisation and restructuring, internal tools, website content systems, customer support drafting, repetitive admin workflows, data or file processing — if there is a repeatable process that takes too long, it is worth looking at.',
        img: '/work-laptop-ecommerce.jpg',
      },
    ],
    cta: {
      title: 'Want to see what AI can do for your business?',
      sub: 'Tell me about a workflow that is taking too long. We\'ll look at what is possible.',
    },
  },
]

export function getService(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
