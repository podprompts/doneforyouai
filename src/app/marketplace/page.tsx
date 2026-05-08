'use client'

import { useState } from 'react'
import Link from 'next/link'
import OperatorVideoBackground from '@/app/components/media/OperatorVideoBackground'
import { resolveVideoSource, getVideoLabel } from '@/lib/media'

interface Operator {
  id: string
  name: string
  handle: string
  title: string
  location: string
  avatar: string
  tags: string[]
  specialty: string
  rate: string
  rateType: string
  rating: number
  reviews: number
  available: boolean
  featured: boolean
  bio: string
  deliverables: string[]
  muxPlaybackId?: string
  r2Key?: string
  youtubeUrl?: string
}

const operators: Operator[] = [
  {
    id: '1',
    name: 'Maya Reeves',
    handle: 'mayabuilds',
    title: 'AI Automation Architect',
    location: 'Austin, TX',
    avatar: 'MR',
    tags: ['Automation', 'Zapier', 'Make', 'n8n'],
    specialty: 'Workflow Automation',
    rate: '$2,400',
    rateType: 'per project',
    rating: 4.9,
    reviews: 34,
    available: true,
    featured: true,
    bio: 'I build end-to-end automation systems that eliminate manual work. Specialize in connecting AI tools with existing business ops.',
    deliverables: ['Workflow audit', 'Full build + testing', 'Team handoff doc'],
    muxPlaybackId: '',
    r2Key: '',
    youtubeUrl: '',
  },
  {
    id: '2',
    name: 'James Okoro',
    handle: 'jokoro_ai',
    title: 'Chatbot & Assistant Specialist',
    location: 'Remote',
    avatar: 'JO',
    tags: ['ChatGPT', 'Claude', 'Voiceflow', 'Customer Service'],
    specialty: 'AI Assistants',
    rate: '$180',
    rateType: 'per hour',
    rating: 5.0,
    reviews: 19,
    available: true,
    featured: true,
    bio: "Custom AI assistants trained on your brand voice and knowledge base. I've built chatbots for e-commerce, healthcare, and SaaS.",
    deliverables: ['Discovery call', 'Custom assistant build', '30-day support'],
    muxPlaybackId: '', r2Key: '', youtubeUrl: '',
  },
  {
    id: '3',
    name: 'Priya Nair',
    handle: 'priya.ops',
    title: 'AI Content Systems Builder',
    location: 'New York, NY',
    avatar: 'PN',
    tags: ['Content', 'SEO', 'Email', 'Social'],
    specialty: 'Content Engines',
    rate: '$1,800',
    rateType: 'per project',
    rating: 4.8,
    reviews: 52,
    available: false,
    featured: false,
    bio: "I design AI content pipelines that produce on-brand blogs, emails, and social posts at scale. No generic output — everything sounds like you.",
    deliverables: ['Brand voice audit', 'Pipeline build', 'Monthly content calendar'],
    muxPlaybackId: '', r2Key: '', youtubeUrl: '',
  },
  {
    id: '4',
    name: 'Derek Lam',
    handle: 'derekbuilds',
    title: 'AI Lead Gen & Outreach Operator',
    location: 'San Francisco, CA',
    avatar: 'DL',
    tags: ['Lead Gen', 'Clay', 'Apollo', 'Cold Email'],
    specialty: 'Lead Generation',
    rate: '$3,200',
    rateType: 'per project',
    rating: 4.7,
    reviews: 28,
    available: true,
    featured: false,
    bio: "AI-powered prospecting and outreach systems. I build the infrastructure that keeps your pipeline full without manual research.",
    deliverables: ['ICP definition', 'Outreach system build', 'First 500 leads'],
    muxPlaybackId: '', r2Key: '', youtubeUrl: '',
  },
  {
    id: '5',
    name: 'Sasha Monroe',
    handle: 'sashaai',
    title: 'AI Strategy & Stack Consultant',
    location: 'Chicago, IL',
    avatar: 'SM',
    tags: ['Strategy', 'Tool Selection', 'Roadmap', 'Training'],
    specialty: 'AI Strategy',
    rate: '$250',
    rateType: 'per hour',
    rating: 4.9,
    reviews: 41,
    available: true,
    featured: true,
    bio: "I help businesses figure out exactly which AI tools to use and how. No fluff, no vendor bias — just the right stack for your specific situation.",
    deliverables: ['AI audit', 'Custom roadmap', 'Tool stack recommendation'],
    muxPlaybackId: '', r2Key: '', youtubeUrl: '',
  },
  {
    id: '6',
    name: 'Tomas Vega',
    handle: 'tomasv',
    title: 'AI Tool Stack Integrator',
    location: 'Miami, FL',
    avatar: 'TV',
    tags: ['Integrations', 'APIs', 'Zapier', 'Airtable'],
    specialty: 'Tool Stack Setup',
    rate: '$1,500',
    rateType: 'per project',
    rating: 4.6,
    reviews: 17,
    available: true,
    featured: false,
    bio: "I get your AI tools talking to each other. Specializing in no-code/low-code integration setups that your team can actually maintain.",
    deliverables: ['Stack audit', 'Full integration build', 'Video walkthrough'],
    muxPlaybackId: '', r2Key: '', youtubeUrl: '',
  },
]

