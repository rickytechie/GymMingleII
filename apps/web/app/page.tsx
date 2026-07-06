"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import LandingHeader from '../src/components/LandingHeader'
import WaitlistForm from '../src/components/WaitlistForm'
import ProfileCard from '../src/components/ProfileCard'
import { fetchProfiles, getDemoProfiles, coastalBrutalism, NYC_REGIONS, PremiumTier, LifestyleEngine } from '@gymmingle/core'
import type { Profile, LifestyleVenue } from '@gymmingle/core'

const VenueMap = dynamic(() => import('../src/components/VenueMap'), { ssr: false })

const engine = new LifestyleEngine()

export default function Page() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeVenueTab, setActiveVenueTab] = useState('manhattan')
  const [venues, setVenues] = useState<LifestyleVenue[]>([])
  const [venuesLoading, setVenuesLoading] = useState(true)

  const demoProfiles = getDemoProfiles()
  const regions = Object.entries(NYC_REGIONS)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let active = true

    fetchProfiles()
      .then((data) => {
        if (active) setProfiles(data)
      })
      .catch(() => {
        if (active) setProfiles(demoProfiles)
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })

    return () => { active = false }
  }, [])

  useEffect(() => {
    let active = true
    const region = NYC_REGIONS[activeVenueTab]
    if (region) {
      engine.discoverVenues(region).then((results) => {
        if (active) setVenues(results)
      }).catch(() => {
        if (active) setVenues([])
      }).finally(() => {
        if (active) setVenuesLoading(false)
      })
    }
    return () => { active = false }
  }, [activeVenueTab])

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
              {[PremiumTier.STARTER, PremiumTier.MOMENTUM, PremiumTier.PEAK, PremiumTier.APEX].map((tier) => (
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
                  p.mingleCoins.tier === PremiumTier.APEX
                    ? 'bg-purple-900 text-[#CCFF00]'
                    : p.mingleCoins.tier === PremiumTier.PEAK
                    ? 'bg-slate-900 text-[#CCFF00]'
                    : p.mingleCoins.tier === PremiumTier.MOMENTUM
                    ? 'bg-[#CCFF00] text-slate-900'
                    : p.mingleCoins.tier === PremiumTier.STARTER
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
              Powered by OpenStreetMap + Leaflet — no API key required, always free.
            </p>
          </div>

          {/* REGION TABS */}
          <div className="mb-8 flex flex-wrap gap-3">
            {regions.map(([key, region]) => (
              <button
                key={key}
                onClick={() => {
                  setVenuesLoading(true)
                  setActiveVenueTab(key)
                }}
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

          {/* MAP + VENUE LIST */}
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="h-[400px] w-full overflow-hidden rounded-2xl border border-white/10 lg:h-[600px] lg:w-3/5">
              <VenueMap venues={venues} region={NYC_REGIONS[activeVenueTab]} />
            </div>

            <div className="flex-1 space-y-4">
              {venuesLoading ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-white/40">Loading venues from OpenStreetMap…</p>
                </div>
              ) : venues.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-white/30">No venues found in this area.</p>
                </div>
              ) : (
                venues.slice(0, 6).map((venue) => (
                  <div key={venue.id} className="glass-card flex items-start gap-4 p-4">
                    <div className={`mt-1 h-3 w-3 flex-shrink-0 rounded-full ${
                      venue.vibeScore >= 70 ? 'bg-electric-lime' : venue.vibeScore >= 40 ? 'bg-sunset-orange' : 'bg-white/30'
                    }`} />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-white">{venue.name}</h3>
                      {venue.address && (
                        <p className="mt-0.5 truncate text-xs text-white/40">{venue.address}</p>
                      )}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {venue.lifestyleTags.slice(0, 3).map((tag) => (
                          <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-xs text-white/40">
                        <span className="font-bold text-electric-lime">Vibe {venue.vibeScore}</span>
                        {venue.distance != null && (
                          <span>{(venue.distance / 1000).toFixed(1)} km</span>
                        )}
                        <span className="capitalize">{venue.crowdDensity}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-white/30">
              <span className="inline-block w-2 h-2 rounded-full bg-electric-lime mr-2" />
              Leaflet · OSM · Coastal Brutalism UI · Glassmorphism
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <p>&copy; <a href="https://openstreetmap.org/copyright" className="underline hover:text-slate-700">OpenStreetMap</a> contributors. Map data is open access under the <a href="https://opendatacommons.org/licenses/odbl/" className="underline hover:text-slate-700">ODbL</a>.</p>
        <p className="mt-1">Built and Designed by RKYRNSM | RICKY RANSOM, LLC | &copy; 2026 RICKY RANSOM, LLC</p>
      </footer>
    </main>
  )
}
