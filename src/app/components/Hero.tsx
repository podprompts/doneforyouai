'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { OperatorCard, type OperatorCardData } from '@/app/components/OperatorCard'

const MUX_PLAYBACK_ID = process.env.NEXT_PUBLIC_HERO_MUX_PLAYBACK_ID || ''

const AVATAR_COLORS = ['#e8521a', '#2cb67d', '#f5a623', '#7c3aed', '#0ea5e9']

const FALLBACK_OPERATORS: OperatorCardData[] = [
  {
    id: '1', name: 'Maya Reeves', handle: 'mayabuilds',
    title: 'AI Automation Architect', location: 'Austin, TX',
    avatar: 'MR', avatarColor: '#e8521a',
    tags: ['Automation', 'Zapier', 'Make'],
    rate: '$2,400', rate_type: 'per project',
    rating: 4.9, reviews: 34, available: true, featured: true, tier: 'pro_video',
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
    rating: 5.0, reviews: 19, available: true, featured: true, tier: 'pro',
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
    rating: 4.9, reviews: 41, available: false, featured: true, tier: 'pro_video',
    bio: 'A custom roadmap: which tools, which workflows, which prompts will compound.',
    deliverables: ['AI audit', 'Tool stack recommendation', 'Implementation roadmap'],
    youtube_url: '', r2_key: null, mux_playback_id: null,
  },
]

export default function Hero() {
  const hasVideo = Boolean(MUX_PLAYBACK_ID)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [operators, setOperators] = useState<OperatorCardData[]>(FALLBACK_OPERATORS)

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const { data, error } = await supabase
          .from('operators')
          .select('id, name, handle, title, location, avatar, tags, rate, rate_type, rating, reviews, available, bio, deliverables, tier, youtube_url, r2_key, mux_playback_id')
          .eq('featured', true)
          .eq('approved', true)
          .limit(3)

        if (error) throw error
        if (data && data.length > 0) {
          setOperators(data.map((op, i) => ({
            ...op,
            avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
            rate: op.rate,
            featured: true,
            youtube_url: op.youtube_url || '',
            r2_key: op.r2_key || null,
            mux_playback_id: op.mux_playback_id || null,
          })))
        }
      } catch (err) {
        console.error('[Hero] Operator fetch error:', err)
      }
    }
    fetchOperators()
  }, [])

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
            <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.28 }}>
              <source src={`https://stream.mux.com/${MUX_PLAYBACK_ID}.m3u8`} type="application/x-mpegURL" />
              <source src={`https://stream.mux.com/${MUX_PLAYBACK_ID}/high.mp4`} type="video/mp4" />
            </video>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,15,14,0.88) 0%, rgba(15,15,14,0.65) 50%, rgba(15,15,14,0.82) 100%)' }} />
          </>
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 20% 50%, rgba(232,82,26,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(247,245,240,0.03) 0%, transparent 40%), var(--ink)` }} />
        )}
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '38vw', height: '38vw', borderTop: '1px solid rgba(255,255,255,0.06)', borderLeft: '1px solid rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 60, left: 0, width: '22vw', height: '22vw', borderBottom: '1px solid rgba(255,255,255,0.04)', borderRight: '1px solid rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
      </div>

      {/* Left copy */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="animate-fade-up delay-1" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '2rem', border: '1px solid var(--coral-border)', padding: '0.4rem 0.9rem', width: 'fit-content' }}>
          <span style={{ width: 5, height: 5, background: 'var(--coral)', borderRadius: '50%', animation: 'pulse-dot 2s infinite' }} />
          AI Implementation Partner
        </div>

        <h1 className="animate-fade-up delay-2" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(3rem, 5.5vw, 5.2rem)', fontWeight: 400, lineHeight: 1.06, letterSpacing: '-0.01em' }}>
          Your business.<br />
          <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>Powered by AI.</em><br />
          Done for you.
        </h1>

        <p className="animate-fade-up delay-3" style={{ marginTop: '1.75rem', fontSize: '0.95rem', color: 'rgba(247,245,240,0.5)', lineHeight: 1.75, maxWidth: '38ch' }}>
          We build and deploy custom AI systems inside your business — automations, assistants, content engines, and more. You stay focused on running the show.
        </p>

        <div className="animate-fade-up delay-4" style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ fontFamily: 'var(--sans)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--coral)', color: '#fff', border: 'none', padding: '0.95rem 2.25rem', cursor: 'pointer', transition: 'opacity 0.2s, transform 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
          >Book a Free Strategy Call</button>
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ fontFamily: 'var(--sans)', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', color: 'rgba(247,245,240,0.48)', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--page)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(247,245,240,0.48)'}
          >See Services <span>↓</span></button>
        </div>
      </div>

      {/* Right — Operator panel */}
      <div className="animate-fade-in delay-5 hero-panel-single" style={{ position: 'relative', zIndex: 1 }}>
        <OperatorPanel operators={operators} expanded={expanded} onExpand={setExpanded} />
      </div>



      <style>{`
        @media (max-width: 768px) {
          section { grid-template-columns: 1fr !important; padding: 100px 1.25rem 60px !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  )
}

function OperatorPanel({ operators, expanded, onExpand }: {
  operators: OperatorCardData[]
  expanded: string | null
  onExpand: (id: string | null) => void
}) {
  return (
    <div style={{ border: '1px solid var(--border-dark)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-dark)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.3)' }}>Featured Operators</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: '#3ecf8e', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: 5, height: 5, background: '#3ecf8e', borderRadius: '50%', animation: 'pulse-dot 2.2s infinite' }} />
          Available Now
        </span>
      </div>

      {/* Operator cards */}
      {operators.map(op => (
        <OperatorCard
          key={op.id}
          op={op}
          active={expanded === op.id}
          onToggle={() => onExpand(expanded === op.id ? null : op.id)}
          showViewProfile={true}
          featured={op.featured}
        />
      ))}

      {/* Footer */}
      <div style={{ padding: '0.85rem 1.5rem', borderTop: '1px solid var(--border-dark)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[{ val: '47+', label: 'Businesses' }, { val: '98%', label: 'Satisfaction' }, { val: '3wk', label: 'Delivery' }].map(s => (
            <div key={s.label}>
              <span style={{ fontFamily: 'var(--serif)', fontSize: '1rem', color: 'var(--coral)', display: 'block', lineHeight: 1 }}>{s.val}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.52rem', fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.25)' }}>{s.label}</span>
            </div>
          ))}
        </div>
        <Link href="/marketplace" style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--coral)', textDecoration: 'none' }}>View All →</Link>
      </div>
    </div>
  )
}