import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

const TO_EMAIL = 'lauri.hynonen@gmail.com'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await req.json()

    // Honeypot
    if (body.website) return NextResponse.json({ ok: true })

    const name = body.name as string
    const email = body.email as string
    const company = (body.company as string) || ''
    const currentSite = (body.current_site as string) || ''
    const inquiryType = (body.inquiry_type as string) || 'question'
    const message = (body.message as string) || ''
    const uploadedUrls: { name: string; url: string }[] = body.uploaded_urls || []

    const isDemo = inquiryType === 'demo'
    const subject = isDemo
      ? `Demo request — ${name}${company ? ` · ${company}` : ''}`
      : `Project inquiry — ${name}${company ? ` · ${company}` : ''}`

    const html = `
      <div style="font-family:system-ui,sans-serif;max-width:600px;color:#0f172a">
        <h2 style="margin:0 0 1.5rem;font-size:1.25rem">${subject}</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:1.5rem">
          <tr><td style="padding:6px 0;color:#64748b;width:130px;vertical-align:top">Name</td><td style="padding:6px 0;font-weight:600">${name}</td></tr>
          <tr><td style="padding:6px 0;color:#64748b;vertical-align:top">Reply to</td><td style="padding:6px 0"><a href="mailto:${email}" style="color:#0f172a">${email}</a></td></tr>
          ${company ? `<tr><td style="padding:6px 0;color:#64748b;vertical-align:top">Company</td><td style="padding:6px 0">${company}</td></tr>` : ''}
          ${currentSite ? `<tr><td style="padding:6px 0;color:#64748b;vertical-align:top">Current site</td><td style="padding:6px 0"><a href="${currentSite}" style="color:#0f172a">${currentSite}</a></td></tr>` : ''}
          <tr><td style="padding:6px 0;color:#64748b;vertical-align:top">Type</td><td style="padding:6px 0">${isDemo ? '⚡ Landing page demo request' : '💬 Project inquiry'}</td></tr>
        </table>
        <div style="border-top:1px solid #e2e8f0;padding-top:1.5rem;margin-bottom:1.5rem">
          <p style="margin:0 0 0.5rem;font-weight:600">Message</p>
          <p style="margin:0;line-height:1.7;color:#334155">${message.replace(/\n/g, '<br/>')}</p>
        </div>
        ${uploadedUrls.length > 0 ? `
        <div style="border-top:1px solid #e2e8f0;padding-top:1.5rem">
          <p style="margin:0 0 0.75rem;font-weight:600">Uploaded files (${uploadedUrls.length})</p>
          <ul style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:0.5rem">
            ${uploadedUrls.map(f => `<li><a href="${f.url}" style="color:#0f172a">${f.name}</a></li>`).join('')}
          </ul>
        </div>` : ''}
      </div>
    `

    await resend.emails.send({
      from: 'Fyxio Contact <onboarding@resend.dev>',
      to: TO_EMAIL,
      replyTo: email,
      subject,
      html,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
