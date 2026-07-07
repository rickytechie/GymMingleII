"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '../lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export function AuthStatus() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="inline-flex items-center gap-2 border-2 border-black/20 px-3 py-1.5">
        <span className="h-2 w-2 bg-black/20" />
        <span className="text-xs font-bold uppercase tracking-wider text-black/40">
          Loading…
        </span>
      </div>
    )
  }

  if (!user) {
    return (
      <Link
        href="/auth/login"
        className="inline-flex items-center gap-2 border-2 border-black bg-black px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#CCFF00] transition hover:opacity-90"
      >
        <span className="h-2 w-2 bg-[#CCFF00]" />
        Log in
      </Link>
    )
  }

  const name = user.user_metadata?.full_name ?? user.email ?? 'User'

  return (
    <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5">
      <div className="flex h-5 w-5 items-center justify-center border-2 border-black bg-[#CCFF00] text-[8px] font-black text-black">
        {name.charAt(0).toUpperCase()}
      </div>
      <span className="max-w-[100px] truncate text-xs font-bold text-black">
        {name}
      </span>
    </div>
  )
}

export default AuthStatus
