'use client'

import { PremiumTier, getTierMonthlyCost, getTierFeatures } from '@gymmingle/core'

const TIER_USD: Record<PremiumTier, number> = {
  [PremiumTier.FREE]: 0,
  [PremiumTier.STARTER]: 5,
  [PremiumTier.MOMENTUM]: 15,
  [PremiumTier.PEAK]: 35,
  [PremiumTier.APEX]: 75,
}

const TIER_LABELS: Record<PremiumTier, string> = {
  [PremiumTier.FREE]: 'Free',
  [PremiumTier.STARTER]: 'Starter',
  [PremiumTier.MOMENTUM]: 'Momentum',
  [PremiumTier.PEAK]: 'Peak',
  [PremiumTier.APEX]: 'Apex',
}

const TIER_COLORS: Record<PremiumTier, string> = {
  [PremiumTier.FREE]: 'bg-slate-100 text-slate-400 border-slate-200',
  [PremiumTier.STARTER]: 'bg-slate-200 text-slate-700 border-slate-300',
  [PremiumTier.MOMENTUM]: 'bg-[#CCFF00] text-slate-900 border-[#CCFF00]',
  [PremiumTier.PEAK]: 'bg-slate-900 text-[#CCFF00] border-slate-800',
  [PremiumTier.APEX]: 'bg-purple-900 text-[#CCFF00] border-purple-800',
}

const TIER_CARD_BG: Record<PremiumTier, string> = {
  [PremiumTier.FREE]: 'bg-white',
  [PremiumTier.STARTER]: 'bg-white',
  [PremiumTier.MOMENTUM]: 'bg-white',
  [PremiumTier.PEAK]: 'bg-white',
  [PremiumTier.APEX]: 'bg-white',
}

const TIER_HIGHLIGHT: Record<PremiumTier, string> = {
  [PremiumTier.FREE]: '',
  [PremiumTier.STARTER]: '',
  [PremiumTier.MOMENTUM]: 'ring-2 ring-[#CCFF00]',
  [PremiumTier.PEAK]: 'ring-2 ring-slate-900',
  [PremiumTier.APEX]: 'ring-2 ring-purple-500',
}

const FEATURE_LABELS: Record<string, string> = {
  advanced_chat: 'Advanced chat',
  unlimited_likes: 'Unlimited likes',
  venue_insights: 'Venue insights',
  read_receipts: 'Read receipts',
  priority_matching: 'Priority matching',
  incognito_mode: 'Incognito mode',
  verified_badge: 'Verified badge',
  lifestyle_filters: 'Lifestyle filters',
  kink_discovery: 'Kink discovery',
  curated_date_discovery: 'Curated date discovery',
  venue_perks: 'Venue perks',
  expanded_history: 'Expanded history',
  basic_templates: 'Basic templates',
  analytics: 'Analytics',
  exclusive_local_events: 'Exclusive local events',
  partner_gym_access: 'Partner gym access',
  priority_support: 'Priority support',
  high_coin_earning: 'High coin earning',
  concierge_booking: 'Concierge booking',
  one_on_one_coaching: '1-on-1 coaching',
  vip_venue_entry: 'VIP venue entry',
}

export function PricingCards() {
  const tiers = [
    PremiumTier.FREE,
    PremiumTier.STARTER,
    PremiumTier.MOMENTUM,
    PremiumTier.PEAK,
    PremiumTier.APEX,
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
      {tiers.map((tier) => {
        const usd = TIER_USD[tier]
        const mc = getTierMonthlyCost(tier)
        const features = getTierFeatures(tier)

        return (
          <div
            key={tier}
            className={`rounded-[2rem] border p-6 shadow-sm ${TIER_CARD_BG[tier]} ${TIER_HIGHLIGHT[tier]} border-slate-200`}
          >
            <h3 className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${TIER_COLORS[tier]}`}>
              {TIER_LABELS[tier]}
            </h3>
            <div className="mt-4">
              <span className="text-3xl font-black text-slate-900">${usd}</span>
              <span className="text-sm text-slate-500">/month</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              {mc.toLocaleString()} MingleCoins/mo
            </p>
            <ul className="mt-6 space-y-2">
              {features.length === 0 ? (
                <li className="text-sm text-slate-400">Social feed only</li>
              ) : (
                features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#CCFF00]" />
                    {FEATURE_LABELS[f] ?? f}
                  </li>
                ))
              )}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default PricingCards
