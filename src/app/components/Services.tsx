'use client'

import { useState } from 'react'

const services = [
  {
    num: '01',
    name: 'AI Automation & Workflows',
    desc: 'Eliminate repetitive tasks and operational bottlenecks. We map your processes and build AI workflows that run 24/7 without you.',
  },
  {
    num: '02',
    name: 'Custom AI Assistants & Chatbots',
    desc: 'Trained on your business, your voice, your knowledge base — built for your customers, your team, or both.',
  },
  {
    num: '03',
    name: 'AI Content Systems',
    desc: 'Scalable engines for blogs, email, social, and ads. Consistent brand voice, zero burnout, compounding output.',
  },
  {
    num: '04',
    name: 'AI-Powered Lead Generation',
    desc: 'Prospect research, outreach personalization, automated follow-up sequences. Your pipeline fills while you sleep.',
  },
  {
    num: '05',
    name: 'Done-For-You AI Tool Stack',
    desc: 'We evaluate, select, configure, and integrate the right AI tools for your team — ready to use from day one.',
  },
  {
    num: '06',
    name: 'AI Strategy & Prompting Playbook',
    desc: 'A custom roadmap: which tools, which workflows, which prompts will compound over time inside your specific business.',
  },
]

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <>
      <section id="services" style={{
        background: '#f5f4f0',
        color: '#0f0f0e',
        padding: '0 2.5rem 7rem',
      }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          padding: '5rem 0 3rem',
          borderBottom: '1px solid rgba(15,15,14,0.1)',
          flexWrap: 'wrap', gap: '0.5rem',
        }}>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            fontWeight: 400, lineHeight: 1.1,
            color: '#0f0f0e',
          }}>
            Six ways we put<br />
            AI to work <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>for you</em>
          </h2>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300,
            color: 'rgba(15,15,14,0.42)', letterSpacing: '0.1em', paddingBottom: '0.25rem',
          }}>06 Services</span>
        </div>

        <div className="services-desktop">
          {services.map((s, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 1fr 40px',
                alignItems: 'center',
                gap: '2rem',
                padding: '1.75rem 2.5rem',
                borderBottom: '1px solid rgba(15,15,14,0.1)',
                background: hovered === i ? 'rgba(232,82,26,0.06)' : 'transparent',
                margin: '0 -2.5rem',
                cursor: 'default',
                transition: 'background 0.2s',
              }}
            >
              <span style={{
                fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300,
                color: hovered === i ? 'var(--coral)' : 'rgba(15,15,14,0.35)',
                letterSpacing: '0.05em',
                transition: 'color 0.2s',
              }}>{s.num}</span>
              <span style={{
                fontFamily: 'var(--sans)', fontWeight: 600,
                fontSize: '1.1rem',
                color: '#0f0f0e',
                transition: 'color 0.2s',
              }}>{s.name}</span>
              <span style={{
                fontSize: '0.83rem',
                color: hovered === i ? 'rgba(15,15,14,0.7)' : 'rgba(15,15,14,0.5)',
                lineHeight: 1.65,
                transition: 'color 0.2s',
              }}>{s.desc}</span>
              <span style={{
                fontSize: '1rem',
                color: hovered === i ? 'var(--coral)' : 'rgba(15,15,14,0.2)',
                transform: hovered === i ? 'translateX(4px)' : 'translateX(0)',
                transition: 'color 0.2s, transform 0.2s', textAlign: 'right',
              }}>→</span>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile carousel */}
      <div className="services-mobile">
        <div className="services-track">
          {services.map((s, i) => (
            <div key={i} className="svc-card">
              <span className="svc-num">{s.num}</span>
              <h3 className="svc-name">{s.name}</h3>
              <p className="svc-desc">{s.desc}</p>
              <span className="svc-arrow">→</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .services-mobile { display: none; }

        @media (max-width: 680px) {
          #services { padding: 0 1.25rem 0 !important; }
          #services > div:first-child { padding: 3rem 0 2rem !important; flex-direction: column !important; align-items: flex-start !important; }
          .services-desktop { display: none !important; }

          .services-mobile {
            display: block;
            width: 100vw;
            margin-left: calc(-50vw + 50%);
            background: #f5f4f0;
            padding-bottom: 3rem;
          }

          .services-track {
            display: flex;
            overflow-x: scroll;
            overflow-y: visible;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            padding: 1rem 1.25rem;
            gap: 0.75rem;
            touch-action: pan-x;
          }
          .services-track::-webkit-scrollbar { display: none; }

          .svc-card {
            flex: 0 0 78vw;
            scroll-snap-align: start;
            border: 1px solid rgba(15,15,14,0.1);
            background: #ffffff;
            padding: 1.75rem 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            min-height: 220px;
          }
          .svc-num {
            font-family: var(--mono); font-size: 0.65rem;
            font-weight: 300; color: rgba(15,15,14,0.35); letter-spacing: 0.08em;
          }
          .svc-name {
            font-family: var(--sans); font-size: 1.05rem;
            font-weight: 600; color: #0f0f0e; line-height: 1.3; margin: 0;
          }
          .svc-desc {
            font-family: var(--sans); font-size: 0.83rem;
            color: rgba(15,15,14,0.5); line-height: 1.65; flex: 1; margin: 0;
          }
          .svc-arrow { font-size: 1rem; color: var(--coral); align-self: flex-end; }
        }
      `}</style>
    </>
  )
}