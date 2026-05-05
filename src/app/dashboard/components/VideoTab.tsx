'use client'

import VideoUploader from '@/app/components/media/VideoUploader'
import { resolveVideoSource } from '@/lib/media'

interface Props {
  operator: {
    handle: string
    r2Key: string
    muxPlaybackId: string
    youtubeUrl: string
    tier: string
  }
  onSave: (data: any) => Promise<void>
  isPro: boolean
}

export default function VideoTab({ operator, onSave, isPro }: Props) {
  const currentSource = resolveVideoSource({
    r2Key: operator.r2Key,
    muxPlaybackId: operator.muxPlaybackId,
    youtubeUrl: operator.youtubeUrl,
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Explainer */}
      <div style={{
        padding: '1.25rem',
        border: '1px solid var(--border-dark)',
        background: 'var(--ink-2)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.25rem',
      }}>
        {[
          { label: 'Cloudflare R2', desc: 'Upload an MP4 directly. Clean, fast, no YouTube branding. Best option.', best: true },
          { label: 'YouTube URL',   desc: 'Paste any YouTube link. Easiest to set up if you already have a reel uploaded.' },
          { label: 'Mux ID',        desc: 'For power users. Adaptive bitrate streaming with analytics. Paste your Playback ID.' },
        ].map(opt => (
          <div key={opt.label} style={{
            padding: '1rem',
            border: `1px solid ${opt.best ? 'var(--coral-border)' : 'var(--border-dark)'}`,
            background: opt.best ? 'var(--coral-dim)' : 'transparent',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{
                fontFamily: 'var(--sans)', fontWeight: 600, fontSize: '0.82rem',
                color: opt.best ? 'var(--coral)' : 'var(--page)',
              }}>{opt.label}</span>
              {opt.best && (
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: '0.5rem', fontWeight: 300,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--coral)', border: '1px solid var(--coral-border)',
                  padding: '0.1rem 0.35rem',
                }}>Recommended</span>
              )}
            </div>
            <p style={{
              fontFamily: 'var(--sans)', fontSize: '0.78rem',
              color: 'rgba(247,245,240,0.4)', lineHeight: 1.6,
            }}>{opt.desc}</p>
          </div>
        ))}
      </div>

      {/* Current source status */}
      {currentSource && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: '0.85rem 1rem',
          border: '1px solid rgba(62,207,142,0.25)',
          background: 'rgba(62,207,142,0.06)',
        }}>
          <span style={{ color: '#3ecf8e', fontSize: '0.85rem' }}>✓</span>
          <div>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300,
              letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3ecf8e',
              display: 'block', marginBottom: '0.1rem',
            }}>Reel Active</span>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300,
              color: 'rgba(247,245,240,0.3)',
            }}>
              Source: {currentSource.type === 'r2' ? 'Cloudflare R2' : currentSource.type === 'mux' ? 'Mux' : 'YouTube'}
              {' · '}Playing on your marketplace card when expanded
            </span>
          </div>
        </div>
      )}

      {/* Uploader */}
      <VideoUploader
        handle={operator.handle}
        currentR2Key={operator.r2Key}
        currentMuxId={operator.muxPlaybackId}
        currentYouTubeUrl={operator.youtubeUrl}
        onSave={onSave}
        isPro={isPro}
      />

      {/* Clear reel */}
      {currentSource && isPro && (
        <button
          onClick={() => onSave({ r2Key: '', muxPlaybackId: '', youtubeUrl: '' })}
          style={{
            fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300,
            letterSpacing: '0.08em', background: 'transparent',
            color: 'rgba(247,245,240,0.25)',
            border: '1px solid var(--border-dark)', padding: '0.65rem 1rem',
            cursor: 'pointer', width: 'fit-content',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#e53e3e'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(247,245,240,0.25)'}
        >
          Remove reel
        </button>
      )}

    </div>
  )
}