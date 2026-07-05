/**
 * Venue service — a thin, typed wrapper around the Google Places API (New, v1).
 *
 * All GymMingle venue discovery logic lives here so both the web and mobile
 * apps can share a single, well-typed contract. The service is transport-only:
 * it performs no rendering and holds no framework dependencies.
 *
 * Docs: https://developers.google.com/maps/documentation/places/web-service
 */

export interface LatLng {
  latitude: number
  longitude: number
}

/** A normalized venue as consumed by GymMingle features. */
export interface Venue {
  id: string
  name: string
  address: string | null
  location: LatLng | null
  rating: number | null
  userRatingCount: number | null
  /** Ready-to-render photo references (resolve to URLs via {@link VenueService.getPhotoUrl}). */
  photoNames: string[]
  /** Raw Google "types" (e.g. "gym", "fitness_center"). */
  types: string[]
}

export interface NearbyVenueQuery {
  center: LatLng
  /** Search radius in meters (1–50000). Defaults to 5000. */
  radiusMeters?: number
  /** Google place types to include, e.g. ["gym", "fitness_center"]. */
  includedTypes?: string[]
  /** Maximum results to return (1–20). Defaults to 20. */
  maxResults?: number
}

export interface TextVenueQuery {
  query: string
  center?: LatLng
  radiusMeters?: number
  maxResults?: number
}

export interface VenueServiceConfig {
  apiKey: string
  /** Override for testing or regional endpoints. */
  baseUrl?: string
  /** Injectable fetch implementation (defaults to global `fetch`). */
  fetchImpl?: typeof fetch
}

export class VenueServiceError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message)
    this.name = 'VenueServiceError'
  }
}

const DEFAULT_BASE_URL = 'https://places.googleapis.com/v1'
const DEFAULT_RADIUS_METERS = 5000
const DEFAULT_MAX_RESULTS = 20
const DEFAULT_GYM_TYPES = ['gym', 'fitness_center']

/** Field mask requested from the Places API — keeps payloads small and typed. */
const VENUE_FIELD_MASK = [
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.location',
  'places.rating',
  'places.userRatingCount',
  'places.photos',
  'places.types',
].join(',')

interface RawPlace {
  id?: string
  displayName?: { text?: string }
  formattedAddress?: string
  location?: { latitude?: number; longitude?: number }
  rating?: number
  userRatingCount?: number
  photos?: { name?: string }[]
  types?: string[]
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function normalizePlace(raw: RawPlace): Venue | null {
  if (!raw.id) {
    return null
  }

  const location =
    raw.location?.latitude != null && raw.location?.longitude != null
      ? { latitude: raw.location.latitude, longitude: raw.location.longitude }
      : null

  return {
    id: raw.id,
    name: raw.displayName?.text ?? 'Unnamed venue',
    address: raw.formattedAddress ?? null,
    location,
    rating: raw.rating ?? null,
    userRatingCount: raw.userRatingCount ?? null,
    photoNames: (raw.photos ?? []).map((photo) => photo.name).filter((name): name is string => Boolean(name)),
    types: raw.types ?? [],
  }
}

export class VenueService {
  private readonly apiKey: string
  private readonly baseUrl: string
  private readonly fetchImpl: typeof fetch

  constructor(config: VenueServiceConfig) {
    if (!config.apiKey) {
      throw new VenueServiceError('A Google Maps API key is required to use the VenueService.')
    }
    this.apiKey = config.apiKey
    this.baseUrl = config.baseUrl ?? DEFAULT_BASE_URL
    const fetchImpl = config.fetchImpl ?? globalThis.fetch
    if (!fetchImpl) {
      throw new VenueServiceError('No fetch implementation is available in this environment.')
    }
    this.fetchImpl = fetchImpl.bind(globalThis)
  }

  /** Find gyms and fitness venues near a coordinate. */
  async searchNearby(query: NearbyVenueQuery): Promise<Venue[]> {
    const body = {
      includedTypes: query.includedTypes ?? DEFAULT_GYM_TYPES,
      maxResultCount: clamp(query.maxResults ?? DEFAULT_MAX_RESULTS, 1, 20),
      locationRestriction: {
        circle: {
          center: query.center,
          radius: clamp(query.radiusMeters ?? DEFAULT_RADIUS_METERS, 1, 50000),
        },
      },
    }

    const data = await this.post<{ places?: RawPlace[] }>('/places:searchNearby', body)
    return (data.places ?? []).map(normalizePlace).filter((venue): venue is Venue => venue !== null)
  }

  /** Free-text venue search, e.g. "boxing gyms in Austin". */
  async searchText(query: TextVenueQuery): Promise<Venue[]> {
    const body: Record<string, unknown> = {
      textQuery: query.query,
      maxResultCount: clamp(query.maxResults ?? DEFAULT_MAX_RESULTS, 1, 20),
    }

    if (query.center) {
      body.locationBias = {
        circle: {
          center: query.center,
          radius: clamp(query.radiusMeters ?? DEFAULT_RADIUS_METERS, 1, 50000),
        },
      }
    }

    const data = await this.post<{ places?: RawPlace[] }>('/places:searchText', body)
    return (data.places ?? []).map(normalizePlace).filter((venue): venue is Venue => venue !== null)
  }

  /** Fetch a single venue by its Google place id. */
  async getVenue(placeId: string): Promise<Venue | null> {
    const data = await this.get<RawPlace>(`/places/${encodeURIComponent(placeId)}`, {
      'X-Goog-FieldMask': VENUE_FIELD_MASK.replace(/places\./g, ''),
    })
    return normalizePlace(data)
  }

  /**
   * Resolve a Places photo reference (from {@link Venue.photoNames}) into a
   * displayable image URL.
   */
  getPhotoUrl(photoName: string, maxWidthPx = 800): string {
    const params = new URLSearchParams({
      maxWidthPx: String(maxWidthPx),
      key: this.apiKey,
    })
    return `${this.baseUrl}/${photoName}/media?${params.toString()}`
  }

  private async post<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-FieldMask': VENUE_FIELD_MASK,
      },
      body: JSON.stringify(body),
    })
  }

  private async get<T>(path: string, extraHeaders: Record<string, string> = {}): Promise<T> {
    return this.request<T>(path, { method: 'GET', headers: extraHeaders })
  }

  private async request<T>(path: string, init: RequestInit): Promise<T> {
    const headers = new Headers(init.headers)
    headers.set('X-Goog-Api-Key', this.apiKey)

    let response: Response
    try {
      response = await this.fetchImpl(`${this.baseUrl}${path}`, { ...init, headers })
    } catch (cause) {
      throw new VenueServiceError(`Failed to reach the Places API: ${(cause as Error).message}`)
    }

    if (!response.ok) {
      const detail = await response.text().catch(() => '')
      throw new VenueServiceError(
        `Places API request failed (${response.status}). ${detail}`.trim(),
        response.status,
      )
    }

    return (await response.json()) as T
  }
}

/**
 * Convenience factory that reads the API key from the environment.
 * Returns `null` when no key is configured so callers can degrade gracefully.
 */
export function createVenueService(config: Partial<VenueServiceConfig> = {}): VenueService | null {
  const apiKey =
    config.apiKey ??
    process.env.GOOGLE_MAPS_API_KEY ??
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ??
    ''

  if (!apiKey) {
    return null
  }

  return new VenueService({ ...config, apiKey })
}
