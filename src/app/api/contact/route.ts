import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || ''
    let name = '', email = '', message = ''
    if (contentType.includes('application/json')) {
      const body = await req.json()
      name = body.name || ''
      email = body.email || ''
      message = body.message || ''
    } else {
      const form = await req.formData()
      name = String(form.get('name') || '')
      email = String(form.get('email') || '')
      message = String(form.get('message') || '')
    }

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })
    }

    // TODO: integrate email provider (Resend/SendGrid). For now, just log.
    console.log('[contact] new message', { name, email, message })

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message || 'Unexpected error' }, { status: 500 })
  }
}
