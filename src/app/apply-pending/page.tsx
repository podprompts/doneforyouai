'use client'

import Link from 'next/link'

export default function ApplyPendingPage() {
  return (
    <div style={{ background: 'var(--ink)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.25rem', fontFamily: 'var(--sans)' }}>
      <div style={{ position: 'fixed', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '60vw', height: '60vw', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(232,82,26,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ width: '100%', maxWidth: 460, position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', border: '1px solid var(--border-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', fontSize: '1.5rem' }}>⏳</div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: '1rem' }}>Under review</span>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 400, color: 'var(--page)', lineHeight: 1.1, marginBottom: '1.25rem' }}>
          Your application is<br /><em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>being reviewed.</em>
        </h1>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '0.9rem', color: 'rgba(247,245,240,0.5)', lineHeight: 1.75, marginBottom: '2rem' }}>
          Payment confirmed. We typically review within 24–48 hours and will send a login link to your email once approved.
        </p>
        <Link href="/" style={{ display: 'inline-block', fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', textDecoration: 'none' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--page)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(247,245,240,0.35)'}
        >← Back to DoneForYouAI</Link>
      </div>
    </div>
  )
}