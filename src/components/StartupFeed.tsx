"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AgentTag, type AgentType } from "./AgentTag"
import { SECTORS, STAGES } from "./StartupTypes"

export function StartupFeed({ sector = "All", stage = "All", risk = "All" }: { sector?: string; stage?: string; risk?: string }) {
  type Item = {
    id: string
    ts: number
    agent: AgentType
    text: string
    sector: string
    stage: string
    risk: string
  }

  const [items, setItems] = useState<Item[]>([])
  const seeded = useRef(false)

  useEffect(() => {
    if (seeded.current) return
    seeded.current = true

    const initial = Array.from({ length: 14 }).map(() => makeItem())
    setItems(initial.sort((a, b) => b.ts - a.ts))

    const iv = setInterval(() => {
      setItems(cur => [makeItem(), ...cur].slice(0, 160))
    }, 5500)
    return () => clearInterval(iv)
  }, [])

  const filtered = useMemo(() => {
    return items.filter(i =>
      (sector === "All" ? true : i.sector === sector) &&
      (stage === "All" ? true : i.stage === stage) &&
      (risk === "All" ? true : i.risk === risk)
    )
  }, [items, sector, stage, risk])

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/60">
      <header className="px-4 py-3 border-b border-slate-800/70 flex items-center justify-between">
        <h3 className="font-semibold">Live Startup Updates</h3>
        <div className="text-xs text-slate-400">{filtered.length} updates</div>
      </header>
      <ul className="divide-y divide-slate-800/70">
        {filtered.map(item => (
          <li key={item.id} className="p-4 hover:bg-slate-900/40 transition">
            <div className="flex items-start justify-between gap-3">
              <AgentTag agent={item.agent} />
              <time className="text-xs text-slate-500 min-w-[84px] text-right">{formatTime(item.ts)}</time>
            </div>
            <p className="mt-2 text-sm text-slate-200 leading-relaxed">{item.text}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-400">
              <span className="px-2 py-0.5 rounded border border-slate-800 bg-slate-900/60">Sector: {item.sector}</span>
              <span className="px-2 py-0.5 rounded border border-slate-800 bg-slate-900/60">Stage: {item.stage}</span>
              <span className="px-2 py-0.5 rounded border border-slate-800 bg-slate-900/60">Risk: {item.risk}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)] }

const RISKS = ["Market", "Credit", "Liquidity", "Regulatory", "Operational"]
const STARTUP_AGENTS: AgentType[] = ["Market Intelligence", "Regulation & Policy", "Cybersecurity"]

function makeItem() {
  const agent = rand(STARTUP_AGENTS)
  const sector = rand(SECTORS as unknown as string[])
  const stage = rand(STAGES as unknown as string[])
  const risk = rand(RISKS)
  const text = compose(agent, sector as string, stage as string, risk)
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    ts: Date.now(),
    agent,
    text,
    sector: sector as string,
    stage: stage as string,
    risk,
  }
}

function compose(agent: AgentType, sector: string, stage: string, risk: string) {
  const lines: Record<AgentType, string[]> = {
    "Market Intelligence": [
      `Funding update: ${sector} startup closes ${stage} round; investor appetite steady; watch ${risk} risks.`,
      `Valuation trends: ${sector} ${stage} deals tighten; quality premiums emerging.`,
    ],
    "Regulation & Policy": [
      `Regulatory shift impacts ${sector}; enterprise buyers revisiting vendor due diligence.`,
      `Compliance update: frameworks alignment needed for ${stage} deals; ${risk} scrutiny rising.`,
    ],
    "Cybersecurity": [
      `⚠️ Cyber alert: account takeover targeting ${sector} startups; enable MFA on admin accounts.`,
      `⚠️ API security: anomalous errors on payment endpoints; review WAF & rate limits for ${stage}.`,
    ],
    "Venture Due Diligence": [
      `Diligence note`,
    ],
    "Financial Risk": [
      `Risk note`,
    ],
    "Valuation & Deal Structuring": [
      `Valuation note`,
    ],
    "Investor Sentiment & Networking": [
      `Sentiment note`,
    ],
  }
  const bank = lines[agent] || lines["Market Intelligence"]
  return rand(bank).replace(/\s{2,}/g, " ")
}

function formatTime(ts: number) {
  const d = new Date(ts)
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}
