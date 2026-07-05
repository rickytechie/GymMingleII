import { Zap, Users, Sparkles } from 'lucide-react'

export default function LandingHeader() {
  return (
    <header className="flex items-center justify-between gap-4 px-2 py-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-electric-lime/15 text-slate-900 shadow-sm">
          <Zap className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <div className="text-lg font-bold tracking-tight text-slate-900">GymMingle</div>
          <div className="text-xs text-slate-600">Workout matching that feels human.</div>
        </div>
      </div>

      <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm text-slate-700 md:flex">
        <Users className="h-4 w-4" aria-hidden="true" />
        Built for accountability
        <Sparkles className="h-4 w-4 text-sunset-orange" aria-hidden="true" />
      </div>
    </header>
  )
}

