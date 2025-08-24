"use client"

import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'
import { useMemo, useState } from 'react'
import { StartupSearchBar } from '@/components/StartupSearchBar'
import { ComparisonBox } from '@/components/ComparisonBox'
import { StartupCard } from '@/components/StartupCard'
import { StartupFeed } from '@/components/StartupFeed'
import { mockStartups, type Startup, type Goal } from '@/components/StartupTypes'

export default function StartupPSPage() {
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

  // Mock data until APIs are wired
  const all = useMemo(() => mockStartups(), [])
  const [q, setQ] = useState("")
  const [sector, setSector] = useState("All")
  const [stage, setStage] = useState("All")
  const [goal, setGoal] = useState<Goal>("low-risk vendor")
  const [compare, setCompare] = useState<Startup[]>([])

  const filtered = useMemo(() => {
    const base = all.filter(s =>
      (q ? (s.name.toLowerCase().includes(q.toLowerCase()) || s.investors.join(' ').toLowerCase().includes(q.toLowerCase())) : true) &&
      (sector === 'All' ? true : s.sector === sector) &&
      (stage === 'All' ? true : s.stage === stage)
    )
    return rankByGoal(base, goal)
  }, [all, q, sector, stage, goal])

  const onSearchChange = (nextQ: string, nextSector: string, nextStage: string) => {
    setQ(nextQ)
    setSector(nextSector)
    setStage(nextStage)
  }

  const onAddToCompare = (s: Startup) => {
    setCompare(cur => {
      if (cur.find(x => x.id === s.id)) return cur
      return cur.length >= 3 ? cur : [...cur, s]
    })
  }

  const onDropStartup = (startupId: string) => {
    const s = all.find(x => x.id === startupId)
    if (s) onAddToCompare(s)
  }

  const onRemove = (id: string) => setCompare(cur => cur.filter(x => x.id !== id))

  return (
    <section className="section pt-16">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Startup Intelligence</h1>
          <p className="text-slate-300 mt-2 max-w-3xl">
            Search, review, and compare recently funded fintech startups. Each profile includes an AI-style SWOT. Drag cards into the
            comparison box for side-by-side evaluation. Set a goal to re-rank results for your needs.
          </p>
        </div>
        <GoalSelect value={goal} onChange={setGoal} />
      </div>

      <div className="mt-6">
        <StartupSearchBar onChange={onSearchChange} />
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          {filtered.slice(0, 8).map(s => (
            <StartupCard key={s.id} s={s} onAddToCompare={onAddToCompare} />
          ))}
        </div>
        <div className="lg:col-span-1">
          <ComparisonBox items={compare} onDropStartup={onDropStartup} onRemove={onRemove} />
        </div>
      </div>

      <div className="mt-6">
        <StartupFeed sector={sector} stage={stage} risk="All" />
      </div>
    </section>
  )
}

function GoalSelect({ value, onChange }: { value: Goal; onChange: (g: Goal) => void }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-2">
      <label className="text-xs text-slate-400 px-2">Goal-based review</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Goal)}
        className="mt-1 rounded border border-slate-800 bg-slate-950 px-3 py-2 text-sm"
      >
        <option value="low-risk vendor">Low-risk vendor</option>
        <option value="high-growth investment">High-growth investment</option>
        <option value="enterprise-ready solution">Enterprise-ready solution</option>
      </select>
    </div>
  )
}

function rankByGoal(list: Startup[], goal: Goal): Startup[] {
  // Simple weighted scoring; replace with AI re-ranking later
  return [...list].sort((a, b) => score(b, goal) - score(a, goal))
}

function score(s: Startup, goal: Goal) {
  const f = s.scores
  if (goal === 'low-risk vendor') {
    // prioritize compliance high, cyberRisk low, financial health moderate
    return f.compliance * 0.45 + (100 - f.cyberRisk) * 0.35 + f.financialHealth * 0.2
  }
  if (goal === 'high-growth investment') {
    // prioritize traction, sentiment, and financial health
    return f.traction * 0.45 + f.sentiment * 0.3 + f.financialHealth * 0.25
  }
  // enterprise-ready solution: compliance, financial health, traction
  return f.compliance * 0.4 + f.financialHealth * 0.35 + f.traction * 0.25
}
