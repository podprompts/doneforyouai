'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const MUX_PLAYBACK_ID = process.env.NEXT_PUBLIC_HERO_MUX_PLAYBACK_ID || ''

const projects = [
  { id: 1, name: 'DoneForYouAI.com',        url: 'doneforyouai.com',      href: 'https://doneforyouai.com',      tag: 'AI Services',         screenshot: '/screenshots/doneforyouai.png',      light: false },
  { id: 2, name: 'AINewsClips.com',       url: 'ainewsclips.com',       href: 'https://ainewsclips.com',       tag: 'Media',               screenshot: '/screenshots/ainewsclips.png',       light: false },
  { id: 3, name: 'LiveReselling.com',      url: 'livereselling.com',     href: 'https://livereselling.com',     tag: 'Live Commerce',       screenshot: '/screenshots/livereselling.png',     light: true  },
  { id: 4, name: 'UGCAffiliates.com',      url: 'ugcaffiliates.com',     href: 'https://ugcaffiliates.com',     tag: 'Marketplace',         screenshot: '/screenshots/ugcaffiliates.png',     light: true  },
  { id: 5, name: 'AIPrintOnDemand.com',  url: 'aiprintondemand.com',   href: 'https://aiprintondemand.com',   tag: 'AI + E-commerce',     screenshot: '/screenshots/aipod.png',             light: true  },
  { id: 6, name: 'VintageGarageSale.com', url: 'vintagegaragesale.com', href: 'https://vintagegaragesale.com', tag: 'Marketplace',         screenshot: '/screenshots/vintagegaragesale.png', light: false },
  { id: 7, name: 'AIDigitalProducts.com', url: 'aidigitalproducts.com', href: 'https://aidigitalproducts.com', tag: 'Digital Marketplace', screenshot: '/screenshots/aidigitalproducts.png', light: true  },
  { id: 8, name: 'HomeServiceAgents.com', url: 'homeserviceagents.com', href: 'https://homeserviceagents.com', tag: 'AI + Home Services',  screenshot: '/screenshots/homeserviceagents.png', light: true  },
]

const CLONES = 3
const total  = projects.length
const cloned = [...projects.slice(total - CLONES), ...projects, ...projects.slice(0, CLONES)]
const OFFSET = CLONES

