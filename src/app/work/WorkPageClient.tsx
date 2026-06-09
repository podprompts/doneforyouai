'use client'

import { useState } from 'react'
import Navbar from '@/app/components/Navbar'

const projects = [
  { id: 1, name: 'DoneForYouAI.com',       url: 'doneforyouai.com',       href: 'https://doneforyouai.com',       tag: 'AI Services',         year: '2025', description: 'AI implementation agency with expert marketplace, live pulse feed, and operator network.',                                          stack: ['Next.js', 'Supabase', 'Stripe', 'Vercel'],                      screenshot: '/screenshots/doneforyouai.png',       light: false },
  { id: 2, name: 'AINewsClips.com',         url: 'ainewsclips.com',        href: 'https://ainewsclips.com',        tag: 'Media',               year: '2024', description: 'AI news publication covering tech, agents, jobs, and innovation — built on WordPress with custom theming.',                   stack: ['WordPress', 'Elementor', 'GoDaddy'],                            screenshot: '/screenshots/ainewsclips.png',        light: false },
  { id: 3, name: 'LiveReselling.com',       url: 'livereselling.com',      href: 'https://livereselling.com',      tag: 'Live Commerce',       year: '2025', description: 'Live-stream reselling platform. Sellers go live, drop items, and buyers claim in real time from their phone.',                stack: ['Next.js', 'Supabase', 'Mux', 'Stripe'],                         screenshot: '/screenshots/livereselling.png',      light: true  },
  { id: 4, name: 'UGCAffiliates.com',       url: 'ugcaffiliates.com',      href: 'https://ugcaffiliates.com',      tag: 'Marketplace',         year: '2024', description: 'Affiliate marketplace connecting UGC creators with vendors. Promote products, earn commissions.',                             stack: ['Next.js', 'Supabase', 'Stripe'],                                screenshot: '/screenshots/ugcaffiliates.png',      light: true  },
  { id: 5, name: 'AIPrintOnDemand.com',     url: 'aiprintondemand.com',    href: 'https://aiprintondemand.com',    tag: 'AI + E-commerce',     year: '2025', description: 'Generate AI designs and push them directly to Printify products — instantly.',                                                stack: ['Next.js', 'Replicate', 'Printify', 'Stripe'],                   screenshot: '/screenshots/aipod.png',              light: true  },
  { id: 6, name: 'VintageGarageSale.com',   url: 'vintagegaragesale.com',  href: 'https://vintagegaragesale.com',  tag: 'Marketplace',         year: '2025', description: 'Curated vintage & thrifted marketplace. Buy now or name your price with offer negotiation.',                                   stack: ['Next.js', 'Supabase', 'Cloudflare R2', 'Resend'],               screenshot: '/screenshots/vintagegaragesale.png',  light: false },
  { id: 7, name: 'AIDigitalProducts.com',   url: 'aidigitalproducts.com',  href: 'https://aidigitalproducts.com',  tag: 'Digital Marketplace', year: '2025', description: 'Ready-made AI products that work out of the box. Built by experts, deployed in minutes.',                                      stack: ['Next.js', 'Supabase', 'Stripe', 'Resend'],                      screenshot: '/screenshots/aidigitalproducts.png',  light: true  },
  { id: 8, name: 'HomeServiceAgents.com',   url: 'homeserviceagents.com',  href: 'https://homeserviceagents.com',  tag: 'AI + Home Services',  year: '2025', description: 'AI matches homeowners with vetted, insured agents for plumbing, junk removal, pool cleaning and more — instantly.',         stack: ['WordPress', 'AI Booking', 'Twilio'],                            screenshot: '/screenshots/homeserviceagents.png',  light: true  },
  { id: 9, name: 'FreeAIReceptionist.com',  url: 'freeaireceptionist.com', href: 'https://freeaireceptionist.com', tag: 'Voice AI',            year: '2025', description: 'AI receptionist that answers calls 24/7 — captures leads, books appointments, and routes callers so you never miss a call.',  stack: ['Next.js', 'Supabase', 'Twilio', 'ElevenLabs', 'Stripe'],        screenshot: '/screenshots/freeaireceptionist.png', light: true  },
]

