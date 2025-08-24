"use client"

import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'
import { ApiTrendsFeed } from '@/components/ApiTrendsFeed'
import { ApiCompareTable } from '@/components/ApiCompareTable'
import { RoiMetrics } from '@/components/RoiMetrics'

export default function OpenAPIsPage() {
  const { user, loading } = useAuth()
  if (loading) return <section className="section pt-16">Loading…</section>
  if (!user) {
    return (
      <section className="section pt-16">
        <h1 className="text-2xl font-semibold">Please sign in</h1>
        <p className="text-slate-300 mt-2">Access is limited to signed-in users.</p>
        <div className="mt-4 flex gap-2">
          <Link href="/signin" className="btn-primary">Sign in</Link>
          <Link href="/signup" className="px-3 py-2 rounded border border-slate-800 hover:border-slate-700">Sign up</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="section pt-16">
      <div className="max-w-4xl">
        <h1 className="text-2xl font-semibold">Open Banking & Open Finance APIs</h1>
        <p className="text-slate-300 mt-2">
          Bring clarity to a fast-moving landscape. Evaluate impactful tools and integrations driving digital transformation.
        </p>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2"><ApiTrendsFeed /></div>
        <div className="lg:col-span-1"><RoiMetrics /></div>
      </div>

      <div className="mt-6">
        <ApiCompareTable />
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <HubCard title="Decision-Maker Hub" points={[
          'Track innovations across payments, data, and lending',
          'Vendor comparisons and due diligence readiness',
          'Security updates aligned to API surface area',
          'Market opportunities and adoption signals',
        ]} />
        <HubCard title="Why It Matters" points={[
          'Open Banking is a strategic advantage beyond compliance',
          'Spot high-growth API startups and optimize operations',
          'Ship next-gen financial products with trusted integrations',
        ]} />
        <HubCard title="What’s Next" points={[
          'Wire to live providers (Plaid, Tink, Yapily, Stripe, etc.)',
          'Add real developer DX scoring from docs, SDKs, and SLAs',
          'Integrate ROI calculators from your cost and revenue inputs',
        ]} />
      </div>
    </section>
  )
}

function HubCard({ title, points }: { title: string; points: string[] }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
      <div className="font-semibold text-slate-200">{title}</div>
      <ul className="mt-2 space-y-1 text-sm text-slate-300">
        {points.map((p, i) => (
          <li key={i}>✅ {p}</li>
        ))}
      </ul>
    </div>
  )
}
