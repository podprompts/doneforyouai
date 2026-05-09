'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { resolveVideoSource } from '@/lib/media'

export interface OperatorCardData {
  id: string
  name: string
  handle: string
  title: string
  location: string
  avatar: string
  avatarColor?: string
  tags: string[]
  specialty?: string
  rate: string
  rate_type: string
  rating: number
  reviews: number
  available: boolean
  featured?: boolean
  bio: string
  deliverables: string[]
  tier?: string
  mux_playback_id?: string | null
  r2_key?: string | null
  youtube_url?: string | null
}

const TIER_CONFIG: Record<string, { label: string; color: string; border: string }> = {
  basic:     { label: 'Basic',     color: 'rgba(247,245,240,0.3)', border: 'rgba(247,245,240,0.12)' },
  free:      { label: 'Basic',     color: 'rgba(247,245,240,0.3)', border: 'rgba(247,245,240,0.12)' },
  pro:       { label: 'Pro',       color: '#f59e0b',              border: 'rgba(245,158,11,0.3)'   },
  elite:     { label: 'Pro',       color: '#f59e0b',              border: 'rgba(245,158,11,0.3)'   },
  pro_video: { label: 'Pro+Video', color: '#3ecf8e',              border: 'rgba(62,207,142,0.3)'   },
}

// ── Video player ──────────────────────────────────────────────────
// - Autoplays immediately when mounted (card expands)
// - YouTube: iframe with autoplay=1, mute=0, controls=1 so user can pause
// - Native video: autoPlay + controls
// - Click-blocker covers only the very top bar (title/channel) — NOT the controls
function AutoVideo({ source }: { source: NonNullable<ReturnType<typeof resolveVideoSource>> }) {
  if (source.type === 'youtube') {
    // Build URL: autoplay on, audio on, controls visible so user can pause
    const embedId = source.embedId
    const src = `https://www.youtube-nocookie.com/embed/${embedId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&playsinline=1&fs=0&color=white`

    return (
      <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', background: '#000', overflow: 'hidden' }}>
        <iframe
          src={src}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen={false}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
          title="Operator video"
        />
        {/*
          Click-blocker covers ONLY the top ~12% of the iframe:
          - Blocks: channel name, video title (top bar)
          - Does NOT block: play/pause, volume, progress bar (bottom controls)
          This lets the user pause/seek without being redirected to YouTube
        */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '12%',
          zIndex: 2,
          background: 'transparent',
          cursor: 'default',
          pointerEvents: 'auto',
        }} />
      </div>
    )
  }

  if (source.type === 'r2' || source.type === 'mux') {
    return (
      <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', background: '#000' }}>
        <video
          autoPlay
          controls
          playsInline  // required for iOS autoplay
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          poster={source.poster}
        >
          {source.type === 'mux' && <source src={source.src} type="application/x-mpegURL" />}
          <source
            src={source.type === 'mux'
              ? `https://stream.mux.com/${source.playbackId}/high.mp4`
              : source.src}
            type="video/mp4"
          />
        </video>
      </div>
    )
  }

  return null
}

