'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { resolveVideoSource, getVideoThumbnail } from '@/lib/media'

const AVATAR_COLORS: Record<string, string> = {
  MR: '#e8521a', JO: '#3ecf8e', PN: '#a78bfa',
  DL: '#60a5fa', SM: '#f59e0b', TV: '#f472b6',
}
const COLOR_POOL = ['#e8521a', '#3ecf8e', '#a78bfa', '#60a5fa', '#f59e0b', '#f472b6']

const TIER_CONFIG: Record<string, { label: string; color: string; border: string }> = {
  basic:     { label: 'Basic',     color: 'rgba(247,245,240,0.3)', border: 'rgba(247,245,240,0.12)' },
  free:      { label: 'Basic',     color: 'rgba(247,245,240,0.3)', border: 'rgba(247,245,240,0.12)' },
  pro:       { label: 'Pro',       color: '#f59e0b',              border: 'rgba(245,158,11,0.3)'   },
  elite:     { label: 'Pro',       color: '#f59e0b',              border: 'rgba(245,158,11,0.3)'   },
  pro_video: { label: 'Pro+Video', color: '#3ecf8e',              border: 'rgba(62,207,142,0.3)'   },
}

// ── Video Player ──────────────────────────────────────────────────
function VideoPlayer({ source }: { source: NonNullable<ReturnType<typeof resolveVideoSource>> }) {
  const [playing, setPlaying] = useState(false)
  const thumbnail = getVideoThumbnail(source)

  if (source.type === 'youtube') {
    return (
      <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', background: '#000', borderRadius: '4px', overflow: 'hidden' }}>
        {!playing ? (
          <>
            {thumbnail && <img src={thumbnail} alt="Video" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />}
            <div onClick={() => setPlaying(true)} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'rgba(15,15,14,0.35)' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--coral)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', color: '#fff', boxShadow: '0 0 0 16px rgba(232,82,26,0.15)', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >▶</div>
            </div>
          </>
        ) : (
          <>
            <iframe
              src={source.src}
              allow="autoplay; encrypted-media"
              allowFullScreen={false}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              title="Operator video"
            />
            {/* Click-blocker — prevents clicks on title/channel/Watch on YouTube */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '85%', zIndex: 2, background: 'transparent', cursor: 'default' }} />
          </>
        )}
      </div>
    )
  }

  if (source.type === 'r2' || source.type === 'mux') {
    return (
      <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', background: '#000', borderRadius: '4px', overflow: 'hidden' }}>
        <video autoPlay controls style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} poster={source.poster}>
          {source.type === 'mux' && <source src={source.src} type="application/x-mpegURL" />}
          <source src={source.type === 'mux' ? `https://stream.mux.com/${source.playbackId}/high.mp4` : source.src} type="video/mp4" />
        </video>
      </div>
    )
  }
  return null
}

