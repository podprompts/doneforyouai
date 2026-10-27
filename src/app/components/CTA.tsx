'use client'

export default function CTA() {
  return (
    <section style={{
      background: 'var(--bg)',
      padding: '0 2rem 7rem',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', boxSizing: 'border-box',
        background: 'var(--text)',
        borderRadius: 36,
        padding: 'clamp(3.5rem, 8vw, 6rem) 2rem',
        textAlign: 'center',
      }}>
        <span className="dfy-eyebrow" style={{ color: '#C9CCD8', marginBottom: '1.25rem' }}>Ready to start?</span>

        <h2 style={{
          fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
          lineHeight: 1.04,
          color: '#ffffff',
          maxWidth: '16ch', margin: '1rem auto 1.5rem',
        }}>
          Stop experimenting.{' '}
          Start{' '}
          <em style={{ color: '#BFC9FF' }}>executing.</em>
        </h2>

        <p style={{
          fontFamily: 'var(--f-body)', fontSize: '1.1rem',
          color: '#D4D6E0',
          maxWidth: '36rem', margin: '0 auto 2.5rem', lineHeight: 1.6,
        }}>
          Book a free 30-minute strategy call. We'll show you exactly
          where AI moves the needle in your business — no fluff, no pitch.
        </p>

        <button
          className="dfy-btn dfy-btn-light"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Book Your Free Strategy Call
        </button>

        <p style={{
          fontFamily: 'var(--f-body)', fontSize: '0.88rem',
          color: '#B9BCC9',
          marginTop: '1.5rem',
        }}>
          No commitment required · 30 minutes · Results-focused
        </p>
      </div>
    </section>
  )
}
