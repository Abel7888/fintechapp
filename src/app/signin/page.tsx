"use client"

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { getFirebaseAuth } from '@/lib/firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

export default function SignInPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const email = String(form.get('email') || '')
    const password = String(form.get('password') || '')
    setLoading(true)
    setError(null)
    try {
      const auth = getFirebaseAuth()
      await signInWithEmailAndPassword(auth, email, password)
      window.location.href = '/dashboard'
    } catch (err: any) {
      setError(err?.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  const onGoogle = async () => {
    setLoading(true)
    setError(null)
    try {
      const auth = getFirebaseAuth()
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      window.location.href = '/dashboard'
    } catch (err: any) {
      setError(err?.message || 'Google sign-in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section pt-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <form onSubmit={onSubmit} className="mt-6 grid gap-3">
          <input name="email" type="email" placeholder="Email" required className="rounded border border-slate-800 bg-slate-900 px-3 py-2" />
          <input name="password" type="password" placeholder="Password" required className="rounded border border-slate-800 bg-slate-900 px-3 py-2" />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button disabled={loading} className="btn-primary w-full" type="submit">
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <div className="mt-3 grid gap-2">
          <button
            onClick={onGoogle}
            disabled={loading}
            className="w-full px-3 py-2 rounded border border-slate-800 hover:border-slate-700 bg-slate-950 text-slate-200"
            type="button"
          >
            Continue with Google
          </button>
        </div>
        <p className="text-sm text-slate-400 mt-4">
          No account? <Link href="/signup" className="text-primary-300 hover:underline">Sign up</Link>
        </p>
      </div>
    </section>
  )
}
