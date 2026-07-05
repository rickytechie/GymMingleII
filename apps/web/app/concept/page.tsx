import type { Metadata } from 'next'
import Link from 'next/link'
import LandingHeader from '../../src/components/LandingHeader'

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
    title: 'Discover venues that fit',
    body: 'Our venue service taps the Google Places API to surface gyms, studios, and courts near you, complete with ratings and photos.',
  },
  {
    title: 'One brand, every surface',
    body: 'A single design language and theme contract keeps the experience consistent from the landing page to the mobile app.',
  },
]

const steps = [
  {
    step: '01',
    title: 'Create your athlete profile',
    body: 'Tell us your sports, goals, and availability. Realistic imagery keeps profiles feeling human from day one.',
  },
  {
    step: '02',
    title: 'Get matched',
    body: 'The core matching engine ranks compatible partners so you spend less time swiping and more time training.',
  },
  {
    step: '03',
    title: 'Meet at the right venue',
    body: 'Pick a nearby, highly-rated venue surfaced by the venue service and lock in your session.',
  },
]

export default function ConceptPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <LandingHeader />

      <section className="mx-auto max-w-5xl px-6 py-20 text-center sm:px-8">
        <span className="inline-flex rounded-full border border-[#CCFF00] bg-[#CCFF00]/15 px-3 py-1 text-sm font-semibold text-slate-800">
          The concept
        </span>
        <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
          Fitness is better with the right people and the right place.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          GymMingle is a hybrid matching platform that connects athletes by how they train, then
          points them to venues built for it — a single, shared experience across web and mobile.
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
