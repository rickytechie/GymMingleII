import type { VenueCategory } from './venues'

export interface RegistryVenue {
  id: string
  name: string
  address: string
  borough: 'manhattan' | 'brooklyn' | 'queens' | 'bronx' | 'staten_island'
  category: VenueCategory
  rating: number
  userRatingCount: number
  description: string
  reviewSnippet: string
  location: { latitude: number; longitude: number }
  types: string[]
  phone?: string
  website?: string
  priceLevel?: number
}

export const VENUE_REGISTRY: RegistryVenue[] = [
  // ── MANHATTAN ──
  {
    id: 'reg_mn_001', name: 'Chelsea Piers Fitness', address: '62 Chelsea Piers, New York, NY 10011',
    borough: 'manhattan', category: 'Fitness', rating: 4.6, userRatingCount: 2340,
    description: 'Premier waterfront fitness complex with Olympic-size pool, rock climbing wall, and full-strength training center spread across 28 acres.',
    reviewSnippet: '"Best gym in NYC — the views alone are worth the membership."',
    location: { latitude: 40.7466, longitude: -74.0083 }, types: ['gym', 'fitness_center', 'swimming_pool'],
  },
  {
    id: 'reg_mn_002', name: 'YogaWorks Soho', address: '150 Spring St, New York, NY 10012',
    borough: 'manhattan', category: 'Wellness', rating: 4.4, userRatingCount: 890,
    description: 'Premier yoga studio offering Hatha, Vinyasa, and hot yoga classes in a serene Soho loft space.',
    reviewSnippet: '"Incredible instructors and a truly calming atmosphere."',
    location: { latitude: 40.7245, longitude: -74.0015 }, types: ['yoga_studio', 'health'],
  },
  {
    id: 'reg_mn_003', name: 'Church Street Boxing Gym', address: '25 Park Pl, New York, NY 10007',
    borough: 'manhattan', category: 'Fitness', rating: 4.7, userRatingCount: 1560,
    description: 'Legendary boxing gym in Lower Manhattan with world-class trainers, heavy bags, and a full sparring ring.',
    reviewSnippet: '"The real deal — trained by former champs in a no-frills environment."',
    location: { latitude: 40.7130, longitude: -74.0087 }, types: ['boxing_gym', 'martial_arts_school', 'gym'],
  },
  {
    id: 'reg_mn_004', name: 'Equinox Columbus Circle', address: '10 Columbus Cir, New York, NY 10019',
    borough: 'manhattan', category: 'Fitness', rating: 4.5, userRatingCount: 4120,
    description: 'Luxury fitness club with floor-to-ceiling views of Central Park, heated pool, eucalyptus steam rooms, and premium classes.',
    reviewSnippet: '"The gold standard of gyms — immaculate facilities and top-tier trainers."',
    location: { latitude: 40.7682, longitude: -73.9824 }, types: ['gym', 'fitness_center', 'health'],
  },
  {
    id: 'reg_mn_005', name: 'SoulCycle NoHo', address: '856 Broadway, New York, NY 10003',
    borough: 'manhattan', category: 'Fitness', rating: 4.3, userRatingCount: 1870,
    description: 'High-energy indoor cycling studio with candlelit rides, motivating instructors, and a cult-like following.',
    reviewSnippet: '"The best workout and energy boost in the city — addictive!"',
    location: { latitude: 40.7351, longitude: -73.9906 }, types: ['gym', 'fitness_center'],
  },
  {
    id: 'reg_mn_006', name: 'Ai Fiori', address: '400 5th Ave, New York, NY 10018',
    borough: 'manhattan', category: 'Dining', rating: 4.6, userRatingCount: 1560,
    description: 'Michelin-starred Southern Italian restaurant in Midtown serving handmade pasta, fresh seafood, and an extensive wine list.',
    reviewSnippet: '"Exquisite Italian cuisine — the tasting menu is unforgettable."',
    location: { latitude: 40.7498, longitude: -73.9837 }, types: ['restaurant', 'fine_dining'],
  },
  {
    id: 'reg_mn_007', name: 'The Dead Rabbit', address: '30 Water St, New York, NY 10004',
    borough: 'manhattan', category: 'Nightlife', rating: 4.7, userRatingCount: 3210,
    description: 'Award-winning Irish pub and cocktail bar in the Financial District with period decor, live music, and world-class drinks.',
    reviewSnippet: '"Best bar in the world — the craft cocktails are unmatched."',
    location: { latitude: 40.7033, longitude: -74.0072 }, types: ['bar', 'night_club'],
  },
  {
    id: 'reg_mn_008', name: 'The Metropolitan Museum of Art', address: '1000 5th Ave, New York, NY 10028',
    borough: 'manhattan', category: 'Arts', rating: 4.8, userRatingCount: 89500,
    description: 'World-renowned art museum on Museum Mile with over 5,000 years of art from across the globe.',
    reviewSnippet: '"A world-class museum that deserves multiple visits — absolutely breathtaking."',
    location: { latitude: 40.7794, longitude: -73.9632 }, types: ['museum', 'art_gallery'],
  },
  {
    id: 'reg_mn_009', name: 'Blue Note Jazz Club', address: '131 W 3rd St, New York, NY 10012',
    borough: 'manhattan', category: 'Music', rating: 4.6, userRatingCount: 4890,
    description: 'Iconic Greenwich Village jazz club hosting legendary musicians nightly with dinner and cocktail service.',
    reviewSnippet: '"The quintessential NYC jazz experience — world-class performers every night."',
    location: { latitude: 40.7308, longitude: -74.0013 }, types: ['music_venue', 'bar'],
  },
  {
    id: 'reg_mn_010', name: 'Aire Ancient Baths', address: '88 Franklin St, New York, NY 10013',
    borough: 'manhattan', category: 'Wellness', rating: 4.5, userRatingCount: 1230,
    description: 'Luxurious underground spa in Tribeca featuring thermal baths, steam rooms, and massage treatments in a restored industrial space.',
    reviewSnippet: '"The most relaxing experience in NYC — like stepping into another world."',
    location: { latitude: 40.7181, longitude: -74.0050 }, types: ['spa', 'health'],
  },

  // ── BROOKLYN ──
  {
    id: 'reg_bk_001', name: 'Blink Fitness Williamsburg', address: '174 N 4th St, Brooklyn, NY 11211',
    borough: 'brooklyn', category: 'Fitness', rating: 4.1, userRatingCount: 2100,
    description: 'Clean, affordable gym in Williamsburg with modern equipment, turf area, and group fitness classes.',
    reviewSnippet: '"Great value gym — always clean and never too crowded."',
    location: { latitude: 40.7156, longitude: -73.9620 }, types: ['gym', 'fitness_center'],
  },
  {
    id: 'reg_bk_002', name: 'Sky Ting Yoga', address: '93 N 6th St, Brooklyn, NY 11249',
    borough: 'brooklyn', category: 'Wellness', rating: 4.5, userRatingCount: 620,
    description: 'Trendy Williamsburg yoga studio known for its vibrant community, challenging flows, and welcoming atmosphere.',
    reviewSnippet: '"The energy here is unmatched — best yoga community in Brooklyn."',
    location: { latitude: 40.7180, longitude: -73.9616 }, types: ['yoga_studio'],
  },
  {
    id: 'reg_bk_003', name: 'Lilia', address: '567 Union Ave, Brooklyn, NY 11222',
    borough: 'brooklyn', category: 'Dining', rating: 4.7, userRatingCount: 2450,
    description: 'Acclaimed Italian restaurant in Williamsburg with house-made pasta, wood-fired dishes, and a celebrated wine program.',
    reviewSnippet: '"Best Italian food in NYC — the cacio e pepe is life-changing."',
    location: { latitude: 40.7184, longitude: -73.9513 }, types: ['restaurant', 'fine_dining'],
  },
  {
    id: 'reg_bk_004', name: 'House of Yes', address: '2 Wyckoff Ave, Brooklyn, NY 11237',
    borough: 'brooklyn', category: 'Nightlife', rating: 4.4, userRatingCount: 2890,
    description: 'Interactive nightclub and performance space in Bushwick known for circus acts, themed parties, and immersive experiences.',
    reviewSnippet: '"The most fun you can have in Brooklyn — wild, creative, and unforgettable."',
    location: { latitude: 40.7036, longitude: -73.9092 }, types: ['night_club', 'bar'],
  },
  {
    id: 'reg_bk_005', name: 'Brooklyn Museum', address: '200 Eastern Pkwy, Brooklyn, NY 11238',
    borough: 'brooklyn', category: 'Arts', rating: 4.6, userRatingCount: 26500,
    description: 'One of the oldest and largest art museums in the country with collections spanning ancient Egyptian to contemporary art.',
    reviewSnippet: '"A treasure of Brooklyn — world-class exhibitions without the Manhattan crowds."',
    location: { latitude: 40.6712, longitude: -73.9636 }, types: ['museum', 'art_gallery'],
  },
  {
    id: 'reg_bk_006', name: 'National Sawdust', address: '80 N 6th St, Brooklyn, NY 11249',
    borough: 'brooklyn', category: 'Music', rating: 4.5, userRatingCount: 890,
    description: 'Innovative music venue in Williamsburg showcasing emerging and experimental artists across all genres.',
    reviewSnippet: '"Intimate venue with incredible acoustics — discover your new favorite artist here."',
    location: { latitude: 40.7194, longitude: -73.9623 }, types: ['music_venue'],
  },
  {
    id: 'reg_bk_007', name: 'Bushwick Collective', address: 'Troutman St & St Nicholas Ave, Brooklyn, NY 11206',
    borough: 'brooklyn', category: 'Arts', rating: 4.6, userRatingCount: 4120,
    description: 'Open-air street art gallery in Bushwick featuring massive murals by world-renowned graffiti artists covering entire blocks.',
    reviewSnippet: '"A must-see for art lovers — every corner reveals a new masterpiece."',
    location: { latitude: 40.7008, longitude: -73.9366 }, types: ['art_gallery'],
  },
  {
    id: 'reg_bk_008', name: 'Williamsburg Hot Yoga', address: '177 S 4th St, Brooklyn, NY 11211',
    borough: 'brooklyn', category: 'Wellness', rating: 4.3, userRatingCount: 540,
    description: 'Heated yoga studio offering Bikram, Vinyasa, and Yin classes in a welcoming community space.',
    reviewSnippet: '"The heat + the instruction = the perfect detox. Love this studio."',
    location: { latitude: 40.7104, longitude: -73.9616 }, types: ['yoga_studio', 'health'],
  },
  {
    id: 'reg_bk_009', name: 'Smorgasburg', address: '90 Kent Ave, Brooklyn, NY 11249',
    borough: 'brooklyn', category: 'Dining', rating: 4.3, userRatingCount: 8900,
    description: 'Iconic outdoor food market in Williamsburg featuring 100+ food vendors with cuisines from around the world.',
    reviewSnippet: '"Food paradise — come hungry and try everything."',
    location: { latitude: 40.7176, longitude: -73.9588 }, types: ['restaurant', 'food'],
  },
  {
    id: 'reg_bk_010', name: 'The Bell House', address: '149 7th St, Brooklyn, NY 11215',
    borough: 'brooklyn', category: 'Music', rating: 4.6, userRatingCount: 1340,
    description: 'Historic Gowanus venue hosting live music, comedy shows, and literary events in a restored 1800s warehouse.',
    reviewSnippet: '"Perfect venue — great sound, cool vibe, and awesome bookings."',
    location: { latitude: 40.6740, longitude: -73.9901 }, types: ['music_venue', 'bar'],
  },

  // ── QUEENS ──
  {
    id: 'reg_qn_001', name: 'Blink Fitness Astoria', address: '30-02 34th St, Astoria, NY 11103',
    borough: 'queens', category: 'Fitness', rating: 4.2, userRatingCount: 1560,
    description: 'Modern gym in Astoria with state-of-the-art equipment, turf zone, and group fitness classes at an affordable price.',
    reviewSnippet: '"Clean, spacious, and well-equipped — best gym in Astoria."',
    location: { latitude: 40.7645, longitude: -73.9200 }, types: ['gym', 'fitness_center'],
  },
  {
    id: 'reg_qn_002', name: 'MoMA PS1', address: '22-25 Jackson Ave, Long Island City, NY 11101',
    borough: 'queens', category: 'Arts', rating: 4.5, userRatingCount: 12500,
    description: 'Contemporary art museum in Long Island City housed in a historic school building, featuring cutting-edge exhibitions and Warm Up music series.',
    reviewSnippet: '"One of the best contemporary art spaces in NYC — always ahead of the curve."',
    location: { latitude: 40.7482, longitude: -73.9463 }, types: ['museum', 'art_gallery'],
  },
  {
    id: 'reg_qn_003', name: 'Astoria Seafood', address: '33-01 24th Ave, Astoria, NY 11102',
    borough: 'queens', category: 'Dining', rating: 4.4, userRatingCount: 2340,
    description: 'Greek seafood market and restaurant where you pick your fresh fish from the display and they grill it to perfection.',
    reviewSnippet: '"Fresh, affordable, and delicious — pick your own seafood and they cook it right."',
    location: { latitude: 40.7719, longitude: -73.9200 }, types: ['restaurant', 'seafood'],
  },
  {
    id: 'reg_qn_004', name: 'Crommelin Park Tennis Courts', address: '31st Ave & 33rd St, Astoria, NY 11106',
    borough: 'queens', category: 'Outdoor', rating: 4.1, userRatingCount: 380,
    description: 'Well-maintained public tennis courts in Astoria with six courts, lighting for evening play, and a running track.',
    reviewSnippet: '"Great courts that are usually available — perfect for a casual match."',
    location: { latitude: 40.7645, longitude: -73.9150 }, types: ['park', 'sports'],
  },
  {
    id: 'reg_qn_005', name: 'Flushing Meadows Corona Park', address: '11101 Corona Ave, Queens, NY 11368',
    borough: 'queens', category: 'Outdoor', rating: 4.4, userRatingCount: 18900,
    description: 'Massive public park with the Unisphere, lakes, tennis center (US Open), botanical garden, and miles of walking trails.',
    reviewSnippet: '"An NYC gem — so much space, beauty, and history in one place."',
    location: { latitude: 40.7424, longitude: -73.8480 }, types: ['park', 'outdoor'],
  },

  // ── BRONX ──
  {
    id: 'reg_bx_001', name: 'Planet Fitness Concourse', address: '301 E 149th St, Bronx, NY 10451',
    borough: 'bronx', category: 'Fitness', rating: 4.0, userRatingCount: 2340,
    description: 'Judgment-free gym near Yankee Stadium with clean equipment, cardio machines, and affordable membership options.',
    reviewSnippet: '"Great value gym — friendly staff and always clean."',
    location: { latitude: 40.8162, longitude: -73.9275 }, types: ['gym', 'fitness_center'],
  },
  {
    id: 'reg_bx_002', name: 'The Bronx Museum of the Arts', address: '1040 Grand Concourse, Bronx, NY 10456',
    borough: 'bronx', category: 'Arts', rating: 4.3, userRatingCount: 3450,
    description: 'Contemporary art museum focusing on works by African, Asian, and Latin American artists with free admission.',
    reviewSnippet: '"A cultural treasure in the Bronx — thought-provoking exhibitions and free entry."',
    location: { latitude: 40.8316, longitude: -73.9200 }, types: ['museum', 'art_gallery'],
  },
  {
    id: 'reg_bx_003', name: 'New York Botanical Garden', address: '2900 Southern Blvd, Bronx, NY 10458',
    borough: 'bronx', category: 'Outdoor', rating: 4.7, userRatingCount: 19500,
    description: '250-acre botanical garden with the iconic Haupt Conservatory, rose garden, native forest, and seasonal flower shows.',
    reviewSnippet: '"Absolutely stunning — the Haupt Conservatory is a must-see year-round."',
    location: { latitude: 40.8624, longitude: -73.8784 }, types: ['park', 'outdoor'],
  },
  {
    id: 'reg_bx_004', name: 'Zero Otto Nove', address: '2357 Arthur Ave, Bronx, NY 10458',
    borough: 'bronx', category: 'Dining', rating: 4.5, userRatingCount: 1670,
    description: 'Beloved Arthur Avenue Italian restaurant serving wood-fired pizzas, homemade pasta, and classic Southern Italian dishes.',
    reviewSnippet: '"The best pizza on Arthur Avenue — authentic Italian perfection."',
    location: { latitude: 40.8551, longitude: -73.8878 }, types: ['restaurant', 'italian'],
  },
  {
    id: 'reg_bx_005', name: 'Bronx Zoo', address: '2300 Southern Blvd, Bronx, NY 10460',
    borough: 'bronx', category: 'Outdoor', rating: 4.6, userRatingCount: 45600,
    description: 'One of the largest metropolitan zoos in the world with over 6,000 animals, Congo Gorilla Forest, and the Butterfly Garden.',
    reviewSnippet: '"Incredible zoo — the Congo Gorilla Forest is a world-class exhibit."',
    location: { latitude: 40.8501, longitude: -73.8784 }, types: ['park', 'outdoor'],
  },

  // ── STATEN ISLAND ──
  {
    id: 'reg_si_001', name: 'Snug Harbor Cultural Center', address: '1000 Richmond Terrace, Staten Island, NY 10301',
    borough: 'staten_island', category: 'Arts', rating: 4.5, userRatingCount: 4560,
    description: '83-acre cultural campus in a historic sailors retreat featuring botanical gardens, art galleries, theaters, and the Staten Island Museum.',
    reviewSnippet: '"A hidden gem — beautiful gardens and fascinating history all in one place."',
    location: { latitude: 40.6420, longitude: -74.0760 }, types: ['museum', 'art_gallery', 'park'],
  },
  {
    id: 'reg_si_002', name: 'Retro Fitness Staten Island', address: '2655 Richmond Ave, Staten Island, NY 10314',
    borough: 'staten_island', category: 'Fitness', rating: 4.1, userRatingCount: 890,
    description: 'Full-service gym with top-of-the-line cardio and strength equipment, group fitness classes, and hydromassage.',
    reviewSnippet: '"Clean gym with plenty of equipment — never have to wait for a machine."',
    location: { latitude: 40.5810, longitude: -74.1620 }, types: ['gym', 'fitness_center'],
  },
  {
    id: 'reg_si_003', name: 'Lake Tysen Park', address: '1601 W Fingerboard Rd, Staten Island, NY 10305',
    borough: 'staten_island', category: 'Outdoor', rating: 4.3, userRatingCount: 560,
    description: 'Scenic park surrounding a lake with walking trails, fishing pier, playground, and picnic areas.',
    reviewSnippet: '"Peaceful escape from the city — beautiful trails and a serene lake."',
    location: { latitude: 40.6020, longitude: -74.0750 }, types: ['park', 'outdoor'],
  },
  {
    id: 'reg_si_004', name: 'Enoteca Maria', address: '27 Hyatt St, Staten Island, NY 10301',
    borough: 'staten_island', category: 'Dining', rating: 4.6, userRatingCount: 1230,
    description: 'Unique Italian restaurant featuring Nonnas from around the world who take turns cooking their grandmother recipes.',
    reviewSnippet: '"The most authentic Italian food — cooked by real Nonnas!"',
    location: { latitude: 40.6410, longitude: -74.0770 }, types: ['restaurant', 'italian'],
  },
  {
    id: 'reg_si_005', name: 'Flagship Brewing Company', address: '40 Minthorne St, Staten Island, NY 10301',
    borough: 'staten_island', category: 'Nightlife', rating: 4.4, userRatingCount: 980,
    description: 'Craft brewery in St. George with a waterfront taproom serving small-batch beers and hosting live music events.',
    reviewSnippet: '"Great local brewery with excellent IPAs and a beautiful waterfront view."',
    location: { latitude: 40.6420, longitude: -74.0760 }, types: ['bar', 'brewery'],
  },
]

export function getVenuesByBorough(borough: string): RegistryVenue[] {
  return VENUE_REGISTRY.filter((v) => v.borough === borough)
}

export function searchRegistry(query: string, borough?: string): RegistryVenue[] {
  const lower = query.toLowerCase()
  let results = VENUE_REGISTRY.filter(
    (v) =>
      v.name.toLowerCase().includes(lower) ||
      v.address.toLowerCase().includes(lower) ||
      v.description.toLowerCase().includes(lower) ||
      v.category.toLowerCase().includes(lower),
  )
  if (borough) results = results.filter((v) => v.borough === borough)
  return results
}

export function getRegistryVenue(id: string): RegistryVenue | undefined {
  return VENUE_REGISTRY.find((v) => v.id === id)
}
