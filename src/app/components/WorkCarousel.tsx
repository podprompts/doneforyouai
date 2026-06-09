'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'

const projects = [
  { id: 1, name: 'DoneForYouAI',         url: 'doneforyouai.com',       href: 'https://doneforyouai.com',       tag: 'AI Services',         description: 'AI implementation agency with expert marketplace and operator network.',                                         screenshot: '/screenshots/doneforyouai.png',       light: false },
  { id: 2, name: 'AI News Clips',         url: 'ainewsclips.com',        href: 'https://ainewsclips.com',        tag: 'Media',               description: 'AI news publication covering tech, agents, jobs, and innovation.',                                                screenshot: '/screenshots/ainewsclips.png',        light: false },
  { id: 3, name: 'Live Reselling',        url: 'livereselling.com',      href: 'https://livereselling.com',      tag: 'Live Commerce',       description: 'Live-stream reselling platform. Go live, drop items, buyers claim in real time.',                                 screenshot: '/screenshots/livereselling.png',      light: true  },
  { id: 4, name: 'UGC Affiliates',        url: 'ugcaffiliates.com',      href: 'https://ugcaffiliates.com',      tag: 'Marketplace',         description: 'Affiliate marketplace connecting UGC creators with vendors.',                                                     screenshot: '/screenshots/ugcaffiliates.png',      light: true  },
  { id: 5, name: 'AI Print on Demand',    url: 'aiprintondemand.com',    href: 'https://aiprintondemand.com',    tag: 'AI + E-commerce',     description: 'Generate AI designs and push them directly to Printify products — instantly.',                                     screenshot: '/screenshots/aipod.png',              light: true  },
  { id: 6, name: 'Vintage Garage Sale',   url: 'vintagegaragesale.com',  href: 'https://vintagegaragesale.com',  tag: 'Marketplace',         description: 'Curated vintage & thrifted marketplace. Buy now or name your price.',                                              screenshot: '/screenshots/vintagegaragesale.png',  light: false },
  { id: 7, name: 'AI Digital Products',   url: 'aidigitalproducts.com',  href: 'https://aidigitalproducts.com',  tag: 'Digital Marketplace', description: 'Ready-made AI products that work out of the box. Deployed in minutes.',                                            screenshot: '/screenshots/aidigitalproducts.png',  light: true  },
  { id: 8, name: 'Home Service Agents',   url: 'homeserviceagents.com',  href: 'https://homeserviceagents.com',  tag: 'AI + Home Services',  description: 'AI matches homeowners with vetted agents for home services — instantly.',                                          screenshot: '/screenshots/homeserviceagents.png',  light: true  },
  { id: 9, name: 'Free AI Receptionist',  url: 'freeaireceptionist.com', href: 'https://freeaireceptionist.com', tag: 'Voice AI',            description: 'AI receptionist that answers calls 24/7 — captures leads, books appointments, and routes callers automatically.',   screenshot: '/screenshots/freeaireceptionist.png', light: true  },
]

const CLONES = 3
const total = projects.length

const clonedProjects = [
  ...projects.slice(total - CLONES),
  ...projects,
  ...projects.slice(0, CLONES),
]

const OFFSET = CLONES

