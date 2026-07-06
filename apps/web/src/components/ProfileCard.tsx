'use client'

import { resolveAvatarUrl } from '@gymmingle/core'
import type { Profile } from '@gymmingle/core'

export type Decision = 'like' | 'maybe' | 'pass' | null

interface ProfileCardProps {
  profile: Profile
  decision?: Decision
  onDecision?: (id: string, decision: Decision) => void
  onClick?: () => void
}

export function ProfileCard({ profile, decision, onDecision, onClick }: ProfileCardProps) {
  const imageUrl = resolveAvatarUrl(profile.avatar_url, {
    seed: profile.id || profile.name,
    size: 300,
  })

  const handleDecision = (d: Decision) => {
    if (onDecision) onDecision(profile.id, d)
  }

  return (
    <article className="group border-2 border-black bg-white transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#000]">
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-black cursor-pointer" onClick={onClick}>
        <img
          src={imageUrl}
          alt={profile.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2" onClick={onClick}>
          <div className="min-w-0">
            <h3 className="text-lg font-black text-black">{profile.name}</h3>
            {profile.bio && (
              <p className="mt-1 text-sm text-black/60 line-clamp-2">{profile.bio}</p>
            )}
          </div>
        </div>

        {/* Like / Maybe / Pass */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); handleDecision('pass') }}
            className={`flex-1 border-2 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
              decision === 'pass'
                ? 'border-black bg-black text-white'
                : 'border-black/20 text-black/60 hover:border-black hover:text-black'
            }`}
          >
            ✕ Pass
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDecision('maybe') }}
            className={`flex-1 border-2 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
              decision === 'maybe'
                ? 'border-black bg-black text-white'
                : 'border-black/20 text-black/60 hover:border-black hover:text-black'
            }`}
          >
            ? Maybe
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDecision('like') }}
            className={`flex-1 border-2 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
              decision === 'like'
                ? 'border-[#CCFF00] bg-black text-[#CCFF00]'
                : 'border-black/20 text-black/60 hover:border-[#CCFF00] hover:text-black'
            }`}
          >
            ♥ Like
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProfileCard
