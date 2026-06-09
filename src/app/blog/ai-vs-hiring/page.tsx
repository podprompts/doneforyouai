import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/app/components/Navbar'

export const metadata: Metadata = {
  title: 'AI vs. Hiring: When It Makes Sense to Automate Instead of Add Headcount',
  description: 'The default answer to every business problem used to be "hire someone." In 2026, that answer is wrong more often than most owners realize.',
  keywords: ['AI vs hiring employees', 'automate vs hire', 'AI replace employees small business', 'when to hire vs automate', 'AI cost vs employee cost'],
  alternates: { canonical: 'https://www.doneforyouai.com/blog/ai-vs-hiring' },
  openGraph: {
    title: 'AI vs. Hiring: When It Makes Sense to Automate Instead of Add Headcount',
    description: 'The default answer to every business problem used to be "hire someone." In 2026, that answer is wrong more often than most owners realize.',
    url: 'https://www.doneforyouai.com/blog/ai-vs-hiring',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'AI vs hiring decision guide' }],
  },
}

export default function AIvsHiringPage() {
  const prose: React.CSSProperties = { fontSize: '16px', color: 'rgba(247,245,240,0.65)', lineHeight: 1.85, marginBottom: '1.25rem', fontWeight: 300 }
  const h2: React.CSSProperties = { fontFamily: 'var(--serif)', fontSize: 'clamp(1.4rem,3vw,1.8rem)', fontWeight: 400, color: '#f7f5f0', margin: '2.5rem 0 0.875rem', letterSpacing: '-0.01em', lineHeight: 1.2 }
  const h3: React.CSSProperties = { fontSize: '1rem', fontWeight: 600, color: '#f7f5f0', margin: '1.75rem 0 0.5rem', letterSpacing: '0.02em' }
  const calloutDark: React.CSSProperties = { background: 'rgba(232,82,26,0.06)', border: '1px solid rgba(232,82,26,0.2)', padding: '1.75rem', margin: '2.5rem 0' }

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0e', color: '#f7f5f0', fontFamily: 'var(--sans)' }}>
      <style>{`
        :root { --coral:#e8521a; --coral-border:rgba(232,82,26,0.3); --border-dark:rgba(255,255,255,0.09); }
        * { box-sizing:border-box; margin:0; padding:0; }
        .stat-row { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; margin:2rem 0; }
        .stat-box { background:#1a1a18; border:1px solid rgba(255,255,255,0.07); padding:1.25rem; text-align:center; }
        .compare-row { display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin:2rem 0; }
        .compare-col { background:#1a1a18; border:1px solid rgba(255,255,255,0.07); padding:1.5rem; }
        @media(max-width:600px) { .stat-row { grid-template-columns:1fr !important; } .compare-row { grid-template-columns:1fr !important; } }
      `}</style>

      <Navbar />

      <article style={{ maxWidth: '740px', margin: '0 auto', padding: 'clamp(4rem,10vw,6rem) clamp(1.5rem,5vw,2.5rem) 6rem' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '12px', color: 'rgba(247,245,240,0.25)', marginBottom: '2rem', fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>
          <Link href="/blog" style={{ color: 'rgba(247,245,240,0.25)', textDecoration: 'none' }}>Blog</Link>
          <span>→</span>
          <span>Business Strategy</span>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--coral)', border: '1px solid var(--coral-border)', padding: '3px 10px' }}>Business Strategy</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'rgba(247,245,240,0.25)', letterSpacing: '0.06em' }}>June 8, 2026</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'rgba(247,245,240,0.25)' }}>·</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'rgba(247,245,240,0.25)', letterSpacing: '0.06em' }}>6 min read</span>
          </div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.75rem,4vw,2.75rem)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.25rem', fontWeight: 400 }}>
            AI vs. Hiring: When It Makes Sense to Automate Instead of Add Headcount
          </h1>
          <p style={{ fontSize: '18px', fontWeight: 300, color: 'rgba(247,245,240,0.55)', lineHeight: 1.7 }}>
            The default answer to every business problem used to be "hire someone." In 2026, that answer is wrong more often than most owners realize.
          </p>
        </div>

        <div className="stat-row">
          {[
            { value: '$67K', label: 'avg fully-loaded cost of a new hire in the US' },
            { value: '6 mos', label: 'average time to full productivity for a new employee' },
            { value: '79%', label: 'of tasks most SMBs hire for are partially automatable' },
          ].map(s => (
            <div key={s.label} className="stat-box">
              <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: 'var(--coral)', marginBottom: '0.4rem' }}>{s.value}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'rgba(247,245,240,0.35)', lineHeight: 1.5, letterSpacing: '0.04em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={h2}>The reflex that's costing you</h2>
        <p style={prose}>Every growing business hits the same inflection point: there's more work than the current team can handle. The instinct is to hire. More work → more people. It's how businesses have always scaled.</p>
        <p style={prose}>That instinct made sense when the only alternative was doing more work yourself. In 2026, there's a third option that most business owners are still underweighting: build a system that handles the work instead.</p>
        <p style={prose}>This isn't about replacing your team. It's about being deliberate about what you hire humans to do — and making sure you're not paying $60,000/year for someone to answer the same 20 questions on repeat, schedule appointments, write first drafts, or pull weekly reports.</p>

        <h2 style={h2}>The true cost of a hire</h2>
        <p style={prose}>Most owners think about salary when they think about hiring cost. The full picture is different.</p>
        <div style={{ background: '#1a1a18', border: '1px solid rgba(255,255,255,0.07)', padding: '1.5rem', margin: '1.5rem 0' }}>
          {[
            ['Base salary (entry-level role)', '$38,000 – $55,000'],
            ['Benefits, payroll taxes, insurance', '+25–35% of salary'],
            ['Recruiting and onboarding', '$4,000 – $12,000 one-time'],
            ['Time to full productivity', '3–6 months'],
            ['Management overhead', '5–15% of manager\'s time'],
            ['Turnover risk (avg tenure: 2.5 years)', 'Full replacement cost'],
            ['Total first-year fully-loaded cost', '$58,000 – $85,000+'],
          ].map(([label, value]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'rgba(247,245,240,0.4)', letterSpacing: '0.04em' }}>{label}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: '#f7f5f0', fontWeight: 600, letterSpacing: '0.04em' }}>{value}</span>
            </div>
          ))}
        </div>
        <p style={prose}>That's before accounting for the fact that a new hire takes your attention during onboarding — time you could be spending on revenue-generating work.</p>

        <h2 style={h2}>The tasks that AI handles better than a human hire</h2>
        <p style={prose}>Not everything should be automated. But there's a clear category of work that AI does faster, more consistently, and at a fraction of the cost:</p>
        <ul style={{ ...prose, paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#f7f5f0' }}>High-volume, repetitive responses</strong> — answering customer questions, qualifying inbound leads, processing support tickets, responding to inquiries.</li>
          <li style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#f7f5f0' }}>First-draft content creation</strong> — blog posts, email sequences, social captions, product descriptions, ad copy.</li>
          <li style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#f7f5f0' }}>Data aggregation and reporting</strong> — pulling numbers from multiple systems, formatting into summaries, flagging anomalies.</li>
          <li style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#f7f5f0' }}>Scheduling and coordination</strong> — booking meetings, sending reminders, following up on outstanding tasks.</li>
          <li style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#f7f5f0' }}>Research and summarization</strong> — prospect research, competitive analysis, market monitoring.</li>
        </ul>

        <h2 style={h2}>The tasks that still need a human</h2>
        <p style={prose}>AI handles volume and consistency. Humans handle nuance, judgment, and relationship. The work that still needs a person:</p>
        <ul style={{ ...prose, paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.75rem' }}>Complex negotiations and sales conversations</li>
          <li style={{ marginBottom: '0.75rem' }}>Creative strategy and original thinking</li>
          <li style={{ marginBottom: '0.75rem' }}>Sensitive customer situations requiring empathy</li>
          <li style={{ marginBottom: '0.75rem' }}>Physical work that requires presence</li>
          <li style={{ marginBottom: '0.75rem' }}>Decisions that require accountability and judgment</li>
        </ul>
        <p style={prose}>The goal isn't to eliminate humans from your business. It's to make sure the humans you hire are doing the work that actually requires them — not tasks that AI could handle better at 2 AM on a Sunday.</p>

        <h2 style={h2}>A framework for the decision</h2>

        <div className="compare-row">
          <div className="compare-col">
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '1rem' }}>Automate when...</div>
            {[
              'The task is repetitive and rule-based',
              'Volume is high (10+ times/day)',
              'Quality can be verified automatically',
              'The task doesn\'t require relationship',
              'Speed matters more than nuance',
              'The work is predictable in format',
            ].map(item => (
              <div key={item} style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'rgba(247,245,240,0.6)', lineHeight: 1.6, marginBottom: '0.5rem', paddingLeft: '0.75rem', borderLeft: '2px solid rgba(232,82,26,0.3)' }}>{item}</div>
            ))}
          </div>
          <div className="compare-col">
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', marginBottom: '1rem' }}>Hire when...</div>
            {[
              'The work requires judgment and discretion',
              'Relationship is the product',
              'Novel situations arise frequently',
              'Strategic direction needs to be set',
              'Accountability needs to live with a person',
              'Physical presence is required',
            ].map(item => (
              <div key={item} style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'rgba(247,245,240,0.4)', lineHeight: 1.6, marginBottom: '0.5rem', paddingLeft: '0.75rem', borderLeft: '2px solid rgba(255,255,255,0.09)' }}>{item}</div>
            ))}
          </div>
        </div>

        <h2 style={h2}>The hybrid approach most businesses land on</h2>
        <p style={prose}>In practice, the best implementations aren't "AI instead of hiring" — they're "AI handles the volume, humans handle the exceptions." A customer support AI handles 80% of tickets automatically. A human handles the 20% that are complex, sensitive, or require real decision-making.</p>
        <p style={prose}>This means the human hire you do make is doing higher-leverage work. They're not burned out answering the same question for the 40th time that week. They're solving real problems, building relationships, and doing the work that actually requires a person.</p>
        <p style={prose}>The businesses winning right now aren't the ones who hired the most. They're the ones who hired the right people for the right work — and automated everything else.</p>

        <div style={calloutDark}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', color: '#f7f5f0', marginBottom: '0.5rem' }}>Not sure what to automate first?</div>
          <p style={{ ...prose, color: 'rgba(247,245,240,0.55)', margin: '0 0 1.25rem' }}>In a 30-minute strategy call, we'll map out exactly which tasks in your business AI can handle — and which ones you still need people for. No pitch, just a clear analysis.</p>
          <Link href="/#contact" style={{ display: 'inline-block', fontFamily: 'var(--sans)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--coral)', color: '#fff', padding: '0.875rem 1.75rem', textDecoration: 'none' }}>
            Book a free strategy call →
          </Link>
        </div>

        <div style={{ background: '#1a1a18', border: '1px solid rgba(255,255,255,0.07)', padding: '2.5rem', marginTop: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.75rem', fontWeight: 400, color: '#f7f5f0', marginBottom: '0.75rem' }}>Let's figure out what to automate.</h2>
          <p style={{ ...prose, maxWidth: '42ch', margin: '0 auto 1.75rem', color: 'rgba(247,245,240,0.4)' }}>Free 30-minute strategy call. We'll map your highest-leverage automation opportunities — no commitment required.</p>
          <Link href="/#contact" style={{ display: 'inline-block', fontFamily: 'var(--sans)', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--coral)', color: '#fff', padding: '1rem 2.5rem', textDecoration: 'none' }}>
            Book a Free Strategy Call →
          </Link>
        </div>

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <Link href="/blog" style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--coral)', textDecoration: 'none', letterSpacing: '0.1em' }}>← Back to blog</Link>
        </div>

      </article>

      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2rem clamp(1.5rem,5vw,3rem)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'rgba(247,245,240,0.2)', letterSpacing: '0.1em' }}>© 2026 DoneForYouAI.com · HONNYDO LLC</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[['Privacy', '/privacy'], ['Terms', '/terms']].map(([label, href]) => (
            <Link key={label} href={href} style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'rgba(247,245,240,0.2)', textDecoration: 'none', letterSpacing: '0.08em' }}>{label}</Link>
          ))}
        </div>
      </footer>
    </div>
  )
}