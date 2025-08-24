"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AgentTag, type AgentType } from "./AgentTag"

type TrendItem = {
  id: string
  ts: number
  agent: AgentType
  text: string
  category: string // Payments, Data, Lending, KYC/KYB, PFM, Wealth
  region: string
}

const CATEGORIES = ["Payments", "Data Aggregation", "Lending", "KYC/KYB", "PFM", "Wealth"]
const REGIONS = ["US", "EU", "APAC", "LATAM", "MEA"]
const AGENTS: AgentType[] = ["Market Intelligence", "Regulation & Policy", "Cybersecurity"]

export function ApiTrendsFeed() {
  const [items, setItems] = useState<TrendItem[]>([])
  const seeded = useRef(false)

  useEffect(() => {
    if (seeded.current) return
    seeded.current = true

    const initial = Array.from({ length: 16 }).map(() => makeItem())
    setItems(initial.sort((a, b) => b.ts - a.ts))

    const iv = setInterval(() => {
      setItems(cur => [makeItem(), ...cur].slice(0, 180))
    }, 5200)
    return () => clearInterval(iv)
  }, [])

  const list = useMemo(() => items, [items])

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/60">
      <header className="px-4 py-3 border-b border-slate-800/70 flex items-center justify-between">
        <h3 className="font-semibold">Current Trends Analysis</h3>
        <div className="text-xs text-slate-400">{list.length} insights</div>
      </header>
      <ul className="divide-y divide-slate-800/70">
        {list.map(item => (
          <li key={item.id} className="p-4 hover:bg-slate-900/40 transition">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <AgentTag agent={item.agent} />
                <span className="text-[11px] text-slate-400">{item.category}</span>
              </div>
              <time className="text-xs text-slate-500 min-w-[84px] text-right">{formatTime(item.ts)}</time>
            </div>
            <p className="mt-2 text-sm text-slate-200 leading-relaxed">{item.text}</p>
            <div className="mt-2 text-[11px] text-slate-400">Region: {item.region}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)] }

function makeItem(): TrendItem {
  const agent = rand(AGENTS)
  const category = rand(CATEGORIES)
  const region = rand(REGIONS)
  const text = compose(agent, category, region)
  return { id: `${Date.now()}-${Math.random().toString(36).slice(2,7)}`, ts: Date.now(), agent, text, category, region }
}

function compose(agent: AgentType, category: string, region: string) {
  const lines: Record<AgentType, string[]> = {
    "Market Intelligence": [
      `Adoption rising: ${category} APIs expanding in ${region}; embedded finance driving demand.`,
      `Banks in ${region} standardizing ${category} endpoints; interoperability improves DX.`,
    ],
    "Regulation & Policy": [
      `Regulatory update in ${region}: guidance impacts ${category} data sharing and consent flows.`,
      `Compliance push accelerates ${category} in ${region}; vendors updating policy toolkits.`,
    ],
    "Cybersecurity": [
      `⚠️ Security note: token misuse attempts observed on ${category} endpoints in ${region}; review scopes and rotation.`,
      `⚠️ Threat intel: elevated probing of open endpoints; tighten mTLS and anomaly detection for ${category}.`,
    ],
    "Venture Due Diligence": [""],
    "Financial Risk": [""],
    "Valuation & Deal Structuring": [""],
    "Investor Sentiment & Networking": [""],
  }
  const bank = lines[agent] || lines["Market Intelligence"]
  return rand(bank).replace(/\s{2,}/g, " ")
}

function formatTime(ts: number) {
  const d = new Date(ts)
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}
