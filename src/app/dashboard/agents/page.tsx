"use client"

import Link from "next/link"
import { AgentChatBox } from "@/components/AgentChatBox"
import type { AgentType } from "@/components/AgentTag"

const AGENTS: AgentType[] = [
  "Market Intelligence",
  "Venture Due Diligence",
  "Financial Risk",
  "Regulation & Policy",
  "Valuation & Deal Structuring",
  "Investor Sentiment & Networking",
]

export default function AgentsDashboardPage() {
  return (
    <section className="section pt-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Agent Workbench</h1>
        <Link href="/dashboard" className="text-sm text-primary-300 hover:underline">Back to overview</Link>
      </div>
      <p className="text-slate-300 mt-2 max-w-3xl">
        Six specialized agents collaborate like a CFO + VC partner + market strategist. Ask each agent questions in their lane; later we will wire them to OpenAI for deeper reasoning.
      </p>

      <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {AGENTS.map(a => (
          <AgentChatBox key={a} agent={a} />
        ))}
      </div>
    </section>
  )
}
