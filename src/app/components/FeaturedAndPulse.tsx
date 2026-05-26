'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const AVATAR_COLORS = ['#e8521a', '#2cb67d', '#f5a623', '#7c3aed', '#0ea5e9', '#f472b6']

const PULSE_FEED = [
  { type: 'trend',  text: 'OpenAI releases GPT-5 with native voice + vision — real-time reasoning now standard' },
  { type: 'expert', avatar: 'MR', name: 'Maya Reeves',  color: '#e8521a', handle: 'mayabuilds',  text: "This reshapes every automation workflow I build. Voice-triggered n8n pipelines are now viable for SMBs without custom dev." },
  { type: 'expert', avatar: 'JO', name: 'James Okoro',  color: '#2cb67d', handle: 'jokoro_ai',   text: "My clients are asking about this daily. The voice layer alone eliminates 3 tools from the average support stack." },
  { type: 'trend',  text: 'Google Gemini 2.0 now embedded in Workspace — AI drafting, summarizing, and scheduling natively' },
  { type: 'expert', avatar: 'SM', name: 'Sasha Monroe', color: '#f5a623', handle: 'sashaai',     text: "Most businesses don't know half of what's already in their Google account. I spend 2hrs showing clients this — it changes everything." },
  { type: 'expert', avatar: 'PN', name: 'Priya Nair',   color: '#a78bfa', handle: 'priya.ops',   text: "Content teams that aren't using Gemini in Docs are already behind. I'm building full editorial pipelines on top of this." },
  { type: 'trend',  text: 'AI agents now booking meetings, sending follow-ups, and closing deals — without human input' },
  { type: 'expert', avatar: 'DL', name: 'Derek Lam',    color: '#60a5fa', handle: 'derekbuilds', text: "Built exactly this for a SaaS client last month. Clay + GPT-4o + Instantly = 40 qualified meetings booked in 2 weeks, zero manual outreach." },
  { type: 'expert', avatar: 'MR', name: 'Maya Reeves',  color: '#e8521a', handle: 'mayabuilds',  text: "The agentic layer is here. Businesses still doing manual follow-up in 6 months will be uncompetitive." },
  { type: 'trend',  text: 'Anthropic Claude 3.5 beats GPT-4 on coding benchmarks — enterprises shifting stacks' },
  { type: 'expert', avatar: 'TV', name: 'Tomas Vega',   color: '#f472b6', handle: 'tomasv',      text: "I've migrated 3 client stacks to Claude this quarter. Better instruction following, fewer hallucinations on structured data tasks." },
  { type: 'expert', avatar: 'SM', name: 'Sasha Monroe', color: '#f5a623', handle: 'sashaai',     text: "Tool selection matters more than ever. I'm doing full AI stack audits — most teams are using the wrong model for their use case." },
  { type: 'trend',  text: 'No-code AI builders surge: Voiceflow, Botpress, and Relevance AI hit 1M+ users each' },
  { type: 'expert', avatar: 'JO', name: 'James Okoro',  color: '#2cb67d', handle: 'jokoro_ai',   text: "Voiceflow is my go-to for customer-facing bots. Built a healthcare triage assistant last week — deployed in 4 days." },
  { type: 'expert', avatar: 'PN', name: 'Priya Nair',   color: '#a78bfa', handle: 'priya.ops',   text: "Relevance AI changed how I build content workflows. The agent layer is genuinely production-ready now." },
  { type: 'trend',  text: 'AI replacing first-round interviews — HireVue, Paradox, and custom GPT bots screening candidates' },
  { type: 'expert', avatar: 'DL', name: 'Derek Lam',    color: '#60a5fa', handle: 'derekbuilds', text: "Built a lead qualification bot that does exactly this for sales teams. Screens 200 inbound leads/day, only passes the top 15% to humans." },
  { type: 'expert', avatar: 'TV', name: 'Tomas Vega',   color: '#f472b6', handle: 'tomasv',      text: "The integration layer is the hard part — connecting these bots to your ATS, CRM, Slack. That's where I come in." },
  { type: 'trend',  text: 'Perplexity AI launches shopping mode — AI-native search threatens Google Shopping' },
  { type: 'expert', avatar: 'SM', name: 'Sasha Monroe', color: '#f5a623', handle: 'sashaai',     text: "SEO strategies built for Google are already obsolete. I'm helping clients build AI-discovery-optimized content architectures." },
  { type: 'expert', avatar: 'PN', name: 'Priya Nair',   color: '#a78bfa', handle: 'priya.ops',   text: "Content that answers specific questions wins in AI search. Generic blog posts are dead. Specificity is the new SEO." },
]

