'use client'

import Link from 'next/link'

const MUX_PLAYBACK_ID = process.env.NEXT_PUBLIC_HERO_MUX_PLAYBACK_ID || ''

const featuredOperators = [
  {
    id: '1',
    name: 'Maya Reeves',
    handle: 'mayabuilds',
    title: 'AI Automation Architect',
    location: 'Austin, TX',
    avatar: 'MR',
    avatarColor: '#e8521a',
    tags: ['Automation', 'Zapier', 'Make'],
    rate: '$2,400',
    rateType: 'per project',
    rating: 4.9,
    reviews: 34,
    available: true,
  },
  {
    id: '2',
    name: 'James Okoro',
    handle: 'jokoro_ai',
    title: 'Chatbot & Assistant Specialist',
    location: 'Remote',
    avatar: 'JO',
    avatarColor: '#2cb67d',
    tags: ['ChatGPT', 'Claude', 'Voiceflow'],
    rate: '$180',
    rateType: 'per hour',
    rating: 5.0,
    reviews: 19,
    available: true,
  },
  {
    id: '3',
    name: 'Sasha Monroe',
    handle: 'sashaai',
    title: 'AI Strategy & Stack Consultant',
    location: 'Chicago, IL',
    avatar: 'SM',
    avatarColor: '#f5a623',
    tags: ['Strategy', 'Tool Selection', 'Roadmap'],
    rate: '$250',
    rateType: 'per hour',
    rating: 4.9,
    reviews: 41,
    available: false,
  },
]

