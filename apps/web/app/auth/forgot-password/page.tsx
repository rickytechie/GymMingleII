"use client"

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '../../../src/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/`,
    })

    if (resetError) {
      setError(resetError.message)
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
        <Link href="/" className="mb-8 text-lg font-black tracking-tight text-black">
          GymMingle
        </Link>

        <h1 className="text-3xl font-black tracking-tight text-black">Reset your password</h1>
        <p className="mt-2 text-sm text-black/50">
          Enter your email and we&apos;ll send you a reset link.
        </p>

        {sent ? (
          <div className="mt-8 border-2 border-[#CCFF00] bg-[#CCFF00]/10 px-6 py-4">
            <p className="text-sm font-bold text-black">
              Check your email for the reset link.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-black/60">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="mt-1 block w-full border-2 border-black bg-white px-4 py-3 text-sm text-black placeholder-black/30 outline-none"
              />
            </div>

            {error && (
              <p className="border-2 border-red-500 bg-red-50 px-4 py-2 text-sm font-bold text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full border-2 border-black bg-black px-6 py-3 text-sm font-bold text-[#CCFF00] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Sending…' : 'Send reset link'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm">
          <Link href="/auth/login" className="font-bold text-black underline hover:text-black">
            Back to log in
          </Link>
        </div>
      </div>
    </main>
  )
}
