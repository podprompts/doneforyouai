'use client'

import { useEffect, useRef, useState } from 'react'
import { type VideoSource } from '@/lib/media'

interface Props {
  source: VideoSource
  active: boolean
  opacity?: number
}

export default function OperatorVideoBackground({ source, active, opacity = 0.28 }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [iframeReady, setIframeReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (active) {
      video.currentTime = 0
      video.play().catch(() => {})
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [active])

  useEffect(() => {
    if (!active) setIframeReady(false)
  }, [active])

  if (!source) return null

  return (
    <>
      {/* R2 or Mux — native video */}
      {(source.type === 'r2' || source.type === 'mux') && (
        <video
          ref={videoRef}
          muted loop playsInline
          poster={source.poster}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: active ? 1 : 0,
            transition: 'opacity 0.7s ease',
            pointerEvents: 'none',
            // zIndex sits between card bg (0) and overlay (1) and content (2)
            zIndex: 1,
          }}
        >
          {source.type === 'mux' && (
            <source src={source.src} type="application/x-mpegURL" />
          )}
          <source
            src={source.type === 'mux'
              ? `https://stream.mux.com/${source.playbackId}/high.mp4`
              : source.src}
            type="video/mp4"
          />
        </video>
      )}

      {/* YouTube — iframe */}
      {source.type === 'youtube' && active && (
        <iframe
          src={source.src}
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
          onLoad={() => setIframeReady(true)}
          style={{
            position: 'absolute', inset: '-10%',
            width: '120%', height: '120%',
            border: 'none', pointerEvents: 'none',
            opacity: iframeReady ? 1 : 0,
            transition: 'opacity 1.2s ease',
            zIndex: 1,
            transform: 'scale(1.05)',
          }}
          title="Operator reel"
        />
      )}

      {/* Dark overlay — sits above video, below content */}
      <div style={{
        position: 'absolute', inset: 0,
        zIndex: 2,
        background: 'rgba(15,15,14,0.55)',
        opacity: active ? 1 : 0,
        transition: 'opacity 0.7s ease',
        pointerEvents: 'none',
      }} />
    </>
  )
}