import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function toHandle(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 30)
}

function toAvatar(name: string): string {
  return name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const secret = searchParams.get('secret')
    const email  = searchParams.get('email')
    const tier   = searchParams.get('tier')
    const name   = searchParams.get('name')

    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (!email || !tier || !name) {
      return NextResponse.json({ error: 'Missing params' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doneforyouai.com'

    // 1. Create Supabase Auth user or get existing
    let userId: string
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
    })

    if (authError?.message?.includes('already been registered')) {
      const { data: { users } } = await supabase.auth.admin.listUsers()
      const existing = users.find((u: any) => u.email === email)
      if (!existing) throw new Error('Could not find existing user')
      userId = existing.id
    } else if (authError) {
      throw authError
    } else {
      userId = authData.user.id
    }

    // 2. Unique handle
    const baseHandle = toHandle(name)
    let handle = baseHandle
    let suffix = 1
    while (true) {
      const { data } = await supabase.from('operators').select('id').eq('handle', handle).single()
      if (!data) break
      handle = `${baseHandle}_${suffix++}`
    }

    // 3. Create or update operator row
    const { data: existingOp } = await supabase.from('operators').select('id').eq('email', email).single()

    if (existingOp) {
      await supabase.from('operators').update({
        approved: true, approved_at: new Date().toISOString(), user_id: userId, tier,
      }).eq('email', email)
    } else {
      const { error: opError } = await supabase.from('operators').insert({
        user_id: userId, email, name, handle,
        avatar: toAvatar(name), tier,
        approved: true, approved_at: new Date().toISOString(),
        available: true, featured: false,
        rating: 5.0, reviews: 0,
        profile_views: 0, card_expands: 0, call_bookings: 0,
        messages_sent: 0, views_this_week: 0, expands_this_week: 0,
        title: '', location: '', bio: '', rate: '', rate_type: 'per hour',
        specialty: '', tags: [], deliverables: [],
      })
      if (opError) throw opError
    }

    // 4. Mark application approved
    await supabase.from('operator_applications').update({ status: 'approved' }).eq('email', email)

    // 5. Generate magic link pointing to /login (expert sets up account from there)
    const { data: magicData, error: magicError } = await supabase.auth.admin.generateLink({
      type:    'magiclink',
      email,
      options: { redirectTo: `${baseUrl}/dashboard` },
    })
    if (magicError) throw magicError
    const magicLink = magicData.properties.action_link

    // 6. Send approval email to expert with magic link
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from:    'DoneForYouAI <hello@doneforyouai.com>',
      to:      email,
      subject: `You're approved — access your expert dashboard`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;color:#1a1a1a;">
          <div style="background:#0f0f0e;padding:1.5rem 2rem;">
            <h1 style="color:#f7f5f0;margin:0;font-size:1.1rem;font-weight:600;">DoneForYouAI</h1>
            <p style="color:rgba(247,245,240,0.5);margin:0.35rem 0 0;font-size:0.82rem;">Expert Network</p>
          </div>
          <div style="padding:2rem;background:#f9f9f9;border:1px solid #eee;">
            <h2 style="margin:0 0 0.75rem;font-size:1.4rem;">You're approved, ${name.split(' ')[0]}! 🎉</h2>
            <p style="margin:0 0 1rem;line-height:1.7;color:#444;">
              Your <strong>${tier}</strong> plan is active. Click the button below to access your dashboard and set up your expert profile.
            </p>
            <p style="margin:0 0 1.5rem;line-height:1.7;color:#444;">
              This is a one-click magic link — no password needed. Once you're in, fill out your profile and you'll be live on the marketplace.
            </p>
            <a href="${magicLink}" style="display:inline-block;background:#e8521a;color:#fff;padding:1rem 2.5rem;text-decoration:none;font-weight:700;font-size:0.95rem;margin-bottom:1.5rem;">
              Access My Dashboard →
            </a>
            <p style="margin:0;font-size:0.78rem;color:#999;line-height:1.6;">
              This link expires in 1 hour. Need a new one? Go to
              <a href="${baseUrl}/login" style="color:#e8521a;">${baseUrl}/login</a>
              and enter your email address.
            </p>
          </div>
          <div style="padding:1rem 2rem;background:#f0f0f0;font-size:0.75rem;color:#999;text-align:center;">
            Questions? Reply to this email — we're here to help.
          </div>
        </div>
      `,
    })

    // 7. Return success page to admin
    return new NextResponse(`
      <!DOCTYPE html><html><head><title>Approved</title>
      <style>*{box-sizing:border-box;}body{font-family:sans-serif;background:#0f0f0e;color:#f7f5f0;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:1rem;}</style>
      </head><body>
      <div style="text-align:center;max-width:420px;padding:2rem;border:1px solid rgba(255,255,255,0.09);background:#1c1c1a;">
        <div style="width:56px;height:56px;border-radius:50%;background:rgba(232,82,26,0.15);border:1px solid rgba(232,82,26,0.3);display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;font-size:1.3rem;">✓</div>
        <h2 style="margin:0 0 0.75rem;font-size:1.3rem;">${name} approved!</h2>
        <p style="color:rgba(247,245,240,0.5);line-height:1.7;margin:0 0 1.5rem;">Magic link sent to <strong style="color:#f7f5f0;">${email}</strong>. They can now log in and set up their profile.</p>
        <a href="${baseUrl}/admin" style="display:inline-block;background:#e8521a;color:#fff;padding:0.75rem 1.5rem;text-decoration:none;font-size:0.82rem;font-weight:600;">Go to Admin Panel →</a>
      </div>
      </body></html>
    `, { headers: { 'Content-Type': 'text/html' } })

  } catch (err: any) {
    console.error('[Approve error]', err)
    return NextResponse.json({ error: err.message || 'Approval failed' }, { status: 500 })
  }
}