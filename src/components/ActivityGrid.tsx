import { useMemo, useState } from 'react'
import { Footprints, Dumbbell, HeartPulse, Flame, MessagesSquare, Bike } from 'lucide-react'

type Activity = {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
}

const ACTIVITIES: Activity[] = [
  {
    id: 'basketball',
    title: 'Basketball',
    subtitle: 'Games + pickup energy',
    icon: <MessagesSquare className="h-5 w-5" aria-hidden="true" />,
  },
  {
    id: 'running',
    title: 'Running',
    subtitle: 'Steady miles, shared pace',
    icon: <Footprints className="h-5 w-5" aria-hidden="true" />,
  },
  {
    id: 'strength',
    title: 'Weight Training',
    subtitle: 'Form checks, progress logs',
    icon: <Dumbbell className="h-5 w-5" aria-hidden="true" />,
  },
  {
    id: 'yoga',
    title: 'Yoga',
    subtitle: 'Breathe, reset, repeat',
    icon: <HeartPulse className="h-5 w-5" aria-hidden="true" />,
  },
  {
    id: 'cycling',
    title: 'Cycling',
    subtitle: 'Routes, rides, community',
    icon: <Bike className="h-5 w-5" aria-hidden="true" />,
  },
  {
    id: 'conditioning',
    title: 'Pickleball / Conditioning',
    subtitle: 'Fun intensity with friends',
    icon: <Flame className="h-5 w-5" aria-hidden="true" />,
  },
]

export default function ActivityGrid({
  onPick,
}: {
  onPick?: (activityId: string) => void
}) {
  const [picked, setPicked] = useState<string>('strength')

  const pickedActivity = useMemo(
    () => ACTIVITIES.find((a) => a.id === picked) ?? ACTIVITIES[0],
    [picked]
  )

  return (
    <section className="mt-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Choose your vibe</h2>
          <p className="mt-1 text-sm text-slate-600">
            Click an activity. We’ll match you with people who are serious about showing up.
          </p>
        </div>
        <div className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 md:block">
          Selected: <span className="font-semibold text-slate-900">{pickedActivity.title}</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {ACTIVITIES.map((a) => {
          const active = a.id === picked
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => {
                setPicked(a.id)
                onPick?.(a.id)
              }}
              className={
                'group rounded-2xl border px-3 py-4 text-left shadow-sm transition focus:outline-none focus:ring-4 focus:ring-sunset-orange/20 ' +
                (active
                  ? 'border-sunset-orange/40 bg-sunset-orange/10'
                  : 'border-slate-200 bg-white/80 hover:border-slate-300 hover:bg-white')
              }
              aria-pressed={active}
            >
              <div className="flex items-center gap-2">
                <div className={active ? 'text-slate-900' : 'text-slate-700'}>{a.icon}</div>
                <div className="text-sm font-semibold text-slate-900">{a.title}</div>
              </div>
              <div className="mt-1 text-xs text-slate-600">{a.subtitle}</div>
              <div className={active ? 'mt-3 h-1.5 bg-sunset-orange' : 'mt-3 h-1.5 bg-transparent group-hover:bg-slate-200'} />
            </button>
          )
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm text-slate-700 md:p-5">
        <div className="font-semibold text-slate-900">Next best step:</div>
        <div className="mt-1">
          Join the waitlist with your favorite activity. When we launch, we prioritize matches based on
          {` `}
          <span className="font-semibold">schedule overlap</span> + <span className="font-semibold">consistency</span>.
        </div>
      </div>
    </section>
  )
}

