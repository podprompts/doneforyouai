'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const TIERS = [
  { value: 'basic',     label: 'Basic',       price: '$499/mo', perks: ['Listed profile', 'No leads routed'] },
  { value: 'pro',       label: 'Pro',         price: '$649/mo', perks: ['Leads routed', 'Priority placement'] },
  { value: 'pro_video', label: 'Pro + Video', price: '$1499/mo', perks: ['Everything in Pro', 'Video profile'] },
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

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--f-body)', fontSize: '0.8rem', fontWeight: 600,
    color: 'var(--text)', display: 'block', marginBottom: '0.4rem',
  }

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(21,22,26,0.55)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.25rem', backdropFilter: 'blur(8px)' }}
    >
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 28, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 40px 80px rgba(21,22,26,0.25)' }}>
        <div style={{ padding: '1.75rem 1.75rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span className="dfy-eyebrow" style={{ color: 'var(--accent)', display: 'block', marginBottom: '0.5rem' }}>Join the network</span>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--text)', margin: 0, lineHeight: 1.1 }}>Apply as an Expert</h3>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ background: 'var(--bg)', border: 'none', color: 'var(--text-2)', cursor: 'pointer', fontSize: '1rem', width: 40, height: 40, borderRadius: '50%', lineHeight: 1 }}>✕</button>
        </div>
        <div style={{ padding: '0 1.75rem 1.75rem' }}>
          {/* Tier picker */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Choose your plan</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {TIERS.map(t => (
                <div key={t.value} onClick={() => setForm(f => ({ ...f, tier: t.value }))}
                  style={{ border: `1.5px solid ${form.tier === t.value ? 'var(--accent)' : 'var(--line-2)'}`, borderRadius: 16, padding: '0.9rem 0.7rem', cursor: 'pointer', background: form.tier === t.value ? 'var(--accent-tint)' : '#fff', transition: 'all 0.15s' }}>
                  <div style={{ fontFamily: 'var(--f-body)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.2rem' }}>{t.label}</div>
                  <div style={{ fontFamily: 'var(--f-body)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem' }}>{t.price}</div>
                  {t.perks.map(p => <div key={p} style={{ fontFamily: 'var(--f-body)', fontSize: '0.7rem', color: 'var(--text-3)', lineHeight: 1.5 }}>· {p}</div>)}
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--f-body)', fontSize: '0.72rem', color: 'var(--text-3)', marginTop: '0.6rem' }}>Video profile is exclusive to Pro + Video tier.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Name *</label>
                <input className="dfy-field" type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" />
              </div>
              <div>
                <label style={labelStyle}>Email *</label>
                <input className="dfy-field" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com" />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Website / LinkedIn</label>
              <input className="dfy-field" type="text" value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} placeholder="https://..." />
            </div>
            <div>
              <label style={labelStyle}>Your AI specialties</label>
              <input className="dfy-field" type="text" value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))} placeholder="e.g. Zapier, Claude, Voiceflow..." />
            </div>
            <div>
              <label style={labelStyle}>Tell us about your work</label>
              <textarea className="dfy-field" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="What kind of AI systems have you built?" rows={4} style={{ resize: 'vertical', minHeight: '96px' }} />
            </div>
            {error && <p style={{ fontFamily: 'var(--f-body)', fontSize: '0.8rem', color: '#B42318', padding: '0.7rem 1rem', border: '1px solid rgba(180,35,24,0.3)', background: 'rgba(180,35,24,0.06)', borderRadius: 12, margin: 0 }}>{error}</p>}
            <button className="dfy-btn dfy-btn-primary" onClick={handleSubmit} disabled={loading || !form.name || !form.email} style={{ width: '100%' }}>
              {loading ? 'Redirecting to checkout...' : 'Continue to Payment →'}
            </button>
            <p style={{ fontFamily: 'var(--f-body)', fontSize: '0.72rem', color: 'var(--text-3)', textAlign: 'center', lineHeight: 1.6, margin: 0 }}>Secure checkout via Stripe · Cancel anytime</p>
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
    <div className="dfy-public" style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.25rem', fontFamily: 'var(--f-body)' }}>

      {applyOpen && <ApplyModal onClose={() => setApplyOpen(false)} />}

      <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: '2rem', justifyContent: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 11, background: 'var(--text)', color: '#fff', fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: '1rem' }}>D</span>
          <span style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>DFYAI</span>
        </Link>

        {/* Card */}
        <div style={{ border: '1px solid var(--line)', background: 'var(--surface)', borderRadius: 28, overflow: 'hidden', boxShadow: '0 30px 60px rgba(21,22,26,0.08)' }}>

          {/* Header */}
          <div style={{ padding: '2rem 2rem 1.25rem' }}>
            <span className="dfy-eyebrow" style={{ color: 'var(--accent)', display: 'block', marginBottom: '0.6rem' }}>Expert Portal</span>
            <h1 style={{ fontSize: '1.9rem', lineHeight: 1.1, color: 'var(--text)', margin: 0 }}>
              {sent ? 'Check your inbox.' : 'Sign in to your dashboard.'}
            </h1>
          </div>

          <div style={{ padding: '0.5rem 2rem 2rem' }}>
            {sent ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--accent-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--accent)', fontSize: '1.3rem', fontWeight: 600 }}>✓</div>
                <p style={{ fontFamily: 'var(--f-body)', fontSize: '0.95rem', color: 'var(--text-2)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                  We sent a magic link to <strong style={{ color: 'var(--text)' }}>{email}</strong>. Click it to log in — no password needed.
                </p>
                <p style={{ fontFamily: 'var(--f-body)', fontSize: '0.8rem', color: 'var(--text-3)', lineHeight: 1.6 }}>
                  Link expires in 1 hour. Check your spam folder if you don't see it.
                </p>
                <button
                  className="dfy-btn dfy-btn-ghost"
                  onClick={() => { setSent(false); setEmail('') }}
                  style={{ marginTop: '1.5rem', minHeight: 44 }}
                >
                  Use a different email
                </button>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label className="dfy-label" htmlFor="login-email">Email address</label>
                  <input
                    id="login-email"
                    className="dfy-field"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleSubmit() }}
                    placeholder="you@email.com"
                    autoFocus
                  />
                </div>

                {error && (
                  <p style={{ fontFamily: 'var(--f-body)', fontSize: '0.85rem', color: '#B42318', padding: '0.7rem 1rem', border: '1px solid rgba(180,35,24,0.3)', background: 'rgba(180,35,24,0.06)', marginBottom: '1rem', borderRadius: 12 }}>
                    {error}
                  </p>
                )}

                <button
                  className="dfy-btn dfy-btn-primary"
                  onClick={handleSubmit}
                  disabled={loading || !email}
                  style={{ width: '100%', marginBottom: '1.25rem' }}
                >
                  {loading ? 'Sending...' : 'Send Magic Link →'}
                </button>

                <p style={{ fontFamily: 'var(--f-body)', fontSize: '0.85rem', color: 'var(--text-3)', textAlign: 'center', lineHeight: 1.6, margin: 0 }}>
                  No password needed. We'll email you a secure link.
                </p>
              </>
            )}
          </div>
        </div>

        {/* "Apply to join" opens modal instead of going to /marketplace */}
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontFamily: 'var(--f-body)', fontSize: '0.92rem', color: 'var(--text-2)' }}>
          Not an expert yet?{' '}
          <button
            onClick={() => setApplyOpen(true)}
            style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--f-body)', fontSize: '0.92rem', fontWeight: 600, padding: 0 }}
          >Apply to join →</button>
        </p>
      </div>
    </div>
  )
}