import { VenueService, VenueServiceError } from './venue-service'
import type { LatLng, Venue } from './venue-service'

export type LifestyleTag =
  | 'strength'
  | 'cardio'
  | 'yoga'
  | 'martial-arts'
  | 'swimming'
  | 'crossfit'
  | 'wellness'
  | 'kink-friendly'
  | 'social'
  | 'premium'
  | 'outdoor'
  | 'mindfulness'
  | 'combat-sports'
  | 'functional'

export interface LifestyleVenue extends Venue {
  vibeScore: number
  lifestyleTags: LifestyleTag[]
  distance: number | null
  crowdDensity: 'low' | 'moderate' | 'busy' | 'packed' | null
}

export interface RegionConfig {
  label: string
  center: LatLng
  radius: number
}

export const NYC_REGIONS: Record<string, RegionConfig> = {
  manhattan: {
    label: 'Manhattan',
    center: { latitude: 40.7831, longitude: -73.9712 },
    radius: 3000,
  },
  brooklyn: {
    label: 'Brooklyn',
    center: { latitude: 40.6782, longitude: -73.9442 },
    radius: 4000,
  },
  nassau: {
    label: 'Nassau County',
    center: { latitude: 40.7282, longitude: -73.7949 },
    radius: 8000,
  },
  longbeach: {
    label: 'Long Beach',
    center: { latitude: 40.5882, longitude: -73.6679 },
    radius: 3000,
  },
  huntington: {
    label: 'Huntington / Greenlawn',
    center: { latitude: 40.85, longitude: -73.35 },
    radius: 5000,
  },
}

export class LifestyleEngine {
  private service: VenueService

  constructor() {
    this.service = new VenueService()
  }

  get isAvailable(): boolean {
    return true
  }

  async discoverVenues(region: RegionConfig, lifestyleTags?: LifestyleTag[]): Promise<LifestyleVenue[]> {
    const raw = await this.service.searchNearby({
      center: region.center,
      radiusMeters: region.radius,
      includedTypes: ['gym', 'fitness_center', 'yoga_studio', 'martial_arts_school', 'swimming_pool', 'health'],
      maxResults: 20,
    })

    let results = raw.map((v) => this.service.enrich(v, region.center))

    if (lifestyleTags && lifestyleTags.length > 0) {
      results = results.filter((v) => lifestyleTags.some((tag) => v.lifestyleTags.includes(tag)))
    }

    return results.sort((a, b) => b.vibeScore - a.vibeScore)
  }

  async searchLifestyleVenues(query: string, region?: RegionConfig): Promise<LifestyleVenue[]> {
    const raw = await this.service.searchText({
      query: `${query} NYC Nassau fitness lifestyle`,
      center: region?.center ?? NYC_REGIONS.manhattan.center,
      radiusMeters: region?.radius ?? 8000,
      maxResults: 15,
    })

    return raw.map((v) => this.service.enrich(v, region?.center ?? NYC_REGIONS.manhattan.center))
  }
}

export interface CuratedVenue {
  id: string
  name: string
  address: string
  location: LatLng
  rating: number
  userRatingCount: number
  photoNames: string[]
  types: string[]
  regionId: string
}

