'use client'

import { useEffect, useCallback } from 'react'
import type { CommunityProfile } from '@gymmingle/core'

interface ProfileModalProps {
  profile: CommunityProfile | null
  onClose: () => void
}

export function ProfileModal({ profile, onClose }: ProfileModalProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (profile) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [profile, handleKey])

  if (!profile) return null

  const tierColors: Record<string, string> = {
    Free: 'bg-slate-100 text-slate-400 border-slate-200',
    Starter: 'bg-slate-200 text-slate-700 border-slate-300',
    Momentum: 'bg-[#CCFF00] text-slate-900 border-[#CCFF00]',
    Peak: 'bg-slate-900 text-[#CCFF00] border-slate-800',
    Apex: 'bg-purple-900 text-[#CCFF00] border-purple-800',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-2 border-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-slate-900 text-white text-xl font-black hover:bg-slate-700 transition-colors"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-6 p-8 border-b-2 border-slate-200">
          <div className="w-28 h-28 shrink-0 bg-slate-100 border-2 border-slate-900 overflow-hidden">
            <img
              src={profile.avatar_url ?? `https://api.dicebear.com/9.x/avataaars/svg?seed=${profile.id}`}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-3xl font-black text-slate-900">{profile.name}</h2>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border ${tierColors[profile.mingleCoins.tier] ?? 'bg-slate-100 text-slate-400'}`}>
                {profile.mingleCoins.tier}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{profile.bio ?? ''}</p>
            <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
              <span>{profile.age} years</span>
              <span className="text-slate-300">|</span>
              <span>{profile.city}</span>
              <span className="text-slate-300">|</span>
              <span>{profile.occupation}</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {/* Fitness */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-slate-200 p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Fitness Style</p>
              <p className="mt-1 text-sm font-bold text-slate-900">{profile.fitnessStyle}</p>
            </div>
            <div className="border-2 border-slate-200 p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Level</p>
              <p className="mt-1 text-sm font-bold text-slate-900 capitalize">{profile.fitnessLevel}</p>
            </div>
            <div className="border-2 border-slate-200 p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Build</p>
              <p className="mt-1 text-sm font-bold text-slate-900 capitalize">{profile.build}</p>
            </div>
            <div className="border-2 border-slate-200 p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Pref</p>
              <p className="mt-1 text-sm font-bold text-slate-900 capitalize">{profile.indoorOutdoorPref}</p>
            </div>
          </div>

          {/* Looking For */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Looking For</p>
            <div className="flex flex-wrap gap-2">
              {(profile.lookingFor ?? []).map((l: string) => (
                <span key={l} className="bg-slate-900 text-white text-xs font-bold px-3 py-1">
                  {l.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </div>

          {/* Sports & Activities */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Sports</p>
            <div className="flex flex-wrap gap-2">
              {(profile.sports ?? []).map((s: string) => (
                <span key={s} className="border-2 border-slate-200 text-slate-700 text-xs font-bold px-3 py-1">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Kink Date Preferences (Premium only) */}
          {profile.kinkDatePreferences && profile.kinkDatePreferences.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                Kink / Date Preferences
                {profile.mingleCoins.tier !== 'Free' && profile.mingleCoins.tier !== 'Starter' && (
                  <span className="ml-2 text-[#CCFF00] bg-slate-900 px-1.5 py-0.5 text-[9px]">PREMIUM</span>
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                {(profile.kinkDatePreferences ?? []).map((k: string) => (
                  <span key={k} className="bg-purple-900 text-[#CCFF00] text-xs font-bold px-3 py-1">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* MingleCoins */}
          <div className="border-t-2 border-slate-200 pt-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">MingleCoins</p>
              <p className="text-lg font-black text-slate-900">{profile.mingleCoins.balance.toLocaleString()} MC</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {(profile.premiumFeatures ?? []).slice(0, 6).map((f: string) => (
                <span key={f} className="bg-[#CCFF00]/10 text-slate-700 text-[10px] font-bold px-2 py-0.5">
                  {f.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileModal
