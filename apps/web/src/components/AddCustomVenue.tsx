'use client'

import { useState } from 'react'
import { supabase, isSupabaseConfigured } from '@gymmingle/core'

const VENUE_CATEGORIES = [
  'Fitness', 'Dining', 'Nightlife', 'Wellness', 'Outdoor',
  'Arts', 'Music', 'Skatepark', 'Bathhouse', 'StripClub',
]

interface AddCustomVenueProps {
  stage: 'sweat' | 'nourish' | 'unwind'
  cityKey: string
  onSaved: (venue: { name: string; address: string; rating: number }) => void
  onClose: () => void
}

export function AddCustomVenue({ stage, cityKey, onSaved, onClose }: AddCustomVenueProps) {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !address) return
    setSaving(true)

    const venue = {
      name,
      address,
      category: category || 'Fitness',
      description,
      rating: 4.0,
      userRatingCount: 1,
      source: 'custom',
    }

    if (isSupabaseConfigured) {
      await supabase.from('user_itinerary').insert({
        city: cityKey,
        stage,
        venue_name: name,
        venue_address: address,
        venue_category: category || 'Fitness',
        description,
        created_at: new Date().toISOString(),
      }).maybeSingle()
    }

    onSaved(venue)
    setDone(true)
  }

  if (done) {
    return (
      <div className="border-2 border-[#CCFF00] bg-[#CCFF00]/5 p-6">
        <p className="text-sm font-bold text-slate-900">Custom venue added!</p>
        <button onClick={onClose} className="mt-3 text-xs font-bold text-slate-500 underline">Close</button>
      </div>
    )
  }

  return (
    <div className="border-2 border-slate-200 p-6">
      <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">
        Add Custom Venue — {stage.charAt(0).toUpperCase() + stage.slice(1)}
      </h4>
      <form onSubmit={handleSave} className="space-y-4">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Venue name"
          className="block w-full border-2 border-slate-200 bg-white px-3 py-2 text-sm font-bold text-black focus:outline-none focus:border-slate-900 placeholder:text-black/30"
        />
        <input
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          className="block w-full border-2 border-slate-200 bg-white px-3 py-2 text-sm font-bold text-black focus:outline-none focus:border-slate-900 placeholder:text-black/30"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="block w-full border-2 border-slate-200 bg-white px-3 py-2 text-sm font-bold text-black focus:outline-none focus:border-slate-900"
        >
          <option value="">Select category</option>
          {VENUE_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          rows={2}
          className="block w-full border-2 border-slate-200 bg-white px-3 py-2 text-sm font-bold text-black focus:outline-none focus:border-slate-900 placeholder:text-black/30"
        />
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-slate-900 text-[#CCFF00] px-4 py-2 text-xs font-bold uppercase tracking-wider disabled:opacity-40"
          >
            {saving ? 'Saving...' : 'Save venue'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="border-2 border-slate-200 px-4 py-2 text-xs font-bold text-slate-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
