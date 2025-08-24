import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/hash'

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || ''
    let name = '', email = '', password = ''
    if (contentType.includes('application/json')) {
      const body = await req.json()
      name = body.name || ''
      email = (body.email || '').toLowerCase()
      password = body.password || ''
    } else {
      const form = await req.formData()
      name = String(form.get('name') || '')
      email = String(form.get('email') || '').toLowerCase()
      password = String(form.get('password') || '')
    }

    if (!email || !password) {
      return NextResponse.json({ ok: false, error: 'Email and password required' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ ok: false, error: 'Email already in use' }, { status: 409 })
    }

    const passwordHash = await hashPassword(password)
    const user = await prisma.user.create({ data: { email, name: name || null, passwordHash } })

    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name } })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message || 'Unexpected error' }, { status: 500 })
  }
}