const specialties = ['All', 'Workflow Automation', 'AI Assistants', 'Content Engines', 'Lead Generation', 'AI Strategy', 'Tool Stack Setup']

const avatarColors: Record<string, string> = {
  MR: '#e8521a', JO: '#3ecf8e', PN: '#a78bfa',
  DL: '#60a5fa', SM: '#f59e0b', TV: '#f472b6',
}

export default function Marketplace() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [availableOnly, setAvailableOnly] = useState(false)
  const [search, setSearch] = useState('')
  const [activeCard, setActiveCard] = useState<string | null>(null)

  const filtered = operators.filter(op => {
    const matchSpec = activeFilter === 'All' || op.specialty === activeFilter
    const matchAvail = !availableOnly || op.available
    const matchSearch = !search ||
      op.name.toLowerCase().includes(search.toLowerCase()) ||
      op.specialty.toLowerCase().includes(search.toLowerCase()) ||
      op.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    return matchSpec && matchAvail && matchSearch
  })

  const featured = filtered.filter(o => o.featured)
  const rest = filtered.filter(o => !o.featured)

  return (
    <div style={{ background: 'var(--ink)', minHeight: '100vh', fontFamily: 'var(--sans)' }}>

      {/* NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.25rem', height: 56,
        background: 'rgba(15,15,14,0.97)',
        borderBottom: '1px solid var(--border-dark)',
        backdropFilter: 'blur(12px)',
      }}>
        <Link href="/" style={{
          fontFamily: 'var(--sans)', fontWeight: 800, fontSize: '0.82rem',
          letterSpacing: '0.06em', textTransform: 'uppercase',
          color: 'rgba(247,245,240,0.5)', textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
        }}>
          <span style={{ width: 6, height: 6, background: 'var(--coral)', borderRadius: '50%' }} />
          DFYAI
        </Link>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300,
          letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--coral)',
        }}>Operator Marketplace</span>
        <button style={{
          fontFamily: 'var(--sans)', fontSize: '0.68rem', fontWeight: 600,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: 'var(--ink)', background: 'var(--coral)',
          border: 'none', padding: '0.45rem 1rem', cursor: 'pointer',
        }}>Join as Operator</button>
      </nav>

      {/* HERO */}
      <div style={{
        padding: 'clamp(3rem, 8vw, 6rem) 1.25rem clamp(2rem, 5vw, 4rem)',
        borderBottom: '1px solid var(--border-dark)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-30%', right: '-10%',
          width: '50vw', height: '50vw', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(232,82,26,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 640 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--coral)', border: '1px solid var(--coral-border)',
            padding: '0.35rem 0.75rem', marginBottom: '1.5rem',
          }}>
            <span style={{ width: 5, height: 5, background: 'var(--coral)', borderRadius: '50%', animation: 'pulse-dot 2s infinite' }} />
            {operators.filter(o => o.available).length} operators available now
          </div>
          <h1 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2.2rem, 6vw, 4rem)',
            fontWeight: 400, lineHeight: 1.08, marginBottom: '1rem',
          }}>
            Find your<br />
            <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>AI operator.</em>
          </h1>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
            color: 'rgba(247,245,240,0.45)', lineHeight: 1.75, maxWidth: '42ch',
          }}>
            Independent AI specialists who build, deploy, and run AI systems
            inside your business. Vetted by DoneForYouAI. Ready to work.
          </p>
        </div>
      </div>

      {/* SEARCH + FILTERS */}
      <div style={{
        position: 'sticky', top: 56, zIndex: 90,
        background: 'rgba(15,15,14,0.97)',
        borderBottom: '1px solid var(--border-dark)',
        backdropFilter: 'blur(12px)',
        padding: '0.85rem 1.25rem',
      }}>
        <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
          <span style={{
            position: 'absolute', left: '0.85rem', top: '50%',
            transform: 'translateY(-50%)',
            fontFamily: 'var(--mono)', fontSize: '0.75rem',
            color: 'rgba(247,245,240,0.25)',
          }}>⌕</span>
          <input
            type="text"
            placeholder="Search by skill, tool, or specialty..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', background: 'var(--ink-2)',
              border: '1px solid var(--border-dark)',
              color: 'var(--page)', fontFamily: 'var(--sans)', fontSize: '0.85rem',
              padding: '0.65rem 0.85rem 0.65rem 2.25rem',
              outline: 'none', transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--coral-border)'}
            onBlur={e => e.target.style.borderColor = 'var(--border-dark)'}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '2px', scrollbarWidth: 'none' }}>
          {specialties.map(s => (
            <button key={s} onClick={() => setActiveFilter(s)} style={{
              fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '0.4rem 0.85rem', whiteSpace: 'nowrap', border: '1px solid',
              borderColor: activeFilter === s ? 'var(--coral)' : 'var(--border-dark)',
              background: activeFilter === s ? 'var(--coral)' : 'transparent',
              color: activeFilter === s ? 'var(--white)' : 'rgba(247,245,240,0.4)',
              cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0,
            }}>{s}</button>
          ))}
          <button onClick={() => setAvailableOnly(!availableOnly)} style={{
            fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '0.4rem 0.85rem', whiteSpace: 'nowrap', border: '1px solid',
            borderColor: availableOnly ? '#3ecf8e' : 'var(--border-dark)',
            background: availableOnly ? 'rgba(62,207,142,0.12)' : 'transparent',
            color: availableOnly ? '#3ecf8e' : 'rgba(247,245,240,0.4)',
            cursor: 'pointer', transition: 'all 0.15s',
            flexShrink: 0, marginLeft: 'auto',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: availableOnly ? '#3ecf8e' : 'rgba(247,245,240,0.2)' }} />
            Available now
          </button>
        </div>
      </div>

      {/* RESULTS */}
      <div style={{ padding: '1.5rem 1.25rem', maxWidth: 900, margin: '0 auto' }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'rgba(247,245,240,0.25)', marginBottom: '1.5rem',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
        }}>
          <span style={{ color: 'var(--coral)' }}>{filtered.length}</span> operators found
          <span style={{ flex: 1, height: '0.5px', background: 'var(--border-dark)' }} />
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 1.25rem', fontFamily: 'var(--serif)', fontSize: '1.4rem', color: 'rgba(247,245,240,0.25)' }}>
            No operators match that search.
          </div>
        )}

        {featured.length > 0 && (
          <>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--coral)', marginBottom: '0.85rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <span style={{ width: 5, height: 5, background: 'var(--coral)', borderRadius: '50%' }} />
              Featured operators
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginBottom: '2rem' }}>
              {featured.map(op => (
                <OperatorCard key={op.id} op={op}
                  active={activeCard === op.id}
                  onToggle={() => setActiveCard(activeCard === op.id ? null : op.id)}
                  featured
                />
              ))}
            </div>
          </>
        )}

        {rest.length > 0 && (
          <>
            {featured.length > 0 && (
              <div style={{
                fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'rgba(247,245,240,0.25)', marginBottom: '0.85rem',
              }}>All operators</div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              {rest.map(op => (
                <OperatorCard key={op.id} op={op}
                  active={activeCard === op.id}
                  onToggle={() => setActiveCard(activeCard === op.id ? null : op.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* JOIN CTA */}
      <div style={{
        margin: '2rem auto 4rem', maxWidth: 900,
        border: '1px solid var(--border-dark)',
        padding: 'clamp(2rem, 6vw, 3.5rem) clamp(1.5rem, 5vw, 3rem)',
        position: 'relative', overflow: 'hidden',
        marginLeft: '1.25rem', marginRight: '1.25rem',
      }}>
        <div style={{
          position: 'absolute', top: 0, right: 0,
          fontFamily: 'var(--sans)', fontWeight: 800,
          fontSize: 'clamp(4rem, 15vw, 10rem)',
          color: 'rgba(255,255,255,0.025)', lineHeight: 1,
          letterSpacing: '-0.05em', pointerEvents: 'none', userSelect: 'none',
        }}>OP</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--coral)', display: 'block', marginBottom: '1rem',
          }}>Are you an AI operator?</span>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
            fontWeight: 400, lineHeight: 1.15, marginBottom: '0.85rem',
          }}>
            List your services.<br />
            <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>Get found. Get hired.</em>
          </h2>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.85rem',
            color: 'rgba(247,245,240,0.4)', lineHeight: 1.7,
            maxWidth: '44ch', marginBottom: '1.5rem',
          }}>
            Join the DoneForYouAI operator network. Get your profile in front of
            businesses actively looking for AI help — no cold outreach required.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <button style={{
              fontFamily: 'var(--sans)', fontSize: '0.75rem', fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              background: 'var(--coral)', color: 'var(--white)',
              border: 'none', padding: '0.85rem 2rem', cursor: 'pointer',
            }}>Apply to Join →</button>
            <button style={{
              fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300,
              letterSpacing: '0.08em', background: 'transparent',
              color: 'rgba(247,245,240,0.4)',
              border: '1px solid var(--border-dark)', padding: '0.85rem 1.5rem', cursor: 'pointer',
            }}>Learn about operator perks</button>
          </div>
        </div>
      </div>

    </div>
  )
}

