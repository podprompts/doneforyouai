'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Services', href: '/#services' },
  { label: 'Process', href: '/#process' },
  { label: 'Operators', href: '/marketplace' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleBookCall = () => {
    setMenuOpen(false)
    if (window.location.pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/#contact'
    }
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem', height: '60px',
        background: scrolled || menuOpen ? 'rgba(15,15,14,0.96)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.09)' : '1px solid transparent',
        transition: 'background 0.3s, border-color 0.3s',
        backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
      }}>

        {/* Logo */}
        <Link href="/" onClick={() => setMenuOpen(false)} style={{
          fontFamily: 'var(--sans)', fontWeight: 800, fontSize: '0.88rem',
          letterSpacing: '0.06em', textTransform: 'uppercase',
          color: 'var(--page)', textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}>
          <span style={{
            width: 7, height: 7, background: 'var(--coral)',
            borderRadius: '50%', display: 'inline-block',
            animation: 'pulse-dot 2.5s infinite',
          }} />
          DoneForYouAI
        </Link>

        {/* Desktop nav links */}
        <ul className="nav-links-desktop" style={{
          display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0,
        }}>
          {NAV_LINKS.map((item) => (
            <li key={item.label}>
              <Link href={item.href} style={{
                fontFamily: 'var(--mono)', fontSize: '0.68rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: item.href === '/marketplace' ? 'var(--coral)' : 'rgba(247,245,240,0.45)',
                textDecoration: 'none', transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--page)')}
                onMouseLeave={e => (e.currentTarget.style.color = item.href === '/marketplace' ? 'var(--coral)' : 'rgba(247,245,240,0.45)')}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <button onClick={handleBookCall} className="nav-cta-desktop" style={{
          fontFamily: 'var(--sans)', fontSize: '0.72rem', fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--page)', background: 'var(--coral)',
          border: '1px solid var(--coral)', padding: '0.5rem 1.25rem',
          cursor: 'pointer', transition: 'opacity 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
        >
          Book a Call
        </button>

        {/* Hamburger button — mobile only */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            flexDirection: 'column', justifyContent: 'center',
            alignItems: 'center', gap: '5px',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '4px', zIndex: 300,
          }}
        >
          <span style={{
            display: 'block', width: '22px', height: '2px',
            background: 'var(--page)',
            transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
            transition: 'transform 0.25s',
          }} />
          <span style={{
            display: 'block', width: '22px', height: '2px',
            background: 'var(--page)',
            opacity: menuOpen ? 0 : 1,
            transition: 'opacity 0.25s',
          }} />
          <span style={{
            display: 'block', width: '22px', height: '2px',
            background: 'var(--page)',
            transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
            transition: 'transform 0.25s',
          }} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div style={{
        position: 'fixed', top: '60px', left: 0, right: 0, bottom: 0,
        background: 'rgba(15,15,14,0.98)',
        backdropFilter: 'blur(16px)',
        zIndex: 190,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '2.5rem',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
      }}>
        {NAV_LINKS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--mono)', fontSize: '0.9rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: item.href === '/marketplace' ? 'var(--coral)' : 'var(--page)',
              textDecoration: 'none',
            }}
          >
            {item.label}
          </Link>
        ))}
        <button onClick={handleBookCall} style={{
          marginTop: '1rem',
          fontFamily: 'var(--sans)', fontSize: '0.82rem', fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--page)', background: 'var(--coral)',
          border: 'none', padding: '0.85rem 2.5rem',
          cursor: 'pointer',
        }}>
          Book a Call
        </button>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta-desktop { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}