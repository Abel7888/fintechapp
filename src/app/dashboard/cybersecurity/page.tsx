"use client"

import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'
import { AgentTag } from '@/components/AgentTag'
import { CyberFeed } from '@/components/CyberFeed'
import { FrameworksTicker } from '@/components/FrameworksTicker'

export default function CybersecurityPage() {
  const { user, loading } = useAuth()
  if (loading) return <section className="section pt-16">Loading…</section>
  if (!user) {
    return (
      <section className="section pt-16">
        <h1 className="text-2xl font-semibold">Please sign in</h1>
        <p className="text-slate-300 mt-2">Access is limited to signed-in users.</p>
        <div className="mt-4 flex gap-2">
          <Link href="/signin" className="btn-primary">Sign in</Link>
          <Link href="/signup" className="px-3 py-2 rounded border border-slate-800 hover:border-slate-700">Sign up</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="section pt-16">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Threat Intelligence & Alerts</h1>
          <p className="text-slate-300 mt-2 max-w-3xl">
            Monitors phishing, ransomware, API exploits, and fraud rings. Surfaces sector-specific alerts (e.g.,
            “U.S. neobanks seeing spike in account takeover fraud”), and feeds directly into the live intelligence stream.
          </p>
        </div>
        <AgentTag agent="Cybersecurity" />
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <HighlightCard
          title="Account takeover spike"
          desc="U.S. neobanks seeing elevated credential stuffing and ATO attempts; enable step-up auth for risky events."
          pill="US • Neobanks"
        />
        <HighlightCard
          title="Phishing kit reuse"
          desc="Brand impersonation campaigns reusing kit across EU payment brands; refresh filters & user education."
          pill="EU • Payments"
        />
        <HighlightCard
          title="API anomaly on auth"
          desc="Elevated 4xx/5xx on login endpoints; review WAF, rate limits, and anomaly rules."
          pill="APAC • Infrastructure"
        />
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <CyberFeed />
        </div>
        <div className="lg:col-span-1 space-y-4">
          <FrameworksTicker />
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300">
            <div className="font-semibold mb-2">How alerts appear in the main feed</div>
            <p>
              Cybersecurity items are tagged with <span className="align-middle"><AgentTag agent="Cybersecurity" /></span> and
              marked with severity to prioritize response.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function HighlightCard({ title, desc, pill }: { title: string; desc: string; pill: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="text-xs text-orange-300/90">⚠️ Priority Alert</div>
        <span className="text-[11px] px-2 py-0.5 rounded border border-slate-800 bg-slate-900/70 text-slate-400">{pill}</span>
      </div>
      <div className="mt-2 font-medium text-slate-200">{title}</div>
      <p className="text-sm text-slate-300 mt-1 leading-relaxed">{desc}</p>
    </div>
  )
}
