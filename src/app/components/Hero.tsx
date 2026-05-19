'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

const MUX_PLAYBACK_ID = process.env.NEXT_PUBLIC_HERO_MUX_PLAYBACK_ID || ''

const projects = [
  { id: 1, name: 'DoneForYouAI',        url: 'doneforyouai.com',      href: 'https://doneforyouai.com',      tag: 'AI Services',         screenshot: '/screenshots/doneforyouai.png',      light: false },
  { id: 2, name: 'AI News Clips',       url: 'ainewsclips.com',       href: 'https://ainewsclips.com',       tag: 'Media',               screenshot: '/screenshots/ainewsclips.png',       light: false },
  { id: 3, name: 'LiveReselling',       url: 'livereselling.com',     href: 'https://livereselling.com',     tag: 'Live Commerce',       screenshot: '/screenshots/livereselling.png',     light: true  },
  { id: 4, name: 'UGC Affiliates',      url: 'ugcaffiliates.com',     href: 'https://ugcaffiliates.com',     tag: 'Marketplace',         screenshot: '/screenshots/ugcaffiliates.png',     light: true  },
  { id: 5, name: 'AI Print on Demand',  url: 'aiprintondemand.com',   href: 'https://aiprintondemand.com',   tag: 'AI + E-commerce',     screenshot: '/screenshots/aipod.png',             light: true  },
  { id: 6, name: 'Vintage Garage Sale', url: 'vintagegaragesale.com', href: 'https://vintagegaragesale.com', tag: 'Marketplace',         screenshot: '/screenshots/vintagegaragesale.png', light: false },
  { id: 7, name: 'AI Digital Products', url: 'aidigitalproducts.com', href: 'https://aidigitalproducts.com', tag: 'Digital Marketplace', screenshot: '/screenshots/aidigitalproducts.png', light: true  },
  { id: 8, name: 'Home Service Agents', url: 'homeserviceagents.com', href: 'https://homeserviceagents.com', tag: 'AI + Home Services',  screenshot: '/screenshots/homeserviceagents.png', light: true  },
]

const CLONES = 3
const total  = projects.length
const cloned = [...projects.slice(total - CLONES), ...projects, ...projects.slice(0, CLONES)]
const OFFSET = CLONES

