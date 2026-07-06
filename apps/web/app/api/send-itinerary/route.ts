import { NextResponse } from 'next/server'

const FROM_EMAIL = 'RickyRansomCompany@gmail.com'

export async function POST(request: Request) {
  try {
    const { email, html, subject } = await request.json()

    if (!email || !html) {
      return NextResponse.json({ error: 'Missing email or html body' }, { status: 400 })
    }

    console.log(`[EMAIL] To: ${email}, Subject: ${subject ?? 'GymMingle Itinerary'}, From: ${FROM_EMAIL}`)

    const smtpHost = process.env.SMTP_HOST
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const nodemailerMod = await Function('return import("nodemailer")')()
        const transporter = nodemailerMod.default.createTransport({
          host: smtpHost,
          port: Number(process.env.SMTP_PORT ?? 587),
          secure: process.env.SMTP_SECURE === 'true',
          auth: { user: smtpUser, pass: smtpPass },
        })

        await transporter.sendMail({
          from: `"GymMingle" <${FROM_EMAIL}>`,
          to: email,
          subject: subject ?? 'Your GymMingle Curated Date Itinerary',
          html,
        })
      } catch (mailErr) {
        console.error('[EMAIL] SMTP send failed (nodemailer not available):', mailErr)
      }
    } else {
      console.log('[EMAIL] SMTP not configured. Email logged but not sent.')
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[EMAIL] Send error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
