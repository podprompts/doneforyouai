import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, company, service, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // ── Lead notification to you ──
    await resend.emails.send({
      from: 'DoneForYouAI <hello@doneforyouai.com>',
      to: 'adriennash@gmail.com',
      subject: `New inquiry from ${name}${company ? ` · ${company}` : ''}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
          <div style="background:#e8521a;padding:1.5rem 2rem;">
            <h1 style="color:#fff;margin:0;font-size:1.2rem;font-weight:600;">New Contact Submission</h1>
            <p style="color:rgba(255,255,255,0.75);margin:0.25rem 0 0;font-size:0.85rem;">doneforyouai.com</p>
          </div>
          <div style="padding:2rem;background:#f9f9f9;border:1px solid #eee;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:0.5rem 0;color:#666;font-size:0.85rem;width:120px;">Name</td><td style="padding:0.5rem 0;font-weight:600;">${name}</td></tr>
              <tr><td style="padding:0.5rem 0;color:#666;font-size:0.85rem;">Email</td><td style="padding:0.5rem 0;"><a href="mailto:${email}" style="color:#e8521a;">${email}</a></td></tr>
              ${company ? `<tr><td style="padding:0.5rem 0;color:#666;font-size:0.85rem;">Company</td><td style="padding:0.5rem 0;">${company}</td></tr>` : ''}
              ${service ? `<tr><td style="padding:0.5rem 0;color:#666;font-size:0.85rem;">Service</td><td style="padding:0.5rem 0;">${service}</td></tr>` : ''}
            </table>
            <hr style="border:none;border-top:1px solid #eee;margin:1.5rem 0;" />
            <p style="color:#666;font-size:0.85rem;margin:0 0 0.5rem;">Message</p>
            <p style="margin:0;line-height:1.7;">${message.replace(/\n/g, '<br/>')}</p>
          </div>
          <div style="padding:1rem 2rem;background:#f0f0f0;font-size:0.75rem;color:#999;text-align:center;">
            Reply directly to this email to respond to ${name}.
          </div>
        </div>
      `,
      reply_to: email,
    })

    // ── Auto-reply to sender ──
    await resend.emails.send({
      from: 'DoneForYouAI <hello@doneforyouai.com>',
      to: email,
      subject: `We received your message, ${name.split(' ')[0]}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
          <div style="background:#0f0f0e;padding:1.5rem 2rem;">
            <h1 style="color:#f7f5f0;margin:0;font-size:1.1rem;font-weight:600;">DoneForYouAI</h1>
          </div>
          <div style="padding:2rem;background:#f9f9f9;border:1px solid #eee;">
            <p style="margin:0 0 1rem;">Hi ${name.split(' ')[0]},</p>
            <p style="margin:0 0 1rem;line-height:1.7;color:#444;">Thanks for reaching out. We've received your message and will get back to you within 24 hours.</p>
            <p style="margin:0;line-height:1.7;color:#444;">In the meantime, feel free to reply to this email with any additional details.</p>
          </div>
          <div style="padding:1.5rem 2rem;background:#f0f0f0;font-size:0.8rem;color:#666;text-align:center;">
            <p style="margin:0;">— The DoneForYouAI team</p>
            <p style="margin:0.5rem 0 0;"><a href="https://doneforyouai.com" style="color:#e8521a;text-decoration:none;">doneforyouai.com</a></p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Contact API Error]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}