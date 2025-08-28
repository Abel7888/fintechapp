# Fintech Intelligence Platform

A Next.js 14 app delivering value-driven dashboards for fintech insights:

- Main Dashboard (executive overview, filters, live feed)
- AI Agents (specialist assistance across domains)
- Cybersecurity (threat intel, frameworks, alerts)
- Startup Intelligence (search, SWOTs, goal-based ranking, comparison)
- Open APIs (trends, expert comparisons, ROI metrics)

## Tech Stack
- Next.js 14, React 18
- Tailwind CSS
- Firebase Auth (client-side)
- Prisma + SQLite (for local dev only)

## Getting Started (Local)
1. Clone the repo
2. Create a `.env.local` from `.env.example` and fill values
3. Install deps and run

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Visit http://localhost:3000

## Environment Variables
Only these are required for our current UI on Vercel (client-side Firebase):

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

For local dev with Prisma (optional), `DATABASE_URL` (SQLite) is included in `.env.example`.

## Deployment (Vercel)
1. Push to GitHub (this repo is configured)
2. On Vercel: New Project → Import your GitHub repo
3. Framework: Next.js (auto)
4. Build: `next build` (default)
5. Node: 18 or 20
6. Add environment variables listed above
7. Deploy

Notes:
- We removed the NextAuth API route: `src/app/api/auth/[...nextauth]/route.ts` to simplify deployment with Firebase Auth.
- If a deploy shows the message that looks like a commit title (e.g., `chore: remove NextAuth API route for Vercel deploy`), that is expected—Vercel labels deployments by commit message.

## Key Paths
- Landing page: `src/app/page.tsx`
- Main Dashboard: `src/app/dashboard/page.tsx`
- AI Agents: `src/app/dashboard/agents/page.tsx`
- Cybersecurity: `src/app/dashboard/cybersecurity/page.tsx`
- Startup Intelligence: `src/app/dashboard/startup-ps/page.tsx`
- Open APIs: `src/app/dashboard/open-apis/page.tsx`
- Firebase init: `src/lib/firebase.ts`

## Security
- Do not commit `.env` files. `.gitignore` covers `.env`, `.env.local`, `.env.*.local`.
- Never hardcode secrets in source files.

## License
Proprietary. All rights reserved.
