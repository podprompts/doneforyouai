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
  { label: 'Content Creators' },
  { label: 'Financial Advisors' },
  { label: 'HR & Recruiting Firms' },
  { label: 'Marketing Agencies' },
]
export default function Audience() {
  return (
    <section style={{ background: 'var(--bg)', padding: '0 2rem 7rem', textAlign: 'center' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: '2.75rem' }}>
          <span className="dfy-eyebrow" style={{ color: 'var(--accent)' }}>Who we work with</span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', lineHeight: 1.04, color: 'var(--text)', margin: '1rem auto 0', maxWidth: '20ch' }}>
            Moving your business{' '}
            <em style={{ color: 'var(--accent)' }}>forward with AI.</em>
          </h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
          {audiences.map((a) => (
            <span key={a.label} className="dfy-pill">{a.label}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
