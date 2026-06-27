'use client'

const audiences = [
  { num: '01', abbr: 'Ag', label: 'Agency Owners',             span: 2,  rowSpan: 2, bg: '#fff',    border: 'rgba(15,15,14,0.12)',  textColor: '#0f0f0e', subColor: 'rgba(15,15,14,0.3)',   abbrColor: 'rgba(232,82,26,0.12)',  fontSize: '0.7rem',  titleSize: '1.4rem' },
  { num: '02', abbr: 'Ec', label: 'E-Commerce Brands',         span: 4,  rowSpan: 1, bg: '#e8521a', border: '#e8521a',              textColor: '#fff',    subColor: 'rgba(255,255,255,0.6)', abbrColor: 'rgba(255,255,255,0.18)', fontSize: '1rem',   titleSize: '2rem'   },
  { num: '03', abbr: 'Sb', label: 'Service Businesses',        span: 3,  rowSpan: 1, bg: '#fff',    border: 'rgba(15,15,14,0.12)',  textColor: '#0f0f0e', subColor: 'rgba(15,15,14,0.3)',   abbrColor: 'rgba(232,82,26,0.12)',  fontSize: '0.78rem', titleSize: '1.8rem' },
  { num: '04', abbr: 'B2', label: 'B2B Companies',             span: 3,  rowSpan: 1, bg: '#0f0f0e', border: '#0f0f0e',              textColor: '#fff',    subColor: 'rgba(255,255,255,0.3)', abbrColor: 'rgba(255,255,255,0.1)',  fontSize: '0.78rem', titleSize: '1.8rem' },
  { num: '05', abbr: 'Cc', label: 'Consultants & Coaches',     span: 4,  rowSpan: 1, bg: '#fff',    border: 'rgba(15,15,14,0.12)',  textColor: '#0f0f0e', subColor: 'rgba(15,15,14,0.3)',   abbrColor: 'rgba(232,82,26,0.1)',   fontSize: '0.95rem', titleSize: '2rem'   },
  { num: '06', abbr: 'Ss', label: 'SaaS Startups',             span: 3,  rowSpan: 1, bg: '#fff',    border: 'rgba(232,82,26,0.4)',  textColor: '#0f0f0e', subColor: '#e8521a',              abbrColor: 'rgba(232,82,26,0.15)',  fontSize: '0.78rem', titleSize: '1.8rem' },
  { num: '07', abbr: 'Re', label: 'Real Estate Professionals', span: 3,  rowSpan: 1, bg: '#fff',    border: 'rgba(15,15,14,0.12)',  textColor: '#0f0f0e', subColor: 'rgba(15,15,14,0.3)',   abbrColor: 'rgba(232,82,26,0.1)',   fontSize: '0.78rem', titleSize: '1.8rem' },
  { num: '08', abbr: 'Hp', label: 'Healthcare Practices',      span: 5,  rowSpan: 1, bg: '#fff',    border: 'rgba(15,15,14,0.12)',  textColor: '#0f0f0e', subColor: 'rgba(15,15,14,0.3)',   abbrColor: 'rgba(232,82,26,0.1)',   fontSize: '1.15rem', titleSize: '2.2rem' },
  { num: '09', abbr: 'Lb', label: 'Local Businesses',          span: 2,  rowSpan: 1, bg: '#e8521a', border: '#e8521a',              textColor: '#fff',    subColor: 'rgba(255,255,255,0.5)', abbrColor: 'rgba(255,255,255,0.85)', fontSize: '0.65rem', titleSize: '1.6rem' },
  { num: '10', abbr: 'Hb', label: 'Handmade Businesses',       span: 2,  rowSpan: 1, bg: '#0f0f0e', border: '#0f0f0e',              textColor: '#fff',    subColor: 'rgba(255,255,255,0.3)', abbrColor: 'rgba(255,255,255,0.6)',  fontSize: '0.65rem', titleSize: '1.6rem' },
  { num: '11', abbr: 'Ps', label: 'Professional Services',     span: 3,  rowSpan: 1, bg: '#fff',    border: 'rgba(15,15,14,0.12)',  textColor: '#0f0f0e', subColor: 'rgba(15,15,14,0.3)',   abbrColor: 'rgba(232,82,26,0.1)',   fontSize: '0.82rem', titleSize: '1.8rem' },
  { num: '12', abbr: 'Cc', label: 'Coaches & Course Creators', span: 7,  rowSpan: 1, bg: '#fff',    border: 'rgba(15,15,14,0.12)',  textColor: '#0f0f0e', subColor: 'rgba(15,15,14,0.3)',   abbrColor: 'rgba(232,82,26,0.08)',  fontSize: '1.3rem',  titleSize: '2.8rem' },
  { num: '13', abbr: 'Rh', label: 'Restaurants & Hospitality', span: 5,  rowSpan: 1, bg: '#fff',    border: 'rgba(232,82,26,0.35)', textColor: '#0f0f0e', subColor: '#e8521a',              abbrColor: 'rgba(232,82,26,0.12)',  fontSize: '1.1rem',  titleSize: '2.2rem' },
  { num: '14', abbr: 'Sm', label: 'Small Businesses',          span: 12, rowSpan: 1, bg: '#0f0f0e', border: '#0f0f0e',              textColor: '#fff',    subColor: 'rgba(255,255,255,0.3)', abbrColor: 'rgba(255,255,255,0.06)', fontSize: '1.5rem', titleSize: '4rem'  },
]

export default function Audience() {
  return (
    <section style={{ background: '#f5f4f0', padding: '6rem 2.5rem', borderTop: '1px solid rgba(15,15,14,0.1)', borderBottom: '1px solid rgba(15,15,14,0.1)' }}>
      <style>{`
        .aud-box { border-radius:12px; padding:1.25rem 1.1rem; display:flex; flex-direction:column; justify-content:space-between; min-height:110px; cursor:default; transition:border-color 0.2s, box-shadow 0.2s, transform 0.2s; overflow:hidden; }
        .aud-box:hover { border-color:#e8521a !important; box-shadow:0 4px 20px rgba(232,82,26,0.18); transform:translateY(-2px); }
        @media (max-width:680px) { .aud-grid { grid-template-columns:repeat(4,1fr) !important; } .aud-box { min-height:80px !important; } }
      `}</style>

      <div style={{ marginBottom: '3rem' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: '0.75rem' }}>Who we work with</span>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 400, lineHeight: 1.1, color: '#0f0f0e', letterSpacing: '-0.02em', margin: 0 }}>
          Moving your business{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>forward with AI.</em>
        </h2>
      </div>

      <div className="aud-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: '10px' }}>
        {audiences.map((a) => (
          <div
            key={a.label}
            className="aud-box"
            style={{ gridColumn: `span ${a.span}`, gridRow: a.rowSpan > 1 ? `span ${a.rowSpan}` : undefined, background: a.bg, border: `1.5px solid ${a.border}` }}
          >
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.45rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: a.subColor }}>{a.num}</span>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '0.5rem' }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: a.fontSize, fontWeight: 600, color: a.textColor, lineHeight: 1.25 }}>{a.label}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: a.titleSize, fontWeight: 800, color: a.abbrColor, lineHeight: 1, flexShrink: 0 }}>{a.abbr}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
