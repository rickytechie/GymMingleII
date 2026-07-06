"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import LandingHeader from '../src/components/LandingHeader'
import WaitlistForm from '../src/components/WaitlistForm'
import ProfileCard from '../src/components/ProfileCard'
import { fetchProfiles, getDemoProfiles, coastalBrutalism, NYC_REGIONS, PremiumTier } from '@gymmingle/core'
import type { Profile, LifestyleVenue } from '@gymmingle/core'

export default function Page() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeVenueTab, setActiveVenueTab] = useState('manhattan')

  const demoProfiles = getDemoProfiles()
  const regions = Object.entries(NYC_REGIONS)

  useEffect(() => {
    let active = true

    fetchProfiles()
      .then((data) => {
        if (active) setProfiles(data)
      })
      .catch(() => {
        if (active) {
          setProfiles(demoProfiles)
          setError(null)
        }
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })

    return () => { active = false }
  }, [])

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <LandingHeader />

      {/* HERO */}
      <section className="coastal-section mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-6">
          <span className="inline-flex rounded-full border border-[#CCFF00] bg-[#CCFF00]/15 px-3 py-1 text-sm font-semibold text-slate-800">
            Lifestyle Orchestration Engine · Live
          </span>
          <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
            Your fitness. Your rules. Your tribe.
          </h1>
          <p className="max-w-xl text-lg text-slate-600">
            GymMingle connects NYC and Nassau athletes through shared movement,
            lifestyle synergy, and premium MingleCoin-powered experiences.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#venues"
              className="rounded-full bg-[#CCFF00] px-6 py-3 font-semibold text-slate-950 transition hover:opacity-90"
            >
              Explore venues
            </a>
            <Link
              href="/concept"
              className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
            >
              How it works
            </Link>
          </div>
        </div>

        {/* PREMIUM TEASER */}
        <div className="w-full max-w-sm">
          <div className="glass rounded-[2rem] p-8">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#CCFF00]" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Premium Economy
              </span>
            </div>
            <p className="mt-4 text-2xl font-black text-slate-900">
              Unlock with MingleCoins
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[PremiumTier.Starter, PremiumTier.Premium, PremiumTier.Elite].map((tier) => (
                <span
                  key={tier}
                  className="rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-700"
                >
                  {tier}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DEMO PROFILES */}
      <section className="mx-auto max-w-6xl px-6 pb-16 sm:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">Meet the community</h2>
          <p className="mt-2 text-sm text-slate-600">
            Live profiles from Supabase
            <span className="ml-2 inline-flex items-center gap-1 rounded-full border border-[#CCFF00] bg-[#CCFF00]/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-slate-800">
              <span className="h-1.5 w-1.5 rounded-full bg-[#CCFF00]" />
              MingleCoins enabled
            </span>
          </p>
        </div>

        <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {isLoading ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 md:col-span-2 xl:col-span-3">
              Loading members…
            </div>
          ) : profiles.length === 0 ? (
            demoProfiles.map((p) => <ProfileCard key={p.id} profile={p} />)
          ) : (
            profiles.map((profile) => <ProfileCard key={profile.id} profile={profile} />)
          )}
        </div>

        {/* PREMIUM BADGE LEGEND */}
        <div className="glass-card mb-10 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Premium Tiers</p>
          <div className="mt-3 flex flex-wrap gap-4">
            {demoProfiles.map((p) => (
              <div key={p.id} className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-slate-900">{p.name}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                  p.mingleCoins.tier === PremiumTier.Elite
                    ? 'bg-slate-900 text-[#CCFF00]'
                    : p.mingleCoins.tier === PremiumTier.Premium
                    ? 'bg-[#CCFF00] text-slate-900'
                    : p.mingleCoins.tier === PremiumTier.Starter
                    ? 'bg-slate-200 text-slate-700'
                    : 'bg-slate-100 text-slate-400'
                }`}>
                  {p.mingleCoins.tier}
                </span>
                <span className="text-xs text-slate-400">{p.mingleCoins.balance} coins</span>
              </div>
            ))}
          </div>
        </div>

        <WaitlistForm />
      </section>

      {/* VENUE DISCOVERY */}
      <section id="venues" className="coastal-section bg-slate-950 pb-24 pt-20 text-white">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="mb-10">
            <span className={coastalBrutalism.pill + ' border-electric-lime text-electric-lime'}>
              Lifestyle Engine
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
              Discover venues that match your vibe
            </h2>
            <p className="mt-3 max-w-xl text-white/60">
              Powered by Google Maps Places API — NYC and Nassau venues curated by lifestyle, intensity, and energy.
            </p>
          </div>

          {/* REGION TABS */}
          <div className="mb-8 flex flex-wrap gap-3">
            {regions.map(([key, region]) => (
              <button
                key={key}
                onClick={() => setActiveVenueTab(key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeVenueTab === key
                    ? 'bg-electric-lime text-slate-950'
                    : 'glass text-white/70 hover:text-white'
                }`}
              >
                {region.label}
              </button>
            ))}
          </div>

          {/* VENUE GRID */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {demoProfiles.map((profile, idx) => (
              <div key={profile.id} className="glass-card p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/40">
                      Match Suggestion
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-white">{profile.name}</h3>
                    <p className="text-sm text-white/50">{profile.fitnessStyle}</p>
                  </div>
                  <div className={`h-8 w-8 rounded-full ${
                    profile.mingleCoins.tier === PremiumTier.Elite
                      ? 'bg-electric-lime'
                      : profile.mingleCoins.tier === PremiumTier.Premium
                      ? 'bg-sunset-orange'
                      : 'bg-white/20'
                  } flex items-center justify-center text-[10px] font-black text-slate-950`}>
                    {profile.mingleCoins.balance}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {profile.interests.slice(0, 4).map((interest) => (
                    <span key={interest} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-white/60">
                      {interest}
                    </span>
                  ))}
                </div>

                <div className="mt-4 border-t border-white/5 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/40">Vibe match</span>
                    <span className="font-bold text-electric-lime">{85 - idx * 12}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/10">
                    <div
                      className="h-1.5 rounded-full bg-electric-lime transition-all"
                      style={{ width: `${85 - idx * 12}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
                  <span className="font-medium text-white/70">{activeVenueTab === 'nassau' ? 'Nassau County' : NYC_REGIONS[activeVenueTab]?.label}</span>
                  <span>·</span>
                  <span>{profile.lookingFor[0]}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-white/30">
              <span className="inline-block w-2 h-2 rounded-full bg-electric-lime mr-2" />
              Live Google Places API · Coastal Brutalism UI · Glassmorphism
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
