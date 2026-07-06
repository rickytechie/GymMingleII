"use client"

import { useEffect, useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import LandingHeader from '../src/components/LandingHeader'
import WaitlistForm from '../src/components/WaitlistForm'
import ProfileCard from '../src/components/ProfileCard'
import { fetchProfiles, getDemoProfiles, coastalBrutalism, CITY_REGIONS, PremiumTier, multiCityVenues, COMMUNITY_PROFILES, getProfilesByCity } from '@gymmingle/core'
import type { Profile } from '@gymmingle/core'

const VenueMap = dynamic(() => import('../src/components/VenueMap'), { ssr: false })
const PricingCards = dynamic(() => import('../src/components/PricingCards'), { ssr: false })
const CuratedDateEngine = dynamic(() => import('../src/components/CuratedDateEngine'), { ssr: false })

const cityKeys = Object.entries(CITY_REGIONS)

export default function Page() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCity, setActiveCity] = useState('nyc')
  const [profileCount, setProfileCount] = useState(12)
  const activeRegion = CITY_REGIONS[activeCity]
  const demoProfiles = useMemo(() => getDemoProfiles(), [])
  const venues = useMemo(
    () => multiCityVenues.filter((v) => v.regionId === activeCity),
    [activeCity],
  )

  const cityCommunityProfiles = useMemo(
    () => getProfilesByCity(activeCity).slice(0, profileCount),
    [activeCity, profileCount],
  )

  const totalCommunityProfiles = COMMUNITY_PROFILES.length

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
  }, [demoProfiles])

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <LandingHeader />

      {/* HERO */}
      <section className="coastal-section mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-6">
          <span className="inline-flex rounded-full border border-[#CCFF00] bg-[#CCFF00]/15 px-3 py-1 text-sm font-semibold text-slate-800">
            Lifestyle Orchestration Engine · 52 Markets
          </span>
          <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
            Your fitness. Your rules. Your tribe.
          </h1>
          <p className="max-w-xl text-lg text-slate-600">
            GymMingle connects {totalCommunityProfiles.toLocaleString()} athletes across 52 city markets through shared movement,
            lifestyle synergy, and premium MingleCoin-powered experiences.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#venues"
              className="rounded-full bg-[#CCFF00] px-6 py-3 font-semibold text-slate-950 transition hover:opacity-90"
            >
              Explore venues
            </a>
            <a
              href="#date-engine"
              className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
            >
              Curated dates
            </a>
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

      {/* PRICING SECTION */}
      <section className="mx-auto max-w-6xl px-6 pb-20 sm:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Choose your tier
          </h2>
          <p className="mt-2 text-slate-500">
            USD pricing · MingleCoin (MC) equivalent: <strong>1 USD = 100 MC</strong>
          </p>
        </div>
        <PricingCards />
      </section>

      {/* COMMUNITY PROFILES */}
      <section className="mx-auto max-w-6xl px-6 pb-16 sm:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">Meet the community</h2>
          <p className="mt-2 text-sm text-slate-600">
            {totalCommunityProfiles.toLocaleString()} active members across 52 markets
            <span className="ml-2 inline-flex items-center gap-1 rounded-full border border-[#CCFF00] bg-[#CCFF00]/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-slate-800">
              <span className="h-1.5 w-1.5 rounded-full bg-[#CCFF00]" />
              MingleCoins enabled
            </span>
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Filter by city:</span>
            <select
              value={activeCity}
              onChange={(e) => { setActiveCity(e.target.value); setProfileCount(12) }}
              className="border-2 border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-700"
            >
              {cityKeys.map(([key, city]) => (
                <option key={key} value={key}>{city.label} ({getProfilesByCity(key).length})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {isLoading ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 md:col-span-2 xl:col-span-3">
              Loading members…
            </div>
          ) : profiles.length === 0 ? (
            cityCommunityProfiles.length > 0 ? (
              cityCommunityProfiles.map((p) => <ProfileCard key={p.id} profile={p} />)
            ) : (
              demoProfiles.map((p) => <ProfileCard key={p.id} profile={p} />)
            )
          ) : (
            profiles.map((profile) => <ProfileCard key={profile.id} profile={profile} />)
          )}
        </div>

        {/* PREMIUM BADGE LEGEND */}
        <div className="glass-card mb-10 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Premium Tiers</p>
          <div className="mt-3 flex flex-wrap gap-4">
            {([PremiumTier.FREE, PremiumTier.STARTER, PremiumTier.MOMENTUM, PremiumTier.PEAK, PremiumTier.APEX] as const).map((tier) => {
              const count = COMMUNITY_PROFILES.filter((p) => p.mingleCoins.tier === tier).length
              const bg = tier === PremiumTier.APEX
                ? 'bg-purple-900 text-[#CCFF00]'
                : tier === PremiumTier.PEAK
                ? 'bg-slate-900 text-[#CCFF00]'
                : tier === PremiumTier.MOMENTUM
                ? 'bg-[#CCFF00] text-slate-900'
                : tier === PremiumTier.STARTER
                ? 'bg-slate-200 text-slate-700'
                : 'bg-slate-100 text-slate-400'
              return (
                <div key={tier} className="flex items-center gap-2 text-sm">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${bg}`}>
                    {tier}
                  </span>
                  <span className="text-xs text-slate-400">{count} members</span>
                </div>
              )
            })}
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
              Curated venues across 52 markets — powered by OpenStreetMap + Leaflet.
            </p>
          </div>

          {/* CITY SELECTOR */}
          <div className="mb-8 flex flex-wrap gap-2">
            {cityKeys.map(([key, city]) => (
              <button
                key={key}
                onClick={() => setActiveCity(key)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  activeCity === key
                    ? 'bg-electric-lime text-slate-950'
                    : 'glass text-white/70 hover:text-white'
                }`}
              >
                {city.label}
              </button>
            ))}
          </div>

          {/* MAP + VENUE LIST */}
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="h-[400px] w-full overflow-hidden rounded-2xl border border-white/10 lg:h-[600px] lg:w-3/5">
              {activeRegion && <VenueMap venues={venues} region={activeRegion} />}
            </div>

            <div className="flex-1 space-y-4">
              {venues.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-white/30">No curated venues yet for this city.</p>
                </div>
              ) : (
                venues.slice(0, 10).map((venue) => (
                  <div key={venue.id} className="glass-card flex items-start gap-4 p-4">
                    <div className={`mt-1 h-3 w-3 flex-shrink-0 rounded-full ${
                      venue.rating >= 4.5 ? 'bg-electric-lime' : venue.rating >= 4.0 ? 'bg-sunset-orange' : 'bg-white/30'
                    }`} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white">{venue.name}</h3>
                        <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/50">
                          {venue.category}
                        </span>
                      </div>
                      {venue.address && (
                        <p className="mt-0.5 truncate text-xs text-white/40">{venue.address}</p>
                      )}
                      <div className="mt-1 flex items-center gap-3 text-xs text-white/40">
                        <span>⭐ {venue.rating.toFixed(1)}</span>
                        <span>{venue.userRatingCount.toLocaleString()} reviews</span>
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

      {/* CURATED DATE ENGINE */}
      <section id="date-engine" className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
        <div className="mb-10">
          <span className="inline-flex rounded-full border border-[#CCFF00] bg-[#CCFF00]/15 px-3 py-1 text-sm font-semibold text-slate-800">
            3-Stage Curated Date Engine
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Plan your perfect date
          </h2>
          <p className="mt-2 text-slate-500">
            Sweat → Nourish → Unwind. Select a duration and build a 3-stage date from curated venues.
          </p>
        </div>
        <CuratedDateEngine cityKey={activeCity} />
      </section>

      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <p>&copy; <a href="https://openstreetmap.org/copyright" className="underline hover:text-slate-700">OpenStreetMap</a> contributors. Map data is open access under the <a href="https://opendatacommons.org/licenses/odbl/" className="underline hover:text-slate-700">ODbL</a>.</p>
        <p className="mt-1">Built and Designed by RKYRNSM | RICKY RANSOM, LLC | &copy; 2026 RICKY RANSOM, LLC</p>
      </footer>
    </main>
  )
}
