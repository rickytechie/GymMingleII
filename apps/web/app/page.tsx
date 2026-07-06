"use client"

import { useState, useMemo, useCallback } from 'react'
import dynamic from 'next/dynamic'
import LandingHeader from '../src/components/LandingHeader'
import WaitlistForm from '../src/components/WaitlistForm'
import ProfileCard from '../src/components/ProfileCard'
import ProfileModal from '../src/components/ProfileModal'
import { CITY_REGIONS, PremiumTier, multiCityVenues, COMMUNITY_PROFILES, getProfilesByCity } from '@gymmingle/core'
import type { CommunityProfile } from '@gymmingle/core'
import type { Decision } from '../src/components/ProfileCard'

const VenueMap = dynamic(() => import('../src/components/VenueMap'), { ssr: false })
const PricingCards = dynamic(() => import('../src/components/PricingCards'), { ssr: false })
const CuratedDateEngine = dynamic(() => import('../src/components/CuratedDateEngine'), { ssr: false })

const cityKeys = Object.entries(CITY_REGIONS)

export default function Page() {
  const [activeCity, setActiveCity] = useState('nyc')
  const [profileCount, setProfileCount] = useState(12)
  const [selectedProfile, setSelectedProfile] = useState<CommunityProfile | null>(null)
  const [decisions, setDecisions] = useState<Record<string, Decision>>({})

  const activeRegion = CITY_REGIONS[activeCity]
  const venues = useMemo(
    () => multiCityVenues.filter((v) => v.regionId === activeCity),
    [activeCity],
  )

  const cityCommunityProfiles = useMemo(
    () => getProfilesByCity(activeCity).slice(0, profileCount),
    [activeCity, profileCount],
  )

  const totalCommunityProfiles = COMMUNITY_PROFILES.length

  const likedCount = Object.values(decisions).filter((d) => d === 'like').length
  const maybeCount = Object.values(decisions).filter((d) => d === 'maybe').length
  const passedCount = Object.values(decisions).filter((d) => d === 'pass').length

  const handleDecision = useCallback((id: string, decision: Decision) => {
    setDecisions((prev) => ({ ...prev, [id]: decision }))
  }, [])

  const handleCardClick = useCallback((profile: CommunityProfile) => {
    setSelectedProfile(profile)
  }, [])

  return (
    <main className="min-h-screen bg-white text-black">
      <LandingHeader />

      {/* HERO */}
      <section className="coastal-section mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-6">
          <span className="inline-flex border-2 border-black bg-black text-[#CCFF00] px-3 py-1 text-sm font-bold uppercase tracking-wider">
            Lifestyle Orchestration Engine · 52 Markets
          </span>
          <h1 className="text-4xl font-black tracking-tight text-black sm:text-6xl">
            Your fitness. Your rules. Your tribe.
          </h1>
          <p className="max-w-xl text-lg text-black/60">
            GymMingle connects {totalCommunityProfiles.toLocaleString()} athletes across 52 city markets through shared movement,
            lifestyle synergy, and premium MingleCoin-powered experiences.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#venues"
              className="border-2 border-black bg-black text-[#CCFF00] px-6 py-3 font-bold hover:bg-black/80 transition-colors"
            >
              Explore venues
            </a>
            <a
              href="#date-engine"
              className="border-2 border-black/20 px-6 py-3 font-bold text-black/70 hover:border-black hover:text-black transition-colors"
            >
              Curated dates
            </a>
          </div>
        </div>

        {/* PREMIUM TEASER */}
        <div className="w-full max-w-sm">
          <div className="glass p-8">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-[#CCFF00]" />
              <span className="text-xs font-bold uppercase tracking-widest text-black/50">
                Premium Economy
              </span>
            </div>
            <p className="mt-4 text-2xl font-black text-black">
              Unlock with MingleCoins
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[PremiumTier.STARTER, PremiumTier.MOMENTUM, PremiumTier.PEAK, PremiumTier.APEX].map((tier) => (
                <span
                  key={tier}
                  className="border-2 border-black/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-black"
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
          <h2 className="text-3xl font-black tracking-tight text-black sm:text-4xl">
            Choose your tier
          </h2>
          <p className="mt-2 text-black/50">
            USD pricing · MingleCoin (MC) equivalent: <strong className="text-black">1 USD = 100 MC</strong>
          </p>
        </div>
        <PricingCards />
      </section>

      {/* COMMUNITY PROFILES */}
      <section className="mx-auto max-w-6xl px-6 pb-16 sm:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-black text-black">Meet the community</h2>
              <p className="mt-2 text-sm text-black/60">
                {totalCommunityProfiles.toLocaleString()} active members across 52 markets
                {likedCount > 0 && <span className="ml-3 text-xs text-black/40">♥ {likedCount} liked</span>}
                {maybeCount > 0 && <span className="ml-3 text-xs text-black/40">? {maybeCount} maybe</span>}
                {passedCount > 0 && <span className="ml-3 text-xs text-black/40">✕ {passedCount} passed</span>}
              </p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-black/40 uppercase tracking-wider">Filter by city:</span>
            <select
              value={activeCity}
              onChange={(e) => { setActiveCity(e.target.value); setProfileCount(12) }}
              className="border-2 border-black bg-white px-3 py-1 text-sm font-bold text-black"
            >
              {cityKeys.map(([key, city]) => (
                <option key={key} value={key}>{city.label} ({getProfilesByCity(key).length})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cityCommunityProfiles.map((p) => (
            <ProfileCard
              key={p.id}
              profile={p}
              decision={decisions[p.id] ?? null}
              onDecision={handleDecision}
              onClick={() => handleCardClick(p)}
            />
          ))}
        </div>

        {cityCommunityProfiles.length >= 12 && (
          <div className="text-center mb-6">
            <button
              onClick={() => setProfileCount((c) => c + 12)}
              className="border-2 border-black bg-white text-black px-6 py-2 text-sm font-bold hover:bg-black hover:text-white transition-colors"
            >
              Load more
            </button>
          </div>
        )}

        {/* PREMIUM BADGE LEGEND */}
        <div className="glass-card mb-10 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-black/50">Premium Tiers</p>
          <div className="mt-3 flex flex-wrap gap-4">
            {([PremiumTier.FREE, PremiumTier.STARTER, PremiumTier.MOMENTUM, PremiumTier.PEAK, PremiumTier.APEX] as const).map((tier) => {
              const count = COMMUNITY_PROFILES.filter((p) => p.mingleCoins.tier === tier).length
              const bg = tier === PremiumTier.APEX
                ? 'bg-black text-[#CCFF00]'
                : tier === PremiumTier.PEAK
                ? 'bg-black text-[#CCFF00]'
                : tier === PremiumTier.MOMENTUM
                ? 'bg-[#CCFF00] text-black'
                : tier === PremiumTier.STARTER
                ? 'bg-black/10 text-black'
                : 'bg-black/5 text-black/60'
              return (
                <div key={tier} className="flex items-center gap-2 text-sm">
                  <span className={`border-2 border-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${bg}`}>
                    {tier}
                  </span>
                  <span className="text-xs text-black/40">{count} members</span>
                </div>
              )
            })}
          </div>
        </div>

        <WaitlistForm />
      </section>

      {/* VENUE DISCOVERY */}
      <section id="venues" className="coastal-section bg-black pb-24 pt-20 text-white">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="mb-10">
            <span className="border-2 border-[#CCFF00] text-[#CCFF00] px-3 py-1 text-xs font-bold uppercase tracking-wider">
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
                className={`border-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeCity === key
                    ? 'border-[#CCFF00] bg-[#CCFF00] text-black'
                    : 'border-white/20 text-white/70 hover:border-white hover:text-white'
                }`}
              >
                {city.label}
              </button>
            ))}
          </div>

          {/* MAP + VENUE LIST */}
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="h-[400px] w-full overflow-hidden border-2 border-white/20 lg:h-[600px] lg:w-3/5">
              {activeRegion && <VenueMap venues={venues} region={activeRegion} />}
            </div>

            <div className="flex-1 space-y-4">
              {venues.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-white/30">No curated venues yet for this city.</p>
                </div>
              ) : (
                venues.slice(0, 10).map((venue) => (
                  <div key={venue.id} className="border-2 border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{venue.name}</h3>
                      <span className="border border-white/20 px-2 py-0.5 text-[10px] font-bold text-white/50 uppercase tracking-wider">
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
                ))
              )}
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-white/30">
              Leaflet · OSM · Coastal Brutalism UI · Glassmorphism
            </p>
          </div>
        </div>
      </section>

      {/* CURATED DATE ENGINE */}
      <section id="date-engine" className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
        <div className="mb-10">
          <span className="inline-flex border-2 border-black bg-black text-[#CCFF00] px-3 py-1 text-sm font-bold uppercase tracking-wider">
            3-Stage Curated Date Engine
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-black sm:text-4xl">
            Plan your perfect date
          </h2>
          <p className="mt-2 text-black/50">
            Sweat → Nourish → Unwind. Select a duration and build a 3-stage date from curated venues.
          </p>
        </div>
        <CuratedDateEngine cityKey={activeCity} />

        {/* Matching summary + Complete Date */}
        <div className="mt-8 border-2 border-black p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-black/40">Your Picks</p>
              <p className="text-sm text-black/60 mt-1">
                ♥ {likedCount} liked · ? {maybeCount} maybe · ✕ {passedCount} passed
              </p>
            </div>
            <a
              href="/finalize-date"
              className="border-2 border-black bg-black text-[#CCFF00] px-6 py-3 font-bold hover:bg-black/80 transition-colors text-sm"
            >
              Complete Date →
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-black bg-white py-8 text-center text-xs text-black/50">
        <p>&copy; <a href="https://openstreetmap.org/copyright" className="underline hover:text-black">OpenStreetMap</a> contributors. Map data is open access under the <a href="https://opendatacommons.org/licenses/odbl/" className="underline hover:text-black">ODbL</a>.</p>
        <p className="mt-1">Built and Designed by RKYRNSM | RICKY RANSOM, LLC | &copy; 2026 RICKY RANSOM, LLC</p>
      </footer>

      {/* Profile Detail Modal */}
      {selectedProfile && (
        <ProfileModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
          decision={decisions[selectedProfile.id] ?? null}
          onDecision={handleDecision}
        />
      )}
    </main>
  )
}
