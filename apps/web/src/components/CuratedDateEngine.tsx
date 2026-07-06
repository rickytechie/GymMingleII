'use client'

import { useState, useMemo, useCallback } from 'react'
import type { CuratedVenue, VenueCategory } from '@gymmingle/core'
import { multiCityVenues } from '@gymmingle/core'

export interface DateStage {
  id: string
  label: string
  icon: string
  description: string
  categories: VenueCategory[]
}

const DATE_STAGES: DateStage[] = [
  {
    id: 'gym',
    label: 'Stage 1: Sweat',
    icon: '🏋️',
    description: 'Break a sweat together',
    categories: ['Fitness', 'Outdoor', 'Skatepark'],
  },
  {
    id: 'dining',
    label: 'Stage 2: Nourish',
    icon: '🍽️',
    description: 'Share a meal or drinks',
    categories: ['Dining', 'Nightlife', 'Music'],
  },
  {
    id: 'wellness',
    label: 'Stage 3: Unwind',
    icon: '💆',
    description: 'Relax and connect deeper',
    categories: ['Wellness', 'Bathhouse', 'Arts', 'StripClub'],
  },
]

const DURATIONS = [30, 60, 90, 120] as const
type Duration = (typeof DURATIONS)[number]

function filterByDuration(duration: Duration): VenueCategory[] {
  switch (duration) {
    case 30:
      return ['Fitness', 'Dining', 'Wellness']
    case 60:
      return ['Fitness', 'Dining', 'Wellness', 'Nightlife', 'Outdoor']
    case 90:
      return ['Fitness', 'Dining', 'Wellness', 'Nightlife', 'Outdoor', 'Arts', 'Music']
    case 120:
      return ['Fitness', 'Dining', 'Wellness', 'Nightlife', 'Outdoor', 'Arts', 'Music', 'Skatepark', 'Bathhouse', 'StripClub']
  }
}

interface CuratedDateEngineProps {
  cityKey: string
  onSelectVenue?: (venue: CuratedVenue, stage: string) => void
}

export function CuratedDateEngine({ cityKey, onSelectVenue }: CuratedDateEngineProps) {
  const [activeStage, setActiveStage] = useState(0)
  const [duration, setDuration] = useState<Duration>(60)
  const [selectedVenues, setSelectedVenues] = useState<Record<string, CuratedVenue | null>>({
    gym: null,
    dining: null,
    wellness: null,
  })

  const allowedCategories = useMemo(() => filterByDuration(duration), [duration])

  const cityVenues = useMemo(() => {
    return multiCityVenues.filter((v) => v.regionId === cityKey)
  }, [cityKey])

  const stageVenues = useMemo(() => {
    const stage = DATE_STAGES[activeStage]
    if (!stage) return []
    return cityVenues.filter(
      (v) => stage.categories.includes(v.category) && allowedCategories.includes(v.category),
    )
  }, [cityVenues, activeStage, allowedCategories])

  const handleSelectVenue = useCallback(
    (venue: CuratedVenue) => {
      const stage = DATE_STAGES[activeStage]
      setSelectedVenues((prev) => ({ ...prev, [stage.id]: venue }))
      onSelectVenue?.(venue, stage.id)
    },
    [activeStage, onSelectVenue],
  )

  const handleNext = useCallback(() => {
    if (activeStage < DATE_STAGES.length - 1) {
      setActiveStage((s) => s + 1)
    }
  }, [activeStage])

  const handleBack = useCallback(() => {
    if (activeStage > 0) setActiveStage((s) => s - 1)
  }, [activeStage])

  const totalSelected = Object.values(selectedVenues).filter(Boolean).length
  const stageKey = DATE_STAGES[activeStage]?.id ?? 'gym'
  const currentSelection = selectedVenues[stageKey]

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Duration selector */}
      <div className="mb-8">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
          Date Duration
        </h3>
        <div className="flex gap-2">
          {DURATIONS.map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                duration === d
                  ? 'bg-slate-900 text-[#CCFF00]'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {d} min
            </button>
          ))}
        </div>
      </div>

      {/* Stage navigation */}
      <div className="flex items-center gap-2 mb-6">
        {DATE_STAGES.map((stage, i) => (
          <button
            key={stage.id}
            onClick={() => setActiveStage(i)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              i === activeStage
                ? 'bg-slate-900 text-[#CCFF00]'
                : selectedVenues[stage.id]
                  ? 'bg-[#CCFF00]/20 text-slate-700'
                  : 'bg-slate-100 text-slate-500'
            }`}
          >
            <span>{stage.icon}</span>
            <span className="hidden sm:inline">{stage.label}</span>
          </button>
        ))}
      </div>

      {/* Stage content */}
      <div className="border-t border-slate-200 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900">
              {DATE_STAGES[activeStage]?.label}
            </h3>
            <p className="text-sm text-slate-500">{DATE_STAGES[activeStage]?.description}</p>
          </div>
          <span className="text-xs text-slate-400">
            {stageVenues.length} venues available
          </span>
        </div>

        {stageVenues.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
            <p className="text-slate-500">No venues match your duration + city selection.</p>
            <p className="text-xs text-slate-400 mt-1">Try a longer duration or different city.</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {stageVenues.slice(0, 10).map((venue) => (
              <button
                key={venue.id}
                onClick={() => handleSelectVenue(venue)}
                className={`rounded-2xl border-2 p-4 text-left transition-all hover:shadow-md ${
                  currentSelection?.id === venue.id
                    ? 'border-slate-900 bg-slate-50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900">{venue.name}</h4>
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                    {venue.category}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">{venue.address}</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <span>⭐</span> {venue.rating.toFixed(1)}
                  </span>
                  <span>{venue.userRatingCount.toLocaleString()} reviews</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
          <button
            onClick={handleBack}
            disabled={activeStage === 0}
            className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 disabled:opacity-30 hover:bg-slate-100"
          >
            ← Back
          </button>
          <span className="text-xs text-slate-400">
            {totalSelected}/3 selected
          </span>
          <button
            onClick={handleNext}
            disabled={activeStage >= DATE_STAGES.length - 1 || !currentSelection}
            className="rounded-full bg-slate-900 px-6 py-2 text-sm font-bold text-[#CCFF00] disabled:opacity-30 hover:bg-slate-800"
          >
            {activeStage >= DATE_STAGES.length - 1 ? 'Complete' : 'Next →'}
          </button>
        </div>
      </div>

      {/* Summary when complete */}
      {totalSelected === 3 && (
        <div className="mt-8 rounded-2xl border-2 border-[#CCFF00] bg-[#CCFF00]/5 p-6">
          <h3 className="text-lg font-black text-slate-900">Your Curated Date</h3>
          <div className="mt-4 space-y-3">
            {DATE_STAGES.map((stage) => {
              const v = selectedVenues[stage.id]
              if (!v) return null
              return (
                <div key={stage.id} className="flex items-center gap-3 text-sm">
                  <span className="text-lg">{stage.icon}</span>
                  <span className="font-semibold text-slate-900">{v.name}</span>
                  <span className="text-slate-400">{v.address}</span>
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
