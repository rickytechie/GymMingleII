/**
 * Avatar & imagery helpers.
 *
 * Keeping URL-generation logic here (rather than in UI components) means the
 * web and mobile apps render identical, deterministic imagery for the same
 * profile — and swapping providers is a one-line change.
 */

export type AvatarProvider = 'photo' | 'illustration'

export interface AvatarOptions {
  /** Stable seed (e.g. profile id or name) so a user always gets the same image. */
  seed: string
  /** Fallback style. `photo` = realistic photography, `illustration` = generated avatar. Defaults to `photo`. */
  provider?: AvatarProvider
  /** Square render size in pixels. Defaults to 400. */
  size?: number
}

const DICEBEAR_BASE = 'https://api.dicebear.com/9.x'
const DICEBEAR_STYLE = 'avataaars'
// Lorem Picsum serves real photography deterministically by seed with no API key.
const PICSUM_BASE = 'https://picsum.photos'

function normalizeSeed(seed: string): string {
  return seed.trim() || 'gymmingle'
}

/** Deterministic illustrated avatar (no API key required, always available). */
export function getDiceBearAvatar(seed: string, size = 400): string {
  const params = new URLSearchParams({
    seed: normalizeSeed(seed),
    size: String(size),
    radius: '12',
  })
  return `${DICEBEAR_BASE}/${DICEBEAR_STYLE}/svg?${params.toString()}`
}

/** Deterministic realistic photograph keyed by seed (no API key required). */
export function getPhoto(seed: string, size = 400): string {
  return `${PICSUM_BASE}/seed/${encodeURIComponent(normalizeSeed(seed))}/${size}/${size}`
}

/**
 * Resolve the best available avatar URL for a profile:
 * the stored `avatarUrl` when present, otherwise a deterministic generated
 * fallback so cards never render an empty state.
 */
export function resolveAvatarUrl(
  avatarUrl: string | null | undefined,
  options: AvatarOptions,
): string {
  const trimmed = avatarUrl?.trim()
  if (trimmed) {
    return trimmed
  }

  const size = options.size ?? 400
  return options.provider === 'illustration'
    ? getDiceBearAvatar(options.seed, size)
    : getPhoto(options.seed, size)
}
