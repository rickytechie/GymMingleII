'use client'

import SiteHeader from '../../src/components/SiteHeader'
import SiteFooter from '../../src/components/SiteFooter'

const TENETS = [
  {
    title: 'Movement as Currency',
    desc: 'Every rep, run, and ride generates on-chain attestations. Your physical output becomes a financial input — stakable, tradeable, and verifiable across the protocol.',
  },
  {
    title: 'Sovereign Communities',
    desc: 'Cities operate as independent DAO-governed pods with local treasuries, venue stakes, and cultural identity. Global protocol, local autonomy.',
  },
  {
    title: 'Radical Transparency',
    desc: 'Every $GYMM mint, every donation, every governance vote lives on-chain. The Vault dashboard streams live verifiable data — no spreadsheets, no trust-me narratives.',
  },
  {
    title: 'Economic Inclusion',
    desc: 'Account Abstraction eliminates gas fees and wallet friction. Anyone with a phone and a desire to move can participate, earn, and govern — regardless of financial starting point.',
  },
  {
    title: 'Compound Impact',
    desc: '10% quarterly to Veterans/Water/Medical. 5% monthly to American Farmers. Charity is not an afterthought — it is baked into the protocol at the consensus level.',
  },
]

export default function VisionPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader />

      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
        <section className="mb-20">
          <span className="inline-flex border-2 border-black bg-black text-[#CCFF00] px-3 py-1 text-xs font-bold uppercase tracking-wider">
            Vision
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-black sm:text-6xl">
            The Future of<br />Human Interaction
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-black/60 leading-relaxed">
            GymMingle defines a new category: the Lifestyle Protocol. A decentralized economic
            layer that sits beneath dating, fitness, travel, and social discovery — unifying them
            into a single, sovereign experience.
          </p>
          <p className="mt-4 max-w-2xl text-base text-black/50 leading-relaxed">
            We envision a world where your social capital is portable, your fitness data is
            valuable, and your community is self-governing. GymMingle is the operating system
            for the movement economy — a protocol that makes the world playfully fit.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="mb-8 text-2xl font-black text-black">Core Tenets</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {TENETS.map((t) => (
              <div key={t.title} className="border-2 border-black p-6">
                <h3 className="text-lg font-black text-black">{t.title}</h3>
                <p className="mt-2 text-sm text-black/50 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="mb-8 text-2xl font-black text-black">The Flywheel</h2>
          <div className="border-2 border-black p-8">
            <div className="grid gap-6 text-center sm:grid-cols-4">
              <div>
                <span className="inline-flex h-12 w-12 items-center justify-center border-2 border-black bg-black text-[#CCFF00] text-xl font-black">M</span>
                <p className="mt-2 text-sm font-bold text-black">Move</p>
                <p className="text-xs text-black/50">Workout & connect</p>
              </div>
              <div className="flex items-center justify-center text-2xl text-black/30">→</div>
              <div>
                <span className="inline-flex h-12 w-12 items-center justify-center border-2 border-black bg-black text-[#CCFF00] text-xl font-black">E</span>
                <p className="mt-2 text-sm font-bold text-black">Earn</p>
                <p className="text-xs text-black/50">$GYMM rewards</p>
              </div>
              <div className="flex items-center justify-center text-2xl text-black/30">→</div>
              <div>
                <span className="inline-flex h-12 w-12 items-center justify-center border-2 border-black bg-black text-[#CCFF00] text-xl font-black">G</span>
                <p className="mt-2 text-sm font-bold text-black">Govern</p>
                <p className="text-xs text-black/50">DAO voting</p>
              </div>
              <div className="flex items-center justify-center text-2xl text-black/30">→</div>
              <div>
                <span className="inline-flex h-12 w-12 items-center justify-center border-2 border-black bg-black text-[#CCFF00] text-xl font-black">I</span>
                <p className="mt-2 text-sm font-bold text-black">Impact</p>
                <p className="text-xs text-black/50">Charity donations</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-2 border-black p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-black/50">The destination</p>
          <p className="mt-2 text-xl font-black text-black">52 markets. One protocol. Infinite potential.</p>
          <p className="mt-1 text-sm text-black/50">$GYMM on Base L2 · Account Abstraction · On-chain Governance</p>
        </section>
      </div>

      <SiteFooter />
    </main>
  )
}
