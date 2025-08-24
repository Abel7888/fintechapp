"use client"

import { useEffect, useState } from "react"

type Metric = { id: string; label: string; value: number; unit: string; trend: "up" | "down" | "flat" }

const BASE: Omit<Metric, "value" | "trend">[] = [
  { id: "cost", label: "Cost savings", unit: "%" },
  { id: "rev", label: "Revenue lift", unit: "%" },
  { id: "eng", label: "Engagement uplift", unit: "%" },
  { id: "timetoint", label: "Time-to-integration", unit: "%" },
]

export function RoiMetrics() {
  const [rows, setRows] = useState<Metric[]>([])

  useEffect(() => {
    setRows(BASE.map((b) => ({ ...b, value: seed(b.id), trend: "flat" })))
    const iv = setInterval(() => setRows(cur => cur.map(bump)), 4800)
    return () => clearInterval(iv)
  }, [])

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
      <header className="flex items-center justify-between">
        <h3 className="font-semibold">ROI & Value Analysis</h3>
        <span className="text-xs text-slate-400">auto-updating</span>
      </header>
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {rows.map(r => (
          <div key={r.id} className="rounded border border-slate-800 bg-slate-900/60 p-3">
            <div className="text-xs text-slate-400">{r.label}</div>
            <div className="mt-1 flex items-baseline gap-2">
              <div className="text-2xl font-semibold text-slate-200 tabular-nums">{r.value}<span className="text-base">{r.unit}</span></div>
              <div>{trendIcon(r.trend)}</div>
            </div>
            <div className="mt-2 h-1.5 w-full bg-slate-800 rounded overflow-hidden">
              <div className={`${bar(r.id)} h-full`} style={{ width: `${clamp(Math.abs(r.value))}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function seed(id: string) {
  if (id === 'cost') return 18 + Math.floor(Math.random() * 12) // cost savings
  if (id === 'rev') return 8 + Math.floor(Math.random() * 10)    // revenue lift
  if (id === 'eng') return 12 + Math.floor(Math.random() * 14)   // engagement
  return 30 + Math.floor(Math.random() * 20) // time-to-integration improvement
}

function bump(m: Metric): Metric {
  const delta = Math.random() < 0.6 ? (Math.random() < 0.5 ? -1 : 1) : 0
  const next = clamp(m.value + delta)
  return { ...m, value: next, trend: delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat' }
}

function clamp(v: number) { return Math.max(-100, Math.min(100, v)) }

function bar(id: string) {
  if (id === 'cost') return 'bg-emerald-500/70'
  if (id === 'rev') return 'bg-sky-500/70'
  if (id === 'eng') return 'bg-violet-500/70'
  return 'bg-amber-500/70'
}

function trendIcon(t: Metric["trend"]) {
  if (t === 'up') return <span className="text-emerald-400 text-sm">▲</span>
  if (t === 'down') return <span className="text-rose-400 text-sm">▼</span>
  return <span className="text-slate-400 text-sm">—</span>
}
