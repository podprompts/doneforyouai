'use client'

export default function Problem() {
  return (
    <section className="problem-section" style={{
      background: 'var(--bg)',
      color: 'var(--text)',
      padding: '3rem 2rem 7rem',
    }}>
      <div className="problem-grid" style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '5rem',
        alignItems: 'start',
      }}>
        <div>
          <span className="dfy-eyebrow" style={{ color: 'var(--accent)', marginBottom: '1.25rem' }}>The Reality</span>
          <h2 style={{
            fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
            lineHeight: 1.06,
            color: 'var(--text)',
            marginTop: '1rem',
          }}>
            Most businesses know AI matters.{' '}
            <em style={{ color: 'var(--accent)' }}>Few know how to make it actually work.</em>
          </h2>
        </div>
        <div style={{
          fontFamily: 'var(--f-body)',
          fontSize: '1.2rem',
          lineHeight: 1.65,
          color: 'var(--text)',
          paddingTop: '0.5rem',
        }}>
          <p>
            You've seen what AI can do. You know your competitors are moving faster.
            But between <em style={{ color: 'var(--accent)' }}>understanding the tools</em> and
            actually implementing them inside a real, running business — there's a gap most companies never close.
          </p>
          <p style={{ marginTop: '1.25rem', color: 'var(--text-2)' }}>
            We close it. No guesswork, no wasted months, no half-built automations
            collecting dust. Just AI that works — built around how you actually operate.
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .problem-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 680px) {
          .problem-section { padding-top: 2rem !important; padding-bottom: 4rem !important; }
        }
      `}</style>
    </section>
  )
}