// ── Page ──────────────────────────────────────────────────────────
export default function OperatorProfilePage() {
  const params   = useParams()
  const router   = useRouter()
  const handle   = params?.handle as string
  const [op, setOp]       = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!handle) return
    const fetch = async () => {
      const { data, error } = await supabase
        .from('operators')
        .select('*')
        .eq('handle', handle)
        .eq('approved', true)
        .single()

      if (error || !data) { setNotFound(true) }
      else { setOp(data) }
      setLoading(false)
    }
    fetch()
  }, [handle])

  if (loading) {
    return (
      <div style={{ background: 'var(--ink)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.25)', animation: 'pulse-dot 1.5s infinite' }}>Loading profile...</span>
      </div>
    )
  }

  if (notFound || !op) {
    return (
      <div style={{ background: 'var(--ink)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
        <p style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', color: 'rgba(247,245,240,0.3)', fontWeight: 400 }}>Operator not found.</p>
        <Link href="/marketplace" style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--coral)', textDecoration: 'none' }}>← Back to marketplace</Link>
      </div>
    )
  }

  const avatarColor  = AVATAR_COLORS[op.avatar] || COLOR_POOL[0]
  const tier         = TIER_CONFIG[op.tier] || TIER_CONFIG.pro
  const videoSource  = resolveVideoSource({ r2Key: op.r2_key, muxPlaybackId: op.mux_playback_id, youtubeUrl: op.youtube_url })
  const hasVideo     = Boolean(videoSource)

  // Pre-filled contact form URL
  const contactMsg   = encodeURIComponent(`Hi, I'm interested in working with ${op.name} (${op.specialty}). Please connect us.`)
  const contactUrl   = `/#contact?operator=${encodeURIComponent(op.name)}&message=${contactMsg}`
  const bookUrl      = `/#contact?operator=${encodeURIComponent(op.name)}&service=${encodeURIComponent(op.specialty || '')}&message=${encodeURIComponent(`I'd like to book a strategy call with ${op.name}.`)}`

  const scrollToContact = (prefill: { message: string; service?: string }) => {
    // Store prefill in sessionStorage so Contact form picks it up
    sessionStorage.setItem('contactPrefill', JSON.stringify({
      operator: op.name,
      service: prefill.service || op.specialty || '',
      message: prefill.message,
    }))
    window.location.href = '/#contact'
  }

  return (
    <div style={{ background: 'var(--ink)', minHeight: '100vh', fontFamily: 'var(--sans)' }}>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.25rem', height: 56, background: 'rgba(15,15,14,0.97)', borderBottom: '1px solid var(--border-dark)', backdropFilter: 'blur(12px)' }}>
        <Link href="/marketplace" style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.4)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          ← Marketplace
        </Link>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--coral)' }}>@{op.handle}</span>
        <button
          onClick={() => scrollToContact({ message: `I'd like to book a strategy call with ${op.name}.`, service: op.specialty })}
          style={{ fontFamily: 'var(--sans)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)', background: 'var(--coral)', border: 'none', padding: '0.45rem 1rem', cursor: 'pointer' }}
        >
          Book a Call
        </button>
      </nav>

      {/* HERO */}
      <div style={{ borderBottom: '1px solid var(--border-dark)', padding: 'clamp(2.5rem, 6vw, 4rem) 1.25rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '1.5rem', alignItems: 'center' }}>

          {/* Avatar */}
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: '1.1rem', color: '#fff', flexShrink: 0, position: 'relative' }}>
            {op.avatar}
            {op.available && <span style={{ position: 'absolute', bottom: 3, right: 3, width: 12, height: 12, background: '#3ecf8e', borderRadius: '50%', border: '2px solid var(--ink)' }} />}
          </div>

          {/* Name / title */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
              <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 400, color: 'var(--page)', lineHeight: 1.1 }}>{op.name}</h1>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'rgba(247,245,240,0.3)' }}>@{op.handle}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: tier.color, border: `1px solid ${tier.border}`, padding: '0.15rem 0.5rem' }}>{tier.label}</span>
              {hasVideo && <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: '#3ecf8e', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><span style={{ fontSize: '0.5rem' }}>▶</span> video</span>}
            </div>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.9rem', color: 'rgba(247,245,240,0.45)', marginBottom: '0.5rem' }}>{op.title} · {op.location}</p>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {(op.tags || []).map((tag: string) => (
                <span key={tag} style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, padding: '0.2rem 0.5rem', background: 'var(--ink-3)', color: 'rgba(247,245,240,0.45)', border: '1px solid var(--border-dark)' }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Rate + rating */}
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 400, color: 'var(--page)', lineHeight: 1 }}>{op.rate}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: 'rgba(247,245,240,0.3)', marginBottom: '0.35rem' }}>{op.rate_type}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: '#3ecf8e' }}>★ {op.rating} ({op.reviews} reviews)</div>
            <div style={{ marginTop: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: op.available ? '#3ecf8e' : 'rgba(247,245,240,0.3)', display: 'flex', alignItems: 'center', gap: '0.35rem', justifyContent: 'flex-end' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: op.available ? '#3ecf8e' : '#555', display: 'inline-block' }} />
                {op.available ? 'Available now' : 'Currently unavailable'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(2rem, 5vw, 3.5rem) 1.25rem', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '3rem', alignItems: 'start' }}>

        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

          {/* Video */}
          {hasVideo && videoSource && (
            <div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.3)', marginBottom: '0.85rem' }}>
                Intro Video
              </p>
              <VideoPlayer source={videoSource} />
            </div>
          )}

          {/* Bio */}
          <div>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.3)', marginBottom: '0.85rem' }}>About</p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.95rem', color: 'rgba(247,245,240,0.65)', lineHeight: 1.8 }}>{op.bio}</p>
          </div>

          {/* Deliverables */}
          {op.deliverables?.length > 0 && (
            <div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.3)', marginBottom: '0.85rem' }}>What you get</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {op.deliverables.map((d: string, i: number) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', padding: '0.85rem 1rem', border: '1px solid var(--border-dark)', background: 'rgba(255,255,255,0.02)' }}>
                    <span style={{ color: 'var(--coral)', fontSize: '0.7rem', flexShrink: 0, marginTop: '0.1rem' }}>◆</span>
                    <span style={{ fontFamily: 'var(--sans)', fontSize: '0.88rem', color: 'rgba(247,245,240,0.7)' }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Specialty */}
          {op.specialty && (
            <div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.3)', marginBottom: '0.85rem' }}>Specialty</p>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', fontWeight: 300, letterSpacing: '0.08em', color: 'var(--coral)', border: '1px solid var(--coral-border)', padding: '0.5rem 1rem' }}>{op.specialty}</span>
            </div>
          )}

          {/* Capacity / response time */}
          {(op.capacity || op.response_time || op.project_duration) && (
            <div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.3)', marginBottom: '0.85rem' }}>Working Details</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1px', background: 'var(--border-dark)' }}>
                {[
                  { label: 'Capacity',       value: op.capacity },
                  { label: 'Response time',  value: op.response_time },
                  { label: 'Project length', value: op.project_duration },
                ].filter(r => r.value).map(r => (
                  <div key={r.label} style={{ padding: '1rem', background: 'var(--ink)' }}>
                    <p style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'rgba(247,245,240,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{r.label}</p>
                    <p style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: 'var(--page)' }}>{r.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — sticky CTA panel */}
        <div style={{ position: 'sticky', top: '72px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Rate card */}
          <div style={{ border: '1px solid var(--border-dark)', padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-dark)' }}>
              <div>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'rgba(247,245,240,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Rate</p>
                <p style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: 'var(--page)', lineHeight: 1 }}>{op.rate}</p>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'rgba(247,245,240,0.3)' }}>{op.rate_type}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: '#3ecf8e' }}>★ {op.rating}</p>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'rgba(247,245,240,0.3)' }}>{op.reviews} reviews</p>
              </div>
            </div>

            {/* Book a Strategy Call → contact form pre-filled */}
            <button
              onClick={() => scrollToContact({
                service: op.specialty || '',
                message: `I'd like to book a strategy call with ${op.name} (${op.specialty}). Please connect us.`,
              })}
              disabled={!op.available}
              style={{ width: '100%', fontFamily: 'var(--sans)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: op.available ? 'var(--coral)' : 'rgba(247,245,240,0.08)', color: op.available ? '#fff' : 'rgba(247,245,240,0.25)', border: 'none', padding: '1rem', cursor: op.available ? 'pointer' : 'not-allowed', marginBottom: '0.75rem', transition: 'opacity 0.2s', textAlign: 'center' }}
              onMouseEnter={e => { if (op.available) e.currentTarget.style.opacity = '0.85' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              {op.available ? 'Book a Strategy Call →' : 'Currently Unavailable'}
            </button>

            {/* Send a message → contact form pre-filled */}
            <button
              onClick={() => scrollToContact({
                service: op.specialty || '',
                message: `I'd like to send a message to ${op.name} (${op.specialty}). Please connect us.`,
              })}
              style={{ width: '100%', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 300, letterSpacing: '0.08em', background: 'transparent', color: 'rgba(247,245,240,0.55)', border: '1px solid var(--border-dark)', padding: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--coral-border)'; e.currentTarget.style.color = 'var(--page)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-dark)'; e.currentTarget.style.color = 'rgba(247,245,240,0.55)' }}
            >
              Send a message →
            </button>

            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'rgba(247,245,240,0.2)', lineHeight: 1.65, marginTop: '1rem', textAlign: 'center' }}>
              All inquiries are handled by<br />the DoneForYouAI team.
            </p>
          </div>

          {/* Stats */}
          {(op.profile_views || op.review_count) && (
            <div style={{ border: '1px solid var(--border-dark)', padding: '1rem 1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border-dark)' }}>
              {[
                { label: 'Profile views', value: op.profile_views || 0 },
                { label: 'Reviews',       value: op.review_count  || op.reviews || 0 },
              ].map(s => (
                <div key={s.label} style={{ background: 'var(--ink)', padding: '0.85rem' }}>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', color: 'var(--coral)', lineHeight: 1, marginBottom: '0.2rem' }}>{s.value}</p>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '0.56rem', color: 'rgba(247,245,240,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Back to marketplace */}
          <Link href="/marketplace" style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.3)', textDecoration: 'none', textAlign: 'center', padding: '0.5rem', transition: 'color 0.15s', display: 'block' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--page)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(247,245,240,0.3)'}
          >
            ← Browse all operators
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .profile-grid { grid-template-columns: 1fr !important; }
          .profile-hero-grid { grid-template-columns: auto 1fr !important; }
          .profile-sticky { position: static !important; }
        }
      `}</style>
    </div>
  )
}