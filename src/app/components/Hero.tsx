'use client'

// ─────────────────────────────────────────────
// HERO — Mux video background + stats panel
//
// To activate the video background:
//   1. Upload your video to Mux (dashboard.mux.com)
//   2. Copy the Playback ID
//   3. Set NEXT_PUBLIC_HERO_MUX_PLAYBACK_ID in your .env.local
//      e.g. NEXT_PUBLIC_HERO_MUX_PLAYBACK_ID=your_playback_id_here
//
// Until then the hero renders with a dark gradient fallback.
// ─────────────────────────────────────────────

const MUX_PLAYBACK_ID = process.env.NEXT_PUBLIC_HERO_MUX_PLAYBACK_ID || ''

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

      {/* ── VIDEO / FALLBACK BACKGROUND ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        overflow: 'hidden',
      }}>
        {hasVideo ? (
          <>
            {/* Mux HLS stream as background */}
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                opacity: 0.18,
              }}
            >
              <source
                src={`https://stream.mux.com/${MUX_PLAYBACK_ID}.m3u8`}
                type="application/x-mpegURL"
              />
              {/* MP4 fallback for browsers that don't support HLS natively */}
              <source
                src={`https://stream.mux.com/${MUX_PLAYBACK_ID}/high.mp4`}
                type="video/mp4"
              />
            </video>
            {/* Gradient overlay so text stays readable */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(15,15,14,0.92) 0%, rgba(15,15,14,0.7) 50%, rgba(15,15,14,0.85) 100%)',
            }} />
          </>
        ) : (
          /* Fallback: geometric dark gradient */
          <div style={{
            position: 'absolute', inset: 0,
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(232,82,26,0.06) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, rgba(247,245,240,0.03) 0%, transparent 40%),
              var(--ink)
            `,
          }} />
        )}

        {/* Corner accent lines */}
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

      {/* ── LEFT COPY ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Live tag */}
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

        {/* H1 */}
        <h1 className="animate-fade-up delay-2" style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(3rem, 5.5vw, 5.2rem)',
          fontWeight: 400, lineHeight: 1.06,
          letterSpacing: '-0.01em',
        }}>
          Your business.<br />
          <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>Powered by AI.</em><br />
          Done for you.
        </h1>

        {/* Sub */}
        <p className="animate-fade-up delay-3" style={{
          marginTop: '1.75rem', fontSize: '0.95rem',
          color: 'rgba(247,245,240,0.5)',
          lineHeight: 1.75, maxWidth: '38ch', fontWeight: 400,
        }}>
          We build and deploy custom AI systems inside your business —
          automations, assistants, content engines, and more.
          You stay focused on running the show.
        </p>

        {/* Actions */}
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

      {/* ── RIGHT STATS PANEL ── */}
      <div className="animate-fade-in delay-5" style={{
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
          }}>Client Results / Live</span>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: '0.62rem',
            color: '#3ecf8e', display: 'flex', alignItems: 'center', gap: '0.4rem',
          }}>
            <span style={{
              width: 5, height: 5, background: '#3ecf8e',
              borderRadius: '50%', animation: 'pulse-dot 2.2s infinite',
            }} />
            Active
          </span>
        </div>

        {/* 2×2 metrics grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {[
            { val: '47+', label: 'Businesses Served', accent: true },
            { val: '200h', label: 'Avg. Hours Saved', accent: false },
            { val: '3 wk', label: 'Avg. Delivery', accent: false },
            { val: '98%', label: 'Client Satisfaction', accent: true },
          ].map((m, i) => (
            <div key={i} style={{
              padding: '1.75rem 1.5rem',
              borderRight: i % 2 === 0 ? '1px solid var(--border-dark)' : 'none',
              borderBottom: i < 2 ? '1px solid var(--border-dark)' : 'none',
            }}>
              <span style={{
                fontFamily: 'var(--serif)', fontSize: '2.4rem',
                fontWeight: 400, lineHeight: 1, display: 'block',
                color: m.accent ? 'var(--coral)' : 'var(--page)',
              }}>{m.val}</span>
              <span style={{
                fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'rgba(247,245,240,0.32)', display: 'block', marginTop: '0.5rem',
              }}>{m.label}</span>
            </div>
          ))}
        </div>

        {/* Panel footer */}
        <div style={{
          padding: '0.85rem 1.5rem',
          borderTop: '1px solid var(--border-dark)',
          fontFamily: 'var(--mono)', fontSize: '0.6rem',
          color: 'rgba(247,245,240,0.2)', letterSpacing: '0.06em',
        }}>
          Last updated · May 2026 · doneforyouai.com
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section { grid-template-columns: 1fr !important; padding: 100px 1.25rem 60px !important; }
          section > div:last-child { display: none; }
        }
      `}</style>
    </section>
  )
}