function HeroCarousel() {
  const [index,    setIndex]    = useState(OFFSET)
  const [animated, setAnimated] = useState(true)
  const [slideW,   setSlideW]   = useState(0)   // actual px width of one slide
  const [dragDelta, setDragDelta] = useState(0)

  const dragStartRef  = useRef<number | null>(null)
  const dragDeltaRef  = useRef(0)
  const isDraggingRef = useRef(false)
  const autoRef       = useRef<ReturnType<typeof setInterval> | null>(null)
  const jumpRef       = useRef(false)
  const viewportRef   = useRef<HTMLDivElement>(null)  // the clipping viewport

  const realIndex = ((index - OFFSET) % total + total) % total

  /* Measure the viewport width → that's one slide width */
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
    autoRef.current = setInterval(() => { setIndex(i => i + 1); setAnimated(true) }, 3500)
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

  /* px-based offset — works correctly on every screen size */
  const offsetPx = slideW > 0 ? -(index * slideW) + dragDelta : 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: '0.9rem', fontWeight: 400,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--coral)', display: 'block', marginBottom: '0.25rem',
          }}>What we've built</span>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: '0.65rem',
            color: 'rgba(15,15,14,0.4)', letterSpacing: '0.08em',
          }}>{String(realIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[{ fn: handlePrev, label: '←' }, { fn: handleNext, label: '→' }].map(({ fn, label }) => (
            <button key={label} onClick={fn} style={{
              fontFamily: 'var(--mono)', fontSize: '0.8rem', background: 'transparent',
              border: '1px solid rgba(15,15,14,0.2)', color: '#0f0f0e',
              width: 32, height: 32, display: 'flex', alignItems: 'center',
              justifyContent: 'center', cursor: 'pointer', transition: 'border-color 0.2s', flexShrink: 0,
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--coral)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(15,15,14,0.2)'}
            >{label}</button>
          ))}
        </div>
      </div>

      {/* Viewport — clips overflow, measures slide width */}
      <div
        ref={viewportRef}
        style={{ flex: 1, overflow: 'hidden', position: 'relative', cursor: dragDelta !== 0 ? 'grabbing' : 'grab', userSelect: 'none', minHeight: 0 }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/*
          Track: px-wide row of all slides.
          slideW > 0 guard prevents a flash before measurement.
        */}
        {slideW > 0 && (
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            width: `${slideW * cloned.length}px`,   // exact px total width
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
                    width: `${slideW}px`,   // exact px per slide
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
                      borderRadius: '10px', overflow: 'hidden',
                      border: isActive ? '1px solid rgba(232,82,26,0.35)' : '1px solid rgba(15,15,14,0.12)',
                      boxShadow: isActive ? '0 12px 40px rgba(0,0,0,0.1)' : '0 2px 12px rgba(0,0,0,0.05)',
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
          <span style={{ fontFamily: 'var(--serif)', fontSize: '1rem', fontWeight: 400, color: '#0f0f0e' }}>{p.name}</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.5rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0f0f0e', border: '1px solid var(--coral-border)', padding: '0.1rem 0.4rem', flexShrink: 0, background: 'rgba(232,82,26,0.06)' }}>{p.tag}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          {projects.map((_, i) => (
            <button key={i} onClick={() => { goTo(i + OFFSET); resetAuto() }}
              style={{ width: i === realIndex ? 16 : 5, height: 5, borderRadius: 3, background: i === realIndex ? 'var(--coral)' : 'rgba(15,15,14,0.18)', border: 'none', padding: 0, cursor: 'pointer', transition: 'all 0.3s' }}
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
      gap: '3rem',
      padding: '120px 2.5rem 80px 4rem',
      position: 'relative',
      overflow: 'hidden',
      background: '#f5f4f0',
      borderBottom: '1px solid rgba(15,15,14,0.1)',
    }}>

      {/* Subtle accent */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(232,82,26,0.06) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '38vw', height: '38vw', borderTop: '1px solid rgba(15,15,14,0.06)', borderLeft: '1px solid rgba(15,15,14,0.06)' }} />
      </div>

      {/* Left */}
      <div style={{ position: 'relative', zIndex: 1, minWidth: 0 }}>
        <div className="animate-fade-up delay-1" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
          fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--coral)', marginBottom: '2rem',
          border: '1px solid var(--coral-border)', padding: '0.4rem 0.9rem', width: 'fit-content',
        }}>
          <span style={{ width: 5, height: 5, background: 'var(--coral)', borderRadius: '50%', animation: 'pulse-dot 2s infinite' }} />
          AI Implementation Partner
        </div>

        <h1 className="animate-fade-up delay-2" style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(3.5rem, 5.5vw, 6rem)',
          fontWeight: 400, lineHeight: 1.06,
          letterSpacing: '-0.01em', color: '#0f0f0e',
        }}>
          Your business.<br />
          <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>Powered by AI.</em><br />
          Done for you.
        </h1>

        <p className="animate-fade-up delay-3" style={{
          marginTop: '1.75rem', fontSize: '0.9rem',
          color: 'rgba(15,15,14,0.55)', lineHeight: 1.75, maxWidth: '36ch',
        }}>
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
            style={{ fontFamily: 'var(--sans)', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', color: 'rgba(15,15,14,0.45)', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#0f0f0e'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(15,15,14,0.45)'}
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
        <div className="carousel-height-box">
          <HeroCarousel />
        </div>
      </div>

      <style>{`
        .carousel-height-box {
          height: 72vh;
          min-height: 460px;
          max-height: 680px;
        }

        @media (max-width: 768px) {
          section {
            grid-template-columns: 1fr !important;
            padding: 100px 1.5rem 60px 1.5rem !important;
            gap: 2rem !important;
            align-items: start !important;
          }
          .hero-right {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          .carousel-height-box {
            height: 85vw !important;
            min-height: 320px !important;
            max-height: 480px !important;
          }
        }
      `}</style>
    </section>
  )
}