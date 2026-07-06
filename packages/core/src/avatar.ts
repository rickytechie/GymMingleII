export type AvatarProvider = 'photo' | 'illustration'

export interface AvatarOptions {
  seed: string
  provider?: AvatarProvider
  size?: number
}

const PRAVATAR_BASE = 'https://i.pravatar.cc'

function normalizeSeed(seed: string): string {
  return seed.trim() || 'gymmingle'
}

export function getDiceBearAvatar(seed: string, size = 400): string {
  const params = new URLSearchParams({
    seed: normalizeSeed(seed),
    size: String(size),
    radius: '0',
  })
  return `https://api.dicebear.com/9.x/avataaars/svg?${params.toString()}`
}

export function getPortrait(seed: string, size = 400): string {
  return `${PRAVATAR_BASE}/${size}?u=${encodeURIComponent(normalizeSeed(seed))}`
}

export function resolveAvatarUrl(
  avatarUrl: string | null | undefined,
  options: AvatarOptions,
): string {
  const trimmed = avatarUrl?.trim()
  if (trimmed) return trimmed

  const size = options.size ?? 400
  return options.provider === 'illustration'
    ? getDiceBearAvatar(options.seed, size)
    : getPortrait(options.seed, size)
}
