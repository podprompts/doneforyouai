'use client'

const audiences = [
  'Agency Owners', 'E-Commerce Brands', 'Service Businesses',
  'Consultants & Coaches', 'B2B Companies', 'Real Estate Professionals',
  'Healthcare Practices', 'Professional Services', 'SaaS Startups', 'Local Businesses',
]

export default function Audience() {
  return (
    <section style={{
      background: 'var(--page-2)',
      color: 'var(--ink)',
      padding: '5rem 2.5rem',
      borderTop: '1px solid var(--border-light)',
      borderBottom: '1px solid var(--border-light)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '240px 1fr',
        gap: '4rem',
        alignItems: 'center',
      }}>
        <h3 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
          fontWeight: 400, lineHeight: 1.25,
        }}>
          Built for businesses that{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>mean it.</em>
        </h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {audiences.map((a) => (
            <span
              key={a}
              style={{
                fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300,
                letterSpacing: '0.08em',
                padding: '0.5rem 1rem',
                border: '1px solid var(--border-light)',
                color: 'var(--ink)',
                background: 'var(--page)',
                cursor: 'default',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--coral)'
                e.currentTarget.style.color = 'var(--coral)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-light)'
                e.currentTarget.style.color = 'var(--ink)'
              }}
            >{a}</span>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          section { grid-template-columns: 1fr !important; gap: 1.5rem !important; padding: 3rem 1.25rem !important; }
        }
      `}</style>
    </section>
  )
}