// ── Featured Expert Spotlight ─────────────────────────────────────
function FeaturedSpotlight({ op }: { op: any }) {
  const router = useRouter()
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsSignedIn(!!data.session)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(!!session)
    })
    return () => subscription.unsubscribe()
  }, [])

  const goToContact = () => {
    try {
      sessionStorage.setItem('contactPrefill', JSON.stringify({
        expert:  op.name,
        service: op.specialty || '',
        message: `I'd like to book a strategy call with ${op.name}. Please connect us.`,
      }))
    } catch {}
    router.push('/#contact')
  }

  return (
    <div style={{ border: '1px solid var(--coral-border)', background: 'rgba(232,82,26,0.04)', padding: '1rem 1.25rem', marginBottom: '1px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--coral)' }}>★ Featured this week</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', color: op.available ? '#3ecf8e' : 'rgba(247,245,240,0.3)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: op.available ? '#3ecf8e' : '#555', display: 'inline-block' }} />
          {op.available ? 'Available now' : 'Unavailable'}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.75rem' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: op.avatarColor || '#e8521a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: '0.72rem', color: '#fff', flexShrink: 0 }}>{op.avatar}</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: '0.88rem', color: 'var(--page)', marginBottom: '0.1rem' }}>{op.name}</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'rgba(247,245,240,0.4)' }}>{op.title}</div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right', flexShrink: 0, position: 'relative', minWidth: 0, maxWidth: 'clamp(70px, 20vw, 110px)' }}>
          <div style={{
            filter: isSignedIn ? 'none' : 'blur(6px)',
            userSelect: isSignedIn ? 'auto' : 'none',
            transition: 'filter 0.3s',
            pointerEvents: isSignedIn ? 'auto' : 'none',
          }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', color: 'var(--page)', lineHeight: 1 }}>{op.rate}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', color: 'rgba(247,245,240,0.3)' }}>{op.rate_type}</div>
          </div>
          {!isSignedIn && (
            <div
              onClick={() => router.push('/login')}
              style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}
            >
              <span style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.5rem',
                fontWeight: 300,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: 'var(--coral)',
                border: '1px solid var(--coral-border)',
                padding: '0.15rem 0.3rem',
                background: 'var(--ink)',
                whiteSpace: 'nowrap',
                display: 'block',
                textAlign: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>🔒 Sign in</span>
            </div>
          )}
        </div>
      </div>
      <p style={{ fontFamily: 'var(--sans)', fontSize: '0.75rem', color: 'rgba(247,245,240,0.5)', lineHeight: 1.6, marginBottom: '0.85rem' }}>
        {op.bio?.slice(0, 100)}{op.bio?.length > 100 ? '...' : ''}
      </p>
      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
        {(op.tags || []).slice(0, 3).map((tag: string) => (
          <span key={tag} style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', fontWeight: 300, padding: '0.2rem 0.5rem', background: 'var(--ink-3)', color: 'rgba(247,245,240,0.4)', border: '1px solid var(--border-dark)' }}>{tag}</span>
        ))}
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', color: '#3ecf8e', marginLeft: 'auto' }}>★ {op.rating} ({op.reviews})</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
        <button onClick={goToContact} disabled={!op.available} style={{ fontFamily: 'var(--sans)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: op.available ? 'var(--coral)' : 'rgba(247,245,240,0.08)', color: op.available ? '#fff' : 'rgba(247,245,240,0.25)', border: 'none', padding: '0.6rem', cursor: op.available ? 'pointer' : 'not-allowed', transition: 'opacity 0.2s' }}
          onMouseEnter={e => { if (op.available) e.currentTarget.style.opacity = '0.85' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
        >Book a Call →</button>
        <Link href={`/marketplace/${op.handle}`} style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300, letterSpacing: '0.06em', textTransform: 'uppercase', background: 'transparent', color: 'rgba(247,245,240,0.4)', border: '1px solid var(--border-dark)', padding: '0.6rem', textDecoration: 'none', textAlign: 'center', transition: 'all 0.15s', display: 'block' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--coral-border)'; e.currentTarget.style.color = 'var(--page)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-dark)'; e.currentTarget.style.color = 'rgba(247,245,240,0.4)' }}
        >View Profile</Link>
      </div>
    </div>
  )
}

