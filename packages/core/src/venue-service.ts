import type { LifestyleVenue, LifestyleTag } from './venues'

export interface LatLng {
  latitude: number
  longitude: number
}

export interface Venue {
  id: string
  name: string
  address: string | null
  location: LatLng | null
  rating: number | null
  userRatingCount: number | null
  photoNames: string[]
  types: string[]
}

export interface NearbyVenueQuery {
  center: LatLng
  radiusMeters?: number
  includedTypes?: string[]
  maxResults?: number
}

export interface TextVenueQuery {
  query: string
  center?: LatLng
  radiusMeters?: number
  maxResults?: number
}

export interface VenueServiceConfig {
  overpassUrl?: string
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

const DEFAULT_OVERPASS_URL = 'https://overpass-api.de/api/interpreter'
const DEFAULT_RADIUS_METERS = 5000
const DEFAULT_MAX_RESULTS = 20
const DEFAULT_GYM_TYPES = ['gym', 'fitness_center']

interface OverpassNode {
  type: string
  id: number
  lat?: number
  lon?: number
  tags?: Record<string, string>
}

const LIFESTYLE_TAG_MAP: Record<string, LifestyleTag[]> = {
  gym: ['strength', 'cardio', 'functional'],
  fitness_center: ['strength', 'cardio', 'functional'],
  yoga: ['yoga', 'mindfulness', 'wellness'],
  martial_arts: ['martial-arts', 'combat-sports', 'functional'],
  boxing: ['martial-arts', 'combat-sports', 'cardio'],
  swimming: ['swimming', 'cardio', 'outdoor'],
  pilates: ['wellness', 'functional', 'mindfulness'],
  spa: ['wellness', 'mindfulness'],
  park: ['outdoor', 'cardio', 'social'],
}

function inferLifestyleTags(osmTags: Record<string, string>): LifestyleTag[] {
  const tags = new Set<LifestyleTag>()
  const leisure = osmTags.leisure ?? ''
  const sport = osmTags.sport ?? ''
  for (const [key, mapped] of Object.entries(LIFESTYLE_TAG_MAP)) {
    if (leisure.includes(key) || sport.includes(key)) {
      mapped.forEach((tag) => tags.add(tag))
    }
  }
  if (tags.size === 0) tags.add('functional')
  return Array.from(tags)
}

function computeVibeScore(rating: number | null, userCount: number | null): number {
  if (rating == null) return 50
  const score = Math.round((rating / 5) * 60 + Math.min((userCount ?? 0) / 50, 40))
  return Math.min(Math.max(score, 0), 100)
}

function inferCrowdDensity(): 'low' | 'moderate' | 'busy' | 'packed' {
  const hour = new Date().getHours()
  if (hour < 6 || hour > 22) return 'low'
  if (hour < 9) return 'busy'
  if (hour < 12) return 'moderate'
  if (hour < 15) return 'low'
  if (hour < 19) return 'busy'
  return 'moderate'
}

function haversineMeters(a: LatLng, b: LatLng): number {
  const R = 6371000
  const dLat = toRad(b.latitude - a.latitude)
  const dLng = toRad(b.longitude - a.longitude)
  const sinDLat = Math.sin(dLat / 2)
  const sinDLng = Math.sin(dLng / 2)
  const aVal =
    sinDLat * sinDLat +
    Math.cos(toRad(a.latitude)) * Math.cos(toRad(b.latitude)) * sinDLng * sinDLng
  return R * 2 * Math.atan2(Math.sqrt(aVal), Math.sqrt(1 - aVal))
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180
}

function normalizeNode(node: OverpassNode): Venue | null {
  if (node.lat == null || node.lon == null || !node.tags) return null

  const name = node.tags.name ?? node.tags.brand ?? 'Unnamed venue'
  const streetPart = [
    node.tags['addr:housenumber'] ?? '',
    node.tags['addr:street'] ?? '',
  ].filter(Boolean).join(' ')
  const address = streetPart || (node.tags['addr:city'] ?? null)

  return {
    id: `osm_${node.id}`,
    name,
    address: address || null,
    location: { latitude: node.lat, longitude: node.lon },
    rating: node.tags.rating ? parseFloat(node.tags.rating) : null,
    userRatingCount: null,
    photoNames: [],
    types: [node.tags.leisure, node.tags.sport, node.tags.fitness].filter(Boolean) as string[],
  }
}

function buildOverpassQuery(center: LatLng, radiusMeters: number, includedTypes: string[]): string {
  const filters = includedTypes.map((t) => {
    switch (t) {
      case 'gym':
      case 'fitness_center':
        return `(node["leisure"="fitness_centre"](around:${radiusMeters},${center.latitude},${center.longitude});node["leisure"="sports_centre"](around:${radiusMeters},${center.latitude},${center.longitude});node["sport"="fitness"](around:${radiusMeters},${center.latitude},${center.longitude});)`
      case 'yoga_studio':
        return `node["leisure"="yoga"](around:${radiusMeters},${center.latitude},${center.longitude});`
      case 'martial_arts_school':
      case 'boxing_gym':
        return `node["leisure"="martial_arts"](around:${radiusMeters},${center.latitude},${center.longitude});`
      case 'swimming_pool':
        return `node["leisure"="swimming_pool"](around:${radiusMeters},${center.latitude},${center.longitude});`
      case 'health':
        return `node["amenity"="healthcare"](around:${radiusMeters},${center.latitude},${center.longitude});`
      default:
        return ''
    }
  }).filter(Boolean).join('')

  return `[out:json];(${filters});out body;`
}

function buildTextQuery(query: string, center?: LatLng, radiusMeters?: number): string {
  const centerPart = center
    ? `(around:${radiusMeters ?? 5000},${center.latitude},${center.longitude})`
    : ''
  return `[out:json];(node["name"~"${query}",i]${centerPart};way["name"~"${query}",i]${centerPart};);out center body;`
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

const REQUEST_TIMEOUT_MS = 15_000

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new VenueServiceError('Request timed out')), ms),
    ),
  ])
}

