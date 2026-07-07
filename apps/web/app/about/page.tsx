'use client'

import Link from 'next/link'

const SERVICES = [
  { service: 'Brand Architecture & Identity', scope: 'Full-stack creative direction', rate: '$150/hr' },
  { service: 'Full-Stack Engineering', scope: 'Next.js, React, Node, Supabase, Web3', rate: '$200/hr' },
  { service: 'UI/UX Strategy', scope: 'Coastal Brutalist, conversion-optimized', rate: '$175/hr' },
  { service: 'Web3 & Tokenomics Consulting', scope: 'Smart contracts, token engineering', rate: '$250/hr' },
  { service: 'Pitch Deck & Investor Materials', scope: 'Strategic narrative design', rate: '$5k flat' },
  { service: 'Fractional CTO Advisory', scope: 'Technical due diligence, architecture', rate: '$15k/mo' },
]

const FIVE_CS = [
  { letter: 'C', word: 'Connect', desc: 'Bridge vision to execution through intentional networks and strategic alignment.' },
  { letter: 'C', word: 'Communicate', desc: 'Distill complexity into narrative. Clear story, clear outcome.' },
  { letter: 'C', word: 'Collaborate', desc: 'Build with, not for. Partnership-driven development.' },
  { letter: 'C', word: 'Create', desc: 'Ship artifacts that compound — code, brand, culture.' },
  { letter: 'C', word: 'Cultivate', desc: 'Grow systems, teams, and communities that outlast any single product.' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <nav className="flex w-full items-center justify-between border-b-2 border-black bg-white px-6 py-4 sm:px-8">
        <Link href="/" className="block">
          <p className="text-lg font-black tracking-tight text-black">GymMingle</p>
          <p className="text-xs font-bold text-black/50">by RKYRNSM</p>
        </Link>
        <Link
          href="/"
          className="border-2 border-black px-4 py-2 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-black hover:text-white"
        >
          ← Back
        </Link>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
        <section className="mb-20">
          <span className="inline-flex border-2 border-black bg-black text-[#CCFF00] px-3 py-1 text-xs font-bold uppercase tracking-wider">
            Founder Story
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-black sm:text-6xl">
            Ricky Ransom
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-black/60 leading-relaxed">
            Founder of GymMingle and principal architect of the Global Lifestyle Orchestration Engine.
            Ricky Ransom builds at the intersection of fitness, technology, and human
            connection — shipping products that make movement social, economies accessible, and
            communities sovereign.
          </p>
          <p className="mt-4 max-w-2xl text-base text-black/50 leading-relaxed">
            With a background spanning full-stack engineering, brand architecture, and tokenized
            incentive design, Ransom operates as a fractional CTO, creative director, and founding
            engineer for ventures that blur the line between lifestyle and protocol. GymMingle is the
            flagship — a fitness-dating ecosystem powered by $GYMM across 52 global markets. The
            mission is simple: make the world playfully fit.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="mb-8 text-2xl font-black text-black">The 5 C's</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FIVE_CS.map((c) => (
              <div key={c.word} className="border-2 border-black p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center border-2 border-black bg-black text-[#CCFF00] text-lg font-black">
                  {c.letter}
                </span>
                <h3 className="mt-4 text-lg font-black text-black">{c.word}</h3>
                <p className="mt-2 text-sm text-black/50 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <div className="mb-6 flex items-center gap-3">
            <h2 className="text-2xl font-black text-black">RKYRNSM Services</h2>
            <span className="border-2 border-black bg-black text-[#CCFF00] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
              For hire
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-2 border-black">
                  <th className="p-3 text-left font-bold text-black">Service</th>
                  <th className="p-3 text-left font-bold text-black">Scope</th>
                  <th className="p-3 text-right font-bold text-black">Rate</th>
                </tr>
              </thead>
              <tbody>
                {SERVICES.map((s) => (
                  <tr key={s.service} className="border-b border-black/20">
                    <td className="p-3 font-bold text-black">{s.service}</td>
                    <td className="p-3 text-black/60">{s.scope}</td>
                    <td className="p-3 text-right font-bold text-black">{s.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-black/40 text-right">
            All engagements under RKYRNSM
          </p>
        </section>

        <section className="border-2 border-black p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-black/50">Get in touch</p>
          <p className="mt-2 text-lg font-black text-black">Let's build something.</p>
          <p className="mt-1 text-sm text-black/50">
            Inquiries — fractional CTO, creative direction, or collaboration.
          </p>
          <a
            href="mailto:hello@rkyrnsm.com"
            className="mt-4 inline-block border-2 border-black bg-black px-6 py-3 text-sm font-bold text-[#CCFF00] transition hover:opacity-90"
          >
            hello@rkyrnsm.com
          </a>
        </section>
      </div>

      <footer className="border-t-2 border-black bg-white py-8 text-center text-xs text-black/50">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-6 px-6">
          <Link href="/vault" className="border-2 border-black bg-black px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[#CCFF00] transition hover:opacity-90">
            🔒 Strategy Vault
          </Link>
        </div>
        <p className="mt-3">Built and Designed by RKYRNSM | &copy; 2026</p>
      </footer>
    </main>
  )
}
