import { NextResponse } from 'next/server'

const TWILIO_ENABLED = Boolean(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN)

export async function POST(request: Request) {
  try {
    const { userName, userPhone, emergencyContactPhone, location } = await request.json()

    if (!TWILIO_ENABLED) {
      console.log('[PANIC] Emergency alert triggered:', { userName, userPhone, emergencyContactPhone, location })
      return NextResponse.json({ success: true, mode: 'logged' })
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER

    const message = `GYMMINGLE EMERGENCY ALERT from ${userName || 'a user'}!
Location: ${location?.latitude}, ${location?.longitude}
https://www.google.com/maps?q=${location?.latitude},${location?.longitude}
Please check on them immediately.`

    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`
    const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64')

    const response = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        To: emergencyContactPhone || userPhone,
        From: twilioPhone || '',
        Body: message,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[PANIC] Twilio error:', errorText)
      return NextResponse.json({ error: 'Failed to send emergency alert' }, { status: 500 })
    }

    return NextResponse.json({ success: true, mode: 'twilio_sent' })
  } catch (err) {
    console.error('[PANIC] Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
