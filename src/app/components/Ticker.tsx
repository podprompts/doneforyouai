'use client'

import { useEffect, useRef } from 'react'

const items = [
  'AI Automation', 'Custom Chatbots', 'Content Systems',
  'Lead Generation', 'AI Strategy', 'Tool Stack Setup',
  'Done For You', 'Workflow Design', 'Prompt Engineering',
]

const repeated = [...items, ...items, ...items]

// Pixels per second — identical perceived speed on all screen sizes
const PX_PER_SECOND = 80

export default function Ticker() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const measure = () => {
      const oneSetWidth = el.scrollWidth / 3
      const duration = oneSetWidth / PX_PER_SECOND
      el.style.setProperty('--ticker-duration', `${duration}s`)
    }

    measure()
    if (document.fonts?.ready) document.fonts.ready.then(measure)

    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div style={{
      background: 'var(--ink)',
      borderBottom: '1px solid var(--border-dark)',
      borderTop: '1px solid var(--border-dark)',
      padding: '1.1rem 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          width: 'max-content',
          animation: 'ticker-px var(--ticker-duration, 20s) linear infinite',
        }}
      >
        {repeated.map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: '1.5rem',
            fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'rgba(247,245,240,0.25)',
            paddingRight: '1.5rem',
            whiteSpace: 'nowrap',
          }}>
            {item}
            <span style={{ color: 'var(--coral)', fontSize: '0.5rem' }}>◆</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker-px {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  )
}