export default function Hero() {
  const hasVideo = Boolean(MUX_PLAYBACK_ID)

  return (
    <section style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      gap: '4rem',
      padding: '120px 2.5rem 80px',
      position: 'relative',
      overflow: 'hidden',
      borderBottom: '1px solid var(--border-dark)',
    }}>

      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        {hasVideo ? (
          <>
            <video autoPlay muted loop playsInline style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', opacity: 0.18,
            }}>
              <source src={`https://stream.mux.com/${MUX_PLAYBACK_ID}.m3u8`} type="application/x-mpegURL" />
              <source src={`https://stream.mux.com/${MUX_PLAYBACK_ID}/high.mp4`} type="video/mp4" />
            </video>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(15,15,14,0.92) 0%, rgba(15,15,14,0.7) 50%, rgba(15,15,14,0.85) 100%)',
            }} />
          </>
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(232,82,26,0.06) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, rgba(247,245,240,0.03) 0%, transparent 40%),
              var(--ink)
            `,
          }} />
        )}
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          width: '38vw', height: '38vw',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 60, left: 0,
          width: '22vw', height: '22vw',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          borderRight: '1px solid rgba(255,255,255,0.04)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Left copy */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="animate-fade-up delay-1" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
          fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--coral)', marginBottom: '2rem',
          border: '1px solid var(--coral-border)',
          padding: '0.4rem 0.9rem', width: 'fit-content',
        }}>
          <span style={{
            width: 5, height: 5, background: 'var(--coral)',
            borderRadius: '50%', animation: 'pulse-dot 2s infinite',
          }} />
          AI Implementation Partner
        </div>

        <h1 className="animate-fade-up delay-2" style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(3rem, 5.5vw, 5.2rem)',
          fontWeight: 400, lineHeight: 1.06, letterSpacing: '-0.01em',
        }}>
          Your business.<br />
          <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>Powered by AI.</em><br />
          Done for you.
        </h1>

        <p className="animate-fade-up delay-3" style={{
          marginTop: '1.75rem', fontSize: '0.95rem',
          color: 'rgba(247,245,240,0.5)', lineHeight: 1.75, maxWidth: '38ch', fontWeight: 400,
        }}>
          We build and deploy custom AI systems inside your business —
          automations, assistants, content engines, and more.
          You stay focused on running the show.
        </p>

        <div className="animate-fade-up delay-4" style={{
          marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem',
        }}>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              fontFamily: 'var(--sans)', fontSize: '0.75rem', fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              background: 'var(--coral)', color: 'var(--white)',
              border: 'none', padding: '0.95rem 2.25rem',
              cursor: 'pointer', transition: 'opacity 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Book a Free Strategy Call
          </button>
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              fontFamily: 'var(--sans)', fontSize: '0.75rem', fontWeight: 500,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              background: 'transparent', color: 'rgba(247,245,240,0.48)',
              border: 'none', padding: 0, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--page)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(247,245,240,0.48)')}
          >
            See Services <span>↓</span>
          </button>
        </div>
      </div>

      {/* Right — Operator Panel */}
      <div className="animate-fade-in delay-5 hero-panel" style={{
        position: 'relative', zIndex: 1,
        border: '1px solid var(--border-dark)',
        overflow: 'hidden',
      }}>
        {/* Panel header */}
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--border-dark)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'rgba(247,245,240,0.3)',
          }}>Featured Operators</span>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: '0.62rem',
            color: '#3ecf8e', display: 'flex', alignItems: 'center', gap: '0.4rem',
          }}>
            <span style={{
              width: 5, height: 5, background: '#3ecf8e',
              borderRadius: '50%', animation: 'pulse-dot 2.2s infinite',
            }} />
            Available Now
          </span>
        </div>

        {/* Operator rows */}
        {featuredOperators.map((op, i) => (
          <div key={op.id} style={{
            padding: '1.1rem 1.5rem',
            borderBottom: i < featuredOperators.length - 1 ? '1px solid var(--border-dark)' : 'none',
            display: 'flex', alignItems: 'center', gap: '1rem',
          }}>
            {/* Avatar */}
            <div style={{
              width: 42, height: 42, borderRadius: '50%',
              background: op.avatarColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--sans)', fontWeight: 700, fontSize: '0.72rem',
              color: '#fff', flexShrink: 0, position: 'relative',
            }}>
              {op.avatar}
              {op.available && (
                <span style={{
                  position: 'absolute', bottom: 1, right: 1,
                  width: 8, height: 8, borderRadius: '50%',
                  background: '#3ecf8e',
                  border: '1.5px solid var(--ink)',
                }} />
              )}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.15rem' }}>
                <span style={{
                  fontFamily: 'var(--sans)', fontWeight: 600, fontSize: '0.82rem',
                  color: 'var(--page)', whiteSpace: 'nowrap',
                }}>{op.name}</span>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: '0.58rem',
                  color: 'rgba(247,245,240,0.3)', letterSpacing: '0.04em',
                }}>@{op.handle}</span>
              </div>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300,
                color: 'rgba(247,245,240,0.42)', letterSpacing: '0.04em',
                marginBottom: '0.5rem',
              }}>{op.title} · {op.location}</div>
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {op.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: 'var(--mono)', fontSize: '0.56rem', fontWeight: 300,
                    letterSpacing: '0.06em',
                    padding: '0.2rem 0.5rem',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(247,245,240,0.4)',
                  }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Rate + rating */}
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{
                fontFamily: 'var(--serif)', fontSize: '1.15rem',
                color: 'var(--page)', lineHeight: 1,
              }}>{op.rate}</div>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: '0.56rem', fontWeight: 300,
                color: 'rgba(247,245,240,0.3)', marginBottom: '0.3rem',
              }}>{op.rateType}</div>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: '0.6rem',
                color: '#3ecf8e',
              }}>★ {op.rating} ({op.reviews})</div>
            </div>
          </div>
        ))}

        {/* Panel footer — stats moved here */}
        <div style={{
          padding: '0.85rem 1.5rem',
          borderTop: '1px solid var(--border-dark)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[
              { val: '47+', label: 'Businesses' },
              { val: '98%', label: 'Satisfaction' },
              { val: '3wk', label: 'Avg. Delivery' },
            ].map(s => (
              <div key={s.label}>
                <span style={{
                  fontFamily: 'var(--serif)', fontSize: '1rem',
                  color: 'var(--coral)', display: 'block', lineHeight: 1,
                }}>{s.val}</span>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: '0.52rem', fontWeight: 300,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'rgba(247,245,240,0.25)',
                }}>{s.label}</span>
              </div>
            ))}
          </div>
          <Link href="/marketplace" style={{
            fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--coral)', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            transition: 'opacity 0.2s',
          }}>
            View All →
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section {
            grid-template-columns: 1fr !important;
            padding: 100px 1.25rem 60px !important;
          }
          .hero-panel { display: none; }
        }
      `}</style>
    </section>
  )
}