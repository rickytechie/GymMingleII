import type { Profile } from './profiles'
import type { DatingProfile, LookingFor, RelationshipStatus, FitnessLevel, IndoorOutdoorPref, Build } from './dating'
import type { MingleCoinAccount } from './minglecoin'
import { PremiumTier, PremiumFeature, createFreeAccount } from './minglecoin'
import { CITY_REGIONS } from './venues'

export interface CommunityProfile extends Profile, DatingProfile {
  fitnessStyle: string
  mingleCoins: MingleCoinAccount
  premiumFeatures: PremiumFeature[]
  city: string
}

const MALE_NAMES = [
  'Marcus', 'David', 'Tyler', 'James', 'Kai', 'Jordan', 'Alex', 'Noah', 'Ethan', 'Liam',
  'Mason', 'Lucas', 'Aiden', 'Caleb', 'Ryan', 'Owen', 'Samuel', 'Dylan', 'Nathan', 'Gabriel',
  'Julian', 'Isaac', 'Levi', 'Henry', 'Wyatt', 'Leo', 'Jack', 'Daniel', 'Matthew', 'Sebastian',
  'Andrew', 'William', 'Joseph', 'Michael', 'Benjamin', 'Elijah', 'Oliver', 'Landon', 'Grayson', 'Hudson',
  'Asher', 'Thomas', 'Charles', 'Christopher', 'John', 'Theodore', 'Adrian', 'Nolan', 'Cooper', 'Miles',
  'Ezra', 'Carson', 'Dominic', 'Jaxon', 'Greyson', 'Josiah', 'Adam', 'Ian', 'Xavier', 'Chase',
  'Austin', 'Evan', 'Cole', 'Bryce', 'Micah', 'Jace', 'Parker', 'Luke', 'Brooks', 'Blake',
  'Jake', 'Connor', 'Cameron', 'Derek', 'Seth', 'Zane', 'Tristan', 'Reid', 'Grant', 'Dean',
  'Rhys', 'Brett', 'Shane', 'Max', 'Wade', 'Damon', 'Eric', 'Felix', 'Finn', 'Giovanni',
  'Harvey', 'Ivan', 'Jasper', 'Kyle', 'Lance', 'Maddox', 'Nico', 'Orion', 'Quinn', 'Rylan',
  'Simon', 'Tate', 'Uriah', 'Vance', 'Wesley', 'Zion', 'Beau', 'Cruz', 'Drake', 'Emmett',
  'Flynn', 'Gage', 'Holden', 'Jett', 'Knox', 'Lane', 'Maverick', 'Preston', 'Riggs', 'Sawyer',
  'Talon', 'Vaughn', 'Walker', 'Zeke', 'Archer', 'Bishop', 'Crew', 'Dash', 'Fox', 'Gunnar',
  'Hawk', 'Jagger', 'Kash', 'Mack', 'Nash', 'Orson', 'Pierce', 'Rex', 'Stone', 'Trace',
  'Vance', 'Wilder', 'Zane', 'Asa', 'Boone', 'Cash', 'Duke', 'Ford', 'Hank', 'Jude',
  'Kane', 'Lux', 'Moss', 'Nile', 'Otis', 'Pax', 'Remy', 'Slade', 'True', 'Vale',
  'Wren', 'Zephyr', 'Atlas', 'Cypress', 'Echo', 'Grey', 'Indigo', 'Koa', 'Lake', 'Mars',
  'Onyx', 'Pine', 'River', 'Sky', 'Storm', 'Wolf', 'Ash', 'Birch', 'Copper', 'Dusty',
  'Frost', 'Glenn', 'Heath', 'Ivory', 'Jet', 'Kip', 'Lynx', 'Mica', 'Nevada', 'Ozzy',
  'Phoenix', 'Reef', 'Sage', 'Tundra', 'Utah', 'Willow', 'Yukon', 'Zion', 'Arrow', 'Blaze',
]

