# Mobile fixes: gap, edge-to-edge video, faster carousel, menu padding, login restyle
$ErrorActionPreference = 'Stop'
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$files = @()
$files += @{ Path = 'src\app\components\Hero.tsx'; Content = @'
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const MUX_PLAYBACK_ID = process.env.NEXT_PUBLIC_HERO_MUX_PLAYBACK_ID || ''

const projects = [
  { id: 1,  name: 'DoneForYouAI.com',         url: 'doneforyouai.com',         href: 'https://doneforyouai.com',         tag: 'AI Services',          screenshot: '/screenshots/doneforyouai.png',         light: false },
  { id: 2,  name: 'AINewsClips.com',           url: 'ainewsclips.com',          href: 'https://ainewsclips.com',          tag: 'Media',                screenshot: '/screenshots/ainewsclips.png',          light: false },
  { id: 3,  name: 'LiveReselling.com',         url: 'livereselling.com',        href: 'https://livereselling.com',        tag: 'Live Commerce',        screenshot: '/screenshots/livereselling.png',        light: true  },
  { id: 4,  name: 'UGCAffiliates.com',         url: 'ugcaffiliates.com',        href: 'https://ugcaffiliates.com',        tag: 'Marketplace',          screenshot: '/screenshots/ugcaffiliates.png',        light: true  },
  { id: 5,  name: 'AIPrintOnDemand.com',       url: 'aiprintondemand.com',      href: 'https://aiprintondemand.com',      tag: 'AI + E-commerce',      screenshot: '/screenshots/aipod.png',                light: true  },
  { id: 6,  name: 'VintageGarageSale.com',     url: 'vintagegaragesale.com',    href: 'https://vintagegaragesale.com',    tag: 'Marketplace',          screenshot: '/screenshots/vintagegaragesale.png',    light: false },
  { id: 7,  name: 'AIDigitalProducts.com',     url: 'aidigitalproducts.com',    href: 'https://aidigitalproducts.com',    tag: 'Digital Marketplace',  screenshot: '/screenshots/aidigitalproducts.png',    light: true  },
  { id: 8,  name: 'HomeServiceAgents.com',     url: 'homeserviceagents.com',    href: 'https://homeserviceagents.com',    tag: 'AI + Home Services',   screenshot: '/screenshots/homeserviceagents.png',    light: true  },
  { id: 9,  name: 'FreeAIReceptionist.com',    url: 'freeaireceptionist.com',   href: 'https://freeaireceptionist.com',   tag: 'Voice AI',             screenshot: '/screenshots/freeaireceptionist.png',   light: true  },
  { id: 10, name: 'HireAIReceptionist.com',    url: 'hireaireceptionist.com',   href: 'https://hireaireceptionist.com',   tag: 'Business Automation',  screenshot: '/screenshots/hireaireceptionist.webp',   light: false },
]

const CLONES = 3
const total  = projects.length
const cloned = [...projects.slice(total - CLONES), ...projects, ...projects.slice(0, CLONES)]
const OFFSET = CLONES

function HeroCarousel() {
  const [index,    setIndex]    = useState(OFFSET)
  const [animated, setAnimated] = useState(true)
  const [slideW,   setSlideW]   = useState(0)
  const [dragDelta, setDragDelta] = useState(0)

  const dragStartRef  = useRef<number | null>(null)
  const dragDeltaRef  = useRef(0)
  const isDraggingRef = useRef(false)
  const autoRef       = useRef<ReturnType<typeof setInterval> | null>(null)
  const jumpRef       = useRef(false)
  const viewportRef   = useRef<HTMLDivElement>(null)

  const realIndex = ((index - OFFSET) % total + total) % total

  useEffect(() => {
    const measure = () => {
      if (viewportRef.current) setSlideW(viewportRef.current.offsetWidth)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (viewportRef.current) ro.observe(viewportRef.current)
    return () => ro.disconnect()
  }, [])

  const goTo = useCallback((i: number, anim = true) => {
    setAnimated(anim); setIndex(i)
  }, [])

  useEffect(() => {
    if (!animated) return
    const t = setTimeout(() => {
      if (index >= total + OFFSET)  { jumpRef.current = true; goTo(index - total, false) }
      else if (index < OFFSET)      { jumpRef.current = true; goTo(index + total, false) }
    }, 420)
    return () => clearTimeout(t)
  }, [index, animated, goTo])

  useEffect(() => {
    if (!animated && jumpRef.current) {
      const t = setTimeout(() => { setAnimated(true); jumpRef.current = false }, 20)
      return () => clearTimeout(t)
    }
  }, [animated])

  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current)
    const delay = typeof window !== 'undefined' && window.innerWidth <= 900 ? 2200 : 3500
    autoRef.current = setInterval(() => { setIndex(i => i + 1); setAnimated(true) }, delay)
  }, [])

  useEffect(() => {
    resetAuto()
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [resetAuto])

  const handlePrev = () => { goTo(index - 1); resetAuto() }
  const handleNext = () => { goTo(index + 1); resetAuto() }

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    dragStartRef.current  = e.clientX
    dragDeltaRef.current  = 0
    isDraggingRef.current = false
    setDragDelta(0)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartRef.current === null) return
    const d = e.clientX - dragStartRef.current
    dragDeltaRef.current = d
    if (Math.abs(d) > 8) isDraggingRef.current = true
    setDragDelta(d)
  }
  const onPointerUp = () => {
    if (dragStartRef.current === null) return
    const delta = dragDeltaRef.current
    if (delta < -50) handleNext()
    else if (delta > 50) handlePrev()
    dragStartRef.current  = null
    dragDeltaRef.current  = 0
    isDraggingRef.current = false
    setDragDelta(0)
  }

  const p = cloned[index]

  const offsetPx = slideW > 0 ? -(index * slideW) + dragDelta : 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <span style={{
            fontFamily: 'var(--f-body)', fontSize: '0.8rem', fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--accent)', display: 'block', marginBottom: '0.3rem',
          }}>My Latest Work</span>
          <span style={{
            fontFamily: 'var(--f-body)', fontSize: '0.8rem', fontWeight: 500,
            color: 'var(--text-3)', letterSpacing: '0.04em',
          }}>{String(realIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[{ fn: handlePrev, label: '←' }, { fn: handleNext, label: '→' }].map(({ fn, label }) => (
            <button key={label} onClick={fn} style={{
              fontFamily: 'var(--f-body)', fontSize: '1rem', background: 'transparent',
              border: '1.5px solid rgba(21,22,26,0.25)', color: 'var(--text)',
              width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', cursor: 'pointer', transition: 'border-color 0.2s', flexShrink: 0,
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(21,22,26,0.25)'}
            >{label}</button>
          ))}
        </div>
      </div>

      {/* Viewport */}
      <div
        ref={viewportRef}
        style={{ flex: 1, overflow: 'hidden', position: 'relative', cursor: dragDelta !== 0 ? 'grabbing' : 'grab', userSelect: 'none', minHeight: 0 }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {slideW > 0 && (
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            width: `${slideW * cloned.length}px`,
            height: '100%',
            transform: `translate3d(${offsetPx}px, 0, 0)`,
            transition: animated ? 'transform 0.4s cubic-bezier(0.22,1,0.36,1)' : 'none',
            willChange: 'transform',
          }}>
            {cloned.map((proj, i) => {
              const isActive = i === index
              return (
                <div
                  key={i}
                  style={{
                    width: `${slideW}px`,
                    flexShrink: 0,
                    flexGrow: 0,
                    height: '100%',
                    padding: '0 4px',
                    boxSizing: 'border-box',
                  }}
                >
                  <a
                    href={proj.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => { if (isDraggingRef.current || Math.abs(dragDeltaRef.current) > 8) e.preventDefault() }}
                    style={{ display: 'block', textDecoration: 'none', height: '100%' }}
                  >
                    <div style={{
                      borderRadius: '20px', overflow: 'hidden',
                      border: isActive ? '1.5px solid rgba(43,75,255,0.45)' : '1px solid var(--line)',
                      boxShadow: isActive ? '0 24px 50px rgba(21,22,26,0.14)' : '0 2px 12px rgba(21,22,26,0.05)',
                      transition: 'box-shadow 0.4s, border-color 0.4s',
                      height: '100%', display: 'flex', flexDirection: 'column',
                    }}>
                      {/* Browser chrome */}
                      <div style={{ height: 30, background: '#222', display: 'flex', alignItems: 'center', padding: '0 10px', gap: '5px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57', flexShrink: 0 }} />
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e', flexShrink: 0 }} />
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840', flexShrink: 0 }} />
                        <div style={{ flex: 1, height: 16, background: '#333', borderRadius: 3, margin: '0 6px', display: 'flex', alignItems: 'center', paddingLeft: 7, fontFamily: 'monospace', fontSize: '0.52rem', color: '#666', overflow: 'hidden', whiteSpace: 'nowrap' }}>{proj.url}</div>
                      </div>
                      {/* Screenshot */}
                      <div style={{ flex: 1, background: proj.light ? '#f0f0f0' : '#1a1a1a', overflow: 'hidden', minHeight: 0 }}>
                        <img
                          src={proj.screenshot} alt={proj.name} draggable={false}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', filter: isActive ? 'none' : 'brightness(0.65) saturate(0.6)', transition: 'filter 0.4s' }}
                          onError={e => {
                            const el = e.currentTarget.parentElement!
                            e.currentTarget.style.display = 'none'
                            el.style.display = 'flex'; el.style.alignItems = 'center'; el.style.justifyContent = 'center'
                            el.innerHTML = `<span style="font-family:monospace;font-size:0.6rem;color:rgba(255,255,255,0.25);letter-spacing:0.1em;text-transform:uppercase">${proj.url}</span>`
                          }}
                        />
                      </div>
                    </div>
                  </a>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Name + tag + dots */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--f-display)', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text)' }}>{p.name}</span>
          <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.02em', color: 'var(--accent)', borderRadius: 999, padding: '0.25rem 0.75rem', flexShrink: 0, background: 'var(--accent-tint)' }}>{p.tag}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          {projects.map((_, i) => (
            <button key={i} onClick={() => { goTo(i + OFFSET); resetAuto() }}
              style={{ width: i === realIndex ? 22 : 6, height: 6, borderRadius: 3, background: i === realIndex ? 'var(--accent)' : 'rgba(21,22,26,0.18)', border: 'none', padding: 0, cursor: 'pointer', transition: 'all 0.3s' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      gap: '4rem',
      padding: '130px max(2rem, calc((100vw - 1200px) / 2)) 90px',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--bg)',
    }}>

      {/* Left */}
      <div className="hero-left" style={{ position: 'relative', zIndex: 1, minWidth: 0 }}>
        <div className="animate-fade-up delay-1 dfy-eyebrow" style={{
          padding: '0.55rem 0.95rem', borderRadius: 999,
          background: 'var(--surface)', border: '1px solid var(--line)',
          marginBottom: '1.75rem', width: 'fit-content',
        }}>
          <span style={{ width: 8, height: 8, background: 'var(--accent)', borderRadius: '50%', animation: 'pulse-dot 2s infinite' }} />
          AI Implementation Partner
        </div>

        <h1 className="animate-fade-up delay-2" style={{
          fontSize: 'clamp(3rem, 6vw, 5.75rem)',
          lineHeight: 1,
          color: 'var(--text)',
        }}>
          Your business.<br />
          <em style={{ color: 'var(--accent)' }}>Powered by AI.</em><br />
          Done for you.
        </h1>

        <p className="animate-fade-up delay-3" style={{
          marginTop: '1.75rem', fontSize: '1.15rem',
          color: 'var(--text-2)', lineHeight: 1.6, maxWidth: '34rem',
        }}>
          We build and deploy custom AI systems inside your business — automations, assistants, content engines, and more. You stay focused on running the show.
        </p>

        <div className="animate-fade-up delay-4" style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <button
            className="dfy-btn dfy-btn-primary"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >Book a Free Strategy Call</button>
          <button
            className="dfy-btn dfy-btn-ghost"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >See Services <span>↓</span></button>
        </div>
      </div>

      {/* Right — carousel */}
      <div className="animate-fade-in delay-5 hero-right" style={{
        position: 'relative', zIndex: 1, minWidth: 0,
        alignSelf: 'stretch', display: 'flex',
        flexDirection: 'column', justifyContent: 'center',
        paddingTop: '1rem', paddingBottom: '1rem',
      }}>
        <div className="carousel-height-box" style={{
          background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 32,
          padding: '1.5rem', boxShadow: '0 30px 60px rgba(21,22,26,0.08)',
        }}>
          <HeroCarousel />
        </div>
      </div>

      <style>{`
        .carousel-height-box {
          height: 72vh;
          min-height: 480px;
          max-height: 700px;
        }

        @media (max-width: 900px) {
          section {
            grid-template-columns: 1fr !important;
            padding: 120px 1.5rem 32px 1.5rem !important;
            gap: 2.5rem !important;
            align-items: start !important;
          }
          .hero-left {
            padding-top: 1rem;
          }
          .hero-right {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          .carousel-height-box {
            height: 95vw !important;
            min-height: 340px !important;
            max-height: 520px !important;
            padding: 1rem !important;
          }
        }
      `}</style>
    </section>
  )
}
'@ }
$files += @{ Path = 'src\app\components\Navbar.tsx'; Content = @'
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
'@ }
$files += @{ Path = 'src\app\components\VideoShowcase.tsx'; Content = @'
'use client'

// ── Video config ─────────────────────────────────────────────────────────────
const SHOW_VIDEO  = true
const VIDEO_SRC   = 'https://cdn.livereselling.com/videos/Untitled_Video.mp4'
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  mode?: 'embed' | 'bg'
}

export default function VideoShowcase({ mode = 'embed' }: Props) {
  if (!SHOW_VIDEO) return null

  return (
    <section id="work">

      <div className="vs-outer">

        {/* ── Left: text ── */}
        <div className="vs-text">
          <span className="dfy-eyebrow vs-eyebrow">See It In Action</span>
          <h2 className="vs-heading">
            Built by us.<br />
            <em>Owned by you.</em>
          </h2>
          <p className="vs-body">
            Watch how we go from strategy call to a fully deployed AI system
            running inside a real business — no fluff, just the work.
          </p>
        </div>

        {/* ── Right: video ── */}
        <div className="vs-video-col">
          <div className="vs-shell">
            <div className="vs-chrome">
              <span className="vs-dot" /><span className="vs-dot" /><span className="vs-dot" />
              <span className="vs-url">doneforyouai.com</span>
            </div>

            <div className="vs-frame">
              <video
                controls
                playsInline
                className="vs-player"
                preload="metadata"
                poster="https://cdn.livereselling.com/item-images/image%20-%202026-05-31T094738.323.png"
              >
                <source src={VIDEO_SRC} type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="vs-caption">
            <span className="vs-caption-label">DoneForYouAI · Welcome</span>
            <span className="vs-caption-url">doneforyouai.com</span>
          </div>
        </div>

      </div>

      <style>{`
        #work {
          background: var(--bg);
        }

        .vs-outer {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          align-items: center;
          gap: 4rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 7rem 2rem;
        }

        .vs-text {
          display: flex;
          flex-direction: column;
        }

        .vs-eyebrow {
          color: var(--accent);
          margin-bottom: 1.25rem;
        }

        .vs-heading {
          font-size: clamp(2.2rem, 3.6vw, 3.4rem);
          line-height: 1.04;
          color: var(--text);
          margin: 0 0 1.5rem 0;
        }

        .vs-heading em {
          color: var(--accent);
        }

        .vs-body {
          font-family: var(--f-body);
          font-size: 1.1rem;
          color: var(--text-2);
          line-height: 1.65;
          margin: 0;
        }

        .vs-video-col {
          position: relative;
        }

        .vs-shell {
          background: var(--text);
          border-radius: 24px;
          padding: 12px;
          box-shadow: 0 40px 80px rgba(21, 22, 26, 0.22);
        }

        .vs-chrome {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px 12px;
        }

        .vs-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #4A4B52;
          display: inline-block;
        }

        .vs-url {
          margin-left: 12px;
          padding: 5px 16px;
          border-radius: 999px;
          background: #26272D;
          color: #C9C9CF;
          font-family: var(--f-body);
          font-size: 0.78rem;
          font-weight: 500;
        }

        .vs-frame {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          background: #000;
          border-radius: 14px;
        }

        /* Mask a thin edge line baked into the video file (top + bottom) */
        .vs-frame::before,
        .vs-frame::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 6px;
          background: var(--text);
          z-index: 2;
          pointer-events: none;
        }
        .vs-frame::before { top: 0; }
        .vs-frame::after  { bottom: 0; }

        .vs-player {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          border: none !important;
          display: block !important;
        }

        .vs-caption {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1rem;
          padding: 0 0.5rem;
        }

        .vs-caption-label {
          font-family: var(--f-body);
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-3);
        }

        .vs-caption-url {
          font-family: var(--f-body);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--accent);
        }

        @media (max-width: 900px) {
          .vs-outer {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 1.5rem 0 4rem;
          }
          .vs-text { padding: 0 1.25rem; }
        }

        /* ── MOBILE: stacked, video first, edge to edge ── */
        @media (max-width: 768px) {
          .vs-video-col {
            order: -1;
            width: 100%;
          }
          .vs-chrome { display: none; }
          .vs-caption { display: none; }
          .vs-shell { padding: 0; border-radius: 0; box-shadow: none; }
          .vs-frame { border-radius: 0; }
          .vs-heading {
            font-size: clamp(1.9rem, 8vw, 2.4rem);
            margin-bottom: 0.75rem;
          }
        }
      `}</style>
    </section>
  )
}
'@ }
$files += @{ Path = 'src\app\login\page.tsx'; Content = @'
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
'@ }
foreach ($f in $files) {
  $target = Join-Path (Get-Location) $f.Path
  $dir = Split-Path -Parent $target
  if (-not (Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
  [System.IO.File]::WriteAllText($target, ($f.Content -replace "`r?`n", "`r`n"), $utf8NoBom)
  Write-Host "Wrote $($f.Path)"
}
git add src
git commit -m "Mobile fixes: tighter video gap, edge-to-edge video, faster carousel, menu padding, restyle login"
git push origin master
