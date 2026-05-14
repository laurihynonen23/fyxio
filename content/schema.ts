import { z } from 'zod'

export const localeSchema = z.enum(['en', 'fi'])
export type Locale = z.infer<typeof localeSchema>

export const pageKeySchema = z.enum([
  'home', 'about', 'contact', 'faq', 'insights',
  'blog', 'pricing', 'process', 'services', 'work',
])
export type PageKey = z.infer<typeof pageKeySchema>

const sectionBaseSchema = z.object({
  id: z.string(),
  visible: z.boolean().default(true),
})

// ─── Home ────────────────────────────────────────────────────────────────────

const homeHeroSectionSchema = sectionBaseSchema.extend({
  type: z.literal('home-hero'),
  eyebrow: z.string(),
  heroTitle: z.array(z.string()),
  heroBadge: z.string(),
  heroBadgeHighlight: z.string(),
  heroSubtitle: z.string(),
  heroCta1: z.string(),
  heroCta2: z.string(),
  scroll: z.string(),
  marqueeItems: z.array(z.string()),
})

const homeWhySectionSchema = sectionBaseSchema.extend({
  type: z.literal('home-why'),
  eyebrow: z.string(),
  title: z.string(),
  titleHighlight: z.string(),
  body: z.string(),
  stats: z.array(z.object({ id: z.string(), num: z.string(), label: z.string() })),
})

const homeValueSectionSchema = sectionBaseSchema.extend({
  type: z.literal('home-value'),
  eyebrow: z.string(),
  statement: z.array(z.string()),
  statement2: z.string(),
  statement3: z.string(),
})

const homeServicesSectionSchema = sectionBaseSchema.extend({
  type: z.literal('home-services'),
  eyebrow: z.string(),
  title: z.string(),
  title2: z.string(),
  serviceLabel: z.string(),
  learnMore: z.string(),
  items: z.array(z.object({
    id: z.string(),
    num: z.string(),
    title: z.string(),
    desc: z.string(),
    tags: z.array(z.string()),
    img: z.string(),
    href: z.string(),
  })),
})

const homeProcessSectionSchema = sectionBaseSchema.extend({
  type: z.literal('home-process'),
  eyebrow: z.string(),
  title: z.string(),
  title2: z.string(),
  seeFullProcess: z.string(),
  steps: z.array(z.object({ id: z.string(), num: z.string(), title: z.string(), text: z.string() })),
})

const homeWorkSectionSchema = sectionBaseSchema.extend({
  type: z.literal('home-work'),
  eyebrow: z.string(),
  title: z.string(),
  title2: z.string(),
  viewMyWork: z.string(),
  caseStudyTag: z.string(),
  caseStudyTitle: z.string(),
  caseStudyDesc: z.string(),
  visitSite: z.string(),
  builtForBusinesses: z.string(),
  clients: z.array(z.string()),
})

const homeCtaSectionSchema = sectionBaseSchema.extend({
  type: z.literal('home-cta'),
  eyebrow: z.string(),
  ctaTitle: z.array(z.string()),
  ctaSub: z.string(),
  startConversation: z.string(),
  replyNote: z.string(),
})

// ─── About ───────────────────────────────────────────────────────────────────

const aboutHeroSectionSchema = sectionBaseSchema.extend({
  type: z.literal('about-hero'),
  eyebrow: z.string(),
  heroTitle: z.array(z.string()),
  heroSubtitle: z.string(),
  heroStats: z.array(z.object({ id: z.string(), stat: z.string(), label: z.string() })),
  linkedIn: z.string(),
  manifestoQuotes: z.array(z.object({ id: z.string(), num: z.string(), text: z.string() })),
})

const aboutBioSectionSchema = sectionBaseSchema.extend({
  type: z.literal('about-bio'),
  whoIAmEyebrow: z.string(),
  hiName: z.string(),
  bio1: z.string(),
  bio2: z.string(),
  bio3: z.string(),
  startConversation: z.string(),
})

const aboutCredentialsSectionSchema = sectionBaseSchema.extend({
  type: z.literal('about-credentials'),
  relevantBackgroundEyebrow: z.string(),
  relevantBackgroundTitle: z.string(),
  credentials: z.array(z.object({ id: z.string(), label: z.string(), title: z.string(), body: z.string() })),
})

