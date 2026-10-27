'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

/* Experts link removed from nav */
const NAV_LINKS = [
  { label: 'Services', href: '/#services' },
  { label: 'Process',  href: '/#process'  },
  { label: 'My Work', href: '/work'       },
  { label: 'Blog',     href: '/blog'       },
  { label: 'Contact',  href: '/#contact'  },
]

const TIERS = [
  { value: 'basic',     label: 'Basic',       price: '$499/mo',  perks: ['Listed profile', 'No leads routed'] },
  { value: 'pro',       label: 'Pro',         price: '$649/mo', perks: ['Leads routed', 'Priority placement'] },
  { value: 'pro_video', label: 'Pro + Video', price: '$1499/mo', perks: ['Everything in Pro', 'Video profile'] },
]

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
    setLoading(true)
    setError('')
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
    <div onClick={e => { if (e.target === e.currentTarget) onClose() }} style={{ position: 'fixed', inset: 0, background: 'rgba(21,22,26,0.55)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.25rem', backdropFilter: 'blur(8px)' }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 28, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 40px 80px rgba(21,22,26,0.25)' }}>
        <div style={{ padding: '1.75rem 1.75rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span className="dfy-eyebrow" style={{ color: 'var(--accent)', display: 'block', marginBottom: '0.5rem' }}>Join the network</span>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--text)', margin: 0, lineHeight: 1.1 }}>Apply as an Expert</h3>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ background: 'var(--bg)', border: 'none', color: 'var(--text-2)', cursor: 'pointer', fontSize: '1rem', width: 40, height: 40, borderRadius: '50%', lineHeight: 1 }}>✕</button>
        </div>
        <div style={{ padding: '0 1.75rem 1.75rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Choose your plan</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {TIERS.map(t => (
                <div key={t.value} onClick={() => setForm(f => ({ ...f, tier: t.value }))} style={{ border: `1.5px solid ${form.tier === t.value ? 'var(--accent)' : 'var(--line-2)'}`, borderRadius: 16, padding: '0.9rem 0.7rem', cursor: 'pointer', background: form.tier === t.value ? 'var(--accent-tint)' : '#fff', transition: 'all 0.15s' }}>
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

export default function Navbar() {
  const router   = useRouter()
  const pathname = usePathname()
  const [scrolled,      setScrolled]      = useState(false)
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [applyOpen,     setApplyOpen]     = useState(false)
  const [session,       setSession]       = useState<any>(null)
  const [sessionLoaded, setSessionLoaded] = useState(false)
  const [isAdmin,       setIsAdmin]       = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setIsAdmin(session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL)
      setSessionLoaded(true)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session)
      setIsAdmin(session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!applyOpen) document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen, applyOpen])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const openApply = () => { setMenuOpen(false); setApplyOpen(true) }

  const handleBookCall = () => {
    setMenuOpen(false)
    if (window.location.pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/#contact'
    }
  }

  const handleSignOut = async () => {
    setMenuOpen(false)
    await supabase.auth.signOut()
    router.push('/')
  }

  const dashboardHref = isAdmin ? '/admin' : '/dashboard'

  const isActive = (href: string) => href === '/blog' ? pathname.startsWith('/blog') : href === '/work' ? pathname.startsWith('/work') : false

  const linkStyle = (href: string): React.CSSProperties => ({
    fontFamily: 'var(--f-body)', fontSize: '0.92rem', fontWeight: 500,
    color: isActive(href) ? 'var(--accent)' : 'var(--text-2)',
    textDecoration: 'none', transition: 'color 0.2s',
  })

  const smallBtn: React.CSSProperties = { minHeight: 42, padding: '0 20px', fontSize: '0.88rem' }

  return (
    <>
      {applyOpen && <ApplyModal onClose={() => setApplyOpen(false)} />}

      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, padding: '14px 24px 0', pointerEvents: 'none' }}>
        <nav aria-label="Main" style={{
          pointerEvents: 'auto',
          maxWidth: 1200, margin: '0 auto', boxSizing: 'border-box',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
          padding: '8px 8px 8px 22px', minHeight: 60,
          borderRadius: 999,
          background: scrolled ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.78)',
          border: '1px solid var(--line)',
          boxShadow: scrolled ? '0 10px 30px rgba(21,22,26,0.10)' : '0 6px 24px rgba(21,22,26,0.05)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          transition: 'box-shadow 0.3s, background 0.3s',
        }}>

          <Link href="/" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', color: 'var(--text)', textDecoration: 'none' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 10, background: 'var(--text)', color: '#fff', fontSize: '0.95rem' }}>D</span>
            DFYAI
          </Link>

          <ul className="nav-links-desktop" style={{ display: 'flex', gap: '1.75rem', listStyle: 'none', margin: 0, padding: 0 }}>
            {NAV_LINKS.map(item => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  style={linkStyle(item.href)}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                  onMouseLeave={e => e.currentTarget.style.color = isActive(item.href) ? 'var(--accent)' : 'var(--text-2)'}
                >{item.label}</Link>
              </li>
            ))}
          </ul>

          <div className="nav-cta-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {sessionLoaded && (
              session ? (
                <>
                  <Link href={dashboardHref} style={{ ...linkStyle(''), padding: '0 12px' }}>
                    {isAdmin ? 'Admin' : 'Dashboard'}
                  </Link>
                  <button className="dfy-btn dfy-btn-ghost" onClick={handleSignOut} style={smallBtn}>Log Out</button>
                </>
              ) : (
                <>
                  <button onClick={openApply} style={{ ...linkStyle(''), background: 'transparent', border: 'none', cursor: 'pointer', padding: '0 12px', color: 'var(--accent)', fontWeight: 600 }}>Join as Expert</button>
                  <Link href="/login" className="dfy-btn dfy-btn-ghost" style={smallBtn}>Sign In</Link>
                </>
              )
            )}
            <button className="dfy-btn dfy-btn-primary" onClick={handleBookCall} style={smallBtn}>Book a Call</button>
          </div>

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}
            style={{ display: 'none', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '5px', background: 'var(--bg)', border: 'none', cursor: 'pointer', width: 44, height: 44, borderRadius: '50%', zIndex: 300 }}
          >
            <span style={{ display: 'block', width: '18px', height: '2px', background: 'var(--text)', transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none', transition: 'transform 0.25s' }} />
            <span style={{ display: 'block', width: '18px', height: '2px', background: 'var(--text)', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.25s' }} />
            <span style={{ display: 'block', width: '18px', height: '2px', background: 'var(--text)', transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none', transition: 'transform 0.25s' }} />
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'var(--bg)',
        zIndex: 190, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-start', gap: '1.5rem',
        paddingTop: 110, paddingBottom: 40, overflowY: 'auto', boxSizing: 'border-box',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
        visibility: menuOpen ? 'visible' : 'hidden',
      }}>
        {NAV_LINKS.map(item => (
          <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)} style={{ fontFamily: 'var(--f-display)', fontSize: '1.8rem', fontWeight: 600, letterSpacing: '-0.02em', color: isActive(item.href) ? 'var(--accent)' : 'var(--text)', textDecoration: 'none' }}>
            {item.label}
          </Link>
        ))}

        <div style={{ width: 40, height: 1, background: 'var(--line-2)' }} />

        {sessionLoaded && (
          session ? (
            <>
              <Link href={dashboardHref} onClick={() => setMenuOpen(false)} style={{ fontFamily: 'var(--f-body)', fontSize: '1rem', fontWeight: 500, color: 'var(--text-2)', textDecoration: 'none' }}>
                {isAdmin ? 'Admin Panel' : 'My Dashboard'}
              </Link>
              <button className="dfy-btn dfy-btn-ghost" onClick={handleSignOut}>Log Out</button>
            </>
          ) : (
            <>
              <button onClick={openApply} style={{ fontFamily: 'var(--f-body)', fontSize: '1rem', fontWeight: 600, color: 'var(--accent)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                Join as Expert
              </button>
              <Link href="/login" onClick={() => setMenuOpen(false)} className="dfy-btn dfy-btn-ghost">
                Sign In
              </Link>
            </>
          )
        )}

        <button className="dfy-btn dfy-btn-primary" onClick={handleBookCall}>
          Book a Call
        </button>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta-desktop   { display: none !important; }
          .hamburger         { display: flex !important; }
        }
        @media (max-width: 680px) {
          nav[aria-label="Main"] { padding-left: 16px !important; }
        }
      `}</style>
    </>
  )
}