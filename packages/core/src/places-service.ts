import type { VenueCategory } from './venues'
import type { Venue, LatLng } from './venue-service'

export interface PlacesServiceConfig {
  apiKey?: string
  fetchImpl?: typeof fetch
}

export class PlacesServiceError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message)
    this.name = 'PlacesServiceError'
  }
}

interface GooglePlacesResult {
  place_id: string
  name: string
  formatted_address?: string
  geometry?: {
    location: { lat: number; lng: number }
  }
  rating?: number
  user_ratings_total?: number
  types?: string[]
  photos?: { photo_reference: string }[]
}

interface GooglePlacesResponse {
  results: GooglePlacesResult[]
  status: string
  error_message?: string
  next_page_token?: string
}

const CATEGORY_QUERIES: Record<VenueCategory, string[]> = {
  Fitness: ['gym', 'fitness center', 'boxing gym', 'crossfit', 'yoga studio'],
  Dining: ['restaurant', 'fine dining', 'cafe'],
  Nightlife: ['nightclub', 'bar', 'lounge', 'pub'],
  Wellness: ['spa', 'wellness center', 'massage', 'pilates studio'],
  Outdoor: ['park', 'hiking trail', 'nature preserve', 'beach'],
  Arts: ['art gallery', 'museum', 'theater', 'performance venue'],
  Music: ['music venue', 'concert hall', 'live music'],
  Skatepark: ['skate park', 'skateboard park'],
  Bathhouse: ['bathhouse', 'sauna', 'steam room'],
  StripClub: ['strip club', 'adult entertainment'],
}

const PLACES_TYPE_MAP: Record<string, VenueCategory> = {
  gym: 'Fitness',
  health: 'Fitness',
  spa: 'Wellness',
  restaurant: 'Dining',
  night_club: 'Nightlife',
  bar: 'Nightlife',
  park: 'Outdoor',
  art_gallery: 'Arts',
  museum: 'Arts',
  theater: 'Arts',
  music_venue: 'Music',
  bowling_alley: 'Fitness',
  stadium: 'Fitness',
  swimming_pool: 'Fitness',
}

function inferCategoryFromTypes(types: string[]): VenueCategory {
  for (const t of types) {
    const mapped = PLACES_TYPE_MAP[t]
    if (mapped) return mapped
  }
  return 'Fitness'
}

export class GooglePlacesVenueService {
  private readonly apiKey: string | undefined
  private readonly fetchImpl: typeof fetch
  private readonly baseUrl = 'https://maps.googleapis.com/maps/api/place'
  private readonly isConfigured: boolean

  constructor(config: PlacesServiceConfig = {}) {
    this.apiKey = config.apiKey ?? process.env.GOOGLE_PLACES_API_KEY
    this.fetchImpl = config.fetchImpl ?? globalThis.fetch.bind(globalThis)
    this.isConfigured = Boolean(this.apiKey)
  }

  get available(): boolean {
    return this.isConfigured
  }

  async searchText(query: string, opts?: { lat?: number; lng?: number; radius?: number }): Promise<Venue[]> {
    if (!this.isConfigured) {
      throw new PlacesServiceError('Google Places API key not configured. Set GOOGLE_PLACES_API_KEY env var.')
    }

    const params = new URLSearchParams({
      query,
      key: this.apiKey!,
    })

    if (opts?.lat != null && opts?.lng != null) {
      params.set('location', `${opts.lat},${opts.lng}`)
      params.set('radius', String(opts.radius ?? 5000))
    }

    const url = `${this.baseUrl}/textsearch/json?${params.toString()}`
    const data = await this.fetchJson<GooglePlacesResponse>(url)
    return this.normalizeResults(data)
  }

  async searchNearby(lat: number, lng: number, radius: number, type?: string): Promise<Venue[]> {
    if (!this.isConfigured) {
      throw new PlacesServiceError('Google Places API key not configured.')
    }

    const params = new URLSearchParams({
      location: `${lat},${lng}`,
      radius: String(radius),
      key: this.apiKey!,
    })
    if (type) params.set('type', type)

    const url = `${this.baseUrl}/nearbysearch/json?${params.toString()}`
    const data = await this.fetchJson<GooglePlacesResponse>(url)
    return this.normalizeResults(data)
  }

  async fetchVenuesForCity(
    cityKey: string,
    cityLabel: string,
    center: LatLng,
    radius: number,
  ): Promise<Venue[]> {
    if (!this.isConfigured) return []

    const allVenues: Venue[] = []
    const seen = new Set<string>()

    for (const [_cat, queries] of Object.entries(CATEGORY_QUERIES)) {
      for (const query of queries) {
        if (allVenues.length >= 100) break

        try {
          const results = await this.searchText(`${query} in ${cityLabel}`, {
            lat: center.latitude,
            lng: center.longitude,
            radius,
          })

          for (const v of results) {
            if (!seen.has(v.id)) {
              seen.add(v.id)
              allVenues.push(v)
            }
          }
        } catch {
          // skip failed queries for individual categories
        }
      }
      if (allVenues.length >= 100) break
    }

    return allVenues.slice(0, 100)
  }

  private normalizeResults(data: GooglePlacesResponse): Venue[] {
    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      throw new PlacesServiceError(
        data.error_message ?? `Places API returned status: ${data.status}`,
      )
    }

    return (data.results ?? []).map((r) => ({
      id: `places_${r.place_id}`,
      name: r.name,
      address: r.formatted_address ?? null,
      location: r.geometry?.location
        ? { latitude: r.geometry.location.lat, longitude: r.geometry.location.lng }
        : null,
      rating: r.rating ?? null,
      userRatingCount: r.user_ratings_total ?? null,
      photoNames: (r.photos ?? []).map((p) => p.photo_reference),
      types: r.types ?? [],
    }))
  }

  private async fetchJson<T>(url: string): Promise<T> {
    const response = await this.fetchImpl(url)
    if (!response.ok) {
      throw new PlacesServiceError(
        `Places API request failed (${response.status})`,
        response.status,
      )
    }
    return (await response.json()) as T
  }
}

export function createPlacesService(config?: PlacesServiceConfig): GooglePlacesVenueService {
  return new GooglePlacesVenueService(config)
}
