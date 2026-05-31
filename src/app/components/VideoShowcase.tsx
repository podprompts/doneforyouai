'use client'

// ── Video config ─────────────────────────────────────────────────────────────
const SHOW_VIDEO      = true                        // ← set false to hide section
const YOUTUBE_ID      = 'ImELyyXCo8g'              // ← YouTube video ID
const MUX_PLAYBACK_ID = process.env.NEXT_PUBLIC_SHOWCASE_MUX_PLAYBACK_ID || ''
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  mode?: 'embed' | 'bg'
}

export default function VideoShowcase({ mode = 'embed' }: Props) {
  if (!SHOW_VIDEO) return null

  const hasMux     = Boolean(MUX_PLAYBACK_ID)
  const hasYoutube = Boolean(YOUTUBE_ID)
  const hasVideo   = hasMux || hasYoutube

  if (mode === 'bg') {
    return (
      <section id="work" style={{ position: 'relative', minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderTop: '1px solid var(--border-dark)', borderBottom: '1px solid var(--border-dark)', textAlign: 'center', padding: '8rem 2.5rem' }}>
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
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.9rem', color: 'rgba(247,245,240,0.45)', lineHeight: 1.75 }}>
            In 3 minutes, we'll show you exactly how we implement AI inside a real business.
          </p>
        </div>
      </section>
    )
  }

  // ── mode === 'embed' ──────────────────────────────────────────────────────
  return (
    <section id="work">

      <div className="vs-rule" />

      <div className="vs-outer">

        {/* ── Left: text ── */}
        <div className="vs-text">
          <span className="vs-eyebrow">See It In Action</span>
          <h2 className="vs-heading">
            Built by us.<br />
            <em>Owned by you.</em>
          </h2>
          <p className="vs-body">
            Watch how we go from strategy call to a fully deployed AI system
            running inside a real business — no fluff, just the work.
          </p>
        </div>

        {/* ── Right: video ── */}
        <div className="vs-video-col">
          <div className="vs-corner vs-corner-tl" />
          <div className="vs-corner vs-corner-tr" />
          <div className="vs-corner vs-corner-bl" />
          <div className="vs-corner vs-corner-br" />

          <div className="vs-frame">
            {hasMux && (
              <video playsInline className="vs-player">
                <source src={`https://stream.mux.com/${MUX_PLAYBACK_ID}.m3u8`} type="application/x-mpegURL" />
                <source src={`https://stream.mux.com/${MUX_PLAYBACK_ID}/high.mp4`} type="video/mp4" />
              </video>
            )}
            {!hasMux && hasYoutube && (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1&controls=0&disablekb=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="vs-player"
                title="DoneForYouAI — Welcome"
              />
            )}
            {!hasVideo && (
              <div className="vs-placeholder">
                <span>Set YOUTUBE_ID at the top of this file</span>
              </div>
            )}
          </div>

          <div className="vs-caption">
            <span className="vs-caption-label">DoneForYouAI · Welcome</span>
            <span className="vs-caption-url">doneforyouai.com</span>
          </div>
        </div>

      </div>

      <div className="vs-rule" />

      <style>{`
        #work {
          background: var(--ink);
        }

        .vs-rule {
          width: 100%;
          height: 1px;
          background: var(--border-dark);
        }

        .vs-outer {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          align-items: center;
          gap: 4rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 5rem 2.5rem;
        }

        .vs-text {
          display: flex;
          flex-direction: column;
        }

        .vs-eyebrow {
          font-family: var(--mono);
          font-size: 0.65rem;
          font-weight: 300;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--coral);
          display: block;
          margin-bottom: 1.25rem;
        }

        .vs-heading {
          font-family: var(--serif);
          font-size: clamp(1.9rem, 3vw, 2.8rem);
          font-weight: 400;
          line-height: 1.1;
          color: var(--page);
          margin: 0 0 1.5rem 0;
        }

        .vs-heading em {
          font-style: italic;
          color: var(--coral);
        }

        .vs-body {
          font-family: var(--sans);
          font-size: 0.88rem;
          color: rgba(247,245,240,0.42);
          line-height: 1.8;
          margin: 0;
        }

        .vs-video-col {
          position: relative;
          padding: 10px;
        }

        .vs-corner {
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: var(--coral);
          border-style: solid;
          opacity: 0.5;
        }
        .vs-corner-tl { top: 0; left: 0; border-width: 1px 0 0 1px; }
        .vs-corner-tr { top: 0; right: 0; border-width: 1px 1px 0 0; }
        .vs-corner-bl { bottom: 22px; left: 0; border-width: 0 0 1px 1px; }
        .vs-corner-br { bottom: 22px; right: 0; border-width: 0 1px 1px 0; }

        .vs-frame {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          background: var(--ink);
          border: 1px solid var(--border-dark);
        }

        .vs-player {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          border: none !important;
          display: block !important;
        }

        .vs-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .vs-placeholder span {
          font-family: var(--mono);
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(247,245,240,0.18);
        }

        .vs-caption {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-dark);
        }

        .vs-caption-label {
          font-family: var(--mono);
          font-size: 0.6rem;
          font-weight: 300;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(247,245,240,0.18);
        }

        .vs-caption-url {
          font-family: var(--mono);
          font-size: 0.6rem;
          color: var(--coral);
          letter-spacing: 0.08em;
          opacity: 0.7;
        }

        /* ── MOBILE: edge-to-edge video, stacked layout ── */
        @media (max-width: 768px) {
          .vs-outer {
            grid-template-columns: 1fr;
            padding: 0;
            gap: 0;
            max-width: 100%;
          }

          .vs-video-col {
            order: -1;
            padding: 0;
            width: 100%;
          }

          .vs-corner { display: none; }

          .vs-frame {
            border-left: none;
            border-right: none;
            border-top: none;
          }

          .vs-caption {
            padding: 0.6rem 1.25rem;
            margin-top: 0;
          }

          .vs-text {
            padding: 2rem 1.25rem 2.5rem;
          }

          .vs-heading {
            font-size: clamp(1.5rem, 6vw, 1.9rem);
          }

          .vs-body {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </section>
  )
}