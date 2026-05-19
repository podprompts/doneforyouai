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

    // Save paid application
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

    // Send instant notification to admin
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      const approveUrl = `${baseUrl}/api/admin/approve?email=${encodeURIComponent(email)}&tier=${tier}&name=${encodeURIComponent(name)}&secret=${process.env.ADMIN_SECRET}`
      const denyUrl    = `${baseUrl}/api/admin/deny?email=${encodeURIComponent(email)}&secret=${process.env.ADMIN_SECRET}`

      await resend.emails.send({
        from:    'DoneForYouAI <hello@doneforyouai.com>',
        to:      'adriennash@gmail.com',
        subject: `🔔 New expert paid — ${name} (${tier}) — Action required`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;color:#1a1a1a;">
            <div style="background:#e8521a;padding:1.5rem 2rem;">
              <h1 style="color:#fff;margin:0;font-size:1.1rem;font-weight:700;">New Paid Expert Application</h1>
              <p style="color:rgba(255,255,255,0.8);margin:0.35rem 0 0;font-size:0.85rem;">Waiting for your approval</p>
            </div>
            <div style="padding:2rem;background:#f9f9f9;border:1px solid #eee;">
              <table style="width:100%;border-collapse:collapse;margin-bottom:1.5rem;">
                <tr><td style="padding:0.5rem 0;color:#666;font-size:0.85rem;width:130px;">Name</td><td style="padding:0.5rem 0;font-weight:600;font-size:0.95rem;">${name}</td></tr>
                <tr><td style="padding:0.5rem 0;color:#666;font-size:0.85rem;">Email</td><td style="padding:0.5rem 0;"><a href="mailto:${email}" style="color:#e8521a;font-weight:600;">${email}</a></td></tr>
                <tr><td style="padding:0.5rem 0;color:#666;font-size:0.85rem;">Plan</td><td style="padding:0.5rem 0;font-weight:600;text-transform:uppercase;color:#e8521a;">${tier}</td></tr>
                ${website ? `<tr><td style="padding:0.5rem 0;color:#666;font-size:0.85rem;">Website</td><td style="padding:0.5rem 0;"><a href="${website}" style="color:#666;">${website}</a></td></tr>` : ''}
                ${skills  ? `<tr><td style="padding:0.5rem 0;color:#666;font-size:0.85rem;">Skills</td><td style="padding:0.5rem 0;">${skills}</td></tr>` : ''}
              </table>
              ${message ? `<div style="background:#fff;border:1px solid #eee;padding:1rem;margin-bottom:1.5rem;border-radius:4px;"><p style="color:#666;font-size:0.8rem;margin:0 0 0.5rem;text-transform:uppercase;letter-spacing:0.08em;">Message</p><p style="margin:0;line-height:1.7;color:#333;">${message}</p></div>` : ''}
              <hr style="border:none;border-top:1px solid #eee;margin:0 0 1.5rem;" />
              <p style="font-size:0.9rem;font-weight:600;margin:0 0 1rem;color:#1a1a1a;">Take action:</p>
              <div style="display:flex;gap:1rem;flex-wrap:wrap;">
                <a href="${approveUrl}" style="display:inline-block;background:#e8521a;color:#fff;padding:0.85rem 2rem;text-decoration:none;font-weight:700;font-size:0.85rem;border-radius:2px;">
                  ✓ Approve ${name}
                </a>
                <a href="${denyUrl}" style="display:inline-block;background:#fff;color:#666;padding:0.85rem 2rem;text-decoration:none;font-weight:600;font-size:0.85rem;border:1px solid #ddd;border-radius:2px;">
                  ✕ Deny application
                </a>
              </div>
              <p style="margin:1rem 0 0;font-size:0.75rem;color:#999;line-height:1.6;">
                Approving will create their expert profile and send them a magic login link automatically.
                Denying will send them a refund notice email.
              </p>
            </div>
            <div style="padding:1rem 2rem;background:#f0f0f0;font-size:0.75rem;color:#999;text-align:center;">
              <a href="${baseUrl}/admin" style="color:#e8521a;text-decoration:none;">Open Admin Panel</a>
            </div>
          </div>
        `,
      })
    } catch (emailErr) {
      console.error('[Admin notification email error]', emailErr)
    }

    // Redirect expert to apply-success page
    return NextResponse.redirect(`${baseUrl}/apply-success?name=${encodeURIComponent(name)}&tier=${tier}`)
  } catch (err) {
    console.error('[Success handler error]', err)
    return NextResponse.redirect(new URL('/marketplace?error=unknown', req.url))
  }
}