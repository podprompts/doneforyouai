// ─────────────────────────────────────────────────────────────────
// MEDIA UTILITY — DoneForYouAI
//
// Priority order for operator video backgrounds:
//   1. Cloudflare R2 MP4 (clean, no branding, best performance)
//   2. Mux (adaptive bitrate, analytics, power users)
//   3. YouTube (lowest friction, most operators already have this)
// ─────────────────────────────────────────────────────────────────

export type VideoSource =
  | { type: 'r2';      src: string; poster?: string }
  | { type: 'mux';     src: string; poster?: string; playbackId: string }
  | { type: 'youtube'; src: string; embedId: string }
  | null

export interface OperatorMedia {
  r2Key?: string
  muxPlaybackId?: string
  youtubeUrl?: string
}

const R2_BASE = process.env.NEXT_PUBLIC_R2_BASE_URL || ''

export function resolveVideoSource(media: OperatorMedia): VideoSource {
  if (media.r2Key && R2_BASE) {
    return {
      type: 'r2',
      src: `${R2_BASE}/${media.r2Key}`,
      poster: media.r2Key.replace(/\.[^/.]+$/, '') + '-poster.jpg',
    }
  }
  if (media.muxPlaybackId) {
    return {
      type: 'mux',
      playbackId: media.muxPlaybackId,
      src: `https://stream.mux.com/${media.muxPlaybackId}.m3u8`,
      poster: `https://image.mux.com/${media.muxPlaybackId}/thumbnail.jpg?time=0&width=1280`,
    }
  }
  if (media.youtubeUrl) {
    const embedId = extractYouTubeId(media.youtubeUrl)
    if (embedId) {
      return {
        type: 'youtube',
        embedId,
        // youtube-nocookie = privacy-enhanced mode
        // enablejsapi=1 allows postMessage control
        // disablekb=1 disables keyboard nav away
        // fs=0 removes fullscreen button (keeps user in card)
        // cc_load_policy=0 no captions
        src: `https://www.youtube-nocookie.com/embed/${embedId}?autoplay=1&mute=0&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0&color=white`,
      }
    }
  }
  return null
}

export function extractYouTubeId(url: string): string | null {
  const pattern = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/
  const match = url.match(pattern)
  return match ? match[1] : null
}

export function getVideoLabel(source: VideoSource): string {
  if (!source) return ''
  if (source.type === 'mux') return 'live reel'
  return 'reel'
}

export function isValidYouTubeUrl(url: string): boolean {
  return Boolean(extractYouTubeId(url))
}

export function getR2OperatorKey(handle: string, filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || 'mp4'
  const safe = handle.replace(/[^a-z0-9_-]/gi, '-').toLowerCase()
  return `operators/${safe}/reel.${ext}`
}

// Returns a thumbnail URL for the video source (used as poster before play)
export function getVideoThumbnail(source: VideoSource): string | null {
  if (!source) return null
  if (source.type === 'youtube') return `https://img.youtube.com/vi/${source.embedId}/maxresdefault.jpg`
  if (source.type === 'mux') return source.poster || null
  if (source.type === 'r2') return source.poster || null
  return null
}