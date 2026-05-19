'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!email) return
    setLoading(true)
    setError('')
    try {
      const { error: err } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      })
      if (err) throw err
      setSent(true)
    } catch (e: any) {
      setError(e.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: 'var(--ink)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.25rem', fontFamily: 'var(--sans)' }}>

      {/* Background glow */}
      <div style={{ position: 'fixed', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '60vw', height: '60vw', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(232,82,26,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '2.5rem', justifyContent: 'center' }}>
          <span style={{ width: 8, height: 8, background: 'var(--coral)', borderRadius: '50%', animation: 'pulse-dot 2.5s infinite' }} />
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--page)' }}>DFYAI</span>
        </Link>

        <div style={{ border: '1px solid var(--border-dark)', background: 'var(--ink-2)' }}>

          {/* Header */}
          <div style={{ padding: '2rem 2rem 1.5rem', borderBottom: '1px solid var(--border-dark)' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: '0.5rem' }}>Expert Portal</span>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: '1.75rem', fontWeight: 400, color: 'var(--page)', margin: 0 }}>
              {sent ? 'Check your inbox.' : 'Sign in to your dashboard.'}
            </h1>
          </div>

          <div style={{ padding: '2rem' }}>
            {sent ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', border: '1px solid var(--coral-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--coral)', fontSize: '1.2rem' }}>✓</div>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '0.9rem', color: 'rgba(247,245,240,0.6)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  We sent a magic link to <strong style={{ color: 'var(--page)' }}>{email}</strong>. Click it to log in — no password needed.
                </p>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: 'rgba(247,245,240,0.25)', letterSpacing: '0.06em', lineHeight: 1.6 }}>
                  Link expires in 1 hour. Check your spam folder if you don't see it.
                </p>
                <button
                  onClick={() => { setSent(false); setEmail('') }}
                  style={{ marginTop: '1.5rem', fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', border: '1px solid var(--border-dark)', color: 'rgba(247,245,240,0.4)', padding: '0.6rem 1.25rem', cursor: 'pointer' }}
                >
                  Use a different email
                </button>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', display: 'block', marginBottom: '0.5rem' }}>Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleSubmit() }}
                    placeholder="you@email.com"
                    autoFocus
                    style={{ width: '100%', background: 'var(--ink)', border: '1px solid var(--border-dark)', padding: '0.85rem 1rem', fontFamily: 'var(--sans)', fontSize: '0.9rem', color: 'var(--page)', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = 'var(--coral-border)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border-dark)'}
                  />
                </div>

                {error && (
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: '#f87171', padding: '0.65rem 1rem', border: '1px solid rgba(248,113,113,0.3)', background: 'rgba(248,113,113,0.06)', marginBottom: '1rem' }}>
                    {error}
                  </p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading || !email}
                  style={{ width: '100%', fontFamily: 'var(--sans)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', background: (!email || loading) ? 'rgba(232,82,26,0.4)' : 'var(--coral)', color: '#fff', border: 'none', padding: '1rem', cursor: (!email || loading) ? 'not-allowed' : 'pointer', transition: 'background 0.15s', marginBottom: '1.25rem' }}
                >
                  {loading ? 'Sending...' : 'Send Magic Link →'}
                </button>

                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'rgba(247,245,240,0.2)', textAlign: 'center', letterSpacing: '0.06em', lineHeight: 1.65 }}>
                  No password needed. We'll email you a secure link.
                </p>
              </>
            )}
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'rgba(247,245,240,0.2)', letterSpacing: '0.08em' }}>
          Not an expert yet?{' '}
          <Link href="/marketplace" style={{ color: 'var(--coral)', textDecoration: 'none' }}>Apply to join →</Link>
        </p>
      </div>
    </div>
  )
}