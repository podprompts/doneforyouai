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
      background: '#eceae4',
      borderBottom: '1px solid rgba(15,15,14,0.1)',
      borderTop: '1px solid rgba(15,15,14,0.1)',
      padding: '1.1rem 0',
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
          animation: ticker-scroll 22s linear infinite;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        @media (max-width: 768px) {
          .ticker-track {
            animation: ticker-scroll 3s linear infinite;
          }
        }

        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 1.5rem;
          font-family: var(--mono);
          font-size: 0.68rem;
          font-weight: 300;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(15, 15, 14, 0.55);
          padding-right: 1.5rem;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .ticker-dot {
          color: #e8521a;
          font-size: 0.5rem;
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