'use client'

import { useState, useMemo, useCallback } from 'react'
import type { CuratedVenue, VenueCategory } from '@gymmingle/core'
import { multiCityVenues } from '@gymmingle/core'

export interface DateStage {
  id: 'sweat' | 'nourish' | 'unwind'
  label: string
  subtitle: string
  icon: string
  categories: VenueCategory[]
}

const DATE_STAGES: DateStage[] = [
  {
    id: 'sweat',
    label: 'Stage 1: Sweat',
    subtitle: 'Break a sweat together — gym, run, or climb',
    icon: '🏋️',
    categories: ['Fitness', 'Outdoor', 'Skatepark'],
  },
  {
    id: 'nourish',
    label: 'Stage 2: Nourish',
    subtitle: 'Share a meal or craft cocktail',
    icon: '🍽️',
    categories: ['Dining', 'Nightlife', 'Music'],
  },
  {
    id: 'unwind',
    label: 'Stage 3: Unwind',
    subtitle: 'Relax, reconnect, and deepen the vibe',
    icon: '💆',
    categories: ['Wellness', 'Bathhouse', 'Arts', 'StripClub'],
  },
]

const DURATIONS = [30, 60, 90, 120] as const
type Duration = (typeof DURATIONS)[number]

function categoriesForDuration(duration: Duration): Set<VenueCategory> {
  switch (duration) {
    case 30:
      return new Set(['Fitness', 'Dining', 'Wellness'])
    case 60:
      return new Set(['Fitness', 'Dining', 'Wellness', 'Nightlife', 'Outdoor'])
    case 90:
      return new Set(['Fitness', 'Dining', 'Wellness', 'Nightlife', 'Outdoor', 'Arts', 'Music'])
    case 120:
      return new Set(['Fitness', 'Dining', 'Wellness', 'Nightlife', 'Outdoor', 'Arts', 'Music', 'Skatepark', 'Bathhouse', 'StripClub'])
  }
}

interface CuratedDateEngineProps {
  cityKey: string
}