// ── AI Pulse Feed ─────────────────────────────────────────────────
function AIPulseFeed() {
  const [visibleItems, setVisibleItems] = useState(PULSE_FEED.slice(0, 6))
  const [idx, setIdx] = useState(6)
  const feedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx(prev => {
        const next = prev >= PULSE_FEED.length ? 0 : prev
        setVisibleItems(curr => [...curr, PULSE_FEED[next]].slice(-12))
        return next + 1
      })
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: 'smooth' })
  }, [visibleItems])

  return (
    <div style={{ border: '1px solid var(--border-dark)', overflow: 'hidden', flex: 1 }}>
      <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-dark)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e53e3e', animation: 'pulse-dot 1.5s infinite', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--page)' }}>AI Pulse</span>
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', color: 'rgba(247,245,240,0.25)', letterSpacing: '0.08em' }}>LIVE · Experts REACTING</span>
      </div>
      <div ref={feedRef} style={{ height: 320, overflowY: 'auto', scrollbarWidth: 'none', padding: '0.5rem 0' }}>
        {visibleItems.map((item, i) => (
          <div key={i} style={{ padding: '0.6rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.04)', animation: i === visibleItems.length - 1 ? 'fadeSlideIn 0.4s ease' : 'none' }}>
            {item.type === 'trend' ? (
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.52rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--coral)', border: '1px solid var(--coral-border)', padding: '0.15rem 0.4rem', flexShrink: 0, marginTop: '0.1rem', whiteSpace: 'nowrap' }}>AI NEWS</span>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '0.75rem', color: 'rgba(247,245,240,0.75)', lineHeight: 1.5, fontWeight: 500, margin: 0 }}>{item.text}</p>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: '0.5rem', color: '#fff', flexShrink: 0 }}>{item.avatar}</div>
                <div style={{ minWidth: 0 }}>
                  <Link href={`/marketplace/${item.handle}`} style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, color: item.color, textDecoration: 'none', letterSpacing: '0.04em', display: 'block', marginBottom: '0.2rem' }}
                    onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                  >{item.name}</Link>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: '0.73rem', color: 'rgba(247,245,240,0.55)', lineHeight: 1.55, margin: 0 }}>{item.text}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ padding: '0.65rem 1rem', borderTop: '1px solid var(--border-dark)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', color: 'rgba(247,245,240,0.2)', letterSpacing: '0.08em' }}>
          {PULSE_FEED.filter(i => i.type === 'expert').length} Experts active
        </span>
        <Link href="/marketplace" style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--coral)', textDecoration: 'none' }}>
          View All Experts →
        </Link>
      </div>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

// ── Main Section ──────────────────────────────────────────────────
export default function FeaturedAndPulse() {
  const [featuredOp, setFeaturedOp] = useState<any>(null)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data, error } = await supabase
          .from('operators')
          .select('id, name, handle, title, location, avatar, tags, rate, rate_type, rating, reviews, available, bio, tier, youtube_url, r2_key, mux_playback_id, specialty')
          .eq('featured', true)
          .eq('approved', true)
          .order('rating', { ascending: false })
          .limit(1)
          .single()
        if (!error && data) setFeaturedOp({ ...data, avatarColor: '#e8521a' })
      } catch {}
    }
    fetchFeatured()
  }, [])

  const featured = featuredOp || {
    id: '1', name: 'Maya Reeves', handle: 'mayabuilds',
    title: 'AI Automation Architect', location: 'Austin, TX',
    avatar: 'MR', avatarColor: '#e8521a',
    tags: ['Automation', 'Zapier', 'Make'],
    rate: '$2,400', rate_type: 'per project',
    rating: 4.9, reviews: 34, available: true,
    bio: 'I build end-to-end automation systems that eliminate manual work. Specializing in connecting AI tools with existing business ops.',
    specialty: 'Workflow Automation',
  }

  return (
    <section style={{
      background: 'var(--ink)',
      borderTop: '1px solid var(--border-dark)',
      borderBottom: '1px solid var(--border-dark)',
      padding: 'clamp(3rem, 7vw, 5rem) 2.5rem',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

        {/* Left — section label + featured */}
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: '0.5rem' }}>Expert spotlight</span>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 400, color: 'var(--page)', lineHeight: 1.1 }}>
              Meet this week's<br />
              <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>featured expert.</em>
            </h2>
          </div>
          <FeaturedSpotlight op={featured} />
        </div>

        {/* Right — AI Pulse */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: '0.5rem' }}>Live feed</span>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 400, color: 'var(--page)', lineHeight: 1.1 }}>
              Experts reacting<br />
              <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>in real time.</em>
            </h2>
          </div>
          <AIPulseFeed />
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          section > div {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  )
}