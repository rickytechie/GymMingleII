import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

async function main() {
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

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

  const CITIES = [
    'nyc', 'boston', 'miami', 'la', 'chicago', 'sf', 'seattle', 'denver', 'austin', 'portland',
    'detroit', 'atlanta', 'philadelphia', 'washington_dc', 'nashville', 'new_orleans', 'orlando',
    'san_diego', 'phoenix', 'las_vegas', 'houston', 'dallas', 'minneapolis', 'baltimore',
    'tampa', 'charlotte', 'raleigh', 'indianapolis', 'columbus', 'kansas_city', 'st_louis',
    'milwaukee', 'cincinnati', 'cleveland', 'pittsburgh', 'sacramento', 'san_jose', 'salt_lake_city',
    'albuquerque', 'tucson', 'buffalo', 'rochester', 'syracuse', 'albany', 'richmond',
    'virginia_beach', 'grand_rapids', 'jacksonville', 'san_antonio', 'el_paso',
  ]

  const TIERS = ['Free', 'Free', 'Free', 'Free', 'Starter', 'Starter', 'Momentum', 'Peak', 'Apex']
  const OCCUPATIONS = ['Personal Trainer', 'Yoga Instructor', 'Software Engineer', 'Nurse', 'Teacher', 'Architect', 'Graphic Designer', 'Chef', 'Photographer', 'Dancer', 'Pilates Coach', 'CrossFit Coach', 'Physical Therapist', 'Nutritionist', 'Artist', 'Musician', 'Doctor', 'Lawyer', 'Entrepreneur', 'Barber', 'Massage Therapist', 'Marketing Manager', 'Data Analyst', 'Fashion Designer', 'Flight Attendant', 'Journalist', 'UX Designer', 'Writer']
  const ACTIVITIES = ['Hot yoga', 'CrossFit', 'Boxing', 'Running', 'Weightlifting', 'Pilates', 'Swimming', 'Cycling', 'Bouldering', 'Hiking', 'Dance cardio', 'Muay Thai', 'BJJ', 'Barre', 'Powerlifting', 'Calisthenics', 'Rowing', 'Kickboxing', 'Zumba', 'Spinning']
  const SPORTS_OPTIONS = [['Yoga','Running','Swimming'],['CrossFit','Weightlifting','Rowing'],['Boxing','Muay Thai','BJJ'],['Pilates','Barre','Dance'],['Hiking','Cycling','Running'],['Swimming','Surfing','Yoga'],['Bouldering','Yoga','Hiking'],['Powerlifting','Strongman','Weightlifting'],['Kickboxing','Boxing','Muay Thai'],['Spinning','Running','Swimming']]
  const BIOS = ['Fitness is my therapy.','Hot yoga enthusiast, cold brew connoisseur.','New to the city, looking for a training partner.','Marathon runner by day, foodie by night.','CrossFit competitor, looking to connect.','Yoga instructor seeking mindfulness and movement.','I meal prep on Sundays and crush PRs on Mondays.','Looking for a gym buddy who becomes a life buddy.','Bodybuilder with a soft spot for indie films.','I run on coffee, deadlifts, and conversation.','Fitness model, food lover, adventure seeker.','BJJ black belt. Respect on and off the mats.','Swimmer, hiker, dog lover.','Personal trainer by profession, motivator by nature.','Let\'s climb mountains — literal and metaphorical.']
  const LOOKING_FOR = [['training_partner','friendship'],['romantic_connection','casual_dating'],['training_partner','romantic_connection'],['accountability_partner','friendship'],['lifestyle_partner','romantic_connection'],['kink_exploration','romantic_connection'],['training_partner','accountability_partner'],['friendship','casual_dating']]

  function pick<T>(arr: readonly T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  function randInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const profiles: any[] = []
  let idx = 0

  // 500 female
  for (let i = 0; i < 500; i++) {
    const name = pick(FEMALE_NAMES)
    const city = CITIES[idx % CITIES.length]
    const tier = pick(TIERS)
    const age = randInt(21, 42)
    const balance = tier === 'Free' ? randInt(10, 200) : tier === 'Starter' ? randInt(200, 800) : tier === 'Momentum' ? randInt(500, 2000) : tier === 'Peak' ? randInt(1500, 5000) : randInt(4000, 15000)
    const features = tier === 'Free' ? [] : tier === 'Starter' ? ['advanced_chat','venue_insights'] : tier === 'Momentum' ? ['advanced_chat','unlimited_likes','venue_insights','lifestyle_filters','curated_date_discovery','venue_perks'] : tier === 'Peak' ? ['advanced_chat','unlimited_likes','venue_insights','read_receipts','priority_matching','incognito_mode','verified_badge','lifestyle_filters','kink_discovery','curated_date_discovery','venue_perks'] : ['advanced_chat','unlimited_likes','venue_insights','read_receipts','priority_matching','incognito_mode','verified_badge','lifestyle_filters','kink_discovery','curated_date_discovery','venue_perks','concierge_booking','one_on_one_coaching','vip_venue_entry']

    profiles.push({
      id: `seed_f_${i}`,
      name,
      bio: pick(BIOS),
      avatar_url: `https://api.dicebear.com/9.x/avataaars/svg?seed=seed_f_${i}`,
      age,
      city,
      fitness_style: pick(['Yoga / Pilates', 'Dance / Cardio', 'CrossFit / HIIT', 'Strength Training', 'Running / Cardio', 'Swimming', 'Barre / Pilates']),
      minglecoin_tier: tier,
      minglecoin_balance: balance,
      premium_features: features,
      looking_for: pick(LOOKING_FOR),
      relationship_status: pick(['single', 'single', 'single', 'seeing_someone', 'open_relationship']),
      occupation: pick(OCCUPATIONS),
      fitness_level: pick(['beginner', 'intermediate', 'advanced', 'athlete']),
      favorite_activity: pick(ACTIVITIES),
      indoor_outdoor_pref: pick(['indoor', 'outdoor', 'both']),
      build: pick(['slender', 'athletic', 'muscular', 'curvy', 'average']),
      sports: pick(SPORTS_OPTIONS),
      kink_date_preferences: i % 5 === 0 ? pick([['Rope bondage', 'Sensory play'], ['Impact play', 'Leather'], ['Dungeon nights', 'Power exchange'], ['Kink exploration']]) : [],
    })
    idx++
  }

  // 200 male
  for (let i = 0; i < 200; i++) {
    const name = pick(MALE_NAMES)
    const city = CITIES[idx % CITIES.length]
    const tier = pick(TIERS)
    const age = randInt(22, 45)
    const balance = tier === 'Free' ? randInt(10, 200) : tier === 'Starter' ? randInt(200, 800) : tier === 'Momentum' ? randInt(500, 2000) : tier === 'Peak' ? randInt(1500, 5000) : randInt(4000, 15000)
    const features = tier === 'Free' ? [] : tier === 'Starter' ? ['advanced_chat','venue_insights'] : tier === 'Momentum' ? ['advanced_chat','unlimited_likes','venue_insights','lifestyle_filters','curated_date_discovery','venue_perks'] : tier === 'Peak' ? ['advanced_chat','unlimited_likes','venue_insights','read_receipts','priority_matching','incognito_mode','verified_badge','lifestyle_filters','kink_discovery','curated_date_discovery','venue_perks'] : ['advanced_chat','unlimited_likes','venue_insights','read_receipts','priority_matching','incognito_mode','verified_badge','lifestyle_filters','kink_discovery','curated_date_discovery','venue_perks','concierge_booking','one_on_one_coaching','vip_venue_entry']

    profiles.push({
      id: `seed_m_${i}`,
      name,
      bio: pick(BIOS),
      avatar_url: `https://api.dicebear.com/9.x/avataaars/svg?seed=seed_m_${i}`,
      age,
      city,
      fitness_style: pick(['Martial Arts / BJJ', 'Strength / Powerlifting', 'CrossFit / HIIT', 'Running / Cardio', 'Bodybuilding', 'Calisthenics', 'Boxing']),
      minglecoin_tier: tier,
      minglecoin_balance: balance,
      premium_features: features,
      looking_for: pick(LOOKING_FOR),
      relationship_status: pick(['single', 'single', 'single', 'seeing_someone', 'open_relationship']),
      occupation: pick(OCCUPATIONS),
      fitness_level: pick(['beginner', 'intermediate', 'advanced', 'athlete']),
      favorite_activity: pick(ACTIVITIES),
      indoor_outdoor_pref: pick(['indoor', 'outdoor', 'both']),
      build: pick(['slender', 'athletic', 'muscular', 'curvy', 'average']),
      sports: pick(SPORTS_OPTIONS),
      kink_date_preferences: i % 5 === 0 ? pick([['Rope bondage', 'Sensory play'], ['Impact play', 'Leather'], ['Dungeon nights', 'Power exchange'], ['Kink exploration']]) : [],
    })
    idx++
  }

  console.log(`Generated ${profiles.length} profiles`)

  // Upsert in batches of 50
  const BATCH_SIZE = 50
  let upserted = 0
  for (let i = 0; i < profiles.length; i += BATCH_SIZE) {
    const batch = profiles.slice(i, i + BATCH_SIZE)
    const { error, count } = await supabase
      .from('community_profiles')
      .upsert(batch, { onConflict: 'id' })

    if (error) {
      console.error(`Batch ${i / BATCH_SIZE} failed:`, error.message)
    } else {
      upserted += batch.length
      console.log(`Upserted ${upserted}/${profiles.length} profiles`)
    }
  }

  console.log(`Seed complete. ${upserted} profiles upserted to Supabase.`)
}

main().catch((err) => {
  console.error('Seed script failed:', err)
  process.exit(1)
})