export default function WorkCarousel() {
  const [index, setIndex] = useState(OFFSET)
  const [animated, setAnimated] = useState(true)
  const [dragStart, setDragStart] = useState<number | null>(null)
  const [dragDelta, setDragDelta] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const jumpRef = useRef(false)

  const realIndex = ((index - OFFSET) % total + total) % total

  const goTo = useCallback((newIndex: number, withAnimation = true) => {
    setAnimated(withAnimation)
    setIndex(newIndex)
  }, [])

  const next = useCallback(() => goTo(index + 1), [index, goTo])
  const prev = useCallback(() => goTo(index - 1), [index, goTo])

  useEffect(() => {
    if (!animated) return
    const timer = setTimeout(() => {
      if (index >= total + OFFSET) {
        jumpRef.current = true
        goTo(index - total, false)
      } else if (index < OFFSET) {
        jumpRef.current = true
        goTo(index + total, false)
      }
    }, 450)
    return () => clearTimeout(timer)
  }, [index, animated, goTo])

  useEffect(() => {
    if (!animated && jumpRef.current) {
      const t = setTimeout(() => {
        setAnimated(true)
        jumpRef.current = false
      }, 20)
      return () => clearTimeout(t)
    }
  }, [animated])

  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => {
      setIndex(i => i + 1)
      setAnimated(true)
    }, 4000)
  }, [])

  useEffect(() => {
    resetAuto()
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [resetAuto])

  const handlePrev = () => { prev(); resetAuto() }
  const handleNext = () => { next(); resetAuto() }
  const handleDot  = (i: number) => { goTo(i + OFFSET); resetAuto() }

  const onPointerDown = (e: React.PointerEvent) => {
    setDragStart(e.clientX)
    setDragDelta(0)
    setIsDragging(false)
    trackRef.current?.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStart === null) return
    const delta = e.clientX - dragStart
    setDragDelta(delta)
    if (Math.abs(delta) > 5) setIsDragging(true)
  }
  const onPointerUp = () => {
    if (dragStart === null) return
    if (dragDelta < -50) handleNext()
    else if (dragDelta > 50) handlePrev()
    setDragStart(null)
    setDragDelta(0)
    setIsDragging(false)
  }

  const cardW = 'min(72vw, 640px)'
  const gap = 'clamp(0.75rem, 2vw, 1.25rem)'

  return (
    <section style={{
      background: 'var(--ink)',
      borderTop: '1px solid var(--border-dark)',
      borderBottom: '1px solid var(--border-dark)',
      padding: 'clamp(3rem, 7vw, 5rem) 0',
      overflow: 'hidden',
    }}>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        padding: '0 clamp(1.25rem, 5vw, 3rem)',
        marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
        gap: '1rem',
      }}>
        <div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: '0.75rem' }}>
            What we've built
          </span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 400, color: 'var(--page)', lineHeight: 1.1 }}>
            From idea to<br />
            <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>live product.</em>
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[{ label: '←', fn: handlePrev }, { label: '→', fn: handleNext }].map(({ label, fn }) => (
              <button key={label} onClick={fn} style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'transparent', border: '1px solid var(--border-dark)',
                color: 'rgba(247,245,240,0.5)', fontFamily: 'var(--mono)',
                fontSize: '0.85rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--coral)'; e.currentTarget.style.color = 'var(--coral)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-dark)'; e.currentTarget.style.color = 'rgba(247,245,240,0.5)' }}
              >{label}</button>
            ))}
          </div>
          <Link href="/work" style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--coral)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(247,245,240,0.35)'}
          >View all →</Link>
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          display: 'flex',
          gap,
          paddingLeft: 'clamp(1.25rem, 5vw, 3rem)',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          transform: `translateX(calc(-${index} * (${cardW} + ${gap}) + ${isDragging ? dragDelta : 0}px))`,
          transition: animated && !isDragging ? 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
          willChange: 'transform',
        }}
      >
        {clonedProjects.map((p, i) => {
          const isActive = i === index
          return (
            <div
              key={`${p.id}-${i}`}
              style={{
                flexShrink: 0,
                width: cardW,
                transition: 'transform 0.4s ease, opacity 0.4s ease',
                transform: isActive ? 'scale(1)' : 'scale(0.97)',
                opacity: isActive ? 1 : 0.45,
              }}
            >
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => { if (isDragging || Math.abs(dragDelta) > 8) e.preventDefault() }}
                style={{ display: 'block', textDecoration: 'none' }}
              >
                <div style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: isActive ? '1px solid rgba(232,82,26,0.3)' : '1px solid var(--border-dark)',
                  boxShadow: isActive
                    ? '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(232,82,26,0.1)'
                    : '0 8px 24px rgba(0,0,0,0.3)',
                  transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
                }}>
                  <div style={{ height: 34, background: '#222', display: 'flex', alignItems: 'center', padding: '0 12px', gap: '6px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff5f57', flexShrink: 0 }} />
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#febc2e', flexShrink: 0 }} />
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28c840', flexShrink: 0 }} />
                    <div style={{ flex: 1, height: 18, background: '#333', borderRadius: 4, margin: '0 8px', display: 'flex', alignItems: 'center', paddingLeft: 8, fontFamily: 'monospace', fontSize: '0.58rem', color: '#666', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {p.url}
                    </div>
                  </div>
                  <div style={{ width: '100%', aspectRatio: '16/9', background: p.light ? '#f0f0f0' : '#1a1a1a', overflow: 'hidden' }}>
                    <img
                      src={p.screenshot}
                      alt={p.name}
                      draggable={false}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', filter: isActive ? 'none' : 'brightness(0.55) saturate(0.6)', transition: 'filter 0.4s ease' }}
                      onError={e => {
                        const el = e.currentTarget.parentElement!
                        e.currentTarget.style.display = 'none'
                        el.style.display = 'flex'; el.style.alignItems = 'center'; el.style.justifyContent = 'center'
                        el.innerHTML = `<span style="font-family:monospace;font-size:0.7rem;color:rgba(255,255,255,0.2);letter-spacing:0.12em;text-transform:uppercase">${p.url}</span>`
                      }}
                    />
                  </div>
                </div>

                <div style={{ padding: '1rem 0.25rem 0', opacity: isActive ? 1 : 0.2, transition: 'opacity 0.4s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.35rem' }}>
                    <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 400, color: 'var(--page)', lineHeight: 1 }}>{p.name}</h3>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.52rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--coral)', border: '1px solid var(--coral-border)', padding: '0.12rem 0.45rem', whiteSpace: 'nowrap', flexShrink: 0 }}>{p.tag}</span>
                  </div>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', color: 'rgba(247,245,240,0.45)', lineHeight: 1.6 }}>{p.description}</p>
                </div>
              </a>
            </div>
          )
        })}
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: 'clamp(1.5rem, 3vw, 2rem)', padding: '0 clamp(1.25rem, 5vw, 3rem)' }}>
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDot(i)}
            style={{
              width: i === realIndex ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i === realIndex ? 'var(--coral)' : 'rgba(247,245,240,0.15)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </section>
  )
}