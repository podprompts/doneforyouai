'use client'
import { useState, useEffect, useRef } from 'react'
const audiences = [
  { label: 'Agency Owners' },
  { label: 'E-Commerce Brands' },
  { label: 'Service Businesses' },
  { label: 'Consultants & Coaches' },
  { label: 'B2B Companies' },
  { label: 'Real Estate Professionals' },
  { label: 'Healthcare Practices' },
  { label: 'Professional Services' },
  { label: 'SaaS Startups' },
  { label: 'Local Businesses' },
  { label: 'Handmade Businesses' },
  { label: 'Small Businesses' },
  { label: 'Coaches & Course Creators' },
  { label: 'Restaurants & Hospitality' },
]
export default function Audience() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)
  const perPage = 3
  const total = Math.ceil(audiences.length / perPage)
  const next = () => setCurrent(c => (c + 1) % total)
  const prev = () => setCurrent(c => (c - 1 + total) % total)
  useEffect(() => {
    timerRef.current = setInterval(next, 3000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])
  const pause = () => { if (timerRef.current) clearInterval(timerRef.current) }
  const resume = () => { timerRef.current = setInterval(next, 3000) }
  const visible = audiences.slice(current * perPage, current * perPage + perPage)
  return (
    <section style={{ background: '#f5f4f0', padding: '6rem 2.5rem', borderTop: '1px solid rgba(15,15,14,0.1)', borderBottom: '1px solid rgba(15,15,14,0.1)' }}>
      <style>{\
        .aud-card { background:#ffffff; border:1px solid rgba(15,15,14,0.1); border-radius:10px; padding:1.25rem; display:flex; align-items:center; gap:0.75rem; transition:border-color 0.2s,box-shadow 0.2s,transform 0.2s; cursor:default; flex:1; }
        .aud-card:hover { border-color:#e8521a; box-shadow:0 4px 20px rgba(232,82,26,0.1); transform:translateY(-2px); }
        .aud-dot { width:8px; height:8px; border-radius:50%; background:rgba(15,15,14,0.15); border:none; cursor:pointer; padding:0; transition:background 0.2s; }
        .aud-dot.active { background:#e8521a; }
        .aud-arrow { background:transparent; border:1px solid rgba(15,15,14,0.15); border-radius:50%; width:36px; height:36px; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:0.9rem; color:rgba(15,15,14,0.5); transition:border-color 0.2s,color 0.2s; flex-shrink:0; }
        .aud-arrow:hover { border-color:#e8521a; color:#e8521a; }
      \}</style>
      <div style={{ marginBottom: '3rem' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: '0.75rem' }}>Who we work with</span>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 400, lineHeight: 1.1, color: '#0f0f0e', letterSpacing: '-0.02em', margin: 0 }}>
          Moving your business{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>forward with AI.</em>
        </h2>
      </div>
      <div onMouseEnter={pause} onMouseLeave={resume}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
          <button className="aud-arrow" onClick={prev}>&#8592;</button>
          <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
            {visible.map((a) => (
              <div key={a.label} className="aud-card">
                <span style={{ color: 'var(--coral)', fontSize: '0.6rem', flexShrink: 0 }}>&#9670;</span>
                <span style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', fontWeight: 500, color: '#0f0f0e', lineHeight: 1.3 }}>{a.label}</span>
              </div>
            ))}
          </div>
          <button className="aud-arrow" onClick={next}>&#8594;</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
          {Array.from({ length: total }).map((_, i) => (
            <button key={i} className={'aud-dot' + (i === current ? ' active' : '')} onClick={() => setCurrent(i)} />
          ))}
        </div>
      </div>
    </section>
  )
}