// ── OPERATOR CARD ──────────────────────────────────────────────
function OperatorCard({ op, active, onToggle, featured = false }: {
  op: Operator; active: boolean; onToggle: () => void; featured?: boolean
}) {
  const videoSource = resolveVideoSource({
    r2Key: op.r2Key,
    muxPlaybackId: op.muxPlaybackId,
    youtubeUrl: op.youtubeUrl,
  })
  const hasVideo = Boolean(videoSource)
  const videoLabel = getVideoLabel(videoSource)

  return (
    <div style={{
      position: 'relative',
      background: active ? 'var(--ink-2)' : featured ? 'rgba(232,82,26,0.04)' : 'var(--ink)',
      border: `1px solid ${active ? 'var(--coral-border)' : featured ? 'rgba(232,82,26,0.15)' : 'var(--border-dark)'}`,
      transition: 'background 0.3s, border-color 0.3s',
      marginBottom: '1px',
      // Give the card enough height when video is active so video fills it
      minHeight: active && hasVideo ? 380 : undefined,
      overflow: 'hidden',
    }}>

      {/* ── VIDEO LAYER (z:1) — full-bleed behind everything ── */}
      <OperatorVideoBackground
        source={videoSource}
        active={active && hasVideo}
        opacity={0.28}
      />

      {/* ── ALL CARD CONTENT (z:3, above video + its overlay) ── */}
      <div style={{ position: 'relative', zIndex: 3 }}>

        {/* Header row — always visible, click toggles card */}
        <div
          onClick={onToggle}
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            gap: 'clamp(0.75rem, 3vw, 1.25rem)',
            padding: 'clamp(1rem, 4vw, 1.5rem)',
            cursor: 'pointer', alignItems: 'center',
          }}
        >
          {/* Avatar */}
          <div style={{
            width: 'clamp(40px, 10vw, 52px)', height: 'clamp(40px, 10vw, 52px)',
            borderRadius: '50%',
            background: avatarColors[op.avatar] || 'var(--coral)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--sans)', fontWeight: 700,
            fontSize: 'clamp(0.7rem, 2.5vw, 0.85rem)',
            color: 'var(--white)', flexShrink: 0,
            opacity: op.available ? 1 : 0.5,
            position: 'relative',
          }}>
            {op.avatar}
            {op.available && (
              <span style={{
                position: 'absolute', bottom: 2, right: 2,
                width: 8, height: 8, background: '#3ecf8e',
                borderRadius: '50%', border: '1.5px solid var(--ink)',
              }} />
            )}
          </div>

          {/* Name / title / tags */}
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)', color: 'var(--page)' }}>{op.name}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, color: 'rgba(247,245,240,0.3)' }}>@{op.handle}</span>
              {featured && (
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: '0.55rem', fontWeight: 300,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--coral)', border: '1px solid var(--coral-border)',
                  padding: '0.1rem 0.4rem',
                }}>Featured</span>
              )}
              {/* Live reel badge */}
              {hasVideo && active && (
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: '0.55rem', fontWeight: 300,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'rgba(247,245,240,0.55)',
                  display: 'flex', alignItems: 'center', gap: '0.3rem',
                }}>
                  <span style={{
                    width: 4, height: 4, background: 'var(--coral)',
                    borderRadius: '50%', animation: 'pulse-dot 1.5s infinite',
                  }} />
                  {videoLabel}
                </span>
              )}
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(0.75rem, 2vw, 0.82rem)', color: 'rgba(247,245,240,0.45)', marginBottom: '0.5rem' }}>
              {op.title} · {op.location}
            </div>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {op.tags.slice(0, 3).map(tag => (
                <span key={tag} style={{
                  fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300,
                  letterSpacing: '0.06em', padding: '0.2rem 0.5rem',
                  background: 'var(--ink-3)', color: 'rgba(247,245,240,0.45)',
                  border: '1px solid var(--border-dark)',
                }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Rate + rating */}
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 400, color: 'var(--page)', lineHeight: 1 }}>{op.rate}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, color: 'rgba(247,245,240,0.3)', marginBottom: '0.35rem' }}>{op.rateType}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, color: '#3ecf8e' }}>★ {op.rating} ({op.reviews})</div>
          </div>
        </div>

        {/* ── EXPANDED PANEL ── */}
        {active && (
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: 'clamp(1rem, 4vw, 1.5rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            // When video is playing, ghost the profile content back so video is the hero
            opacity: hasVideo ? 0.15 : 1,
            transition: 'opacity 0.7s ease',
          }}>
            <div>
              <span style={{
                fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'rgba(247,245,240,0.3)', display: 'block', marginBottom: '0.5rem',
              }}>About</span>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: 'rgba(247,245,240,0.65)', lineHeight: 1.7 }}>{op.bio}</p>
              <div style={{ marginTop: '1rem' }}>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'rgba(247,245,240,0.3)', display: 'block', marginBottom: '0.5rem',
                }}>What you get</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {op.deliverables.map((d, i) => (
                    <span key={i} style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', color: 'rgba(247,245,240,0.6)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--coral)', fontSize: '0.6rem' }}>◆</span>{d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{
                fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'rgba(247,245,240,0.3)',
              }}>Connect</span>
              <button style={{
                fontFamily: 'var(--sans)', fontSize: '0.75rem', fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                background: op.available ? 'var(--coral)' : 'rgba(247,245,240,0.08)',
                color: op.available ? 'var(--white)' : 'rgba(247,245,240,0.25)',
                border: 'none', padding: '0.85rem 1.5rem',
                cursor: op.available ? 'pointer' : 'not-allowed',
                width: '100%', textAlign: 'left',
              }}>
                {op.available ? 'Book a Strategy Call →' : 'Currently Unavailable'}
              </button>
              {op.available && (
                <button style={{
                  fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300,
                  letterSpacing: '0.08em', background: 'transparent',
                  color: 'rgba(247,245,240,0.5)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '0.85rem 1.5rem', cursor: 'pointer',
                  width: '100%', textAlign: 'left',
                }}>Send a message →</button>
              )}
              <div style={{
                fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300,
                letterSpacing: '0.06em', color: 'rgba(247,245,240,0.18)', lineHeight: 1.6,
              }}>
                All operators are vetted<br />by the DoneForYouAI team.
              </div>
            </div>
          </div>
        )}

        {/* ── CLOSE HINT — only when video is active ── */}
        {active && hasVideo && (
          <div
            onClick={onToggle}
            style={{
              position: 'absolute',
              bottom: '1.25rem', right: '1.25rem',
              zIndex: 10,
              fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'rgba(247,245,240,0.4)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.4rem 0.75rem',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(15,15,14,0.65)',
              backdropFilter: 'blur(8px)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--page)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(247,245,240,0.4)'}
          >
            ✕ close
          </div>
        )}

      </div>
    </div>
  )
}