'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const MUX_PLAYBACK_ID = process.env.NEXT_PUBLIC_HERO_MUX_PLAYBACK_ID || ''

const AVATAR_COLORS = ['#e8521a', '#2cb67d', '#f5a623', '#7c3aed', '#0ea5e9']

const FALLBACK_OPERATORS = [
  {
    id: '1', name: 'Maya Reeves', handle: 'mayabuilds',
    title: 'AI Automation Architect', location: 'Austin, TX',
    avatar: 'MR', avatarColor: '#e8521a',
    tags: ['Automation', 'Zapier', 'Make'],
    rate: '$2,400', rate_type: 'per project',
    rating: 4.9, reviews: 34, available: true,
    bio: 'I build end-to-end automation systems that eliminate manual work.',
    deliverables: ['Workflow audit', 'Full build + testing', 'Team handoff doc'],
    youtube_url: '', r2_key: null, mux_playback_id: null,
  },
  {
    id: '2', name: 'James Okoro', handle: 'jokoro_ai',
    title: 'Chatbot & Assistant Specialist', location: 'Remote',
    avatar: 'JO', avatarColor: '#2cb67d',
    tags: ['ChatGPT', 'Claude', 'Voiceflow'],
    rate: '$180', rate_type: 'per hour',
    rating: 5.0, reviews: 19, available: true,
    bio: 'Custom AI assistants trained on your business voice and knowledge base.',
    deliverables: ['Bot strategy session', 'Full chatbot build', '30-day support'],
    youtube_url: '', r2_key: null, mux_playback_id: null,
  },
  {
    id: '3', name: 'Sasha Monroe', handle: 'sashaai',
    title: 'AI Strategy & Stack Consultant', location: 'Chicago, IL',
    avatar: 'SM', avatarColor: '#f5a623',
    tags: ['Strategy', 'Tool Selection', 'Roadmap'],
    rate: '$250', rate_type: 'per hour',
    rating: 4.9, reviews: 41, available: false,
    bio: 'A custom roadmap: which tools, which workflows, which prompts will compound.',
    deliverables: ['AI audit', 'Tool stack recommendation', 'Implementation roadmap'],
    youtube_url: '', r2_key: null, mux_playback_id: null,
  },
]

type Operator = typeof FALLBACK_OPERATORS[0]