const aboutPrinciplesSectionSchema = sectionBaseSchema.extend({
  type: z.literal('about-principles'),
  whyStartedEyebrow: z.string(),
  whyStartedTitle: z.string(),
  whyStarted1: z.string(),
  whyStarted2: z.string(),
  whyStarted3: z.string(),
  principles: z.array(z.object({ id: z.string(), title: z.string(), body: z.string() })),
})

const aboutCtaSectionSchema = sectionBaseSchema.extend({
  type: z.literal('about-cta'),
  workTogetherEyebrow: z.string(),
  ctaTitle: z.string(),
  ctaTitleHighlight: z.string(),
  getInTouch: z.string(),
})

// ─── Contact ─────────────────────────────────────────────────────────────────

const contactHeroSectionSchema = sectionBaseSchema.extend({
  type: z.literal('contact-hero'),
  eyebrow: z.string(),
  heroTitle: z.array(z.string()),
  heroSubtitle: z.string(),
  twoWaysTitle: z.string(),
  optionALabel: z.string(),
  optionATitle: z.string(),
  optionADesc: z.string(),
  optionBLabel: z.string(),
  optionBTitle: z.string(),
  optionBDesc: z.string(),
  replyTime: z.string(),
  demoRequestTitle: z.string(),
  demoRequestBody: z.string(),
  tabQuestion: z.string(),
  tabDemo: z.string(),
  labelName: z.string(),
  labelCompany: z.string(),
  labelEmail: z.string(),
  labelSite: z.string(),
  labelFiles: z.string(),
  optional: z.string(),
  optionalMaxFile: z.string(),
  dropFiles: z.string(),
  dropFilesHint: z.string(),
  labelMessageDemo: z.string(),
  labelMessageQuestion: z.string(),
  placeholderDemo: z.string(),
  placeholderQuestion: z.string(),
  requiredFields: z.string(),
  sending: z.string(),
  sendDemo: z.string(),
  sendInquiry: z.string(),
  successTitle: z.string(),
  successBody: z.string(),
  errorMsg: z.string(),
})

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const faqHeroSectionSchema = sectionBaseSchema.extend({
  type: z.literal('faq-hero'),
  eyebrow: z.string(),
  heroTitle: z.array(z.string()),
  heroSub: z.string(),
  stillHaveQuestion: z.string(),
  sendDirectly: z.string(),
})

const faqItemsSectionSchema = sectionBaseSchema.extend({
  type: z.literal('faq-items'),
  groups: z.array(z.object({
    id: z.string(),
    group: z.string(),
    items: z.array(z.object({ id: z.string(), q: z.string(), a: z.string() })),
  })),
})

// ─── Insights ────────────────────────────────────────────────────────────────

const insightsHeroSectionSchema = sectionBaseSchema.extend({
  type: z.literal('insights-hero'),
  eyebrow: z.string(),
  heroTitle: z.array(z.string()),
  heroSub: z.string(),
  readArticle: z.string(),
})

const insightsArticlesSectionSchema = sectionBaseSchema.extend({
  type: z.literal('insights-articles'),
  articles: z.array(z.object({
    id: z.string(),
    tag: z.string(),
    title: z.string(),
    excerpt: z.string(),
    slug: z.string(),
  })),
})

// ─── Blog ────────────────────────────────────────────────────────────────────

const blogHeroSectionSchema = sectionBaseSchema.extend({
  type: z.literal('blog-hero'),
  eyebrow: z.string(),
  heroTitle: z.array(z.string()),
  heroSub: z.string(),
  comingSoon: z.string(),
})

const blogArticlesSectionSchema = sectionBaseSchema.extend({
  type: z.literal('blog-articles'),
  articles: z.array(z.object({
    id: z.string(),
    slug: z.string(),
    category: z.string(),
    title: z.string(),
    desc: z.string(),
    readTime: z.string(),
  })),
})

// ─── Pricing ─────────────────────────────────────────────────────────────────

const pricingHeroSectionSchema = sectionBaseSchema.extend({
  type: z.literal('pricing-hero'),
  eyebrow: z.string(),
  heroTitle: z.array(z.string()),
  heroSubNote: z.string(),
})

