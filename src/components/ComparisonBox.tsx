"use client"

import { useCallback } from "react"
import type { Startup } from "./StartupTypes"

export function ComparisonBox({ items, onDropStartup, onRemove }: {
  items: Startup[]
  onDropStartup: (startupId: string) => void
  onRemove: (id: string) => void
}) {
  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    if (e.dataTransfer.types.includes("text/startup-id")) {
      e.preventDefault()
    }
  }, [])

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("text/startup-id")
    if (id) onDropStartup(id)
  }, [onDropStartup])

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/60" onDragOver={onDragOver} onDrop={onDrop}>
      <header className="px-4 py-3 border-b border-slate-800/70 flex items-center justify-between">
        <h3 className="font-semibold">Comparison Box</h3>
        <div className="text-xs text-slate-400">Drag startups here (up to 3)</div>
      </header>
      <div className={`grid gap-3 p-4 ${items.length === 0 ? '' : items.length === 1 ? 'md:grid-cols-1' : items.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
        {items.length === 0 && (
          <div className="rounded border border-dashed border-slate-800 p-6 text-slate-400 text-sm text-center">
            Drop startup cards to compare side-by-side.
          </div>
        )}
        {items.map(s => (
          <div key={s.id} className="rounded border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-medium text-slate-200">{s.name}</div>
                <div className="text-xs text-slate-400">{s.sector} • {s.stage}</div>
              </div>
              <button className="text-[11px] text-slate-400 hover:text-slate-200" onClick={() => onRemove(s.id)}>Remove</button>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
              <Pair label="Funding Round" value={s.fundingRound} />
              <Pair label="Valuation" value={s.valuation} />
              <Pair label="Financial Health" value={`${s.scores.financialHealth}`} />
              <Pair label="Compliance" value={`${s.scores.compliance}`} />
              <Pair label="Cyber Risk (lower better)" value={`${s.scores.cyberRisk}`} />
              <Pair label="Traction" value={`${s.scores.traction}`} />
              <Pair label="Sentiment" value={`${s.scores.sentiment}`} />
            </dl>
          </div>
        ))}
      </div>
      {items.length >= 2 && (
        <div className="border-t border-slate-800 p-4 text-sm text-slate-200">
          {summary(items)}
        </div>
      )}
    </section>
  )
}

function Pair({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-slate-400">{label}</dt>
      <dd className="text-slate-200">{value}</dd>
    </div>
  )
}

function summary(items: Startup[]) {
  if (items.length < 2) return null
  const [a, b, c] = items
  const bestCompliance = items.reduce((p, x) => x.scores.compliance > p.scores.compliance ? x : p)
  const bestGrowth = items.reduce((p, x) => x.scores.traction > p.scores.traction ? x : p)
  const lowestRisk = items.reduce((p, x) => x.scores.cyberRisk < p.scores.cyberRisk ? x : p)
  const leader = `${bestCompliance.name} leads compliance; ${lowestRisk.name} has lowest cyber risk; ${bestGrowth.name} shows strongest traction.`
  let rec = `Overall: `
  if (bestCompliance.id === lowestRisk.id && bestCompliance.id !== bestGrowth.id) {
    rec += `${bestCompliance.name} looks enterprise-ready; ${bestGrowth.name} offers growth upside.`
  } else if (bestGrowth.id === lowestRisk.id) {
    rec += `${bestGrowth.name} balances growth with lower risk.`
  } else {
    rec += `${bestCompliance.name} is safer; ${bestGrowth.name} is higher growth.`
  }
  return `${leader} ${rec}`
}
