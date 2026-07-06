import { NextResponse } from 'next/server'
import { GooglePlacesVenueService, supabase, isSupabaseConfigured, CITY_REGIONS, VENUE_REGISTRY } from '@gymmingle/core'
import type { RegistryVenue } from '@gymmingle/core'

const placesService = new GooglePlacesVenueService()

const BOROUGH_MAP: Record<string, string> = {
  nyc: 'manhattan',
  manhattan: 'manhattan',
  brooklyn: 'brooklyn',
  queens: 'queens',
  bronx: 'bronx',
  staten_island: 'staten_island',
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cityKey = searchParams.get('city') ?? 'nyc'
  const category = searchParams.get('category')
  const query = searchParams.get('query')

  // Check venue registry first
  const registryBorough = BOROUGH_MAP[cityKey]
  if (registryBorough) {
    let registryResults: RegistryVenue[] = [...VENUE_REGISTRY.filter((v) => v.borough === registryBorough)]
    if (category) registryResults = registryResults.filter((v) => v.category === category)
    if (query) {
      const lower = query.toLowerCase()
      registryResults = registryResults.filter(
        (v) =>
          v.name.toLowerCase().includes(lower) ||
          v.address.toLowerCase().includes(lower) ||
          v.description.toLowerCase().includes(lower),
      )
    }
    if (registryResults.length > 0) {
      return NextResponse.json({ source: 'registry', venues: registryResults })
    }
  }

  const region = CITY_REGIONS[cityKey]
  if (!region) {
    return NextResponse.json({ error: 'Unknown city' }, { status: 400 })
  }

  // Try Supabase next
  if (isSupabaseConfigured) {
    let queryBuilder = supabase
      .from('venues')
      .select('*')
      .eq('region_id', cityKey)
      .order('rating', { ascending: false })
      .limit(100)

    if (category) queryBuilder = queryBuilder.eq('category', category)

    const { data, error } = await queryBuilder
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
      return NextResponse.json({ error: (err as Error).message }, { status: 500 })
    }
  }

  return NextResponse.json({ source: 'none', venues: [] })
}