const pricingPackagesSectionSchema = sectionBaseSchema.extend({
  type: z.literal('pricing-packages'),
  packagesEyebrow: z.string(),
  packagesTitle: z.string(),
  packagesNote: z.string(),
  startWith: z.string(),
  bestFor: z.string(),
  mostPopular: z.string(),
  packages: z.array(z.object({
    id: z.string(),
    tier: z.string(),
    price: z.string(),
    subtitle: z.string(),
    note: z.string(),
    featured: z.boolean(),
    badge: z.string().optional(),
    desc: z.string(),
    features: z.array(z.string()),
  })),
})

const pricingLaunchSectionSchema = sectionBaseSchema.extend({
  type: z.literal('pricing-launch'),
  launchEyebrow: z.string(),
  launchTitle: z.string(),
  launchBody: z.string(),
  domainNote: z.string(),
  domainNoteSub: z.string(),
  options: z.array(z.object({
    id: z.string(),
    title: z.string(),
    bestFor: z.string(),
    desc: z.string(),
    price: z.string(),
    oldPrice: z.string().optional(),
    features: z.array(z.string()),
    note: z.string(),
  })),
})

const pricingOngoingSectionSchema = sectionBaseSchema.extend({
  type: z.literal('pricing-ongoing'),
  ongoingEyebrow: z.string(),
  ongoingTitle: z.string(),
  hourlyLabel: z.string(),
  hourlyDesc: z.string(),
  hourlyPrice: z.string(),
  aiSessionNew: z.string(),
  aiSessionAvailable: z.string(),
  aiSessionTitle: z.string(),
  aiSessionTitleHighlight: z.string(),
  aiSessionBody: z.string(),
  aiSessionOneTime: z.string(),
  aiSessionPrice: z.string(),
  aiSessionNote: z.string(),
  aiSessionBook: z.string(),
  aiSessionRemote: z.string(),
  aiSessionFeatures: z.array(z.string()),
  aiSessionPrereqLabel: z.string(),
  aiSessionPrereqs: z.array(z.string()),
  ongoing: z.array(z.object({
    id: z.string(),
    label: z.string(),
    title: z.string(),
    price: z.string(),
    body: z.string(),
    features: z.array(z.string()),
  })),
})

const pricingFactorsSectionSchema = sectionBaseSchema.extend({
  type: z.literal('pricing-factors'),
  scopeEyebrow: z.string(),
  scopeTitle: z.string(),
  scopeNotSureLabel: z.string(),
  scopeNotSureTitle: z.string(),
  scopeNotSureBody: z.string(),
  scopeAskRec: z.string(),
  factors: z.array(z.string()),
})

const pricingCtaSectionSchema = sectionBaseSchema.extend({
  type: z.literal('pricing-cta'),
  ctaEyebrow: z.string(),
  ctaTitle: z.string(),
  getInTouch: z.string(),
})

// ─── Process ─────────────────────────────────────────────────────────────────

const processHeroSectionSchema = sectionBaseSchema.extend({
  type: z.literal('process-hero'),
  eyebrow: z.string(),
  heroTitle: z.array(z.string()),
  heroSub: z.string(),
})

const processStepsSectionSchema = sectionBaseSchema.extend({
  type: z.literal('process-steps'),
  step: z.string(),
  steps: z.array(z.object({
    id: z.string(),
    num: z.string(),
    title: z.string(),
    duration: z.string(),
    body: z.string(),
  })),
})

const processTotalSectionSchema = sectionBaseSchema.extend({
  type: z.literal('process-total'),
  totalEyebrow: z.string(),
  totalTitle: z.string(),
  totalTitleHighlight: z.string(),
  totalBody: z.string(),
  ctaEyebrow: z.string(),
  ctaTitle: z.string(),
  ctaBtn: z.string(),
})

// ─── Services ────────────────────────────────────────────────────────────────

const servicesHeroSectionSchema = sectionBaseSchema.extend({
  type: z.literal('services-hero'),
  eyebrow: z.string(),
  heroTitle: z.array(z.string()),
  heroSub: z.string(),
})

const servicesWebsiteSectionSchema = sectionBaseSchema.extend({
  type: z.literal('services-website'),
  websiteEyebrow: z.string(),
  websiteTitle: z.string(),
  websiteSub: z.string(),
  learnMore: z.string(),
})

const servicesAiSectionSchema = sectionBaseSchema.extend({
  type: z.literal('services-ai'),
  aiEyebrow: z.string(),
  aiTitle: z.string(),
  aiSub: z.string(),
})

const servicesCtaSectionSchema = sectionBaseSchema.extend({
  type: z.literal('services-cta'),
  ctaEyebrow: z.string(),
  ctaTitle: z.string(),
  ctaBtn: z.string(),
})

