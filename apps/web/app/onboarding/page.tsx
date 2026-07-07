"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../src/lib/supabase/client'

type Step = 1 | 2 | 3 | 4

interface FormData {
  name: string
  age: string
  bio: string
  fitnessStyle: string
  fitnessLevel: string
  favoriteActivity: string
  avatarDataUrl: string
  lookingFor: string[]
  relationshipStatus: string
}

const FITNESS_STYLES = [
  'Strength Training', 'CrossFit', 'Yoga', 'Pilates', 'Running',
  'Cycling', 'Swimming', 'Martial Arts', 'Dance', 'Calisthenics', 'Other',
]

const FITNESS_LEVELS = ['beginner', 'intermediate', 'advanced', 'athlete']

const LOOKING_FOR_OPTIONS = [
  { value: 'training_partner', label: 'Training Partner' },
  { value: 'romantic_connection', label: 'Romantic Connection' },
  { value: 'friendship', label: 'Friendship' },
  { value: 'casual_dating', label: 'Casual Dating' },
]

const RELATIONSHIP_STATUSES = [
  'single', 'dating', 'married', 'open_relationship', 'its_complicated',
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState<FormData>({
    name: '',
    age: '',
    bio: '',
    fitnessStyle: '',
    fitnessLevel: '',
    favoriteActivity: '',
    avatarDataUrl: '',
    lookingFor: [],
    relationshipStatus: 'single',
  })

  const [previewUrl, setPreviewUrl] = useState<string>('')

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      setPreviewUrl(dataUrl)
      updateField('avatarDataUrl', dataUrl)
    }
    reader.readAsDataURL(file)
  }

  const toggleLookingFor = (value: string) => {
    setForm((prev) => ({
      ...prev,
      lookingFor: prev.lookingFor.includes(value)
        ? prev.lookingFor.filter((v) => v !== value)
        : [...prev.lookingFor, value],
    }))
  }

  const canProceed = (): boolean => {
    if (step === 1) return form.name.trim().length > 0 && form.age.trim().length > 0
    if (step === 2) return form.fitnessStyle.length > 0 && form.fitnessLevel.length > 0
    if (step === 3) return true
    if (step === 4) return form.lookingFor.length > 0
    return false
  }

  const nextStep = () => {
    if (step < 4) setStep((s) => (s + 1) as Step)
  }

  const prevStep = () => {
    if (step > 1) setStep((s) => (s - 1) as Step)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError('')

    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        setError('You must be logged in to complete onboarding.')
        setSubmitting(false)
        return
      }

      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong')
      }

      router.refresh()
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setSubmitting(false)
    }
  }

  const progress = (step / 4) * 100

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-12">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {([1, 2, 3, 4] as Step[]).map((s) => (
            <div
              key={s}
              className={`flex h-10 w-10 items-center justify-center border-2 text-sm font-bold transition-colors ${
                s <= step
                  ? 'border-black bg-black text-[#CCFF00]'
                  : 'border-black/20 bg-white text-black/30'
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="h-2 border-2 border-black mb-8">
          <div
            className="h-full bg-black transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {error && (
          <p className="border-2 border-red-500 bg-red-50 px-4 py-2 text-sm font-bold text-red-600 mb-6">
            {error}
          </p>
        )}

        {/* Step 1 – Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-black">Basic Info</h1>
              <p className="mt-1 text-sm text-black/50">Tell us about yourself.</p>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-black/60">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Your name"
                className="mt-1 block w-full border-2 border-black bg-white px-4 py-3 text-sm text-black placeholder-black/30 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-black/60">Age</label>
              <input
                type="number"
                value={form.age}
                onChange={(e) => updateField('age', e.target.value)}
                placeholder="Your age"
                min={13}
                max={150}
                className="mt-1 block w-full border-2 border-black bg-white px-4 py-3 text-sm text-black placeholder-black/30 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-black/60">Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => updateField('bio', e.target.value)}
                placeholder="Tell the community about yourself..."
                rows={4}
                className="mt-1 block w-full border-2 border-black bg-white px-4 py-3 text-sm text-black placeholder-black/30 outline-none resize-none"
              />
            </div>
          </div>
        )}

        {/* Step 2 – Fitness Profile */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-black">Fitness Profile</h1>
              <p className="mt-1 text-sm text-black/50">How do you move?</p>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-black/60">Fitness Style</label>
              <select
                value={form.fitnessStyle}
                onChange={(e) => updateField('fitnessStyle', e.target.value)}
                className="mt-1 block w-full border-2 border-black bg-white px-4 py-3 text-sm text-black outline-none"
              >
                <option value="">Select your style</option>
                {FITNESS_STYLES.map((style) => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-black/60">Fitness Level</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {FITNESS_LEVELS.map((level) => (
                  <button
                    key={level}
                    onClick={() => updateField('fitnessLevel', level)}
                    className={`border-2 px-4 py-3 text-sm font-bold capitalize transition-colors ${
                      form.fitnessLevel === level
                        ? 'border-black bg-black text-[#CCFF00]'
                        : 'border-black/20 text-black/60 hover:border-black hover:text-black'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-black/60">Favorite Activity</label>
              <input
                type="text"
                value={form.favoriteActivity}
                onChange={(e) => updateField('favoriteActivity', e.target.value)}
                placeholder="e.g. Deadlifts, Vinyasa, Sprints"
                className="mt-1 block w-full border-2 border-black bg-white px-4 py-3 text-sm text-black placeholder-black/30 outline-none"
              />
            </div>
          </div>
        )}

        {/* Step 3 – Photo Upload */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-black">Photo Upload</h1>
              <p className="mt-1 text-sm text-black/50">Upload a profile photo.</p>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-black/60">Profile Photo</label>
              <div className="mt-2 flex flex-col items-center gap-4">
                <div className="h-48 w-48 border-2 border-black bg-black/5 flex items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-black/30">No photo</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="block w-full text-sm text-black file:border-2 file:border-black file:bg-black file:text-[#CCFF00] file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:tracking-wider file:cursor-pointer"
                />
                <p className="text-[10px] text-black/40">PNG, JPG, WEBP accepted.</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 4 – Preferences */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-black">Preferences</h1>
              <p className="mt-1 text-sm text-black/50">What are you looking for?</p>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-black/60">Looking For</label>
              <div className="mt-2 grid grid-cols-1 gap-2">
                {LOOKING_FOR_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => toggleLookingFor(opt.value)}
                    className={`flex items-center gap-3 border-2 px-4 py-3 text-sm font-bold transition-colors ${
                      form.lookingFor.includes(opt.value)
                        ? 'border-black bg-black text-[#CCFF00]'
                        : 'border-black/20 text-black/60 hover:border-black hover:text-black'
                    }`}
                  >
                    <span className={`h-4 w-4 border-2 flex items-center justify-center ${
                      form.lookingFor.includes(opt.value) ? 'border-[#CCFF00] bg-[#CCFF00]' : 'border-black/30'
                    }`}>
                      {form.lookingFor.includes(opt.value) && (
                        <span className="text-black text-[10px] font-black">✓</span>
                      )}
                    </span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-black/60">Relationship Status</label>
              <select
                value={form.relationshipStatus}
                onChange={(e) => updateField('relationshipStatus', e.target.value)}
                className="mt-1 block w-full border-2 border-black bg-white px-4 py-3 text-sm text-black outline-none"
              >
                {RELATIONSHIP_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between gap-4">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="border-2 border-black px-6 py-3 text-sm font-bold hover:bg-black hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Back
          </button>

          {step < 4 ? (
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className="border-2 border-black bg-black text-[#CCFF00] px-6 py-3 text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed() || submitting}
              className="border-2 border-black bg-black text-[#CCFF00] px-6 py-3 text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {submitting ? 'Saving…' : 'Complete →'}
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
