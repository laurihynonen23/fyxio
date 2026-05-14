import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')
  if (!url) return new NextResponse('Missing url', { status: 400 })

  // Only allow fetching from our own private blob store
  if (!url.startsWith('https://tbnbqwacifg7deud.private.blob.vercel-storage.com/')) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
  })

  if (!res.ok) return new NextResponse('Not found', { status: 404 })

  const contentType = res.headers.get('content-type') ?? 'application/octet-stream'
  const contentDisposition = res.headers.get('content-disposition') ?? ''

  return new NextResponse(res.body, {
    headers: {
      'Content-Type': contentType,
      ...(contentDisposition ? { 'Content-Disposition': contentDisposition } : {}),
      'Cache-Control': 'private, max-age=3600',
    },
  })
}