export const curatedVenues: CuratedVenue[] = [
  {
    id: 'venue_nyc_001',
    name: 'Chelsea Piers Fitness',
    address: 'Chelsea Piers, 62 Chelsea Piers, New York, NY 10011',
    location: { latitude: 40.7466, longitude: -74.0083 },
    rating: 4.6,
    userRatingCount: 2340,
    photoNames: [],
    types: ['gym', 'fitness_center', 'swimming_pool'],
    regionId: 'manhattan',
  },
  {
    id: 'venue_nyc_002',
    name: 'YogaWorks Soho',
    address: '150 Spring St, New York, NY 10012',
    location: { latitude: 40.7245, longitude: -74.0015 },
    rating: 4.4,
    userRatingCount: 890,
    photoNames: [],
    types: ['yoga_studio', 'health'],
    regionId: 'manhattan',
  },
  {
    id: 'venue_nyc_003',
    name: 'Church Street Boxing Gym',
    address: '25 Park Pl, New York, NY 10007',
    location: { latitude: 40.7130, longitude: -74.0087 },
    rating: 4.7,
    userRatingCount: 1560,
    photoNames: [],
    types: ['boxing_gym', 'martial_arts_school', 'gym'],
    regionId: 'manhattan',
  },
  {
    id: 'venue_nyc_004',
    name: 'Blink Fitness Williamsburg',
    address: '174 N 4th St, Brooklyn, NY 11211',
    location: { latitude: 40.7156, longitude: -73.9620 },
    rating: 4.1,
    userRatingCount: 2100,
    photoNames: [],
    types: ['gym', 'fitness_center'],
    regionId: 'brooklyn',
  },
  {
    id: 'venue_nyc_005',
    name: 'Sky Ting Yoga',
    address: '93 N 6th St, Brooklyn, NY 11249',
    location: { latitude: 40.7180, longitude: -73.9616 },
    rating: 4.5,
    userRatingCount: 620,
    photoNames: [],
    types: ['yoga_studio'],
    regionId: 'brooklyn',
  },
  {
    id: 'venue_nassau_001',
    name: 'LA Fitness Garden City',
    address: '1001 Franklin Ave, Garden City, NY 11530',
    location: { latitude: 40.7269, longitude: -73.6349 },
    rating: 4.0,
    userRatingCount: 3200,
    photoNames: [],
    types: ['gym', 'fitness_center', 'swimming_pool'],
    regionId: 'nassau',
  },
  {
    id: 'venue_nassau_002',
    name: 'Pure Barre Manhasset',
    address: '2035 Northern Blvd, Manhasset, NY 11030',
    location: { latitude: 40.7946, longitude: -73.6768 },
    rating: 4.6,
    userRatingCount: 410,
    photoNames: [],
    types: ['fitness_center', 'health'],
    regionId: 'nassau',
  },
  {
    id: 'venue_nassau_003',
    name: 'TITLE Boxing Club Rockville Centre',
    address: '265 Merrick Rd, Rockville Centre, NY 11570',
    location: { latitude: 40.6586, longitude: -73.6473 },
    rating: 4.5,
    userRatingCount: 780,
    photoNames: [],
    types: ['boxing_gym', 'martial_arts_school'],
    regionId: 'nassau',
  },
  {
    id: 'venue_lb_001',
    name: 'Long Beach Fitness',
    address: '740 E Park Ave, Long Beach, NY 11561',
    location: { latitude: 40.5884, longitude: -73.6489 },
    rating: 4.2,
    userRatingCount: 1150,
    photoNames: [],
    types: ['gym', 'fitness_center'],
    regionId: 'longbeach',
  },
  {
    id: 'venue_lb_002',
    name: 'Long Beach Yoga',
    address: '965 W Beech St, Long Beach, NY 11561',
    location: { latitude: 40.5861, longitude: -73.6822 },
    rating: 4.3,
    userRatingCount: 340,
    photoNames: [],
    types: ['yoga_studio', 'health'],
    regionId: 'longbeach',
  },
]

function findRegionKey(region: RegionConfig): string {
  for (const [key, cfg] of Object.entries(NYC_REGIONS)) {
    if (cfg === region) return key
  }
  return 'manhattan'
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

export const coastalBrutalism = {
  glass: 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl',
  glassDark: 'bg-slate-950/70 backdrop-blur-xl border border-white/10 shadow-xl',
  card: 'rounded-2xl border border-white/20 bg-white/5 backdrop-blur-lg shadow-lg',
  accent: 'text-electric-lime',
  highContrast: 'text-white font-black tracking-tight',
  muted: 'text-white/60 text-sm',
  pill: 'inline-flex rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider',
  section: 'py-20 px-6 sm:px-8',
  grid: 'grid gap-6 md:grid-cols-2 lg:grid-cols-3',
  vibeDot: (score: number) =>
    score >= 70 ? 'bg-electric-lime' : score >= 40 ? 'bg-sunset-orange' : 'bg-white/30',
} as const

export const MAP_CONFIG = {
  tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19,
  defaultZoom: 13,
  initialCenter: { latitude: 40.85, longitude: -73.35 } as LatLng,
} as const
