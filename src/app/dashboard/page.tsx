"use client"

import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { ExecutiveSummary } from '@/components/ExecutiveSummary'
import { FiltersBar, type FilterState } from '@/components/FiltersBar'
import { NewsFeed } from '@/components/NewsFeed'

export default function DashboardPage() {
  const { user, loading } = useAuth()

  if (loading) return <section className="section pt-16">Loading…</section>
  if (!user) {
    return (
      <section className="section pt-16">
        <h1 className="text-2xl font-semibold">Please sign in</h1>
        <p className="text-slate-300 mt-2">Access your fintech insights dashboard after signing in.</p>
        <div className="mt-4 flex gap-2">
          <Link href="/signin" className="btn-primary">Sign in</Link>
          <Link href="/signup" className="px-3 py-2 rounded border border-slate-800 hover:border-slate-700">Sign up</Link>
        </div>
      </section>
    )
  }

  const [filters, setFilters] = useState<FilterState>({
    agents: [],
    sector: 'All',
    stage: 'All',
    region: 'All',
    risk: 'All',
  })

  const themes = [
    'Payments margins compressing; price innovation ahead',
    'Credit risk repricing for SMB lending in US/EU',
    'Infra/API consolidation creating platform moats',
  ]

  return (
    <section className="section pt-16">
      <h1 className="sr-only">Fintech Intelligence Dashboard</h1>

      <ExecutiveSummary
        name={user.email}
        portfolioCount={7}
        alertsCount={12}
        themes={themes}
      />

      <nav aria-label="Your Workbench" className="mt-6">
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-200">Your Workbench</h2>
            <span className="text-[11px] text-slate-500">shortcuts</span>
          </div>
          <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <WorkbenchCard href="/dashboard/agents" title="Agents" desc="Chat with 6 specialized AI agents." cta="Open agents" />
            <WorkbenchCard href="/dashboard/cybersecurity" title="Cybersecurity" desc="Threats, posture, vendor risk." cta="Open" />
            <WorkbenchCard href="/dashboard/startup-ps" title="Startup PS" desc="Playbooks, ops, GTM templates." cta="Open" />
            <WorkbenchCard href="/dashboard/open-apis" title="Open APIs" desc="Integrations & data sources." cta="Open" />
          </div>
        </div>
      </nav>

      <div className="mt-6">
        <FiltersBar value={filters} onChange={setFilters} />
      </div>

      <div className="mt-6">
        <NewsFeed
          activeAgents={filters.agents}
          sector={filters.sector}
          stage={filters.stage}
          region={filters.region}
          risk={filters.risk}
        />
      </div>
    </section>
  )
}

function WorkbenchCard({ href, title, desc, cta }: { href: string; title: string; desc: string; cta: string }) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-950 p-4 transition group"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-xs text-slate-400 mt-0.5">{desc}</div>
        </div>
        <span className="text-xs text-primary-300 opacity-0 group-hover:opacity-100 transition">{cta} →</span>
      </div>
    </Link>
  )
}
