CREATE TABLE IF NOT EXISTS community_profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  age INTEGER NOT NULL,
  city TEXT NOT NULL,
  fitness_style TEXT NOT NULL DEFAULT '',
  minglecoin_tier TEXT NOT NULL DEFAULT 'Free',
  minglecoin_balance INTEGER NOT NULL DEFAULT 50,
  premium_features TEXT[] DEFAULT '{}',
  looking_for TEXT[] DEFAULT '{}',
  relationship_status TEXT DEFAULT 'single',
  occupation TEXT DEFAULT '',
  fitness_level TEXT DEFAULT 'intermediate',
  favorite_activity TEXT DEFAULT '',
  indoor_outdoor_pref TEXT DEFAULT 'both',
  build TEXT DEFAULT 'average',
  sports TEXT[] DEFAULT '{}',
  kink_date_preferences TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_community_profiles_city ON community_profiles(city);
CREATE INDEX IF NOT EXISTS idx_community_profiles_tier ON community_profiles(minglecoin_tier);

ALTER TABLE community_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are publicly readable"
  ON community_profiles FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage profiles"
  ON community_profiles FOR ALL
  USING (auth.role() = 'service_role');
