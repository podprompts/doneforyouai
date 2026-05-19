'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function ApplySuccessContent() {
  const params = useSearchParams()
  const name   = params.get('name') || 'there'
  const tier   = params.get('tier') || 'pro'

  const tierLabel: Record<string, string> = {
    basic:     'Basic',
    pro:       'Pro',
    pro_video: 'Pro + Video',
  }

  return (
    <div style={{ background: 'var(--ink)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.25rem', fontFamily: 'var(--sans)' }}>
      <div style={{ position: 'fixed', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '60vw', height: '60vw', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(232,82,26,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 480, position: 'relative', zIndex: 1, textAlign: 'center' }}>

        {/* Success icon */}
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(232,82,26,0.12)', border: '1px solid var(--coral-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', fontSize: '1.5rem', color: 'var(--coral)' }}>✓</div>

        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: '1rem' }}>Application received</span>

        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 400, color: 'var(--page)', lineHeight: 1.1, marginBottom: '1.25rem' }}>
          You're in, {name.split(' ')[0]}.<br />
          <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>Almost live.</em>
        </h1>

        <p style={{ fontFamily: 'var(--sans)', fontSize: '0.95rem', color: 'rgba(247,245,240,0.5)', lineHeight: 1.75, marginBottom: '2rem', maxWidth: '40ch', margin: '0 auto 2rem' }}>
          Your <strong style={{ color: 'var(--page)' }}>{tierLabel[tier] || tier}</strong> plan payment was successful. We review applications within 24–48 hours and will send you a login link once approved.
        </p>

        {/* What happens next */}
        <div style={{ border: '1px solid var(--border-dark)', background: 'var(--ink-2)', padding: '1.5rem', textAlign: 'left', marginBottom: '2rem' }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.3)', marginBottom: '1rem' }}>What happens next</p>
          {[
            { step: '01', text: 'We review your application (24–48 hrs)' },
            { step: '02', text: 'You get a magic login link by email' },
            { step: '03', text: 'Set up your profile on the dashboard' },
            { step: '04', text: 'Go live on the expert marketplace' },
          ].map(s => (
            <div key={s.step} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.85rem' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--coral)', fontWeight: 300, flexShrink: 0, paddingTop: '0.15rem' }}>{s.step}</span>
              <span style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: 'rgba(247,245,240,0.55)', lineHeight: 1.5 }}>{s.text}</span>
            </div>
          ))}
        </div>

        <Link href="/" style={{ display: 'inline-block', fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', textDecoration: 'none', transition: 'color 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--page)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(247,245,240,0.35)'}
        >
          ← Back to DoneForYouAI
        </Link>
      </div>
    </div>
  )
}

export default function ApplySuccessPage() {
  return (
    <Suspense>
      <ApplySuccessContent />
    </Suspense>
  )
}