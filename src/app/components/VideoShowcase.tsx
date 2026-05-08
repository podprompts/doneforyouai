'use client'

import { useState } from 'react'

// ─────────────────────────────────────────────────────────────────
// VIDEO SHOWCASE SECTION
//
// Now supports YouTube embeds in addition to Mux.
// Priority: Mux (if NEXT_PUBLIC_SHOWCASE_MUX_PLAYBACK_ID is set)
//           → YouTube (if NEXT_PUBLIC_SHOWCASE_YOUTUBE_ID is set)
//           → Placeholder
//
// For YouTube, set:
//   NEXT_PUBLIC_SHOWCASE_YOUTUBE_ID=dQw4w9WgXcQ
//   (just the video ID, not the full URL)
// ─────────────────────────────────────────────────────────────────

const MUX_PLAYBACK_ID    = process.env.NEXT_PUBLIC_SHOWCASE_MUX_PLAYBACK_ID || ''
const YOUTUBE_ID         = process.env.NEXT_PUBLIC_SHOWCASE_YOUTUBE_ID || ''

interface Props {
  mode?: 'embed' | 'bg'
}

export default function VideoShowcase({ mode = 'embed' }: Props) {
  const [playing, setPlaying] = useState(false)

  const hasMux     = Boolean(MUX_PLAYBACK_ID)
  const hasYoutube = Boolean(YOUTUBE_ID)
  const hasVideo   = hasMux || hasYoutube

  // Which thumbnail to show before play
  const thumbSrc = hasMux
    ? `https://image.mux.com/${MUX_PLAYBACK_ID}/thumbnail.jpg?time=0&width=1280`
    : hasYoutube
    ? `https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`
    : null

  // The actual player element
  function VideoPlayer() {
    if (hasMux) {
      return (
        <video autoPlay controls style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
          <source src={`https://stream.mux.com/${MUX_PLAYBACK_ID}.m3u8`} type="application/x-mpegURL" />
          <source src={`https://stream.mux.com/${MUX_PLAYBACK_ID}/high.mp4`} type="video/mp4" />
        </video>
      )
    }
    if (hasYoutube) {
      return (
        <iframe
          src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
        />
      )
    }
    return null
  }

  if (mode === 'bg') {
    return (
      <section id="work" style={{
        position: 'relative', minHeight: '70vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        borderTop: '1px solid var(--border-dark)',
        borderBottom: '1px solid var(--border-dark)',
        textAlign: 'center', padding: '8rem 2.5rem',
      }}>
        {hasMux ? (
          <>
            <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }}>
              <source src={`https://stream.mux.com/${MUX_PLAYBACK_ID}.m3u8`} type="application/x-mpegURL" />
              <source src={`https://stream.mux.com/${MUX_PLAYBACK_ID}/high.mp4`} type="video/mp4" />
            </video>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,15,14,0.88), rgba(15,15,14,0.72), rgba(15,15,14,0.88))' }} />
          </>
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(232,82,26,0.07) 0%, var(--ink) 70%)' }} />
        )}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: '1.5rem' }}>How We Work</span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, lineHeight: 1.1, color: 'var(--page)', marginBottom: '1.5rem' }}>
            Watch what it looks like<br />
            <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>inside your business.</em>
          </h2>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.9rem', color: 'rgba(247,245,240,0.45)', lineHeight: 1.75, marginBottom: '2.5rem' }}>
            In 3 minutes, we'll show you exactly how we implement AI inside a real business — the tools, the workflow, the results.
          </p>
          <button onClick={() => setPlaying(true)} style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--coral)', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: 'var(--white)', transition: 'transform 0.2s', margin: '0 auto' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >▶</button>
        </div>
      </section>
    )
  }

  // ── mode === 'embed' ──────────────────────────────────────────────
  return (
    <section id="work" style={{ background: 'var(--ink)', padding: '7rem 2.5rem', borderTop: '1px solid var(--border-dark)', borderBottom: '1px solid var(--border-dark)' }}>

      {/* Header */}
      <div id="work-header" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'end', marginBottom: '3.5rem' }}>
        <div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: '1rem' }}>See It In Action</span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 400, lineHeight: 1.1, color: 'var(--page)' }}>
            Watch how we build AI<br />
            <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>inside real businesses.</em>
          </h2>
        </div>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '0.88rem', color: 'rgba(247,245,240,0.42)', lineHeight: 1.75, alignSelf: 'center' }}>
          A walkthrough of our process — from the first strategy call to a fully deployed AI system running inside a client's business. No fluff, just the actual work.
        </p>
      </div>

      {/* Video frame */}
      <div style={{ position: 'relative', border: '1px solid var(--border-dark)', overflow: 'hidden', aspectRatio: '16 / 9', background: 'var(--ink-2)', cursor: hasVideo ? 'pointer' : 'default' }}
        onClick={() => hasVideo && !playing && setPlaying(true)}
      >
        {/* Playing state */}
        {playing && hasVideo && (
          <div style={{ position: 'absolute', inset: 0 }}>
            <VideoPlayer />
          </div>
        )}

        {/* Pre-play state — thumbnail + play button */}
        {!playing && hasVideo && thumbSrc && (
          <>
            <img src={thumbSrc} alt="Video thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,15,14,0.40)' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--coral)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: 'var(--white)', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 0 0 12px rgba(232,82,26,0.15)' }}>▶</div>
            </div>
          </>
        )}

        {/* Placeholder — no video configured */}
        {!hasVideo && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', border: '1px solid var(--coral-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: 'var(--coral)' }}>▶</div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.25)', display: 'block', marginBottom: '0.5rem' }}>
                Add your YouTube video ID
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'rgba(247,245,240,0.15)', letterSpacing: '0.08em' }}>
                Set NEXT_PUBLIC_SHOWCASE_YOUTUBE_ID in .env.local
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Below video meta */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', padding: '1rem 0', borderTop: '1px solid var(--border-dark)' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.25)' }}>DoneForYouAI · Process Overview</span>
        {playing && (
          <button onClick={() => setPlaying(false)} style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', background: 'transparent', border: '1px solid var(--border-dark)', padding: '0.3rem 0.75rem', cursor: 'pointer' }}>
            ✕ close
          </button>
        )}
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: 'var(--coral)', letterSpacing: '0.08em' }}>doneforyouai.com</span>
      </div>

      <style>{`
        @media (max-width: 680px) {
          #work { padding: 4rem 1.25rem !important; }
          #work-header { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
        }
      `}</style>
    </section>
  )
}