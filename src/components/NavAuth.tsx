"use client"

import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'

export function NavAuth() {
  const { user, loading, signOut } = useAuth()

  if (loading) {
    return <div className="text-sm text-slate-400">Loading…</div>
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin" className="px-3 py-1.5 rounded border border-slate-800 text-sm hover:border-slate-700">Sign in</Link>
        <Link href="/signup" className="btn-primary">Sign up</Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/dashboard" className="px-3 py-1.5 rounded border border-slate-800 text-sm hover:border-slate-700">Dashboard</Link>
      <button onClick={() => signOut()} className="px-3 py-1.5 rounded border border-slate-800 text-sm hover:border-slate-700">Sign out</button>
    </div>
  )
}
