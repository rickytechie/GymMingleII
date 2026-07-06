'use client'

import { useEffect, useCallback, useState } from 'react'
import { resolveAvatarUrl } from '@gymmingle/core'
import { ReportModal } from './ReportModal'
import type { CommunityProfile } from '@gymmingle/core'
import type { Decision } from './ProfileCard'

interface ProfileModalProps {
  profile: CommunityProfile | null
  onClose: () => void
  decision?: Decision
  onDecision?: (id: string, decision: Decision) => void
}

export function ProfileModal({ profile, onClose, decision, onDecision }: ProfileModalProps) {
  const [showReport, setShowReport] = useState(false)
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

  const avatarUrl = resolveAvatarUrl(profile.avatar_url, {
    seed: profile.id || profile.name,
    size: 300,
  })

  const handleDecision = (d: Decision) => {
    if (onDecision) onDecision(profile.id, d)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-2 border-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}

        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-6 p-8 border-b-2 border-black">
          <div className="w-28 h-28 shrink-0 bg-black border-2 border-black overflow-hidden">
            <img
              src={avatarUrl}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-3xl font-black text-black">{profile.name}</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border-2 border-black bg-black text-white">
                {profile.mingleCoins.tier}
              </span>
            </div>
            <p className="mt-2 text-sm text-black/60">{profile.bio ?? ''}</p>
            <div className="mt-3 flex flex-wrap gap-3 text-xs font-bold text-black/50">
              <span>{profile.age} years</span>
              <span className="text-black/20">|</span>
              <span>{profile.city}</span>
              <span className="text-black/20">|</span>
              <span>{profile.occupation}</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {/* Fitness */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-black p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">Style</p>
              <p className="mt-1 text-sm font-bold text-black">{profile.fitnessStyle}</p>
            </div>
            <div className="border-2 border-black p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">Level</p>
              <p className="mt-1 text-sm font-bold text-black capitalize">{profile.fitnessLevel}</p>
            </div>
            <div className="border-2 border-black p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">Build</p>
              <p className="mt-1 text-sm font-bold text-black capitalize">{profile.build}</p>
            </div>
            <div className="border-2 border-black p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">Pref</p>
              <p className="mt-1 text-sm font-bold text-black capitalize">{profile.indoorOutdoorPref}</p>
            </div>
          </div>

          {/* Looking For */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2">Looking For</p>
            <div className="flex flex-wrap gap-2">
              {(profile.lookingFor ?? []).map((l: string) => (
                <span key={l} className="bg-black text-white text-xs font-bold px-3 py-1">
                  {l.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </div>

          {/* Sports */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2">Sports</p>
            <div className="flex flex-wrap gap-2">
              {(profile.sports ?? []).map((s: string) => (
                <span key={s} className="border-2 border-black/20 text-black/70 text-xs font-bold px-3 py-1">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Kink Date Preferences */}
          {profile.kinkDatePreferences && profile.kinkDatePreferences.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2">
                Kink / Date Preferences
              </p>
              <div className="flex flex-wrap gap-2">
                {(profile.kinkDatePreferences ?? []).map((k: string) => (
                  <span key={k} className="bg-black text-[#CCFF00] text-xs font-bold px-3 py-1">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* MingleCoins */}
          <div className="border-t-2 border-black pt-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">MingleCoins</p>
              <p className="text-lg font-black text-black">{profile.mingleCoins.balance.toLocaleString()} MC</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {(profile.premiumFeatures ?? []).slice(0, 6).map((f: string) => (
                <span key={f} className="bg-black/5 text-black/70 text-[10px] font-bold px-2 py-0.5">
                  {f.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Decision footer */}
        <div className="border-t-2 border-black p-6 flex flex-col gap-3">
          <div className="flex gap-3">
            <button
              onClick={() => handleDecision('pass')}
              className={`flex-1 border-2 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                decision === 'pass'
                  ? 'border-black bg-black text-white'
                  : 'border-black/20 text-black/60 hover:border-black hover:text-black'
              }`}
            >
              ✕ Pass
            </button>
            <button
              onClick={() => handleDecision('maybe')}
              className={`flex-1 border-2 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                decision === 'maybe'
                  ? 'border-black bg-black text-white'
                  : 'border-black/20 text-black/60 hover:border-black hover:text-black'
              }`}
            >
              ? Maybe
            </button>
            <button
              onClick={() => handleDecision('like')}
              className={`flex-1 border-2 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                decision === 'like'
                  ? 'border-[#CCFF00] bg-black text-[#CCFF00]'
                  : 'border-black/20 text-black/60 hover:border-[#CCFF00] hover:text-black'
              }`}
            >
              ♥ Like
            </button>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {/* placeholder: integrate with messages table */}}
              className="flex-1 border-2 border-black/20 text-black/60 py-3 text-xs font-bold uppercase tracking-wider hover:border-black hover:text-black transition-colors"
            >
              ✉ Message
            </button>
            <button
              onClick={() => setShowReport(true)}
              className="flex-1 border-2 border-red-200 text-red-500 py-3 text-xs font-bold uppercase tracking-wider hover:border-red-500 hover:text-red-600 transition-colors"
            >
              ⚑ Report
            </button>
            <button
              onClick={onClose}
              className="border-2 border-black bg-black text-white px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-black/80 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      {showReport && (
        <ReportModal
          type="user"
          targetName={profile.name}
          targetId={profile.id}
          onClose={() => setShowReport(false)}
        />
      )}
    </div>
  )
}

export default ProfileModal
