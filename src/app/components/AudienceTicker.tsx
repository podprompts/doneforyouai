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
    <div style={{
      background: '#0f0f0e',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      padding: '1.1rem 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div className="at-outer">
        <div className="at-track">
          {repeated.map((item, i) => (
            <span key={i} className="at-item">
              {item}
              <span className="at-dot">{String.fromCharCode(9670)}</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`        .at-outer { overflow: hidden; width: 100%; }
        .at-track { display: inline-flex; flex-wrap: nowrap; will-change: transform; animation: at-scroll 22s linear infinite; transform: translate3d(0, 0, 0); backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        @media (max-width: 768px) { .at-track { animation: at-scroll 3s linear infinite; } }
        .at-item { display: inline-flex; align-items: center; gap: 1.5rem; font-family: var(--mono); font-size: 0.68rem; font-weight: 300; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(247, 245, 240, 0.55); padding-right: 1.5rem; white-space: nowrap; flex-shrink: 0; }
        .at-dot { color: #e8521a; font-size: 0.5rem; }
        @keyframes at-scroll { 0% { transform: translate3d(0, 0, 0); } 100% { transform: translate3d(-50%, 0, 0); } }
        .at-track:hover { animation-play-state: paused; }
      `}</style>
    </div>
  )
}