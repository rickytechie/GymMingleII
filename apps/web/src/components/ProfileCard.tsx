import { resolveAvatarUrl, type AvatarProvider, type Profile } from '@gymmingle/core'

interface ProfileCardProps {
  profile: Profile
  fallbackProvider?: AvatarProvider
}

export function ProfileCard({ profile, fallbackProvider = 'photo' }: ProfileCardProps) {
  const imageUrl = resolveAvatarUrl(profile.avatar_url, {
    seed: profile.id || profile.name,
    provider: fallbackProvider,
    size: 640,
  })

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={profile.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900">{profile.name}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{profile.bio || 'No bio yet.'}</p>

        {profile.totalVisits != null && (
          <div className="mt-4 border-t border-slate-100 pt-3">
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span>
                <span className="font-semibold text-slate-900">{profile.totalVisits}</span> visits
              </span>
              {profile.currentStreak != null && profile.currentStreak > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-electric-lime/15 px-2 py-0.5 font-semibold text-slate-900">
                  <span className="h-1.5 w-1.5 rounded-full bg-electric-lime" />
                  {profile.currentStreak} streak
                </span>
              )}
            </div>
            {profile.lastVenues && profile.lastVenues.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {profile.lastVenues.map((v) => (
                  <span
                    key={v.venueId}
                    className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600"
                  >
                    {v.venueName}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default ProfileCard
