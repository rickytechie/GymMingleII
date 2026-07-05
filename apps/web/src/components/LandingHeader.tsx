export function LandingHeader() {
  return (
    <nav className="flex w-full items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur sm:px-8">
      <div>
        <p className="text-lg font-semibold tracking-tight text-slate-900">GymMingle</p>
        <p className="text-sm text-slate-600">Workout matching that feels human.</p>
      </div>
      <a
        href="#waitlist"
        className="rounded-full bg-[#CCFF00] px-5 py-2 text-sm font-semibold text-slate-950 transition hover:opacity-90"
      >
        Join waitlist
      </a>
    </nav>
  )
}

export default LandingHeader
