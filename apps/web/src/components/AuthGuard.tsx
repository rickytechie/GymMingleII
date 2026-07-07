"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user ?? null
      setUser(u)
      setLoading(false)
      if (!u) {
        router.push('/auth/login')
      }
    })
  }, [router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex items-center gap-3 border-2 border-black px-6 py-4">
          <span className="h-4 w-4 animate-spin border-2 border-black border-t-transparent" />
          <span className="text-sm font-bold uppercase tracking-wider text-black">
            Checking access…
          </span>
        </div>
      </div>
    )
  }

  if (!user) return null

  return <>{children}</>
}

export default AuthGuard
