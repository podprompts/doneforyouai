'use client'

import { useState } from 'react'

interface Props {
  operator: {
    available: boolean
    tier: string
  }
  onSave: (data: any) => Promise<void>
}

const capacityOptions = ['1 project', '2 projects', '3 projects', '4+ projects']
const responseOptions = ['Within 24 hours', 'Within 48 hours', 'Within 1 week']
const durationOptions  = ['1–2 weeks', '2–4 weeks', '1–3 months', '3+ months', 'Ongoing retainer']

export default function AvailabilityTab({ operator, onSave }: Props) {
  const [available, setAvailable] = useState(operator.available)
  const [capacity, setCapacity] = useState('2 projects')
  const [responseTime, setResponseTime] = useState('Within 24 hours')
  const [projectDuration, setProjectDuration] = useState('2–4 weeks')
  const [note, setNote] = useState('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Availability toggle */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.5rem',
        border: `1px solid ${available ? 'rgba(62,207,142,0.25)' : 'var(--border-dark)'}`,
        background: available ? 'rgba(62,207,142,0.05)' : 'var(--ink-2)',
        flexWrap: 'wrap', gap: '1rem',
        transition: 'all 0.3s',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: available ? '#3ecf8e' : 'rgba(247,245,240,0.2)',
              animation: available ? 'pulse-dot 2s infinite' : 'none',
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: 'var(--sans)', fontWeight: 600, fontSize: '0.95rem',
              color: available ? 'var(--page)' : 'rgba(247,245,240,0.4)',
            }}>
              {available ? 'Available for new projects' : 'Not currently available'}
            </span>
          </div>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.8rem',
            color: 'rgba(247,245,240,0.35)', lineHeight: 1.6,
          }}>
            {available
              ? 'Your profile shows a green dot. Businesses can book calls and send messages.'
              : 'Your profile is dimmed. Businesses can still view your profile but buttons are disabled.'
            }
          </p>
        </div>

        {/* Toggle switch */}
        <button
          onClick={() => setAvailable(v => !v)}
          style={{
            width: 52, height: 28, borderRadius: 14,
            background: available ? '#3ecf8e' : 'rgba(247,245,240,0.12)',
            border: 'none', cursor: 'pointer',
            position: 'relative', transition: 'background 0.25s',
            flexShrink: 0,
          }}
        >
          <span style={{
            position: 'absolute', top: 3,
            left: available ? 27 : 3,
            width: 22, height: 22, borderRadius: '50%',
            background: 'var(--white)',
            transition: 'left 0.25s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }} />
        </button>
      </div>

      {/* Capacity */}
      <div>
        <SectionLabel>Current Capacity</SectionLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.5rem' }}>
          {capacityOptions.map(opt => (
            <OptionPill key={opt} label={opt} active={capacity === opt} onClick={() => setCapacity(opt)} />
          ))}
        </div>
      </div>

      {/* Response time */}
      <div>
        <SectionLabel>Typical Response Time</SectionLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.5rem' }}>
          {responseOptions.map(opt => (
            <OptionPill key={opt} label={opt} active={responseTime === opt} onClick={() => setResponseTime(opt)} />
          ))}
        </div>
      </div>

      {/* Project duration */}
      <div>
        <SectionLabel>Preferred Project Duration</SectionLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.5rem' }}>
          {durationOptions.map(opt => (
            <OptionPill key={opt} label={opt} active={projectDuration === opt} onClick={() => setProjectDuration(opt)} />
          ))}
        </div>
      </div>

      {/* Availability note */}
      <div>
        <SectionLabel>Availability Note (optional)</SectionLabel>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="e.g. Taking on 1 new client in June, fully booked until then..."
          rows={3}
          maxLength={160}
          style={{
            width: '100%', background: 'transparent',
            border: 'none', borderBottom: '1px solid var(--border-dark)',
            color: 'var(--page)', fontFamily: 'var(--sans)', fontSize: '0.88rem',
            padding: '0.5rem 0', outline: 'none', resize: 'none',
            lineHeight: 1.65, marginTop: '0.5rem',
          }}
          onFocus={e => e.target.style.borderBottomColor = 'var(--coral)'}
          onBlur={e => e.target.style.borderBottomColor = 'var(--border-dark)'}
        />
        <span style={{
          fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300,
          color: 'rgba(247,245,240,0.2)',
        }}>{note.length}/160</span>
      </div>

      {/* Save */}
      <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border-dark)' }}>
        <button
          onClick={() => onSave({ available, capacity, responseTime, projectDuration, note })}
          style={{
            fontFamily: 'var(--sans)', fontSize: '0.75rem', fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            background: 'var(--coral)', color: 'var(--white)',
            border: 'none', padding: '0.9rem 2rem', cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Save Availability →
        </button>
      </div>

    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300,
      letterSpacing: '0.12em', textTransform: 'uppercase',
      color: 'rgba(247,245,240,0.3)', display: 'block',
    }}>{children}</span>
  )
}

function OptionPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300,
      letterSpacing: '0.08em', padding: '0.45rem 0.9rem',
      border: '1px solid',
      borderColor: active ? 'var(--coral)' : 'var(--border-dark)',
      background: active ? 'rgba(232,82,26,0.1)' : 'transparent',
      color: active ? 'var(--coral)' : 'rgba(247,245,240,0.4)',
      cursor: 'pointer', transition: 'all 0.15s',
    }}>{label}</button>
  )
}