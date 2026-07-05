import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

/** True when real Supabase credentials are configured for this environment. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

// Fall back to inert placeholders so static builds succeed when env vars are not
// present at build time. Real values are injected via NEXT_PUBLIC_* per environment.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'public-anon-key',
)
