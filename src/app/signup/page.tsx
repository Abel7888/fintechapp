"use client"

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { getFirebaseAuth } from '@/lib/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export default function SignUpPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String((form.get('name') || '').toString())
    const email = String(form.get('email') || '')
    const password = String(form.get('password') || '')
    setLoading(true)
    setError(null)
    try {
      const auth = getFirebaseAuth()
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      if (name) {
        try { await updateProfile(cred.user, { displayName: name }) } catch {}
      }
      window.location.href = '/dashboard'
    } catch (err: any) {
      setError(err?.message || 'Failed to sign up')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section pt-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold">Create your account</h1>
        <form onSubmit={onSubmit} className="mt-6 grid gap-3">
          <input name="name" type="text" placeholder="Full name" className="rounded border border-slate-800 bg-slate-900 px-3 py-2" />
          <input name="email" type="email" placeholder="Email" required className="rounded border border-slate-800 bg-slate-900 px-3 py-2" />
          <input name="password" type="password" placeholder="Password" required className="rounded border border-slate-800 bg-slate-900 px-3 py-2" />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button disabled={loading} className="btn-primary w-full" type="submit">
            {loading ? 'Creating…' : 'Create account'}
          </button>
        </form>
        <p className="text-sm text-slate-400 mt-4">
          Already have an account? <Link href="/signin" className="text-primary-300 hover:underline">Sign in</Link>
        </p>
      </div>
    </section>
  )
}
