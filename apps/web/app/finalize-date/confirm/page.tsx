/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Itinerary Sent — GymMingle',
  description: 'Your curated date itinerary is on its way.',
}

export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  const { email } = await searchParams

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
            ← Home
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <span className="inline-flex border-2 border-[#CCFF00] bg-black text-[#CCFF00] px-4 py-2 text-lg font-black">
          ✓
        </span>
        <h1 className="mt-6 text-4xl font-black tracking-tight text-black sm:text-5xl">
          Itinerary on its way!
        </h1>
        <p className="mt-4 text-black/60 text-lg">
          {email
            ? `We sent your 3-stage curated date plan to ${email}.`
            : 'Your 3-stage curated date plan is being prepared.'}
        </p>
        <p className="mt-2 text-black/40 text-sm">
          Check your inbox — and get ready to Sweat → Nourish → Unwind.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="border-2 border-black bg-black text-[#CCFF00] px-6 py-3 font-bold hover:bg-black/80 transition-colors"
          >
            Plan another date
          </Link>
        </div>
      </div>

      <footer className="border-t-2 border-black bg-white py-8 text-center text-xs text-black/50">
        <p>Built and Designed by RKYRNSM | RICKY RANSOM, LLC | &copy; 2026 RICKY RANSOM, LLC</p>
      </footer>
    </main>
  )
}
