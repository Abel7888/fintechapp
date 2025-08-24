"use client"

import { useState } from "react"
import { SECTORS, STAGES } from "./StartupTypes"

export function StartupSearchBar({ onChange }: { onChange: (q: string, sector: string, stage: string) => void }) {
  const [q, setQ] = useState("")
  const [sector, setSector] = useState("All")
  const [stage, setStage] = useState("All")

  const emit = (nextQ = q, nextSector = sector, nextStage = stage) => {
    onChange(nextQ, nextSector, nextStage)
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
      <div className="grid md:grid-cols-3 gap-3">
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); emit(e.target.value) }}
          placeholder="Search startups, sectors, or investors"
          className="rounded border border-slate-800 bg-slate-950 px-3 py-2 text-sm"
        />
        <select
          value={sector}
          onChange={(e) => { setSector(e.target.value); emit(undefined as any, e.target.value) }}
          className="rounded border border-slate-800 bg-slate-950 px-3 py-2 text-sm"
        >
          <option>All</option>
          {SECTORS.map(s => <option key={s}>{s}</option>)}
        </select>
        <select
          value={stage}
          onChange={(e) => { setStage(e.target.value); emit(undefined as any, undefined as any, e.target.value) }}
          className="rounded border border-slate-800 bg-slate-950 px-3 py-2 text-sm"
        >
          <option>All</option>
          {STAGES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
    </div>
  )
}
