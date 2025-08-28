"use client"

import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { getFirebaseAuth } from '@/lib/firebase'
import { onAuthStateChanged, signOut as fbSignOut, User } from 'firebase/auth'

interface AuthContextValue {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({ user: null, loading: true, signOut: async () => {} })

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [warning, setWarning] = useState<string | null>(null)

  useEffect(() => {
    let unsub: (() => void) | undefined
    try {
      const auth = getFirebaseAuth()
      unsub = onAuthStateChanged(auth, (u: User | null) => {
        setUser(u)
        setLoading(false)
      })
    } catch (e: any) {
      console.error('Firebase init failed. Check NEXT_PUBLIC_FIREBASE_* env vars.', e)
      setWarning('Auth temporarily unavailable. Check Firebase env config.')
      setLoading(false)
    }
    return () => { if (unsub) unsub() }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, signOut: async () => fbSignOut(getFirebaseAuth()) }}>
      {warning && (
        <div className="bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs px-3 py-2 text-center">
          {warning}
        </div>
      )}
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