export default function Hero() {
  const hasVideo = Boolean(MUX_PLAYBACK_ID)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [operators, setOperators] = useState<Operator[]>(FALLBACK_OPERATORS)

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const { data, error } = await supabase
          .from('operators')
          .select('id, name, handle, title, location, avatar, tags, rate, rate_type, rating, reviews, available, bio, deliverables, youtube_url, r2_key, mux_playback_id')
          .eq('featured', true)
          .eq('approved', true)
          .limit(3)

        if (error) throw error
        if (data && data.length > 0) {
          setOperators(data.map((op, i) => ({
            ...op,
            avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
            rate: `$${op.rate}`,
            youtube_url: op.youtube_url || '',
            r2_key: op.r2_key || null,
            mux_playback_id: op.mux_playback_id || null,
          })))
        }
      } catch (err) {
        console.error('[Hero] Operator fetch error:', err)
        // Keep fallback data on error
      }
    }
    fetchOperators()
  }, [])

  const toggle = (id: string, suffix = '') => {
    const key = id + suffix
    setExpanded(expanded === key ? null : key)
  }

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
              objectFit: 'cover', opacity: 0.28,
            }}>
              <source src={`https://stream.mux.com/${MUX_PLAYBACK_ID}.m3u8`} type="application/x-mpegURL" />
              <source src={`https://stream.mux.com/${MUX_PLAYBACK_ID}/high.mp4`} type="video/mp4" />
            </video>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(15,15,14,0.88) 0%, rgba(15,15,14,0.65) 50%, rgba(15,15,14,0.82) 100%)',
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
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '38vw', height: '38vw', borderTop: '1px solid rgba(255,255,255,0.06)', borderLeft: '1px solid rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 60, left: 0, width: '22vw', height: '22vw', borderBottom: '1px solid rgba(255,255,255,0.04)', borderRight: '1px solid rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
      </div>

      {/* Left copy */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="animate-fade-up delay-1" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
          fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--coral)', marginBottom: '2rem',
          border: '1px solid var(--coral-border)', padding: '0.4rem 0.9rem', width: 'fit-content',
        }}>
          <span style={{ width: 5, height: 5, background: 'var(--coral)', borderRadius: '50%', animation: 'pulse-dot 2s infinite' }} />
          AI Implementation Partner
        </div>

        <h1 className="animate-fade-up delay-2" style={{
          fontFamily: 'var(--serif)', fontSize: 'clamp(3rem, 5.5vw, 5.2rem)',
          fontWeight: 400, lineHeight: 1.06, letterSpacing: '-0.01em',
        }}>
          Your business.<br />
          <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>Powered by AI.</em><br />
          Done for you.
        </h1>

        <p className="animate-fade-up delay-3" style={{
          marginTop: '1.75rem', fontSize: '0.95rem',
          color: 'rgba(247,245,240,0.5)', lineHeight: 1.75, maxWidth: '38ch',
        }}>
          We build and deploy custom AI systems inside your business —
          automations, assistants, content engines, and more.
          You stay focused on running the show.
        </p>

        <div className="animate-fade-up delay-4" style={{
          marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap',
        }}>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              fontFamily: 'var(--sans)', fontSize: '0.75rem', fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              background: 'var(--coral)', color: 'var(--white)',
              border: 'none', padding: '0.95rem 2.25rem', cursor: 'pointer',
              transition: 'opacity 0.2s, transform 0.15s',
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
              display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--page)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(247,245,240,0.48)')}
          >
            See Services <span>↓</span>
          </button>
        </div>
      </div>

      {/* Right — Operator Panel (desktop) */}
      <div className="animate-fade-in delay-5 hero-panel" style={{
        position: 'relative', zIndex: 1,
        border: '1px solid var(--border-dark)', overflow: 'hidden',
      }}>
        <OperatorPanel operators={operators} expanded={expanded} onToggle={(id) => toggle(id)} suffix="" />
      </div>

      {/* Mobile operator panel */}
      <div className="hero-panel-mobile" style={{ position: 'relative', zIndex: 1 }}>
        <OperatorPanel operators={operators} expanded={expanded} onToggle={(id) => toggle(id, '-m')} suffix="-m" />
      </div>

      <style>{`
        .hero-panel-mobile { display: none; }
        @media (max-width: 768px) {
          section {
            grid-template-columns: 1fr !important;
            padding: 100px 1.25rem 60px !important;
            gap: 2.5rem !important;
          }
          .hero-panel { display: none !important; }
          .hero-panel-mobile { display: block !important; }
        }
      `}</style>
    </section>
  )
}

