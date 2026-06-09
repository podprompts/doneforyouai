'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

/* Experts link removed from nav */
const NAV_LINKS = [
  { label: 'Services', href: '/#services'   },
  { label: 'Process',  href: '/#process'    },
  { label: 'Our Work',     href: '/work'        },
  { label: 'Contact',  href: '/#contact'   },
]

const TIERS = [
  { value: 'basic',     label: 'Basic',       price: '$79/mo', perks: ['Listed profile', 'No leads routed'] },
{ value: 'pro',       label: 'Pro',         price: '$149/mo', perks: ['Leads routed', 'Priority placement'] },
{ value: 'pro_video', label: 'Pro + Video', price: '$249/mo', perks: ['Everything in Pro', 'Video profile'] },
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

  const inp: React.CSSProperties = {
    width: '100%',
    background: '#1c1c1a',
    border: '1px solid rgba(255,255,255,0.09)',
    padding: '0.75rem 1rem',
    fontFamily: 'var(--sans)',
    fontSize: '0.85rem',
    color: '#f7f5f0',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  }

  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose() }} style={{ position: 'fixed', inset: 0, background: 'rgba(15,15,14,0.88)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.25rem', backdropFilter: 'blur(10px)' }}>
      <div style={{ background: '#0f0f0e', border: '1px solid rgba(255,255,255,0.09)', width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ background: '#1c1c1a', padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.09)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: '0.35rem' }}>Join the network</span>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontWeight: 400, color: '#f7f5f0', margin: 0 }}>Apply as an Expert</h3>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'rgba(247,245,240,0.35)', cursor: 'pointer', fontSize: '1.2rem', padding: '0.25rem', lineHeight: 1 }}>✕</button>
        </div>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', display: 'block', marginBottom: '0.75rem' }}>Choose your plan</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {TIERS.map(t => (
                <div key={t.value} onClick={() => setForm(f => ({ ...f, tier: t.value }))} style={{ border: `1px solid ${form.tier === t.value ? 'var(--coral)' : 'rgba(255,255,255,0.09)'}`, padding: '0.85rem 0.65rem', cursor: 'pointer', background: form.tier === t.value ? 'rgba(232,82,26,0.06)' : 'transparent', transition: 'all 0.15s' }}>
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
                <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" style={inp} onFocus={e => e.target.style.borderColor = 'var(--coral-border)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'} />
              </div>
              <div>
                <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', display: 'block', marginBottom: '0.35rem' }}>Email *</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com" style={inp} onFocus={e => e.target.style.borderColor = 'var(--coral-border)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'} />
              </div>
            </div>
            <div>
              <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', display: 'block', marginBottom: '0.35rem' }}>Website / LinkedIn</label>
              <input type="text" value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} placeholder="https://..." style={inp} onFocus={e => e.target.style.borderColor = 'var(--coral-border)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'} />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', display: 'block', marginBottom: '0.35rem' }}>Your AI specialties</label>
              <input type="text" value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))} placeholder="e.g. Zapier, Claude, Voiceflow..." style={inp} onFocus={e => e.target.style.borderColor = 'var(--coral-border)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'} />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', display: 'block', marginBottom: '0.35rem' }}>Tell us about your work</label>
              <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="What kind of AI systems have you built?" rows={4} style={{ ...inp, resize: 'vertical', minHeight: '96px' }} onFocus={e => e.target.style.borderColor = 'var(--coral-border)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'} />
            </div>
            {error && <p style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: '#f87171', padding: '0.65rem 1rem', border: '1px solid rgba(248,113,113,0.3)', background: 'rgba(248,113,113,0.06)', margin: 0 }}>{error}</p>}
            <button onClick={handleSubmit} disabled={loading || !form.name || !form.email} style={{ fontFamily: 'var(--sans)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', background: (!form.name || !form.email || loading) ? 'rgba(232,82,26,0.4)' : 'var(--coral)', color: '#fff', border: 'none', padding: '1rem', cursor: (!form.name || !form.email || loading) ? 'not-allowed' : 'pointer', width: '100%' }}>
              {loading ? 'Redirecting to checkout...' : 'Continue to Payment →'}
            </button>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'rgba(247,245,240,0.2)', textAlign: 'center', letterSpacing: '0.06em', lineHeight: 1.6, margin: 0 }}>Secure checkout via Stripe · Cancel anytime</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Navbar() {
  const router = useRouter()
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

  const isDark      = scrolled || menuOpen
  const navBg       = isDark ? 'rgba(15,15,14,0.96)' : '#ffffff'
  const navBorder   = isDark ? '1px solid rgba(255,255,255,0.09)' : '1px solid rgba(15,15,14,0.1)'
  const linkColor   = isDark ? 'rgba(247,245,240,0.5)' : 'rgba(15,15,14,0.5)'
  const linkHover   = isDark ? '#f7f5f0' : '#0f0f0e'
  const logoColor   = isDark ? '#f7f5f0' : '#0f0f0e'
  const btnBorder   = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(15,15,14,0.2)'
  const btnHover    = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(15,15,14,0.5)'
  const btnColor    = isDark ? '#f7f5f0' : '#0f0f0e'
  const outlineBorder = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(15,15,14,0.15)'
  const mutedColor  = isDark ? 'rgba(247,245,240,0.5)' : 'rgba(15,15,14,0.45)'
  const hamburgerBg = isDark ? '#f7f5f0' : '#0f0f0e'

  return (
    <>
      {applyOpen && <ApplyModal onClose={() => setApplyOpen(false)} />}

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem', height: '60px',
        background: navBg,
        borderBottom: navBorder,
        transition: 'background 0.3s, border-color 0.3s',
        backdropFilter: isDark ? 'blur(12px)' : 'none',
      }}>

        <Link href="/" onClick={() => setMenuOpen(false)} style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: '0.88rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: logoColor, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.3s' }}>
          <span style={{ width: 7, height: 7, background: 'var(--coral)', borderRadius: '50%', display: 'inline-block', animation: 'pulse-dot 2.5s infinite' }} />
          DFYAI
        </Link>

        <ul className="nav-links-desktop" style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
          {NAV_LINKS.map(item => (
            <li key={item.label}>
              <Link
                href={item.href}
                style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: linkColor, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = linkHover}
                onMouseLeave={e => e.currentTarget.style.color = linkColor}
              >{item.label}</Link>
            </li>
          ))}
        </ul>

        <div className="nav-cta-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {sessionLoaded && (
            session ? (
              <>
                <Link href={dashboardHref} style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: mutedColor, textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = btnColor}
                  onMouseLeave={e => e.currentTarget.style.color = mutedColor}
                >
                  {isAdmin ? 'Admin' : 'Dashboard'}
                </Link>
                <button onClick={handleSignOut} style={{ fontFamily: 'var(--sans)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: btnColor, background: 'transparent', border: `1px solid ${outlineBorder}`, padding: '0.5rem 1rem', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = btnHover }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = outlineBorder }}
                >Log Out</button>
              </>
            ) : (
              <>
                <button onClick={openApply} style={{ fontFamily: 'var(--sans)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--coral)', background: 'transparent', border: '1px solid var(--coral-border)', padding: '0.5rem 1rem', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,82,26,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >Join as Expert</button>
                <Link href="/login" style={{ fontFamily: 'var(--sans)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', background: 'var(--coral)', border: '1px solid var(--coral)', padding: '0.5rem 1.25rem', textDecoration: 'none', transition: 'opacity 0.2s', display: 'block' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >Sign In</Link>
              </>
            )
          )}
          <button onClick={handleBookCall} style={{ fontFamily: 'var(--sans)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: btnColor, background: 'transparent', border: `1px solid ${btnBorder}`, padding: '0.5rem 1rem', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = btnHover }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = btnBorder }}
          >Book a Call</button>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"
          style={{ display: 'none', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', zIndex: 300 }}
        >
          <span style={{ display: 'block', width: '22px', height: '2px', background: hamburgerBg, transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none', transition: 'transform 0.25s, background 0.3s' }} />
          <span style={{ display: 'block', width: '22px', height: '2px', background: hamburgerBg, opacity: menuOpen ? 0 : 1, transition: 'opacity 0.25s, background 0.3s' }} />
          <span style={{ display: 'block', width: '22px', height: '2px', background: hamburgerBg, transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none', transition: 'transform 0.25s, background 0.3s' }} />
        </button>
      </nav>

      {/* Mobile drawer — always dark */}
      <div style={{
        position: 'fixed', top: '60px', left: 0, right: 0, bottom: 0,
        background: 'rgba(15,15,14,0.98)', backdropFilter: 'blur(16px)',
        zIndex: 190, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '2rem',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
      }}>
        {NAV_LINKS.map(item => (
          <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)} style={{ fontFamily: 'var(--mono)', fontSize: '0.9rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#f7f5f0', textDecoration: 'none' }}>
            {item.label}
          </Link>
        ))}

        <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.09)' }} />

        {sessionLoaded && (
          session ? (
            <>
              <Link href={dashboardHref} onClick={() => setMenuOpen(false)} style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.5)', textDecoration: 'none' }}>
                {isAdmin ? 'Admin Panel' : 'My Dashboard'}
              </Link>
              <button onClick={handleSignOut} style={{ fontFamily: 'var(--sans)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#f7f5f0', background: 'transparent', border: '1px solid rgba(255,255,255,0.09)', padding: '0.85rem 2.5rem', cursor: 'pointer' }}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <button onClick={openApply} style={{ fontFamily: 'var(--sans)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--coral)', background: 'transparent', border: '1px solid var(--coral-border)', padding: '0.85rem 2.5rem', cursor: 'pointer' }}>
                Join as Expert
              </button>
              <Link href="/login" onClick={() => setMenuOpen(false)} style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', background: 'var(--coral)', padding: '0.85rem 2.5rem', textDecoration: 'none', display: 'block' }}>
                Sign In
              </Link>
            </>
          )
        )}

        <button onClick={handleBookCall} style={{ fontFamily: 'var(--sans)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.4)', background: 'transparent', border: '1px solid rgba(255,255,255,0.09)', padding: '0.85rem 2.5rem', cursor: 'pointer' }}>
          Book a Call
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta-desktop   { display: none !important; }
          .hamburger         { display: flex !important; }
        }
      `}</style>
    </>
  )
}