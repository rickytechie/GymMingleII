import { ArrowRight, CheckCircle2, HeartHandshake } from 'lucide-react'

export default function Hero({ onPrimaryAction }: { onPrimaryAction?: () => void }) {
  return (
    <section className="pt-2">
      <div className="grid items-start gap-8 md:grid-cols-2 md:gap-10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-900">
            <span className="h-2 w-2 rounded-full bg-electric-lime" aria-hidden="true" />
            MVP waitlist is open
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Match with a workout buddy who actually shows up.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            GymMingle pairs you with people who share your schedule and your sport—so your workouts become
            plans, not intentions.
          </p>

          <ul className="mt-6 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
            {[
              {
                icon: <CheckCircle2 className="h-4 w-4 text-sunset-orange" aria-hidden="true" />,
                t: 'Schedule-first matching',
                d: 'Find overlap quickly.',
              },
              {
                icon: <HeartHandshake className="h-4 w-4 text-electric-lime" aria-hidden="true" />,
                t: 'Accountability by design',
                d: 'Less ghosting, more consistency.',
              },
              {
                icon: <CheckCircle2 className="h-4 w-4 text-sunset-orange" aria-hidden="true" />,
                t: 'Confidence for beginners',
                d: 'Buddy energy, not pressure.',
              },
              {
                icon: <CheckCircle2 className="h-4 w-4 text-sunset-orange" aria-hidden="true" />,
                t: 'Progress you can feel',
                d: 'Train with intention.',
              },
            ].map((x) => (
              <li key={x.t} className="flex items-start gap-2">
                {x.icon}
                <div>
                  <div className="font-semibold text-slate-900">{x.t}</div>
                  <div className="text-xs text-slate-600">{x.d}</div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onPrimaryAction}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-sunset-orange/25"
            >
              Join the waitlist
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-900">Limited early access.</span> We onboard by activity to
              keep matches high-quality.
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-electric-lime/25 via-transparent to-sunset-orange/25 blur-2xl" />
          <div className="relative">
            <img
              src="/assets/hero.png"
              alt="People working out together"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-sm ring-1 ring-black/5"
              loading="eager"
            />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-black/5 bg-white/70 p-4">
                <div className="text-xs font-semibold text-slate-600">Today’s goal</div>
                <div className="mt-1 text-xl font-bold text-slate-900">1 workout, no excuses</div>
              </div>
              <div className="rounded-2xl border border-black/5 bg-white/70 p-4">
                <div className="text-xs font-semibold text-slate-600">Your advantage</div>
                <div className="mt-1 text-xl font-bold text-slate-900">Buddy momentum</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

