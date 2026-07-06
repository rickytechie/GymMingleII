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

export type VenueCategory =
  | 'Fitness'
  | 'Dining'
  | 'Nightlife'
  | 'Wellness'
  | 'Outdoor'
  | 'Arts'
  | 'Music'
  | 'Skatepark'
  | 'Bathhouse'
  | 'StripClub'

export interface LifestyleVenue extends Venue {
  vibeScore: number
  lifestyleTags: LifestyleTag[]
  distance: number | null
  crowdDensity: 'low' | 'moderate' | 'busy' | 'packed' | null
  category: VenueCategory
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
  category: VenueCategory
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
    category: 'Fitness',
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
    category: 'Wellness',
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
    category: 'Fitness',
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
    category: 'Fitness',
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
    category: 'Wellness',
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
    category: 'Fitness',
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
    category: 'Fitness',
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
    category: 'Fitness',
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
    category: 'Fitness',
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
    category: 'Wellness',
  },
]

export const CITY_REGIONS: Record<string, RegionConfig> = {
  nyc: { label: 'New York City', center: { latitude: 40.7128, longitude: -74.006 }, radius: 15000 },
  boston: { label: 'Boston', center: { latitude: 42.3601, longitude: -71.0589 }, radius: 12000 },
  miami: { label: 'Miami', center: { latitude: 25.7617, longitude: -80.1918 }, radius: 12000 },
  baltimore: { label: 'Baltimore', center: { latitude: 39.2904, longitude: -76.6122 }, radius: 10000 },
  virginia_beach: { label: 'Virginia Beach', center: { latitude: 36.8529, longitude: -75.978 }, radius: 12000 },
  la: { label: 'Los Angeles', center: { latitude: 34.0522, longitude: -118.2437 }, radius: 20000 },
  houston: { label: 'Houston', center: { latitude: 29.7604, longitude: -95.3698 }, radius: 15000 },
  sf: { label: 'San Francisco', center: { latitude: 37.7749, longitude: -122.4194 }, radius: 12000 },
  austin: { label: 'Austin', center: { latitude: 30.2672, longitude: -97.7431 }, radius: 12000 },
  el_paso: { label: 'El Paso', center: { latitude: 31.7619, longitude: -106.485 }, radius: 10000 },
  san_antonio: { label: 'San Antonio', center: { latitude: 29.4241, longitude: -98.4936 }, radius: 12000 },
  detroit: { label: 'Detroit', center: { latitude: 42.3314, longitude: -83.0458 }, radius: 12000 },
  chicago: { label: 'Chicago', center: { latitude: 41.8781, longitude: -87.6298 }, radius: 15000 },
  buffalo: { label: 'Buffalo', center: { latitude: 42.8864, longitude: -78.8784 }, radius: 10000 },
  glen_cove: { label: 'Glen Cove', center: { latitude: 40.8623, longitude: -73.6337 }, radius: 5000 },
  new_rochelle: { label: 'New Rochelle', center: { latitude: 40.9115, longitude: -73.7824 }, radius: 5000 },
  sea_cliff: { label: 'Sea Cliff', center: { latitude: 40.8489, longitude: -73.6447 }, radius: 3000 },
  grand_rapids: { label: 'Grand Rapids', center: { latitude: 42.9634, longitude: -85.6681 }, radius: 10000 },
  orlando: { label: 'Orlando', center: { latitude: 28.5383, longitude: -81.3792 }, radius: 12000 },
  jacksonville: { label: 'Jacksonville', center: { latitude: 30.3322, longitude: -81.6557 }, radius: 12000 },
  new_orleans: { label: 'New Orleans', center: { latitude: 29.9511, longitude: -90.0715 }, radius: 10000 },
  amherst: { label: 'Amherst', center: { latitude: 42.3789, longitude: -72.5219 }, radius: 5000 },
  nashville: { label: 'Nashville', center: { latitude: 36.1627, longitude: -86.7816 }, radius: 12000 },
}

