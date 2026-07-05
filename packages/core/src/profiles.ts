import { supabase } from './supabase'

export interface Profile {
  id: string
  name: string
  bio: string | null
  avatar_url: string | null
}

export interface FetchProfilesOptions {
  limit?: number
}

const DEFAULT_LIMIT = 25

/**
 * Load community profiles from Supabase.
 *
 * Data access lives in `@gymmingle/core` so UI layers stay declarative and the
 * same query can be reused across web and mobile.
 */
export async function fetchProfiles(options: FetchProfilesOptions = {}): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, bio, avatar_url')
    .limit(options.limit ?? DEFAULT_LIMIT)

  if (error) {
    throw error
  }

  return (data ?? []) as Profile[]
}
