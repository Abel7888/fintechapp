"use client"

export type AgentType =
  | "Market Intelligence"
  | "Venture Due Diligence"
  | "Financial Risk"
  | "Regulation & Policy"
  | "Valuation & Deal Structuring"
  | "Investor Sentiment & Networking"
  | "Cybersecurity"

const colorMap: Record<AgentType, string> = {
  "Market Intelligence": "bg-blue-500/15 text-blue-300 border-blue-500/30",
  "Venture Due Diligence": "bg-purple-500/15 text-purple-300 border-purple-500/30",
  "Financial Risk": "bg-amber-500/15 text-amber-300 border-amber-500/30",
  "Regulation & Policy": "bg-rose-500/15 text-rose-300 border-rose-500/30",
  "Valuation & Deal Structuring": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  "Investor Sentiment & Networking": "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  "Cybersecurity": "bg-orange-500/15 text-orange-300 border-orange-500/30",
}

export function AgentTag({ agent }: { agent: AgentType }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[11px] font-medium ${colorMap[agent]}`}>
      {agent === "Cybersecurity" ? (
        <span aria-hidden className="text-xs leading-none">⚠️</span>
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      )}
      {agent}
    </span>
  )
}
