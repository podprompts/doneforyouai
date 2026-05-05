'use client'

const steps = [
  {
    num: '01',
    title: 'Consult',
    body: 'We map your business, identify the highest-leverage AI opportunities, and build a tailored roadmap for your specific situation. No generic playbooks.',
  },
  {
    num: '02',
    title: 'Build',
    body: 'Our team designs, builds, and tests your AI systems â€” integrated seamlessly with your existing tools, team, and workflows. You approve everything before it goes live.',
  },
  {
    num: '03',
    title: 'Deploy & Iterate',
    body: 'We launch, train your team, and stay on as your AI partner â€” refining and expanding the systems as your business grows and evolves.',
  },
]

export default function Process() {
  return (
    <section id="process" style={{
      background: 'var(--ink)',
      color: 'var(--page)',
      padding: '7rem 2.5rem',
      borderTop: '1px solid var(--border-dark)',
      borderBottom: '1px solid var(--border-dark)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '6rem',
        alignItems: 'start',
      }}>
        {/* Left */}
        <div>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--coral)', display: 'block', marginBottom: '1.25rem',
          }}>The Process</span>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            fontWeight: 400, lineHeight: 1.1, marginBottom: '1.5rem',
          }}>
            How it works.<br />
            <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>Simply.</em>
          </h2>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.88rem',
            color: 'rgba(247,245,240,0.42)', lineHeight: 1.75,
            maxWidth: '36ch',
          }}>
            No long onboarding. No confusing tech. We've built a process that
            gets AI working inside your business in weeks â€” and keeps it
            working as you grow.
          </p>
        </div>

        {/* Steps */}
        <div>
          {steps.map((s, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '48px 1fr',
              gap: '1.5rem',
              alignItems: 'start',
              padding: '1.75rem 0',
              borderBottom: i < steps.length - 1 ? '1px solid var(--border-dark)' : 'none',
              borderTop: i === 0 ? '1px solid var(--border-dark)' : 'none',
            }}>
              <div style={{
                width: 36, height: 36,
                border: '1px solid var(--coral-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300,
                color: 'var(--coral)', flexShrink: 0, marginTop: '0.1rem',
              }}>{s.num}</div>
              <div>
                <h4 style={{
                  fontFamily: 'var(--sans)', fontWeight: 600, fontSize: '0.9rem',
                  letterSpacing: '0.02em', marginBottom: '0.5rem', color: 'var(--page)',
                }}>{s.title}</h4>
                <p style={{
                  fontFamily: 'var(--sans)', fontSize: '0.83rem',
                  color: 'rgba(247,245,240,0.42)', lineHeight: 1.7,
                }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          #process > div { grid-template-columns: 1fr !important; gap: 2.5rem !important; padding: 4rem 1.25rem !important; }
          #process { padding: 4rem 1.25rem !important; }
        }
      `}</style>
    </section>
  )
}

