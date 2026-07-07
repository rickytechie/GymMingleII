'use client'

import Link from 'next/link'
import AuthStatus from './AuthStatus'

export function SiteHeader() {
  return (
    <nav className="flex w-full items-center justify-between border-b-2 border-black bg-white px-6 py-4 sm:px-8">
      <Link href="/" className="block">
        <p className="text-lg font-black tracking-tight text-black">GymMingle</p>
        <p className="text-xs font-bold text-black/50">Global Lifestyle Orchestration Engine</p>
      </Link>
      <div className="flex items-center gap-3">
        <Link
          href="/about"
          className="border-2 border-black px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black transition hover:bg-black hover:text-white"
        >
          Founder
        </Link>
        <Link
          href="/project"
          className="border-2 border-black px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black transition hover:bg-black hover:text-white"
        >
          Project
        </Link>
        <Link
          href="/vision"
          className="border-2 border-black px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black transition hover:bg-black hover:text-white"
        >
          Vision
        </Link>
        <Link
          href="/concept"
          className="border-2 border-black px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black transition hover:bg-black hover:text-white"
        >
          Concept
        </Link>
        <Link
          href="/vault"
          className="border-2 border-black bg-black px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#CCFF00] transition hover:opacity-90"
        >
          Vault
        </Link>
        <AuthStatus />
      </div>
    </nav>
  )
}

export default SiteHeader
