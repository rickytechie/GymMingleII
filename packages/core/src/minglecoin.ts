export enum PremiumTier {
  Free = 'free',
  Starter = 'starter',
  Premium = 'premium',
  Elite = 'elite',
}

export enum PremiumFeature {
  AdvancedChat = 'advanced_chat',
  UnlimitedLikes = 'unlimited_likes',
  VenueInsights = 'venue_insights',
  ReadReceipts = 'read_receipts',
  PriorityMatching = 'priority_matching',
  IncognitoMode = 'incognito_mode',
  VerifiedBadge = 'verified_badge',
  LifestyleFilters = 'lifestyle_filters',
  KinkDiscovery = 'kink_discovery',
  CuratedDateDiscovery = 'curated_date_discovery',
  VenuePerks = 'venue_perks',
}

export interface MingleCoinAccount {
  balance: number
  lifetimeEarned: number
  lifetimeSpent: number
  tier: PremiumTier
  tierExpiresAt: string | null
  unlockedFeatures: PremiumFeature[]
}

export enum CoinTransactionType {
  Earned = 'earned',
  Spent = 'spent',
  Purchased = 'purchased',
  Reward = 'reward',
  Refund = 'refund',
}

export interface CoinTransaction {
  id: string
  type: CoinTransactionType
  amount: number
  description: string
  createdAt: string
}

const TIER_FEATURES: Record<PremiumTier, PremiumFeature[]> = {
  [PremiumTier.Free]: [],
  [PremiumTier.Starter]: [
    PremiumFeature.AdvancedChat,
    PremiumFeature.VenueInsights,
  ],
  [PremiumTier.Premium]: [
    PremiumFeature.AdvancedChat,
    PremiumFeature.UnlimitedLikes,
    PremiumFeature.VenueInsights,
    PremiumFeature.ReadReceipts,
    PremiumFeature.LifestyleFilters,
    PremiumFeature.CuratedDateDiscovery,
    PremiumFeature.VenuePerks,
  ],
  [PremiumTier.Elite]: [
    PremiumFeature.AdvancedChat,
    PremiumFeature.UnlimitedLikes,
    PremiumFeature.VenueInsights,
    PremiumFeature.ReadReceipts,
    PremiumFeature.PriorityMatching,
    PremiumFeature.IncognitoMode,
    PremiumFeature.VerifiedBadge,
    PremiumFeature.LifestyleFilters,
    PremiumFeature.KinkDiscovery,
    PremiumFeature.CuratedDateDiscovery,
    PremiumFeature.VenuePerks,
  ],
}

const TIER_MONTHLY_COST = {
  [PremiumTier.Free]: 0,
  [PremiumTier.Starter]: 500,
  [PremiumTier.Premium]: 1500,
  [PremiumTier.Elite]: 3500,
}

export function getTierFeatures(tier: PremiumTier): PremiumFeature[] {
  return TIER_FEATURES[tier]
}

export function getFeatureCost(feature: PremiumFeature): number {
  const costs: Record<PremiumFeature, number> = {
    [PremiumFeature.AdvancedChat]: 100,
    [PremiumFeature.UnlimitedLikes]: 200,
    [PremiumFeature.VenueInsights]: 150,
    [PremiumFeature.ReadReceipts]: 100,
    [PremiumFeature.PriorityMatching]: 300,
    [PremiumFeature.IncognitoMode]: 250,
    [PremiumFeature.VerifiedBadge]: 500,
    [PremiumFeature.LifestyleFilters]: 175,
    [PremiumFeature.KinkDiscovery]: 350,
    [PremiumFeature.CuratedDateDiscovery]: 400,
    [PremiumFeature.VenuePerks]: 250,
  }
  return costs[feature]
}

export function getTierMonthlyCost(tier: PremiumTier): number {
  return TIER_MONTHLY_COST[tier]
}

export function hasFeature(account: MingleCoinAccount, feature: PremiumFeature): boolean {
  return account.unlockedFeatures.includes(feature)
}

export function canAccessPremiumChat(account: MingleCoinAccount): boolean {
  return hasFeature(account, PremiumFeature.AdvancedChat)
}

export function canAccessKinkDiscovery(account: MingleCoinAccount): boolean {
  return hasFeature(account, PremiumFeature.KinkDiscovery)
}

export function canAccessVenueInsights(account: MingleCoinAccount): boolean {
  return hasFeature(account, PremiumFeature.VenueInsights)
}

export function canAccessUnlimitedLikes(account: MingleCoinAccount): boolean {
  return hasFeature(account, PremiumFeature.UnlimitedLikes)
}

export function canAccessCuratedDateDiscovery(account: MingleCoinAccount): boolean {
  return hasFeature(account, PremiumFeature.CuratedDateDiscovery)
}

export function canAccessVenuePerks(account: MingleCoinAccount): boolean {
  return hasFeature(account, PremiumFeature.VenuePerks)
}

export function isPremiumStatus(account: MingleCoinAccount): boolean {
  return account.tier === PremiumTier.Premium || account.tier === PremiumTier.Elite
}

export function calculateCoinsToUpgrade(currentTier: PremiumTier, targetTier: PremiumTier): number {
  const tiers = [PremiumTier.Free, PremiumTier.Starter, PremiumTier.Premium, PremiumTier.Elite]
  const currentIdx = tiers.indexOf(currentTier)
  const targetIdx = tiers.indexOf(targetTier)
  if (currentIdx < 0 || targetIdx < 0 || targetIdx <= currentIdx) return 0

  let total = 0
  for (let i = currentIdx + 1; i <= targetIdx; i++) {
    total += TIER_MONTHLY_COST[tiers[i]]
  }
  return total
}

export function createFreeAccount(): MingleCoinAccount {
  return {
    balance: 50,
    lifetimeEarned: 50,
    lifetimeSpent: 0,
    tier: PremiumTier.Free,
    tierExpiresAt: null,
    unlockedFeatures: [],
  }
}

export function deductCoins(account: MingleCoinAccount, amount: number, description: string): CoinTransaction | null {
  if (account.balance < amount) return null
  account.balance -= amount
  account.lifetimeSpent += amount
  return {
    id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    type: CoinTransactionType.Spent,
    amount: -amount,
    description,
    createdAt: new Date().toISOString(),
  }
}

export function earnCoins(account: MingleCoinAccount, amount: number, description: string): CoinTransaction {
  account.balance += amount
  account.lifetimeEarned += amount
  return {
    id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    type: CoinTransactionType.Earned,
    amount,
    description,
    createdAt: new Date().toISOString(),
  }
}

export const MINGLE_COIN_REWARDS = {
  dailyLogin: 10,
  workoutCheckIn: 25,
  profileComplete: 100,
  referral: 200,
  firstMatch: 150,
  venueReview: 30,
  streakDay5: 75,
  streakDay30: 500,
} as const
