'use client'

// ── Video config ─────────────────────────────────────────────────────────────
const SHOW_VIDEO  = true
const VIDEO_SRC   = 'https://cdn.livereselling.com/videos/Untitled_Video.mp4'
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  mode?: 'embed' | 'bg'
}

export default function VideoShowcase({ mode = 'embed' }: Props) {
  if (!SHOW_VIDEO) return null

  return (
    <section id="work">

      <div className="vs-outer">

        {/* ── Left: text ── */}
        <div className="vs-text">
          <span className="dfy-eyebrow vs-eyebrow">See It In Action</span>
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
          <div className="vs-shell">
            <div className="vs-chrome">
              <span className="vs-dot" /><span className="vs-dot" /><span className="vs-dot" />
              <span className="vs-url">doneforyouai.com</span>
            </div>

            <div className="vs-frame">
              <video
                controls
                playsInline
                className="vs-player"
                preload="metadata"
                poster="https://cdn.livereselling.com/item-images/image%20-%202026-05-31T094738.323.png"
              >
                <source src={VIDEO_SRC} type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="vs-caption">
            <span className="vs-caption-label">DoneForYouAI · Welcome</span>
            <span className="vs-caption-url">doneforyouai.com</span>
          </div>
        </div>

      </div>

      <style>{`
        #work {
          background: var(--bg);
        }

        .vs-outer {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          align-items: center;
          gap: 4rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 7rem 2rem;
        }

        .vs-text {
          display: flex;
          flex-direction: column;
        }

        .vs-eyebrow {
          color: var(--accent);
          margin-bottom: 1.25rem;
        }

        .vs-heading {
          font-size: clamp(2.2rem, 3.6vw, 3.4rem);
          line-height: 1.04;
          color: var(--text);
          margin: 0 0 1.5rem 0;
        }

        .vs-heading em {
          color: var(--accent);
        }

        .vs-body {
          font-family: var(--f-body);
          font-size: 1.1rem;
          color: var(--text-2);
          line-height: 1.65;
          margin: 0;
        }

        .vs-video-col {
          position: relative;
        }

        .vs-shell {
          background: var(--text);
          border-radius: 24px;
          padding: 12px;
          box-shadow: 0 40px 80px rgba(21, 22, 26, 0.22);
        }

        .vs-chrome {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px 12px;
        }

        .vs-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #4A4B52;
          display: inline-block;
        }

        .vs-url {
          margin-left: 12px;
          padding: 5px 16px;
          border-radius: 999px;
          background: #26272D;
          color: #C9C9CF;
          font-family: var(--f-body);
          font-size: 0.78rem;
          font-weight: 500;
        }

        .vs-frame {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          background: #000;
          border-radius: 14px;
        }

        /* Mask a thin edge line baked into the video file (top + bottom) */
        .vs-frame::before,
        .vs-frame::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 6px;
          background: var(--text);
          z-index: 2;
          pointer-events: none;
        }
        .vs-frame::before { top: 0; }
        .vs-frame::after  { bottom: 0; }

        .vs-player {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          border: none !important;
          display: block !important;
        }

        .vs-caption {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1rem;
          padding: 0 0.5rem;
        }

        .vs-caption-label {
          font-family: var(--f-body);
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-3);
        }

        .vs-caption-url {
          font-family: var(--f-body);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--accent);
        }

        @media (max-width: 900px) {
          .vs-outer {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            padding: 4rem 1.25rem;
          }
        }

        /* ── MOBILE: stacked, video first ── */
        @media (max-width: 768px) {
          .vs-video-col {
            order: -1;
            width: 100%;
          }
          .vs-chrome { display: none; }
          .vs-shell { padding: 6px; border-radius: 18px; }
          .vs-frame { border-radius: 12px; }
          .vs-heading {
            font-size: clamp(1.9rem, 8vw, 2.4rem);
            margin-bottom: 0.75rem;
          }
        }
      `}</style>
    </section>
  )
}
