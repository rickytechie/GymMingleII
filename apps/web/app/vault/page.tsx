'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const TransparencyDashboard = dynamic(() => import('../../src/components/TransparencyDashboard'), { ssr: false })

const ECONOMIC_METRICS = {
  mcap: '$4,820,000',
  circulatingSupply: '48,200,000 MC',
  totalSupply: '100,000,000 MC',
  avgDailyVolume: '$142,000',
  stakedTokens: '12,400,000 MC',
  activeWallets: '8,234',
  avgTransaction: '320 MC',
  premiumUsers: '1,847',
  venuePartners: '312',
}

const MILESTONES = [
  { date: '2026 Q1', event: 'Mainnet launch · 10,000 user milestone', status: 'achieved' },
  { date: '2026 Q2', event: 'Venue partnership program · Mobile beta', status: 'achieved' },
  { date: '2026 Q3', event: 'Cross-chain bridge · Token listing', status: 'in_progress' },
  { date: '2026 Q4', event: 'Global expansion · Institutional staking', status: 'pending' },
  { date: '2027 Q1', event: 'DAI integration · DAO governance', status: 'pending' },
]

export default function VaultPage() {
  const [password, setPassword] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState('')

  const handleUnlock = async () => {
    setError('')
    try {
      const res = await fetch('/api/auth/vault', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        setUnlocked(true)
      } else {
        setError('Invalid credentials')
      }
    } catch {
      setError('Network error. Please try again.')
    }
  }

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-white text-black">
        <nav className="flex w-full items-center justify-between border-b-2 border-black bg-white px-6 py-4 sm:px-8">
          <Link href="/" className="block">
            <p className="text-lg font-black tracking-tight text-black">GymMingle</p>
            <p className="text-xs font-bold text-black/50">Strategy Vault</p>
          </Link>
          <Link
            href="/"
            className="border-2 border-black px-4 py-2 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-black hover:text-white"
          >
            ← Back to app
          </Link>
        </nav>
        <div className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-6">
          <div className="w-full border-2 border-black p-8">
            <span className="inline-flex border-2 border-black bg-black text-[#CCFF00] px-3 py-1 text-xs font-bold uppercase tracking-wider">
              Restricted Access
            </span>
            <h1 className="mt-4 text-2xl font-black text-black">Strategy Vault</h1>
            <p className="mt-2 text-sm text-black/50">
              This section is for investors and authorized partners. Enter your access code to continue.
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
              placeholder="Access code"
              className="mt-6 w-full border-2 border-black bg-white px-4 py-3 text-sm font-bold text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black"
            />
            {error && (
              <p className="mt-2 text-xs font-bold text-red-500">{error}</p>
            )}
            <button
              onClick={handleUnlock}
              className="mt-4 w-full border-2 border-black bg-black px-6 py-3 text-sm font-bold text-[#CCFF00] transition hover:opacity-90"
            >
              Unlock Vault
            </button>
            <p className="mt-4 text-xs text-center text-black/40">
              Authorized investors contact <a href="mailto:hello@rkyrnsm.com" className="underline hover:text-black">hello@rkyrnsm.com</a>
            </p>
          </div>
        </div>
        <footer className="border-t-2 border-black bg-white py-8 text-center text-xs text-black/50">
          <p>&copy; 2026 RICKY RANSOM, LLC · Confidential</p>
        </footer>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <nav className="flex w-full items-center justify-between border-b-2 border-black bg-white px-6 py-4 sm:px-8">
        <Link href="/" className="block">
          <p className="text-lg font-black tracking-tight text-black">GymMingle</p>
          <p className="text-xs font-bold text-black/50">Strategy Vault</p>
        </Link>
        <Link
          href="/"
          className="border-2 border-black px-4 py-2 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-black hover:text-white"
        >
          ← Back to app
        </Link>
      </nav>

      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8">
        {/* Hero */}
        <div className="mb-16">
          <span className="inline-flex border-2 border-black bg-black text-[#CCFF00] px-3 py-1 text-xs font-bold uppercase tracking-wider">
            Strategy Vault · Confidential
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-black sm:text-6xl">
            Investor & Economic<br />Overview
          </h1>
          <p className="mt-4 max-w-2xl text-base text-black/60">
            $GYMM powers the GymMingle lifestyle orchestration engine. Below are the core economic
            metrics, charity operations, and strategic milestones. This vault is a living document
            updated quarterly.
          </p>
        </div>

        {/* $GYMM Utility */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-black text-black">$GYMM Utility</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border-2 border-black p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-black/50">Conversion</p>
              <p className="mt-2 text-xl font-black text-black">100 MC = $1 USD</p>
              <p className="mt-1 text-xs text-black/40">Fixed rate · MingleCoin to USD peg</p>
            </div>
            <div className="border-2 border-black p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-black/50">Use Cases</p>
              <ul className="mt-2 space-y-1 text-sm text-black/70">
                <li>• Premium subscriptions (Starter → Apex)</li>
                <li>• Venue bookings & perks</li>
                <li>• Curated date planning</li>
                <li>• Cross-platform lifestyle access</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Economic Metrics */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-black text-black">Economic Dashboard</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(ECONOMIC_METRICS).map(([key, value]) => (
              <div key={key} className="border-2 border-black bg-white p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-black/50">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="mt-1 text-lg font-black text-black">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Investor Materials */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-black text-black">Investor Materials</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href="/investor-manifesto.pdf"
              className="group border-2 border-black p-6 transition hover:bg-black"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-black/50 group-hover:text-white/50">
                Download
              </p>
              <p className="mt-2 text-xl font-black text-black group-hover:text-white">
                Investor Manifesto
              </p>
              <p className="mt-1 text-sm text-black/50 group-hover:text-white/60">
                Vision, mission, and the $GYMM economic thesis.
              </p>
            </a>
            <a
              href="/pitch-deck.pdf"
              className="group border-2 border-black p-6 transition hover:bg-black"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-black/50 group-hover:text-white/50">
                Download
              </p>
              <p className="mt-2 text-xl font-black text-black group-hover:text-white">
                VC Pitch Deck
              </p>
              <p className="mt-1 text-sm text-black/50 group-hover:text-white/60">
                Series A deck — market sizing, traction, and financials.
              </p>
            </a>
            <a
              href="/tokenomics.pdf"
              className="group border-2 border-black p-6 transition hover:bg-black"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-black/50 group-hover:text-white/50">
                Download
              </p>
              <p className="mt-2 text-xl font-black text-black group-hover:text-white">
                Tokenomics Model
              </p>
              <p className="mt-1 text-sm text-black/50 group-hover:text-white/60">
                Supply schedule, vesting, emissions, and staking yields.
              </p>
            </a>
            <a
              href="/financial-audit.pdf"
              className="group border-2 border-black p-6 transition hover:bg-black"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-black/50 group-hover:text-white/50">
                Download
              </p>
              <p className="mt-2 text-xl font-black text-black group-hover:text-white">
                Financial Audit
              </p>
              <p className="mt-1 text-sm text-black/50 group-hover:text-white/60">
                Q2 2026 independent audit report.
              </p>
            </a>
          </div>
        </section>

        {/* Milestones */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-black text-black">Strategic Milestones</h2>
          <div className="space-y-2">
            {MILESTONES.map((m) => (
              <div key={m.date} className="flex items-center justify-between border-2 border-black p-4">
                <div className="flex items-center gap-4">
                  <span className={`h-3 w-3 ${
                    m.status === 'achieved' ? 'bg-[#CCFF00]' :
                    m.status === 'in_progress' ? 'bg-black' : 'bg-black/20'
                  }`} />
                  <div>
                    <span className="text-sm font-bold text-black">{m.date}</span>
                    <p className="text-xs text-black/50">{m.event}</p>
                  </div>
                </div>
                <span className={`border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  m.status === 'achieved' ? 'border-[#CCFF00] bg-[#CCFF00] text-black' :
                  m.status === 'in_progress' ? 'border-black bg-black text-white' :
                  'border-black/20 text-black/40'
                }`}>
                  {m.status === 'in_progress' ? 'In Progress' : m.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Transparency Dashboard */}
        <section className="mb-16">
          <div className="mb-6 flex items-center gap-3">
            <h2 className="text-2xl font-black text-black">Charity & Transparency</h2>
            <span className="border-2 border-black bg-black text-[#CCFF00] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
              Live
            </span>
          </div>
          <TransparencyDashboard />
        </section>
      </div>

      <footer className="border-t-2 border-black bg-white py-8 text-center text-xs text-black/50">
        <p>Strategy Vault · Confidential · Updated Quarterly</p>
        <p className="mt-1">&copy; 2026 RICKY RANSOM, LLC · All metrics are independently audited</p>
      </footer>
    </main>
  )
}
