import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-04-22.dahlia' as any })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get('session_id')
    if (!sessionId) return NextResponse.redirect(new URL('/marketplace?error=missing_session', req.url))

    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== 'paid') return NextResponse.redirect(new URL('/marketplace?error=payment_failed', req.url))

    const { name, email, website, skills, message, tier } = session.metadata!
    const stripeCustomerId = session.customer as string
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doneforyouai.com'

    // Save paid application to Supabase
    const { error: appError } = await supabase.from('operator_applications').insert({
      name, email,
      website:            website  || null,
      skills:             skills   || null,
      message:            message  || null,
      tier,
      status:             'paid',
      stripe_session_id:  sessionId,
      stripe_customer_id: stripeCustomerId,
      created_at:         new Date().toISOString(),
    })
    if (appError) console.error('[operator_applications insert error]', appError)

    // Email you with approve link
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      const approveUrl = `${baseUrl}/api/admin/approve?email=${encodeURIComponent(email)}&tier=${tier}&name=${encodeURIComponent(name)}&secret=${process.env.ADMIN_SECRET}`
      await resend.emails.send({
        from: 'DoneForYouAI <hello@doneforyouai.com>',
        to:   'adriennash@gmail.com',
        subject: `New paid expert — ${name} (${tier})`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;color:#1a1a1a;">
            <div style="background:#e8521a;padding:1.5rem 2rem;">
              <h1 style="color:#fff;margin:0;font-size:1.1rem;">New Paid Expert Application</h1>
            </div>
            <div style="padding:2rem;background:#f9f9f9;border:1px solid #eee;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:0.5rem 0;color:#666;font-size:0.85rem;width:140px;">Name</td><td style="padding:0.5rem 0;font-weight:600;">${name}</td></tr>
                <tr><td style="padding:0.5rem 0;color:#666;font-size:0.85rem;">Email</td><td><a href="mailto:${email}" style="color:#e8521a;">${email}</a></td></tr>
                <tr><td style="padding:0.5rem 0;color:#666;font-size:0.85rem;">Tier</td><td style="font-weight:600;text-transform:uppercase;">${tier}</td></tr>
                ${website ? `<tr><td style="padding:0.5rem 0;color:#666;font-size:0.85rem;">Website</td><td>${website}</td></tr>` : ''}
                ${skills  ? `<tr><td style="padding:0.5rem 0;color:#666;font-size:0.85rem;">Skills</td><td>${skills}</td></tr>`  : ''}
              </table>
              ${message ? `<hr style="border:none;border-top:1px solid #eee;margin:1.5rem 0;"/><p style="color:#666;font-size:0.85rem;margin:0 0 0.5rem;">Message</p><p style="margin:0;line-height:1.7;">${message}</p>` : ''}
              <hr style="border:none;border-top:1px solid #eee;margin:1.5rem 0;"/>
              <p style="font-size:0.9rem;font-weight:600;margin:0 0 1rem;">Ready to approve?</p>
              <a href="${approveUrl}" style="display:inline-block;background:#e8521a;color:#fff;padding:0.85rem 2rem;text-decoration:none;font-weight:600;font-size:0.85rem;">
                Approve ${name} →
              </a>
              <p style="margin:1rem 0 0;font-size:0.75rem;color:#999;">Clicking approve will create their operator profile and send them a login link.</p>
            </div>
          </div>
        `,
      })
    } catch (emailErr) {
      console.error('[Resend error]', emailErr)
    }

    return NextResponse.redirect(`${baseUrl}/apply-success?name=${encodeURIComponent(name)}&tier=${tier}`)
  } catch (err) {
    console.error('[Success handler error]', err)
    return NextResponse.redirect(new URL('/marketplace?error=unknown', req.url))
  }
}