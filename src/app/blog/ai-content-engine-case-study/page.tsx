import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/app/components/Navbar'

export const metadata: Metadata = {
  title: 'How We Built a Full AI Content Engine for an E-Commerce Brand in 2 Weeks',
  description: 'From zero to a fully automated content pipeline — blog posts, emails, social, and ads — all running without a full-time writer. Here\'s exactly how we did it.',
  keywords: ['AI content engine', 'AI content automation ecommerce', 'automated content marketing', 'AI blog writing business', 'content system AI'],
  alternates: { canonical: 'https://www.doneforyouai.com/blog/ai-content-engine-case-study' },
  openGraph: {
    title: 'How We Built a Full AI Content Engine for an E-Commerce Brand in 2 Weeks',
    description: 'From zero to a fully automated content pipeline in two weeks. Here\'s exactly how we did it.',
    url: 'https://www.doneforyouai.com/blog/ai-content-engine-case-study',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'AI content engine case study' }],
  },
}

export default function ContentEngineCaseStudyPage() {
  const prose: React.CSSProperties = { fontSize: '16px', color: 'rgba(247,245,240,0.65)', lineHeight: 1.85, marginBottom: '1.25rem', fontWeight: 300 }
  const h2: React.CSSProperties = { fontFamily: 'var(--serif)', fontSize: 'clamp(1.4rem,3vw,1.8rem)', fontWeight: 400, color: '#f7f5f0', margin: '2.5rem 0 0.875rem', letterSpacing: '-0.01em', lineHeight: 1.2 }
  const h3: React.CSSProperties = { fontSize: '1rem', fontWeight: 600, color: '#f7f5f0', margin: '1.75rem 0 0.5rem', letterSpacing: '0.02em' }
  const callout: React.CSSProperties = { background: '#1a1a18', border: '1px solid rgba(255,255,255,0.07)', borderLeft: '3px solid var(--coral)', padding: '1.5rem', margin: '2rem 0' }
  const calloutDark: React.CSSProperties = { background: 'rgba(232,82,26,0.06)', border: '1px solid rgba(232,82,26,0.2)', padding: '1.75rem', margin: '2.5rem 0' }

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0e', color: '#f7f5f0', fontFamily: 'var(--sans)' }}>
      <style>{`
        :root { --coral:#e8521a; --coral-border:rgba(232,82,26,0.3); --border-dark:rgba(255,255,255,0.09); }
        * { box-sizing:border-box; margin:0; padding:0; }
        .stat-row { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; margin:2rem 0; }
        .stat-box { background:#1a1a18; border:1px solid rgba(255,255,255,0.07); padding:1.25rem; text-align:center; }
        .week-box { background:#1a1a18; border:1px solid rgba(255,255,255,0.07); padding:1.5rem; margin:1rem 0; display:flex; gap:1.25rem; align-items:flex-start; }
        @media(max-width:600px) { .stat-row { grid-template-columns:1fr !important; } }
      `}</style>

      <Navbar />

      <article style={{ maxWidth: '740px', margin: '0 auto', padding: 'clamp(4rem,10vw,6rem) clamp(1.5rem,5vw,2.5rem) 6rem' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '12px', color: 'rgba(247,245,240,0.25)', marginBottom: '2rem', fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>
          <Link href="/blog" style={{ color: 'rgba(247,245,240,0.25)', textDecoration: 'none' }}>Blog</Link>
          <span>→</span>
          <span>Case Study</span>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--coral)', border: '1px solid var(--coral-border)', padding: '3px 10px' }}>Case Study</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'rgba(247,245,240,0.25)', letterSpacing: '0.06em' }}>June 8, 2026</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'rgba(247,245,240,0.25)' }}>·</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'rgba(247,245,240,0.25)', letterSpacing: '0.06em' }}>8 min read</span>
          </div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.75rem,4vw,2.75rem)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.25rem', fontWeight: 400 }}>
            How We Built a Full AI Content Engine for an E-Commerce Brand in 2 Weeks
          </h1>
          <p style={{ fontSize: '18px', fontWeight: 300, color: 'rgba(247,245,240,0.55)', lineHeight: 1.7 }}>
            From zero to a fully automated content pipeline — blog posts, emails, social, and ads — all running without a full-time writer. Here's exactly how we did it.
          </p>
        </div>

        <div className="stat-row">
          {[
            { value: '2 wks', label: 'from kickoff to fully running system' },
            { value: '40×', label: 'increase in monthly content output' },
            { value: '$0', label: 'additional headcount required' },
          ].map(s => (
            <div key={s.label} className="stat-box">
              <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: 'var(--coral)', marginBottom: '0.4rem' }}>{s.value}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'rgba(247,245,240,0.35)', lineHeight: 1.5, letterSpacing: '0.04em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={callout}>
          <p style={{ ...prose, margin: 0, color: 'rgba(247,245,240,0.8)', fontStyle: 'italic' }}>Client details are anonymized. The business is a direct-to-consumer e-commerce brand selling home goods, doing approximately $2M in annual revenue with a team of six.</p>
        </div>

        <h2 style={h2}>The problem</h2>
        <p style={prose}>The founder had been running their Shopify store for three years with strong word-of-mouth but almost no content marketing. They knew they were leaving organic search traffic on the table — competitors with lower-quality products were outranking them because they published consistently.</p>
        <p style={prose}>The problem wasn't motivation. It was capacity. With a team of six focused on operations, fulfillment, and customer service, there was nobody to write. Hiring a content manager was on the roadmap but not for another two quarters.</p>
        <p style={prose}>They came to us asking: "Can AI handle this?" The answer was yes — but not by just plugging in ChatGPT and hoping for the best.</p>

        <h2 style={h2}>Week one: architecture and training</h2>

        <h3 style={h3}>Day 1–2: Brand voice extraction</h3>
        <p style={prose}>Before any AI touches content, it needs to understand how the brand sounds. We pulled every piece of existing content — product descriptions, email campaigns, customer service responses, the founder's personal emails. We ran a brand voice analysis and documented: tone (warm but direct), vocabulary (avoided jargon, preferred concrete specifics), sentence structure (short paragraphs, active voice), and what the brand explicitly doesn't sound like.</p>
        <p style={prose}>This became the brand voice document that gets prepended to every content prompt. It's the difference between AI that sounds like the brand and AI that sounds like every other brand.</p>

        <h3 style={h3}>Day 3–4: Content strategy and topic framework</h3>
        <p style={prose}>We built a content calendar framework based on three pillars: product education (how to use, how to choose), lifestyle content (the aesthetic and values the brand represents), and practical guides (home organization, care, styling) that serve the search intent of their target customer.</p>
        <p style={prose}>For each pillar, we identified the 20 highest-value search topics using keyword research — terms with real monthly volume and low-to-medium competition that the brand could realistically rank for in 90–180 days.</p>

        <h3 style={h3}>Day 5–7: Building the pipeline</h3>
        <p style={prose}>The content pipeline we built has four stages:</p>
        <ul style={{ ...prose, paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#f7f5f0' }}>Brief generation:</strong> A topic title and target keyword go in. A structured brief with angle, outline, key points, and target word count comes out.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#f7f5f0' }}>Draft creation:</strong> The brief feeds the content model. A full draft comes out, written in the brand voice, with proper headings, internal link suggestions, and a meta description.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#f7f5f0' }}>Human review:</strong> The founder or a team member reviews for accuracy and brand fit. This takes 10–15 minutes per piece, not 2–3 hours.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#f7f5f0' }}>Repurposing:</strong> The approved blog post feeds an email newsletter version, three social captions, and one ad headline set — automatically.</li>
        </ul>

        <h2 style={h2}>Week two: integration and launch</h2>

        <h3 style={h3}>Day 8–10: CMS and email integration</h3>
        <p style={prose}>We connected the pipeline to their Shopify blog via API and to Klaviyo for email. Approved content moves from a shared Notion workspace to scheduled publish with one click. No copy-pasting, no reformatting, no manual scheduling.</p>

        <h3 style={h3}>Day 11–12: Social scheduling</h3>
        <p style={prose}>Social captions generated from each piece get routed to a Buffer queue. The team reviews the weekly batch on Monday morning — takes about 20 minutes — and approves for the week. Instagram, Pinterest, and Facebook covered from a single review session.</p>

        <h3 style={h3}>Day 13–14: Testing, training, handoff</h3>
        <p style={prose}>We ran the full pipeline on five pieces of content, gathered feedback, adjusted the brand voice document and prompts based on what the founder flagged, and ran them again. Then we did a two-hour training session with the two team members who would own the system going forward.</p>
        <p style={prose}>By end of day 14, the system was live and the team was running it independently.</p>

        <h2 style={h2}>Results at 60 days</h2>
        <div style={{ background: '#1a1a18', border: '1px solid rgba(255,255,255,0.07)', padding: '1.5rem', margin: '1.5rem 0' }}>
          {[
            ['Content published (month 1)', '28 pieces (vs. 2 the month before)'],
            ['Time spent by team on content', '~3 hours/week (vs. ~0, because nothing was being made)'],
            ['Organic sessions (60-day change)', '+34%'],
            ['Email open rate', '31% (industry avg: 22%)'],
            ['New keywords ranking in top 50', '47'],
            ['Additional headcount needed', 'None'],
          ].map(([label, value]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'rgba(247,245,240,0.4)', letterSpacing: '0.04em' }}>{label}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: '#f7f5f0', fontWeight: 600, letterSpacing: '0.04em' }}>{value}</span>
            </div>
          ))}
        </div>

        <h2 style={h2}>What made it work</h2>
        <p style={prose}>The content engine works because it's built around the brand, not around the tool. Generic AI content is everywhere now and it ranks nowhere. Content that genuinely reflects a brand's voice, addresses real customer questions, and is published consistently is still relatively rare — and Google rewards it.</p>
        <p style={prose}>The other key factor: the human review step. We kept it in deliberately. The team reviews every piece before it goes out. This keeps quality high, catches anything the AI gets wrong, and means the brand isn't on autopilot in a way that could produce embarrassing output.</p>
        <p style={prose}>Ten to fifteen minutes of human review per piece is not a burden. It's insurance — and it's what separates "AI-assisted content" from "AI slop."</p>

        <div style={calloutDark}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', color: '#f7f5f0', marginBottom: '0.5rem' }}>Want a content engine for your business?</div>
          <p style={{ ...prose, color: 'rgba(247,245,240,0.55)', margin: '0 0 1.25rem' }}>We build content systems that sound like you, publish consistently, and require minimal ongoing time from your team. Book a call to see what this looks like for your specific business.</p>
          <Link href="/#contact" style={{ display: 'inline-block', fontFamily: 'var(--sans)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--coral)', color: '#fff', padding: '0.875rem 1.75rem', textDecoration: 'none' }}>
            Book a free strategy call →
          </Link>
        </div>

        <div style={{ background: '#1a1a18', border: '1px solid rgba(255,255,255,0.07)', padding: '2.5rem', marginTop: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.75rem', fontWeight: 400, color: '#f7f5f0', marginBottom: '0.75rem' }}>Ready to build your content engine?</h2>
          <p style={{ ...prose, maxWidth: '42ch', margin: '0 auto 1.75rem', color: 'rgba(247,245,240,0.4)' }}>No long onboarding. No confusing tech. Just a system that runs — built in weeks, not months.</p>
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