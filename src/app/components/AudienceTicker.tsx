'use client'
const items = [
  'Agency Owners', 'E-Commerce Brands', 'Service Businesses',
  'Consultants & Coaches', 'B2B Companies', 'Real Estate Professionals',
  'Healthcare Practices', 'Professional Services', 'SaaS Startups',
  'Local Businesses', 'Handmade Businesses', 'Small Businesses',
  'Coaches & Course Creators', 'Restaurants & Hospitality',
]
const repeated = [...items, ...items]
export default function AudienceTicker() {
  return (
    <div style={{ background: '#0f0f0e', borderBottom: '1px solid rgba(255,255,255,0.08)', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '1.1rem 0', overflow: 'hidden', position: 'relative' }}>
      <div className="aticker-outer">
        <div className="aticker-track">
          {repeated.map((item, i) => (
            <span key={i} className="aticker-item">
              {item}
              <span className="aticker-dot">?</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`
        .aticker-outer { overflow: hidden; width: 100%; }
        .aticker-track { display: inline-flex; flex-wrap: nowrap; will-change: transform; animation: aticker-scroll 28s linear infinite; transform: translate3d(0,0,0); backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        @media (max-width: 768px) { .aticker-track { animation: aticker-scroll 14s linear infinite; } }
        .aticker-item { display: inline-flex; align-items: center; gap: 1.5rem; font-family: var(--mono); font-size: 0.68rem; font-weight: 300; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(247,245,240,0.6); padding-right: 1.5rem; white-space: nowrap; flex-shrink: 0; }
        .aticker-dot { color: #e8521a; font-size: 0.5rem; }
        @keyframes aticker-scroll { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-50%,0,0); } }
        .aticker-track:hover { animation-play-state: paused; }
      `}</style>
    </div>
  )
}