export default function WorkPageClient() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div style={{ background: '#f5f4f0', minHeight: '100vh', fontFamily: 'var(--sans)', paddingTop: '60px' }}>

      <Navbar />

      {/* HERO */}
      <div style={{
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1rem, 4vw, 3rem) clamp(2rem, 5vw, 4rem)',
        borderBottom: '1px solid rgba(15,15,14,0.1)',
        position: 'relative', overflow: 'hidden',
        background: '#f5f4f0',
      }}>
        <div style={{ position: 'absolute', top: '-30%', right: '-5%', width: '35vw', height: '35vw', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(232,82,26,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: '1.5rem' }}>Selected work</span>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 400, lineHeight: 1, color: '#0f0f0e', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            Built from<br /><em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>scratch.</em>
          </h1>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: 'rgba(15,15,14,0.5)', lineHeight: 1.75, maxWidth: '52ch' }}>
            Every platform here was designed, developed, and deployed solo — full-stack, from zero to production.
          </p>
        </div>
        <div style={{
          position: 'absolute', bottom: '-0.5rem', right: 'clamp(1rem, 4vw, 3rem)',
          fontFamily: 'var(--serif)', fontSize: 'clamp(6rem, 18vw, 14rem)',
          fontWeight: 400, color: 'rgba(160,160,160,0.18)',
          lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
        }}>
          {projects.length}
        </div>
      </div>

      {/* DESKTOP list */}
      <div className="desktop-list" style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem)' }}>
        {projects.map((p, i) => (
          <a key={p.id} href={p.href} target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)}
            style={{ display: 'grid', gridTemplateColumns: '3rem 1fr 1fr', gap: 'clamp(1rem, 3vw, 2.5rem)', alignItems: 'center', padding: 'clamp(1.5rem, 4vw, 2.5rem) 0', borderBottom: '1px solid rgba(15,15,14,0.1)', textDecoration: 'none', cursor: 'pointer', position: 'relative' }}
          >
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300, color: hovered === p.id ? 'var(--coral)' : 'rgba(15,15,14,0.25)', letterSpacing: '0.08em', transition: 'color 0.2s', alignSelf: 'start', paddingTop: '0.2rem' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 400, color: hovered === p.id ? 'var(--coral)' : '#0f0f0e', lineHeight: 1.1, transition: 'color 0.2s' }}>{p.name}</h2>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0f0f0e', border: '1px solid var(--coral-border)', padding: '0.15rem 0.5rem', background: 'rgba(232,82,26,0.06)' }}>{p.tag}</span>
              </div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, color: 'rgba(15,15,14,0.35)', letterSpacing: '0.08em', marginBottom: '1rem' }}>{p.url}</p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', color: 'rgba(15,15,14,0.6)', lineHeight: 1.7, maxWidth: '42ch', marginBottom: '1.25rem' }}>{p.description}</p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {p.stack.map(s => (
                  <span key={s} style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', fontWeight: 400, letterSpacing: '0.06em', padding: '0.2rem 0.5rem', background: '#eceae4', color: '#0f0f0e', border: '1px solid rgba(15,15,14,0.15)' }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{ transform: hovered === p.id ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)', transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)' }}>
              <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(15,15,14,0.1)', boxShadow: hovered === p.id ? '0 24px 64px rgba(0,0,0,0.15), 0 0 0 1px rgba(232,82,26,0.2)' : '0 8px 32px rgba(0,0,0,0.08)', transition: 'box-shadow 0.3s ease' }}>
                <div style={{ height: 32, background: '#2a2a2a', display: 'flex', alignItems: 'center', padding: '0 10px', gap: '5px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57', flexShrink: 0 }} />
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e', flexShrink: 0 }} />
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840', flexShrink: 0 }} />
                  <div style={{ flex: 1, height: 16, background: '#444', borderRadius: 3, margin: '0 6px', display: 'flex', alignItems: 'center', paddingLeft: 6, fontFamily: 'monospace', fontSize: '0.55rem', color: '#888', overflow: 'hidden', whiteSpace: 'nowrap' }}>{p.url}</div>
                </div>
                <div style={{ width: '100%', aspectRatio: '16/9', background: p.light ? '#f5f5f5' : '#1a1a1a', overflow: 'hidden' }}>
                  <img src={p.screenshot} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', filter: hovered === p.id ? 'none' : 'brightness(0.92)', transition: 'filter 0.3s ease' }}
                    onError={e => { const el = e.currentTarget.parentElement!; e.currentTarget.style.display = 'none'; el.style.display = 'flex'; el.style.alignItems = 'center'; el.style.justifyContent = 'center'; el.innerHTML = `<span style="font-family:monospace;font-size:0.65rem;color:rgba(0,0,0,0.3);letter-spacing:0.1em;text-transform:uppercase">${p.url}</span>` }}
                  />
                </div>
              </div>
            </div>
            <div style={{ position: 'absolute', top: 'clamp(1.5rem, 4vw, 2.5rem)', right: 0, fontFamily: 'var(--mono)', fontSize: '0.75rem', color: hovered === p.id ? 'var(--coral)' : 'rgba(15,15,14,0.2)', transition: 'color 0.2s, transform 0.2s', transform: hovered === p.id ? 'translate(4px, -2px)' : 'translate(0,0)' }}>↗</div>
          </a>
        ))}
      </div>

      {/* MOBILE grid */}
      <div className="mobile-grid" style={{ display: 'none', padding: '1.5rem 1rem 3rem', flexDirection: 'column', gap: '1.5rem' }}>
        {projects.map((p, i) => (
          <a key={p.id} href={p.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none', border: '1px solid rgba(15,15,14,0.12)', borderRadius: '12px', overflow: 'hidden', background: '#ffffff' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: p.light ? '#f0f0f0' : '#1a1a1a', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 28, background: 'rgba(30,30,30,0.95)', zIndex: 2, display: 'flex', alignItems: 'center', padding: '0 10px', gap: '5px' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff5f57', flexShrink: 0 }} />
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#febc2e', flexShrink: 0 }} />
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#28c840', flexShrink: 0 }} />
                <div style={{ flex: 1, height: 14, background: 'rgba(255,255,255,0.1)', borderRadius: 3, margin: '0 6px', display: 'flex', alignItems: 'center', paddingLeft: 6, fontFamily: 'monospace', fontSize: '0.5rem', color: 'rgba(255,255,255,0.5)', overflow: 'hidden', whiteSpace: 'nowrap' }}>{p.url}</div>
              </div>
              <img src={p.screenshot} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                onError={e => { const el = e.currentTarget.parentElement!; e.currentTarget.style.display = 'none'; el.style.display = 'flex'; el.style.alignItems = 'center'; el.style.justifyContent = 'center'; el.innerHTML += `<span style="font-family:monospace;font-size:0.65rem;color:rgba(0,0,0,0.3);letter-spacing:0.08em;text-transform:uppercase;padding-top:28px">${p.url}</span>` }}
              />
              <div style={{ position: 'absolute', top: 36, left: 12, fontFamily: 'var(--mono)', fontSize: '0.55rem', fontWeight: 300, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>{String(i + 1).padStart(2, '0')}</div>
            </div>
            <div style={{ padding: '1.1rem 1.1rem 1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 400, color: '#0f0f0e', lineHeight: 1.15 }}>{p.name}</h2>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.5rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0f0f0e', border: '1px solid var(--coral-border)', padding: '0.15rem 0.45rem', background: 'rgba(232,82,26,0.06)', whiteSpace: 'nowrap', flexShrink: 0, marginTop: '0.2rem' }}>{p.tag}</span>
              </div>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', color: 'rgba(15,15,14,0.6)', lineHeight: 1.65, marginBottom: '1rem' }}>{p.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {p.stack.slice(0, 3).map(s => (
                    <span key={s} style={{ fontFamily: 'var(--mono)', fontSize: '0.5rem', fontWeight: 400, letterSpacing: '0.05em', padding: '0.18rem 0.45rem', background: '#eceae4', color: '#0f0f0e', border: '1px solid rgba(15,15,14,0.15)' }}>{s}</span>
                  ))}
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--coral)' }}>↗</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* FOOTER CTA */}
      <div style={{ borderTop: '1px solid rgba(15,15,14,0.1)', padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem)', textAlign: 'center', position: 'relative', overflow: 'hidden', background: '#0f0f0e' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(232,82,26,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: '1.5rem' }}>Want something built?</span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 400, lineHeight: 1.1, color: '#f7f5f0', marginBottom: '1.5rem' }}>
            Your business.<br /><em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>Powered by AI.</em>
          </h2>
          <a href="/#contact" style={{ display: 'inline-block', fontFamily: 'var(--sans)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--coral)', color: '#fff', padding: '1rem 2.5rem', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >Book a Strategy Call →</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .desktop-list { display: none !important; }
          .mobile-grid  { display: flex !important; }
        }
      `}</style>
    </div>
  )
}