CREATE TABLE IF NOT EXISTS venues (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  rating DOUBLE PRECISION DEFAULT 0,
  user_rating_count INTEGER DEFAULT 0,
  photo_names TEXT[] DEFAULT '{}',
  types TEXT[] DEFAULT '{}',
  region_id TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Fitness',
  google_place_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_venues_region_id ON venues(region_id);
CREATE INDEX IF NOT EXISTS idx_venues_category ON venues(category);
CREATE INDEX IF NOT EXISTS idx_venues_rating ON venues(rating DESC);

ALTER TABLE venues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Venues are publicly readable"
  ON venues FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage venues"
  ON venues FOR ALL
  USING (auth.role() = 'service_role');