const FEMALE_NAMES = [
  'Elena', 'Sarah', 'Priya', 'Maya', 'Sophia', 'Olivia', 'Emma', 'Ava', 'Isabella', 'Mia',
  'Charlotte', 'Amelia', 'Harper', 'Evelyn', 'Luna', 'Chloe', 'Penelope', 'Layla', 'Riley', 'Zoey',
  'Nora', 'Lily', 'Eleanor', 'Hannah', 'Lillian', 'Addison', 'Aubrey', 'Ellie', 'Stella', 'Natalie',
  'Zoe', 'Leah', 'Hazel', 'Violet', 'Aurora', 'Savannah', 'Audrey', 'Brooklyn', 'Bella', 'Claire',
  'Skylar', 'Paisley', 'Everly', 'Anna', 'Caroline', 'Genesis', 'Aaliyah', 'Kennedy', 'Kinsley', 'Allison',
  'Maya', 'Samantha', 'Valentina', 'Naomi', 'Ivy', 'Iris', 'Ariana', 'Elena', 'Catherine', 'Lydia',
  'Madelyn', 'Faith', 'Jade', 'Athena', 'Andrea', 'Julia', 'Vivian', 'Scarlett', 'Margaret', 'Sienna',
  'Ruth', 'Isabelle', 'Quinn', 'Sage', 'Amaya', 'Gemma', 'Rose', 'Daisy', 'Freya', 'Elise',
  'Summer', 'Haven', 'Winter', 'Juniper', 'Ember', 'River', 'Wren', 'Briar', 'Fern', 'Maple',
  'Olive', 'Pearl', 'Ruby', 'Sapphire', 'Beryl', 'Coral', 'Jade', 'Luna', 'Nova', 'Stella',
  'Amber', 'Brielle', 'Cassidy', 'Dahlia', 'Elara', 'Fiona', 'Genevieve', 'Holly', 'Indigo', 'Journey',
  'Kiara', 'Lilac', 'Meadow', 'Noelle', 'Opal', 'Paloma', 'Raven', 'Serenity', 'Tatum', 'Unity',
  'Valerie', 'Willow', 'Xanthe', 'Yara', 'Zara', 'Aspen', 'Blair', 'Celeste', 'Delilah', 'Esther',
  'Fleur', 'Grace', 'Heather', 'Imani', 'Jasmine', 'Kendra', 'Lacey', 'Maren', 'Nadia', 'Ophelia',
  'Paige', 'Ramona', 'Sabrina', 'Tessa', 'Ursula', 'Vera', 'Willa', 'Xena', 'Yvette', 'Zelda',
  'Alexis', 'Bianca', 'Cora', 'Diana', 'Eliza', 'Faye', 'Gia', 'Helena', 'Inez', 'Jada',
  'Kayla', 'Lena', 'Mira', 'Nina', 'Oona', 'Pia', 'Rhea', 'Sasha', 'Thea', 'Una',
  'Vita', 'Wendy', 'Xia', 'Yuki', 'Zia', 'Aria', 'Briar', 'Clio', 'Demi', 'Echo',
  'Flora', 'Gaia', 'Hana', 'Isla', 'Juno', 'Kai', 'Lyra', 'Maia', 'Nyx', 'Ori',
  'Pearl', 'Rue', 'Sola', 'Tara', 'Uma', 'Veda', 'Wren', 'Xyla', 'Ysabel', 'Zora',
]

const OCCUPATIONS = [
  'Personal Trainer', 'Yoga Instructor', 'Software Engineer', 'Nurse', 'Teacher', 'Architect',
  'Graphic Designer', 'Chef', 'Photographer', 'Dancer', 'Pilates Coach', 'CrossFit Coach',
  'Physical Therapist', 'Nutritionist', 'Barista', 'Bartender', 'Artist', 'Musician',
  'Doctor', 'Lawyer', 'Entrepreneur', 'Barber', 'Esthetician', 'Massage Therapist',
  'Marketing Manager', 'Data Analyst', 'Fashion Designer', 'Flight Attendant', 'Journalist',
  'Social Media Manager', 'Event Planner', 'Real Estate Agent', 'UX Designer', 'Writer',
]

