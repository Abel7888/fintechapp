import './globals.css'
import { ReactNode } from 'react'
import Link from 'next/link'
import { AuthProvider } from '@/components/AuthProvider'
import { NavAuth } from '@/components/NavAuth'

export const metadata = {
  title: 'Fintech Analysis — Insightful One-Pagers',
  description: 'Sleek, professional fintech startup analysis — what we do, how we help, UVP, FAQs, and contact.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
            <nav className="section flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-primary-500 flex items-center justify-center font-bold">ƒ</div>
                <span className="font-semibold tracking-tight">Fintech Analysis</span>
              </Link>
              <div className="hidden sm:flex items-center gap-6 text-sm">
                <a href="#what" className="hover:text-primary-300">What we do</a>
                <a href="#help" className="hover:text-primary-300">How we help</a>
                <a href="#uvp" className="hover:text-primary-300">UVP</a>
                <a href="#categories" className="hover:text-primary-300">Startups</a>
                <a href="#faq" className="hover:text-primary-300">FAQ</a>
                <a href="#contact" className="hover:text-primary-300">Contact</a>
              </div>
              <NavAuth />
            </nav>
          </header>
          <main>{children}</main>
          <footer className="border-t border-slate-800 mt-16">
            <div className="section py-10 text-sm text-slate-400 flex items-center justify-between">
              <p>© {new Date().getFullYear()} Fintech Analysis. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a href="#contact" className="hover:text-primary-300">Contact</a>
                <Link href="/signin" className="hover:text-primary-300">Sign in</Link>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  )
}
