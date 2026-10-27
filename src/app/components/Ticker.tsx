'use client'

const items = [
  'AI Automation', 'Custom Chatbots', 'Content Systems',
  'Lead Generation', 'AI Strategy', 'Tool Stack Setup',
  'Done For You', 'Workflow Design', 'Prompt Engineering',
]

// Only 2 copies needed — we animate exactly -50% for a perfect seamless loop
const repeated = [...items, ...items]

export default function Ticker() {
  return (
    <div style={{
      background: 'var(--text)',
      padding: '1.6rem 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div className="ticker-outer">
        <div className="ticker-track">
          {repeated.map((item, i) => (
            <span key={i} className="ticker-item">
              {item}
              <span className="ticker-dot">◆</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .ticker-outer {
          overflow: hidden;
          width: 100%;
        }

        .ticker-track {
          display: inline-flex;
          flex-wrap: nowrap;
          will-change: transform;
          animation: ticker-scroll 40s linear infinite;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        @media (max-width: 768px) {
          .ticker-track {
            animation: ticker-scroll 20s linear infinite;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
        }

        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 1.5rem;
          font-family: var(--f-display);
          font-size: 1.15rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: #ffffff;
          padding-right: 1.5rem;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .ticker-dot {
          color: #8FA0FF;
          font-size: 0.6rem;
        }

        @keyframes ticker-scroll {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
