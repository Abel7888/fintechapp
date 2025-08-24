"use client"

import { AgentType } from "./AgentTag"

const AGENTS: AgentType[] = [
  "Market Intelligence",
  "Venture Due Diligence",
  "Financial Risk",
  "Regulation & Policy",
  "Valuation & Deal Structuring",
  "Investor Sentiment & Networking",
]

const SECTORS = ["All", "Payments", "Lending", "Wealth", "Insurtech", "Crypto", "Infrastructure"] as const
const STAGES = ["All", "Pre-seed", "Seed", "Series A", "Series B+", "Public"] as const
const REGIONS = ["All", "US", "EU", "APAC", "LATAM", "MEA"] as const
const RISKS = ["All", "Market", "Credit", "Liquidity", "Regulatory", "Operational"] as const

export type FilterState = {
  agents: AgentType[]
  sector: (typeof SECTORS)[number]
  stage: (typeof STAGES)[number]
  region: (typeof REGIONS)[number]
  risk: (typeof RISKS)[number]
}

export function FiltersBar({
  value,
  onChange,
}: {
  value: FilterState
  onChange: (next: FilterState) => void
}) {
  const toggleAgent = (a: AgentType) => {
    const exists = value.agents.includes(a)
    const agents = exists ? value.agents.filter(x => x !== a) : [...value.agents, a]
    onChange({ ...value, agents })
  }

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 md:p-4">
      <div className="flex flex-wrap gap-2">
        {AGENTS.map(a => (
          <button
            key={a}
            onClick={() => toggleAgent(a)}
            className={`px-2.5 py-1 rounded border text-xs transition ${
              value.agents.includes(a)
                ? "border-primary-500/40 bg-primary-500/10 text-primary-300"
                : "border-slate-800 hover:border-slate-700 text-slate-300"
            }`}
            aria-pressed={value.agents.includes(a)}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
        <Select
          label="Sector"
          value={value.sector}
          onChange={v => onChange({ ...value, sector: v as FilterState["sector"] })}
          options={SECTORS as unknown as string[]}
        />
        <Select
          label="Stage"
          value={value.stage}
          onChange={v => onChange({ ...value, stage: v as FilterState["stage"] })}
          options={STAGES as unknown as string[]}
        />
        <Select
          label="Region"
          value={value.region}
          onChange={v => onChange({ ...value, region: v as FilterState["region"] })}
          options={REGIONS as unknown as string[]}
        />
        <Select
          label="Risk"
          value={value.risk}
          onChange={v => onChange({ ...value, risk: v as FilterState["risk"] })}
          options={RISKS as unknown as string[]}
        />
      </div>
    </div>
  )
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
}) {
  return (
    <label className="flex flex-col gap-1 text-xs text-slate-400">
      <span>{label}</span>
      <select
        className="rounded border border-slate-800 bg-slate-950 text-slate-200 px-2 py-1.5"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {options.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}
