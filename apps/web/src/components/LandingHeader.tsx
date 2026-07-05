import Link from 'next/link'

export function LandingHeader() {
  return (
    <nav className="flex w-full items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur sm:px-8">
      <Link href="/" className="block">
        <p className="text-lg font-semibold tracking-tight text-slate-900">GymMingle</p>
        <p className="text-sm text-slate-600">Workout matching that feels human.</p>
      </Link>
      <div className="flex items-center gap-3">
        <Link
          href="/concept"
          className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
        >
          Explore the concept
        </Link>
        <a
          href="/#waitlist"
          className="rounded-full bg-[#CCFF00] px-5 py-2 text-sm font-semibold text-slate-950 transition hover:opacity-90"
        >
          Join waitlist
        </a>
      </div>
    </nav>
  )
}

export default LandingHeader
