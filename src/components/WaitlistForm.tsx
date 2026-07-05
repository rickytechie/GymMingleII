import { useMemo, useState } from 'react'
import { Send } from 'lucide-react'
import { isValidEmail } from '../lib/validators'
import { getStoredWaitlistCount, storeWaitlist } from '../lib/waitlist'

const SPORTS = [
  'Basketball',
  'Running',
  'Weight Training',
  'Yoga',
  'Cycling',
  'Pickleball',
] as const

type SportInterest = (typeof SPORTS)[number]

export default function WaitlistForm() {
  const storedCount = useMemo(() => getStoredWaitlistCount(), [])

  const [email, setEmail] = useState('')
  const [sport, setSport] = useState<SportInterest>('Weight Training')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'submitting') return

    setError(null)
    const cleanEmail = email.trim()
    if (!isValidEmail(cleanEmail)) {
      setError('Enter a valid email so we can send your early access invite.')
      return
    }

    setStatus('submitting')

    // MVP (no backend yet): store locally.
    // Next phase: swap this for an API call to Supabase/Firebase.
    await new Promise((r) => setTimeout(r, 350))

    storeWaitlist({
      email: cleanEmail,
      sportInterest: sport,
      createdAt: new Date().toISOString(),
    })

    setStatus('success')
    setEmail('')
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-white/70 p-4 shadow-sm backdrop-blur md:p-6">
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-electric-lime/15 px-3 py-1 text-sm font-medium text-slate-900">
          <span className="h-2 w-2 rounded-full bg-electric-lime" aria-hidden="true" />
          Early access waitlist
        </div>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-900">
          Find your workout buddy—faster.
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Join the list and get matched with people who actually show up.
        </p>
      </div>

      <div className="mb-4 text-sm text-slate-600">
        <span className="font-semibold text-slate-900">{storedCount}</span> people already raised their hand.
      </div>

      <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-2">
        <div className="md:col-span-1">
          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sunset-orange/60 focus:ring-4 focus:ring-sunset-orange/15"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="md:col-span-1">
          <label className="sr-only" htmlFor="sport">
            Sport interest
          </label>
          <select
            id="sport"
            name="sport"
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sunset-orange/60 focus:ring-4 focus:ring-sunset-orange/15"
            value={sport}
            onChange={(e) => setSport(e.target.value as SportInterest)}
          >
            {SPORTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {error ? (
          <div className="md:col-span-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={status !== 'idle'}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-sunset-orange/25 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'submitting' ? 'Saving…' : status === 'success' ? 'You’re in. See you soon!' : 'Request early access'}
            <Send className="h-4 w-4" aria-hidden="true" />
          </button>
          <p className="mt-2 text-xs text-slate-500">
            No spam. We’ll email when GymMingle is ready in your area.
          </p>
        </div>
      </form>

      <div className="mt-4 rounded-xl bg-electric-lime/10 p-3 text-xs text-slate-700">
        <span className="font-semibold">Social proof:</span> We’re building this with 50+ people who want workout accountability—not just motivation.
      </div>
    </div>
  )
}

