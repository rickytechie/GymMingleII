import { NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured, COMMUNITY_PROFILES } from '@gymmingle/core'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city')
  const tier = searchParams.get('tier')
  const limit = Math.min(Number(searchParams.get('limit') ?? 50), 100)
  const offset = Number(searchParams.get('offset') ?? 0)

  // Try Supabase first
  if (isSupabaseConfigured) {
    let query = supabase
      .from('community_profiles')
      .select('*', { count: 'exact' })
      .order('minglecoin_balance', { ascending: false })
      .range(offset, offset + limit - 1)

    if (city) query = query.eq('city', city)
    if (tier) query = query.eq('minglecoin_tier', tier)

    const { data, error, count } = await query

    if (!error && data && data.length > 0) {
      return NextResponse.json({ source: 'supabase', profiles: data, total: count ?? data.length })
    }
  }

  // Fall back to static community profiles
  let results = [...COMMUNITY_PROFILES]
  if (city) results = results.filter((p) => p.city === city)
  if (tier) results = results.filter((p) => p.mingleCoins.tier === tier)
  const total = results.length
  results = results.slice(offset, offset + limit)

  return NextResponse.json({ source: 'static', profiles: results, total })
}
