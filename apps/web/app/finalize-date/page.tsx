'use client'

import Link from 'next/link'

export default function FinalizeDatePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <header className="border-b-2 border-black">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-black tracking-tight text-black">
            GymMingle
          </Link>
          <Link
            href="/"
            className="border-2 border-black/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-black/70 hover:border-black hover:text-black transition-colors"
          >
            ← Back
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-16">
        <span className="inline-flex border-2 border-black bg-black text-[#CCFF00] px-3 py-1 text-sm font-bold uppercase tracking-wider">
          Finalize Date
        </span>
        <h1 className="mt-6 text-4xl font-black tracking-tight text-black sm:text-5xl">
          Your itinerary is ready
        </h1>
        <p className="mt-4 text-black/60 text-lg">
          Enter your email and we&apos;ll send the full 3-stage curated date plan — including venue details,
          directions, and premium upgrade options — straight to your inbox.
        </p>

        <form
          className="mt-10 space-y-6"
          onSubmit={(e) => {
            e.preventDefault()
            const form = e.currentTarget as HTMLFormElement
            const email = new FormData(form).get('email') as string
            if (email) {
              window.location.href = `/finalize-date/confirm?email=${encodeURIComponent(email)}`
            }
          }}
        >
          <div>
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-black/50">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="mt-2 block w-full border-2 border-black bg-white px-4 py-3 text-sm font-bold text-black placeholder:text-black/30 focus:outline-none focus:border-[#CCFF00] focus:ring-2 focus:ring-[#CCFF00]"
            />
          </div>

          <div className="border-2 border-black bg-black/5 p-6 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-black/50">Your Date Preview</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-lg">🏋️</span>
                <span className="text-sm font-bold text-black">Stage 1: Sweat</span>
                <span className="text-xs text-black/40">Fitness venue TBD</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">🍽️</span>
                <span className="text-sm font-bold text-black">Stage 2: Nourish</span>
                <span className="text-xs text-black/40">Dining venue TBD</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">💆</span>
                <span className="text-sm font-bold text-black">Stage 3: Unwind</span>
                <span className="text-xs text-black/40">Wellness venue TBD</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full border-2 border-black bg-black text-[#CCFF00] px-6 py-4 text-base font-bold hover:bg-black/80 transition-colors"
          >
            Send My Itinerary
          </button>

          <p className="text-xs text-black/40 text-center">
            By submitting you agree to receive your date itinerary via email.
            No spam. Unsubscribe anytime.
          </p>
        </form>
      </div>

      <footer className="border-t-2 border-black bg-white py-8 text-center text-xs text-black/50">
        <p>Built and Designed by RKYRNSM | RICKY RANSOM, LLC | &copy; 2026 RICKY RANSOM, LLC</p>
      </footer>
    </main>
  )
}
