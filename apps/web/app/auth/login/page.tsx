"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '../../../src/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    router.refresh()
    router.push('/')
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
        <Link href="/" className="mb-8 text-lg font-black tracking-tight text-black">
          GymMingle
        </Link>

        <h1 className="text-3xl font-black tracking-tight text-black">Log in</h1>
        <p className="mt-2 text-sm text-black/50">Welcome back to your tribe.</p>

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

          <div>
            <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-black/60">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
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
            {loading ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-3 text-center text-sm">
          <Link href="/auth/forgot-password" className="font-bold text-black/50 underline hover:text-black">
            Forgot password?
          </Link>
          <p className="text-black/40">
            No account?{' '}
            <Link href="/auth/signup" className="font-bold text-black underline hover:text-black">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
