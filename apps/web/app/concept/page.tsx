import type { Metadata } from 'next'
import Link from 'next/link'

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'The Concept — GymMingle',
  description:
    'How GymMingle connects athletes, venues, and shared workout matching across web and mobile.',
}

const pillars = [
  {
    title: 'Match on movement, not just proximity',
    body: 'Shared matching logic in @gymmingle/core pairs members by sport, intensity, and schedule — the same engine powers web and mobile.',
  },
  {
    title: 'Lifestyle Orchestration Engine',
    body: 'Discover NYC & Nassau venues curated by lifestyle tags and vibe scores. Powered by OpenStreetMap + Leaflet with Coastal Brutalist presentation.',
  },
  {
    title: 'MingleCoin Premium Economy',
    body: 'Earn and spend MingleCoins to unlock premium features. Gate advanced chat, kink discovery, incognito mode, and venue insights behind tiered subscriptions.',
  },
]

const steps = [
  {
    step: '01',
    title: 'Create your athlete profile',
    body: 'Tell us your sports, goals, and availability. Premium profiles earn MingleCoins for completion.',
  },
  {
    step: '02',
    title: 'Discover your vibe venues',
    body: 'Browse lifestyle-tagged venues across Manhattan, Brooklyn, and Nassau County. Filter by intensity, energy, and community.',
  },
  {
    step: '03',
    title: 'Connect with intention',
    body: 'Premium chat, lifestyle filters, and kink-aware discovery ensure every connection has the right context from message one.',
  },
]

const tiers = [
  {
    name: 'Free',
    coins: '0 / month',
    features: ['Social feed'],
    color: 'bg-slate-100 text-slate-400',
  },
  {
    name: 'Starter',
    coins: '500 / month',
    features: ['Advanced chat', 'Venue insights', 'Expanded history', 'Basic templates'],
    color: 'bg-slate-200 text-slate-700',
  },
  {
    name: 'Momentum',
    coins: '1,500 / month',
    features: ['Advanced chat', 'Unlimited likes', 'Venue insights', 'Read receipts', 'Lifestyle filters', 'Analytics', 'Exclusive local events'],
    color: 'bg-[#CCFF00] text-slate-900',
  },
  {
    name: 'Peak',
    coins: '3,500 / month',
    features: ['Advanced chat', 'Unlimited likes', 'Venue insights', 'Read receipts', 'Priority matching', 'Incognito mode', 'Verified badge', 'Lifestyle filters', 'Kink discovery', 'Partner gym access', 'Priority support', 'High coin earning'],
    color: 'bg-slate-900 text-[#CCFF00]',
  },
  {
    name: 'Apex',
    coins: '7,500 / month',
    features: ['Concierge booking', '1-on-1 coaching', 'VIP venue entry', 'All Peak features'],
    color: 'bg-purple-900 text-[#CCFF00]',
  },
]

export default function ConceptPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
        <Link href="/" className="text-xl font-black tracking-tight text-slate-900">
          GymMingle
        </Link>
        <nav className="flex gap-4">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Home
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-20 text-center sm:px-8">
        <span className="inline-flex rounded-full border border-[#CCFF00] bg-[#CCFF00]/15 px-3 py-1 text-sm font-semibold text-slate-800">
          The concept
        </span>
        <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
          Where fitness, lifestyle, and connection converge.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Curated matching that pairs you with people who align with your lifestyle, energy, and
          intentions — powered by the Lifestyle Orchestration Engine and MingleCoin economy.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="/#waitlist"
            className="rounded-full bg-[#CCFF00] px-6 py-3 font-semibold text-slate-950 transition hover:opacity-90"
          >
            Join the waitlist
          </a>
          <Link
            href="/"
            className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
          >
            Back to home
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-8 sm:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-slate-900">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <h2 className="text-2xl font-semibold text-slate-900">How it works</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-4xl font-black text-[#FF6B35]">{item.step}</p>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MINGLECOIN TIERS */}
      <section className="mx-auto max-w-6xl px-6 pb-16 sm:px-8">
        <div className="mb-8">
          <span className="inline-flex rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-600">
            MingleCoin Premium Economy
          </span>
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">Choose your tier</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div key={tier.name} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${tier.color}`}>
                {tier.name}
              </h3>
              <p className="mt-4 text-3xl font-black text-slate-900">{tier.coins}</p>
              <p className="mt-1 text-xs text-slate-500">MingleCoins per month</p>
              <ul className="mt-6 space-y-2">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#CCFF00]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24 sm:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-10 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to find your workout tribe?</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Be first in line when GymMingle launches in your city.
          </p>
          <a
            href="/#waitlist"
            className="mt-6 inline-flex rounded-full bg-[#CCFF00] px-6 py-3 font-semibold text-slate-950 transition hover:opacity-90"
          >
            Join the waitlist
          </a>
        </div>
      </section>
    </main>
  )
}
