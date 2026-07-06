/* eslint-disable react-refresh/only-export-components */
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { COMMUNITY_PROFILES } from '@gymmingle/core'

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  return COMMUNITY_PROFILES.map((p) => ({ id: p.id }))
}

const TIER_BG: Record<string, string> = {
  Free: 'bg-slate-100 text-slate-400',
  Starter: 'bg-slate-200 text-slate-700',
  Momentum: 'bg-[#CCFF00] text-slate-900',
  Peak: 'bg-slate-900 text-[#CCFF00]',
  Apex: 'bg-purple-900 text-[#CCFF00]',
}

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const profile = COMMUNITY_PROFILES.find((p) => p.id === id)
  if (!profile) notFound()

  const tier = profile.mingleCoins.tier
  const tierBg = TIER_BG[tier] ?? 'bg-slate-100 text-slate-400'

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b-2 border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-black tracking-tight text-white">
            GymMingle
          </Link>
          <Link
            href="/"
            className="border-2 border-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white transition-colors"
          >
            ← Back
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Profile header */}
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          <div className="w-32 h-32 shrink-0 bg-white/5 border-2 border-white/20 overflow-hidden">
            <img
              src={profile.avatar_url ?? `https://api.dicebear.com/9.x/avataaars/svg?seed=${profile.id}`}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-4xl font-black text-white">{profile.name}</h1>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${tierBg}`}>{tier}</span>
            </div>
            <p className="mt-3 text-white/60">{profile.bio}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/40">
              <span>{profile.age} years</span>
              <span>{profile.city}</span>
              <span>{profile.occupation}</span>
              <span className="capitalize">{profile.fitnessLevel}</span>
            </div>
          </div>
        </div>

        {/* Fitness details */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="border-2 border-white/10 p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Style</p>
            <p className="mt-1 text-sm font-bold text-white">{profile.fitnessStyle}</p>
          </div>
          <div className="border-2 border-white/10 p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Build</p>
            <p className="mt-1 text-sm font-bold text-white capitalize">{profile.build}</p>
          </div>
          <div className="border-2 border-white/10 p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Preference</p>
            <p className="mt-1 text-sm font-bold text-white capitalize">{profile.indoorOutdoorPref}</p>
          </div>
          <div className="border-2 border-white/10 p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Favorite</p>
            <p className="mt-1 text-sm font-bold text-white">{profile.favoriteActivity}</p>
          </div>
        </div>

        {/* Looking for */}
        <div className="mt-8">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-3">Looking For</p>
          <div className="flex flex-wrap gap-2">
            {profile.lookingFor.map((l) => (
              <span key={l} className="bg-white text-black text-xs font-bold px-3 py-1">
                {l.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        </div>

        {/* Sports */}
        <div className="mt-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-3">Sports</p>
          <div className="flex flex-wrap gap-2">
            {profile.sports.map((s) => (
              <span key={s} className="border-2 border-white/20 text-white/70 text-xs font-bold px-3 py-1">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Kink Prefs */}
        {profile.kinkDatePreferences && profile.kinkDatePreferences.length > 0 && (
          <div className="mt-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-3">
              Kink / Date Preferences
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.kinkDatePreferences.map((k) => (
                <span key={k} className="bg-purple-900 text-[#CCFF00] text-xs font-bold px-3 py-1">
                  {k}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* MingleCoins */}
        <div className="mt-10 border-t-2 border-white/10 pt-6">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">MingleCoins</p>
            <p className="text-2xl font-black text-[#CCFF00]">{profile.mingleCoins.balance.toLocaleString()} MC</p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.premiumFeatures.slice(0, 8).map((f) => (
              <span key={f} className="bg-[#CCFF00]/10 text-[#CCFF00] text-[10px] font-bold px-2 py-0.5">
                {f.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
