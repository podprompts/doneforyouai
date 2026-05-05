'use client'

export default function CTA() {
  return (
    <section style={{
      background: 'var(--ink)',
      padding: '9rem 2.5rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid var(--border-dark)',
    }}>
      {/* Ghost watermark */}
      <span style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--sans)', fontWeight: 800, fontSize: '22vw',
        color: 'rgba(255,255,255,0.022)',
        letterSpacing: '-0.05em', pointerEvents: 'none',
        whiteSpace: 'nowrap', lineHeight: 1,
        userSelect: 'none',
      }}>DFYAI</span>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--coral)', display: 'block', marginBottom: '2rem',
        }}>Ready to start?</span>

        <h2 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontWeight: 400, lineHeight: 1.08,
          maxWidth: '20ch', margin: '0 auto 1.5rem',
        }}>
          Stop experimenting.<br />
          Start{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>executing.</em>
        </h2>

        <p style={{
          fontFamily: 'var(--sans)', fontSize: '0.9rem',
          color: 'rgba(247,245,240,0.38)',
          maxWidth: '40ch', margin: '0 auto 3rem', lineHeight: 1.75,
        }}>
          Book a free 30-minute strategy call. We'll show you exactly
          where AI moves the needle in your business â€” no fluff, no pitch.
        </p>

        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            fontFamily: 'var(--sans)', fontSize: '0.82rem', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            background: 'var(--coral)', color: 'var(--white)',
            border: 'none', padding: '1.1rem 3rem',
            cursor: 'pointer', transition: 'opacity 0.2s, transform 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          Book Your Free Strategy Call
        </button>

        <p style={{
          fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300,
          letterSpacing: '0.1em', color: 'rgba(247,245,240,0.2)',
          marginTop: '2rem',
        }}>
          No commitment required Â· 30 minutes Â· Results-focused
        </p>
      </div>
    </section>
  )
}

