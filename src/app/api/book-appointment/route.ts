import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('Booking payload received:', JSON.stringify(body))
    const { name, email, phone, business_description, aria_interpretation, start_time } = body

    if (!name || !email || !phone || !business_description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const firstName = name.split(' ')[0]

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/calendar'],
    })

    const calendar = google.calendar({ version: 'v3', auth })

    const start = start_time ? new Date(start_time) : new Date()
    const end = new Date(start.getTime() + 30 * 60 * 1000)

    const startLabel = start.toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'America/Phoenix',
      timeZoneName: 'short',
    })

    await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID!,
      requestBody: {
        summary: `Strategy Call with ${name}`,
        description: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nBusiness: ${business_description}\n\nAria's notes: ${aria_interpretation}`,
        start: { dateTime: start.toISOString(), timeZone: 'America/Phoenix' },
        end: { dateTime: end.toISOString(), timeZone: 'America/Phoenix' },
      },
    })

    await resend.emails.send({
      from: 'DoneForYouAI.com <adrien@doneforyouai.com>',
      to: 'adrien1@gmail.com',
      subject: `New Strategy Call Booked — ${name}`,
      html: `
        <h2>New Booking from Aria</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Time:</strong> ${startLabel}</p>
        <p><strong>Business:</strong> ${business_description}</p>
        <p><strong>Aria's interpretation:</strong> ${aria_interpretation}</p>
      `,
    })

    await resend.emails.send({
      from: 'DoneForYouAI.com <adrien@doneforyouai.com>',
      to: email,
      subject: 'Your Strategy Call is Confirmed — Done For You AI',
      html: `
        <h2>Hi ${firstName},</h2>
        <p>Great news — your free 30-minute strategy call with Done For You AI is confirmed!</p>
        <p><strong>Your call is scheduled for: ${startLabel}</strong></p>
        <p>We're excited to learn about your business and map out exactly where AI can move the needle for you.</p>
        <br/>
        <p>Talk soon,<br/>DFYAI & Team<br/>doneforyouai.com</p>
      `,
    })

    return NextResponse.json({ success: true, scheduled_time: startLabel })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Booking failed' }, { status: 500 })
  }
}