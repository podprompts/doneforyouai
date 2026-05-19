import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Helper to generate a handle from name
function toHandle(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 30)
}

// Helper to get initials for avatar
function toAvatar(name: string): string {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const secret = searchParams.get('secret')
    const email  = searchParams.get('email')
    const tier   = searchParams.get('tier')
    const name   = searchParams.get('name')

    // Guard with secret
    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (!email || !tier || !name) {
      return NextResponse.json({ error: 'Missing params' }, { status: 400 })
    }

    // 1. Create Supabase Auth user (or get existing)
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      email_confirm: true, // skip email confirmation — we send magic link separately
    })

    let userId: string

    if (authError && authError.message.includes('already been registered')) {
      // User already exists — look them up
      const { data: { users }, error: listErr } = await supabase.auth.admin.listUsers()
      if (listErr) throw listErr
      const existing = users.find(u => u.email === email)
      if (!existing) throw new Error('Could not find existing user')
      userId = existing.id
    } else if (authError) {
      throw authError
    } else {
      userId = authData.user.id
    }

    // 2. Generate a unique handle
    const baseHandle = toHandle(name)
    let handle = baseHandle
    let suffix = 1
    while (true) {
      const { data } = await supabase.from('operators').select('id').eq('handle', handle).single()
      if (!data) break
      handle = `${baseHandle}_${suffix++}`
    }

    // 3. Create operator row (or update if exists by email)
    const { data: existingOp } = await supabase.from('operators').select('id').eq('email', email).single()

    if (existingOp) {
      // Update existing operator
      await supabase.from('operators').update({
        approved:    true,
        approved_at: new Date().toISOString(),
        user_id:     userId,
        tier,
      }).eq('email', email)
    } else {
      // Create new operator row
      const { error: opError } = await supabase.from('operators').insert({
        user_id:     userId,
        email,
        name,
        handle,
        avatar:      toAvatar(name),
        tier,
        approved:    true,
        approved_at: new Date().toISOString(),
        available:   true,
        featured:    false,
        rating:      5.0,
        reviews:     0,
        profile_views:    0,
        card_expands:     0,
        call_bookings:    0,
        messages_sent:    0,
        views_this_week:  0,
        expands_this_week: 0,
        // Defaults they'll fill in on dashboard
        title:       '',
        location:    '',
        bio:         '',
        rate:        '',
        rate_type:   'per hour',
        specialty:   '',
        tags:        [],
        deliverables: [],
      })
      if (opError) throw opError
    }

    // 4. Mark application as approved
    await supabase.from('operator_applications')
      .update({ status: 'approved' })
      .eq('email', email)

    // 5. Send magic link to expert via Resend
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doneforyouai.com'

    const { data: magicLinkData, error: magicError } = await supabase.auth.admin.generateLink({
      type:       'magiclink',
      email,
      options:    { redirectTo: `${baseUrl}/dashboard` },
    })
    if (magicError) throw magicError

    const magicLink = magicLinkData.properties.action_link

    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'DoneForYouAI <hello@doneforyouai.com>',
      to:   email,
      subject: `You're approved — set up your expert profile`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;color:#1a1a1a;">
          <div style="background:#0f0f0e;padding:1.5rem 2rem;">
            <h1 style="color:#f7f5f0;margin:0;font-size:1.1rem;font-weight:600;">DoneForYouAI</h1>
          </div>
          <div style="padding:2rem;background:#f9f9f9;border:1px solid #eee;">
            <h2 style="margin:0 0 1rem;font-size:1.3rem;">Welcome, ${name}!</h2>
            <p style="margin:0 0 1rem;line-height:1.7;color:#444;">
              Your expert application has been approved. Click the button below to log in and set up your profile — it only takes a few minutes.
            </p>
            <p style="margin:0 0 1rem;line-height:1.7;color:#444;">
              Once your profile is live, clients will be able to find you, book calls, and send you messages through the marketplace.
            </p>
            <a href="${magicLink}" style="display:inline-block;background:#e8521a;color:#fff;padding:1rem 2.5rem;text-decoration:none;font-weight:600;font-size:0.9rem;margin-bottom:1.5rem;">
              Set Up My Profile →
            </a>
            <p style="margin:0;font-size:0.78rem;color:#999;line-height:1.6;">
              This link expires in 1 hour. If you need a new one, go to 
              <a href="${baseUrl}/login" style="color:#e8521a;">${baseUrl}/login</a> 
              and enter your email.
            </p>
          </div>
          <div style="padding:1rem 2rem;background:#f0f0f0;font-size:0.75rem;color:#999;text-align:center;">
            <a href="${baseUrl}" style="color:#e8521a;text-decoration:none;">doneforyouai.com</a>
          </div>
        </div>
      `,
    })

    // Return success page
    return new NextResponse(`
      <!DOCTYPE html>
      <html>
      <head><title>Approved</title><style>body{font-family:sans-serif;background:#0f0f0e;color:#f7f5f0;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;}</style></head>
      <body>
        <div style="text-align:center;max-width:400px;padding:2rem;">
          <div style="width:56px;height:56px;border-radius:50%;background:#e8521a;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;font-size:1.3rem;">✓</div>
          <h2 style="margin:0 0 0.75rem;">${name} approved!</h2>
          <p style="color:rgba(247,245,240,0.5);line-height:1.7;">Magic link sent to ${email}. They can now log in and set up their profile.</p>
        </div>
      </body>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } })

  } catch (err: any) {
    console.error('[Approve error]', err)
    return NextResponse.json({ error: err.message || 'Approval failed' }, { status: 500 })
  }
}