export const multiCityVenues: CuratedVenue[] = [
  // — Boston —
  { id: 'venue_bos_001', name: 'Equinox Boston Common', address: '99 Summer St, Boston, MA 02110', location: { latitude: 42.3537, longitude: -71.0581 }, rating: 4.5, userRatingCount: 1800, photoNames: [], types: ['gym', 'fitness_center'], regionId: 'boston', category: 'Fitness' },
  { id: 'venue_bos_002', name: 'Temple Records', address: '50 Brookline Ave, Boston, MA 02215', location: { latitude: 42.3467, longitude: -71.0972 }, rating: 4.3, userRatingCount: 450, photoNames: [], types: ['bar', 'music_venue'], regionId: 'boston', category: 'Music' },
  { id: 'venue_bos_003', name: 'MFA Boston Dining', address: '465 Huntington Ave, Boston, MA 02115', location: { latitude: 42.3393, longitude: -71.094 }, rating: 4.4, userRatingCount: 1200, photoNames: [], types: ['museum', 'restaurant'], regionId: 'boston', category: 'Arts' },
  { id: 'venue_bos_004', name: 'Coolidge Corner Yoga', address: '1303 Beacon St, Brookline, MA 02446', location: { latitude: 42.3424, longitude: -71.1217 }, rating: 4.6, userRatingCount: 380, photoNames: [], types: ['yoga_studio', 'health'], regionId: 'boston', category: 'Wellness' },

  // — Miami —
  { id: 'venue_mia_001', name: 'David Barton Gym Miami', address: '1756 N Bayshore Dr, Miami, FL 33132', location: { latitude: 25.7903, longitude: -80.187 }, rating: 4.5, userRatingCount: 2100, photoNames: [], types: ['gym', 'fitness_center'], regionId: 'miami', category: 'Fitness' },
  { id: 'venue_mia_002', name: 'E11EVEN Miami', address: '29 NE 11th St, Miami, FL 33132', location: { latitude: 25.7854, longitude: -80.1935 }, rating: 4.3, userRatingCount: 5600, photoNames: [], types: ['nightclub', 'strip_club'], regionId: 'miami', category: 'Nightlife' },
  { id: 'venue_mia_003', name: 'Standard Spa Miami Beach', address: '40 Island Ave, Miami Beach, FL 33139', location: { latitude: 25.7845, longitude: -80.1347 }, rating: 4.6, userRatingCount: 1200, photoNames: [], types: ['spa', 'health'], regionId: 'miami', category: 'Wellness' },
  { id: 'venue_mia_004', name: 'Wynwood Walls', address: '2520 NW 2nd Ave, Miami, FL 33127', location: { latitude: 25.8025, longitude: -80.1995 }, rating: 4.5, userRatingCount: 8900, photoNames: [], types: ['art_gallery', 'tourist_attraction'], regionId: 'miami', category: 'Arts' },

  // — Baltimore —
  { id: 'venue_bal_001', name: 'Under Armour Performance Center', address: '1020 Hull St, Baltimore, MD 21230', location: { latitude: 39.2725, longitude: -76.5996 }, rating: 4.4, userRatingCount: 780, photoNames: [], types: ['gym', 'fitness_center'], regionId: 'baltimore', category: 'Fitness' },
  { id: 'venue_bal_002', name: 'The Ottobar', address: '2549 N Howard St, Baltimore, MD 21218', location: { latitude: 39.3198, longitude: -76.6189 }, rating: 4.5, userRatingCount: 1200, photoNames: [], types: ['bar', 'music_venue'], regionId: 'baltimore', category: 'Music' },
  { id: 'venue_bal_003', name: 'Baltimore Baths', address: '1200 E Baltimore St, Baltimore, MD 21202', location: { latitude: 39.2906, longitude: -76.5963 }, rating: 4.1, userRatingCount: 340, photoNames: [], types: ['spa', 'health'], regionId: 'baltimore', category: 'Bathhouse' },
  { id: 'venue_bal_004', name: 'Baltimore Museum of Art Dining', address: '10 Art Museum Dr, Baltimore, MD 21218', location: { latitude: 39.3264, longitude: -76.6167 }, rating: 4.5, userRatingCount: 4300, photoNames: [], types: ['museum', 'restaurant'], regionId: 'baltimore', category: 'Dining' },

  // — Virginia Beach —
  { id: 'venue_vb_001', name: 'Oceanfront Fitness VB', address: '300 32nd St, Virginia Beach, VA 23451', location: { latitude: 36.8692, longitude: -75.9792 }, rating: 4.3, userRatingCount: 860, photoNames: [], types: ['gym', 'fitness_center'], regionId: 'virginia_beach', category: 'Fitness' },
  { id: 'venue_vb_002', name: 'VB Skatepark', address: '3701 Dam Neck Rd, Virginia Beach, VA 23453', location: { latitude: 36.7817, longitude: -76.0576 }, rating: 4.5, userRatingCount: 620, photoNames: [], types: ['skate_park', 'park'], regionId: 'virginia_beach', category: 'Skatepark' },
  { id: 'venue_vb_003', name: 'Back Bay Wildlife Refuge', address: '4000 Sandbridge Rd, Virginia Beach, VA 23456', location: { latitude: 36.6717, longitude: -75.9386 }, rating: 4.7, userRatingCount: 2100, photoNames: [], types: ['park', 'nature_reserve'], regionId: 'virginia_beach', category: 'Outdoor' },
  { id: 'venue_vb_004', name: 'Pacifica Dining', address: '3100 Atlantic Ave, Virginia Beach, VA 23451', location: { latitude: 36.8585, longitude: -75.9812 }, rating: 4.4, userRatingCount: 950, photoNames: [], types: ['restaurant'], regionId: 'virginia_beach', category: 'Dining' },

  // — Los Angeles —
  { id: 'venue_la_001', name: 'Gold\'s Gym Venice', address: '558 Venice Blvd, Venice, CA 90291', location: { latitude: 33.9905, longitude: -118.4567 }, rating: 4.6, userRatingCount: 4500, photoNames: [], types: ['gym', 'fitness_center'], regionId: 'la', category: 'Fitness' },
  { id: 'venue_la_002', name: 'The Viper Room', address: '8852 Sunset Blvd, West Hollywood, CA 90069', location: { latitude: 34.0903, longitude: -118.3847 }, rating: 4.2, userRatingCount: 3800, photoNames: [], types: ['nightclub', 'music_venue'], regionId: 'la', category: 'Nightlife' },
  { id: 'venue_la_003', name: 'Runyon Canyon Park', address: '2000 N Fuller Ave, Los Angeles, CA 90046', location: { latitude: 34.103, longitude: -118.3384 }, rating: 4.7, userRatingCount: 12000, photoNames: [], types: ['park', 'hiking_area'], regionId: 'la', category: 'Outdoor' },
  { id: 'venue_la_004', name: 'The Getty Center', address: '1200 Getty Center Dr, Los Angeles, CA 90049', location: { latitude: 34.077, longitude: -118.4726 }, rating: 4.7, userRatingCount: 15000, photoNames: [], types: ['museum', 'art_gallery'], regionId: 'la', category: 'Arts' },
  { id: 'venue_la_005', name: 'Honey\'s at Star Love', address: '7920 Santa Monica Blvd, Los Angeles, CA 90046', location: { latitude: 34.0837, longitude: -118.3635 }, rating: 4.3, userRatingCount: 670, photoNames: [], types: ['strip_club', 'nightclub'], regionId: 'la', category: 'StripClub' },
  { id: 'venue_la_006', name: 'Wi Spa', address: '2700 Wilshire Blvd, Los Angeles, CA 90057', location: { latitude: 34.0605, longitude: -118.2803 }, rating: 4.4, userRatingCount: 3200, photoNames: [], types: ['spa', 'health'], regionId: 'la', category: 'Wellness' },

  // — Houston —
  { id: 'venue_hou_001', name: 'Equinox Houston Galleria', address: '5055 Westheimer Rd, Houston, TX 77056', location: { latitude: 29.7387, longitude: -95.4597 }, rating: 4.6, userRatingCount: 1100, photoNames: [], types: ['gym', 'fitness_center'], regionId: 'houston', category: 'Fitness' },
  { id: 'venue_hou_002', name: 'Stereo Live Houston', address: '400 Lovett Blvd, Houston, TX 77006', location: { latitude: 29.7485, longitude: -95.397 }, rating: 4.4, userRatingCount: 2100, photoNames: [], types: ['music_venue', 'nightclub'], regionId: 'houston', category: 'Music' },
  { id: 'venue_hou_003', name: 'Men\'s Club Houston', address: '2500 Richmond Ave, Houston, TX 77098', location: { latitude: 29.7331, longitude: -95.4267 }, rating: 4.1, userRatingCount: 1500, photoNames: [], types: ['strip_club', 'nightclub'], regionId: 'houston', category: 'StripClub' },
  { id: 'venue_hou_004', name: 'Buffalo Bayou Park', address: '1800 Allen Pkwy, Houston, TX 77019', location: { latitude: 29.7612, longitude: -95.3746 }, rating: 4.6, userRatingCount: 7800, photoNames: [], types: ['park', 'outdoor'], regionId: 'houston', category: 'Outdoor' },

  // — San Francisco —
  { id: 'venue_sf_001', name: 'Barry\'s SF Embarcadero', address: '1 Embarcadero Center, San Francisco, CA 94111', location: { latitude: 37.7948, longitude: -122.3975 }, rating: 4.5, userRatingCount: 1500, photoNames: [], types: ['gym', 'fitness_center'], regionId: 'sf', category: 'Fitness' },
  { id: 'venue_sf_002', name: 'The Great Northern', address: '119 Utah St, San Francisco, CA 94103', location: { latitude: 37.7683, longitude: -122.4067 }, rating: 4.4, userRatingCount: 1800, photoNames: [], types: ['music_venue', 'nightclub'], regionId: 'sf', category: 'Music' },
  { id: 'venue_sf_003', name: 'Golden Gate Park', address: '501 Stanyan St, San Francisco, CA 94117', location: { latitude: 37.7694, longitude: -122.4862 }, rating: 4.8, userRatingCount: 25000, photoNames: [], types: ['park', 'outdoor'], regionId: 'sf', category: 'Outdoor' },
  { id: 'venue_sf_004', name: 'Kabuki Springs & Spa', address: '1750 Geary Blvd, San Francisco, CA 94115', location: { latitude: 37.7851, longitude: -122.4336 }, rating: 4.5, userRatingCount: 1200, photoNames: [], types: ['spa', 'health'], regionId: 'sf', category: 'Bathhouse' },
  { id: 'venue_sf_005', name: 'Cat Club', address: '1190 Folsom St, San Francisco, CA 94103', location: { latitude: 37.7741, longitude: -122.4081 }, rating: 4.2, userRatingCount: 980, photoNames: [], types: ['nightclub', 'strip_club'], regionId: 'sf', category: 'Nightlife' },
  { id: 'venue_sf_006', name: 'SFMOMA Dining', address: '151 3rd St, San Francisco, CA 94103', location: { latitude: 37.7857, longitude: -122.4011 }, rating: 4.5, userRatingCount: 6800, photoNames: [], types: ['museum', 'restaurant'], regionId: 'sf', category: 'Dining' },

  // — Austin —
  { id: 'venue_aus_001', name: 'Gold\'s Gym Austin Downtown', address: '805 W 5th St, Austin, TX 78703', location: { latitude: 30.2713, longitude: -97.7542 }, rating: 4.3, userRatingCount: 1600, photoNames: [], types: ['gym', 'fitness_center'], regionId: 'austin', category: 'Fitness' },
  { id: 'venue_aus_002', name: 'Rainey Street Nightlife', address: '76 Rainey St, Austin, TX 78701', location: { latitude: 30.2578, longitude: -97.7384 }, rating: 4.5, userRatingCount: 4200, photoNames: [], types: ['bar', 'nightclub'], regionId: 'austin', category: 'Nightlife' },
  { id: 'venue_aus_003', name: 'Zilker Park', address: '2100 Barton Springs Rd, Austin, TX 78746', location: { latitude: 30.2683, longitude: -97.7699 }, rating: 4.7, userRatingCount: 11000, photoNames: [], types: ['park', 'outdoor'], regionId: 'austin', category: 'Outdoor' },
  { id: 'venue_aus_004', name: 'ACL Live at Moody Theater', address: '310 W Willie Nelson Blvd, Austin, TX 78701', location: { latitude: 30.2643, longitude: -97.7457 }, rating: 4.6, userRatingCount: 5600, photoNames: [], types: ['music_venue'], regionId: 'austin', category: 'Music' },

  // — El Paso —
  { id: 'venue_ep_001', name: 'Sonic Fitness El Paso', address: '700 S Mesa Hills Dr, El Paso, TX 79912', location: { latitude: 31.8268, longitude: -106.5272 }, rating: 4.1, userRatingCount: 540, photoNames: [], types: ['gym', 'fitness_center'], regionId: 'el_paso', category: 'Fitness' },
  { id: 'venue_ep_002', name: 'Franklin Mountains State Park', address: '1331 McKelligon Canyon Rd, El Paso, TX 79930', location: { latitude: 31.8773, longitude: -106.4842 }, rating: 4.7, userRatingCount: 3400, photoNames: [], types: ['park', 'hiking_area'], regionId: 'el_paso', category: 'Outdoor' },
  { id: 'venue_ep_003', name: 'The Lowbrow Palace', address: '111 Robinson Ave, El Paso, TX 79902', location: { latitude: 31.7603, longitude: -106.4893 }, rating: 4.3, userRatingCount: 820, photoNames: [], types: ['music_venue', 'bar'], regionId: 'el_paso', category: 'Music' },
  { id: 'venue_ep_004', name: 'King\'s X Restaurant & Bar', address: '901 N Stanton St, El Paso, TX 79902', location: { latitude: 31.7753, longitude: -106.4945 }, rating: 4.4, userRatingCount: 1600, photoNames: [], types: ['restaurant', 'bar'], regionId: 'el_paso', category: 'Dining' },

  // — San Antonio —
  { id: 'venue_sa_001', name: 'Gold\'s Gym San Antonio', address: '13445 NW Military Hwy, San Antonio, TX 78231', location: { latitude: 29.5497, longitude: -98.5377 }, rating: 4.2, userRatingCount: 1100, photoNames: [], types: ['gym', 'fitness_center'], regionId: 'san_antonio', category: 'Fitness' },
  { id: 'venue_sa_002', name: 'The Esquire Tavern', address: '155 E Commerce St, San Antonio, TX 78205', location: { latitude: 29.4241, longitude: -98.4905 }, rating: 4.5, userRatingCount: 2800, photoNames: [], types: ['bar', 'restaurant'], regionId: 'san_antonio', category: 'Nightlife' },
  { id: 'venue_sa_003', name: 'Pearl District Dining', address: '303 Pearl Pkwy, San Antonio, TX 78215', location: { latitude: 29.4418, longitude: -98.4823 }, rating: 4.6, userRatingCount: 4500, photoNames: [], types: ['restaurant', 'shopping'], regionId: 'san_antonio', category: 'Dining' },
  { id: 'venue_sa_004', name: 'San Antonio River Walk', address: '110 Broadway St, San Antonio, TX 78205', location: { latitude: 29.4241, longitude: -98.4882 }, rating: 4.7, userRatingCount: 32000, photoNames: [], types: ['park', 'tourist_attraction'], regionId: 'san_antonio', category: 'Outdoor' },

  // — Detroit —
  { id: 'venue_det_001', name: 'PFX Fitness Detroit', address: '1401 Woodward Ave, Detroit, MI 48226', location: { latitude: 42.3351, longitude: -83.0482 }, rating: 4.3, userRatingCount: 920, photoNames: [], types: ['gym', 'fitness_center'], regionId: 'detroit', category: 'Fitness' },
  { id: 'venue_det_002', name: 'Detroit Institute of Arts', address: '5200 Woodward Ave, Detroit, MI 48202', location: { latitude: 42.3594, longitude: -83.0663 }, rating: 4.7, userRatingCount: 8900, photoNames: [], types: ['museum', 'art_gallery'], regionId: 'detroit', category: 'Arts' },
  { id: 'venue_det_003', name: 'Marble Bar', address: '1501 Holden St, Detroit, MI 48208', location: { latitude: 42.3436, longitude: -83.0771 }, rating: 4.4, userRatingCount: 1200, photoNames: [], types: ['music_venue', 'nightclub'], regionId: 'detroit', category: 'Music' },
  { id: 'venue_det_004', name: 'Belle Isle Park', address: '99 Pleasure Dr, Detroit, MI 48207', location: { latitude: 42.3456, longitude: -82.9751 }, rating: 4.5, userRatingCount: 5600, photoNames: [], types: ['park', 'outdoor'], regionId: 'detroit', category: 'Outdoor' },

  // — Chicago —
  { id: 'venue_chi_001', name: 'Equinox Lincoln Park', address: '1850 N Clark St, Chicago, IL 60614', location: { latitude: 41.9124, longitude: -87.6348 }, rating: 4.5, userRatingCount: 1700, photoNames: [], types: ['gym', 'fitness_center'], regionId: 'chicago', category: 'Fitness' },
  { id: 'venue_chi_002', name: 'The Green Mill', address: '4802 N Broadway, Chicago, IL 60640', location: { latitude: 41.9699, longitude: -87.6593 }, rating: 4.6, userRatingCount: 2400, photoNames: [], types: ['bar', 'music_venue'], regionId: 'chicago', category: 'Nightlife' },
  { id: 'venue_chi_003', name: 'Steppenwolf Theatre', address: '1650 N Halsted St, Chicago, IL 60614', location: { latitude: 41.9096, longitude: -87.6486 }, rating: 4.7, userRatingCount: 3200, photoNames: [], types: ['theatre', 'arts'], regionId: 'chicago', category: 'Arts' },
  { id: 'venue_chi_004', name: 'King Spa Chicago', address: '809 W 115th St, Chicago, IL 60643', location: { latitude: 41.6832, longitude: -87.6451 }, rating: 4.3, userRatingCount: 980, photoNames: [], types: ['spa', 'health'], regionId: 'chicago', category: 'Wellness' },
  { id: 'venue_chi_005', name: 'Pilot Project Brewing', address: '2140 N Milwaukee Ave, Chicago, IL 60647', location: { latitude: 41.9187, longitude: -87.6978 }, rating: 4.4, userRatingCount: 1200, photoNames: [], types: ['restaurant', 'bar'], regionId: 'chicago', category: 'Dining' },
  { id: 'venue_chi_006', name: 'Wilson Skate Park', address: '1141 W Wilson Ave, Chicago, IL 60640', location: { latitude: 41.9651, longitude: -87.6569 }, rating: 4.3, userRatingCount: 340, photoNames: [], types: ['skate_park', 'park'], regionId: 'chicago', category: 'Skatepark' },

  // — Buffalo —
  { id: 'venue_buf_001', name: 'Jada Blitz Fitness', address: '680 Delaware Ave, Buffalo, NY 14209', location: { latitude: 42.9060, longitude: -78.8710 }, rating: 4.2, userRatingCount: 890, photoNames: [], types: ['gym', 'fitness_center'], regionId: 'buffalo', category: 'Fitness' },
  { id: 'venue_buf_002', name: 'Buffalo RiverWorks', address: '359 Ganson St, Buffalo, NY 14203', location: { latitude: 42.8698, longitude: -78.8737 }, rating: 4.3, userRatingCount: 2100, photoNames: [], types: ['music_venue', 'bar', 'outdoor'], regionId: 'buffalo', category: 'Music' },
  { id: 'venue_buf_003', name: 'Delaware Park', address: '84 Parkside Ave, Buffalo, NY 14214', location: { latitude: 42.9317, longitude: -78.8499 }, rating: 4.6, userRatingCount: 4500, photoNames: [], types: ['park', 'outdoor'], regionId: 'buffalo', category: 'Outdoor' },
  { id: 'venue_buf_004', name: 'The Dinner Bell Diner', address: '745 Elmwood Ave, Buffalo, NY 14222', location: { latitude: 42.9126, longitude: -78.8778 }, rating: 4.4, userRatingCount: 1100, photoNames: [], types: ['restaurant'], regionId: 'buffalo', category: 'Dining' },

  // — Glen Cove —
  { id: 'venue_gc_001', name: 'Glen Cove Fitness', address: '75 Glen St, Glen Cove, NY 11542', location: { latitude: 40.8626, longitude: -73.6331 }, rating: 4.0, userRatingCount: 340, photoNames: [], types: ['gym', 'fitness_center'], regionId: 'glen_cove', category: 'Fitness' },
  { id: 'venue_gc_002', name: 'Temple Beth Israel Fitness Center', address: '14 Terrace Ave, Glen Cove, NY 11542', location: { latitude: 40.8647, longitude: -73.6348 }, rating: 3.8, userRatingCount: 120, photoNames: [], types: ['fitness_center'], regionId: 'glen_cove', category: 'Fitness' },
  { id: 'venue_gc_003', name: 'Glen Cove Beach & Boardwalk', address: '65 Shore Rd, Glen Cove, NY 11542', location: { latitude: 40.8702, longitude: -73.6484 }, rating: 4.5, userRatingCount: 980, photoNames: [], types: ['park', 'outdoor'], regionId: 'glen_cove', category: 'Outdoor' },
  { id: 'venue_gc_004', name: 'La Bussola Restaurant', address: '40 School St, Glen Cove, NY 11542', location: { latitude: 40.8670, longitude: -73.6311 }, rating: 4.3, userRatingCount: 560, photoNames: [], types: ['restaurant'], regionId: 'glen_cove', category: 'Dining' },

  // — New Rochelle —
  { id: 'venue_nr_001', name: 'New Rochelle Fitness Center', address: '25 Lecount Pl, New Rochelle, NY 10801', location: { latitude: 40.9125, longitude: -73.7833 }, rating: 4.1, userRatingCount: 620, photoNames: [], types: ['gym', 'fitness_center'], regionId: 'new_rochelle', category: 'Fitness' },
  { id: 'venue_nr_002', name: 'Hudson Park', address: '10 Hudson Park Rd, New Rochelle, NY 10805', location: { latitude: 40.8906, longitude: -73.7932 }, rating: 4.6, userRatingCount: 1100, photoNames: [], types: ['park', 'outdoor'], regionId: 'new_rochelle', category: 'Outdoor' },
  { id: 'venue_nr_003', name: 'Mavis Nightclub', address: '1 Radisson Plaza, New Rochelle, NY 10801', location: { latitude: 40.9118, longitude: -73.7855 }, rating: 4.2, userRatingCount: 780, photoNames: [], types: ['nightclub', 'music_venue'], regionId: 'new_rochelle', category: 'Nightlife' },
  { id: 'venue_nr_004', name: 'Posto 22 Ristorante', address: '150 North Ave, New Rochelle, NY 10801', location: { latitude: 40.9142, longitude: -73.7793 }, rating: 4.5, userRatingCount: 650, photoNames: [], types: ['restaurant'], regionId: 'new_rochelle', category: 'Dining' },

  // — Sea Cliff —
  { id: 'venue_sc_001', name: 'Sea Cliff Yoga', address: '104 7th Ave, Sea Cliff, NY 11579', location: { latitude: 40.8485, longitude: -73.6439 }, rating: 4.4, userRatingCount: 180, photoNames: [], types: ['yoga_studio', 'health'], regionId: 'sea_cliff', category: 'Wellness' },
  { id: 'venue_sc_002', name: 'Sea Cliff Beach', address: '1 Sea Cliff Ave, Sea Cliff, NY 11579', location: { latitude: 40.8450, longitude: -73.6476 }, rating: 4.3, userRatingCount: 420, photoNames: [], types: ['park', 'outdoor'], regionId: 'sea_cliff', category: 'Outdoor' },
  { id: 'venue_sc_003', name: 'The View Grill', address: '71 Roslyn Ave, Sea Cliff, NY 11579', location: { latitude: 40.8490, longitude: -73.6424 }, rating: 4.2, userRatingCount: 310, photoNames: [], types: ['restaurant', 'bar'], regionId: 'sea_cliff', category: 'Dining' },

  // — Grand Rapids —
  { id: 'venue_gr_001', name: 'Family Fitness Grand Rapids', address: '2000 Employment Way, Grand Rapids, MI 49504', location: { latitude: 42.9269, longitude: -85.7026 }, rating: 4.1, userRatingCount: 450, photoNames: [], types: ['gym', 'fitness_center'], regionId: 'grand_rapids', category: 'Fitness' },
  { id: 'venue_gr_002', name: 'The Intersection', address: '133 Grandville Ave SW, Grand Rapids, MI 49503', location: { latitude: 42.9577, longitude: -85.6707 }, rating: 4.5, userRatingCount: 2100, photoNames: [], types: ['music_venue', 'nightclub'], regionId: 'grand_rapids', category: 'Music' },
  { id: 'venue_gr_003', name: 'Grand Rapids Art Museum', address: '101 Monroe Center St NW, Grand Rapids, MI 49503', location: { latitude: 42.9648, longitude: -85.6704 }, rating: 4.5, userRatingCount: 3200, photoNames: [], types: ['museum', 'art_gallery'], regionId: 'grand_rapids', category: 'Arts' },
  { id: 'venue_gr_004', name: 'Millennium Park', address: '1415 Maynard Ave SW, Grand Rapids, MI 49534', location: { latitude: 42.8759, longitude: -85.7485 }, rating: 4.7, userRatingCount: 4100, photoNames: [], types: ['park', 'outdoor'], regionId: 'grand_rapids', category: 'Outdoor' },

  // — Orlando —
  { id: 'venue_orl_001', name: 'Orlando Gym & Fitness', address: '600 N Garland Ave, Orlando, FL 32801', location: { latitude: 28.5497, longitude: -81.3797 }, rating: 4.2, userRatingCount: 980, photoNames: [], types: ['gym', 'fitness_center'], regionId: 'orlando', category: 'Fitness' },
  { id: 'venue_orl_002', name: 'The Vanguard', address: '578 N Orange Ave, Orlando, FL 32801', location: { latitude: 28.5481, longitude: -81.3790 }, rating: 4.4, userRatingCount: 1500, photoNames: [], types: ['music_venue', 'nightclub'], regionId: 'orlando', category: 'Music' },
  { id: 'venue_orl_003', name: 'Lake Eola Park', address: '512 E Washington St, Orlando, FL 32801', location: { latitude: 28.5432, longitude: -81.3748 }, rating: 4.7, userRatingCount: 8900, photoNames: [], types: ['park', 'outdoor'], regionId: 'orlando', category: 'Outdoor' },
  { id: 'venue_orl_004', name: 'The Woods', address: '24 W Washington St, Orlando, FL 32801', location: { latitude: 28.5437, longitude: -81.3782 }, rating: 4.3, userRatingCount: 870, photoNames: [], types: ['restaurant', 'bar'], regionId: 'orlando', category: 'Dining' },

  // — Jacksonville —
  { id: 'venue_jax_001', name: 'BAE Systems Fitness Center', address: '10101-102, New Berlin Rd, Jacksonville, FL 32226', location: { latitude: 30.4770, longitude: -81.5834 }, rating: 4.0, userRatingCount: 230, photoNames: [], types: ['gym', 'fitness_center'], regionId: 'jacksonville', category: 'Fitness' },
  { id: 'venue_jax_002', name: 'Daily\'s Place', address: '1 Daily\'s Pl, Jacksonville, FL 32202', location: { latitude: 30.3226, longitude: -81.6564 }, rating: 4.5, userRatingCount: 3400, photoNames: [], types: ['music_venue', 'outdoor'], regionId: 'jacksonville', category: 'Music' },
  { id: 'venue_jax_003', name: 'Jacksonville Beach', address: '110 1st Ave N, Jacksonville Beach, FL 32250', location: { latitude: 30.2870, longitude: -81.3924 }, rating: 4.6, userRatingCount: 7200, photoNames: [], types: ['park', 'outdoor'], regionId: 'jacksonville', category: 'Outdoor' },
  { id: 'venue_jax_004', name: 'Cummer Museum of Art', address: '829 Riverside Ave, Jacksonville, FL 32204', location: { latitude: 30.3189, longitude: -81.6780 }, rating: 4.6, userRatingCount: 2800, photoNames: [], types: ['museum', 'art_gallery'], regionId: 'jacksonville', category: 'Arts' },

  // — New Orleans —
  { id: 'venue_nola_001', name: 'Elite Fitness New Orleans', address: '800 Conti St, New Orleans, LA 70112', location: { latitude: 29.9551, longitude: -90.0710 }, rating: 4.1, userRatingCount: 670, photoNames: [], types: ['gym', 'fitness_center'], regionId: 'new_orleans', category: 'Fitness' },
  { id: 'venue_nola_002', name: 'Tipitina\'s', address: '501 Napoleon Ave, New Orleans, LA 70115', location: { latitude: 29.9178, longitude: -90.1016 }, rating: 4.6, userRatingCount: 4500, photoNames: [], types: ['music_venue', 'nightclub'], regionId: 'new_orleans', category: 'Music' },
  { id: 'venue_nola_003', name: 'Audubon Park', address: '6500 Magazine St, New Orleans, LA 70118', location: { latitude: 29.9229, longitude: -90.1300 }, rating: 4.7, userRatingCount: 6800, photoNames: [], types: ['park', 'outdoor'], regionId: 'new_orleans', category: 'Outdoor' },
  { id: 'venue_nola_004', name: 'Commander\'s Palace', address: '1403 Washington Ave, New Orleans, LA 70130', location: { latitude: 29.9281, longitude: -90.0867 }, rating: 4.7, userRatingCount: 12000, photoNames: [], types: ['restaurant'], regionId: 'new_orleans', category: 'Dining' },

  // — Amherst —
  { id: 'venue_amh_001', name: 'Amherst College Fitness Center', address: '160 N Pleasant St, Amherst, MA 01002', location: { latitude: 42.3787, longitude: -72.5210 }, rating: 4.3, userRatingCount: 560, photoNames: [], types: ['gym', 'fitness_center'], regionId: 'amherst', category: 'Fitness' },
  { id: 'venue_amh_002', name: 'Puffer\'s Pond', address: '84 Amity St, Amherst, MA 01002', location: { latitude: 42.3902, longitude: -72.5148 }, rating: 4.4, userRatingCount: 780, photoNames: [], types: ['park', 'outdoor'], regionId: 'amherst', category: 'Outdoor' },
  { id: 'venue_amh_003', name: 'The Hangar', address: '179 N Pleasant St, Amherst, MA 01002', location: { latitude: 42.3802, longitude: -72.5203 }, rating: 4.1, userRatingCount: 340, photoNames: [], types: ['music_venue', 'bar'], regionId: 'amherst', category: 'Music' },

  // — Nashville —
  { id: 'venue_nash_001', name: 'Nashville Athletic Club', address: '311 27th Ave N, Nashville, TN 37203', location: { latitude: 36.1527, longitude: -86.8000 }, rating: 4.3, userRatingCount: 890, photoNames: [], types: ['gym', 'fitness_center'], regionId: 'nashville', category: 'Fitness' },
  { id: 'venue_nash_002', name: 'Ryman Auditorium', address: '116 5th Ave N, Nashville, TN 37219', location: { latitude: 36.1611, longitude: -86.7766 }, rating: 4.8, userRatingCount: 18000, photoNames: [], types: ['music_venue', 'theatre'], regionId: 'nashville', category: 'Music' },
  { id: 'venue_nash_003', name: 'Centennial Park', address: '2500 West End Ave, Nashville, TN 37203', location: { latitude: 36.1500, longitude: -86.8124 }, rating: 4.6, userRatingCount: 11000, photoNames: [], types: ['park', 'outdoor'], regionId: 'nashville', category: 'Outdoor' },
  { id: 'venue_nash_004', name: 'The Catbird Seat', address: '1711 Division St, Nashville, TN 37203', location: { latitude: 36.1498, longitude: -86.7952 }, rating: 4.6, userRatingCount: 1200, photoNames: [], types: ['restaurant'], regionId: 'nashville', category: 'Dining' },
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
