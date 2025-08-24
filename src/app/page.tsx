import Link from 'next/link'

function NavCard({ href, title, desc, icon }: { href: string; title: string; desc: string; icon: string }) {
  return (
    <Link href={href} className="rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900/50 transition p-4 block">
      <div className="text-2xl" aria-hidden>{icon}</div>
      <div className="mt-2 font-semibold text-slate-200">{title}</div>
      <p className="mt-1 text-sm text-slate-300">{desc}</p>
    </Link>
  )
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="section pt-16 sm:pt-24">
        <div className="text-center max-w-3xl mx-auto">
          <span className="badge">Fintech Intelligence Platform</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Clarity for finance leaders, developers, and decision‑makers
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Search startups, chat with expert agents, monitor cyber risks, and evaluate Open Banking/Open Finance APIs — all in one place.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/dashboard" className="btn-primary">View Dashboard</Link>
            <Link href="#explore" className="px-4 py-2 rounded border border-slate-800 hover:border-slate-700 text-sm">Explore Product</Link>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <p className="text-3xl font-bold text-primary-400">9</p>
            <p className="text-slate-300 mt-1">Core fintech categories</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <p className="text-3xl font-bold text-primary-400">50+</p>
            <p className="text-slate-300 mt-1">Benchmark metrics</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <p className="text-3xl font-bold text-primary-400">1</p>
            <p className="text-slate-300 mt-1">Page per company, zero fluff</p>
          </div>
        </div>
      </section>

      {/* Explore Product Navigation */}
      <section id="explore" className="section mt-14">
        <h2 className="text-2xl font-semibold text-center">Explore the platform</h2>
        <p className="text-slate-300 text-center mt-2">Jump into any workspace tailored to your role.</p>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <NavCard href="/dashboard" title="Main Dashboard" desc="Executive overview, filters, and live news feed." icon="📊" />
          <NavCard href="/dashboard/agents" title="AI Agents" desc="Chat with specialist agents across domains." icon="🤖" />
          <NavCard href="/dashboard/cybersecurity" title="Cybersecurity" desc="Threat intel, frameworks, and alerts." icon="🛡️" />
          <NavCard href="/dashboard/startup-ps" title="Startup Intelligence" desc="Search, SWOTs, and side‑by‑side comparison." icon="🚀" />
          <NavCard href="/dashboard/open-apis" title="Open APIs" desc="Trends, developer reviews, ROI metrics." icon="🧩" />
        </div>
      </section>

      {/* What we do */}
      <section id="what" className="section mt-20">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-semibold">What we do</h2>
            <p className="mt-3 text-slate-300">
              We deliver decision‑grade intelligence: standardized startup profiles, expert agent guidance, cyber posture signals,
              and API evaluations that translate to ROI.
            </p>
            <ul className="mt-4 space-y-2 text-slate-200 list-disc list-inside">
              <li>Startup SWOTs and goal‑based ranking</li>
              <li>Agent chat for diligence and strategy</li>
              <li>Security alerts, frameworks, and hygiene</li>
              <li>Open API comparisons with DX & value</li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 p-6">
            <h3 className="font-medium text-primary-300">Coverage</h3>
            <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-slate-800 p-4">Payments & Transfers</div>
              <div className="rounded-lg border border-slate-800 p-4">Lending & Credit</div>
              <div className="rounded-lg border border-slate-800 p-4">Neobanks</div>
              <div className="rounded-lg border border-slate-800 p-4">WealthTech</div>
              <div className="rounded-lg border border-slate-800 p-4">InsurTech</div>
              <div className="rounded-lg border border-slate-800 p-4">RegTech</div>
              <div className="rounded-lg border border-slate-800 p-4">Blockchain & Web3</div>
              <div className="rounded-lg border border-slate-800 p-4">B2B Infra / APIs</div>
              <div className="rounded-lg border border-slate-800 p-4">Financial Inclusion</div>
            </div>
          </div>
        </div>
      </section>

      {/* How we help */}
      <section id="help" className="section mt-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <h3 className="font-semibold">For founders</h3>
            <p className="mt-2 text-slate-300">Sharpen narrative, validate metrics, and benchmark against winners.</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <h3 className="font-semibold">For investors</h3>
            <p className="mt-2 text-slate-300">Fast signal on traction, TAM, and risks to accelerate diligence.</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <h3 className="font-semibold">For operators</h3>
            <p className="mt-2 text-slate-300">Landscape views to spot partnerships, gaps, and playbooks.</p>
          </div>
        </div>
      </section>

      {/* UVP */}
      <section id="uvp" className="section mt-20">
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-tr from-slate-900 to-slate-800 p-8">
          <h2 className="text-2xl font-semibold">Our unique value proposition</h2>
          <ul className="mt-4 grid md:grid-cols-3 gap-4 text-slate-200">
            <li className="rounded-lg border border-slate-800 p-4">Standardized one-pager across 9 categories</li>
            <li className="rounded-lg border border-slate-800 p-4">Metrics that matter: AUM, take rate, loss ratios, TVL</li>
            <li className="rounded-lg border border-slate-800 p-4">Clear regulatory lens (AML/KYC, licensing, capital)</li>
            <li className="rounded-lg border border-slate-800 p-4">Actionable comps and unit economics</li>
            <li className="rounded-lg border border-slate-800 p-4">Designed for decision speed; zero fluff</li>
            <li className="rounded-lg border border-slate-800 p-4">Founder-friendly: iterate quickly with us</li>
          </ul>
        </div>
      </section>

      {/* Categories & metrics */}
      <section id="categories" className="section mt-20">
        <h2 className="text-2xl font-semibold">Core types of fintech startups</h2>
        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Payments & Money Transfers',
              bullets: [
                'Digital wallets (Venmo, CashApp, Paytm)',
                'Cross-border payments & remittances (Wise, Remitly)',
                'Merchant gateways (Stripe, Adyen)',
                'BNPL platforms (Affirm, Klarna)',
                'Metrics: transaction volume, take rate, fraud rate, licenses',
              ],
            },
            {
              title: 'Lending & Credit',
              bullets: [
                'P2P lending, SME financing, microcredit',
                'BNPL lending overlap',
                'Metrics: loan book growth, defaults, risk models, capital',
              ],
            },
            {
              title: 'Neobanks / Challenger Banks',
              bullets: [
                'Digital-only and niche banks',
                'Metrics: CAC, deposits, churn, unit economics',
              ],
            },
            {
              title: 'WealthTech & Robo-Advisors',
              bullets: [
                'Automated investing, social trading, micro-investing, crypto',
                'Metrics: AUM, CAC-to-LTV, retention, track record',
              ],
            },
            {
              title: 'InsurTech',
              bullets: [
                'Digital-first, usage-based, embedded, reinsurance tech',
                'Metrics: claims/loss ratios, underwriting margins, compliance',
              ],
            },
            {
              title: 'RegTech',
              bullets: [
                'AML/KYC, fraud & identity, compliance automation',
                'Metrics: accuracy, false positive rate, adoption',
              ],
            },
            {
              title: 'Blockchain & Crypto / Web3',
              bullets: [
                'Tokenization, DeFi, custody, stablecoins, NFT finance',
                'Metrics: TVL, audits, regulatory status, growth',
              ],
            },
            {
              title: 'B2B Infrastructure / APIs',
              bullets: [
                'BaaS, Open Banking, data aggregation, fraud prevention',
                'Metrics: API volume, bank partnerships, dev adoption',
              ],
            },
            {
              title: 'Financial Inclusion & Emerging Markets',
              bullets: [
                'Mobile banking, micro-savings, alternative credit scoring',
                'Metrics: active users, repayment, impact',
              ],
            },
          ].map((c) => (
            <div key={c.title} className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
              <h3 className="font-semibold">{c.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-300 list-disc list-inside">
                {c.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section mt-20">
        <h2 className="text-2xl font-semibold">FAQ</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {[
            {
              q: 'Who is this for?',
              a: 'Founders, investors, and operators who want fast clarity on fintech startups.'
            },
            {
              q: 'What do I get?',
              a: 'A crisp, standardized one-pager with key metrics, risks, and comps.'
            },
            {
              q: 'Can you customize analyses?',
              a: 'Yes — we tailor to your thesis, geography, or stage.'
            },
            {
              q: 'How fast is delivery?',
              a: 'Typical turnaround is 2–4 business days per company.'
            },
          ].map((f) => (
            <div key={f.q} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <p className="font-medium">{f.q}</p>
              <p className="text-slate-300 mt-2 text-sm">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section mt-20 pb-24">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold">Contact us</h2>
          <p className="mt-2 text-slate-300">Tell us what youre exploring. Well get back within 1 business day.</p>
          <form className="mt-6 grid gap-3" method="post" action="/api/contact">
            <input name="name" placeholder="Your name" className="rounded border border-slate-800 bg-slate-900 px-3 py-2" required />
            <input type="email" name="email" placeholder="Email" className="rounded border border-slate-800 bg-slate-900 px-3 py-2" required />
            <textarea name="message" placeholder="How can we help?" className="rounded border border-slate-800 bg-slate-900 px-3 py-2 h-32" required />
            <button className="btn-primary w-fit" type="submit">Send message</button>
          </form>
        </div>
      </section>
    </>
  )
}
