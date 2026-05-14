import { NextResponse } from 'next/server'
import { ACTIVE_PREVIEW_COOKIE } from '@/content/config'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const draftId = url.searchParams.get('draftId') ?? ''
  const redirectParam = url.searchParams.get('redirect') ?? '/'

  const safePath = redirectParam.startsWith('/') && !redirectParam.startsWith('//') ? redirectParam : '/'

  const response = NextResponse.redirect(new URL(safePath, request.url))
  if (draftId) {
    // SameSite=None required for cookie to be sent inside cross-site iframe (editor preview)
    response.cookies.set(ACTIVE_PREVIEW_COOKIE, draftId, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      path: '/',
    })
  } else {
    response.cookies.delete(ACTIVE_PREVIEW_COOKIE)
  }
  return response
}
