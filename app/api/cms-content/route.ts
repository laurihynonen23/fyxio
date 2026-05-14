import { NextResponse } from 'next/server'
import { loadPublishedBundle } from '@/content/server'

export const runtime = 'nodejs'

// Used by client-cms to seed the initial draft from fyxio's current content.
export async function GET() {
  const bundle = await loadPublishedBundle()
  return NextResponse.json(bundle, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store',
    },
  })
}
