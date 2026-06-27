'use client'
import AudienceTicker from './AudienceTicker'
export default function Audience() {
  return (
    <section style={{ borderTop: '1px solid rgba(15,15,14,0.1)', borderBottom: '1px solid rgba(15,15,14,0.1)' }}>
      <div style={{ background: '#f5f4f0', padding: '4rem 2.5rem 3rem' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: '0.75rem' }}>Who we work with</span>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 400, lineHeight: 1.1, color: '#0f0f0e', letterSpacing: '-0.02em', margin: 0 }}>
          Moving your business{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>forward with AI.</em>
        </h2>
      </div>
      <AudienceTicker />
    </section>
  )
}
