'use client'

const testimonials = [
  {
    quote: 'They built an AI system that handles our entire customer intake process. What used to take my team 3 hours a day now happens automatically -- and better than before.',
    name: 'Sarah M.',
    role: 'Founder, boutique marketing agency',
    initials: 'SM',
    avBg: '#EDF0FF', avFg: '#2B4BFF',
  },
  {
    quote: "I kept delaying AI because I didn't know where to start. Two weeks in, they had a full content engine running. The ROI was immediate and hasn't stopped.",
    name: 'James T.',
    role: 'E-commerce brand owner',
    initials: 'JT',
    avBg: '#E3F3EC', avFg: '#0B6B4D',
  },
  {
    quote: 'Our sales team now walks into every call with AI-researched prospect briefs. Conversions are up, and the team actually sells instead of doing admin work.',
    name: 'Priya K.',
    role: 'VP of Sales, B2B SaaS company',
    initials: 'PK',
    avBg: '#F5E6DC', avFg: '#8A3D12',
  },
]

export default function Testimonials() {
  return (
    <>
      <section id="results" style={{
        background: 'var(--bg)',
        color: 'var(--text)',
        padding: '7rem 2rem',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
            lineHeight: 1.04,
            color: 'var(--text)',
            marginBottom: '3rem',
          }}>What clients say</h2>

          {/* Desktop grid */}
          <div className="testimonials-desktop" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '20px',
          }}>
            {testimonials.map((t, i) => (
              <figure key={i} style={{
                margin: 0,
                padding: '2rem',
                border: '1px solid var(--line)',
                borderRadius: 28,
                background: 'var(--surface)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.75rem',
              }}>
                <blockquote style={{ margin: 0 }}>
                  <div style={{
                    fontFamily: 'var(--f-serif)', fontSize: '4rem',
                    color: 'var(--accent)', lineHeight: 0.6, height: '1.75rem',
                  }}>&ldquo;</div>
                  <p style={{
                    marginTop: '0.9rem',
                    fontFamily: 'var(--f-body)', fontSize: '1.1rem',
                    lineHeight: 1.6, color: 'var(--text)',
                  }}>{t.quote}</p>
                </blockquote>
                <figcaption style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 48, height: 48, borderRadius: '50%',
                    background: t.avBg, color: t.avFg,
                    fontFamily: 'var(--f-body)', fontSize: '0.95rem', fontWeight: 600, flexShrink: 0,
                  }}>{t.initials}</span>
                  <span>
                    <strong style={{
                      display: 'block', fontFamily: 'var(--f-body)', fontWeight: 600,
                      fontSize: '1rem', color: 'var(--text)',
                    }}>{t.name}</strong>
                    <span style={{
                      display: 'block', marginTop: 2,
                      fontFamily: 'var(--f-body)', fontSize: '0.88rem',
                      color: 'var(--text-3)',
                    }}>{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile carousel */}
      <div className="testimonials-mobile">
        <div className="testimonials-track">
          {testimonials.map((t, i) => (
            <div key={i} className="testi-card">
              <span className="testi-quote">&ldquo;</span>
              <p className="testi-text">{t.quote}</p>
              <div className="testi-who">
                <span className="testi-av" style={{ background: t.avBg, color: t.avFg }}>{t.initials}</span>
                <span>
                  <strong className="testi-name">{t.name}</strong>
                  <span className="testi-role">{t.role}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-mobile { display: none; }

        @media (max-width: 900px) {
          .testimonials-desktop { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 680px) {
          #results { padding: 4rem 1.25rem 1rem !important; }
          .testimonials-desktop { display: none !important; }

          .testimonials-mobile {
            display: block;
            width: 100vw;
            margin-left: calc(-50vw + 50%);
            background: var(--bg);
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
            flex: 0 0 82vw;
            scroll-snap-align: start;
            border: 1px solid var(--line);
            border-radius: 24px;
            background: var(--surface);
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            min-height: 300px;
          }
          .testi-quote {
            font-family: var(--f-serif); font-size: 3.5rem;
            color: var(--accent); line-height: 0.7; height: 1.5rem;
            pointer-events: none;
          }
          .testi-text {
            font-family: var(--f-body); font-size: 1rem;
            line-height: 1.6; color: var(--text);
            margin: 0.9rem 0 1.5rem; flex: 1;
          }
          .testi-who { display: flex; align-items: center; gap: 0.8rem; }
          .testi-av {
            display: inline-flex; align-items: center; justify-content: center;
            width: 44px; height: 44px; border-radius: 50%;
            font-family: var(--f-body); font-size: 0.9rem; font-weight: 600; flex-shrink: 0;
          }
          .testi-name {
            display: block; font-family: var(--f-body);
            font-size: 0.95rem; font-weight: 600;
            color: var(--text);
          }
          .testi-role {
            display: block; font-family: var(--f-body); font-size: 0.82rem;
            color: var(--text-3);
          }
        }
      `}</style>
    </>
  )
}
