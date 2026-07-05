"use client"

import { useState } from 'react'
import { isValidEmail, storeWaitlist, createNoopStorage } from '@gymmingle/core'

export function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isValidEmail(email)) {
      setStatus('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)
    try {
      await storeWaitlist({ email, sportInterest: 'Fitness', createdAt: new Date().toISOString() }, createNoopStorage())
      setStatus('You’re on the list. We’ll be in touch soon.')
      setEmail('')
    } catch (error) {
      setStatus('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form id="waitlist" onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Join the waitlist</h2>
        <p className="mt-1 text-sm text-slate-600">Be first to try GymMingle when we launch.</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-full border border-slate-300 px-4 py-3 text-sm outline-none ring-0 focus:border-[#CCFF00]"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-[#FF6B35] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Joining…' : 'Join now'}
        </button>
      </div>
      {status ? <p className="mt-3 text-sm text-slate-600">{status}</p> : null}
    </form>
  )
}

export default WaitlistForm
