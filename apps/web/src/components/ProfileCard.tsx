import { resolveAvatarUrl, type AvatarProvider, type Profile } from '@gymmingle/core'

interface ProfileCardProps {
  profile: Profile
  /** Fallback imagery provider when `avatar_url` is missing. Defaults to realistic photography. */
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
      </div>
    </article>
  )
}

export default ProfileCard