// ─── Work ────────────────────────────────────────────────────────────────────

const workHeroSectionSchema = sectionBaseSchema.extend({
  type: z.literal('work-hero'),
  selectedWork: z.string(),
  heroTitle: z.array(z.string()),
  heroSub: z.string(),
  stats: z.array(z.object({ id: z.string(), num: z.string(), label: z.string() })),
})

const workProjectsSectionSchema = sectionBaseSchema.extend({
  type: z.literal('work-projects'),
  customWebsite: z.string(),
  websiteRebuild: z.string(),
  athlosDesc: z.string(),
  valuatumDesc: z.string(),
  visitAthlos: z.string(),
  viewProject: z.string(),
  comingSoon: z.string(),
  moreProjectsSoon: z.string(),
})

const workFocusSectionSchema = sectionBaseSchema.extend({
  type: z.literal('work-focus'),
  focusEyebrow: z.string(),
  focusTitle: z.string(),
  items: z.array(z.object({ id: z.string(), title: z.string(), body: z.string() })),
})

const workCtaSectionSchema = sectionBaseSchema.extend({
  type: z.literal('work-cta'),
  ctaEyebrow: z.string(),
  ctaTitle: z.string(),
  ctaTitleHighlight: z.string(),
  startProject: z.string(),
})

// ─── Discriminated union ──────────────────────────────────────────────────────

export const pageSectionSchema = z.discriminatedUnion('type', [
  homeHeroSectionSchema,
  homeWhySectionSchema,
  homeValueSectionSchema,
  homeServicesSectionSchema,
  homeProcessSectionSchema,
  homeWorkSectionSchema,
  homeCtaSectionSchema,
  aboutHeroSectionSchema,
  aboutBioSectionSchema,
  aboutCredentialsSectionSchema,
  aboutPrinciplesSectionSchema,
  aboutCtaSectionSchema,
  contactHeroSectionSchema,
  faqHeroSectionSchema,
  faqItemsSectionSchema,
  insightsHeroSectionSchema,
  insightsArticlesSectionSchema,
  blogHeroSectionSchema,
  blogArticlesSectionSchema,
  pricingHeroSectionSchema,
  pricingPackagesSectionSchema,
  pricingLaunchSectionSchema,
  pricingOngoingSectionSchema,
  pricingFactorsSectionSchema,
  pricingCtaSectionSchema,
  processHeroSectionSchema,
  processStepsSectionSchema,
  processTotalSectionSchema,
  servicesHeroSectionSchema,
  servicesWebsiteSectionSchema,
  servicesAiSectionSchema,
  servicesCtaSectionSchema,
  workHeroSectionSchema,
  workProjectsSectionSchema,
  workFocusSectionSchema,
  workCtaSectionSchema,
])
export type PageSection = z.infer<typeof pageSectionSchema>

export const pageContentSchema = z.object({
  key: pageKeySchema,
  locale: localeSchema,
  route: z.string(),
  metadata: z.object({ title: z.string(), description: z.string() }),
  sections: z.array(pageSectionSchema),
})
export type PageContent = z.infer<typeof pageContentSchema>

export const siteSettingsSchema = z.object({
  siteId: z.literal('fyxio'),
  name: z.string(),
  defaultLocale: localeSchema,
  editor: z.object({
    supportedLocales: z.array(localeSchema),
    supportedPageKeys: z.array(pageKeySchema),
    supportedSectionTypes: z.array(z.string()),
  }),
})
export type SiteSettings = z.infer<typeof siteSettingsSchema>

const pageCollectionSchema = z.object({
  home: pageContentSchema.optional(),
  about: pageContentSchema.optional(),
  contact: pageContentSchema.optional(),
  faq: pageContentSchema.optional(),
  insights: pageContentSchema.optional(),
  blog: pageContentSchema.optional(),
  pricing: pageContentSchema.optional(),
  process: pageContentSchema.optional(),
  services: pageContentSchema.optional(),
  work: pageContentSchema.optional(),
})

export const fyxioContentBundleSchema = z.object({
  site: siteSettingsSchema,
  locales: z.object({
    en: pageCollectionSchema,
    fi: pageCollectionSchema,
  }),
})
export type FyxioContentBundle = z.infer<typeof fyxioContentBundleSchema>
