'use client'

export default function Problem() {
  return (
    <section style={{
      background: '#f5f4f0',
      color: '#0f0f0e',
      padding: '3.5rem 2.5rem 7rem',
      borderBottom: '1px solid rgba(15,15,14,0.1)',
      display: 'grid',
      gridTemplateColumns: '260px 1fr',
      gap: '5rem',
      alignItems: 'start',
    }}>
      <div>
        <span style={{
          fontFamily: 'var(--sans)', fontWeight: 700, fontSize: '0.72rem',
          color: 'var(--coral)', letterSpacing: '0.1em', textTransform: 'uppercase',
          display: 'block', marginBottom: '0.5rem',
        }}>The Reality</span>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'rgba(15,15,14,0.5)', lineHeight: 1.65,
        }}>
          Most businesses know AI matters. Few know how to make it actually work.
        </span>
      </div>
      <div style={{
        fontFamily: 'var(--serif)',
        fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)',
        fontWeight: 400, lineHeight: 1.45,
        color: '#0f0f0e',
      }}>
        <p>
          You've seen what AI can do. You know your competitors are moving faster.
          But between <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>understanding the tools</em> and
          actually implementing them inside a real, running business — there's a gap most companies never close.
        </p>
        <p style={{ marginTop: '1.25rem', fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', color: 'rgba(15,15,14,0.55)' }}>
          We close it. No guesswork, no wasted months, no half-built automations
          collecting dust. Just AI that works — built around how you actually operate.
        </p>
      </div>
      <style>{`
        @media (max-width: 680px) {
          section { grid-template-columns: 1fr !important; gap: 1.5rem !important; padding: 2.5rem 1.25rem 4rem !important; }
        }
      `}</style>
    </section>
  )
}