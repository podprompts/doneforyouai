'use client'

export default function Problem() {
  return (
    <section style={{
      background: 'var(--page)',
      color: 'var(--ink)',
      padding: '7rem 2.5rem',
      borderBottom: '1px solid var(--border-light)',
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
          color: 'var(--muted-light)', lineHeight: 1.65,
        }}>
          Most businesses know AI matters. Few know how to make it actually work.
        </span>
      </div>

      <div style={{
        fontFamily: 'var(--serif)',
        fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)',
        fontWeight: 400, lineHeight: 1.45,
        color: 'var(--ink)',
      }}>
        <p>
          You've seen what AI can do. You know your competitors are moving faster.
          But between <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>understanding the tools</em> and
          actually implementing them inside a real, running business â€” there's a gap most companies never close.
        </p>
        <p style={{ marginTop: '1.25rem', fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', color: 'rgba(15,15,14,0.6)' }}>
          We close it. No guesswork, no wasted months, no half-built automations
          collecting dust. Just AI that works â€” built around how you actually operate.
        </p>
      </div>

      <style>{`
        @media (max-width: 680px) {
          section { grid-template-columns: 1fr !important; gap: 1.5rem !important; padding: 4rem 1.25rem !important; }
        }
      `}</style>
    </section>
  )
}

