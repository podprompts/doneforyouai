'use client'

const icons: Record<string, React.ReactElement> = {
  '01': <><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H14a3 3 0 0 1 3 3v6.5"/></>,
  '02': <><path d="M4 5h16v11H9l-5 4z"/><path d="M8.5 10h7"/></>,
  '03': <><path d="M5 4h10l4 4v12H5z"/><path d="M9 12h6M9 16h6"/></>,
  '04': <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 12l6-6"/></>,
  '05': <><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></>,
  '06': <><path d="M4 19V5M4 19h16M8 15l4-4 3 3 5-6"/></>,
}

const services = [
  {
    num: '01',
    name: 'AI Automation & Workflows',
    desc: 'Eliminate repetitive tasks and operational bottlenecks. We map your processes and build AI workflows that run 24/7 without you.',
    tone: 'accent',
  },
  {
    num: '02',
    name: 'Custom AI Assistants & Chatbots',
    desc: 'Trained on your business, your voice, your knowledge base — built for your customers, your team, or both.',
    tone: 'light',
  },
  {
    num: '03',
    name: 'AI Content Systems',
    desc: 'Scalable engines for blogs, email, social, and ads. Consistent brand voice, zero burnout, compounding output.',
    tone: 'light',
  },
  {
    num: '04',
    name: 'AI-Powered Lead Generation',
    desc: 'Prospect research, outreach personalization, automated follow-up sequences. Your pipeline fills while you sleep.',
    tone: 'light',
  },
  {
    num: '05',
    name: 'Done-For-You AI Tool Stack',
    desc: 'We evaluate, select, configure, and integrate the right AI tools for your team — ready to use from day one.',
    tone: 'light',
  },
  {
    num: '06',
    name: 'AI Strategy & Prompting Playbook',
    desc: 'A custom roadmap: which tools, which workflows, which prompts will compound over time inside your specific business.',
    tone: 'dark',
  },
]

function Icon({ num }: { num: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[num]}
    </svg>
  )
}

export default function Services() {
  return (
    <>
      <section id="services" style={{
        background: 'var(--bg)',
        color: 'var(--text)',
        padding: '0 2rem 7rem',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            padding: '1rem 0 2.5rem',
            flexWrap: 'wrap', gap: '1rem',
          }}>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
              lineHeight: 1.04,
              color: 'var(--text)',
              maxWidth: '16ch',
            }}>
              Six ways we put AI to work <em style={{ color: 'var(--accent)' }}>for you</em>
            </h2>
            <span style={{
              fontFamily: 'var(--f-body)', fontSize: '0.9rem', fontWeight: 600,
              color: 'var(--text-3)', paddingBottom: '0.5rem',
            }}>06 Services</span>
          </div>

          <div className="services-desktop svc-bento">
            {services.map((s) => (
              <div key={s.num} className={`svc-tile svc-${s.tone} svc-n${s.num}`}>
                <div className="svc-top">
                  <span className="svc-icon"><Icon num={s.num} /></span>
                  <span className="svc-index">{s.num}</span>
                </div>
                <div>
                  <h3 className="svc-title">{s.name}</h3>
                  <p className="svc-text">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile carousel */}
      <div className="services-mobile">
        <div className="services-track">
          {services.map((s, i) => (
            <div key={i} className="svc-card">
              <span className="svc-icon-m"><Icon num={s.num} /></span>
              <span className="svc-num">{s.num}</span>
              <h3 className="svc-name">{s.name}</h3>
              <p className="svc-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .svc-bento {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 20px;
        }
        .svc-tile {
          min-height: 300px;
          padding: 2rem;
          border-radius: 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1.5rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .svc-tile:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px rgba(21, 22, 26, 0.12);
        }
        .svc-n01 { grid-column: span 3; }
        .svc-n02 { grid-column: span 2; }
        .svc-n03 { grid-column: span 2; }
        .svc-n04 { grid-column: span 3; }
        .svc-n05 { grid-column: span 3; }
        .svc-n06 { grid-column: span 2; }

        .svc-light  { background: var(--surface); border: 1px solid var(--line); color: var(--text); }
        .svc-accent { background: var(--accent); color: #fff; }
        .svc-dark   { background: var(--text); color: #fff; }

        .svc-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .svc-icon {
          display: inline-flex; align-items: center; justify-content: center;
          width: 56px; height: 56px; border-radius: 16px;
          background: var(--accent-tint); color: var(--accent);
        }
        .svc-accent .svc-icon, .svc-dark .svc-icon { background: rgba(255,255,255,0.16); color: #fff; }
        .svc-index { font-family: var(--f-body); font-size: 0.9rem; font-weight: 500; opacity: 0.7; }

        .svc-title {
          font-size: 1.5rem;
          line-height: 1.15;
          margin: 0 0 0.65rem;
        }
        .svc-n01 .svc-title, .svc-n04 .svc-title, .svc-n05 .svc-title { font-size: 1.75rem; }
        .svc-text {
          font-family: var(--f-body);
          font-size: 1rem;
          line-height: 1.55;
          margin: 0;
          max-width: 32rem;
          color: var(--text-2);
        }
        .svc-accent .svc-text { color: rgba(255,255,255,0.9); }
        .svc-dark .svc-text   { color: rgba(255,255,255,0.82); }

        .services-mobile { display: none; }

        @media (max-width: 900px) {
          .svc-bento { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .svc-n01, .svc-n02, .svc-n03, .svc-n04, .svc-n05, .svc-n06 { grid-column: span 1; }
        }

        @media (max-width: 680px) {
          #services { padding: 0 1.25rem 0 !important; }
          #services > div > div:first-child { padding: 2rem 0 1.5rem !important; flex-direction: column !important; align-items: flex-start !important; }
          .services-desktop { display: none !important; }

          .services-mobile {
            display: block;
            width: 100vw;
            margin-left: calc(-50vw + 50%);
            background: var(--bg);
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
            flex: 0 0 80vw;
            scroll-snap-align: start;
            border: 1px solid var(--line);
            border-radius: 24px;
            background: var(--surface);
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            min-height: 260px;
            position: relative;
          }
          .svc-icon-m {
            display: inline-flex; align-items: center; justify-content: center;
            width: 48px; height: 48px; border-radius: 14px;
            background: var(--accent-tint); color: var(--accent);
          }
          .svc-num {
            position: absolute; top: 1.5rem; right: 1.5rem;
            font-family: var(--f-body); font-size: 0.85rem;
            font-weight: 500; color: var(--text-3);
          }
          .svc-name {
            font-size: 1.25rem;
            color: var(--text); line-height: 1.2; margin: 0.5rem 0 0;
          }
          .svc-desc {
            font-family: var(--f-body); font-size: 0.95rem;
            color: var(--text-2); line-height: 1.6; flex: 1; margin: 0;
          }
        }
      `}</style>
    </>
  )
}
