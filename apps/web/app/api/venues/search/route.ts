import { NextResponse } from 'next/server'
import { GooglePlacesVenueService } from '@gymmingle/core'
import { supabase, isSupabaseConfigured } from '@gymmingle/core'
import { CITY_REGIONS } from '@gymmingle/core'

const placesService = new GooglePlacesVenueService()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cityKey = searchParams.get('city') ?? 'nyc'
  const category = searchParams.get('category')

  const region = CITY_REGIONS[cityKey]
  if (!region) {
    return NextResponse.json({ error: 'Unknown city' }, { status: 400 })
  }

  // Try Supabase first
  if (isSupabaseConfigured) {
    let query = supabase
      .from('venues')
      .select('*')
      .eq('region_id', cityKey)
      .order('rating', { ascending: false })
      .limit(100)

    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    if (!error && data && data.length > 0) {
      return NextResponse.json({ source: 'supabase', venues: data })
    }
  }

  // Fall back to Google Places API
  if (placesService.available) {
    try {
      const venues = await placesService.fetchVenuesForCity(
        cityKey,
        region.label,
        region.center,
        region.radius,
      )

      // Upsert to Supabase in background if configured
      if (isSupabaseConfigured && venues.length > 0) {
        const upsertData = venues.map((v) => ({
          id: v.id,
          name: v.name,
          address: v.address,
          latitude: v.location?.latitude ?? region.center.latitude,
          longitude: v.location?.longitude ?? region.center.longitude,
          rating: v.rating ?? 0,
          user_rating_count: v.userRatingCount ?? 0,
          photo_names: v.photoNames,
          types: v.types,
          region_id: cityKey,
          category: category ?? 'Fitness',
          google_place_id: v.id.replace('places_', ''),
          updated_at: new Date().toISOString(),
        }))

        supabase.from('venues').upsert(upsertData, { onConflict: 'id' }).then(({ error }) => {
          if (error) console.error('Supabase venue upsert error:', error)
        })
      }

      return NextResponse.json({ source: 'google_places', venues })
    } catch (err) {
      return NextResponse.json(
        { error: (err as Error).message },
        { status: 500 },
      )
    }
  }

  // Final fallback — return empty
  return NextResponse.json({ source: 'none', venues: [] })
}
