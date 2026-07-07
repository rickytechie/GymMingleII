import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { recipientPhone, location, userName, expiresInMinutes = 30 } = await request.json()

    if (!recipientPhone || !location) {
      return NextResponse.json({ error: 'Missing recipient phone or location' }, { status: 400 })
    }

    const shareId = `share_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    const mapLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
    const expiresAt = new Date(Date.now() + expiresInMinutes * 60000).toISOString()

    console.log('[LOCATION_SHARE] Share created:', {
      shareId,
      from: userName || 'Anonymous',
      to: recipientPhone,
      mapLink,
      expiresAt,
    })

    return NextResponse.json({
      success: true,
      shareId,
      mapLink,
      expiresAt,
    })
  } catch (err) {
    console.error('[LOCATION_SHARE] Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
