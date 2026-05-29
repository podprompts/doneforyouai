import { NextResponse } from 'next/server'
import { google } from 'googleapis'

export const dynamic = 'force-dynamic'
export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/calendar'],
    })

    const calendar = google.calendar({ version: 'v3', auth })

    // Build candidate slots for next 5 business days
    const candidates: { start: Date; end: Date }[] = []
    const now = new Date()
    let day = new Date(now)

    while (candidates.length < 15) {
      day = new Date(day.getTime() + 24 * 60 * 60 * 1000)
      const dayOfWeek = day.getDay()
      if (dayOfWeek === 0 || dayOfWeek === 6) continue

      for (const hour of [9, 11, 14]) {
        const start = new Date(day)
        start.setUTCHours(hour + 7, 0, 0, 0) // convert MST to UTC
        const end = new Date(start.getTime() + 30 * 60 * 1000)
        candidates.push({ start, end })
      }
    }

    // Single batched freebusy query
    const freeBusy = await calendar.freebusy.query({
      requestBody: {
        timeMin: candidates[0].start.toISOString(),
        timeMax: candidates[candidates.length - 1].end.toISOString(),
        items: [{ id: process.env.GOOGLE_CALENDAR_ID! }],
      },
    })

    const busyPeriods = freeBusy.data.calendars?.[process.env.GOOGLE_CALENDAR_ID!]?.busy ?? []

    // Filter out busy slots
    const slots = []
    for (const candidate of candidates) {
      const isBusy = busyPeriods.some((busy) => {
        const busyStart = new Date(busy.start!).getTime()
        const busyEnd = new Date(busy.end!).getTime()
        return candidate.start.getTime() < busyEnd && candidate.end.getTime() > busyStart
      })

      if (!isBusy) {
        const label = candidate.start.toLocaleString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          timeZone: 'America/Phoenix',
          timeZoneName: 'short',
        })
        slots.push({
          start: candidate.start.toISOString(),
          end: candidate.end.toISOString(),
          label,
        })
        if (slots.length >= 3) break
      }
    }

    return NextResponse.json({ slots })
  } catch (error) {
    console.error('Calendar availability error:', error)
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 })
  }
}