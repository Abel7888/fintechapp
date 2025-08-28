"use client"

import { useEffect, useRef, useState } from "react"
import { AgentTag, type AgentType } from "./AgentTag"

export function AgentChatBox({ agent }: { agent: AgentType }) {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: greeting(agent) },
  ])
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  const send = async () => {
    const q = input.trim()
    if (!q || loading) return
    setInput("")
    setMessages(m => [...m, { role: "user", content: q }])
    setLoading(true)
    // Mock thinking
    await new Promise(r => setTimeout(r, 400))
    const reply = respond(agent, q)
    setMessages(m => [...m, { role: "assistant", content: reply }])
    setLoading(false)
  }

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/70 flex flex-col overflow-hidden">
      <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between">
        <AgentTag agent={agent} />
        <div className="text-[11px] text-slate-400">Beta</div>
      </div>
      <div ref={listRef} className="flex-1 p-3 space-y-2 overflow-y-auto min-h-[220px] max-h-[320px]">
        {messages.map((m, i) => (
          <div key={i} className={`text-sm leading-relaxed ${m.role === "assistant" ? "text-slate-200" : "text-slate-300"}`}>
            {m.role === "assistant" ? (
              <span className="mr-2 text-slate-400">AI:</span>
            ) : (
              <span className="mr-2 text-slate-500">You:</span>
            )}
            {m.content}
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-slate-800 flex items-center gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="Ask for insights, risks, comps…"
          className="flex-1 rounded border border-slate-800 bg-slate-950 px-3 py-2 text-sm"
        />
        <button onClick={send} disabled={loading} className="btn-primary text-sm px-3 py-2">
          {loading ? "Thinking…" : "Send"}
        </button>
      </div>
    </div>
  )
}

function greeting(agent: AgentType) {
  const intros: Record<AgentType, string> = {
    "Market Intelligence": "I scan market moves, category growth, and pricing shifts.",
    "Venture Due Diligence": "I assess team, traction, comps, and diligence flags.",
    "Financial Risk": "I stress-test runway, exposures, and risk concentrations.",
    "Regulation & Policy": "I track policies, guidance, and compliance implications.",
    "Valuation & Deal Structuring": "I benchmark multiples and propose deal mechanics.",
    "Investor Sentiment & Networking": "I gauge signal across networks and warm paths.",
    "Cybersecurity": "I monitor threats, vulnerabilities, and control posture across your stack.",
  }
  return intros[agent]
}

function respond(agent: AgentType, q: string) {
  // Simple heuristic reply; later we’ll replace with server + OpenAI API
  const base = q.toLowerCase()
  const angle: Record<AgentType, string[]> = {
    "Market Intelligence": [
      "Category momentum:",
      "Pricing dynamics:",
      "Geo expansion notes:",
    ],
    "Venture Due Diligence": [
      "Team-market fit:",
      "Go-to-market risks:",
      "Comparable rounds:",
    ],
    "Financial Risk": [
      "Runway analysis:",
      "Counterparty exposure:",
      "Scenario stress:",
    ],
    "Regulation & Policy": [
      "Regulatory watchlist:",
      "Licensing considerations:",
      "Compliance roadmap:",
    ],
    "Valuation & Deal Structuring": [
      "Valuation range:",
      "Term sheet levers:",
      "Milestone structure:",
    ],
    "Investor Sentiment & Networking": [
      "Syndicate appetite:",
      "Narrative resonance:",
      "Warm intros map:",
    ],
    "Cybersecurity": [
      "Threat landscape:",
      "Vulnerability exposure:",
      "Control recommendations:",
    ],
  }
  const bullets = angle[agent]
  const tail = base.includes("risk") ? "Focus: risk mitigation paths." : base.includes("growth") ? "Focus: efficient scaling." : ""
  return `${bullets[0]} high-level view. ${bullets[1]} key drivers. ${bullets[2]} next steps. ${tail}`.replace(/\s{2,}/g, " ")
}
