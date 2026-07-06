-- GymMingle Premium Economy Migration
-- Adds MingleCoin balance, premium tier gating, and feature flags to profiles.

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS mingle_coins INTEGER NOT NULL DEFAULT 50,
  ADD COLUMN IF NOT EXISTS lifetime_coins_earned INTEGER NOT NULL DEFAULT 50,
  ADD COLUMN IF NOT EXISTS lifetime_coins_spent INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS premium_tier TEXT NOT NULL DEFAULT 'free'
    CHECK (premium_tier IN ('free', 'starter', 'premium', 'elite')),
  ADD COLUMN IF NOT EXISTS tier_expires_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS premium_features TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS kink_discovery_enabled BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS lifestyle_tags TEXT[] DEFAULT '{}';

COMMENT ON COLUMN profiles.mingle_coins IS 'Current spendable MingleCoin balance';
COMMENT ON COLUMN profiles.lifetime_coins_earned IS 'Total coins earned all-time';
COMMENT ON COLUMN profiles.lifetime_coins_spent IS 'Total coins spent all-time';
COMMENT ON COLUMN profiles.premium_tier IS 'Current subscription tier: free, starter, premium, elite';
COMMENT ON COLUMN profiles.tier_expires_at IS 'When the current premium tier expires (null for free tier)';
COMMENT ON COLUMN profiles.premium_features IS 'Array of unlocked premium feature keys';
COMMENT ON COLUMN profiles.kink_discovery_enabled IS 'Opt-in to kink-aware discovery and profile tags';
COMMENT ON COLUMN profiles.lifestyle_tags IS 'Fitness and lifestyle tags for matching';

-- Index for querying premium users
CREATE INDEX IF NOT EXISTS idx_profiles_premium_tier ON profiles (premium_tier);

-- Index for kink discovery queries
CREATE INDEX IF NOT EXISTS idx_profiles_kink_discovery ON profiles (kink_discovery_enabled)
  WHERE kink_discovery_enabled = true;

-- Seed demo profiles for development
INSERT INTO profiles (id, name, bio, mingle_coins, lifetime_coins_earned, lifetime_coins_spent, premium_tier, premium_features, kink_discovery_enabled, lifestyle_tags)
VALUES
  (
    'demo_marcus_001',
    'Marcus',
    'Competitive Muay Thai fighter and strength coach. I train at dawn, meal prep by noon, and I''m looking for someone who can keep up — in the gym and beyond. Kink-aware, poly-positive, no judgment zone.',
    320, 870, 550, 'starter',
    ARRAY['advanced_chat', 'venue_insights'],
    true,
    ARRAY['martial-arts', 'strength', 'combat-sports']
  ),
  (
    'demo_elena_001',
    'Elena',
    'Yoga instructor and wellness curator. I believe movement is medicine and connection is the practice. Switch, kink-friendly, looking for intentional chemistry over small talk.',
    640, 2100, 1460, 'premium',
    ARRAY['advanced_chat', 'unlimited_likes', 'venue_insights', 'read_receipts', 'lifestyle_filters'],
    true,
    ARRAY['yoga', 'mindfulness', 'wellness']
  ),
  (
    'demo_david_001',
    'David',
    'Division I swimmer turned open-water enthusiast. New to the kink scene but eager to explore with the right guide. Fitness is my therapy, vulnerability is my edge.',
    150, 420, 270, 'free',
    ARRAY[]::TEXT[],
    true,
    ARRAY['swimming', 'cardio', 'functional']
  ),
  (
    'demo_sarah_001',
    'Sarah',
    'CrossFit competitor by morning, lifestyle dominatrix by night. I lead in the box and in the bedroom. If you can handle burpees and obedience, we might have something.',
    1280, 4500, 3220, 'elite',
    ARRAY['advanced_chat', 'unlimited_likes', 'venue_insights', 'read_receipts', 'priority_matching', 'incognito_mode', 'verified_badge', 'lifestyle_filters', 'kink_discovery'],
    true,
    ARRAY['crossfit', 'strength', 'functional']
  );
