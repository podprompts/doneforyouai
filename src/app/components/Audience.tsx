'use client'
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
  return (
    <section style={{ background: '#f5f4f0', padding: '6rem 2.5rem', borderTop: '1px solid rgba(15,15,14,0.1)', borderBottom: '1px solid rgba(15,15,14,0.1)' }}>
      <div style={{ marginBottom: '3rem' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: '0.75rem' }}>Who we work with</span>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 400, lineHeight: 1.1, color: '#0f0f0e', letterSpacing: '-0.02em', margin: 0 }}>
          Moving your business{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>forward with AI.</em>
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
        {audiences.map((a) => (
          <div key={a.label} style={{ background: '#ffffff', border: '1px solid rgba(15,15,14,0.1)', borderRadius: '10px', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'default', transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#e8521a'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(232,82,26,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(15,15,14,0.1)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <span style={{ color: 'var(--coral)', fontSize: '0.6rem', flexShrink: 0 }}>◆</span>
            <span style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', fontWeight: 500, color: '#0f0f0e', lineHeight: 1.3 }}>{a.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
