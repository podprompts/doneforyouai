'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const TIERS = [
  { value: 'basic',     label: 'Basic',       price: '$29/mo', perks: ['Listed profile', 'No leads routed'] },
  { value: 'pro',       label: 'Pro',         price: '$49/mo', perks: ['Leads routed', 'Priority placement'] },
  { value: 'pro_video', label: 'Pro + Video', price: '$79/mo', perks: ['Everything in Pro', 'Video profile'] },
]

/* Inline Apply modal — self-contained so it works on the login page */
function ApplyModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [form, setForm]       = useState({ name: '', email: '', website: '', skills: '', message: '', tier: 'pro' })

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleSubmit = async () => {
    if (!form.name || !form.email) return
    setLoading(true); setError('')
    try {
      const res  = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error || 'Failed to start checkout')
      window.location.href = data.url
    } catch (e: any) {
      setError(e.message || 'Something went wrong.')
      setLoading(false)
    }
  }

  const inp: React.CSSProperties = {
    width: '100%', background: '#1c1c1a', border: '1px solid rgba(255,255,255,0.09)',
    padding: '0.75rem 1rem', fontFamily: 'var(--sans)', fontSize: '0.85rem',
    color: '#f7f5f0', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
  }

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(15,15,14,0.88)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.25rem', backdropFilter: 'blur(10px)' }}
    >
      <div style={{ background: '#0f0f0e', border: '1px solid rgba(255,255,255,0.09)', width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ background: '#1c1c1a', padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.09)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: '0.35rem' }}>Join the network</span>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontWeight: 400, color: '#f7f5f0', margin: 0 }}>Apply as an Expert</h3>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'rgba(247,245,240,0.35)', cursor: 'pointer', fontSize: '1.2rem', padding: '0.25rem', lineHeight: 1 }}>✕</button>
        </div>
        <div style={{ padding: '1.5rem' }}>
          {/* Tier picker */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', display: 'block', marginBottom: '0.75rem' }}>Choose your plan</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {TIERS.map(t => (
                <div key={t.value} onClick={() => setForm(f => ({ ...f, tier: t.value }))}
                  style={{ border: `1px solid ${form.tier === t.value ? 'var(--coral)' : 'rgba(255,255,255,0.09)'}`, padding: '0.85rem 0.65rem', cursor: 'pointer', background: form.tier === t.value ? 'rgba(232,82,26,0.06)' : 'transparent', transition: 'all 0.15s' }}>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: '0.78rem', fontWeight: 600, color: '#f7f5f0', marginBottom: '0.2rem' }}>{t.label}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--coral)', marginBottom: '0.5rem' }}>{t.price}</div>
                  {t.perks.map(p => <div key={p} style={{ fontFamily: 'var(--sans)', fontSize: '0.65rem', color: 'rgba(247,245,240,0.35)', lineHeight: 1.5 }}>· {p}</div>)}
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'rgba(247,245,240,0.2)', marginTop: '0.6rem', letterSpacing: '0.04em' }}>Video profile is exclusive to Pro + Video tier.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', display: 'block', marginBottom: '0.35rem' }}>Name *</label>
                <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" style={inp}
                  onFocus={e => e.target.style.borderColor = 'var(--coral-border)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'} />
              </div>
              <div>
                <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', display: 'block', marginBottom: '0.35rem' }}>Email *</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com" style={inp}
                  onFocus={e => e.target.style.borderColor = 'var(--coral-border)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'} />
              </div>
            </div>
            <div>
              <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', display: 'block', marginBottom: '0.35rem' }}>Website / LinkedIn</label>
              <input type="text" value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} placeholder="https://..." style={inp}
                onFocus={e => e.target.style.borderColor = 'var(--coral-border)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'} />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', display: 'block', marginBottom: '0.35rem' }}>Your AI specialties</label>
              <input type="text" value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))} placeholder="e.g. Zapier, Claude, Voiceflow..." style={inp}
                onFocus={e => e.target.style.borderColor = 'var(--coral-border)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'} />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', display: 'block', marginBottom: '0.35rem' }}>Tell us about your work</label>
              <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="What kind of AI systems have you built?" rows={4}
                style={{ ...inp, resize: 'vertical', minHeight: '96px' }}
                onFocus={e => e.target.style.borderColor = 'var(--coral-border)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'} />
            </div>
            {error && <p style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: '#f87171', padding: '0.65rem 1rem', border: '1px solid rgba(248,113,113,0.3)', background: 'rgba(248,113,113,0.06)', margin: 0 }}>{error}</p>}
            <button onClick={handleSubmit} disabled={loading || !form.name || !form.email}
              style={{ fontFamily: 'var(--sans)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', background: (!form.name || !form.email || loading) ? 'rgba(232,82,26,0.4)' : 'var(--coral)', color: '#fff', border: 'none', padding: '1rem', cursor: (!form.name || !form.email || loading) ? 'not-allowed' : 'pointer', width: '100%' }}>
              {loading ? 'Redirecting to checkout...' : 'Continue to Payment →'}
            </button>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'rgba(247,245,240,0.2)', textAlign: 'center', letterSpacing: '0.06em', lineHeight: 1.6, margin: 0 }}>Secure checkout via Stripe · Cancel anytime</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  const [email,     setEmail]     = useState('')
  const [sent,      setSent]      = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')
  const [applyOpen, setApplyOpen] = useState(false)

  const handleSubmit = async () => {
    if (!email) return
    setLoading(true); setError('')
    try {
      const { error: err } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/dashboard` },
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
    <div style={{ background: '#f5f4f0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.25rem', fontFamily: 'var(--sans)' }}>

      {applyOpen && <ApplyModal onClose={() => setApplyOpen(false)} />}

      {/* Subtle glow */}
      <div style={{ position: 'fixed', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '60vw', height: '60vw', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(232,82,26,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '2.5rem', justifyContent: 'center' }}>
          <span style={{ width: 8, height: 8, background: 'var(--coral)', borderRadius: '50%', animation: 'pulse-dot 2.5s infinite' }} />
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0f0f0e' }}>DFYAI</span>
        </Link>

        {/* Card */}
        <div style={{ border: '1px solid rgba(15,15,14,0.12)', background: '#ffffff', borderRadius: '10px', overflow: 'hidden' }}>

          {/* Header */}
          <div style={{ padding: '2rem 2rem 1.5rem', borderBottom: '1px solid rgba(15,15,14,0.08)' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: '0.5rem' }}>Expert Portal</span>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: '1.75rem', fontWeight: 400, color: '#0f0f0e', margin: 0 }}>
              {sent ? 'Check your inbox.' : 'Sign in to your dashboard.'}
            </h1>
          </div>

          <div style={{ padding: '2rem' }}>
            {sent ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', border: '1px solid var(--coral-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--coral)', fontSize: '1.2rem' }}>✓</div>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '0.9rem', color: 'rgba(15,15,14,0.6)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  We sent a magic link to <strong style={{ color: '#0f0f0e' }}>{email}</strong>. Click it to log in — no password needed.
                </p>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: 'rgba(15,15,14,0.3)', letterSpacing: '0.06em', lineHeight: 1.6 }}>
                  Link expires in 1 hour. Check your spam folder if you don't see it.
                </p>
                <button
                  onClick={() => { setSent(false); setEmail('') }}
                  style={{ marginTop: '1.5rem', fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', border: '1px solid rgba(15,15,14,0.18)', color: 'rgba(15,15,14,0.5)', padding: '0.6rem 1.25rem', cursor: 'pointer' }}
                >
                  Use a different email
                </button>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(15,15,14,0.45)', display: 'block', marginBottom: '0.5rem' }}>Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleSubmit() }}
                    placeholder="you@email.com"
                    autoFocus
                    style={{ width: '100%', background: '#f5f4f0', border: '1px solid rgba(15,15,14,0.15)', padding: '0.85rem 1rem', fontFamily: 'var(--sans)', fontSize: '0.9rem', color: '#0f0f0e', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box', borderRadius: '6px' }}
                    onFocus={e => e.target.style.borderColor = 'var(--coral)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(15,15,14,0.15)'}
                  />
                </div>

                {error && (
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: '#e53e3e', padding: '0.65rem 1rem', border: '1px solid rgba(229,62,62,0.3)', background: 'rgba(229,62,62,0.06)', marginBottom: '1rem', borderRadius: '4px' }}>
                    {error}
                  </p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading || !email}
                  style={{ width: '100%', fontFamily: 'var(--sans)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', background: (!email || loading) ? 'rgba(232,82,26,0.5)' : 'var(--coral)', color: '#fff', border: 'none', padding: '1rem', cursor: (!email || loading) ? 'not-allowed' : 'pointer', transition: 'background 0.15s', marginBottom: '1.25rem', borderRadius: '6px' }}
                >
                  {loading ? 'Sending...' : 'Send Magic Link →'}
                </button>

                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'rgba(15,15,14,0.3)', textAlign: 'center', letterSpacing: '0.06em', lineHeight: 1.65 }}>
                  No password needed. We'll email you a secure link.
                </p>
              </>
            )}
          </div>
        </div>

        {/* "Apply to join" → opens modal instead of going to /marketplace */}
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'rgba(15,15,14,0.4)', letterSpacing: '0.08em' }}>
          Not an expert yet?{' '}
          <button
            onClick={() => setApplyOpen(true)}
            style={{ color: 'var(--coral)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.08em', padding: 0, textDecoration: 'none' }}
          >Apply to join →</button>
        </p>
      </div>
    </div>
  )
}