export class VenueService {
  private readonly overpassUrl: string
  private readonly fetchImpl: typeof fetch
  private readonly timeoutMs: number

  constructor(config: VenueServiceConfig = {}) {
    this.overpassUrl = config.overpassUrl ?? DEFAULT_OVERPASS_URL
    const fetchImpl = config.fetchImpl ?? globalThis.fetch
    if (!fetchImpl) {
      throw new VenueServiceError('No fetch implementation is available in this environment.')
    }
    this.fetchImpl = fetchImpl.bind(globalThis)
    this.timeoutMs = REQUEST_TIMEOUT_MS
  }

  async searchNearby(query: NearbyVenueQuery): Promise<Venue[]> {
    const radius = clamp(query.radiusMeters ?? DEFAULT_RADIUS_METERS, 1, 50000)
    const types = query.includedTypes ?? DEFAULT_GYM_TYPES
    const overpassQuery = buildOverpassQuery(query.center, radius, types)
    const data = await this.queryOverpass<{ elements?: OverpassNode[] }>(overpassQuery)
    return (data.elements ?? []).map(normalizeNode).filter((v): v is Venue => v !== null)
  }

  async searchText(query: TextVenueQuery): Promise<Venue[]> {
    const overpassQuery = buildTextQuery(query.query, query.center, query.radiusMeters)
    const data = await this.queryOverpass<{ elements?: OverpassNode[] }>(overpassQuery)
    return (data.elements ?? []).map(normalizeNode).filter((v): v is Venue => v !== null)
  }

  async getVenue(placeId: string): Promise<Venue | null> {
    const osmId = placeId.replace('osm_', '')
    const query = `[out:json];(node(${osmId}););out body;`
    const data = await this.queryOverpass<{ elements?: OverpassNode[] }>(query)
    const node = data.elements?.[0]
    return node ? normalizeNode(node) : null
  }

  getPhotoUrl(_photoName: string, _maxWidthPx = 800): string {
    return ''
  }

  private async queryOverpass<T>(query: string): Promise<T> {
    let response: Response
    try {
      response = await withTimeout(
        this.fetchImpl(this.overpassUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ data: query }),
        }),
        this.timeoutMs,
      )
    } catch (cause) {
      throw new VenueServiceError(`Failed to reach Overpass API: ${(cause as Error).message}`)
    }

    if (!response.ok) {
      const detail = await response.text().catch(() => '')
      throw new VenueServiceError(
        `Overpass API request failed (${response.status}). ${detail}`.trim(),
        response.status,
      )
    }

    return (await response.json()) as T
  }

  enrich(venue: Venue, center: LatLng): LifestyleVenue {
    const distance = venue.location ? haversineMeters(center, venue.location) : null

    const osmTags: Record<string, string> = {}
    for (const t of venue.types) {
      osmTags[t] = t
    }
    if (venue.types.length === 0) osmTags.fitness = 'fitness'

    return {
      ...venue,
      vibeScore: computeVibeScore(venue.rating, venue.userRatingCount),
      lifestyleTags: inferLifestyleTags(osmTags),
      distance,
      crowdDensity: inferCrowdDensity(),
    }
  }
}

export function createVenueService(_config: Partial<VenueServiceConfig> = {}): VenueService {
  return new VenueService()
}
