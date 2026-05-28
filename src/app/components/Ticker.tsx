'use client'

const items = [
  'AI Automation', 'Custom Chatbots', 'Content Systems',
  'Lead Generation', 'AI Strategy', 'Tool Stack Setup',
  'Done For You', 'Workflow Design', 'Prompt Engineering',
]

/* 4 full copies so the loop never shows a gap on any screen width */
const repeated = [...items, ...items, ...items, ...items]

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
      <div className="ticker-track">
        {repeated.map((item, i) => (
          <span key={i} className="ticker-item">
            {item}
            <span className="ticker-dot">◆</span>
          </span>
        ))}
      </div>

      <style>{`
        .ticker-track {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          width: max-content;
          /* 
            Pure CSS animation — no JS measurement.
            Each of the 4 copies is 25% of the total width.
            We animate -25% which is exactly one copy.
            Duration is fixed at 18s = same pixel speed on every device.
            'linear' ensures constant velocity. Hardware-accelerated via GPU.
          */
          animation: ticker-move 18s linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
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

        @keyframes ticker-move {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-25%, 0, 0); }
        }

        /* Pause on hover for accessibility */
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}