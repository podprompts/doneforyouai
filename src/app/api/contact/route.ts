import { NextResponse } from 'next/server'

// ─────────────────────────────────────────────────────────────────
// CONTACT API ROUTE
//
// To wire up email delivery (Resend):
//   1. npm install resend
//   2. Add RESEND_API_KEY to .env.local
//   3. Add CONTACT_TO_EMAIL to .env.local (where you want leads sent)
//   4. Uncomment the Resend block below
// ─────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const { name, email, company, service, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // ── RESEND EMAIL DELIVERY (uncomment when ready) ──
    //
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    //
    // await resend.emails.send({
    //   from: 'DoneForYouAI <noreply@doneforyouai.com>',
    //   to: process.env.CONTACT_TO_EMAIL!,
    //   subject: `New inquiry from ${name}${company ? ` · ${company}` : ''}`,
    //   html: `
    //     <h2>New Contact Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
    //     ${service ? `<p><strong>Service Interest:</strong> ${service}</p>` : ''}
    //     <p><strong>Message:</strong></p>
    //     <p>${message.replace(/\n/g, '<br/>')}</p>
    //   `,
    // })
    //
    // ── AUTO-REPLY TO SENDER ──
    //
    // await resend.emails.send({
    //   from: 'DoneForYouAI <hello@doneforyouai.com>',
    //   to: email,
    //   subject: `We received your message, ${name.split(' ')[0]}`,
    //   html: `
    //     <p>Hi ${name.split(' ')[0]},</p>
    //     <p>Thanks for reaching out. We've received your message and will get back to you within 24 hours.</p>
    //     <p>— The DoneForYouAI team</p>
    //   `,
    // })

    // Log to console for now (remove in production)
    console.log('[Contact Form Submission]', { name, email, company, service, message })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Contact API Error]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
