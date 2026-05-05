'use client'

export default function Ticker() {
  const items = [
    'AI Automation', 'Custom Chatbots', 'Content Systems',
    'Lead Generation', 'AI Strategy', 'Tool Stack Setup',
    'Done For You', 'Workflow Design', 'Prompt Engineering',
  ]

  const repeated = [...items, ...items]

  return (
    <div style={{
      background: 'var(--ink)',
      borderBottom: '1px solid var(--border-dark)',
      borderTop: '1px solid var(--border-dark)',
      padding: '1.1rem 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{
        display: 'flex',
        animation: 'ticker 28s linear infinite',
        width: 'max-content',
      }}>
        {repeated.map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: '1.5rem',
            fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'rgba(247,245,240,0.25)',
            paddingRight: '1.5rem',
            whiteSpace: 'nowrap',
          }}>
            {item}
            <span style={{ color: 'var(--coral)', fontSize: '0.5rem' }}>â—†</span>
          </span>
        ))}
      </div>
    </div>
  )
}

