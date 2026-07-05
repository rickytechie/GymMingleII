/**
 * Avatar & imagery helpers.
 *
 * Keeping URL-generation logic here (rather than in UI components) means the
 * web and mobile apps render identical, deterministic imagery for the same
 * profile — and swapping providers is a one-line change.
 */

export type AvatarProvider = 'dicebear' | 'unsplash'

export interface AvatarOptions {
  /** Stable seed (e.g. profile id or name) so a user always gets the same image. */
  seed: string
  /** Provider for the generated fallback. Defaults to `dicebear`. */
  provider?: AvatarProvider
  /** Square render size in pixels. Defaults to 400. */
  size?: number
}

const DICEBEAR_BASE = 'https://api.dicebear.com/9.x'
const DICEBEAR_STYLE = 'avataaars'
const UNSPLASH_BASE = 'https://source.unsplash.com'
/** Curated Unsplash collection of fitness/portrait photography. */
const UNSPLASH_FITNESS_COLLECTION = '1163637'

function slugifySeed(seed: string): string {
  return encodeURIComponent(seed.trim() || 'gymmingle')
}

/** Deterministic illustrated avatar (no API key required, always available). */
export function getDiceBearAvatar(seed: string, size = 400): string {
  const params = new URLSearchParams({
    seed: seed.trim() || 'gymmingle',
    size: String(size),
    radius: '12',
  })
  return `${DICEBEAR_BASE}/${DICEBEAR_STYLE}/svg?${params.toString()}`
}

/** Deterministic realistic photograph sourced from an Unsplash collection. */
export function getUnsplashPhoto(seed: string, size = 400): string {
  return `${UNSPLASH_BASE}/collection/${UNSPLASH_FITNESS_COLLECTION}/${size}x${size}?sig=${slugifySeed(seed)}`
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
  return options.provider === 'unsplash'
    ? getUnsplashPhoto(options.seed, size)
    : getDiceBearAvatar(options.seed, size)
}
