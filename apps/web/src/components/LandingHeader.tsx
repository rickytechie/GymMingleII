import Link from 'next/link'
import AuthStatus from './AuthStatus'

export function LandingHeader() {
  return (
    <nav className="flex w-full items-center justify-between border-b-2 border-black bg-white px-6 py-4 sm:px-8">
      <Link href="/" className="block">
        <p className="text-lg font-black tracking-tight text-black">GymMingle</p>
        <p className="text-xs font-bold text-black/50">Workout matching that feels human.</p>
      </Link>
      <div className="flex items-center gap-3">
        <Link
          href="/concept"
          className="border-2 border-black px-4 py-2 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-black hover:text-white"
        >
          Concept
        </Link>
        <a
          href="/#waitlist"
          className="border-2 border-black bg-black px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#CCFF00] transition hover:opacity-90"
        >
          Join waitlist
        </a>
        <AuthStatus />
      </div>
    </nav>
  )
}

export default LandingHeader
