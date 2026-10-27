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
    body: 'Our team designs, builds, and tests your AI systems — integrated seamlessly with your existing tools, team, and workflows. You approve everything before it goes live.',
  },
  {
    num: '03',
    title: 'Deploy & Iterate',
    body: 'We launch, train your team, and stay on as your AI partner — refining and expanding the systems as your business grows and evolves.',
  },
]

export default function Process() {
  return (
    <section id="process" style={{
      background: 'var(--bg-2)',
      color: 'var(--text)',
      padding: '7rem 2rem',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span className="dfy-eyebrow" style={{ color: 'var(--accent)' }}>The Process</span>
        <h2 style={{
          fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
          lineHeight: 1.04, margin: '1rem 0 1.25rem',
          color: 'var(--text)',
        }}>
          How it works. <em style={{ color: 'var(--accent)' }}>Simply.</em>
        </h2>
        <p style={{
          fontFamily: 'var(--f-body)', fontSize: '1.1rem',
          color: 'var(--text-2)', lineHeight: 1.65,
          maxWidth: '40rem',
        }}>
          No long onboarding. No confusing tech. We've built a process that
          gets AI working inside your business in weeks — and keeps it
          working as you grow.
        </p>

        <div className="process-steps" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '20px',
          marginTop: '3.5rem',
        }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              padding: '2rem',
              borderRadius: 28,
              background: 'var(--surface)',
              border: '1px solid var(--line)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1.75rem' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'var(--accent)', color: '#fff',
                  fontFamily: 'var(--f-display)', fontSize: '1rem', fontWeight: 600, flexShrink: 0,
                }}>{s.num}</span>
                <span style={{ flex: 1, height: 2, background: 'var(--line-2)' }} />
              </div>
              <h3 style={{
                fontSize: '1.6rem', lineHeight: 1.15,
                marginBottom: '0.75rem', color: 'var(--text)',
              }}>{s.title}</h3>
              <p style={{
                fontFamily: 'var(--f-body)', fontSize: '1rem',
                color: 'var(--text-2)', lineHeight: 1.6,
              }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .process-steps { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 680px) {
          #process { padding: 4rem 1.25rem !important; }
        }
      `}</style>
    </section>
  )
}
