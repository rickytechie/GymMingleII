'use client'

import { useState } from 'react'
import Link from 'next/link'
import { buildItineraryEmailHtml } from '@gymmingle/core'
import type { ItineraryEmailData } from '@gymmingle/core'

const STAGE_ICONS: Record<string, string> = {
  sweat: '🏋️', nourish: '🍽️', unwind: '💆',
}

export default function FinalizeDatePage() {
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [shareError, setShareError] = useState('')

  const itinerary: ItineraryEmailData = {
    email: email || 'you@example.com',
    sweatVenue: { name: 'Chelsea Piers Fitness', address: '62 Chelsea Piers, New York, NY 10011', rating: 4.6 },
    nourishVenue: { name: 'Ai Fiori', address: '400 5th Ave, New York, NY 10018', rating: 4.6 },
    unwindVenue: { name: 'Aire Ancient Baths', address: '88 Franklin St, New York, NY 10013', rating: 4.5 },
    duration: '120 min',
    city: 'New York City',
  }

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSending(true)

    try {
      const html = buildItineraryEmailHtml({ ...itinerary, email })

      const res = await fetch('/api/send-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, html, subject: 'Your GymMingle Curated Date Itinerary' }),
      })

      if (res.ok) {
        setSent(true)
      } else {
        console.error('Failed to send email')
      }
    } catch (err) {
      console.error('Email send error:', err)
    } finally {
      setSending(false)
    }
  }

  const handleShareLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords
          const link = `https://www.google.com/maps?q=${latitude},${longitude}`
          const smsBody = encodeURIComponent(
            `I'm on a GymMingle date! Here's my live location: ${link}`
          )
          window.open(`sms:?&body=${smsBody}`, '_blank')
        },
        () => {
          setShareError('Unable to get location. Please enable GPS.')
        },
      )
    } else {
      setShareError('Geolocation not available on this device.')
    }
  }

  if (sent) {
    return (
      <main className="min-h-screen bg-white text-black">
        <header className="border-b-2 border-black">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
            <Link href="/" className="text-xl font-black tracking-tight text-black">GymMingle</Link>
            <Link href="/" className="border-2 border-black/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-black/70 hover:border-black hover:text-black transition-colors">← Home</Link>
          </div>
        </header>
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <span className="inline-flex border-2 border-[#CCFF00] bg-black text-[#CCFF00] px-4 py-2 text-lg font-black">✓</span>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-black sm:text-5xl">Itinerary sent!</h1>
          <p className="mt-4 text-black/60 text-lg">Your curated date plan is on its way to {email}.</p>
          <p className="mt-2 text-black/40 text-sm">Check your inbox — and get ready to Sweat → Nourish → Unwind.</p>
          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <Link href="/" className="border-2 border-black bg-black text-[#CCFF00] px-6 py-3 font-bold hover:bg-black/80 transition-colors">Plan another date</Link>
            <button onClick={handleShareLocation} className="border-2 border-black bg-white text-black px-6 py-3 font-bold hover:bg-black hover:text-white transition-colors">Share Live Location</button>
          </div>
          {shareError && <p className="mt-4 text-xs text-red-500">{shareError}</p>}
        </div>
        <footer className="border-t-2 border-black bg-white py-8 text-center text-xs text-black/50">
          <p>Built and Designed by RKYRNSM | RICKY RANSOM, LLC | &copy; 2026 RICKY RANSOM, LLC</p>
        </footer>
      </main>
    )
  }

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
          Review your 3-stage curated date. Enter your email to receive the full itinerary
          with venue details, reviews, and directions.
        </p>

        {/* Itinerary Preview */}
        <div className="mt-8 border-2 border-black p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-black/50">Your Date Plan</h3>
          {(['sweat', 'nourish', 'unwind'] as const).map((stage) => {
            const venue = itinerary[`${stage}Venue` as keyof typeof itinerary] as { name: string; address: string; rating: number }
            return (
              <div key={stage} className="flex items-start gap-4 border-l-4 border-black pl-4">
                <span className="text-xl">{STAGE_ICONS[stage]}</span>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-black/50">
                    Stage {stage === 'sweat' ? '1' : stage === 'nourish' ? '2' : '3'}: {stage.charAt(0).toUpperCase() + stage.slice(1)}
                  </p>
                  <p className="font-bold text-black">{venue.name}</p>
                  <p className="text-xs text-black/50">{venue.address}</p>
                  <p className="text-xs text-black/40">⭐ {venue.rating.toFixed(1)}</p>
                </div>
              </div>
            )
          })}
          <div className="flex gap-2 pt-2 border-t-2 border-black/10">
            <button
              onClick={handleShareLocation}
              className="border-2 border-black/20 px-3 py-1.5 text-xs font-bold text-black/60 hover:border-black hover:text-black transition-colors"
            >
              📍 Share Live Location
            </button>
          </div>
          {shareError && <p className="text-xs text-red-500">{shareError}</p>}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSendEmail}>
          <div>
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-black/50">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-2 block w-full border-2 border-black bg-white px-4 py-3 text-sm font-bold text-black placeholder:text-black/30 focus:outline-none focus:border-[#CCFF00] focus:ring-2 focus:ring-[#CCFF00]"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full border-2 border-black bg-black text-[#CCFF00] px-6 py-4 text-base font-bold hover:bg-black/80 transition-colors disabled:opacity-40"
          >
            {sending ? 'Sending...' : 'Send to Email'}
          </button>

          <p className="text-xs text-black/40 text-center">
            Emails sent from RickyRansomCompany@Gmail.com with branded GymMingle templates.
            No spam. Unsubscribe anytime.
          </p>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs font-bold text-black/40 underline hover:text-black"
          >
            ← Back to home
          </Link>
        </div>
      </div>

      <footer className="border-t-2 border-black bg-white py-8 text-center text-xs text-black/50">
        <p>Built and Designed by RKYRNSM | RICKY RANSOM, LLC | &copy; 2026 RICKY RANSOM, LLC</p>
      </footer>
    </main>
  )
}