function OperatorPanel({ operators, expanded, onToggle, suffix }: {
  operators: Operator[]
  expanded: string | null
  onToggle: (id: string) => void
  suffix: string
}) {
  return (
    <div style={{ border: '1px solid var(--border-dark)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-dark)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.3)' }}>
          Featured Operators
        </span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: '#3ecf8e', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: 5, height: 5, background: '#3ecf8e', borderRadius: '50%', animation: 'pulse-dot 2.2s infinite' }} />
          Available Now
        </span>
      </div>

      {/* Operator rows */}
      {operators.map((op, i) => {
        const key = op.id + suffix
        const isOpen = expanded === key
        return (
          <div key={op.id}>
            <button
              onClick={() => onToggle(op.id)}
              style={{
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                padding: '1.1rem 1.5rem',
                borderBottom: isOpen ? 'none' : (i < operators.length - 1 ? '1px solid var(--border-dark)' : 'none'),
                display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
              {/* Avatar */}
              <div style={{
                width: 42, height: 42, borderRadius: '50%', background: op.avatarColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--sans)', fontWeight: 700, fontSize: '0.72rem',
                color: '#fff', flexShrink: 0, position: 'relative',
              }}>
                {op.avatar}
                {op.available && (
                  <span style={{ position: 'absolute', bottom: 1, right: 1, width: 8, height: 8, borderRadius: '50%', background: '#3ecf8e', border: '1.5px solid var(--ink)' }} />
                )}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.15rem' }}>
                  <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: '0.82rem', color: 'var(--page)' }}>{op.name}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'rgba(247,245,240,0.3)' }}>@{op.handle}</span>
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, color: 'rgba(247,245,240,0.42)', marginBottom: '0.4rem' }}>
                  {op.title} · {op.location}
                </div>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {op.tags.slice(0, 3).map((tag: string) => (
                    <span key={tag} style={{ fontFamily: 'var(--mono)', fontSize: '0.56rem', fontWeight: 300, padding: '0.2rem 0.5rem', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(247,245,240,0.4)' }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Rate */}
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', color: 'var(--page)', lineHeight: 1 }}>{op.rate}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.56rem', color: 'rgba(247,245,240,0.3)', marginBottom: '0.3rem' }}>{op.rate_type}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: '#3ecf8e' }}>★ {op.rating} ({op.reviews})</div>
              </div>

              <span style={{
                color: 'rgba(247,245,240,0.25)', fontSize: '0.7rem', flexShrink: 0,
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s',
              }}>▼</span>
            </button>

            {/* Expanded */}
            {isOpen && (
              <div style={{
                padding: '0 1.5rem 1.25rem',
                borderBottom: i < operators.length - 1 ? '1px solid var(--border-dark)' : 'none',
                background: 'rgba(255,255,255,0.02)',
              }}>
                {/* Video if available */}
                {(op.youtube_url || op.r2_key || op.mux_playback_id) && (
                  <div style={{ marginBottom: '1rem', position: 'relative', paddingBottom: '56.25%', background: '#000' }}>
                    {op.youtube_url ? (
                      <iframe
                        src={getYouTubeEmbedUrl(op.youtube_url)}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                    ) : op.mux_playback_id ? (
                      <video
                        src={`https://stream.mux.com/${op.mux_playback_id}/high.mp4`}
                        controls style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : null}
                  </div>
                )}

                <p style={{ fontFamily: 'var(--sans)', fontSize: '0.78rem', color: 'rgba(247,245,240,0.5)', lineHeight: 1.65, marginBottom: '0.85rem' }}>{op.bio}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {op.deliverables.map((d: string) => (
                    <span key={d} style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, padding: '0.3rem 0.7rem', border: '1px solid var(--coral-border)', color: 'var(--coral)' }}>✓ {d}</span>
                  ))}
                </div>
                <Link href="/marketplace" style={{ display: 'inline-block', fontFamily: 'var(--sans)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--coral)', color: '#fff', padding: '0.5rem 1.25rem', textDecoration: 'none' }}>
                  View Profile →
                </Link>
              </div>
            )}
          </div>
        )
      })}

      {/* Footer */}
      <div style={{
        padding: '0.85rem 1.5rem', borderTop: '1px solid var(--border-dark)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[{ val: '47+', label: 'Businesses' }, { val: '98%', label: 'Satisfaction' }, { val: '3wk', label: 'Delivery' }].map(s => (
            <div key={s.label}>
              <span style={{ fontFamily: 'var(--serif)', fontSize: '1rem', color: 'var(--coral)', display: 'block', lineHeight: 1 }}>{s.val}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.52rem', fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.25)' }}>{s.label}</span>
            </div>
          ))}
        </div>
        <Link href="/marketplace" style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--coral)', textDecoration: 'none' }}>
          View All →
        </Link>
      </div>
    </div>
  )
}

function getYouTubeEmbedUrl(url: string): string {
  try {
    // Handle youtu.be short links
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1].split(/[?&]/)[0]
      return `https://www.youtube.com/embed/${id}`
    }
    // Handle youtube.com/shorts
    if (url.includes('/shorts/')) {
      const id = url.split('/shorts/')[1].split(/[?&]/)[0]
      return `https://www.youtube.com/embed/${id}`
    }
    // Handle standard watch URLs
    const urlObj = new URL(url)
    const id = urlObj.searchParams.get('v')
    if (id) return `https://www.youtube.com/embed/${id}`
  } catch {}
  return url
}