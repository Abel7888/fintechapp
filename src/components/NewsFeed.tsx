"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AgentTag, AgentType } from "./AgentTag"

export type FeedItem = {
  id: string
  ts: number
  agent: AgentType
  text: string
  sector: string
  stage: string
  region: string
  risk: string
}

const SECTORS = ["Payments", "Lending", "Wealth", "Insurtech", "Crypto", "Infrastructure"]
const STAGES = ["Pre-seed", "Seed", "Series A", "Series B+", "Public"]
const REGIONS = ["US", "EU", "APAC", "LATAM", "MEA"]
const RISKS = ["Market", "Credit", "Liquidity", "Regulatory", "Operational"]
const AGENTS: AgentType[] = [
  "Market Intelligence",
  "Venture Due Diligence",
  "Financial Risk",
  "Regulation & Policy",
  "Valuation & Deal Structuring",
  "Investor Sentiment & Networking",
  "Cybersecurity",
]

export function NewsFeed({
  activeAgents,
  sector,
  stage,
  region,
  risk,
}: {
  activeAgents: AgentType[]
  sector: string
  stage: string
  region: string
  risk: string
}) {
  const [items, setItems] = useState<FeedItem[]>([])
  const seeded = useRef(false)

  // Seed + live mock generator
  useEffect(() => {
    if (seeded.current) return
    seeded.current = true

    const initial = Array.from({ length: 18 }).map(() => makeItem())
    setItems(initial.sort((a, b) => b.ts - a.ts))

    const iv = setInterval(() => {
      setItems(cur => [makeItem(), ...cur].slice(0, 200))
    }, 6000)

    return () => clearInterval(iv)
  }, [])

  const filtered = useMemo(() => {
    return items.filter(i =>
      (activeAgents.length ? activeAgents.includes(i.agent) : true) &&
      (sector === "All" ? true : i.sector === sector) &&
      (stage === "All" ? true : i.stage === stage) &&
      (region === "All" ? true : i.region === region) &&
      (risk === "All" ? true : i.risk === risk)
    )
  }, [items, activeAgents, sector, stage, region, risk])

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/60">
      <header className="px-4 py-3 border-b border-slate-800/70 flex items-center justify-between">
        <h3 className="font-semibold">Live Intelligence Feed</h3>
        <div className="text-xs text-slate-400">{filtered.length} updates</div>
      </header>
      <ul className="divide-y divide-slate-800/70">
        {filtered.map(item => (
          <li key={item.id} className="p-4 hover:bg-slate-900/40 transition">
            <div className="flex items-start justify-between gap-3">
              <AgentTag agent={item.agent} />
              <time className="text-xs text-slate-500 min-w-[84px] text-right">
                {formatTime(item.ts)}
              </time>
            </div>
            <p className="mt-2 text-sm text-slate-200 leading-relaxed">{item.text}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-400">
              <span className="px-2 py-0.5 rounded border border-slate-800 bg-slate-900/60">Sector: {item.sector}</span>
              <span className="px-2 py-0.5 rounded border border-slate-800 bg-slate-900/60">Stage: {item.stage}</span>
              <span className="px-2 py-0.5 rounded border border-slate-800 bg-slate-900/60">Region: {item.region}</span>
              <span className="px-2 py-0.5 rounded border border-slate-800 bg-slate-900/60">Risk: {item.risk}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function makeItem(): FeedItem {
  const agent = rand(AGENTS)
  const sector = rand(SECTORS)
  const stage = rand(STAGES)
  const region = rand(REGIONS)
  const risk = rand(RISKS)
  const text = composeText(agent, sector, stage, region, risk)
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ts: Date.now(),
    agent,
    text,
    sector,
    stage,
    region,
    risk,
  }
}

function composeText(agent: AgentType, sector: string, stage: string, region: string, risk: string) {
  const snippets: Record<AgentType, string[]> = {
    "Market Intelligence": [
      `Pricing compression in ${region} ${sector} as incumbents react; watch CAC/LTV in ${stage}.`,
      `User growth inflecting for ${sector} in ${region}; category tailwinds likely over next 1-2 quarters.`,
    ],
    "Venture Due Diligence": [
      `Team-market fit strong in ${sector}; diligence flags: sales cycle length, gross margin stability.`,
      `Comparable rounds in ${region} show valuation discipline returning for ${stage}.`,
    ],
    "Financial Risk": [
      `Counterparty concentration risk elevated; recommend exposure limits review within ${sector}.`,
      `Liquidity stress scenarios suggest 6–9 month runway at current burn; explore credit lines.`,
    ],
    "Regulation & Policy": [
      `New guidance hints at tighter ${sector} controls in ${region}; compliance roadmap advised.`,
      `Policy shift watchlist: sandbox expansion enabling pilots for ${sector} entrants.`,
    ],
    "Valuation & Deal Structuring": [
      `Term structures favor tranched milestones; consider ratchets tied to ${risk} mitigation.`,
      `Benchmark EV/rev multiples imply ${stage} range tightening; room for secondary liquidity.`,
    ],
    "Investor Sentiment & Networking": [
      `Syndicate appetite rising in ${region}; insider participation key for ${stage} momentum.`,
      `Founder-market narrative resonating; track social velocity and strategic intros.`,
    ],
    "Cybersecurity": [
      `⚠️ Spike in credential stuffing targeting ${sector} in ${region}; monitor account takeover and enable step-up auth for ${stage}.`,
      `⚠️ Active phishing kit reusing fintech brand assets in ${region}; update email security filters and user education.`,
      `⚠️ API anomaly detected: elevated 4xx/5xx on auth endpoints; check WAF rules and rate limits for ${sector}.`,
    ],
  }
  // Normalize any accidental double spaces using a regex to keep TS lib compatibility
  return rand(snippets[agent]).replace(/\s{2,}/g, " ")
}

function formatTime(ts: number) {
  const d = new Date(ts)
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}
