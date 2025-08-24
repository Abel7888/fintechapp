"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AgentTag } from "./AgentTag"

export type CyberItem = {
  id: string
  ts: number
  text: string
  sector: string
  region: string
  severity: "info" | "warn" | "critical"
}

const SECTORS = ["Payments", "Banking", "Wealth", "Insurtech", "Crypto", "Infrastructure"]
const REGIONS = ["US", "EU", "APAC", "LATAM", "MEA"]

export function CyberFeed({ sectorFilter = "All", regionFilter = "All" }: { sectorFilter?: string; regionFilter?: string }) {
  const [items, setItems] = useState<CyberItem[]>([])
  const seeded = useRef(false)

  useEffect(() => {
    if (seeded.current) return
    seeded.current = true

    const initial = Array.from({ length: 14 }).map(() => makeItem())
    setItems(initial.sort((a, b) => b.ts - a.ts))

    const iv = setInterval(() => {
      setItems(cur => [makeItem(), ...cur].slice(0, 200))
    }, 5000)
    return () => clearInterval(iv)
  }, [])

  const filtered = useMemo(() => {
    return items.filter(i =>
      (sectorFilter === "All" ? true : i.sector === sectorFilter) &&
      (regionFilter === "All" ? true : i.region === regionFilter)
    )
  }, [items, sectorFilter, regionFilter])

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/60">
      <header className="px-4 py-3 border-b border-slate-800/70 flex items-center justify-between">
        <h3 className="font-semibold">Threat Intelligence Feed</h3>
        <div className="text-xs text-slate-400">{filtered.length} updates</div>
      </header>
      <ul className="divide-y divide-slate-800/70">
        {filtered.map(item => (
          <li key={item.id} className="p-4 hover:bg-slate-900/40 transition">
            <div className="flex items-start justify-between gap-3">
              <span className="flex items-center gap-2">
                <AgentTag agent="Cybersecurity" />
                <Badge severity={item.severity} />
              </span>
              <time className="text-xs text-slate-500 min-w-[84px] text-right">{formatTime(item.ts)}</time>
            </div>
            <p className="mt-2 text-sm text-slate-200 leading-relaxed">{item.text}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-400">
              <span className="px-2 py-0.5 rounded border border-slate-800 bg-slate-900/60">Sector: {item.sector}</span>
              <span className="px-2 py-0.5 rounded border border-slate-800 bg-slate-900/60">Region: {item.region}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Badge({ severity }: { severity: CyberItem["severity"] }) {
  const map = {
    info: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    warn: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    critical: "bg-red-500/15 text-red-300 border-red-500/30",
  }
  const label = severity === "critical" ? "Critical" : severity === "warn" ? "Warning" : "Info"
  return <span className={`text-[11px] px-2 py-0.5 rounded border ${map[severity]}`}>{label}</span>
}

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function makeItem(): CyberItem {
  const sector = rand(SECTORS)
  const region = rand(REGIONS)
  const severity: CyberItem["severity"] = Math.random() < 0.15 ? "critical" : Math.random() < 0.5 ? "warn" : "info"
  const text = composeText(sector, region, severity)
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ts: Date.now(),
    text,
    sector,
    region,
    severity,
  }
}

function composeText(sector: string, region: string, severity: CyberItem["severity"]) {
  const warnings = [
    `Credential stuffing surge impacting ${sector} in ${region}; enforce rate-limits and enable step-up auth.`,
    `Phishing kit mimicking fintech brands in ${region}; refresh email filtering and user awareness.`,
    `API anomalies on auth/payment endpoints; review WAF and anomaly rules for ${sector}.`,
    `Ransomware operators targeting cloud storage misconfigurations; validate backups and key rotations.`,
    `Fraud ring activity increasing across neobanks; tighten device fingerprinting and rules.`,
  ]
  const criticals = [
    `Critical: Active account takeover campaign in ${region} targeting ${sector}; require MFA for risk events immediately.`,
    `Critical: Supply-chain package typosquatting detected; pin dependencies and audit SBOMs.`,
  ]
  const infos = [
    `Advisory: New guidance on API security in ${region}; align gateway policies and secrets management.`,
    `Intel: Credential dump observed on breach forums; monitor password reuse risks.`,
  ]
  const pool = severity === "critical" ? criticals : severity === "warn" ? warnings : infos
  return rand(pool).replace(/\s{2,}/g, " ")
}

function formatTime(ts: number) {
  const d = new Date(ts)
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}