function HeroCarousel() {
  const [index,      setIndex]      = useState(OFFSET)
  const [animated,   setAnimated]   = useState(true)
  const [dragStart,  setDragStart]  = useState<number | null>(null)
  const [dragDelta,  setDragDelta]  = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const autoRef  = useRef<ReturnType<typeof setInterval> | null>(null)
  const jumpRef  = useRef(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const realIndex = ((index - OFFSET) % total + total) % total

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
    autoRef.current = setInterval(() => { setIndex(i => i + 1); setAnimated(true) }, 3500)
  }, [])

  useEffect(() => {
    resetAuto()
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [resetAuto])

  const handlePrev = () => { goTo(index - 1); resetAuto() }
  const handleNext = () => { goTo(index + 1); resetAuto() }

  const onPointerDown = (e: React.PointerEvent) => {
    setDragStart(e.clientX); setDragDelta(0); setIsDragging(false)
    trackRef.current?.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStart === null) return
    const d = e.clientX - dragStart
    setDragDelta(d)
    if (Math.abs(d) > 5) setIsDragging(true)
  }
  const onPointerUp = () => {
    if (dragStart === null) return
    if (dragDelta < -50) handleNext()
    else if (dragDelta > 50) handlePrev()
    setDragStart(null); setDragDelta(0); setIsDragging(false)
  }

  const p = cloned[index]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: '0.2rem' }}>What we've built</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', color: 'rgba(247,245,240,0.25)', letterSpacing: '0.08em' }}>{String(realIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {[{ fn: handlePrev, label: '←' }, { fn: handleNext, label: '→' }].map(({ fn, label }) => (
            <button key={label} onClick={fn} style={{ width: 32, height: 32, borderRadius: '50%', background: 'transparent', border: '1px solid var(--border-dark)', color: 'rgba(247,245,240,0.4)', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s', fontFamily: 'var(--mono)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--coral)'; e.currentTarget.style.color = 'var(--coral)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-dark)'; e.currentTarget.style.color = 'rgba(247,245,240,0.4)' }}
            >{label}</button>
          ))}
          <Link href="/work" style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.3)', textDecoration: 'none', marginLeft: '0.25rem', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--coral)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(247,245,240,0.3)'}
          >All →</Link>
        </div>
      </div>

      {/* Carousel track */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', minHeight: 0 }}>
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{
            display: 'flex',
            gap: '12px',
            height: '100%',
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
            transform: `translateX(calc(-${index} * (88% + 12px) + ${isDragging ? dragDelta : 0}px))`,
            transition: animated && !isDragging ? 'transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
            willChange: 'transform',
          }}
        >
          {cloned.map((proj, i) => {
            const isActive = i === index
            return (
              <div key={`${proj.id}-${i}`} style={{ flexShrink: 0, width: '88%', height: '100%', opacity: isActive ? 1 : 0.4, transform: isActive ? 'scale(1)' : 'scale(0.97)', transition: 'opacity 0.4s, transform 0.4s' }}>
                <a href={proj.href} target="_blank" rel="noopener noreferrer"
                  onClick={e => { if (isDragging || Math.abs(dragDelta) > 8) e.preventDefault() }}
                  style={{ display: 'block', textDecoration: 'none', height: '100%' }}
                >
                  <div style={{ borderRadius: '10px', overflow: 'hidden', border: isActive ? '1px solid rgba(232,82,26,0.3)' : '1px solid var(--border-dark)', boxShadow: isActive ? '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,82,26,0.1)' : '0 8px 24px rgba(0,0,0,0.3)', transition: 'box-shadow 0.4s, border-color 0.4s', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* Chrome bar */}
                    <div style={{ height: 30, background: '#222', display: 'flex', alignItems: 'center', padding: '0 10px', gap: '5px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57', flexShrink: 0 }} />
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e', flexShrink: 0 }} />
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840', flexShrink: 0 }} />
                      <div style={{ flex: 1, height: 16, background: '#333', borderRadius: 3, margin: '0 6px', display: 'flex', alignItems: 'center', paddingLeft: 7, fontFamily: 'monospace', fontSize: '0.52rem', color: '#666', overflow: 'hidden', whiteSpace: 'nowrap' }}>{proj.url}</div>
                    </div>
                    {/* Screenshot — fills remaining height */}
                    <div style={{ flex: 1, background: proj.light ? '#f0f0f0' : '#1a1a1a', overflow: 'hidden' }}>
                      <img src={proj.screenshot} alt={proj.name} draggable={false}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', filter: isActive ? 'none' : 'brightness(0.5) saturate(0.6)', transition: 'filter 0.4s' }}
                        onError={e => {
                          const el = e.currentTarget.parentElement!
                          e.currentTarget.style.display = 'none'
                          el.style.display = 'flex'; el.style.alignItems = 'center'; el.style.justifyContent = 'center'
                          el.innerHTML = `<span style="font-family:monospace;font-size:0.65rem;color:rgba(255,255,255,0.2);letter-spacing:0.1em;text-transform:uppercase">${proj.url}</span>`
                        }}
                      />
                    </div>
                  </div>
                </a>
              </div>
            )
          })}
        </div>
      </div>

      {/* Card info + dots */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <span style={{ fontFamily: 'var(--serif)', fontSize: '1rem', fontWeight: 400, color: 'var(--page)' }}>{p.name}</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.5rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--coral)', border: '1px solid var(--coral-border)', padding: '0.1rem 0.4rem', flexShrink: 0 }}>{p.tag}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          {projects.map((_, i) => (
            <button key={i} onClick={() => { goTo(i + OFFSET); resetAuto() }}
              style={{ width: i === realIndex ? 16 : 5, height: 5, borderRadius: 3, background: i === realIndex ? 'var(--coral)' : 'rgba(247,245,240,0.15)', border: 'none', padding: 0, cursor: 'pointer', transition: 'all 0.3s' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const hasVideo = Boolean(MUX_PLAYBACK_ID)

  return (
    <section style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',  /* strict 50/50 */
      alignItems: 'center',
      gap: '3rem',
      padding: '120px 2.5rem 80px',
      position: 'relative',
      overflow: 'hidden',
      borderBottom: '1px solid var(--border-dark)',
    }}>

      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        {hasVideo ? (
          <>
            <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.28 }}>
              <source src={`https://stream.mux.com/${MUX_PLAYBACK_ID}.m3u8`} type="application/x-mpegURL" />
              <source src={`https://stream.mux.com/${MUX_PLAYBACK_ID}/high.mp4`} type="video/mp4" />
            </video>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,15,14,0.88) 0%, rgba(15,15,14,0.65) 50%, rgba(15,15,14,0.82) 100%)' }} />
          </>
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 20% 50%, rgba(232,82,26,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(247,245,240,0.03) 0%, transparent 40%), var(--ink)` }} />
        )}
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '38vw', height: '38vw', borderTop: '1px solid rgba(255,255,255,0.06)', borderLeft: '1px solid rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 60, left: 0, width: '22vw', height: '22vw', borderBottom: '1px solid rgba(255,255,255,0.04)', borderRight: '1px solid rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
      </div>

      {/* Left — copy — constrained so it doesn't bleed into right column */}
      <div style={{ position: 'relative', zIndex: 1, minWidth: 0 }}>
        <div className="animate-fade-up delay-1" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '2rem', border: '1px solid var(--coral-border)', padding: '0.4rem 0.9rem', width: 'fit-content' }}>
          <span style={{ width: 5, height: 5, background: 'var(--coral)', borderRadius: '50%', animation: 'pulse-dot 2s infinite' }} />
          AI Implementation Partner
        </div>

        <h1 className="animate-fade-up delay-2" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.4rem, 4.5vw, 5rem)', fontWeight: 400, lineHeight: 1.06, letterSpacing: '-0.01em' }}>
          Your business.<br />
          <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>Powered by AI.</em><br />
          Done for you.
        </h1>

        <p className="animate-fade-up delay-3" style={{ marginTop: '1.75rem', fontSize: '0.9rem', color: 'rgba(247,245,240,0.5)', lineHeight: 1.75, maxWidth: '36ch' }}>
          We build and deploy custom AI systems inside your business — automations, assistants, content engines, and more. You stay focused on running the show.
        </p>

        <div className="animate-fade-up delay-4" style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ fontFamily: 'var(--sans)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--coral)', color: '#fff', border: 'none', padding: '0.9rem 1.75rem', cursor: 'pointer', transition: 'opacity 0.2s, transform 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
          >Book a Free Strategy Call</button>
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ fontFamily: 'var(--sans)', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', color: 'rgba(247,245,240,0.48)', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--page)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(247,245,240,0.48)'}
          >See Services <span>↓</span></button>
        </div>
      </div>

      {/* Right — carousel — strict 50% with explicit height */}
      <div className="animate-fade-in delay-5 hero-right" style={{
        position: 'relative', zIndex: 1,
        minWidth: 0,           /* prevents flex blowout */
        alignSelf: 'stretch',  /* full section height */
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '1rem',
        paddingBottom: '1rem',
      }}>
        {/* Inner fixed-height box so carousel has a known container */}
        <div style={{ height: '62vh', minHeight: 380, maxHeight: 580 }}>
          <HeroCarousel />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section {
            grid-template-columns: 1fr !important;
            padding: 100px 1.25rem 60px !important;
            gap: 2.5rem !important;
          }
          /* Mobile: tall screenshot — roughly 70vw so the image is prominent */
          .hero-right > div {
            height: 70vw !important;
            min-height: 320px !important;
            max-height: 520px !important;
          }
        }
      `}</style>
    </section>
  )
}