import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const secret = searchParams.get('secret')
    const email  = searchParams.get('email')

    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doneforyouai.com'

    // Mark application as denied
    await supabase.from('operator_applications').update({ status: 'denied' }).eq('email', email)

    // Send denial email
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from:    'DoneForYouAI <hello@doneforyouai.com>',
      to:      email,
      subject: 'Your DoneForYouAI expert application',
      html: `
        <div style="font-family:sans-serif;max-width:600px;color:#1a1a1a;">
          <div style="background:#0f0f0e;padding:1.5rem 2rem;">
            <h1 style="color:#f7f5f0;margin:0;font-size:1.1rem;font-weight:600;">DoneForYouAI</h1>
          </div>
          <div style="padding:2rem;background:#f9f9f9;border:1px solid #eee;">
            <p style="margin:0 0 1rem;line-height:1.7;color:#444;">
              Thank you for applying to the DoneForYouAI expert network. After reviewing your application, we're unable to approve it at this time.
            </p>
            <p style="margin:0 0 1rem;line-height:1.7;color:#444;">
              A full refund has been issued to your original payment method and should appear within 5–10 business days.
            </p>
            <p style="margin:0;line-height:1.7;color:#444;">
              You're welcome to reapply in the future. If you have questions, reply to this email.
            </p>
          </div>
          <div style="padding:1rem 2rem;background:#f0f0f0;font-size:0.75rem;color:#999;text-align:center;">
            <a href="${baseUrl}" style="color:#e8521a;text-decoration:none;">doneforyouai.com</a>
          </div>
        </div>
      `,
    })

    return new NextResponse(`
      <!DOCTYPE html><html><head><title>Denied</title>
      <style>body{font-family:sans-serif;background:#0f0f0e;color:#f7f5f0;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:1rem;}</style>
      </head><body>
      <div style="text-align:center;max-width:380px;padding:2rem;border:1px solid rgba(255,255,255,0.09);background:#1c1c1a;">
        <h2 style="margin:0 0 0.75rem;">Application denied</h2>
        <p style="color:rgba(247,245,240,0.5);line-height:1.7;margin:0 0 1.5rem;">Denial email sent to ${email}. Remember to issue a refund in Stripe.</p>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin" style="display:inline-block;background:#e8521a;color:#fff;padding:0.75rem 1.5rem;text-decoration:none;font-size:0.82rem;font-weight:600;">Go to Admin Panel →</a>
      </div>
      </body></html>
    `, { headers: { 'Content-Type': 'text/html' } })

  } catch (err: any) {
    console.error('[Deny error]', err)
    return NextResponse.json({ error: err.message || 'Denial failed' }, { status: 500 })
  }
}