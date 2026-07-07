'use client'

import SiteHeader from '../../src/components/SiteHeader'
import SiteFooter from '../../src/components/SiteFooter'

const PILLARS = [
  {
    title: 'DePIN — Decentralized Physical Infrastructure',
    desc: 'GymMingle transforms fitness venues, equipment, and community spaces into tokenized network assets. Members stake $GYMM to activate venue partnerships, earn rewards for participation, and govern infrastructure decisions through on-chain voting.',
  },
  {
    title: 'SocialFi — Social Finance Protocol',
    desc: 'Every workout match, date, and community interaction generates measurable social capital. GymMingle quantifies this as on-chain reputation, enabling members to earn, borrow, and transact based on their social graph — not just their wallet balance.',
  },
  {
    title: 'Tokenized Incentive Design',
    desc: '$GYMM powers a multi-tier premium economy (Starter → Apex) where subscription fees, venue bookings, and date planning are settled in protocol currency. 10% of revenue is donated quarterly to Veterans/Water/Medical charities. 5% monthly to American Farmers.',
  },
  {
    title: 'Global Lifestyle Orchestration',
    desc: 'From New York to Nairobi, GymMingle unifies 52 city markets under a single lifestyle protocol. Members access curated venues, AI-driven matchmaking, and cross-border social networks — all interoperable through the Base L2 Ethereum rollup.',
  },
]

export default function ProjectPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader />

      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
        <section className="mb-20">
          <span className="inline-flex border-2 border-black bg-black text-[#CCFF00] px-3 py-1 text-xs font-bold uppercase tracking-wider">
            Project Overview
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-black sm:text-6xl">
            From Physical Fitness<br />to Economic Protocol
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-black/60 leading-relaxed">
            GymMingle began as a workout-matching app. It evolved into a global lifestyle
            orchestration engine — a DePIN/SocialFi protocol that rewards movement, connection,
            and community participation with real economic value.
          </p>
          <p className="mt-4 max-w-2xl text-base text-black/50 leading-relaxed">
            The fitness industry generates over $100B annually, yet the value flows exclusively to
            centralized platforms and venue owners. GymMingle flips this model: members become
            stakeholders. Every workout logged, every date planned, every venue visited generates
            protocol yield that flows back to the community.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="mb-8 text-2xl font-black text-black">Protocol Pillars</h2>
          <div className="space-y-6">
            {PILLARS.map((p) => (
              <div key={p.title} className="border-2 border-black p-6">
                <h3 className="text-lg font-black text-black">{p.title}</h3>
                <p className="mt-2 text-sm text-black/50 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-2 border-black bg-black p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#CCFF00]">
            Base L2 · Account Abstraction · ERC-20 $GYMM
          </p>
          <p className="mt-2 text-lg font-black text-white">
            Infrastructure for the movement economy.
          </p>
        </section>
      </div>

      <SiteFooter />
    </main>
  )
}
