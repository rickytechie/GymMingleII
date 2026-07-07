import { NextResponse } from 'next/server'
import { createClient } from '../../../src/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { name, age, bio, fitnessStyle, fitnessLevel, favoriteActivity, avatarDataUrl, lookingFor, relationshipStatus } = body

    const { error } = await supabase.from('user_profiles').upsert({
      id: session.user.id,
      name,
      age: parseInt(age),
      bio,
      fitness_style: fitnessStyle,
      fitness_level: fitnessLevel,
      favorite_activity: favoriteActivity,
      avatar_url: avatarDataUrl || null,
      looking_for: lookingFor || [],
      relationship_status: relationshipStatus || 'single',
      updated_at: new Date().toISOString(),
    }, { onConflict: 'id' })

    if (error) {
      console.error('[ONBOARDING] Upsert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[ONBOARDING] Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