const ACTIVITIES = [
  'Hot yoga', 'CrossFit', 'Boxing', 'Running', 'Weightlifting', 'Pilates', 'Swimming',
  'Cycling', 'Bouldering', 'Hiking', 'Dance cardio', 'Muay Thai', 'BJJ', 'Barre',
  'Powerlifting', 'Calisthenics', 'Rowing', 'Kickboxing', 'Zumba', 'Spinning',
]

const SPORTS_OPTIONS = [
  ['Yoga', 'Running', 'Swimming'],
  ['CrossFit', 'Weightlifting', 'Rowing'],
  ['Boxing', 'Muay Thai', 'BJJ'],
  ['Pilates', 'Barre', 'Dance'],
  ['Hiking', 'Cycling', 'Running'],
  ['Swimming', 'Surfing', 'Yoga'],
  ['Bouldering', 'Yoga', 'Hiking'],
  ['Powerlifting', 'Strongman', 'Weightlifting'],
  ['Kickboxing', 'Boxing', 'Muay Thai'],
  ['Spinning', 'Running', 'Swimming'],
]

const BIOS = [
  'Fitness is my therapy. Looking for someone who gets that.',
  'I believe in pushing limits — in the gym and in life.',
  'Hot yoga enthusiast, cold brew connoisseur.',
  'New to the city and looking for a training partner who can also grab a drink.',
  'Marathon runner by day, foodie by night.',
  'CrossFit competitor. If you can keep up, we might have something.',
  'Yoga instructor looking for someone who values mindfulness and movement.',
  'I meal prep on Sundays and crush PRs on Mondays.',
  'Looking for a gym buddy who becomes a life buddy.',
  'Bodybuilder with a soft spot for indie films and jazz.',
  'I run on coffee, deadlifts, and good conversation.',
  'Fitness model, food lover, adventure seeker.',
  'I don\'t need a six-pack, I need someone who makes me laugh.',
  'BJJ black belt. Respect on the mats, respect in the streets.',
  'Swimmer, hiker, dog lover. Let\'s explore together.',
  'Personal trainer by profession, motivator by nature.',
  'I believe the best relationships start with a good workout.',
  'Looking for someone to share sun salutations and Sunday brunch.',
  'Dancer turned fitness coach. Movement is my language.',
  'Let\'s climb mountains — literal and metaphorical.',
]

const KINK_PREFS = [
  undefined, undefined, undefined,
  ['Rope bondage', 'Sensory play'],
  ['Impact play', 'Leather craft'],
  ['Dungeon nights', 'Power exchange'],
  ['Kink exploration', 'BDSM 101'],
  ['Switch dynamics', 'Rope bondage'],
  ['Dominant energy', 'Sensory deprivation'],
  ['Submissive exploration', 'Impact play'],
]

const CITY_KEYS = Object.keys(CITY_REGIONS)

export const CITY_WEIGHTS: Record<string, number> = {
  // Tier 1 — Mega metros
  nyc: 50, la: 30, chicago: 25,
  // Tier 2 — Major metros
  houston: 20, dallas: 20, phoenix: 18, philadelphia: 18, atlanta: 18,
  san_antonio: 16, san_diego: 16, boston: 16, miami: 16,
  austin: 14, san_jose: 14, seattle: 14, denver: 14, las_vegas: 14,
  washington_dc: 18, pittsburgh: 10,
  // Tier 3 — Mid-sized
  jacksonville: 12, indianapolis: 12, nashville: 12, portland: 12,
  charlotte: 12, detroit: 12, minneapolis: 12, tampa: 12,
  orlando: 12, sacramento: 12, columbus: 12, raleigh: 12,
  // Tier 4 — Smaller metros
  baltimore: 10, el_paso: 10, st_louis: 10, cincinnati: 10,
  cleveland: 10, kansas_city: 10, milwaukee: 10, new_orleans: 10,
  virginia_beach: 10, buffalo: 8, tucson: 8, albuquerque: 8, richmond: 8,
  // Tier 5 — Small cities / suburbs
  rochester: 6, syracuse: 6, albany: 6, grand_rapids: 6,
  glen_cove: 3, new_rochelle: 3, sea_cliff: 2, amherst: 2,
}

