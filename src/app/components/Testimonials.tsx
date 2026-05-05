'use client'

const testimonials = [
  {
    quote: 'They built an AI system that handles our entire customer intake process. What used to take my team 3 hours a day now happens automatically â€” and better than before.',
    name: 'Sarah M.',
    role: 'Founder, boutique marketing agency',
  },
  {
    quote: 'I kept delaying AI because I didn\'t know where to start. Two weeks in, they had a full content engine running. The ROI was immediate and hasn\'t stopped.',
    name: 'James T.',
    role: 'E-commerce brand owner',
  },
  {
    quote: 'Our sales team now walks into every call with AI-researched prospect briefs. Conversions are up, and the team actually sells instead of doing admin work.',
    name: 'Priya K.',
    role: 'VP of Sales, B2B SaaS company',
  },
]

export default function Testimonials() {
  return (
    <section id="results" style={{
      background: 'var(--page)',
      color: 'var(--ink)',
      padding: '7rem 2.5rem',
    }}>
      {/* Label */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300,
        letterSpacing: '0.15em', textTransform: 'uppercase',
        color: 'var(--muted-light)', marginBottom: '3rem',
      }}>
        What clients say
        <span style={{ flex: 1, height: 1, background: 'var(--border-light)', display: 'block' }} />
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        border: '1px solid var(--border-light)',
      }}>
        {testimonials.map((t, i) => (
          <div key={i} style={{
            padding: '2.25rem',
            borderRight: i < testimonials.length - 1 ? '1px solid var(--border-light)' : 'none',
            position: 'relative',
          }}>
            {/* Quote mark */}
            <span style={{
              position: 'absolute', top: '1rem', right: '1.5rem',
              fontFamily: 'var(--serif)', fontSize: '3.5rem',
              color: 'var(--coral)', opacity: 0.2, lineHeight: 1,
              pointerEvents: 'none',
            }}>&ldquo;</span>

            <p style={{
              fontFamily: 'var(--serif)', fontSize: '1.05rem',
              lineHeight: 1.65, color: 'var(--ink)', marginBottom: '2rem',
            }}>{t.quote}</p>

            <div style={{
              width: '2rem', height: '2px',
              background: 'var(--coral)', marginBottom: '1rem',
            }} />

            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              <strong style={{
                display: 'block', fontFamily: 'var(--sans)', fontWeight: 500,
                fontSize: '0.75rem', color: 'var(--ink)', marginBottom: '0.15rem',
                letterSpacing: '0.02em', textTransform: 'none',
              }}>{t.name}</strong>
              <span style={{ color: 'var(--muted-light)' }}>{t.role}</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 680px) {
          #results { padding: 4rem 1.25rem !important; }
          #results > div:last-child { grid-template-columns: 1fr !important; }
          #results > div:last-child > div { border-right: none !important; border-bottom: 1px solid var(--border-light); }
          #results > div:last-child > div:last-child { border-bottom: none; }
        }
      `}</style>
    </section>
  )
}

