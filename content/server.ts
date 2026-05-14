import 'server-only'

import { promises as fs } from 'fs'
import path from 'path'
import { cookies } from 'next/headers'
import { list } from '@vercel/blob'
import {
  ACTIVE_PREVIEW_COOKIE,
  CONTENT_ROOT,
  DRAFT_ROOT,
  FYXIO_SITE_CONFIG,
  PAGE_DEFINITIONS,
} from '@/content/config'
import {
  fyxioContentBundleSchema,
  localeSchema,
  pageContentSchema,
  pageKeySchema,
  siteSettingsSchema,
  type FyxioContentBundle,
  type Locale,
  type PageContent,
  type PageKey,
  type SiteSettings,
} from '@/content/schema'

function contentPath(...parts: string[]) {
  return path.join(process.cwd(), CONTENT_ROOT, ...parts)
}

function draftPath(draftId: string) {
  return path.join(process.cwd(), DRAFT_ROOT, 'drafts', `${draftId}.json`)
}

async function readJsonFile(filePath: string) {
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw)
}

async function loadPublishedBundleFromBlob(): Promise<FyxioContentBundle | null> {
  try {
    const cmsUrl = process.env.CMS_CONTENT_URL
    if (cmsUrl) {
      const res = await fetch(`${cmsUrl}/api/content/${FYXIO_SITE_CONFIG.id}`, { cache: 'no-store' })
      if (!res.ok) return null
      return fyxioContentBundleSchema.parse(await res.json())
    }

    const prefix = `${FYXIO_SITE_CONFIG.id}/published/bundle`
    const { blobs } = await list({ prefix })
    if (blobs.length === 0) return null
    const latest = blobs.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )[0]
    const token = process.env.BLOB_READ_WRITE_TOKEN
    const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {}
    const res = await fetch(latest.url, { headers, cache: 'no-store' })
    if (!res.ok) return null
    return fyxioContentBundleSchema.parse(await res.json())
  } catch {
    return null
  }
}

export async function loadPublishedBundle(): Promise<FyxioContentBundle> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blobBundle = await loadPublishedBundleFromBlob()
    if (blobBundle) return blobBundle
  }

  const site = siteSettingsSchema.parse(await readJsonFile(contentPath('site.json')))
  const locales: FyxioContentBundle['locales'] = { en: {}, fi: {} }

  for (const def of PAGE_DEFINITIONS) {
    const content = pageContentSchema.parse(
      await readJsonFile(contentPath(def.locale, def.fileName))
    )
    locales[def.locale][def.key] = content
  }

  return fyxioContentBundleSchema.parse({ site, locales })
}

export async function loadDraftBundle(draftId: string) {
  try {
    // If CMS is on a different account, fetch draft bundle via CMS API
    const cmsUrl = process.env.CMS_CONTENT_URL
    if (cmsUrl) {
      const res = await fetch(`${cmsUrl}/api/cms-draft/${draftId}`, { cache: 'no-store' })
      if (res.ok) return fyxioContentBundleSchema.parse(await res.json())
    }

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const prefix = `cms/drafts/${draftId}`.replace(/\.json$/, '')
      const { blobs } = await list({ prefix })
      if (blobs.length > 0) {
        const latest = blobs.sort(
          (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        )[0]
        const token = process.env.BLOB_READ_WRITE_TOKEN
        const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {}
        const res = await fetch(latest.url, { headers, cache: 'no-store' })
        if (res.ok) {
          const draft = await res.json()
          return fyxioContentBundleSchema.parse(draft.bundle)
        }
      }
    }
    const draft = await readJsonFile(draftPath(draftId))
    return fyxioContentBundleSchema.parse(draft.bundle)
  } catch {
    return null
  }
}

export async function loadActiveBundle(): Promise<FyxioContentBundle> {
  const cookieStore = await cookies()
  const draftId = cookieStore.get(ACTIVE_PREVIEW_COOKIE)?.value
  if (!draftId) return loadPublishedBundle()

  const draftBundle = await loadDraftBundle(draftId)
  if (!draftBundle) return loadPublishedBundle()

  return draftBundle
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const bundle = await loadActiveBundle()
  return bundle.site
}

export async function getPageContent(locale: Locale, key: PageKey): Promise<PageContent> {
  localeSchema.parse(locale)
  pageKeySchema.parse(key)
  const bundle = await loadActiveBundle()
  const page = bundle.locales[locale][key]
  if (!page) throw new Error(`Missing page content for ${locale}:${key}`)
  return page
}
