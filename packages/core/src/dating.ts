export type RelationshipStatus = 'single' | 'seeing_someone' | 'open_relationship' | 'polyamorous'

export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced' | 'athlete'

export type IndoorOutdoorPref = 'indoor' | 'outdoor' | 'both'

export type Build = 'slender' | 'athletic' | 'muscular' | 'curvy' | 'average'

export type LookingFor = 'training_partner' | 'sparring_partner' | 'romantic_connection' | 'friendship' | 'kink_exploration' | 'lifestyle_partner' | 'accountability_partner' | 'casual_dating'

export interface DatingProfile {
  bio: string | null
  lookingFor: LookingFor[]
  relationshipStatus: RelationshipStatus
  occupation: string
  fitnessLevel: FitnessLevel
  favoriteActivity: string
  indoorOutdoorPref: IndoorOutdoorPref
  age: number
  build: Build
  sports: string[]
  kinkDatePreferences?: string[]
}
