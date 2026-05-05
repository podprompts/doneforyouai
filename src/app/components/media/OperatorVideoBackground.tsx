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
            opacity: active ? opacity : 0,
            transition: 'opacity 0.9s ease',
            pointerEvents: 'none', zIndex: 0,
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
            opacity: iframeReady ? opacity : 0,
            transition: 'opacity 1.2s ease',
            zIndex: 0, transform: 'scale(1.05)',
          }}
          title="Operator reel"
        />
      )}

      {/* Gradient overlay — text readability */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(135deg, rgba(15,15,14,0.82) 0%, rgba(15,15,14,0.62) 50%, rgba(15,15,14,0.82) 100%)',
        opacity: active ? 1 : 0,
        transition: 'opacity 0.9s ease',
        pointerEvents: 'none',
      }} />
    </>
  )
}