export function CuratedDateEngine({ cityKey }: CuratedDateEngineProps) {
  const [stageIndex, setStageIndex] = useState(0)
  const [duration, setDuration] = useState<Duration>(120)
  const [selected, setSelected] = useState<Record<string, CuratedVenue | null>>({
    sweat: null,
    nourish: null,
    unwind: null,
  })

  const stage = DATE_STAGES[stageIndex]
  const allowed = useMemo(() => categoriesForDuration(duration), [duration])

  const cityVenues = useMemo(
    () => multiCityVenues.filter((v) => v.regionId === cityKey),
    [cityKey],
  )

  const stageVenues = useMemo(() => {
    return cityVenues
      .filter((v) => stage.categories.includes(v.category) && allowed.has(v.category))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 50)
  }, [cityVenues, stage, allowed])

  const selectVenue = useCallback((venue: CuratedVenue) => {
    setSelected((prev) => ({ ...prev, [stage.id]: venue }))
  }, [stage.id])

  const next = useCallback(() => {
    if (stageIndex < DATE_STAGES.length - 1) setStageIndex((i) => i + 1)
  }, [stageIndex])

  const prev = useCallback(() => {
    if (stageIndex > 0) setStageIndex((i) => i - 1)
  }, [stageIndex])

  const totalSelected = Object.values(selected).filter(Boolean).length
  const currentSelection = selected[stage.id]

  const canProceed = currentSelection !== null
  const canGoBack = stageIndex > 0
  const isLastStage = stageIndex >= DATE_STAGES.length - 1

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Duration selector */}
      <div className="mb-8">
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-3">
          Date Duration
        </h3>
        <div className="flex gap-2 flex-wrap">
          {DURATIONS.map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`rounded-[0] px-5 py-2 text-sm font-bold transition-colors ${
                duration === d
                  ? 'bg-slate-900 text-[#CCFF00]'
                  : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-slate-900'
              }`}
            >
              {d} min
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-400">
          {duration === 30 ? 'Quick: gym, dine, spa' :
           duration === 60 ? 'Solid: add nightlife + outdoor' :
           duration === 90 ? 'Extended: add arts + music' :
           'Full experience: all categories available'}
        </p>
      </div>

      {/* Stage stepper */}
      <div className="flex items-center gap-0 mb-8 border-2 border-slate-200">
        {DATE_STAGES.map((s, i) => {
          const isActive = i === stageIndex
          const isDone = selected[s.id] !== null
          return (
            <button
              key={s.id}
              onClick={() => setStageIndex(i)}
              className={`flex-1 border-r-2 border-slate-200 last:border-r-0 py-3 px-2 text-center text-xs font-bold uppercase tracking-wider transition-colors ${
                isActive
                  ? 'bg-slate-900 text-[#CCFF00]'
                  : isDone
                    ? 'bg-[#CCFF00]/10 text-slate-700'
                    : 'bg-white text-slate-400 hover:bg-slate-50'
              }`}
            >
              <span className="block text-lg mb-1">{s.icon}</span>
              <span className="hidden sm:inline">{s.label}</span>
              {isDone && <span className="ml-1 text-[#CCFF00]">✓</span>}
            </button>
          )
        })}
      </div>

      {/* Stage content */}
      <div className="border-2 border-slate-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-black text-slate-900">{stage.label}</h3>
            <p className="text-sm text-slate-500">{stage.subtitle}</p>
          </div>
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1">
            Top {stageVenues.length} venues
          </span>
        </div>

        {stageVenues.length === 0 ? (
          <div className="border-2 border-slate-200 bg-slate-50 p-10 text-center">
            <p className="text-slate-500 font-bold">No venues match your duration + city.</p>
            <p className="text-xs text-slate-400 mt-1">Try a longer duration or different city.</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 max-h-[420px] overflow-y-auto pr-2">
            {stageVenues.map((venue) => {
              const isSelected = currentSelection?.id === venue.id
              return (
                <button
                  key={venue.id}
                  onClick={() => selectVenue(venue)}
                  className={`border-2 p-4 text-left transition-all hover:shadow-lg ${
                    isSelected
                      ? 'border-slate-900 bg-slate-50'
                      : 'border-slate-200 bg-white hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-black text-slate-900 text-sm truncate">{venue.name}</h4>
                    <span className="shrink-0 bg-slate-900 text-[#CCFF00] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      {venue.category}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 truncate">{venue.address}</p>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400">
                    <span>⭐ {venue.rating.toFixed(1)}</span>
                    <span>{venue.userRatingCount.toLocaleString()} reviews</span>
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between border-t-2 border-slate-200 pt-4">
          <button
            onClick={prev}
            disabled={!canGoBack}
            className="border-2 border-slate-200 px-5 py-2 text-sm font-bold text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
          >
            ← Back
          </button>
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1">
            {totalSelected}/3 selected
          </span>
          <button
            onClick={next}
            disabled={!canProceed || isLastStage}
            className="bg-slate-900 text-[#CCFF00] px-6 py-2 text-sm font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
          >
            {isLastStage ? 'Complete' : 'Next →'}
          </button>
        </div>
      </div>

      {/* Itinerary summary */}
      {totalSelected === 3 && (
        <div className="mt-8 border-2 border-[#CCFF00] bg-[#CCFF00]/5 p-6">
          <h3 className="text-lg font-black text-slate-900 mb-4">Your Curated Date Itinerary</h3>
          <div className="space-y-3">
            {DATE_STAGES.map((s) => {
              const v = selected[s.id]
              if (!v) return null
              return (
                <div key={s.id} className="flex items-center gap-3 border-l-4 border-slate-900 pl-4">
                  <span className="text-xl">{s.icon}</span>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{v.name}</p>
                    <p className="text-xs text-slate-500">{v.address} · {v.category}</p>
                  </div>
                  <span className="ml-auto text-xs text-slate-400">⭐ {v.rating.toFixed(1)}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default CuratedDateEngine