// ── Operator Card ─────────────────────────────────────────────────
export function OperatorCard({
  op,
  active,
  onToggle,
  showViewProfile = true,
  featured = false,
}: {
  op: OperatorCardData
  active: boolean
  onToggle: () => void
  showViewProfile?: boolean
  featured?: boolean
}) {
  const router      = useRouter()
  const videoSource = resolveVideoSource({
    r2Key:         op.r2_key         || undefined,
    muxPlaybackId: op.mux_playback_id || undefined,
    youtubeUrl:    op.youtube_url     || undefined,
  })
  const hasVideo = Boolean(videoSource)
  const tier     = TIER_CONFIG[op.tier || 'pro'] || TIER_CONFIG.pro
  const avatarBg = op.avatarColor || '#e8521a'

  const goToContact = (e: React.MouseEvent, type: 'book' | 'message') => {
    e.stopPropagation()
    const message = type === 'book'
      ? `I'd like to book a strategy call with ${op.name}${op.specialty ? ` (${op.specialty})` : ''}. Please connect us.`
      : `I'd like to get in touch with ${op.name}${op.specialty ? ` (${op.specialty})` : ''}. Please connect us.`
    try {
      sessionStorage.setItem('contactPrefill', JSON.stringify({
        operator: op.name,
        service:  op.specialty || '',
        message,
      }))
    } catch {}
    router.push('/#contact')
  }

  return (
    <div style={{
      background: active ? 'var(--ink-2)' : featured ? 'rgba(232,82,26,0.04)' : 'var(--ink)',
      border: `1px solid ${active ? 'var(--coral-border)' : featured ? 'rgba(232,82,26,0.15)' : 'var(--border-dark)'}`,
      transition: 'background 0.25s, border-color 0.25s',
      marginBottom: '1px',
      overflow: 'hidden',
    }}>

      {/* ── Header row ── */}
      <div
        onClick={onToggle}
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: 'clamp(0.75rem, 3vw, 1.25rem)',
          padding: 'clamp(1rem, 4vw, 1.5rem)',
          cursor: 'pointer',
          alignItems: 'center',
        }}
      >
        {/* Avatar */}
        <div style={{
          width: 'clamp(40px,10vw,52px)', height: 'clamp(40px,10vw,52px)',
          borderRadius: '50%', background: avatarBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--sans)', fontWeight: 700,
          fontSize: 'clamp(0.7rem,2.5vw,0.85rem)', color: '#fff',
          flexShrink: 0, opacity: op.available ? 1 : 0.5, position: 'relative',
        }}>
          {op.avatar}
          {op.available && (
            <span style={{ position: 'absolute', bottom: 2, right: 2, width: 8, height: 8, background: '#3ecf8e', borderRadius: '50%', border: '1.5px solid var(--ink)' }} />
          )}
        </div>

        {/* Name / title / badges */}
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 'clamp(0.85rem,2.5vw,0.95rem)', color: 'var(--page)' }}>{op.name}</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, color: 'rgba(247,245,240,0.3)' }}>@{op.handle}</span>
            {featured && (
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--coral)', border: '1px solid var(--coral-border)', padding: '0.1rem 0.4rem' }}>Featured</span>
            )}
            {op.tier && (
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: tier.color, border: `1px solid ${tier.border}`, padding: '0.1rem 0.4rem' }}>{tier.label}</span>
            )}
            {hasVideo && (
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#3ecf8e', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.5rem' }}>▶</span> Video
              </span>
            )}
          </div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(0.75rem,2vw,0.82rem)', color: 'rgba(247,245,240,0.45)', marginBottom: '0.5rem' }}>
            {op.title} · {op.location}
          </div>
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {(op.tags || []).slice(0, 3).map(tag => (
              <span key={tag} style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.06em', padding: '0.2rem 0.5rem', background: 'var(--ink-3)', color: 'rgba(247,245,240,0.45)', border: '1px solid var(--border-dark)' }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Rate + rating + chevron */}
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.1rem,3vw,1.4rem)', fontWeight: 400, color: 'var(--page)', lineHeight: 1 }}>{op.rate}</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, color: 'rgba(247,245,240,0.3)', marginBottom: '0.25rem' }}>{op.rate_type}</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, color: '#3ecf8e' }}>★ {op.rating} ({op.reviews})</div>
          <span style={{
            color: 'rgba(247,245,240,0.25)', fontSize: '0.65rem', marginTop: '0.25rem',
            transform: active ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s', display: 'block',
          }}>▼</span>
        </div>
      </div>

      {/* ── Expanded panel ── */}
      {active && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>

          {/* Video — autoplays, controls visible so user can pause/seek */}
          {hasVideo && videoSource && <AutoVideo source={videoSource} />}

          {/* Bio · Deliverables · CTAs */}
          <div style={{
            padding: 'clamp(1rem, 4vw, 1.5rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}>
            <div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.3)', display: 'block', marginBottom: '0.5rem' }}>About</span>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: 'rgba(247,245,240,0.65)', lineHeight: 1.7, marginBottom: '1rem' }}>{op.bio}</p>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.3)', display: 'block', marginBottom: '0.5rem' }}>What you get</span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {(op.deliverables || []).map((d, i) => (
                  <span key={i} style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, padding: '0.3rem 0.7rem', border: '1px solid var(--coral-border)', color: 'var(--coral)' }}>✓ {d}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.3)' }}>Connect</span>

              <button
                onClick={e => goToContact(e, 'book')}
                disabled={!op.available}
                style={{ fontFamily: 'var(--sans)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: op.available ? 'var(--coral)' : 'rgba(247,245,240,0.08)', color: op.available ? '#fff' : 'rgba(247,245,240,0.25)', border: 'none', padding: '0.85rem 1.5rem', cursor: op.available ? 'pointer' : 'not-allowed', width: '100%', textAlign: 'left', transition: 'opacity 0.2s' }}
                onMouseEnter={e => { if (op.available) e.currentTarget.style.opacity = '0.85' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                {op.available ? 'Book a Strategy Call →' : 'Currently Unavailable'}
              </button>

              {op.available && (
                <button
                  onClick={e => goToContact(e, 'message')}
                  style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300, letterSpacing: '0.08em', background: 'transparent', color: 'rgba(247,245,240,0.5)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.85rem 1.5rem', cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--coral-border)'; e.currentTarget.style.color = 'var(--page)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(247,245,240,0.5)' }}
                >
                  Send a message →
                </button>
              )}

              {showViewProfile && (
                <Link
                  href={`/marketplace/${op.handle}`}
                  onClick={e => e.stopPropagation()}
                  style={{ display: 'block', fontFamily: 'var(--sans)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'transparent', color: 'rgba(247,245,240,0.4)', border: '1px solid var(--border-dark)', padding: '0.65rem 1.5rem', textDecoration: 'none', textAlign: 'center', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--coral-border)'; e.currentTarget.style.color = 'var(--page)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-dark)'; e.currentTarget.style.color = 'rgba(247,245,240,0.4)' }}
                >
                  View Full Profile →
                </Link>
              )}

              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.06em', color: 'rgba(247,245,240,0.18)', lineHeight: 1.6 }}>
                All inquiries handled by<br />the DoneForYouAI team.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}