"use client"

import { useEffect, useRef, useState } from "react"

export type FrameworkRow = {
  id: string
  name: string
  focus: string
  adoption: number // %
  trend: "up" | "down" | "flat"
}

const BASE: Omit<FrameworkRow, "id" | "adoption" | "trend">[] = [
  { name: "NIST CSF 2.0", focus: "Risk mgmt, identify-protect-detect-respond-recover" },
  { name: "ISO/IEC 27001", focus: "ISMS governance & controls" },
  { name: "PCI DSS 4.0", focus: "Cardholder data security" },
  { name: "SOC 2 (TSC)", focus: "Trust services criteria, reports" },
  { name: "FFIEC CAT", focus: "Banking cybersecurity assessment" },
  { name: "NYDFS 500", focus: "New York financial cyber rule" },
  { name: "DORA (EU)", focus: "ICT risk for financial entities" },
  { name: "MAS TRM", focus: "Singapore tech risk mgmt" },
]

export function FrameworksTicker() {
  const [rows, setRows] = useState<FrameworkRow[]>([])
  const ivRef = useRef<number | null>(null)

  useEffect(() => {
    // seed rows
    const seeded = BASE.map((b, i) => ({
      id: `${i}-${Math.random().toString(36).slice(2, 7)}`,
      name: b.name,
      focus: b.focus,
      adoption: Math.floor(40 + Math.random() * 50),
      trend: "flat" as const,
    }))
    setRows(seeded)

    // live updates
    ivRef.current = window.setInterval(() => {
      setRows(cur => cur.map(r => bump(r)))
    }, 4500)
    return () => {
      if (ivRef.current) window.clearInterval(ivRef.current)
    }
  }, [])

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/60">
      <header className="px-4 py-3 border-b border-slate-800/70 flex items-center justify-between">
        <h3 className="font-semibold">Top Cybersecurity Frameworks</h3>
        <div className="text-xs text-slate-400">auto-updating</div>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-slate-400">
            <tr className="border-b border-slate-800/70">
              <th className="px-4 py-2">Framework</th>
              <th className="px-4 py-2">Focus</th>
              <th className="px-4 py-2">Adoption</th>
              <th className="px-4 py-2">Trend</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="border-b border-slate-800/50 hover:bg-slate-900/40 transition">
                <td className="px-4 py-2 font-medium text-slate-200">{r.name}</td>
                <td className="px-4 py-2 text-slate-300">{r.focus}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-28 bg-slate-800 rounded overflow-hidden">
                      <div
                        className={`h-full ${barColor(r.adoption)}`}
                        style={{ width: `${r.adoption}%` }}
                      />
                    </div>
                    <span className="text-slate-300 tabular-nums">{r.adoption}%</span>
                  </div>
                </td>
                <td className="px-4 py-2">{trendIcon(r.trend)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function bump(r: FrameworkRow): FrameworkRow {
  const delta = Math.random() < 0.6 ? (Math.random() < 0.5 ? -1 : 1) : 0
  const next = Math.max(30, Math.min(95, r.adoption + delta))
  return {
    ...r,
    adoption: next,
    trend: delta > 0 ? "up" : delta < 0 ? "down" : "flat",
  }
}

function barColor(p: number) {
  if (p >= 75) return "bg-emerald-500/70"
  if (p >= 55) return "bg-amber-500/70"
  return "bg-slate-500/70"
}

function trendIcon(t: FrameworkRow["trend"]) {
  if (t === "up") return <span className="text-emerald-400">▲</span>
  if (t === "down") return <span className="text-rose-400">▼</span>
  return <span className="text-slate-400">—</span>
}
