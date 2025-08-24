"use client"

import { generateSWOT, type Startup } from "./StartupTypes"

export function StartupCard({ s, onAddToCompare }: { s: Startup; onAddToCompare: (s: Startup) => void }) {
  const swot = generateSWOT(s)
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 group" draggable onDragStart={(e) => {
      e.dataTransfer.setData("text/startup-id", s.id)
    }}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-semibold text-slate-200">{s.name}</div>
          <div className="text-xs text-slate-400">{s.sector} • {s.stage} • {s.fundingRound} • Valuation {s.valuation}</div>
          <div className="text-xs text-slate-400 mt-0.5">Investors: {s.investors.join(", ")}</div>
        </div>
        <button className="text-xs text-primary-300 opacity-0 group-hover:opacity-100 transition" onClick={() => onAddToCompare(s)}>Add to Compare →</button>
      </div>

      <div className="mt-3 grid md:grid-cols-4 gap-3 text-sm">
        <SwotCol title="Strengths" items={swot.strengths} color="text-emerald-300" />
        <SwotCol title="Weaknesses" items={swot.weaknesses} color="text-rose-300" />
        <SwotCol title="Opportunities" items={swot.opportunities} color="text-sky-300" />
        <SwotCol title="Threats" items={swot.threats} color="text-amber-300" />
      </div>

      <div className="mt-3 grid grid-cols-5 gap-2 text-[11px]">
        <Score label="Financial" v={s.scores.financialHealth} goodHigh />
        <Score label="Compliance" v={s.scores.compliance} goodHigh />
        <Score label="Cyber Risk" v={s.scores.cyberRisk} goodHigh={false} />
        <Score label="Traction" v={s.scores.traction} goodHigh />
        <Score label="Sentiment" v={s.scores.sentiment} goodHigh />
      </div>
    </div>
  )
}

function SwotCol({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div>
      <div className={`font-medium ${color}`}>{title}</div>
      <ul className="mt-1 space-y-1 text-slate-300">
        {items.slice(0,2).map((t, i) => <li key={i}>• {t}</li>)}
      </ul>
    </div>
  )
}

function Score({ label, v, goodHigh }: { label: string; v: number; goodHigh: boolean }) {
  const pct = Math.max(0, Math.min(100, v))
  const good = goodHigh ? pct >= 60 : pct <= 40
  return (
    <div className="rounded border border-slate-800 bg-slate-900/60 p-2">
      <div className="text-slate-400">{label}</div>
      <div className="flex items-center gap-2 mt-1">
        <div className="h-1.5 w-full bg-slate-800 rounded overflow-hidden">
          <div className={`h-full ${good ? 'bg-emerald-500/70' : 'bg-amber-500/70'}`} style={{ width: `${pct}%` }} />
        </div>
        <span className="text-slate-300 tabular-nums">{pct}</span>
      </div>
    </div>
  )
}
