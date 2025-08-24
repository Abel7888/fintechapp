"use client"

export function ExecutiveSummary({
  name,
  portfolioCount,
  alertsCount,
  themes,
}: {
  name?: string | null
  portfolioCount: number
  alertsCount: number
  themes: string[]
}) {
  return (
    <section className="rounded-xl border border-slate-800 bg-gradient-to-br from-slate-950 to-slate-900 p-5 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-semibold">Executive Summary</h2>
          <p className="text-slate-300 mt-1 text-sm md:text-base">
            {name ? `Good day, ${name.split("@")[0]}.` : "Good day."} Here's what matters most today across your focus areas.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full md:w-auto">
          <KPI label="Portfolio" value={String(portfolioCount)} sub="tracked companies" />
          <KPI label="Priority alerts" value={String(alertsCount)} sub="last 24h" />
          <KPI label="Themes" value={String(themes.length)} sub="active" />
        </div>
      </div>

      <div className="mt-4 grid sm:grid-cols-3 gap-3">
        {themes.map((t, i) => (
          <div key={i} className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
            <div className="text-xs text-slate-400">Today’s spotlight</div>
            <div className="mt-1 font-medium">{t}</div>
            <div className="text-xs text-slate-400 mt-1">Auto-curated across CFO, VC, and market angles</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function KPI({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-center">
      <div className="text-2xl font-semibold tracking-tight">{value}</div>
      <div className="text-xs text-slate-400">{label}</div>
      {sub && <div className="text-[11px] text-slate-500 mt-0.5">{sub}</div>}
    </div>
  )
}
