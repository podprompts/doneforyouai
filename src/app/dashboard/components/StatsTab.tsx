'use client'

interface Props {
  operator: {
    tier: string
    stats: {
      profileViews: number
      cardExpands: number
      callBookings: number
      messagesSent: number
      viewsThisWeek: number
      expandsThisWeek: number
    }
  }
}

export default function StatsTab({ operator }: Props) {
  const { stats } = operator
  const isPro = operator.tier === 'pro' || operator.tier === 'elite'

  const mainStats = [
    { label: 'Profile Views',   value: stats.profileViews,  sub: `+${stats.viewsThisWeek} this week`,    accent: false },
    { label: 'Card Expands',    value: stats.cardExpands,   sub: `+${stats.expandsThisWeek} this week`,  accent: false },
    { label: 'Call Bookings',   value: stats.callBookings,  sub: 'Total booked',                          accent: true  },
    { label: 'Messages Sent',   value: stats.messagesSent,  sub: 'Via marketplace',                       accent: false },
  ]

  const expandRate = stats.profileViews > 0
    ? Math.round((stats.cardExpands / stats.profileViews) * 100)
    : 0

  const bookingRate = stats.cardExpands > 0
    ? Math.round((stats.callBookings / stats.cardExpands) * 100)
    : 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Main stats grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '1px',
        background: 'var(--border-dark)',
        border: '1px solid var(--border-dark)',
      }}>
        {mainStats.map((s, i) => (
          <div key={i} style={{
            background: 'var(--ink-2)',
            padding: '1.5rem',
          }}>
            <span style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(2rem, 5vw, 2.8rem)',
              fontWeight: 400, lineHeight: 1,
              color: s.accent ? 'var(--coral)' : 'var(--page)',
              display: 'block', marginBottom: '0.4rem',
            }}>{s.value}</span>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'rgba(247,245,240,0.3)', display: 'block', marginBottom: '0.25rem',
            }}>{s.label}</span>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300,
              color: 'rgba(247,245,240,0.2)',
            }}>{s.sub}</span>
          </div>
        ))}
      </div>

      {/* Conversion rates */}
      <div>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'rgba(247,245,240,0.25)', marginBottom: '1rem',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
        }}>
          Conversion Funnel
          <span style={{ flex: 1, height: '0.5px', background: 'var(--border-dark)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {[
            { label: 'View → Expand rate',    value: expandRate,   desc: 'Of visitors who expand your card' },
            { label: 'Expand → Booking rate', value: bookingRate,  desc: 'Of expands that lead to a call booking' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr auto',
              alignItems: 'center', gap: '1rem',
              padding: '1.1rem 1.25rem',
              background: 'var(--ink-2)',
              border: '1px solid var(--border-dark)',
            }}>
              <div>
                <span style={{
                  fontFamily: 'var(--sans)', fontWeight: 500, fontSize: '0.85rem',
                  color: 'var(--page)', display: 'block', marginBottom: '0.2rem',
                }}>{item.label}</span>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300,
                  color: 'rgba(247,245,240,0.3)',
                }}>{item.desc}</span>
              </div>
              <span style={{
                fontFamily: 'var(--serif)', fontSize: '1.8rem',
                fontWeight: 400,
                color: item.value > 20 ? '#3ecf8e' : item.value > 10 ? 'var(--coral)' : 'rgba(247,245,240,0.4)',
              }}>{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pro analytics upsell */}
      {!isPro && (
        <div style={{
          border: '1px solid var(--coral-border)',
          padding: '1.5rem',
          background: 'var(--coral-dim)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
        }}>
          <div>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--coral)', display: 'block', marginBottom: '0.4rem',
            }}>Pro Analytics</span>
            <p style={{
              fontFamily: 'var(--sans)', fontSize: '0.82rem',
              color: 'rgba(247,245,240,0.45)', lineHeight: 1.6,
            }}>
              Upgrade to see weekly trends, traffic sources, and which tags are driving the most views.
            </p>
          </div>
          <button style={{
            fontFamily: 'var(--sans)', fontSize: '0.72rem', fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            background: 'var(--coral)', color: 'var(--white)',
            border: 'none', padding: '0.7rem 1.25rem', cursor: 'pointer',
            flexShrink: 0,
          }}>Upgrade →</button>
        </div>
      )}

    </div>
  )
}