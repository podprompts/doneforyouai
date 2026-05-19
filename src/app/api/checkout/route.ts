import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-04-22.dahlia' })

const PRICE_MAP: Record<string, string> = {
  basic:     process.env.STRIPE_PRICE_BASIC!,
  pro:       process.env.STRIPE_PRICE_PRO!,
  pro_video: process.env.STRIPE_PRICE_PRO_VIDEO!,
}

export async function POST(req: Request) {
  try {
    const { name, email, website, skills, message, tier } = await req.json()

    if (!name || !email || !tier) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const priceId = PRICE_MAP[tier]
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doneforyouai.com'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        name,
        email,
        website:  website  || '',
        skills:   skills   || '',
        message:  message  || '',
        tier,
      },
      success_url: `${baseUrl}/api/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${baseUrl}/marketplace?canceled=true`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[Checkout error]', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}