'use client'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--ink-2)',
      borderTop: '1px solid var(--border-dark)',
      padding: '2rem 2.5rem',
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',
      gap: '2rem',
    }}>
      {/* Logo */}
      <div style={{
        fontFamily: 'var(--sans)', fontWeight: 800, fontSize: '0.82rem',
        letterSpacing: '0.06em', textTransform: 'uppercase',
        color: 'rgba(247,245,240,0.35)',
        display: 'flex', alignItems: 'center', gap: '0.4rem',
      }}>
        <span style={{
          width: 5, height: 5, background: 'var(--coral)',
          borderRadius: '50%', display: 'inline-block',
        }} />
        DoneForYouAI
      </div>

      {/* Center */}
      <span style={{
        fontFamily: 'var(--mono)', fontSize: '0.6rem',
        letterSpacing: '0.1em', color: 'rgba(247,245,240,0.18)',
        textAlign: 'center',
      }}>
        Â© 2026 DoneForYouAI.com Â· All rights reserved
      </span>

      {/* Links */}
      <div style={{
        display: 'flex', justifyContent: 'flex-end', gap: '1.5rem',
      }}>
        {[
          { label: 'Privacy', href: '/privacy' },
          { label: 'Terms', href: '/terms' },
          { label: 'hello@doneforyouai.com', href: 'mailto:hello@doneforyouai.com' },
        ].map(link => (
          <a
            key={link.label}
            href={link.href}
            style={{
              fontFamily: 'var(--mono)', fontSize: '0.6rem',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'rgba(247,245,240,0.22)', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(247,245,240,0.55)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(247,245,240,0.22)')}
          >
            {link.label}
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 680px) {
          footer { grid-template-columns: 1fr !important; text-align: center !important; gap: 1rem !important; }
          footer > div:last-child { justify-content: center !important; }
        }
      `}</style>
    </footer>
  )
}

