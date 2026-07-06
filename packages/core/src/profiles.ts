import { supabase, isSupabaseConfigured } from './supabase'
import { DEMO_PROFILES } from './demo-profiles'

import type { VisitRecord } from './passport'
import type { PremiumTier, PremiumFeature, MingleCoinAccount } from './minglecoin'

export interface Profile {
  id: string
  name: string
  bio: string | null
  avatar_url: string | null
  totalVisits?: number
  currentStreak?: number
  lastVenues?: { venueId: string; venueName: string }[]
  visitHistory?: VisitRecord[]
  premiumTier?: PremiumTier
  premiumFeatures?: PremiumFeature[]
  mingleCoins?: number | MingleCoinAccount
}

export interface FetchProfilesOptions {
  limit?: number
  includeDemo?: boolean
}

const DEFAULT_LIMIT = 25

export async function fetchProfiles(options: FetchProfilesOptions = {}): Promise<Profile[]> {
  const { includeDemo = true } = options

  if (!isSupabaseConfigured) {
    return includeDemo ? DEMO_PROFILES : []
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, bio, avatar_url, premium_tier, premium_features, mingle_coins')
    .limit(options.limit ?? DEFAULT_LIMIT)

  if (error) {
    if (includeDemo) return DEMO_PROFILES
    throw error
  }

  const supabaseProfiles: Profile[] = (data ?? []).map((row: Record<string, unknown>) => ({
    id: row.id as string,
    name: row.name as string,
    bio: (row.bio as string) ?? null,
    avatar_url: (row.avatar_url as string) ?? null,
    premiumTier: (row.premium_tier as PremiumTier) ?? undefined,
    premiumFeatures: (row.premium_features as PremiumFeature[]) ?? undefined,
    mingleCoins: (row.mingle_coins as number) ?? undefined,
  }))

  if (supabaseProfiles.length === 0 && includeDemo) return DEMO_PROFILES

  return supabaseProfiles
}

export function getDemoProfiles() {
  return DEMO_PROFILES
}