const WEIGHTED_CITIES: string[] = []
for (const city of CITY_KEYS) {
  const w = CITY_WEIGHTS[city] ?? 5
  for (let i = 0; i < w; i++) WEIGHTED_CITIES.push(city)
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function weightedCity(): string {
  return pick(WEIGHTED_CITIES)
}

function generateProfile(
  id: string,
  name: string,
  female: boolean,
): CommunityProfile {
  const city = weightedCity()
  const tiers = [PremiumTier.FREE, PremiumTier.FREE, PremiumTier.FREE, PremiumTier.STARTER, PremiumTier.STARTER, PremiumTier.MOMENTUM, PremiumTier.PEAK, PremiumTier.APEX]
  const tier = pick(tiers)
  const base = createFreeAccount()
  const tierFeatures: Record<PremiumTier, PremiumFeature[]> = {
    [PremiumTier.FREE]: [],
    [PremiumTier.STARTER]: [PremiumFeature.AdvancedChat as PremiumFeature, PremiumFeature.VenueInsights as PremiumFeature],
    [PremiumTier.MOMENTUM]: [PremiumFeature.AdvancedChat as PremiumFeature, PremiumFeature.UnlimitedLikes as PremiumFeature, PremiumFeature.VenueInsights as PremiumFeature, PremiumFeature.LifestyleFilters as PremiumFeature, PremiumFeature.CuratedDateDiscovery as PremiumFeature, PremiumFeature.VenuePerks as PremiumFeature],
    [PremiumTier.PEAK]: [PremiumFeature.AdvancedChat as PremiumFeature, PremiumFeature.UnlimitedLikes as PremiumFeature, PremiumFeature.VenueInsights as PremiumFeature, PremiumFeature.ReadReceipts as PremiumFeature, PremiumFeature.PriorityMatching as PremiumFeature, PremiumFeature.IncognitoMode as PremiumFeature, PremiumFeature.VerifiedBadge as PremiumFeature, PremiumFeature.LifestyleFilters as PremiumFeature, PremiumFeature.KinkDiscovery as PremiumFeature, PremiumFeature.CuratedDateDiscovery as PremiumFeature, PremiumFeature.VenuePerks as PremiumFeature],
    [PremiumTier.APEX]: [PremiumFeature.AdvancedChat as PremiumFeature, PremiumFeature.UnlimitedLikes as PremiumFeature, PremiumFeature.VenueInsights as PremiumFeature, PremiumFeature.ReadReceipts as PremiumFeature, PremiumFeature.PriorityMatching as PremiumFeature, PremiumFeature.IncognitoMode as PremiumFeature, PremiumFeature.VerifiedBadge as PremiumFeature, PremiumFeature.LifestyleFilters as PremiumFeature, PremiumFeature.KinkDiscovery as PremiumFeature, PremiumFeature.CuratedDateDiscovery as PremiumFeature, PremiumFeature.VenuePerks as PremiumFeature, PremiumFeature.ConciergeBooking as PremiumFeature, PremiumFeature.OneOnOneCoaching as PremiumFeature, PremiumFeature.VIPVenueEntry as PremiumFeature],
  }

  const age = female ? randInt(21, 42) : randInt(22, 45)
  const fitnessStyles = female
    ? ['Yoga / Pilates', 'Dance / Cardio', 'CrossFit / HIIT', 'Strength Training', 'Running / Cardio', 'Swimming', 'Barre / Pilates']
    : ['Martial Arts / BJJ', 'Strength / Powerlifting', 'CrossFit / HIIT', 'Running / Cardio', 'Bodybuilding', 'Calisthenics', 'Boxing']
  const lookingForOptions: LookingFor[] = [
    'training_partner', 'romantic_connection', 'friendship', 'casual_dating',
    'accountability_partner', 'lifestyle_partner', 'kink_exploration',
  ]
  const numLooking = randInt(1, 3)
  const lookingFor: LookingFor[] = []
  const shuffled = [...lookingForOptions].sort(() => Math.random() - 0.5)
  for (let i = 0; i < numLooking; i++) lookingFor.push(shuffled[i])

  const relationships: RelationshipStatus[] = ['single', 'single', 'single', 'seeing_someone', 'open_relationship']
  const builds: Build[] = ['slender', 'athletic', 'muscular', 'curvy', 'average']
  const fitnessLevels: FitnessLevel[] = ['beginner', 'intermediate', 'advanced', 'athlete']
  const indoorOutdoor: IndoorOutdoorPref[] = ['indoor', 'outdoor', 'both']

  const balance = tier === PremiumTier.FREE ? randInt(10, 200) :
    tier === PremiumTier.STARTER ? randInt(200, 800) :
    tier === PremiumTier.MOMENTUM ? randInt(500, 2000) :
    tier === PremiumTier.PEAK ? randInt(1500, 5000) : randInt(4000, 15000)

  return {
    id,
    name,
    age,
    bio: pick(BIOS),
    avatar_url: null,
    fitnessStyle: pick(fitnessStyles),
    mingleCoins: {
      balance,
      lifetimeEarned: balance + randInt(100, 5000),
      lifetimeSpent: randInt(0, balance),
      tier,
      tierExpiresAt: tier === PremiumTier.FREE ? null : new Date(Date.now() + 30 * 86400000).toISOString(),
      unlockedFeatures: tierFeatures[tier],
    },
    premiumFeatures: tierFeatures[tier],
    city,
    lookingFor,
    relationshipStatus: pick(relationships),
    occupation: pick(OCCUPATIONS),
    fitnessLevel: pick(fitnessLevels),
    favoriteActivity: pick(ACTIVITIES),
    indoorOutdoorPref: pick(indoorOutdoor),
    build: pick(builds),
    sports: pick(SPORTS_OPTIONS),
    kinkDatePreferences: pick(KINK_PREFS),
  }
}

const TOTAL_PROFILES = 700
const MALE_COUNT = 200
const FEMALE_COUNT = 500

export const COMMUNITY_PROFILES: CommunityProfile[] = (() => {
  const profiles: CommunityProfile[] = []

  for (let i = 0; i < FEMALE_COUNT; i++) {
    const name = pick(FEMALE_NAMES)
    const city = weightedCity()
    if (profiles.some((p) => p.name === name && p.city === city)) continue
    profiles.push(generateProfile(`comm_f_${i}`, name, true))
  }

  for (let i = 0; i < MALE_COUNT; i++) {
    const name = pick(MALE_NAMES)
    const city = weightedCity()
    if (profiles.some((p) => p.name === name && p.city === city)) continue
    profiles.push(generateProfile(`comm_m_${i}`, name, false))
  }

  return profiles
})()

export function getProfilesByCity(cityKey: string): CommunityProfile[] {
  return COMMUNITY_PROFILES.filter((p) => p.city === cityKey)
}

export function getProfilesByTier(tier: PremiumTier): CommunityProfile[] {
  return COMMUNITY_PROFILES.filter((p) => p.mingleCoins.tier === tier)
}

export function getRandomProfiles(count: number): CommunityProfile[] {
  const shuffled = [...COMMUNITY_PROFILES].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
