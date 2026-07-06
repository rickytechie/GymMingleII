import type { Profile } from './profiles'
import { PremiumTier, PremiumFeature, createFreeAccount } from './minglecoin'
import type { MingleCoinAccount } from './minglecoin'

export interface DemoProfile extends Profile {
  age: number
  fitnessStyle: string
  mingleCoins: MingleCoinAccount
  premiumFeatures: PremiumFeature[]
  interests: string[]
  lookingFor: string[]
}

export const DEMO_PROFILES: DemoProfile[] = [
  {
    id: 'demo_marcus_001',
    name: 'Marcus',
    age: 28,
    bio: 'Competitive Muay Thai fighter and strength coach. I train at dawn, meal prep by noon, and I\'m looking for someone who can keep up — in the gym and beyond. Kink-aware, poly-positive, no judgment zone.',
    avatar_url: null,
    fitnessStyle: 'Martial Arts / Strength',
    mingleCoins: { ...createFreeAccount(), balance: 320, lifetimeEarned: 870, lifetimeSpent: 550, tier: PremiumTier.STARTER, unlockedFeatures: [PremiumFeature.AdvancedChat, PremiumFeature.VenueInsights] },
    premiumFeatures: [PremiumFeature.AdvancedChat, PremiumFeature.VenueInsights],
    interests: ['Muay Thai', 'Strength training', 'Meal prep', 'Bouldering', 'BDSM events'],
    lookingFor: ['Training partner', 'Sparring partner', 'Romantic connection', 'Power exchange dynamics'],
  },
  {
    id: 'demo_elena_001',
    name: 'Elena',
    age: 31,
    bio: 'Yoga instructor and wellness curator. I believe movement is medicine and connection is the practice. Switch, kink-friendly, looking for intentional chemistry over small talk. Bonus if you can meditate and dominate.',
    avatar_url: null,
    fitnessStyle: 'Yoga / Pilates / Mobility',
    mingleCoins: { ...createFreeAccount(), balance: 640, lifetimeEarned: 2100, lifetimeSpent: 1460, tier: PremiumTier.PREMIUM_MOMENTUM, unlockedFeatures: [PremiumFeature.AdvancedChat, PremiumFeature.UnlimitedLikes, PremiumFeature.VenueInsights, PremiumFeature.ReadReceipts, PremiumFeature.LifestyleFilters, PremiumFeature.CuratedDateDiscovery, PremiumFeature.VenuePerks] },
    premiumFeatures: [PremiumFeature.AdvancedChat, PremiumFeature.UnlimitedLikes, PremiumFeature.VenueInsights, PremiumFeature.ReadReceipts, PremiumFeature.LifestyleFilters, PremiumFeature.CuratedDateDiscovery, PremiumFeature.VenuePerks],
    interests: ['Yoga', 'Meditation', 'Sensory play', 'Cooking', 'Sound baths', 'Rope bondage'],
    lookingFor: ['Deep connection', 'Lifestyle partner', 'Kink exploration', 'Mind-body synergy'],
  },
  {
    id: 'demo_david_001',
    name: 'David',
    age: 26,
    bio: 'Division I swimmer turned open-water enthusiast. New to the kink scene but eager to explore with the right guide. Fitness is my therapy, vulnerability is my edge. Looking for someone patient and confident.',
    avatar_url: null,
    fitnessStyle: 'Swimming / Cardio / Functional',
    mingleCoins: { ...createFreeAccount(), balance: 150, lifetimeEarned: 420, lifetimeSpent: 270, tier: PremiumTier.FREE, unlockedFeatures: [] },
    premiumFeatures: [],
    interests: ['Open water swimming', 'Running', 'Film photography', 'Coffee', 'Learning rope'],
    lookingFor: ['Fitness buddy', 'Mentor', 'Romance', 'Kink education'],
  },
  {
    id: 'demo_sarah_001',
    name: 'Sarah',
    age: 29,
    bio: 'CrossFit competitor by morning, lifestyle dominatrix by night. I lead in the box and in the bedroom. If you can handle burpees and obedience, we might have something. No flakes, no fakes.',
    avatar_url: null,
    fitnessStyle: 'CrossFit / HIIT / Powerlifting',
    mingleCoins: { ...createFreeAccount(), balance: 1280, lifetimeEarned: 4500, lifetimeSpent: 3220, tier: PremiumTier.ELITE_PEAK, unlockedFeatures: [PremiumFeature.AdvancedChat, PremiumFeature.UnlimitedLikes, PremiumFeature.VenueInsights, PremiumFeature.ReadReceipts, PremiumFeature.PriorityMatching, PremiumFeature.IncognitoMode, PremiumFeature.VerifiedBadge, PremiumFeature.LifestyleFilters, PremiumFeature.KinkDiscovery, PremiumFeature.CuratedDateDiscovery, PremiumFeature.VenuePerks] },
    premiumFeatures: [PremiumFeature.AdvancedChat, PremiumFeature.UnlimitedLikes, PremiumFeature.VenueInsights, PremiumFeature.ReadReceipts, PremiumFeature.PriorityMatching, PremiumFeature.IncognitoMode, PremiumFeature.VerifiedBadge, PremiumFeature.LifestyleFilters, PremiumFeature.KinkDiscovery, PremiumFeature.CuratedDateDiscovery, PremiumFeature.VenuePerks],
    interests: ['CrossFit', 'Powerlifting', 'Leather craft', 'Impact play', 'Nutrition coaching', 'Dungeon nights'],
    lookingFor: ['Submissive training partner', 'Lifestyle dynamic', 'Brunch dates', 'Accountability partner'],
  },
]
