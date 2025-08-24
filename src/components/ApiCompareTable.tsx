"use client"

import { useEffect, useState } from "react"

type ApiVendor = {
  id: string
  name: string
  category: "Payments" | "Data Aggregation" | "Lending" | "KYC/KYB" | "PFM" | "Wealth"
  features: string[]
  dxScore: number // Developer Experience 0-100
  notes: string
}

const BASE: ApiVendor[] = [
  { id: "p1", name: "PayRail APIs", category: "Payments", features: ["Payouts", "FX", "mTLS"], dxScore: 82, notes: "Good docs, webhooks" },
  { id: "d1", name: "DataLink", category: "Data Aggregation", features: ["AISP", "AIS v2", "Events"], dxScore: 76, notes: "Oauth helper, sandbox" },
  { id: "l1", name: "LendKit", category: "Lending", features: ["Underwriting", "Banking data", "Pricing"], dxScore: 71, notes: "SDKs JS/Java" },
  { id: "k1", name: "KYCPro", category: "KYC/KYB", features: ["Doc verify", "PEP", "Sanctions"], dxScore: 79, notes: "Coverage EU/US" },
]

export function ApiCompareTable() {
  const [rows, setRows] = useState<ApiVendor[]>([])
  const [cat, setCat] = useState<string>("All")

  useEffect(() => {
    setRows(BASE)
  }, [])

  const filtered = rows.filter(r => (cat === "All" ? true : r.category === cat))

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/60">
      <header className="px-4 py-3 border-b border-slate-800/70 flex items-center justify-between">
        <h3 className="font-semibold">Expert Reviews for Developers</h3>
        <div className="flex items-center gap-2 text-sm">
          <label className="text-slate-400 text-xs">Category</label>
          <select value={cat} onChange={e => setCat(e.target.value)} className="rounded border border-slate-800 bg-slate-950 px-2 py-1 text-xs">
            <option>All</option>
            <option>Payments</option>
            <option>Data Aggregation</option>
            <option>Lending</option>
            <option>KYC/KYB</option>
            <option>PFM</option>
            <option>Wealth</option>
          </select>
        </div>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-slate-400">
            <tr className="border-b border-slate-800/70">
              <th className="px-4 py-2">Vendor</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Key Features</th>
              <th className="px-4 py-2">DX Score</th>
              <th className="px-4 py-2">Integration Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(v => (
              <tr key={v.id} className="border-b border-slate-800/50 hover:bg-slate-900/40 transition">
                <td className="px-4 py-2 font-medium text-slate-200">{v.name}</td>
                <td className="px-4 py-2 text-slate-300">{v.category}</td>
                <td className="px-4 py-2 text-slate-300">{v.features.join(", ")}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-28 bg-slate-800 rounded overflow-hidden">
                      <div className="h-full bg-emerald-500/70" style={{ width: `${v.dxScore}%` }} />
                    </div>
                    <span className="text-slate-300 tabular-nums">{v.dxScore}</span>
                  </div>
                </td>
                <td className="px-4 py-2 text-slate-300">{v.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
