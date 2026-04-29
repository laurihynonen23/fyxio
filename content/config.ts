import type { Locale, PageKey } from '@/content/schema'

export const CONTENT_ROOT = 'content'
export const DRAFT_ROOT = '.editor-data'
export const ACTIVE_PREVIEW_COOKIE = 'cms_editor_preview_draft'
export const EDITOR_SESSION_COOKIE = 'fyxio_editor_session'

export const PAGE_DEFINITIONS: Array<{
  key: PageKey
  locale: Locale
  label: string
  route: string
  fileName: string
}> = [
  { key: 'home',     locale: 'en', label: 'Home',     route: '/',        fileName: 'home.json' },
  { key: 'about',    locale: 'en', label: 'About',    route: '/about',   fileName: 'about.json' },
  { key: 'contact',  locale: 'en', label: 'Contact',  route: '/contact', fileName: 'contact.json' },
  { key: 'faq',      locale: 'en', label: 'FAQ',      route: '/faq',     fileName: 'faq.json' },
  { key: 'insights', locale: 'en', label: 'Insights', route: '/insights',fileName: 'insights.json' },
  { key: 'blog',     locale: 'en', label: 'Blog',     route: '/blog',    fileName: 'blog.json' },
  { key: 'pricing',  locale: 'en', label: 'Pricing',  route: '/pricing', fileName: 'pricing.json' },
  { key: 'process',  locale: 'en', label: 'Process',  route: '/process', fileName: 'process.json' },
  { key: 'services', locale: 'en', label: 'Services', route: '/services',fileName: 'services.json' },
  { key: 'work',     locale: 'en', label: 'Work',     route: '/work',    fileName: 'work.json' },
]

export const FYXIO_SITE_CONFIG = {
  id: 'fyxio',
  name: 'Fyxio',
  previewUrl: process.env.NEXT_PUBLIC_EDITOR_PREVIEW_URL || 'http://localhost:3000',
  productionUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  deployHookUrl: process.env.FYXIO_DEPLOY_HOOK_URL || '',
  repoPath: process.cwd(),
  supportedSectionTypes: [
    'home-hero', 'home-why', 'home-value', 'home-services', 'home-process', 'home-work', 'home-cta',
    'about-hero', 'about-bio', 'about-credentials', 'about-principles', 'about-cta',
    'contact-hero',
    'faq-hero', 'faq-items',
    'insights-hero', 'insights-articles',
    'blog-hero', 'blog-articles',
    'pricing-hero', 'pricing-packages', 'pricing-launch', 'pricing-ongoing', 'pricing-factors', 'pricing-cta',
    'process-hero', 'process-steps', 'process-total',
    'services-hero', 'services-website', 'services-ai', 'services-cta',
    'work-hero', 'work-projects', 'work-focus', 'work-cta',
  ],
} as const
