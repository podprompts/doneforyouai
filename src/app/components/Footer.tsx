'use client'

export default function Footer() {
  const scrollToContact = () => {
    const contact = document.getElementById('contact')
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--f-body)',
    fontSize: '0.88rem',
    color: 'var(--text-2)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  }

  const btnStyle: React.CSSProperties = {
    fontFamily: 'var(--f-body)',
    fontSize: '0.88rem',
    color: 'var(--text-2)',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    transition: 'color 0.2s',
  }

  const hoverOn = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = 'var(--accent)'
  }

  const hoverOff = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = 'var(--text-2)'
  }

  return (
    <footer style={{
      background: 'var(--bg)',
      borderTop: '1px solid var(--line-2)',
      padding: '2.25rem 2rem',
    }}>
      <div className="footer-grid" style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: '2rem',
      }}>

        {/* Logo */}
        <div style={{
          fontFamily: 'var(--f-display)',
          fontWeight: 700,
          fontSize: '1.05rem',
          letterSpacing: '-0.02em',
          color: 'var(--text)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 30, height: 30, borderRadius: 9,
            background: 'var(--text)', color: '#fff', fontSize: '0.9rem',
          }}>D</span>
          DoneForYouAI
        </div>

        {/* Center copyright */}
        <span style={{
          fontFamily: 'var(--f-body)',
          fontSize: '0.85rem',
          color: 'var(--text-3)',
          textAlign: 'center',
        }}>
          © 2026 DoneForYouAI.com · All rights reserved
        </span>

        {/* Right links */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="/privacy" style={linkStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
            Privacy
          </a>
          <a href="/terms" style={linkStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
            Terms
          </a>
          <button onClick={scrollToContact} style={btnStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
            hire@doneforyouai.com
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .footer-grid { grid-template-columns: 1fr !important; text-align: center !important; gap: 1rem !important; justify-items: center; }
          .footer-grid > div:last-child { justify-content: center !important; }
        }
      `}</style>
    </footer>
  )
}
