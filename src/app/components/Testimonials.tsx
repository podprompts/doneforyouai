'use client'

const testimonials = [
  {
    quote: 'They built an AI system that handles our entire customer intake process. What used to take my team 3 hours a day now happens automatically -- and better than before.',
    name: 'Sarah M.',
    role: 'Founder, boutique marketing agency',
  },
  {
    quote: "I kept delaying AI because I didn't know where to start. Two weeks in, they had a full content engine running. The ROI was immediate and hasn't stopped.",
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
    <>
      <section id="results" style={{
        background: '#ffffff',
        color: '#0f0f0e',
        padding: '6rem 2.5rem',
        borderTop: '1px solid rgba(15,15,14,0.1)',
        borderBottom: '1px solid rgba(15,15,14,0.1)',
      }}>
        {/* Section header — bigger, darker, visible */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1.5rem',
          marginBottom: '3.5rem',
        }}>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: 400,
            color: '#0f0f0e',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
            margin: 0,
          }}>What clients say</h2>
          <span style={{ flex: 1, height: '1px', background: 'rgba(15,15,14,0.12)', display: 'block' }} />
        </div>

        {/* Desktop grid — with visible card outlines */}
        <div className="testimonials-desktop" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
        }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{
              padding: '2.25rem',
              border: '1px solid rgba(15,15,14,0.12)',
              borderRadius: '10px',
              background: '#f5f4f0',
              position: 'relative',
            }}>
              <span style={{
                position: 'absolute', top: '1rem', right: '1.5rem',
                fontFamily: 'var(--serif)', fontSize: '3.5rem',
                color: 'var(--coral)', opacity: 0.25, lineHeight: 1,
                pointerEvents: 'none',
              }}>&ldquo;</span>
              <p style={{
                fontFamily: 'var(--serif)', fontSize: '1.05rem',
                lineHeight: 1.65, color: '#0f0f0e', marginBottom: '2rem',
              }}>{t.quote}</p>
              <div style={{ width: '2rem', height: '2px', background: 'var(--coral)', marginBottom: '1rem' }} />
              <strong style={{
                display: 'block', fontFamily: 'var(--sans)', fontWeight: 500,
                fontSize: '0.82rem', color: '#0f0f0e', marginBottom: '0.15rem',
              }}>{t.name}</strong>
              <span style={{
                fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: 'rgba(15,15,14,0.5)',
              }}>{t.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile carousel */}
      <div className="testimonials-mobile">
        <div className="testimonials-track">
          {testimonials.map((t, i) => (
            <div key={i} className="testi-card">
              <span className="testi-quote">&ldquo;</span>
              <p className="testi-text">{t.quote}</p>
              <div className="testi-rule" />
              <strong className="testi-name">{t.name}</strong>
              <span className="testi-role">{t.role}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-mobile { display: none; }

        @media (max-width: 680px) {
          #results { padding: 4rem 1.25rem 1rem !important; }
          .testimonials-desktop { display: none !important; }

          .testimonials-mobile {
            display: block;
            width: 100vw;
            margin-left: calc(-50vw + 50%);
            background: #ffffff;
            padding-bottom: 4rem;
          }

          .testimonials-track {
            display: flex;
            overflow-x: scroll;
            overflow-y: visible;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            padding: 1rem 1.25rem;
            gap: 0.75rem;
            touch-action: pan-x;
          }
          .testimonials-track::-webkit-scrollbar { display: none; }

          .testi-card {
            flex: 0 0 78vw;
            scroll-snap-align: start;
            border: 1px solid rgba(15,15,14,0.12);
            border-radius: 10px;
            background: #f5f4f0;
            padding: 1.75rem 1.5rem;
            display: flex;
            flex-direction: column;
            position: relative;
            min-height: 280px;
          }
          .testi-quote {
            position: absolute; top: 0.75rem; right: 1.25rem;
            font-family: var(--serif); font-size: 3rem;
            color: var(--coral); opacity: 0.25; line-height: 1;
            pointer-events: none;
          }
          .testi-text {
            font-family: var(--serif); font-size: 1rem;
            line-height: 1.65; color: #0f0f0e;
            margin: 0 0 1.5rem; flex: 1;
          }
          .testi-rule {
            width: 2rem; height: 2px;
            background: var(--coral); margin-bottom: 1rem;
          }
          .testi-name {
            display: block; font-family: var(--sans);
            font-size: 0.75rem; font-weight: 500;
            color: #0f0f0e; margin-bottom: 0.2rem;
          }
          .testi-role {
            font-family: var(--mono); font-size: 0.62rem;
            font-weight: 300; letter-spacing: 0.08em;
            text-transform: uppercase; color: rgba(15,15,14,0.5);
          }
        }
      `}</style>
    </>
  )
}