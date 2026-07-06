/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How It Works — GymMingle',
  description: 'The 3-Stage Curated Date Engine powers every GymMingle connection. Sweat → Nourish → Unwind.',
}

const stages = [
  {
    icon: '🏋️',
    title: 'Stage 1: Sweat',
    subtitle: 'Break a sweat together',
    body: 'Find gyms, boxing clubs, yoga studios, skate parks, and outdoor trails near you. Our Lifestyle Engine surfaces the top 50 venues in your city sorted by rating and vibe.',
    categories: 'Fitness, Outdoor, Skatepark',
  },
  {
    icon: '🍽️',
    title: 'Stage 2: Nourish',
    subtitle: 'Share a meal or craft cocktail',
    body: 'From fine dining to hidden cocktail bars, discover the best spots to refuel and connect. Every curated date includes a dining or nightlife stop matched to your energy.',
    categories: 'Dining, Nightlife, Music',
  },
  {
    icon: '💆',
    title: 'Stage 3: Unwind',
    subtitle: 'Relax and reconnect',
    body: 'Cap off your date with a spa, bathhouse, art gallery, or entertainment venue. The final stage is designed for deeper connection — or just pure relaxation.',
    categories: 'Wellness, Bathhouse, Arts, StripClub',
  },
]

const economy = [
  { tier: 'Free', cost: '$0', coins: '0 MC/mo', color: 'bg-slate-100 text-slate-400' },
  { tier: 'Starter', cost: '$5', coins: '500 MC/mo', color: 'bg-slate-200 text-slate-700' },
  { tier: 'Momentum', cost: '$15', coins: '1,500 MC/mo', color: 'bg-[#CCFF00] text-slate-900' },
  { tier: 'Peak', cost: '$35', coins: '3,500 MC/mo', color: 'bg-slate-900 text-[#CCFF00]' },
  { tier: 'Apex', cost: '$75', coins: '7,500 MC/mo', color: 'bg-purple-900 text-[#CCFF00]' },
]

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
        <Link href="/" className="text-xl font-black tracking-tight text-slate-900">
          GymMingle
        </Link>
        <nav className="flex gap-4">
          <Link href="/concept" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Concept
          </Link>
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Home
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-20 text-center sm:px-8">
        <span className="inline-flex border-2 border-slate-900 bg-slate-900 text-[#CCFF00] px-3 py-1 text-sm font-bold uppercase tracking-wider">
          3-Stage Curated Date Engine
        </span>
        <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
          Sweat → Nourish → Unwind
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Every GymMingle date is a curated 3-stage experience. Choose your city, pick your duration,
          and let the engine build the perfect date from 52 markets and 10 venue categories.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="/"
            className="border-2 border-slate-900 bg-slate-900 text-[#CCFF00] px-6 py-3 font-bold hover:bg-slate-800 transition-colors"
          >
            Plan your date
          </a>
        </div>
      </section>

      {/* 3 Stages */}
      <section className="mx-auto max-w-6xl px-6 pb-16 sm:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {stages.map((s) => (
            <div key={s.title} className="border-2 border-slate-200 bg-white p-8">
              <span className="text-4xl">{s.icon}</span>
              <h2 className="mt-4 text-xl font-black text-slate-900">{s.title}</h2>
              <p className="mt-1 text-sm font-bold text-slate-500 uppercase tracking-wider">{s.subtitle}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{s.body}</p>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Categories: {s.categories}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Duration */}
      <section className="mx-auto max-w-4xl px-6 pb-16 text-center sm:px-8">
        <div className="border-2 border-slate-200 bg-white p-10">
          <h2 className="text-2xl font-black text-slate-900">Choose your duration</h2>
          <div className="mt-6 flex justify-center gap-4">
            {[30, 60, 90, 120].map((d) => (
              <div key={d} className="border-2 border-slate-200 px-6 py-3">
                <p className="text-xl font-black text-slate-900">{d}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">minutes</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Longer durations unlock more venue categories. <strong>120 min</strong> gives you full access to all 10 categories.
          </p>
        </div>
      </section>

      {/* MingleCoin Economy */}
      <section className="mx-auto max-w-6xl px-6 pb-16 sm:px-8">
        <h2 className="text-2xl font-black text-slate-900 text-center">
          MingleCoin Premium Economy
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          1 USD = 100 MingleCoins (MC)
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {economy.map((e) => (
            <div key={e.tier} className="border-2 border-slate-200 bg-white p-6 text-center">
              <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${e.color}`}>
                {e.tier}
              </span>
              <p className="mt-3 text-2xl font-black text-slate-900">{e.cost}</p>
              <p className="text-xs text-slate-500">{e.coins}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t-2 border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <p>&copy; <a href="https://openstreetmap.org/copyright" className="underline hover:text-slate-700">OpenStreetMap</a> contributors. Map data is open access under the <a href="https://opendatacommons.org/licenses/odbl/" className="underline hover:text-slate-700">ODbL</a>.</p>
        <p className="mt-1">Built and Designed by RKYRNSM | RICKY RANSOM, LLC | &copy; 2026 RICKY RANSOM, LLC</p>
      </footer>
    </main>
  )
}
