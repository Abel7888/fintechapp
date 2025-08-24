export type Startup = {
  id: string
  name: string
  sector: string
  stage: "Pre-seed" | "Seed" | "Series A" | "Series B+" | "Public"
  fundingRound: string
  valuation: string
  investors: string[]
  scores: {
    financialHealth: number // 0-100 higher is better
    compliance: number // 0-100 higher is better
    cyberRisk: number // 0-100 lower is better
    traction: number // 0-100 higher is better
    sentiment: number // 0-100 higher is better
  }
}

export type Goal = "low-risk vendor" | "high-growth investment" | "enterprise-ready solution"

export const SECTORS = ["Payments", "Lending", "Wealth", "Insurtech", "Crypto", "Infrastructure"] as const
export const STAGES = ["Pre-seed", "Seed", "Series A", "Series B+", "Public"] as const

export function mockStartups(): Startup[] {
  const names = [
    "ArcPay",
    "LendLoop",
    "Vaultwise",
    "RiskGrid",
    "ComplyFlow",
    "NeoLedger",
    "ChainShield",
    "Claimly",
    "YieldBridge",
    "AtlasBanking",
  ]
  return names.map((n, i) => {
    const sector = SECTORS[i % SECTORS.length]
    const stage = STAGES[i % STAGES.length]
    const fh = clamp(45 + rand(55))
    const comp = clamp(40 + rand(60))
    const risk = clamp(20 + rand(70))
    const tr = clamp(35 + rand(65))
    const sent = clamp(30 + rand(70))
    return {
      id: `${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`,
      name: n,
      sector,
      stage,
      fundingRound: pick(["Seed", "Seed+", "Series A", "Series B", "Bridge"]),
      valuation: `$${(50 + rand(450)).toLocaleString()}M`,
      investors: pickMany([
        "Sequoia",
        "a16z",
        "Accel",
        "Index",
        "General Catalyst",
        "Khosla",
        "Founders Fund",
        "Lightspeed",
        "QED",
        "Ribbit",
      ], 2 + (i % 2)),
      scores: {
        financialHealth: fh,
        compliance: comp,
        cyberRisk: risk,
        traction: tr,
        sentiment: sent,
      },
    }
  })
}

export function generateSWOT(s: Startup) {
  // Lightweight heuristic-based SWOT
  const { financialHealth: fh, compliance: cp, cyberRisk: cr, traction: tr, sentiment: se } = s.scores
  const strengths = [
    fh > 70 ? "Solid runway and burn control" : "Capital efficiency improving",
    tr > 70 ? "Accelerating user growth" : "Steady adoption in core segment",
    cp > 70 ? "Mature compliance posture" : "Foundational controls in place",
  ]
  const weaknesses = [
    fh < 55 ? "Limited cash reserves" : "Scaling costs rising",
    cr > 60 ? "Elevated cyber risk exposure" : "Security practices need strengthening",
  ]
  const opportunities = [
    se > 65 ? "Investor momentum and partner interest" : "Room to refine narrative for enterprise",
    tr > 60 ? `Expansion within ${s.sector} and adjacent categories` : `Niche dominance within ${s.sector}`,
  ]
  const threats = [
    cr > 65 ? "Threat actors targeting auth/payment flows" : "Compliance changes may add overhead",
    cp < 55 ? "Audit readiness risk for enterprise deals" : "Market volatility may impact multiples",
  ]
  return { strengths, weaknesses, opportunities, threats }
}

function rand(n: number) { return Math.floor(Math.random() * n) }
function clamp(v: number) { return Math.max(0, Math.min(100, v)) }
function pick<T>(arr: T[]): T { return arr[rand(arr.length)] }
function pickMany<T>(arr: T[], k: number): T[] {
  const copy = [...arr]
  const out: T[] = []
  for (let i = 0; i < k && copy.length; i++) out.push(copy.splice(rand(copy.length), 1)[0])
  return out
}
