# DoneForYouAI redesign (v2) - writes all updated files into your local repo.
# Run from the repo root:   powershell -ExecutionPolicy Bypass -File .\apply-redesign.ps1
# Or pass the folder:       ... -File .\apply-redesign.ps1 -Root "C:\path\to\doneforyouai"
param([string]$Root = (Get-Location).Path)

$ErrorActionPreference = 'Stop'
$utf8NoBom = New-Object System.Text.UTF8Encoding $false

if (-not (Test-Path -LiteralPath (Join-Path $Root 'package.json'))) {
  throw "package.json not found in '$Root'. Pass the repo folder with -Root."
}

$files = @()
$files += @{ Path = 'src\app\blog\ai-automations-every-business-needs\page.tsx'; Content = @'
import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/app/components/Navbar'


export const metadata: Metadata = {
  title: 'The 5 AI Automations Every Small Business Should Have Running by End of Month',
  description: 'You don\'t need a team of engineers or a six-figure budget. These five automations are the highest-leverage moves for any small business in 2026.',
  keywords: ['AI automation small business', 'business automation 2026', 'AI workflows for small business', 'automate small business tasks', 'best AI automations'],
  alternates: { canonical: 'https://www.doneforyouai.com/blog/ai-automations-every-business-needs' },
  openGraph: {
    title: 'The 5 AI Automations Every Small Business Should Have Running by End of Month',
    description: 'These five automations are the highest-leverage moves for any small business in 2026.',
    url: 'https://www.doneforyouai.com/blog/ai-automations-every-business-needs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '5 AI automations every small business needs' }],
  },
}

export default function AIAutomationsPage() {
  const prose: React.CSSProperties = { fontSize: '16px', color: 'rgba(21,22,26,0.81)', lineHeight: 1.85, marginBottom: '1.25rem', fontWeight: 500 }
  const h2: React.CSSProperties = { fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.4rem,3vw,1.8rem)', fontWeight: 400, color: '#15161A', margin: '2.5rem 0 0.875rem', letterSpacing: '-0.01em', lineHeight: 1.2 }
  const calloutDark: React.CSSProperties = { background: 'rgba(43,75,255,0.06)', border: '1px solid rgba(43,75,255,0.2)', padding: '1.75rem', margin: '2.5rem 0', borderRadius: 20 }
  const automationBox: React.CSSProperties = { background: '#ffffff', border: '1px solid rgba(21,22,26,0.10)', borderRadius: 20, padding: '1.75rem', margin: '1.5rem 0' }

  return (
    <div className="dfy-public" style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--f-body)' }}>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        .stat-row { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; margin:2rem 0; }
        .stat-box { border-radius:20px; background:#ffffff; border:1px solid rgba(21,22,26,0.10); padding:1.25rem; text-align:center; }
        @media(max-width:600px) { .stat-row { grid-template-columns:1fr !important; } }
;
      `}</style>

      <Navbar />

      <article style={{ maxWidth: '740px', margin: '0 auto', padding: 'clamp(6.5rem,10vw,8rem) clamp(1.5rem,5vw,2.5rem) 6rem' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '12px', color: 'rgba(21,22,26,0.59)', marginBottom: '2rem', fontFamily: 'var(--f-body)', letterSpacing: '0.04em' }}>
          <Link href="/blog" style={{ color: 'rgba(21,22,26,0.59)', textDecoration: 'none' }}>Blog</Link>
          <span>→</span>
          <span>Automation</span>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid var(--accent-border)', padding: '3px 10px' }}>Automation</span>
            
            <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.59)' }}>·</span>
            <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.59)', letterSpacing: '0.04em' }}>6 min read</span>
          </div>
          <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.75rem,4vw,2.75rem)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.25rem', fontWeight: 400 }}>
            The 5 AI Automations Every Small Business Should Have Running by End of Month
          </h1>
          <p style={{ fontSize: '18px', fontWeight: 500, color: 'rgba(21,22,26,0.75)', lineHeight: 1.7 }}>
            You don't need a team of engineers or a six-figure budget. These five automations are the highest-leverage moves for any small business in 2026 — and most can be live within a week.
          </p>
        </div>

        <div className="stat-row">
          {[
            { value: '3.5hrs', label: 'average time saved per employee per day with AI' },
            { value: '40%', label: 'of small business tasks are fully automatable today' },
            { value: '6 weeks', label: 'typical payback period for AI implementation' },
          ].map(s => (
            <div key={s.label} className="stat-box">
              <div style={{ fontFamily: 'var(--f-serif)', fontSize: '2rem', color: 'var(--accent)', marginBottom: '0.4rem' }}>{s.value}</div>
              <div style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.64)', lineHeight: 1.5, letterSpacing: '0.04em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <p style={prose}>Most small business owners are doing tasks every day that AI could handle better, faster, and at a fraction of the cost. Not because the owners aren't capable — but because these tasks are repetitive, rule-based, and genuinely don't require human judgment.</p>
        <p style={prose}>Here are the five automations we build for almost every client — ranked by time-to-value and ease of implementation.</p>

        {/* Automation 1 */}
        <div style={automationBox}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontFamily: 'var(--f-serif)', fontSize: '2.5rem', color: 'var(--accent)', lineHeight: 1 }}>01</span>
            <h2 style={{ ...h2, margin: 0, fontSize: '1.3rem' }}>Lead capture and qualification</h2>
          </div>
          <p style={prose}>Every business has a form, a chat widget, or an email inbox where potential customers reach out. Most of the time, these sit unattended for hours — or get a generic auto-reply that does nothing to move the conversation forward.</p>
          <p style={prose}>An AI-powered lead qualification system reads every inbound inquiry, scores it based on fit, asks clarifying questions automatically, and routes hot leads to your calendar or your sales team within minutes — 24/7.</p>
          <p style={{ ...prose, marginBottom: 0 }}><strong style={{ color: '#15161A' }}>Time saved:</strong> 1–3 hours per day for most businesses. <strong style={{ color: '#15161A' }}>ROI:</strong> Often covers implementation cost in the first month from leads that would have gone cold.</p>
        </div>

        {/* Automation 2 */}
        <div style={automationBox}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontFamily: 'var(--f-serif)', fontSize: '2.5rem', color: 'var(--accent)', lineHeight: 1 }}>02</span>
            <h2 style={{ ...h2, margin: 0, fontSize: '1.3rem' }}>Customer support — first response</h2>
          </div>
          <p style={prose}>Your support inbox likely receives the same 15–20 questions on repeat. Hours, pricing, refund policies, product details, appointment availability. These don't need a human response. They need a fast, accurate, consistent one.</p>
          <p style={prose}>An AI trained on your business knowledge base handles tier-1 support completely — answering questions correctly, escalating anything complex, and maintaining your brand voice. Your team only touches the conversations that actually require them.</p>
          <p style={{ ...prose, marginBottom: 0 }}><strong style={{ color: '#15161A' }}>Time saved:</strong> 2–5 hours per day for most service businesses. <strong style={{ color: '#15161A' }}>Customer benefit:</strong> Responses in seconds instead of hours.</p>
        </div>

        {/* Automation 3 */}
        <div style={automationBox}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontFamily: 'var(--f-serif)', fontSize: '2.5rem', color: 'var(--accent)', lineHeight: 1 }}>03</span>
            <h2 style={{ ...h2, margin: 0, fontSize: '1.3rem' }}>Content creation pipeline</h2>
          </div>
          <p style={prose}>Content marketing works. Almost every business owner knows this and almost none are doing it consistently — because consistent content creation is genuinely hard to maintain alongside running a business.</p>
          <p style={prose}>An AI content pipeline takes a topic brief and outputs a structured first draft: blog post, email newsletter, social captions, ad copy. A human reviews and approves. The output goes out on schedule. The business stays visible without the owner writing a single word from scratch.</p>
          <p style={{ ...prose, marginBottom: 0 }}><strong style={{ color: '#15161A' }}>Output increase:</strong> Most businesses go from 2–4 pieces per month to 20–40. <strong style={{ color: '#15161A' }}>SEO impact:</strong> Typically measurable within 90 days.</p>
        </div>

        {/* Automation 4 */}
        <div style={automationBox}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontFamily: 'var(--f-serif)', fontSize: '2.5rem', color: 'var(--accent)', lineHeight: 1 }}>04</span>
            <h2 style={{ ...h2, margin: 0, fontSize: '1.3rem' }}>Follow-up and re-engagement sequences</h2>
          </div>
          <p style={prose}>Most businesses have a graveyard of leads that went quiet — people who expressed interest, got a proposal, then disappeared. The data consistently shows that most of these leads aren't lost forever; they just need a well-timed nudge.</p>
          <p style={prose}>An AI follow-up system monitors your CRM for stalled deals, drafts personalized re-engagement messages based on where each prospect is in the funnel, and sends them at the right cadence — automatically. You get notified when someone responds.</p>
          <p style={{ ...prose, marginBottom: 0 }}><strong style={{ color: '#15161A' }}>Recovery rate:</strong> Typically 10–25% of "dead" leads reactivate within 30 days of a well-configured sequence.</p>
        </div>

        {/* Automation 5 */}
        <div style={automationBox}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontFamily: 'var(--f-serif)', fontSize: '2.5rem', color: 'var(--accent)', lineHeight: 1 }}>05</span>
            <h2 style={{ ...h2, margin: 0, fontSize: '1.3rem' }}>Internal reporting and summaries</h2>
          </div>
          <p style={prose}>How much time does your team spend pulling together reports, summarizing meeting notes, updating dashboards, and writing status updates? For most businesses, it's several hours per week that produces information people skim for 90 seconds.</p>
          <p style={prose}>An AI reporting system connects to your data sources — CRM, analytics, email, project management — and generates concise, accurate summaries on a schedule. Monday morning report ready before anyone gets to their desk. Meeting notes processed and action items extracted automatically.</p>
          <p style={{ ...prose, marginBottom: 0 }}><strong style={{ color: '#15161A' }}>Time saved:</strong> 3–8 hours per week per team member involved in reporting. <strong style={{ color: '#15161A' }}>Quality improvement:</strong> Consistent format, no missed data.</p>
        </div>

        <h2 style={h2}>Where to start</h2>
        <p style={prose}>The mistake most businesses make is trying to implement all five at once. Pick the one where the pain is most acute — where your team is spending the most time, or where the revenue impact of delay is highest.</p>
        <p style={prose}>Build it properly. Make sure your team trusts it. Then expand.</p>
        <p style={prose}>A well-implemented single automation pays for itself and builds the internal confidence to go further. A rushed five-automation launch produces chaos and gets abandoned.</p>

        <div style={calloutDark}>
          <div style={{ fontFamily: 'var(--f-serif)', fontSize: '1.25rem', color: '#15161A', marginBottom: '0.5rem' }}>We'll tell you which one to build first</div>
          <p style={{ ...prose, color: 'rgba(21,22,26,0.75)', margin: '0 0 1.25rem' }}>Book a free strategy call. We'll map your highest-leverage automation opportunity in 30 minutes — no sales pitch, just a clear plan.</p>
          <Link href="/#contact" style={{ display: 'inline-block', fontFamily: 'var(--f-body)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', background: 'var(--accent)', borderRadius: 999, color: '#fff', padding: '0.875rem 1.75rem', textDecoration: 'none' }}>
            Book a free strategy call →
          </Link>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid rgba(21,22,26,0.10)', borderRadius: 20, padding: '2.5rem', marginTop: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--f-serif)', fontSize: '1.75rem', fontWeight: 400, color: '#15161A', marginBottom: '0.75rem' }}>Ready to automate the right things?</h2>
          <p style={{ ...prose, maxWidth: '42ch', margin: '0 auto 1.75rem', color: 'rgba(21,22,26,0.67)' }}>We build, integrate, and hand off. Your team runs it. No engineers required.</p>
          <Link href="/#contact" style={{ display: 'inline-block', fontFamily: 'var(--f-body)', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', background: 'var(--accent)', borderRadius: 999, color: '#fff', padding: '1rem 2.5rem', textDecoration: 'none' }}>
            Book a Free Strategy Call →
          </Link>
        </div>

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(21,22,26,0.10)' }}>
          <Link href="/blog" style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'var(--accent)', textDecoration: 'none', letterSpacing: '0.04em' }}>← Back to blog</Link>
        </div>

      </article>

      <footer style={{ borderTop: '1px solid rgba(21,22,26,0.10)', padding: '2rem clamp(1.5rem,5vw,3rem)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.56)', letterSpacing: '0.04em' }}>© 2026 DoneForYouAI.com · HONNYDO LLC</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[['Privacy', '/privacy'], ['Terms', '/terms']].map(([label, href]) => (
            <Link key={label} href={href} style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.56)', textDecoration: 'none', letterSpacing: '0.04em' }}>{label}</Link>
          ))}
        </div>
      </footer>
    </div>
  )
}
'@ }
$files += @{ Path = 'src\app\blog\ai-content-engine-case-study\page.tsx'; Content = @'
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
  const prose: React.CSSProperties = { fontSize: '16px', color: 'rgba(21,22,26,0.81)', lineHeight: 1.85, marginBottom: '1.25rem', fontWeight: 500 }
  const h2: React.CSSProperties = { fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.4rem,3vw,1.8rem)', fontWeight: 400, color: '#15161A', margin: '2.5rem 0 0.875rem', letterSpacing: '-0.01em', lineHeight: 1.2 }
  const h3: React.CSSProperties = { fontSize: '1rem', fontWeight: 600, color: '#15161A', margin: '1.75rem 0 0.5rem', letterSpacing: '0.02em' }
  const callout: React.CSSProperties = { background: 'var(--accent-tint)', border: '1px solid var(--accent-border)', borderRadius: 20, padding: '1.5rem', margin: '2rem 0' }
  const calloutDark: React.CSSProperties = { background: 'rgba(43,75,255,0.06)', border: '1px solid rgba(43,75,255,0.2)', padding: '1.75rem', margin: '2.5rem 0', borderRadius: 20 }

  return (
    <div className="dfy-public" style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--f-body)' }}>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        .stat-row { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; margin:2rem 0; }
        .stat-box { border-radius:20px; background:#ffffff; border:1px solid rgba(21,22,26,0.10); padding:1.25rem; text-align:center; }
        .week-box { background:#ffffff; border:1px solid rgba(21,22,26,0.10); padding:1.5rem; margin:1rem 0; display:flex; gap:1.25rem; align-items:flex-start; }
        @media(max-width:600px) { .stat-row { grid-template-columns:1fr !important; } }
;
      `}</style>

      <Navbar />

      <article style={{ maxWidth: '740px', margin: '0 auto', padding: 'clamp(6.5rem,10vw,8rem) clamp(1.5rem,5vw,2.5rem) 6rem' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '12px', color: 'rgba(21,22,26,0.59)', marginBottom: '2rem', fontFamily: 'var(--f-body)', letterSpacing: '0.04em' }}>
          <Link href="/blog" style={{ color: 'rgba(21,22,26,0.59)', textDecoration: 'none' }}>Blog</Link>
          <span>→</span>
          <span>Case Study</span>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid var(--accent-border)', padding: '3px 10px' }}>Case Study</span>
            
            <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.59)' }}>·</span>
            <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.59)', letterSpacing: '0.04em' }}>8 min read</span>
          </div>
          <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.75rem,4vw,2.75rem)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.25rem', fontWeight: 400 }}>
            How We Built a Full AI Content Engine for an E-Commerce Brand in 2 Weeks
          </h1>
          <p style={{ fontSize: '18px', fontWeight: 500, color: 'rgba(21,22,26,0.75)', lineHeight: 1.7 }}>
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
              <div style={{ fontFamily: 'var(--f-serif)', fontSize: '2rem', color: 'var(--accent)', marginBottom: '0.4rem' }}>{s.value}</div>
              <div style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.64)', lineHeight: 1.5, letterSpacing: '0.04em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={callout}>
          <p style={{ ...prose, margin: 0, color: 'rgba(21,22,26,0.89)', fontStyle: 'italic' }}>Client details are anonymized. The business is a direct-to-consumer e-commerce brand selling home goods, doing approximately $2M in annual revenue with a team of six.</p>
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
          <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#15161A' }}>Brief generation:</strong> A topic title and target keyword go in. A structured brief with angle, outline, key points, and target word count comes out.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#15161A' }}>Draft creation:</strong> The brief feeds the content model. A full draft comes out, written in the brand voice, with proper headings, internal link suggestions, and a meta description.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#15161A' }}>Human review:</strong> The founder or a team member reviews for accuracy and brand fit. This takes 10–15 minutes per piece, not 2–3 hours.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#15161A' }}>Repurposing:</strong> The approved blog post feeds an email newsletter version, three social captions, and one ad headline set — automatically.</li>
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
        <div style={{ background: '#ffffff', border: '1px solid rgba(21,22,26,0.10)', borderRadius: 20, padding: '1.5rem', margin: '1.5rem 0' }}>
          {[
            ['Content published (month 1)', '28 pieces (vs. 2 the month before)'],
            ['Time spent by team on content', '~3 hours/week (vs. ~0, because nothing was being made)'],
            ['Organic sessions (60-day change)', '+34%'],
            ['Email open rate', '31% (industry avg: 22%)'],
            ['New keywords ranking in top 50', '47'],
            ['Additional headcount needed', 'None'],
          ].map(([label, value]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(21,22,26,0.10)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.72rem', color: 'rgba(21,22,26,0.67)', letterSpacing: '0.04em' }}>{label}</span>
              <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.72rem', color: '#15161A', fontWeight: 600, letterSpacing: '0.04em' }}>{value}</span>
            </div>
          ))}
        </div>

        <h2 style={h2}>What made it work</h2>
        <p style={prose}>The content engine works because it's built around the brand, not around the tool. Generic AI content is everywhere now and it ranks nowhere. Content that genuinely reflects a brand's voice, addresses real customer questions, and is published consistently is still relatively rare — and Google rewards it.</p>
        <p style={prose}>The other key factor: the human review step. We kept it in deliberately. The team reviews every piece before it goes out. This keeps quality high, catches anything the AI gets wrong, and means the brand isn't on autopilot in a way that could produce embarrassing output.</p>
        <p style={prose}>Ten to fifteen minutes of human review per piece is not a burden. It's insurance — and it's what separates "AI-assisted content" from "AI slop."</p>

        <div style={calloutDark}>
          <div style={{ fontFamily: 'var(--f-serif)', fontSize: '1.25rem', color: '#15161A', marginBottom: '0.5rem' }}>Want a content engine for your business?</div>
          <p style={{ ...prose, color: 'rgba(21,22,26,0.75)', margin: '0 0 1.25rem' }}>We build content systems that sound like you, publish consistently, and require minimal ongoing time from your team. Book a call to see what this looks like for your specific business.</p>
          <Link href="/#contact" style={{ display: 'inline-block', fontFamily: 'var(--f-body)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', background: 'var(--accent)', borderRadius: 999, color: '#fff', padding: '0.875rem 1.75rem', textDecoration: 'none' }}>
            Book a free strategy call →
          </Link>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid rgba(21,22,26,0.10)', borderRadius: 20, padding: '2.5rem', marginTop: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--f-serif)', fontSize: '1.75rem', fontWeight: 400, color: '#15161A', marginBottom: '0.75rem' }}>Ready to build your content engine?</h2>
          <p style={{ ...prose, maxWidth: '42ch', margin: '0 auto 1.75rem', color: 'rgba(21,22,26,0.67)' }}>No long onboarding. No confusing tech. Just a system that runs — built in weeks, not months.</p>
          <Link href="/#contact" style={{ display: 'inline-block', fontFamily: 'var(--f-body)', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', background: 'var(--accent)', borderRadius: 999, color: '#fff', padding: '1rem 2.5rem', textDecoration: 'none' }}>
            Book a Free Strategy Call →
          </Link>
        </div>

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(21,22,26,0.10)' }}>
          <Link href="/blog" style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'var(--accent)', textDecoration: 'none', letterSpacing: '0.04em' }}>← Back to blog</Link>
        </div>

      </article>

      <footer style={{ borderTop: '1px solid rgba(21,22,26,0.10)', padding: '2rem clamp(1.5rem,5vw,3rem)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.56)', letterSpacing: '0.04em' }}>© 2026 DoneForYouAI.com · HONNYDO LLC</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[['Privacy', '/privacy'], ['Terms', '/terms']].map(([label, href]) => (
            <Link key={label} href={href} style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.56)', textDecoration: 'none', letterSpacing: '0.04em' }}>{label}</Link>
          ))}
        </div>
      </footer>
    </div>
  )
}
'@ }
$files += @{ Path = 'src\app\blog\ai-vs-hiring\page.tsx'; Content = @'
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
  const prose: React.CSSProperties = { fontSize: '16px', color: 'rgba(21,22,26,0.81)', lineHeight: 1.85, marginBottom: '1.25rem', fontWeight: 500 }
  const h2: React.CSSProperties = { fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.4rem,3vw,1.8rem)', fontWeight: 400, color: '#15161A', margin: '2.5rem 0 0.875rem', letterSpacing: '-0.01em', lineHeight: 1.2 }
  const h3: React.CSSProperties = { fontSize: '1rem', fontWeight: 600, color: '#15161A', margin: '1.75rem 0 0.5rem', letterSpacing: '0.02em' }
  const calloutDark: React.CSSProperties = { background: 'rgba(43,75,255,0.06)', border: '1px solid rgba(43,75,255,0.2)', padding: '1.75rem', margin: '2.5rem 0', borderRadius: 20 }

  return (
    <div className="dfy-public" style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--f-body)' }}>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        .stat-row { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; margin:2rem 0; }
        .stat-box { border-radius:20px; background:#ffffff; border:1px solid rgba(21,22,26,0.10); padding:1.25rem; text-align:center; }
        .compare-row { display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin:2rem 0; }
        .compare-col { border-radius:20px; background:#ffffff; border:1px solid rgba(21,22,26,0.10); padding:1.5rem; }
        @media(max-width:600px) { .stat-row { grid-template-columns:1fr !important; } .compare-row { grid-template-columns:1fr !important; } }
;
      `}</style>

      <Navbar />

      <article style={{ maxWidth: '740px', margin: '0 auto', padding: 'clamp(6.5rem,10vw,8rem) clamp(1.5rem,5vw,2.5rem) 6rem' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '12px', color: 'rgba(21,22,26,0.59)', marginBottom: '2rem', fontFamily: 'var(--f-body)', letterSpacing: '0.04em' }}>
          <Link href="/blog" style={{ color: 'rgba(21,22,26,0.59)', textDecoration: 'none' }}>Blog</Link>
          <span>→</span>
          <span>Business Strategy</span>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid var(--accent-border)', padding: '3px 10px' }}>Business Strategy</span>
            
            <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.59)' }}>·</span>
            <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.59)', letterSpacing: '0.04em' }}>6 min read</span>
          </div>
          <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.75rem,4vw,2.75rem)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.25rem', fontWeight: 400 }}>
            AI vs. Hiring: When It Makes Sense to Automate Instead of Add Headcount
          </h1>
          <p style={{ fontSize: '18px', fontWeight: 500, color: 'rgba(21,22,26,0.75)', lineHeight: 1.7 }}>
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
              <div style={{ fontFamily: 'var(--f-serif)', fontSize: '2rem', color: 'var(--accent)', marginBottom: '0.4rem' }}>{s.value}</div>
              <div style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.64)', lineHeight: 1.5, letterSpacing: '0.04em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={h2}>The reflex that's costing you</h2>
        <p style={prose}>Every growing business hits the same inflection point: there's more work than the current team can handle. The instinct is to hire. More work → more people. It's how businesses have always scaled.</p>
        <p style={prose}>That instinct made sense when the only alternative was doing more work yourself. In 2026, there's a third option that most business owners are still underweighting: build a system that handles the work instead.</p>
        <p style={prose}>This isn't about replacing your team. It's about being deliberate about what you hire humans to do — and making sure you're not paying $60,000/year for someone to answer the same 20 questions on repeat, schedule appointments, write first drafts, or pull weekly reports.</p>

        <h2 style={h2}>The true cost of a hire</h2>
        <p style={prose}>Most owners think about salary when they think about hiring cost. The full picture is different.</p>
        <div style={{ background: '#ffffff', border: '1px solid rgba(21,22,26,0.10)', borderRadius: 20, padding: '1.5rem', margin: '1.5rem 0' }}>
          {[
            ['Base salary (entry-level role)', '$38,000 – $55,000'],
            ['Benefits, payroll taxes, insurance', '+25–35% of salary'],
            ['Recruiting and onboarding', '$4,000 – $12,000 one-time'],
            ['Time to full productivity', '3–6 months'],
            ['Management overhead', '5–15% of manager\'s time'],
            ['Turnover risk (avg tenure: 2.5 years)', 'Full replacement cost'],
            ['Total first-year fully-loaded cost', '$58,000 – $85,000+'],
          ].map(([label, value]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(21,22,26,0.10)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.7rem', color: 'rgba(21,22,26,0.67)', letterSpacing: '0.04em' }}>{label}</span>
              <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.7rem', color: '#15161A', fontWeight: 600, letterSpacing: '0.04em' }}>{value}</span>
            </div>
          ))}
        </div>
        <p style={prose}>That's before accounting for the fact that a new hire takes your attention during onboarding — time you could be spending on revenue-generating work.</p>

        <h2 style={h2}>The tasks that AI handles better than a human hire</h2>
        <p style={prose}>Not everything should be automated. But there's a clear category of work that AI does faster, more consistently, and at a fraction of the cost:</p>
        <ul style={{ ...prose, paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#15161A' }}>High-volume, repetitive responses</strong> — answering customer questions, qualifying inbound leads, processing support tickets, responding to inquiries.</li>
          <li style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#15161A' }}>First-draft content creation</strong> — blog posts, email sequences, social captions, product descriptions, ad copy.</li>
          <li style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#15161A' }}>Data aggregation and reporting</strong> — pulling numbers from multiple systems, formatting into summaries, flagging anomalies.</li>
          <li style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#15161A' }}>Scheduling and coordination</strong> — booking meetings, sending reminders, following up on outstanding tasks.</li>
          <li style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#15161A' }}>Research and summarization</strong> — prospect research, competitive analysis, market monitoring.</li>
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
            <div style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem' }}>Automate when...</div>
            {[
              'The task is repetitive and rule-based',
              'Volume is high (10+ times/day)',
              'Quality can be verified automatically',
              'The task doesn\'t require relationship',
              'Speed matters more than nuance',
              'The work is predictable in format',
            ].map(item => (
              <div key={item} style={{ fontFamily: 'var(--f-body)', fontSize: '13px', color: 'rgba(21,22,26,0.78)', lineHeight: 1.6, marginBottom: '0.5rem', paddingLeft: '0.75rem', borderLeft: '2px solid rgba(43,75,255,0.3)' }}>{item}</div>
            ))}
          </div>
          <div className="compare-col">
            <div style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'rgba(21,22,26,0.64)', marginBottom: '1rem' }}>Hire when...</div>
            {[
              'The work requires judgment and discretion',
              'Relationship is the product',
              'Novel situations arise frequently',
              'Strategic direction needs to be set',
              'Accountability needs to live with a person',
              'Physical presence is required',
            ].map(item => (
              <div key={item} style={{ fontFamily: 'var(--f-body)', fontSize: '13px', color: 'rgba(21,22,26,0.67)', lineHeight: 1.6, marginBottom: '0.5rem', paddingLeft: '0.75rem', borderLeft: '2px solid rgba(21,22,26,0.10)' }}>{item}</div>
            ))}
          </div>
        </div>

        <h2 style={h2}>The hybrid approach most businesses land on</h2>
        <p style={prose}>In practice, the best implementations aren't "AI instead of hiring" — they're "AI handles the volume, humans handle the exceptions." A customer support AI handles 80% of tickets automatically. A human handles the 20% that are complex, sensitive, or require real decision-making.</p>
        <p style={prose}>This means the human hire you do make is doing higher-leverage work. They're not burned out answering the same question for the 40th time that week. They're solving real problems, building relationships, and doing the work that actually requires a person.</p>
        <p style={prose}>The businesses winning right now aren't the ones who hired the most. They're the ones who hired the right people for the right work — and automated everything else.</p>

        <div style={calloutDark}>
          <div style={{ fontFamily: 'var(--f-serif)', fontSize: '1.25rem', color: '#15161A', marginBottom: '0.5rem' }}>Not sure what to automate first?</div>
          <p style={{ ...prose, color: 'rgba(21,22,26,0.75)', margin: '0 0 1.25rem' }}>In a 30-minute strategy call, we'll map out exactly which tasks in your business AI can handle — and which ones you still need people for. No pitch, just a clear analysis.</p>
          <Link href="/#contact" style={{ display: 'inline-block', fontFamily: 'var(--f-body)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', background: 'var(--accent)', borderRadius: 999, color: '#fff', padding: '0.875rem 1.75rem', textDecoration: 'none' }}>
            Book a free strategy call →
          </Link>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid rgba(21,22,26,0.10)', borderRadius: 20, padding: '2.5rem', marginTop: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--f-serif)', fontSize: '1.75rem', fontWeight: 400, color: '#15161A', marginBottom: '0.75rem' }}>Let's figure out what to automate.</h2>
          <p style={{ ...prose, maxWidth: '42ch', margin: '0 auto 1.75rem', color: 'rgba(21,22,26,0.67)' }}>Free 30-minute strategy call. We'll map your highest-leverage automation opportunities — no commitment required.</p>
          <Link href="/#contact" style={{ display: 'inline-block', fontFamily: 'var(--f-body)', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', background: 'var(--accent)', borderRadius: 999, color: '#fff', padding: '1rem 2.5rem', textDecoration: 'none' }}>
            Book a Free Strategy Call →
          </Link>
        </div>

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(21,22,26,0.10)' }}>
          <Link href="/blog" style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'var(--accent)', textDecoration: 'none', letterSpacing: '0.04em' }}>← Back to blog</Link>
        </div>

      </article>

      <footer style={{ borderTop: '1px solid rgba(21,22,26,0.10)', padding: '2rem clamp(1.5rem,5vw,3rem)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.56)', letterSpacing: '0.04em' }}>© 2026 DoneForYouAI.com · HONNYDO LLC</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[['Privacy', '/privacy'], ['Terms', '/terms']].map(([label, href]) => (
            <Link key={label} href={href} style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.56)', textDecoration: 'none', letterSpacing: '0.04em' }}>{label}</Link>
          ))}
        </div>
      </footer>
    </div>
  )
}
'@ }
$files += @{ Path = 'src\app\blog\honest-guide-ai-tools-2026\page.tsx'; Content = @'
import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/app/components/Navbar'


export const metadata: Metadata = {
  title: 'The Honest Guide to AI Tools in 2026: What Actually Works, What\'s Hype',
  description: 'After building AI systems across dozens of businesses, here\'s an unfiltered breakdown of which tools deliver real ROI — and which ones are still just demos dressed up as products.',
  keywords: ['best AI tools 2026', 'AI tools that work', 'AI tools review small business', 'AI software comparison 2026', 'which AI tools are worth it'],
  alternates: { canonical: 'https://www.doneforyouai.com/blog/honest-guide-ai-tools-2026' },
  openGraph: {
    title: 'The Honest Guide to AI Tools in 2026: What Actually Works, What\'s Hype',
    description: 'An unfiltered breakdown of which AI tools deliver real ROI — and which ones are still just demos.',
    url: 'https://www.doneforyouai.com/blog/honest-guide-ai-tools-2026',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Honest guide to AI tools 2026' }],
  },
}

export default function HonestAIToolsGuidePage() {
  const prose: React.CSSProperties = { fontSize: '16px', color: 'rgba(21,22,26,0.81)', lineHeight: 1.85, marginBottom: '1.25rem', fontWeight: 500 }
  const h2: React.CSSProperties = { fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.4rem,3vw,1.8rem)', fontWeight: 400, color: '#15161A', margin: '2.5rem 0 0.875rem', letterSpacing: '-0.01em', lineHeight: 1.2 }
  const h3: React.CSSProperties = { fontSize: '1rem', fontWeight: 600, color: '#15161A', margin: '1.75rem 0 0.5rem', letterSpacing: '0.02em' }
  const callout: React.CSSProperties = { background: 'var(--accent-tint)', border: '1px solid var(--accent-border)', borderRadius: 20, padding: '1.5rem', margin: '2rem 0' }
  const calloutDark: React.CSSProperties = { background: 'rgba(43,75,255,0.06)', border: '1px solid rgba(43,75,255,0.2)', padding: '1.75rem', margin: '2.5rem 0', borderRadius: 20 }
  const toolBox: React.CSSProperties = { background: '#ffffff', border: '1px solid rgba(21,22,26,0.10)', borderRadius: 20, padding: '1.5rem', margin: '1.25rem 0' }

  return (
    <div className="dfy-public" style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--f-body)' }}>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        .stat-row { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; margin:2rem 0; }
        .stat-box { border-radius:20px; background:#ffffff; border:1px solid rgba(21,22,26,0.10); padding:1.25rem; text-align:center; }
        @media(max-width:600px) { .stat-row { grid-template-columns:1fr !important; } }
;
      `}</style>

      <Navbar />

      <article style={{ maxWidth: '740px', margin: '0 auto', padding: 'clamp(6.5rem,10vw,8rem) clamp(1.5rem,5vw,2.5rem) 6rem' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '12px', color: 'rgba(21,22,26,0.59)', marginBottom: '2rem', fontFamily: 'var(--f-body)', letterSpacing: '0.04em' }}>
          <Link href="/blog" style={{ color: 'rgba(21,22,26,0.59)', textDecoration: 'none' }}>Blog</Link>
          <span>→</span>
          <span>AI & Technology</span>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid var(--accent-border)', padding: '3px 10px' }}>AI & Technology</span>
            
            <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.59)' }}>·</span>
            <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.59)', letterSpacing: '0.04em' }}>9 min read</span>
          </div>
          <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.75rem,4vw,2.75rem)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.25rem', fontWeight: 400 }}>
            The Honest Guide to AI Tools in 2026: What Actually Works, What's Hype
          </h1>
          <p style={{ fontSize: '18px', fontWeight: 500, color: 'rgba(21,22,26,0.75)', lineHeight: 1.7 }}>
            After building AI systems across dozens of businesses, here's an unfiltered breakdown of which tools deliver real ROI — and which ones are still just demos dressed up as products.
          </p>
        </div>

        <div style={callout}>
          <p style={{ ...prose, margin: 0, color: 'rgba(21,22,26,0.83)' }}><strong style={{ color: '#15161A' }}>Disclosure:</strong> We don't take referral fees from any AI tool companies. These assessments are based on what we've seen work — and not work — across real client implementations.</p>
        </div>

        <h2 style={h2}>The tool graveyard</h2>
        <p style={prose}>Most business owners we talk to have a graveyard of AI tools they've tried and abandoned. ChatGPT Plus subscription they used twice. Jasper account collecting dust. Some AI SEO tool that promised first-page rankings and delivered AI-detectable slop. A chatbot that confidently gave customers wrong information.</p>
        <p style={prose}>The tool market has exploded — there are now thousands of AI SaaS products competing for your attention. Most of them are wrappers around the same underlying models, selling the same features, differentiated mostly by marketing. Many of them aren't worth the subscription.</p>
        <p style={prose}>Here's our honest breakdown, based on what we actually use in client implementations.</p>

        <h2 style={h2}>The foundation models — what's actually running everything</h2>

        <div style={toolBox}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <h3 style={{ ...h3, margin: 0 }}>Claude (Anthropic)</h3>
            <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'var(--accent)', border: '1px solid var(--accent-border)', padding: '2px 8px' }}>Our primary model</span>
          </div>
          <p style={{ ...prose, marginBottom: '0.5rem' }}>The best model for business writing, reasoning, and following complex instructions. Produces the most natural-sounding content, handles nuance better than competitors, and rarely hallucinates on factual tasks when given proper context. The model we use for content systems, chatbots, and complex automation logic.</p>
          <p style={{ ...prose, marginBottom: 0, color: 'rgba(21,22,26,0.67)' }}><strong style={{ color: 'rgba(21,22,26,0.78)' }}>Best for:</strong> Content creation, chatbots, complex reasoning, customer-facing AI. <strong style={{ color: 'rgba(21,22,26,0.78)' }}>Weakness:</strong> Not the cheapest for high-volume simple tasks.</p>
        </div>

        <div style={toolBox}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <h3 style={{ ...h3, margin: 0 }}>GPT-4o (OpenAI)</h3>
            <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.64)', border: '1px solid rgba(21,22,26,0.10)', padding: '2px 8px' }}>Strong alternative</span>
          </div>
          <p style={{ ...prose, marginBottom: '0.5rem' }}>Excellent for multimodal tasks — image analysis, vision-based workflows, voice. Slightly more capable than Claude for structured data extraction and code generation. The model we reach for when the task involves images or when we need maximum coding capability.</p>
          <p style={{ ...prose, marginBottom: 0, color: 'rgba(21,22,26,0.67)' }}><strong style={{ color: 'rgba(21,22,26,0.78)' }}>Best for:</strong> Code, image analysis, structured data. <strong style={{ color: 'rgba(21,22,26,0.78)' }}>Weakness:</strong> Writing quality slightly more generic than Claude.</p>
        </div>

        <h2 style={h2}>Automation and workflow tools — the connective tissue</h2>

        <div style={toolBox}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <h3 style={{ ...h3, margin: 0 }}>Make (formerly Integromat)</h3>
            <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'var(--accent)', border: '1px solid var(--accent-border)', padding: '2px 8px' }}>Highly recommended</span>
          </div>
          <p style={{ ...prose, marginBottom: '0.5rem' }}>The automation platform we use most for connecting AI to business systems. More powerful than Zapier for complex workflows, better pricing for high-volume operations, and native AI module integration. If you're building anything that moves data between more than two systems, this is where we build it.</p>
          <p style={{ ...prose, marginBottom: 0, color: 'rgba(21,22,26,0.67)' }}><strong style={{ color: 'rgba(21,22,26,0.78)' }}>Best for:</strong> Complex multi-step automations, high volume. <strong style={{ color: 'rgba(21,22,26,0.78)' }}>Learning curve:</strong> Steeper than Zapier but worth it.</p>
        </div>

        <div style={toolBox}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <h3 style={{ ...h3, margin: 0 }}>Zapier</h3>
            <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.64)', border: '1px solid rgba(21,22,26,0.10)', padding: '2px 8px' }}>Good for simple flows</span>
          </div>
          <p style={{ ...prose, marginBottom: '0.5rem' }}>Still excellent for simple, two-step automations. If you need something connected in an hour and it doesn't have complex logic, Zapier is faster to implement. We use it for simple notification flows and integrations with tools that aren't in Make's connector library yet.</p>
          <p style={{ ...prose, marginBottom: 0, color: 'rgba(21,22,26,0.67)' }}><strong style={{ color: 'rgba(21,22,26,0.78)' }}>Best for:</strong> Simple integrations, fast prototyping. <strong style={{ color: 'rgba(21,22,26,0.78)' }}>Weakness:</strong> Gets expensive fast, limited logic for complex workflows.</p>
        </div>

        <h2 style={h2}>Voice AI — the category everyone underestimates</h2>

        <div style={toolBox}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <h3 style={{ ...h3, margin: 0 }}>ElevenLabs</h3>
            <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'var(--accent)', border: '1px solid var(--accent-border)', padding: '2px 8px' }}>Best in class</span>
          </div>
          <p style={{ ...prose, marginBottom: '0.5rem' }}>The most natural-sounding AI voice platform on the market. Indistinguishable from human for most use cases. We use ElevenLabs for AI receptionists, voice interfaces, and video narration. The conversational AI product (Convai) is genuinely good for real-time phone applications.</p>
          <p style={{ ...prose, marginBottom: 0, color: 'rgba(21,22,26,0.67)' }}><strong style={{ color: 'rgba(21,22,26,0.78)' }}>Best for:</strong> Phone AI, voice interfaces, audio content. <strong style={{ color: 'rgba(21,22,26,0.78)' }}>Weakness:</strong> Cost scales with usage volume.</p>
        </div>

        <h2 style={h2}>The hype category — tools we're skeptical of</h2>

        <h3 style={h3}>AI writing assistants (Jasper, Copy.ai, etc.)</h3>
        <p style={prose}>These are largely wrappers around GPT that add a UI and charge a premium. At the price points they charge, you're better off accessing the underlying models directly and building prompts trained on your specific brand. We've replaced every client's writing tool subscription with a custom-configured Claude pipeline that produces better output for less money.</p>

        <h3 style={h3}>"AI SEO" platforms</h3>
        <p style={prose}>The category is full of products that promise to rank your content with AI. Most of them produce content that reads like it was written by someone who's never visited your website. Google's quality algorithms have gotten much better at detecting and deprioritizing AI-generated content that isn't genuinely useful. The answer isn't less AI — it's AI configured to produce genuinely useful, brand-specific content. Which requires more work than any of these platforms do by default.</p>

        <h3 style={h3}>"All-in-one AI business platforms"</h3>
        <p style={prose}>There are now dozens of platforms promising to be your entire AI stack in one dashboard. In our experience, none of them do any single thing as well as the best specialized tool in that category. They're useful for experimentation. They're not what you build a serious business system on.</p>

        <h2 style={h2}>The real differentiator isn't the tool</h2>
        <p style={prose}>After all of this, the honest conclusion is: the tool matters less than you think. Claude vs. GPT-4 is a marginal difference in most applications. Make vs. Zapier for simple flows doesn't matter much. ElevenLabs vs. a slightly-less-good voice platform — you'd have to listen hard to tell the difference.</p>
        <p style={prose}>What determines whether AI works in your business is how it's configured, what data it's given, how it's integrated into your actual workflow, and whether your team trusts it enough to use it consistently.</p>
        <p style={prose}>The businesses getting real ROI from AI aren't the ones with the most sophisticated tool stack. They're the ones who picked reasonable tools, configured them properly, and made them part of how work actually gets done.</p>

        <div style={calloutDark}>
          <div style={{ fontFamily: 'var(--f-serif)', fontSize: '1.25rem', color: '#15161A', marginBottom: '0.5rem' }}>We'll recommend the right tools for your specific situation</div>
          <p style={{ ...prose, color: 'rgba(21,22,26,0.75)', margin: '0 0 1.25rem' }}>No affiliate relationships, no tool bias. We recommend what actually works for your use case — and we build it so it runs without you becoming a technical expert.</p>
          <Link href="/#contact" style={{ display: 'inline-block', fontFamily: 'var(--f-body)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', background: 'var(--accent)', borderRadius: 999, color: '#fff', padding: '0.875rem 1.75rem', textDecoration: 'none' }}>
            Book a free strategy call →
          </Link>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid rgba(21,22,26,0.10)', borderRadius: 20, padding: '2.5rem', marginTop: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--f-serif)', fontSize: '1.75rem', fontWeight: 400, color: '#15161A', marginBottom: '0.75rem' }}>Stop experimenting. Start executing.</h2>
          <p style={{ ...prose, maxWidth: '42ch', margin: '0 auto 1.75rem', color: 'rgba(21,22,26,0.67)' }}>We'll tell you exactly which tools to use, build the system, and hand it off. No ongoing dependency on us required.</p>
          <Link href="/#contact" style={{ display: 'inline-block', fontFamily: 'var(--f-body)', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', background: 'var(--accent)', borderRadius: 999, color: '#fff', padding: '1rem 2.5rem', textDecoration: 'none' }}>
            Book a Free Strategy Call →
          </Link>
        </div>

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(21,22,26,0.10)' }}>
          <Link href="/blog" style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'var(--accent)', textDecoration: 'none', letterSpacing: '0.04em' }}>← Back to blog</Link>
        </div>

      </article>

      <footer style={{ borderTop: '1px solid rgba(21,22,26,0.10)', padding: '2rem clamp(1.5rem,5vw,3rem)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.56)', letterSpacing: '0.04em' }}>© 2026 DoneForYouAI.com · HONNYDO LLC</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[['Privacy', '/privacy'], ['Terms', '/terms']].map(([label, href]) => (
            <Link key={label} href={href} style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.56)', textDecoration: 'none', letterSpacing: '0.04em' }}>{label}</Link>
          ))}
        </div>
      </footer>
    </div>
  )
}
'@ }
$files += @{ Path = 'src\app\blog\page.tsx'; Content = @'
'use client'

import Link from 'next/link'
import Navbar from '@/app/components/Navbar'

const posts = [
  {
    slug: 'why-ai-implementations-fail',
    title: "Why Most AI Implementations Fail (And How to Make Sure Yours Doesn't)",
    excerpt: "Companies are spending thousands on AI tools and getting almost nothing back. The problem isn't the technology — it's how it's being deployed. Here's what actually works.",
    readTime: '7 min read',
    category: 'AI & Strategy',
  },
  {
    slug: 'ai-automations-every-business-needs',
    title: 'The 5 AI Automations Every Small Business Should Have Running by End of Month',
    excerpt: "You don't need a team of engineers or a six-figure budget. These five automations are the highest-leverage moves for any small business in 2026.",
    readTime: '6 min read',
    category: 'Automation',
  },
  {
    slug: 'ai-content-engine-case-study',
    title: 'How We Built a Full AI Content Engine for an E-Commerce Brand in 2 Weeks',
    excerpt: "From zero to a fully automated content pipeline — blog posts, emails, social, and ads — all running without a full-time writer. Here's exactly how we did it.",
    readTime: '8 min read',
    category: 'Case Study',
  },
  {
    slug: 'ai-vs-hiring',
    title: 'AI vs. Hiring: When It Makes Sense to Automate Instead of Add Headcount',
    excerpt: 'The default answer to every business problem used to be "hire someone." In 2026, that answer is wrong more often than most owners realize.',
    readTime: '6 min read',
    category: 'Business Strategy',
  },
  {
    slug: 'honest-guide-ai-tools-2026',
    title: "The Honest Guide to AI Tools in 2026: What Actually Works, What's Hype",
    excerpt: "After building AI systems across dozens of businesses, here's an unfiltered breakdown of which tools deliver real ROI — and which ones are still just demos dressed up as products.",
    readTime: '9 min read',
    category: 'AI & Technology',
  },
]

export default function BlogPage() {
  return (
    <div className="dfy-public" style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--f-body)' }}>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        .post-card { border-radius:24px; background:#ffffff; border:1px solid rgba(21,22,26,0.10); padding:2.5rem; transition:border-color .2s, background .2s; text-decoration:none; display:block; color:inherit; }
        .post-card:hover { border-color:rgba(43,75,255,0.3); background:#ffffff; }
        @media(max-width:640px) { .post-card { padding:1.5rem; } }
      `}</style>

      <Navbar />

      {/* Hero */}
      <div style={{ borderBottom: '1px solid rgba(21,22,26,0.10)', padding: 'clamp(5rem,12vw,9rem) clamp(1.5rem,5vw,3rem) clamp(3rem,6vw,5rem)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: '1.5rem' }}>Blog</span>
          <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
            AI that works.<br /><em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>In the real world.</em>
          </h1>
          <p style={{ fontSize: 'clamp(0.9rem,2vw,1rem)', color: 'rgba(21,22,26,0.73)', lineHeight: 1.75, maxWidth: '52ch' }}>
            Practical guides on AI implementation, automation, and building systems that actually move the needle — no hype, no fluff.
          </p>
        </div>
      </div>

      {/* Posts */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(2rem,5vw,4rem) clamp(1.5rem,5vw,3rem)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {posts.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="post-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid var(--accent-border)', padding: '3px 10px' }}>{post.category}</span>
                
                <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.59)' }}>·</span>
                <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.59)', letterSpacing: '0.04em' }}>{post.readTime}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.2rem,2.5vw,1.6rem)', fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.01em', marginBottom: '0.75rem', color: '#15161A' }}>{post.title}</h2>
                  <p style={{ fontSize: '14px', color: 'rgba(21,22,26,0.67)', lineHeight: 1.7, fontWeight: 500 }}>{post.excerpt}</p>
                </div>
                <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.9rem', color: 'rgba(43,75,255,0.5)', flexShrink: 0, paddingTop: '0.25rem' }}>↗</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ borderTop: '1px solid rgba(21,22,26,0.10)', padding: 'clamp(3rem,8vw,6rem) clamp(1.5rem,5vw,3rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: '1.5rem' }}>Ready to implement?</span>
          <h2 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 400, lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Stop reading about AI.<br /><em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Start running it.</em>
          </h2>
          <a href="/#contact" style={{ display: 'inline-block', fontFamily: 'var(--f-body)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', background: 'var(--accent)', borderRadius: 999, color: '#fff', padding: '1rem 2.5rem', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >Book a Free Strategy Call →</a>
        </div>
      </div>

      <footer style={{ borderTop: '1px solid rgba(21,22,26,0.10)', padding: '2rem clamp(1.5rem,5vw,3rem)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.56)', letterSpacing: '0.04em' }}>© 2026 DoneForYouAI.com · HONNYDO LLC</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[['Privacy', '/privacy'], ['Terms', '/terms']].map(([label, href]) => (
            <Link key={label} href={href} style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.56)', textDecoration: 'none', letterSpacing: '0.04em' }}>{label}</Link>
          ))}
        </div>
      </footer>
    </div>
  )
}
'@ }
$files += @{ Path = 'src\app\blog\why-ai-implementations-fail\page.tsx'; Content = @'
import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/app/components/Navbar'


export const metadata: Metadata = {
  title: 'Why Most AI Implementations Fail (And How to Make Sure Yours Doesn\'t)',
  description: 'Companies are spending thousands on AI tools and getting almost nothing back. The problem isn\'t the technology — it\'s how it\'s being deployed. Here\'s what actually works.',
  keywords: ['AI implementation failure', 'AI strategy for business', 'how to implement AI', 'AI ROI small business', 'AI automation that works'],
  alternates: { canonical: 'https://www.doneforyouai.com/blog/why-ai-implementations-fail' },
  openGraph: {
    title: 'Why Most AI Implementations Fail (And How to Make Sure Yours Doesn\'t)',
    description: 'The problem isn\'t the technology — it\'s how it\'s being deployed. Here\'s what actually works.',
    url: 'https://www.doneforyouai.com/blog/why-ai-implementations-fail',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Why AI implementations fail' }],
  },
}

export default function WhyAIFailsPage() {
  const prose: React.CSSProperties = { fontSize: '16px', color: 'rgba(21,22,26,0.81)', lineHeight: 1.85, marginBottom: '1.25rem', fontWeight: 500 }
  const h2: React.CSSProperties = { fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.4rem,3vw,1.8rem)', fontWeight: 400, color: '#15161A', margin: '2.5rem 0 0.875rem', letterSpacing: '-0.01em', lineHeight: 1.2 }
  const h3: React.CSSProperties = { fontSize: '1rem', fontWeight: 600, color: '#15161A', margin: '1.75rem 0 0.5rem', letterSpacing: '0.02em' }
  const callout: React.CSSProperties = { background: 'var(--accent-tint)', border: '1px solid var(--accent-border)', borderRadius: 20, padding: '1.5rem', margin: '2rem 0' }
  const calloutDark: React.CSSProperties = { background: 'rgba(43,75,255,0.06)', border: '1px solid rgba(43,75,255,0.2)', padding: '1.75rem', margin: '2.5rem 0', borderRadius: 20 }

  return (
    <div className="dfy-public" style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--f-body)' }}>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        .stat-row { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; margin:2rem 0; }
        .stat-box { border-radius:20px; background:#ffffff; border:1px solid rgba(21,22,26,0.10); padding:1.25rem; text-align:center; }
        @media(max-width:600px) { .stat-row { grid-template-columns:1fr !important; } }
;
      `}</style>

      <Navbar />

      <article style={{ maxWidth: '740px', margin: '0 auto', padding: 'clamp(6.5rem,10vw,8rem) clamp(1.5rem,5vw,2.5rem) 6rem' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '12px', color: 'rgba(21,22,26,0.59)', marginBottom: '2rem', fontFamily: 'var(--f-body)', letterSpacing: '0.04em' }}>
          <Link href="/blog" style={{ color: 'rgba(21,22,26,0.59)', textDecoration: 'none' }}>Blog</Link>
          <span>→</span>
          <span>AI & Strategy</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid var(--accent-border)', padding: '3px 10px' }}>AI & Strategy</span>
            
            <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.59)' }}>·</span>
            <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.59)', letterSpacing: '0.04em' }}>7 min read</span>
          </div>
          <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.75rem,4vw,2.75rem)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.25rem', fontWeight: 400 }}>
            Why Most AI Implementations Fail (And How to Make Sure Yours Doesn't)
          </h1>
          <p style={{ fontSize: '18px', fontWeight: 500, color: 'rgba(21,22,26,0.75)', lineHeight: 1.7 }}>
            Companies are spending thousands on AI tools and getting almost nothing back. The problem isn't the technology — it's how it's being deployed. Here's what actually works.
          </p>
        </div>

        {/* Stats */}
        <div className="stat-row">
          {[
            { value: '80%', label: 'of AI projects fail to reach production' },
            { value: '$4.5T', label: 'projected AI market by 2030' },
            { value: '12%', label: 'of businesses report strong AI ROI' },
          ].map(s => (
            <div key={s.label} className="stat-box">
              <div style={{ fontFamily: 'var(--f-serif)', fontSize: '2rem', color: 'var(--accent)', marginBottom: '0.4rem' }}>{s.value}</div>
              <div style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.64)', lineHeight: 1.5, letterSpacing: '0.04em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Body */}
        <h2 style={h2}>The AI adoption paradox</h2>
        <p style={prose}>Everyone is using AI. And yet almost nobody is getting the results they expected.</p>
        <p style={prose}>McKinsey's 2025 State of AI report found that while AI adoption has nearly doubled in three years, only 12% of companies report strong ROI from their implementations. The rest are either still experimenting, or quietly shelving projects that never delivered.</p>
        <p style={prose}>This isn't a technology problem. The tools work. Claude, GPT-4, Gemini, Midjourney, ElevenLabs — these are genuinely powerful systems that can do extraordinary things. The failure almost always happens at the implementation layer, not the model layer.</p>

        <h2 style={h2}>The five reasons AI projects fail</h2>

        <h3 style={h3}>1. No clear problem being solved</h3>
        <p style={prose}>The most common failure mode is starting with the technology instead of the problem. "We need to be using AI" is not a strategy. It produces a lot of experimenting with tools, a few demos that impress in meetings, and almost no lasting change to how the business actually operates.</p>
        <p style={prose}>The companies that get real ROI start with a specific, expensive problem: "Our customer support team spends 60% of their time answering the same 20 questions." That's a problem with a measurable cost. AI can solve it. The ROI is calculable before you write a single line of code.</p>

        <h3 style={h3}>2. Over-reliance on off-the-shelf tools</h3>
        <p style={prose}>Every AI SaaS company right now is marketing their product as the solution to your specific problem. Most of them are general tools wearing a costume. A generic chatbot trained on nothing about your business will produce generic, often wrong responses that erode customer trust faster than no chatbot at all.</p>
        <p style={prose}>Effective AI implementation requires customization — feeding the right data, writing the right prompts, designing the right workflows. The tool is 20% of the work. The configuration is 80%.</p>

        <h3 style={h3}>3. No human in the loop</h3>
        <p style={prose}>AI systems fail silently and confidently. They'll produce wrong answers with the same tone as right ones. Businesses that deploy AI without a feedback loop — some mechanism to catch and correct errors — eventually create trust problems with customers or downstream data problems in their operations.</p>
        <p style={prose}>The best implementations treat AI as a first draft, not a final answer. A human reviews, corrects, and that feedback improves the system over time.</p>

        <h3 style={h3}>4. Poor integration with existing systems</h3>
        <p style={prose}>An AI tool that exists in isolation from your CRM, your email, your calendar, your support desk, does very little. The leverage comes from connecting AI to the actual data and workflows of your business. That requires integration work most teams aren't set up to do.</p>

        <h3 style={h3}>5. No ownership inside the business</h3>
        <p style={prose}>If AI is something the consultant set up and nobody on your team understands, it will break and not get fixed. Successful implementations include a knowledge transfer — someone internal who owns the system, can modify prompts, can troubleshoot issues, and can expand the scope as the business grows.</p>

        <div style={callout}>
          <p style={{ ...prose, margin: 0, color: 'rgba(21,22,26,0.89)' }}><strong style={{ color: '#15161A' }}>The pattern we see most:</strong> A business spends $15,000 on an AI consultant who builds something impressive, trains nobody, and leaves. Six months later the system is broken, nobody knows how to fix it, and the business concludes "AI doesn't work for us."</p>
        </div>

        <h2 style={h2}>What successful implementations look like</h2>
        <p style={prose}>After building AI systems across dozens of businesses, the successful ones share a few consistent traits:</p>

        <h3 style={h3}>They start with one workflow, not the whole company</h3>
        <p style={prose}>The temptation is to transform everything at once. The businesses that succeed pick one specific, high-frequency process — customer intake, content creation, lead qualification, support ticket routing — and make AI work there first. Once it's working and the team trusts it, they expand.</p>

        <h3 style={h3}>They measure before and after</h3>
        <p style={prose}>If you don't know how long something takes now, you can't know if AI made it faster. The best implementations start with a baseline: time spent, error rate, cost per output. They measure the same things after, and they have a clear number that justifies the investment.</p>

        <h3 style={h3}>They treat AI as a system, not a tool</h3>
        <p style={prose}>A tool is something you use when you remember to. A system runs whether you're paying attention or not. The difference is design: clear inputs, defined outputs, exception handling, regular review. This is the engineering that most "AI projects" skip.</p>

        <h3 style={h3}>They build for maintenance, not just launch</h3>
        <p style={prose}>AI models update. APIs change. Business needs evolve. The systems that keep delivering value six months later are the ones designed to be maintained — with documentation, clear ownership, and a plan for what happens when something breaks.</p>

        <h2 style={h2}>The honest truth about timeline</h2>
        <p style={prose}>A well-scoped AI implementation — one specific workflow, properly integrated, tested, and with a trained internal owner — takes two to four weeks to build and another two to four weeks before the team is running it confidently.</p>
        <p style={prose}>Anyone promising transformation in 48 hours is selling you a demo. Anyone promising six months before you see results has never built one of these systems before. The real timeline is four to eight weeks from first call to working, trusted system.</p>

        <div style={calloutDark}>
          <div style={{ fontFamily: 'var(--f-serif)', fontSize: '1.25rem', color: '#15161A', marginBottom: '0.5rem' }}>We build it. We train your team. We stay.</div>
          <p style={{ ...prose, color: 'rgba(21,22,26,0.75)', margin: '0 0 1.25rem' }}>Every implementation includes knowledge transfer and ongoing support. Your team owns it — we just make sure it keeps working.</p>
          <Link href="/#contact" style={{ display: 'inline-block', fontFamily: 'var(--f-body)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', background: 'var(--accent)', borderRadius: 999, color: '#fff', padding: '0.875rem 1.75rem', textDecoration: 'none' }}>
            Book a free strategy call →
          </Link>
        </div>

        <h2 style={h2}>The bottom line</h2>
        <p style={prose}>AI works. But "AI works" is not the same as "any AI deployment you attempt will work." The gap between the two is strategy, integration, and ownership — and that gap is exactly where most implementations die.</p>
        <p style={prose}>The businesses winning with AI right now aren't necessarily the most technically sophisticated. They're the ones who identified a real problem, built a system that solves it, and made sure someone on their team actually runs it.</p>
        <p style={prose}>That's a much shorter list than the number of companies that bought the tools.</p>

        {/* CTA */}
        <div style={{ background: '#ffffff', border: '1px solid rgba(21,22,26,0.10)', borderRadius: 20, padding: '2.5rem', marginTop: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--f-serif)', fontSize: '1.75rem', fontWeight: 400, color: '#15161A', marginBottom: '0.75rem' }}>Ready to implement AI that actually works?</h2>
          <p style={{ ...prose, maxWidth: '42ch', margin: '0 auto 1.75rem', color: 'rgba(21,22,26,0.67)' }}>Book a free 30-minute strategy call. We'll show you exactly where AI moves the needle in your business.</p>
          <Link href="/#contact" style={{ display: 'inline-block', fontFamily: 'var(--f-body)', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', background: 'var(--accent)', borderRadius: 999, color: '#fff', padding: '1rem 2.5rem', textDecoration: 'none' }}>
            Book a Free Strategy Call →
          </Link>
          <div style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.56)', marginTop: '0.75rem', letterSpacing: '0.04em' }}>No commitment · 30 minutes · Results-focused</div>
        </div>

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(21,22,26,0.10)' }}>
          <Link href="/blog" style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'var(--accent)', textDecoration: 'none', letterSpacing: '0.04em' }}>← Back to blog</Link>
        </div>

      </article>

      <footer style={{ borderTop: '1px solid rgba(21,22,26,0.10)', padding: '2rem clamp(1.5rem,5vw,3rem)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.56)', letterSpacing: '0.04em' }}>© 2026 DoneForYouAI.com · HONNYDO LLC</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[['Privacy', '/privacy'], ['Terms', '/terms']].map(([label, href]) => (
            <Link key={label} href={href} style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'rgba(21,22,26,0.56)', textDecoration: 'none', letterSpacing: '0.04em' }}>{label}</Link>
          ))}
        </div>
      </footer>
    </div>
  )
}
'@ }
$files += @{ Path = 'src\app\components\Audience.tsx'; Content = @'
'use client'
const audiences = [
  { label: 'Agency Owners' },
  { label: 'E-Commerce Brands' },
  { label: 'Service Businesses' },
  { label: 'Consultants & Coaches' },
  { label: 'B2B Companies' },
  { label: 'Real Estate Professionals' },
  { label: 'Healthcare Practices' },
  { label: 'Professional Services' },
  { label: 'SaaS Startups' },
  { label: 'Local Businesses' },
  { label: 'Handmade Businesses' },
  { label: 'Small Businesses' },
  { label: 'Coaches & Course Creators' },
  { label: 'Restaurants & Hospitality' },
  { label: 'Content Creators' },
  { label: 'Financial Advisors' },
  { label: 'HR & Recruiting Firms' },
  { label: 'Marketing Agencies' },
]
export default function Audience() {
  return (
    <section style={{ background: 'var(--bg)', padding: '0 2rem 7rem', textAlign: 'center' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: '2.75rem' }}>
          <span className="dfy-eyebrow" style={{ color: 'var(--accent)' }}>Who we work with</span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', lineHeight: 1.04, color: 'var(--text)', margin: '1rem auto 0', maxWidth: '20ch' }}>
            Moving your business{' '}
            <em style={{ color: 'var(--accent)' }}>forward with AI.</em>
          </h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
          {audiences.map((a) => (
            <span key={a.label} className="dfy-pill">{a.label}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

'@ }
$files += @{ Path = 'src\app\components\CTA.tsx'; Content = @'
'use client'

export default function CTA() {
  return (
    <section style={{
      background: 'var(--bg)',
      padding: '0 2rem 7rem',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', boxSizing: 'border-box',
        background: 'var(--text)',
        borderRadius: 36,
        padding: 'clamp(3.5rem, 8vw, 6rem) 2rem',
        textAlign: 'center',
      }}>
        <span className="dfy-eyebrow" style={{ color: '#C9CCD8', marginBottom: '1.25rem' }}>Ready to start?</span>

        <h2 style={{
          fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
          lineHeight: 1.04,
          color: '#ffffff',
          maxWidth: '16ch', margin: '1rem auto 1.5rem',
        }}>
          Stop experimenting.{' '}
          Start{' '}
          <em style={{ color: '#BFC9FF' }}>executing.</em>
        </h2>

        <p style={{
          fontFamily: 'var(--f-body)', fontSize: '1.1rem',
          color: '#D4D6E0',
          maxWidth: '36rem', margin: '0 auto 2.5rem', lineHeight: 1.6,
        }}>
          Book a free 30-minute strategy call. We'll show you exactly
          where AI moves the needle in your business — no fluff, no pitch.
        </p>

        <button
          className="dfy-btn dfy-btn-light"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Book Your Free Strategy Call
        </button>

        <p style={{
          fontFamily: 'var(--f-body)', fontSize: '0.88rem',
          color: '#B9BCC9',
          marginTop: '1.5rem',
        }}>
          No commitment required · 30 minutes · Results-focused
        </p>
      </div>
    </section>
  )
}

'@ }
$files += @{ Path = 'src\app\components\Contact.tsx'; Content = @'
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', service: '' })
  const [status, setStatus] = useState<Status>('idle')

  const services = [
    'AI Automation & Workflows',
    'Custom AI Assistants & Chatbots',
    'AI Content Systems',
    'AI-Powered Lead Generation',
    'Done-For-You AI Tool Stack',
    'AI Strategy & Prompting Playbook',
    "Not sure yet — let's talk",
  ]

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return
    setStatus('loading')
    try {
      const { error } = await supabase.from('leads').insert({
        name:       form.name,
        email:      form.email,
        company:    form.company || null,
        service:    form.service || null,
        message:    form.message,
        source:     'homepage_contact',
        status:     'new',
        created_at: new Date().toISOString(),
      })
      if (error) throw error
      setStatus('success')
      setForm({ name: '', email: '', company: '', message: '', service: '' })
    } catch (e) {
      console.error('Contact form error:', e)
      setStatus('error')
    }
  }

  return (
    <section id="contact" style={{
      background: 'var(--bg)',
      color: 'var(--text)',
      padding: '0 2rem 7rem',
    }}>
      <div id="contact-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>

        {/* Left */}
        <div>
          <span className="dfy-eyebrow" style={{ color: 'var(--accent)' }}>Get Started</span>

          <h2 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
            lineHeight: 1.04, margin: '1rem 0 1.25rem',
            color: 'var(--text)',
          }}>
            Let's build something{' '}
            <em style={{ color: 'var(--accent)' }}>that actually works.</em>
          </h2>

          <p style={{
            fontFamily: 'var(--f-body)', fontSize: '1.1rem',
            color: 'var(--text-2)', lineHeight: 1.65, marginBottom: '2.25rem', maxWidth: '30rem',
          }}>
            Tell us about your business and what you're trying to solve.
            We'll come back within 24 hours with a clear plan — no pressure, no pitch deck.
          </p>

          <div style={{ borderTop: '1px solid var(--line-2)', maxWidth: '30rem' }}>
            {[
              { label: 'Response time', value: 'Within 24 hours' },
              { label: 'First call',    value: '30-min strategy session' },
              { label: 'Commitment',   value: 'None required upfront' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', gap: '1rem',
                padding: '1.1rem 0',
                borderBottom: '1px solid var(--line-2)',
              }}>
                <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.98rem', color: 'var(--text-3)' }}>{item.label}</span>
                <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.98rem', fontWeight: 600, color: 'var(--text)', textAlign: 'right' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div>
          {status === 'success' ? (
            <div style={{ border: '1px solid var(--line)', borderRadius: 28, padding: '3rem 2rem', textAlign: 'center', background: 'var(--surface)', boxShadow: '0 30px 60px rgba(21,22,26,0.08)' }}>
              <div style={{
                width: 56, height: 56,
                background: 'var(--accent-tint)', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.5rem', color: 'var(--accent)', fontSize: '1.4rem', fontWeight: 600,
              }}>✓</div>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', color: 'var(--text)' }}>Message received.</h3>
              <p style={{ fontFamily: 'var(--f-body)', fontSize: '1rem', color: 'var(--text-2)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                We'll be back in touch within 24 hours. Check your inbox.
              </p>
              <button className="dfy-btn dfy-btn-ghost" onClick={() => setStatus('idle')} style={{ minHeight: 44 }}>
                Send another →
              </button>
            </div>
          ) : (
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '1.25rem',
              padding: '2.25rem', borderRadius: 28,
              background: 'var(--surface)', border: '1px solid var(--line)',
              boxShadow: '0 30px 60px rgba(21,22,26,0.08)',
            }}>

              <div id="contact-name-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <label className="dfy-label" htmlFor="contact-name">Name *</label>
                  <input id="contact-name" className="dfy-field" type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                </div>
                <div>
                  <label className="dfy-label" htmlFor="contact-company">Company</label>
                  <input id="contact-company" className="dfy-field" type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Your company" />
                </div>
              </div>

              <div>
                <label className="dfy-label" htmlFor="contact-email">Email *</label>
                <input id="contact-email" className="dfy-field" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
              </div>

              <div>
                <label className="dfy-label" htmlFor="contact-service">I'm interested in</label>
                <select id="contact-service" className="dfy-field" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                  style={{ cursor: 'pointer' }}
                >
                  <option value="">Select a service...</option>
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="dfy-label" htmlFor="contact-message">Tell us about your business *</label>
                <textarea
                  id="contact-message"
                  className="dfy-field"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="What does your business do, and what are you hoping AI can solve for you?"
                  rows={5}
                  style={{ resize: 'vertical', minHeight: '130px' }}
                />
              </div>

              <button
                className="dfy-btn dfy-btn-primary"
                onClick={handleSubmit}
                disabled={status === 'loading'}
                style={{ width: '100%' }}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message →'}
              </button>

              {status === 'error' && (
                <p style={{ fontFamily: 'var(--f-body)', fontSize: '0.9rem', color: '#B42318' }}>
                  Something went wrong. Email us at{' '}
                  <span style={{ color: '#B42318', fontWeight: 600 }}>hire@doneforyouai.com</span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
        @media (max-width: 680px) {
          #contact { padding: 0 1.25rem 4rem !important; }
          #contact-name-row { grid-template-columns: 1fr !important; gap: 1.25rem !important; }
          #contact-grid > div:last-child > div { padding: 1.5rem !important; }
        }
      `}</style>
    </section>
  )
}

'@ }
$files += @{ Path = 'src\app\components\Footer.tsx'; Content = @'
'use client'

export default function Footer() {
  const scrollToContact = () => {
    const contact = document.getElementById('contact')
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--f-body)',
    fontSize: '0.88rem',
    color: 'var(--text-2)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  }

  const btnStyle: React.CSSProperties = {
    fontFamily: 'var(--f-body)',
    fontSize: '0.88rem',
    color: 'var(--text-2)',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    transition: 'color 0.2s',
  }

  const hoverOn = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = 'var(--accent)'
  }

  const hoverOff = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = 'var(--text-2)'
  }

  return (
    <footer style={{
      background: 'var(--bg)',
      borderTop: '1px solid var(--line-2)',
      padding: '2.25rem 2rem',
    }}>
      <div className="footer-grid" style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: '2rem',
      }}>

        {/* Logo */}
        <div style={{
          fontFamily: 'var(--f-display)',
          fontWeight: 700,
          fontSize: '1.05rem',
          letterSpacing: '-0.02em',
          color: 'var(--text)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 30, height: 30, borderRadius: 9,
            background: 'var(--text)', color: '#fff', fontSize: '0.9rem',
          }}>D</span>
          DoneForYouAI
        </div>

        {/* Center copyright */}
        <span style={{
          fontFamily: 'var(--f-body)',
          fontSize: '0.85rem',
          color: 'var(--text-3)',
          textAlign: 'center',
        }}>
          © 2026 DoneForYouAI.com · All rights reserved
        </span>

        {/* Right links */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="/privacy" style={linkStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
            Privacy
          </a>
          <a href="/terms" style={linkStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
            Terms
          </a>
          <button onClick={scrollToContact} style={btnStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
            hire@doneforyouai.com
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .footer-grid { grid-template-columns: 1fr !important; text-align: center !important; gap: 1rem !important; justify-items: center; }
          .footer-grid > div:last-child { justify-content: center !important; }
        }
      `}</style>
    </footer>
  )
}

'@ }
$files += @{ Path = 'src\app\components\Hero.tsx'; Content = @'
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const MUX_PLAYBACK_ID = process.env.NEXT_PUBLIC_HERO_MUX_PLAYBACK_ID || ''

const projects = [
  { id: 1,  name: 'DoneForYouAI.com',         url: 'doneforyouai.com',         href: 'https://doneforyouai.com',         tag: 'AI Services',          screenshot: '/screenshots/doneforyouai.png',         light: false },
  { id: 2,  name: 'AINewsClips.com',           url: 'ainewsclips.com',          href: 'https://ainewsclips.com',          tag: 'Media',                screenshot: '/screenshots/ainewsclips.png',          light: false },
  { id: 3,  name: 'LiveReselling.com',         url: 'livereselling.com',        href: 'https://livereselling.com',        tag: 'Live Commerce',        screenshot: '/screenshots/livereselling.png',        light: true  },
  { id: 4,  name: 'UGCAffiliates.com',         url: 'ugcaffiliates.com',        href: 'https://ugcaffiliates.com',        tag: 'Marketplace',          screenshot: '/screenshots/ugcaffiliates.png',        light: true  },
  { id: 5,  name: 'AIPrintOnDemand.com',       url: 'aiprintondemand.com',      href: 'https://aiprintondemand.com',      tag: 'AI + E-commerce',      screenshot: '/screenshots/aipod.png',                light: true  },
  { id: 6,  name: 'VintageGarageSale.com',     url: 'vintagegaragesale.com',    href: 'https://vintagegaragesale.com',    tag: 'Marketplace',          screenshot: '/screenshots/vintagegaragesale.png',    light: false },
  { id: 7,  name: 'AIDigitalProducts.com',     url: 'aidigitalproducts.com',    href: 'https://aidigitalproducts.com',    tag: 'Digital Marketplace',  screenshot: '/screenshots/aidigitalproducts.png',    light: true  },
  { id: 8,  name: 'HomeServiceAgents.com',     url: 'homeserviceagents.com',    href: 'https://homeserviceagents.com',    tag: 'AI + Home Services',   screenshot: '/screenshots/homeserviceagents.png',    light: true  },
  { id: 9,  name: 'FreeAIReceptionist.com',    url: 'freeaireceptionist.com',   href: 'https://freeaireceptionist.com',   tag: 'Voice AI',             screenshot: '/screenshots/freeaireceptionist.png',   light: true  },
  { id: 10, name: 'HireAIReceptionist.com',    url: 'hireaireceptionist.com',   href: 'https://hireaireceptionist.com',   tag: 'Business Automation',  screenshot: '/screenshots/hireaireceptionist.webp',   light: false },
]

const CLONES = 3
const total  = projects.length
const cloned = [...projects.slice(total - CLONES), ...projects, ...projects.slice(0, CLONES)]
const OFFSET = CLONES

function HeroCarousel() {
  const [index,    setIndex]    = useState(OFFSET)
  const [animated, setAnimated] = useState(true)
  const [slideW,   setSlideW]   = useState(0)
  const [dragDelta, setDragDelta] = useState(0)

  const dragStartRef  = useRef<number | null>(null)
  const dragDeltaRef  = useRef(0)
  const isDraggingRef = useRef(false)
  const autoRef       = useRef<ReturnType<typeof setInterval> | null>(null)
  const jumpRef       = useRef(false)
  const viewportRef   = useRef<HTMLDivElement>(null)

  const realIndex = ((index - OFFSET) % total + total) % total

  useEffect(() => {
    const measure = () => {
      if (viewportRef.current) setSlideW(viewportRef.current.offsetWidth)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (viewportRef.current) ro.observe(viewportRef.current)
    return () => ro.disconnect()
  }, [])

  const goTo = useCallback((i: number, anim = true) => {
    setAnimated(anim); setIndex(i)
  }, [])

  useEffect(() => {
    if (!animated) return
    const t = setTimeout(() => {
      if (index >= total + OFFSET)  { jumpRef.current = true; goTo(index - total, false) }
      else if (index < OFFSET)      { jumpRef.current = true; goTo(index + total, false) }
    }, 420)
    return () => clearTimeout(t)
  }, [index, animated, goTo])

  useEffect(() => {
    if (!animated && jumpRef.current) {
      const t = setTimeout(() => { setAnimated(true); jumpRef.current = false }, 20)
      return () => clearTimeout(t)
    }
  }, [animated])

  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => { setIndex(i => i + 1); setAnimated(true) }, 3500)
  }, [])

  useEffect(() => {
    resetAuto()
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [resetAuto])

  const handlePrev = () => { goTo(index - 1); resetAuto() }
  const handleNext = () => { goTo(index + 1); resetAuto() }

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    dragStartRef.current  = e.clientX
    dragDeltaRef.current  = 0
    isDraggingRef.current = false
    setDragDelta(0)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartRef.current === null) return
    const d = e.clientX - dragStartRef.current
    dragDeltaRef.current = d
    if (Math.abs(d) > 8) isDraggingRef.current = true
    setDragDelta(d)
  }
  const onPointerUp = () => {
    if (dragStartRef.current === null) return
    const delta = dragDeltaRef.current
    if (delta < -50) handleNext()
    else if (delta > 50) handlePrev()
    dragStartRef.current  = null
    dragDeltaRef.current  = 0
    isDraggingRef.current = false
    setDragDelta(0)
  }

  const p = cloned[index]

  const offsetPx = slideW > 0 ? -(index * slideW) + dragDelta : 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <span style={{
            fontFamily: 'var(--f-body)', fontSize: '0.8rem', fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--accent)', display: 'block', marginBottom: '0.3rem',
          }}>My Latest Work</span>
          <span style={{
            fontFamily: 'var(--f-body)', fontSize: '0.8rem', fontWeight: 500,
            color: 'var(--text-3)', letterSpacing: '0.04em',
          }}>{String(realIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[{ fn: handlePrev, label: '←' }, { fn: handleNext, label: '→' }].map(({ fn, label }) => (
            <button key={label} onClick={fn} style={{
              fontFamily: 'var(--f-body)', fontSize: '1rem', background: 'transparent',
              border: '1.5px solid rgba(21,22,26,0.25)', color: 'var(--text)',
              width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', cursor: 'pointer', transition: 'border-color 0.2s', flexShrink: 0,
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(21,22,26,0.25)'}
            >{label}</button>
          ))}
        </div>
      </div>

      {/* Viewport */}
      <div
        ref={viewportRef}
        style={{ flex: 1, overflow: 'hidden', position: 'relative', cursor: dragDelta !== 0 ? 'grabbing' : 'grab', userSelect: 'none', minHeight: 0 }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {slideW > 0 && (
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            width: `${slideW * cloned.length}px`,
            height: '100%',
            transform: `translate3d(${offsetPx}px, 0, 0)`,
            transition: animated ? 'transform 0.4s cubic-bezier(0.22,1,0.36,1)' : 'none',
            willChange: 'transform',
          }}>
            {cloned.map((proj, i) => {
              const isActive = i === index
              return (
                <div
                  key={i}
                  style={{
                    width: `${slideW}px`,
                    flexShrink: 0,
                    flexGrow: 0,
                    height: '100%',
                    padding: '0 4px',
                    boxSizing: 'border-box',
                  }}
                >
                  <a
                    href={proj.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => { if (isDraggingRef.current || Math.abs(dragDeltaRef.current) > 8) e.preventDefault() }}
                    style={{ display: 'block', textDecoration: 'none', height: '100%' }}
                  >
                    <div style={{
                      borderRadius: '20px', overflow: 'hidden',
                      border: isActive ? '1.5px solid rgba(43,75,255,0.45)' : '1px solid var(--line)',
                      boxShadow: isActive ? '0 24px 50px rgba(21,22,26,0.14)' : '0 2px 12px rgba(21,22,26,0.05)',
                      transition: 'box-shadow 0.4s, border-color 0.4s',
                      height: '100%', display: 'flex', flexDirection: 'column',
                    }}>
                      {/* Browser chrome */}
                      <div style={{ height: 30, background: '#222', display: 'flex', alignItems: 'center', padding: '0 10px', gap: '5px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57', flexShrink: 0 }} />
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e', flexShrink: 0 }} />
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840', flexShrink: 0 }} />
                        <div style={{ flex: 1, height: 16, background: '#333', borderRadius: 3, margin: '0 6px', display: 'flex', alignItems: 'center', paddingLeft: 7, fontFamily: 'monospace', fontSize: '0.52rem', color: '#666', overflow: 'hidden', whiteSpace: 'nowrap' }}>{proj.url}</div>
                      </div>
                      {/* Screenshot */}
                      <div style={{ flex: 1, background: proj.light ? '#f0f0f0' : '#1a1a1a', overflow: 'hidden', minHeight: 0 }}>
                        <img
                          src={proj.screenshot} alt={proj.name} draggable={false}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', filter: isActive ? 'none' : 'brightness(0.65) saturate(0.6)', transition: 'filter 0.4s' }}
                          onError={e => {
                            const el = e.currentTarget.parentElement!
                            e.currentTarget.style.display = 'none'
                            el.style.display = 'flex'; el.style.alignItems = 'center'; el.style.justifyContent = 'center'
                            el.innerHTML = `<span style="font-family:monospace;font-size:0.6rem;color:rgba(255,255,255,0.25);letter-spacing:0.1em;text-transform:uppercase">${proj.url}</span>`
                          }}
                        />
                      </div>
                    </div>
                  </a>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Name + tag + dots */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--f-display)', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text)' }}>{p.name}</span>
          <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.02em', color: 'var(--accent)', borderRadius: 999, padding: '0.25rem 0.75rem', flexShrink: 0, background: 'var(--accent-tint)' }}>{p.tag}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          {projects.map((_, i) => (
            <button key={i} onClick={() => { goTo(i + OFFSET); resetAuto() }}
              style={{ width: i === realIndex ? 22 : 6, height: 6, borderRadius: 3, background: i === realIndex ? 'var(--accent)' : 'rgba(21,22,26,0.18)', border: 'none', padding: 0, cursor: 'pointer', transition: 'all 0.3s' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      gap: '4rem',
      padding: '130px max(2rem, calc((100vw - 1200px) / 2)) 90px',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--bg)',
    }}>

      {/* Left */}
      <div className="hero-left" style={{ position: 'relative', zIndex: 1, minWidth: 0 }}>
        <div className="animate-fade-up delay-1 dfy-eyebrow" style={{
          padding: '0.55rem 0.95rem', borderRadius: 999,
          background: 'var(--surface)', border: '1px solid var(--line)',
          marginBottom: '1.75rem', width: 'fit-content',
        }}>
          <span style={{ width: 8, height: 8, background: 'var(--accent)', borderRadius: '50%', animation: 'pulse-dot 2s infinite' }} />
          AI Implementation Partner
        </div>

        <h1 className="animate-fade-up delay-2" style={{
          fontSize: 'clamp(3rem, 6vw, 5.75rem)',
          lineHeight: 1,
          color: 'var(--text)',
        }}>
          Your business.<br />
          <em style={{ color: 'var(--accent)' }}>Powered by AI.</em><br />
          Done for you.
        </h1>

        <p className="animate-fade-up delay-3" style={{
          marginTop: '1.75rem', fontSize: '1.15rem',
          color: 'var(--text-2)', lineHeight: 1.6, maxWidth: '34rem',
        }}>
          We build and deploy custom AI systems inside your business — automations, assistants, content engines, and more. You stay focused on running the show.
        </p>

        <div className="animate-fade-up delay-4" style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <button
            className="dfy-btn dfy-btn-primary"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >Book a Free Strategy Call</button>
          <button
            className="dfy-btn dfy-btn-ghost"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >See Services <span>↓</span></button>
        </div>
      </div>

      {/* Right — carousel */}
      <div className="animate-fade-in delay-5 hero-right" style={{
        position: 'relative', zIndex: 1, minWidth: 0,
        alignSelf: 'stretch', display: 'flex',
        flexDirection: 'column', justifyContent: 'center',
        paddingTop: '1rem', paddingBottom: '1rem',
      }}>
        <div className="carousel-height-box" style={{
          background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 32,
          padding: '1.5rem', boxShadow: '0 30px 60px rgba(21,22,26,0.08)',
        }}>
          <HeroCarousel />
        </div>
      </div>

      <style>{`
        .carousel-height-box {
          height: 72vh;
          min-height: 480px;
          max-height: 700px;
        }

        @media (max-width: 900px) {
          section {
            grid-template-columns: 1fr !important;
            padding: 120px 1.5rem 60px 1.5rem !important;
            gap: 2.5rem !important;
            align-items: start !important;
          }
          .hero-left {
            padding-top: 1rem;
          }
          .hero-right {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          .carousel-height-box {
            height: 95vw !important;
            min-height: 340px !important;
            max-height: 520px !important;
            padding: 1rem !important;
          }
        }
      `}</style>
    </section>
  )
}

'@ }
$files += @{ Path = 'src\app\components\Navbar.tsx'; Content = @'
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

/* Experts link removed from nav */
const NAV_LINKS = [
  { label: 'Services', href: '/#services' },
  { label: 'Process',  href: '/#process'  },
  { label: 'My Work', href: '/work'       },
  { label: 'Blog',     href: '/blog'       },
  { label: 'Contact',  href: '/#contact'  },
]

const TIERS = [
  { value: 'basic',     label: 'Basic',       price: '$499/mo',  perks: ['Listed profile', 'No leads routed'] },
  { value: 'pro',       label: 'Pro',         price: '$649/mo', perks: ['Leads routed', 'Priority placement'] },
  { value: 'pro_video', label: 'Pro + Video', price: '$1499/mo', perks: ['Everything in Pro', 'Video profile'] },
]

function ApplyModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [form, setForm]       = useState({ name: '', email: '', website: '', skills: '', message: '', tier: 'pro' })

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleSubmit = async () => {
    if (!form.name || !form.email) return
    setLoading(true)
    setError('')
    try {
      const res  = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error || 'Failed to start checkout')
      window.location.href = data.url
    } catch (e: any) {
      setError(e.message || 'Something went wrong.')
      setLoading(false)
    }
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--f-body)', fontSize: '0.8rem', fontWeight: 600,
    color: 'var(--text)', display: 'block', marginBottom: '0.4rem',
  }

  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose() }} style={{ position: 'fixed', inset: 0, background: 'rgba(21,22,26,0.55)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.25rem', backdropFilter: 'blur(8px)' }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 28, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 40px 80px rgba(21,22,26,0.25)' }}>
        <div style={{ padding: '1.75rem 1.75rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span className="dfy-eyebrow" style={{ color: 'var(--accent)', display: 'block', marginBottom: '0.5rem' }}>Join the network</span>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--text)', margin: 0, lineHeight: 1.1 }}>Apply as an Expert</h3>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ background: 'var(--bg)', border: 'none', color: 'var(--text-2)', cursor: 'pointer', fontSize: '1rem', width: 40, height: 40, borderRadius: '50%', lineHeight: 1 }}>✕</button>
        </div>
        <div style={{ padding: '0 1.75rem 1.75rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Choose your plan</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {TIERS.map(t => (
                <div key={t.value} onClick={() => setForm(f => ({ ...f, tier: t.value }))} style={{ border: `1.5px solid ${form.tier === t.value ? 'var(--accent)' : 'var(--line-2)'}`, borderRadius: 16, padding: '0.9rem 0.7rem', cursor: 'pointer', background: form.tier === t.value ? 'var(--accent-tint)' : '#fff', transition: 'all 0.15s' }}>
                  <div style={{ fontFamily: 'var(--f-body)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.2rem' }}>{t.label}</div>
                  <div style={{ fontFamily: 'var(--f-body)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem' }}>{t.price}</div>
                  {t.perks.map(p => <div key={p} style={{ fontFamily: 'var(--f-body)', fontSize: '0.7rem', color: 'var(--text-3)', lineHeight: 1.5 }}>· {p}</div>)}
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--f-body)', fontSize: '0.72rem', color: 'var(--text-3)', marginTop: '0.6rem' }}>Video profile is exclusive to Pro + Video tier.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Name *</label>
                <input className="dfy-field" type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" />
              </div>
              <div>
                <label style={labelStyle}>Email *</label>
                <input className="dfy-field" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com" />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Website / LinkedIn</label>
              <input className="dfy-field" type="text" value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} placeholder="https://..." />
            </div>
            <div>
              <label style={labelStyle}>Your AI specialties</label>
              <input className="dfy-field" type="text" value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))} placeholder="e.g. Zapier, Claude, Voiceflow..." />
            </div>
            <div>
              <label style={labelStyle}>Tell us about your work</label>
              <textarea className="dfy-field" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="What kind of AI systems have you built?" rows={4} style={{ resize: 'vertical', minHeight: '96px' }} />
            </div>
            {error && <p style={{ fontFamily: 'var(--f-body)', fontSize: '0.8rem', color: '#B42318', padding: '0.7rem 1rem', border: '1px solid rgba(180,35,24,0.3)', background: 'rgba(180,35,24,0.06)', borderRadius: 12, margin: 0 }}>{error}</p>}
            <button className="dfy-btn dfy-btn-primary" onClick={handleSubmit} disabled={loading || !form.name || !form.email} style={{ width: '100%' }}>
              {loading ? 'Redirecting to checkout...' : 'Continue to Payment →'}
            </button>
            <p style={{ fontFamily: 'var(--f-body)', fontSize: '0.72rem', color: 'var(--text-3)', textAlign: 'center', lineHeight: 1.6, margin: 0 }}>Secure checkout via Stripe · Cancel anytime</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Navbar() {
  const router   = useRouter()
  const pathname = usePathname()
  const [scrolled,      setScrolled]      = useState(false)
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [applyOpen,     setApplyOpen]     = useState(false)
  const [session,       setSession]       = useState<any>(null)
  const [sessionLoaded, setSessionLoaded] = useState(false)
  const [isAdmin,       setIsAdmin]       = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setIsAdmin(session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL)
      setSessionLoaded(true)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session)
      setIsAdmin(session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!applyOpen) document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen, applyOpen])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const openApply = () => { setMenuOpen(false); setApplyOpen(true) }

  const handleBookCall = () => {
    setMenuOpen(false)
    if (window.location.pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/#contact'
    }
  }

  const handleSignOut = async () => {
    setMenuOpen(false)
    await supabase.auth.signOut()
    router.push('/')
  }

  const dashboardHref = isAdmin ? '/admin' : '/dashboard'

  const isActive = (href: string) => href === '/blog' ? pathname.startsWith('/blog') : href === '/work' ? pathname.startsWith('/work') : false

  const linkStyle = (href: string): React.CSSProperties => ({
    fontFamily: 'var(--f-body)', fontSize: '0.92rem', fontWeight: 500,
    color: isActive(href) ? 'var(--accent)' : 'var(--text-2)',
    textDecoration: 'none', transition: 'color 0.2s',
  })

  const smallBtn: React.CSSProperties = { minHeight: 42, padding: '0 20px', fontSize: '0.88rem' }

  return (
    <>
      {applyOpen && <ApplyModal onClose={() => setApplyOpen(false)} />}

      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, padding: '14px 24px 0', pointerEvents: 'none' }}>
        <nav aria-label="Main" style={{
          pointerEvents: 'auto',
          maxWidth: 1200, margin: '0 auto', boxSizing: 'border-box',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
          padding: '8px 8px 8px 22px', minHeight: 60,
          borderRadius: 999,
          background: scrolled ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.78)',
          border: '1px solid var(--line)',
          boxShadow: scrolled ? '0 10px 30px rgba(21,22,26,0.10)' : '0 6px 24px rgba(21,22,26,0.05)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          transition: 'box-shadow 0.3s, background 0.3s',
        }}>

          <Link href="/" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', color: 'var(--text)', textDecoration: 'none' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 10, background: 'var(--text)', color: '#fff', fontSize: '0.95rem' }}>D</span>
            DFYAI
          </Link>

          <ul className="nav-links-desktop" style={{ display: 'flex', gap: '1.75rem', listStyle: 'none', margin: 0, padding: 0 }}>
            {NAV_LINKS.map(item => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  style={linkStyle(item.href)}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                  onMouseLeave={e => e.currentTarget.style.color = isActive(item.href) ? 'var(--accent)' : 'var(--text-2)'}
                >{item.label}</Link>
              </li>
            ))}
          </ul>

          <div className="nav-cta-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {sessionLoaded && (
              session ? (
                <>
                  <Link href={dashboardHref} style={{ ...linkStyle(''), padding: '0 12px' }}>
                    {isAdmin ? 'Admin' : 'Dashboard'}
                  </Link>
                  <button className="dfy-btn dfy-btn-ghost" onClick={handleSignOut} style={smallBtn}>Log Out</button>
                </>
              ) : (
                <>
                  <button onClick={openApply} style={{ ...linkStyle(''), background: 'transparent', border: 'none', cursor: 'pointer', padding: '0 12px', color: 'var(--accent)', fontWeight: 600 }}>Join as Expert</button>
                  <Link href="/login" className="dfy-btn dfy-btn-ghost" style={smallBtn}>Sign In</Link>
                </>
              )
            )}
            <button className="dfy-btn dfy-btn-primary" onClick={handleBookCall} style={smallBtn}>Book a Call</button>
          </div>

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}
            style={{ display: 'none', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '5px', background: 'var(--bg)', border: 'none', cursor: 'pointer', width: 44, height: 44, borderRadius: '50%', zIndex: 300 }}
          >
            <span style={{ display: 'block', width: '18px', height: '2px', background: 'var(--text)', transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none', transition: 'transform 0.25s' }} />
            <span style={{ display: 'block', width: '18px', height: '2px', background: 'var(--text)', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.25s' }} />
            <span style={{ display: 'block', width: '18px', height: '2px', background: 'var(--text)', transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none', transition: 'transform 0.25s' }} />
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'var(--bg)',
        zIndex: 190, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '1.5rem',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
        visibility: menuOpen ? 'visible' : 'hidden',
      }}>
        {NAV_LINKS.map(item => (
          <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)} style={{ fontFamily: 'var(--f-display)', fontSize: '1.8rem', fontWeight: 600, letterSpacing: '-0.02em', color: isActive(item.href) ? 'var(--accent)' : 'var(--text)', textDecoration: 'none' }}>
            {item.label}
          </Link>
        ))}

        <div style={{ width: 40, height: 1, background: 'var(--line-2)' }} />

        {sessionLoaded && (
          session ? (
            <>
              <Link href={dashboardHref} onClick={() => setMenuOpen(false)} style={{ fontFamily: 'var(--f-body)', fontSize: '1rem', fontWeight: 500, color: 'var(--text-2)', textDecoration: 'none' }}>
                {isAdmin ? 'Admin Panel' : 'My Dashboard'}
              </Link>
              <button className="dfy-btn dfy-btn-ghost" onClick={handleSignOut}>Log Out</button>
            </>
          ) : (
            <>
              <button onClick={openApply} style={{ fontFamily: 'var(--f-body)', fontSize: '1rem', fontWeight: 600, color: 'var(--accent)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                Join as Expert
              </button>
              <Link href="/login" onClick={() => setMenuOpen(false)} className="dfy-btn dfy-btn-ghost">
                Sign In
              </Link>
            </>
          )
        )}

        <button className="dfy-btn dfy-btn-primary" onClick={handleBookCall}>
          Book a Call
        </button>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta-desktop   { display: none !important; }
          .hamburger         { display: flex !important; }
        }
        @media (max-width: 680px) {
          nav[aria-label="Main"] { padding-left: 16px !important; }
        }
      `}</style>
    </>
  )
}

'@ }
$files += @{ Path = 'src\app\components\Problem.tsx'; Content = @'
'use client'

export default function Problem() {
  return (
    <section className="problem-section" style={{
      background: 'var(--bg)',
      color: 'var(--text)',
      padding: '3rem 2rem 7rem',
    }}>
      <div className="problem-grid" style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '5rem',
        alignItems: 'start',
      }}>
        <div>
          <span className="dfy-eyebrow" style={{ color: 'var(--accent)', marginBottom: '1.25rem' }}>The Reality</span>
          <h2 style={{
            fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
            lineHeight: 1.06,
            color: 'var(--text)',
            marginTop: '1rem',
          }}>
            Most businesses know AI matters.{' '}
            <em style={{ color: 'var(--accent)' }}>Few know how to make it actually work.</em>
          </h2>
        </div>
        <div style={{
          fontFamily: 'var(--f-body)',
          fontSize: '1.2rem',
          lineHeight: 1.65,
          color: 'var(--text)',
          paddingTop: '0.5rem',
        }}>
          <p>
            You've seen what AI can do. You know your competitors are moving faster.
            But between <em style={{ color: 'var(--accent)' }}>understanding the tools</em> and
            actually implementing them inside a real, running business — there's a gap most companies never close.
          </p>
          <p style={{ marginTop: '1.25rem', color: 'var(--text-2)' }}>
            We close it. No guesswork, no wasted months, no half-built automations
            collecting dust. Just AI that works — built around how you actually operate.
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .problem-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 680px) {
          .problem-section { padding-top: 2rem !important; padding-bottom: 4rem !important; }
        }
      `}</style>
    </section>
  )
}

'@ }
$files += @{ Path = 'src\app\components\Process.tsx'; Content = @'
'use client'

const steps = [
  {
    num: '01',
    title: 'Consult',
    body: 'We map your business, identify the highest-leverage AI opportunities, and build a tailored roadmap for your specific situation. No generic playbooks.',
  },
  {
    num: '02',
    title: 'Build',
    body: 'Our team designs, builds, and tests your AI systems — integrated seamlessly with your existing tools, team, and workflows. You approve everything before it goes live.',
  },
  {
    num: '03',
    title: 'Deploy & Iterate',
    body: 'We launch, train your team, and stay on as your AI partner — refining and expanding the systems as your business grows and evolves.',
  },
]

export default function Process() {
  return (
    <section id="process" style={{
      background: 'var(--bg-2)',
      color: 'var(--text)',
      padding: '7rem 2rem',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span className="dfy-eyebrow" style={{ color: 'var(--accent)' }}>The Process</span>
        <h2 style={{
          fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
          lineHeight: 1.04, margin: '1rem 0 1.25rem',
          color: 'var(--text)',
        }}>
          How it works. <em style={{ color: 'var(--accent)' }}>Simply.</em>
        </h2>
        <p style={{
          fontFamily: 'var(--f-body)', fontSize: '1.1rem',
          color: 'var(--text-2)', lineHeight: 1.65,
          maxWidth: '40rem',
        }}>
          No long onboarding. No confusing tech. We've built a process that
          gets AI working inside your business in weeks — and keeps it
          working as you grow.
        </p>

        <div className="process-steps" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '20px',
          marginTop: '3.5rem',
        }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              padding: '2rem',
              borderRadius: 28,
              background: 'var(--surface)',
              border: '1px solid var(--line)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1.75rem' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'var(--accent)', color: '#fff',
                  fontFamily: 'var(--f-display)', fontSize: '1rem', fontWeight: 600, flexShrink: 0,
                }}>{s.num}</span>
                <span style={{ flex: 1, height: 2, background: 'var(--line-2)' }} />
              </div>
              <h3 style={{
                fontSize: '1.6rem', lineHeight: 1.15,
                marginBottom: '0.75rem', color: 'var(--text)',
              }}>{s.title}</h3>
              <p style={{
                fontFamily: 'var(--f-body)', fontSize: '1rem',
                color: 'var(--text-2)', lineHeight: 1.6,
              }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .process-steps { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 680px) {
          #process { padding: 4rem 1.25rem !important; }
        }
      `}</style>
    </section>
  )
}

'@ }
$files += @{ Path = 'src\app\components\Services.tsx'; Content = @'
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

'@ }
$files += @{ Path = 'src\app\components\Testimonials.tsx'; Content = @'
'use client'

const testimonials = [
  {
    quote: 'They built an AI system that handles our entire customer intake process. What used to take my team 3 hours a day now happens automatically -- and better than before.',
    name: 'Sarah M.',
    role: 'Founder, boutique marketing agency',
    initials: 'SM',
    avBg: '#EDF0FF', avFg: '#2B4BFF',
  },
  {
    quote: "I kept delaying AI because I didn't know where to start. Two weeks in, they had a full content engine running. The ROI was immediate and hasn't stopped.",
    name: 'James T.',
    role: 'E-commerce brand owner',
    initials: 'JT',
    avBg: '#E3F3EC', avFg: '#0B6B4D',
  },
  {
    quote: 'Our sales team now walks into every call with AI-researched prospect briefs. Conversions are up, and the team actually sells instead of doing admin work.',
    name: 'Priya K.',
    role: 'VP of Sales, B2B SaaS company',
    initials: 'PK',
    avBg: '#F5E6DC', avFg: '#8A3D12',
  },
]

export default function Testimonials() {
  return (
    <>
      <section id="results" style={{
        background: 'var(--bg)',
        color: 'var(--text)',
        padding: '7rem 2rem',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
            lineHeight: 1.04,
            color: 'var(--text)',
            marginBottom: '3rem',
          }}>What clients say</h2>

          {/* Desktop grid */}
          <div className="testimonials-desktop" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '20px',
          }}>
            {testimonials.map((t, i) => (
              <figure key={i} style={{
                margin: 0,
                padding: '2rem',
                border: '1px solid var(--line)',
                borderRadius: 28,
                background: 'var(--surface)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.75rem',
              }}>
                <blockquote style={{ margin: 0 }}>
                  <div style={{
                    fontFamily: 'var(--f-serif)', fontSize: '4rem',
                    color: 'var(--accent)', lineHeight: 0.6, height: '1.75rem',
                  }}>&ldquo;</div>
                  <p style={{
                    marginTop: '0.9rem',
                    fontFamily: 'var(--f-body)', fontSize: '1.1rem',
                    lineHeight: 1.6, color: 'var(--text)',
                  }}>{t.quote}</p>
                </blockquote>
                <figcaption style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 48, height: 48, borderRadius: '50%',
                    background: t.avBg, color: t.avFg,
                    fontFamily: 'var(--f-body)', fontSize: '0.95rem', fontWeight: 600, flexShrink: 0,
                  }}>{t.initials}</span>
                  <span>
                    <strong style={{
                      display: 'block', fontFamily: 'var(--f-body)', fontWeight: 600,
                      fontSize: '1rem', color: 'var(--text)',
                    }}>{t.name}</strong>
                    <span style={{
                      display: 'block', marginTop: 2,
                      fontFamily: 'var(--f-body)', fontSize: '0.88rem',
                      color: 'var(--text-3)',
                    }}>{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile carousel */}
      <div className="testimonials-mobile">
        <div className="testimonials-track">
          {testimonials.map((t, i) => (
            <div key={i} className="testi-card">
              <span className="testi-quote">&ldquo;</span>
              <p className="testi-text">{t.quote}</p>
              <div className="testi-who">
                <span className="testi-av" style={{ background: t.avBg, color: t.avFg }}>{t.initials}</span>
                <span>
                  <strong className="testi-name">{t.name}</strong>
                  <span className="testi-role">{t.role}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-mobile { display: none; }

        @media (max-width: 900px) {
          .testimonials-desktop { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 680px) {
          #results { padding: 4rem 1.25rem 1rem !important; }
          .testimonials-desktop { display: none !important; }

          .testimonials-mobile {
            display: block;
            width: 100vw;
            margin-left: calc(-50vw + 50%);
            background: var(--bg);
            padding-bottom: 4rem;
          }

          .testimonials-track {
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
          .testimonials-track::-webkit-scrollbar { display: none; }

          .testi-card {
            flex: 0 0 82vw;
            scroll-snap-align: start;
            border: 1px solid var(--line);
            border-radius: 24px;
            background: var(--surface);
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            min-height: 300px;
          }
          .testi-quote {
            font-family: var(--f-serif); font-size: 3.5rem;
            color: var(--accent); line-height: 0.7; height: 1.5rem;
            pointer-events: none;
          }
          .testi-text {
            font-family: var(--f-body); font-size: 1rem;
            line-height: 1.6; color: var(--text);
            margin: 0.9rem 0 1.5rem; flex: 1;
          }
          .testi-who { display: flex; align-items: center; gap: 0.8rem; }
          .testi-av {
            display: inline-flex; align-items: center; justify-content: center;
            width: 44px; height: 44px; border-radius: 50%;
            font-family: var(--f-body); font-size: 0.9rem; font-weight: 600; flex-shrink: 0;
          }
          .testi-name {
            display: block; font-family: var(--f-body);
            font-size: 0.95rem; font-weight: 600;
            color: var(--text);
          }
          .testi-role {
            display: block; font-family: var(--f-body); font-size: 0.82rem;
            color: var(--text-3);
          }
        }
      `}</style>
    </>
  )
}

'@ }
$files += @{ Path = 'src\app\components\Ticker.tsx'; Content = @'
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
      background: 'var(--text)',
      padding: '1.6rem 0',
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
          animation: ticker-scroll 40s linear infinite;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        @media (max-width: 768px) {
          .ticker-track {
            animation: ticker-scroll 20s linear infinite;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
        }

        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 1.5rem;
          font-family: var(--f-display);
          font-size: 1.15rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: #ffffff;
          padding-right: 1.5rem;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .ticker-dot {
          color: #8FA0FF;
          font-size: 0.6rem;
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

'@ }
$files += @{ Path = 'src\app\components\VideoShowcase.tsx'; Content = @'
'use client'

// ── Video config ─────────────────────────────────────────────────────────────
const SHOW_VIDEO  = true
const VIDEO_SRC   = 'https://cdn.livereselling.com/videos/Untitled_Video.mp4'
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  mode?: 'embed' | 'bg'
}

export default function VideoShowcase({ mode = 'embed' }: Props) {
  if (!SHOW_VIDEO) return null

  return (
    <section id="work">

      <div className="vs-outer">

        {/* ── Left: text ── */}
        <div className="vs-text">
          <span className="dfy-eyebrow vs-eyebrow">See It In Action</span>
          <h2 className="vs-heading">
            Built by us.<br />
            <em>Owned by you.</em>
          </h2>
          <p className="vs-body">
            Watch how we go from strategy call to a fully deployed AI system
            running inside a real business — no fluff, just the work.
          </p>
        </div>

        {/* ── Right: video ── */}
        <div className="vs-video-col">
          <div className="vs-shell">
            <div className="vs-chrome">
              <span className="vs-dot" /><span className="vs-dot" /><span className="vs-dot" />
              <span className="vs-url">doneforyouai.com</span>
            </div>

            <div className="vs-frame">
              <video
                controls
                playsInline
                className="vs-player"
                preload="metadata"
                poster="https://cdn.livereselling.com/item-images/image%20-%202026-05-31T094738.323.png"
              >
                <source src={VIDEO_SRC} type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="vs-caption">
            <span className="vs-caption-label">DoneForYouAI · Welcome</span>
            <span className="vs-caption-url">doneforyouai.com</span>
          </div>
        </div>

      </div>

      <style>{`
        #work {
          background: var(--bg);
        }

        .vs-outer {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          align-items: center;
          gap: 4rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 7rem 2rem;
        }

        .vs-text {
          display: flex;
          flex-direction: column;
        }

        .vs-eyebrow {
          color: var(--accent);
          margin-bottom: 1.25rem;
        }

        .vs-heading {
          font-size: clamp(2.2rem, 3.6vw, 3.4rem);
          line-height: 1.04;
          color: var(--text);
          margin: 0 0 1.5rem 0;
        }

        .vs-heading em {
          color: var(--accent);
        }

        .vs-body {
          font-family: var(--f-body);
          font-size: 1.1rem;
          color: var(--text-2);
          line-height: 1.65;
          margin: 0;
        }

        .vs-video-col {
          position: relative;
        }

        .vs-shell {
          background: var(--text);
          border-radius: 24px;
          padding: 12px;
          box-shadow: 0 40px 80px rgba(21, 22, 26, 0.22);
        }

        .vs-chrome {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px 12px;
        }

        .vs-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #4A4B52;
          display: inline-block;
        }

        .vs-url {
          margin-left: 12px;
          padding: 5px 16px;
          border-radius: 999px;
          background: #26272D;
          color: #C9C9CF;
          font-family: var(--f-body);
          font-size: 0.78rem;
          font-weight: 500;
        }

        .vs-frame {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          background: #000;
          border-radius: 14px;
        }

        /* Mask a thin edge line baked into the video file (top + bottom) */
        .vs-frame::before,
        .vs-frame::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 6px;
          background: var(--text);
          z-index: 2;
          pointer-events: none;
        }
        .vs-frame::before { top: 0; }
        .vs-frame::after  { bottom: 0; }

        .vs-player {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          border: none !important;
          display: block !important;
        }

        .vs-caption {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1rem;
          padding: 0 0.5rem;
        }

        .vs-caption-label {
          font-family: var(--f-body);
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-3);
        }

        .vs-caption-url {
          font-family: var(--f-body);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--accent);
        }

        @media (max-width: 900px) {
          .vs-outer {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            padding: 4rem 1.25rem;
          }
        }

        /* ── MOBILE: stacked, video first ── */
        @media (max-width: 768px) {
          .vs-video-col {
            order: -1;
            width: 100%;
          }
          .vs-chrome { display: none; }
          .vs-shell { padding: 6px; border-radius: 18px; }
          .vs-frame { border-radius: 12px; }
          .vs-heading {
            font-size: clamp(1.9rem, 8vw, 2.4rem);
            margin-bottom: 0.75rem;
          }
        }
      `}</style>
    </section>
  )
}

'@ }
$files += @{ Path = 'src\app\globals.css'; Content = @'
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400&family=Inter+Tight:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  /* ── LIGHT THEME COLORS ── */
  --ink:         #f5f4f0;       /* was #0f0f0e  — now warm off-white page bg */
  --ink-2:       #eceae4;       /* was #1c1c1a  — now secondary surface */
  --ink-3:       #d8d5ce;       /* was #2a2a27  — now borders/dividers */
  --page:        #0f0f0e;       /* was #f7f5f0  — now primary text (near-black) */
  --page-2:      #555550;       /* was #efecea  — now secondary/muted text */
  --coral:       #e8521a;       /* unchanged    — brand accent kept identical */
  --coral-dim:   rgba(232, 82, 26, 0.08);   /* unchanged */
  --coral-border:rgba(232, 82, 26, 0.28);   /* unchanged */
  --white:       #ffffff;       /* unchanged */
  --muted-light: rgba(15, 15, 14, 0.42);    /* unchanged — text muting on light bg */
  --muted-dark:  rgba(15, 15, 14, 0.28);    /* was white-based — now dark-based for light bg */
  --border-light:rgba(15, 15, 14, 0.1);     /* unchanged */
  --border-dark: rgba(15, 15, 14, 0.08);    /* was white-based — now subtle dark border */
  --serif:       'Instrument Serif', Georgia, serif;
  --sans:        'Syne', system-ui, sans-serif;
  --mono:        'DM Mono', 'Courier New', monospace;
}

html {
  overflow-x: hidden;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
}

body {
  background: var(--ink);       /* now renders as warm off-white */
  color: var(--page);           /* now renders as near-black text */
  font-family: var(--sans);
  font-weight: 400;
  line-height: 1.6;
  overflow-x: hidden;
}

/* ── SCROLLBAR ── */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--ink-2); }
::-webkit-scrollbar-thumb { background: var(--ink-3); border-radius: 2px; }

/* ── SELECTION ── */
::selection { background: var(--coral); color: var(--white); }

/* ── ANIMATIONS ── */
@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.25; }
}
@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.animate-fade-up {
  animation: fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.animate-fade-in {
  animation: fade-in 0.6s ease both;
}

.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.35s; }
.delay-4 { animation-delay: 0.5s; }
.delay-5 { animation-delay: 0.65s; }

/* ── RESPONSIVE GRID OVERRIDES ── */
@media (max-width: 680px) {
  #audience-grid {
    grid-template-columns: 1fr !important;
    gap: 1.5rem !important;
  }
  #contact-grid {
    grid-template-columns: 1fr !important;
    gap: 3rem !important;
  }
  #contact-name-row {
    grid-template-columns: 1fr !important;
    gap: 1rem !important;
  }
  [data-mobile-stack] {
    grid-template-columns: 1fr !important;
    gap: 2rem !important;
  }
  section {
    padding-left: 1.25rem !important;
    padding-right: 1.25rem !important;
  }
  * {
    max-width: 100%;
  }
  img, video, iframe {
    width: 100% !important;
    height: auto !important;
  }
}

/* ═══════════════════════════════════════════════════════════════
   PUBLIC-SITE DESIGN SYSTEM (2026 redesign)
   Scoped to .dfy-public so login / dashboard / admin are untouched.
   ═══════════════════════════════════════════════════════════════ */
:root {
  --bg:            #F6F4EE;
  --bg-2:          #EDE9DD;
  --surface:       #FFFFFF;
  --text:          #15161A;
  --text-2:        #4A4A46;
  --text-3:        #5C5B57;
  --line:          #E2DED2;
  --line-2:        #D9D5C8;
  --accent:        #2B4BFF;
  --accent-hover:  #1F3AD6;
  --accent-tint:   #EDF0FF;
  --accent-dim:    rgba(43, 75, 255, 0.08);
  --accent-border: rgba(43, 75, 255, 0.28);
  --f-display:     'Inter Tight', 'Inter', system-ui, sans-serif;
  --f-body:        'Inter', system-ui, sans-serif;
  --f-serif:       'Instrument Serif', Georgia, serif;
}

.dfy-public {
  background: var(--bg);
  color: var(--text);
  font-family: var(--f-body);
  min-height: 100vh;
}

.dfy-public h1,
.dfy-public h2,
.dfy-public h3 {
  font-family: var(--f-display) !important;
  font-weight: 600 !important;
  letter-spacing: -0.03em !important;
}

.dfy-public em {
  font-family: var(--f-serif) !important;
  font-style: italic !important;
  font-weight: 400 !important;
  letter-spacing: 0 !important;
  font-size: 1.08em;
}

.dfy-public a { text-decoration: none; }

.dfy-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--f-body);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-2);
}

.dfy-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 52px;
  padding: 0 28px;
  border-radius: 999px;
  border: 1.5px solid transparent;
  font-family: var(--f-body);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition: transform 0.15s, background 0.15s, border-color 0.15s, color 0.15s;
}
.dfy-btn:hover { transform: translateY(-2px); }
.dfy-btn-primary { background: var(--accent); color: #fff; }
.dfy-btn-primary:hover { background: var(--accent-hover); }
.dfy-btn-ghost { background: transparent; color: var(--text); border-color: var(--text); }
.dfy-btn-ghost:hover { background: var(--text); color: #fff; }
.dfy-btn-light { background: #fff; color: var(--text); }
.dfy-btn[disabled] { opacity: 0.55; cursor: not-allowed; transform: none; }

.dfy-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 28px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.dfy-card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(21, 22, 26, 0.10);
}

.dfy-pill {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 22px;
  border-radius: 999px;
  background: var(--surface);
  border: 1px solid var(--line);
  font-family: var(--f-body);
  font-size: 1rem;
  font-weight: 500;
  color: var(--text);
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}
.dfy-pill:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(43, 75, 255, 0.10);
}

.dfy-container {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 2rem;
  padding-right: 2rem;
}

.dfy-field {
  width: 100%;
  min-height: 52px;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1.5px solid var(--line-2);
  background: #fff;
  font-family: var(--f-body);
  font-size: 1rem;
  line-height: 1.4;
  color: var(--text);
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.dfy-field:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 4px rgba(43, 75, 255, 0.15);
}
.dfy-field::placeholder { color: rgba(21, 22, 26, 0.4); }

.dfy-label {
  display: block;
  margin-bottom: 8px;
  font-family: var(--f-body);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text);
}

.dfy-public ::selection { background: var(--accent); color: #fff; }

@media (prefers-reduced-motion: reduce) {
  .dfy-btn, .dfy-card, .dfy-pill { transition: none; }
  .animate-fade-up, .animate-fade-in { animation: none; }
}
@media (max-width: 680px) {
  .dfy-container { padding-left: 1.25rem; padding-right: 1.25rem; }
  .dfy-btn { min-height: 48px; padding: 0 22px; }
}

'@ }
$files += @{ Path = 'src\app\page.tsx'; Content = @'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import VideoShowcase from './components/VideoShowcase'
import Problem from './components/Problem'
import Services from './components/Services'
// import FeaturedAndPulse from './components/FeaturedAndPulse'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Audience from './components/Audience'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="dfy-public">
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <VideoShowcase mode="embed" />   {/* ← moved here, directly under Ticker */}
        <Problem />
        <Services />
        {/* <FeaturedAndPulse /> */}
        <Process />
        <Testimonials />
        <Audience />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
'@ }
$files += @{ Path = 'src\app\privacy\page.tsx'; Content = @'
import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | DoneForYouAI',
  description: 'Privacy Policy for DoneForYouAI.com',
}

const EFFECTIVE_DATE = 'June 1, 2026'
const COMPANY       = 'HONNYDO LLC d/b/a DoneForYouAI'
const SITE          = 'DoneForYouAI.com'
const EMAIL         = 'hello@doneforyouai.com'
const STATE         = 'Arizona'

const sections = [
  {
    title: '1. Who We Are',
    body: `${COMPANY} ("Company," "we," "us," or "our") operates ${SITE} and provides AI implementation services. This Privacy Policy explains how we collect, use, disclose, and protect information about you when you use our Site or services. By using our Site, you consent to the practices described in this Policy.`,
  },
  {
    title: '2. Information We Collect',
    body: `2.1 Information You Provide. We collect information you voluntarily provide, including: your name, email address, company name, and any other information you submit through our contact forms, expert application, or during service engagement.

2.2 Payment Information. Payment transactions are processed by Stripe, a PCI-DSS compliant payment processor. We do not store your full credit card number, CVV, or billing details on our servers. We receive limited transaction metadata (amount, status, and partial card info) from Stripe.

2.3 Automatically Collected Information. When you visit the Site, we may automatically collect: IP address, browser type and version, operating system, pages viewed, time spent on pages, referring URLs, and device identifiers. This information is collected via cookies, pixels, and similar tracking technologies.

2.4 Expert Profile Data. If you apply as an Expert, we collect professional information including your skills, bio, portfolio links, social handles, rates, and availability. This information may be displayed publicly on the Site.

2.5 Communications. We retain records of communications between you and the Company, including emails, chat messages, and support requests.`,
  },
  {
    title: '3. How We Use Your Information',
    body: `We use the information we collect to:

· Provide, operate, and improve our services and the Site
· Process transactions and send related information including invoices and receipts
· Respond to your inquiries, comments, and requests
· Send you technical notices, updates, security alerts, and administrative messages
· Send marketing communications (where you have opted in or where permitted by law)
· Match Clients with Experts on our marketplace platform
· Monitor and analyze usage patterns and trends to improve user experience
· Detect, investigate, and prevent fraudulent transactions and other illegal activities
· Comply with legal obligations and enforce our Terms of Service
· Protect the rights, property, and safety of ${COMPANY}, our users, and the public`,
  },
  {
    title: '4. Cookies and Tracking Technologies',
    body: `We use cookies and similar tracking technologies to collect and track information and to improve and analyze our Site. Cookies are small data files stored on your device.

Types of cookies we use:
· Essential cookies: necessary for the Site to function properly
· Analytics cookies: help us understand how visitors interact with the Site (e.g., Google Analytics)
· Functional cookies: remember your preferences and settings
· Marketing cookies: used to deliver relevant advertising (where applicable)

You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of the Site may not function properly. You may also opt out of Google Analytics by installing the Google Analytics opt-out browser add-on.`,
  },
  {
    title: '5. How We Share Your Information',
    body: `We do not sell your personal information. We may share your information in the following circumstances:

5.1 Service Providers. We share information with third-party vendors and service providers that perform services on our behalf, including payment processing (Stripe), email delivery (Resend), database hosting (Supabase), cloud infrastructure (Vercel, Cloudflare), and analytics providers. These providers are contractually obligated to protect your information.

5.2 Expert Marketplace. If you are a Client, limited profile information may be shared with Experts you engage. If you are an Expert, your profile information is displayed on the Site as part of the marketplace.

5.3 Business Transfers. If we are involved in a merger, acquisition, financing, reorganization, bankruptcy, or sale of company assets, your information may be transferred as part of that transaction.

5.4 Legal Requirements. We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).

5.5 Protection of Rights. We may disclose information where we believe it is necessary to investigate, prevent, or take action regarding illegal activities, suspected fraud, violations of our Terms, or threats to the safety of any person.`,
  },
  {
    title: '6. Data Retention',
    body: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this Policy, comply with our legal obligations, resolve disputes, and enforce our agreements. When we no longer need your information, we will securely delete or anonymize it. Client project records, invoices, and communications may be retained for up to seven (7) years for accounting and legal purposes.`,
  },
  {
    title: '7. Security',
    body: `We implement reasonable technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. These measures include encrypted data transmission (HTTPS/TLS), access controls, and secure cloud infrastructure. However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security and you use the Site at your own risk. In the event of a data breach that affects your rights and freedoms, we will notify you as required by applicable law.`,
  },
  {
    title: '8. Your Rights and Choices',
    body: `Depending on your location, you may have certain rights regarding your personal information:

· Access: request a copy of the personal information we hold about you
· Correction: request that we correct inaccurate or incomplete information
· Deletion: request that we delete your personal information, subject to certain exceptions
· Portability: request that we provide your data in a machine-readable format
· Opt-out of marketing: unsubscribe from marketing emails at any time using the unsubscribe link in any email we send
· Withdraw consent: where processing is based on consent, withdraw it at any time

To exercise any of these rights, contact us at ${EMAIL}. We will respond to your request within 30 days. We may need to verify your identity before processing your request.`,
  },
  {
    title: '9. California Privacy Rights (CCPA)',
    body: `If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, use, and disclose; the right to delete your personal information; and the right to opt out of the sale of personal information. We do not sell personal information. To exercise your CCPA rights, contact us at ${EMAIL}. We will not discriminate against you for exercising your privacy rights.`,
  },
  {
    title: '10. Children\'s Privacy',
    body: `Our Site and services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take steps to delete that information promptly. If you believe we have inadvertently collected such information, please contact us at ${EMAIL}.`,
  },
  {
    title: '11. Third-Party Links',
    body: `Our Site may contain links to third-party websites, tools, and services. We are not responsible for the privacy practices or content of those third parties. We encourage you to review the privacy policies of any third-party sites you visit. The inclusion of a link does not imply our endorsement of that site or service.`,
  },
  {
    title: '12. International Transfers',
    body: `Your information may be transferred to and processed in countries other than your own, including the United States. These countries may have data protection laws that differ from your jurisdiction. By using our Site or services, you consent to the transfer of your information to the United States and to other countries as necessary to provide our services.`,
  },
  {
    title: '13. Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Policy on this page with an updated effective date. Your continued use of the Site after such changes constitutes your acceptance of the updated Policy. We encourage you to review this Policy periodically.`,
  },
  {
    title: '14. Contact Us',
    body: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:\n\n${COMPANY}\nEmail: ${EMAIL}\nLocation: Tempe, ${STATE}`,
  },
]

/* Renders a paragraph, replacing any email address with a plain unclickable span */
function SafeParagraph({ text, email }: { text: string; email: string }) {
  const parts = text.split(email)
  return (
    <p style={{ fontFamily: 'var(--f-body)', fontSize: '0.88rem', color: 'rgba(15,15,14,0.72)', lineHeight: 1.8, marginBottom: '1rem', whiteSpace: 'pre-line' }}>
      {parts.map((part, k) => (
        <span key={k}>
          {part}
          {k < parts.length - 1 && (
            <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.85rem', color: 'var(--text)', userSelect: 'text' }}>{email}</span>
          )}
        </span>
      ))}
    </p>
  )
}

export default function PrivacyPage() {
  return (
    <div className="dfy-public" style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: 'var(--f-body)' }}>

      {/* Hero */}
      <div style={{ background: 'var(--bg-2)', padding: '5rem 2.5rem 4rem', borderBottom: '1px solid var(--line-2)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '2.5rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 10, background: 'var(--text)', color: '#fff', fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: '0.95rem' }}>D</span>
            <span style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>DFYAI</span>
          </Link>

          <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2B4BFF', display: 'block', marginBottom: '1rem' }}>Legal</span>
          <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--text)', lineHeight: 1.05, marginBottom: '1rem' }}>
            Privacy Policy
          </h1>
          <p style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'var(--text-3)' }}>
            Effective date: {EFFECTIVE_DATE} · {COMPANY}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '4rem 2.5rem 6rem' }}>

        {/* Intro callout */}
        <div style={{ background: 'var(--accent-tint)', border: '1px solid var(--accent-border)', borderRadius: '20px', padding: '1.25rem 1.5rem', marginBottom: '3rem' }}>
          <p style={{ fontFamily: 'var(--f-body)', fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>
            Your privacy matters to us. This Policy explains exactly what data we collect, why we collect it, and how we protect it. We do not sell your personal information — ever.
          </p>
        </div>

        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: '2.5rem', paddingBottom: '2.5rem', borderBottom: i < sections.length - 1 ? '1px solid var(--line)' : 'none' }}>
            <h2 style={{ fontFamily: 'var(--f-body)', fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.85rem' }}>{s.title}</h2>
            {s.body.split('\n\n').map((para, j) => (
              <SafeParagraph key={j} text={para} email={EMAIL} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
'@ }
$files += @{ Path = 'src\app\terms\page.tsx'; Content = @'
import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service | DoneForYouAI',
  description: 'Terms of Service for DoneForYouAI.com',
}

const EFFECTIVE_DATE = 'June 1, 2026'
const COMPANY       = 'HONNYDO LLC d/b/a DoneForYouAI'
const SITE          = 'DoneForYouAI.com'
const EMAIL         = 'hello@doneforyouai.com'
const STATE         = 'Arizona'

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing or using ${SITE} (the "Site") or engaging ${COMPANY} ("Company," "we," "us," or "our") for any services, you ("Client," "you," or "your") agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use the Site or engage our services. These Terms apply to all visitors, clients, and others who access or use the Site or our services.`,
  },
  {
    title: '2. Services',
    body: `${COMPANY} provides AI implementation services including, but not limited to: AI automation and workflow design, custom AI assistants and chatbots, AI content systems, AI-powered lead generation, done-for-you AI tool stack setup, AI strategy consulting, and prompt engineering. The specific scope of services to be delivered will be defined in a separate proposal, statement of work, or written agreement between you and the Company ("Project Agreement").`,
  },
  {
    title: '3. Pricing and Payment Terms',
    body: `Services are billed either on a per-hour or per-project basis, at the sole discretion of ${COMPANY}. The applicable rate and billing method will be specified in the Project Agreement or invoice issued prior to commencement of work.

3.1 Per-Hour Engagements. For hourly engagements, you agree to pay the agreed hourly rate for all time logged by the Company in connection with your project, including time spent on research, communication, revision, testing, and deployment.

3.2 Per-Project Engagements. For fixed-price project engagements, the quoted price covers only the scope of work explicitly described in the Project Agreement. Work that falls outside that defined scope — including additional features, integrations, revisions beyond the agreed revision rounds, or post-delivery modifications — is not included in the project price.

3.3 Invoicing. Invoices are due upon receipt unless otherwise stated in writing. Overdue balances accrue interest at 1.5% per month (18% per annum) or the maximum rate permitted by ${STATE} law, whichever is lower.

3.4 Non-Refundable Deposits. Any deposit paid to initiate a project is non-refundable. Deposits secure the Company's time and availability and are earned upon receipt.`,
  },
  {
    title: '4. Out-of-Scope Work and Additional Charges',
    body: `This is a critical provision. Any work requested by you that was not included in the original Project Agreement constitutes out-of-scope work and will be subject to additional charges.

4.1 Change Requests. If you request changes, additions, or modifications to the original agreed-upon scope — whether during the project, at delivery, or after delivery — the Company reserves the right to assess and charge for that additional work at its then-current hourly rate or issue a revised project quote.

4.2 No After-the-Fact Disputes. By requesting and receiving out-of-scope work — whether verbally, via email, text, chat, or any other communication — you acknowledge and agree that such work will be billed separately and that you are responsible for payment. You waive any right to dispute charges for work you requested and received on the basis that it was not included in the original agreement.

4.3 Retrospective Billing. The Company reserves the right to bill for work completed but not yet invoiced, including work performed under verbal or informal agreement. Acceptance of deliverables — including use of any system, code, content, or tool we provide — constitutes acceptance of billing for that work.

4.4 Scope Creep. The Company is not obligated to absorb scope creep. If a project grows beyond its original definition, we will notify you and present a revised estimate. We may pause work until a revised agreement is signed or a deposit is received.`,
  },
  {
    title: '5. Client Responsibilities',
    body: `You agree to: (a) provide timely feedback, approvals, and access to systems required for us to perform the work; (b) ensure all content, data, and credentials you provide are accurate and lawful; (c) maintain appropriate backups of your systems and data; and (d) notify us promptly of any issues or concerns. Delays caused by you — including delayed feedback, missing assets, or failure to provide access — may result in project timeline extensions or additional charges for re-engagement.`,
  },
  {
    title: '6. Intellectual Property',
    body: `Upon receipt of full payment, you own all custom deliverables created specifically for you under a Project Agreement. The Company retains ownership of all pre-existing tools, frameworks, methodologies, proprietary workflows, and general-purpose code, templates, or systems used in delivering services. We retain the right to use your project in our portfolio and to describe the work performed in marketing materials, unless you request otherwise in writing prior to project commencement.`,
  },
  {
    title: '7. Confidentiality',
    body: `Each party agrees to keep confidential any non-public, proprietary, or sensitive information disclosed by the other party in connection with services. This obligation does not apply to information that is publicly available, independently developed, or required to be disclosed by law. You agree not to reverse-engineer, resell, or redistribute any proprietary tools, systems, or methodologies we provide without prior written consent.`,
  },
  {
    title: '8. Expert Marketplace',
    body: `${SITE} operates a marketplace connecting businesses with independent AI experts ("Experts"). Experts are independent contractors, not employees or agents of ${COMPANY}. The Company does not guarantee the quality, accuracy, legality, or timeliness of Expert services. You engage Experts at your own risk. Any disputes between you and an Expert are between you and that Expert. The Company takes a platform fee on transactions facilitated through the marketplace. Fees are non-refundable except as required by law.`,
  },
  {
    title: '9. Limitation of Liability',
    body: `To the maximum extent permitted by applicable law, ${COMPANY} shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including lost profits, lost data, business interruption, or reputational harm — arising out of or related to your use of our services, even if advised of the possibility of such damages. Our total cumulative liability to you for any claim arising out of or related to these Terms or our services shall not exceed the total amount paid by you to the Company in the three (3) months preceding the claim.`,
  },
  {
    title: '10. No Guarantee of Results',
    body: `The Company makes no guarantees regarding the performance, revenue impact, or business outcomes of any AI system, workflow, or strategy we implement. AI tools and systems are subject to the policies and availability of third-party providers. Results depend on many factors outside our control, including your business operations, market conditions, and third-party platform changes. You acknowledge that AI implementation is an evolving field and that no specific outcome is guaranteed.`,
  },
  {
    title: '11. Third-Party Services',
    body: `Our services may involve integration with or reliance on third-party tools, platforms, and APIs (including but not limited to OpenAI, Anthropic, Zapier, Make, Supabase, Stripe, Vercel, Cloudflare, and others). The Company is not responsible for outages, policy changes, pricing changes, or discontinuation of third-party services. Additional costs from third-party tools are your responsibility unless explicitly included in the Project Agreement.`,
  },
  {
    title: '12. Termination',
    body: `Either party may terminate a project engagement with written notice. Upon termination: (a) you owe payment for all work completed up to the termination date, including any out-of-scope work performed; (b) any non-refundable deposits are forfeited; (c) the Company will deliver all completed work product upon receipt of final payment. The Company reserves the right to terminate or suspend access to the Site or our services at any time for violation of these Terms.`,
  },
  {
    title: '13. Dispute Resolution',
    body: `Any dispute arising out of or relating to these Terms or our services shall first be subject to good-faith negotiation between the parties. If not resolved within 30 days, disputes shall be resolved by binding arbitration administered in ${STATE} under the rules of the American Arbitration Association. You waive any right to a jury trial or class action. Notwithstanding the foregoing, either party may seek injunctive relief in a court of competent jurisdiction in ${STATE} to prevent irreparable harm.`,
  },
  {
    title: '14. Governing Law',
    body: `These Terms are governed by and construed in accordance with the laws of the State of ${STATE}, without regard to its conflict-of-law provisions. You consent to the exclusive jurisdiction of the courts located in ${STATE} for any matters not subject to arbitration.`,
  },
  {
    title: '15. Changes to These Terms',
    body: `We reserve the right to update these Terms at any time. We will post the updated Terms on this page with a revised effective date. Continued use of the Site or our services after such changes constitutes your acceptance of the updated Terms. It is your responsibility to review these Terms periodically.`,
  },
  {
    title: '16. Entire Agreement',
    body: `These Terms, together with any Project Agreement or invoice, constitute the entire agreement between you and ${COMPANY} with respect to its subject matter and supersede all prior agreements, understandings, and representations. If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.`,
  },
  {
    title: '17. Contact',
    body: `Questions about these Terms? Contact us at ${EMAIL} or by mail at ${COMPANY}, Tempe, Arizona.`,
  },
]

export default function TermsPage() {
  return (
    <div className="dfy-public" style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: 'var(--f-body)' }}>

      {/* Hero */}
      <div style={{ background: 'var(--bg-2)', padding: '5rem 2.5rem 4rem', borderBottom: '1px solid var(--line-2)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '2.5rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 10, background: 'var(--text)', color: '#fff', fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: '0.95rem' }}>D</span>
            <span style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>DFYAI</span>
          </Link>

          <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2B4BFF', display: 'block', marginBottom: '1rem' }}>Legal</span>
          <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--text)', lineHeight: 1.05, marginBottom: '1rem' }}>
            Terms of Service
          </h1>
          <p style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: 'var(--text-3)' }}>
            Effective date: {EFFECTIVE_DATE} · {COMPANY}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '4rem 2.5rem 6rem' }}>

        {/* Intro callout */}
        <div style={{ background: 'var(--accent-tint)', border: '1px solid var(--accent-border)', borderRadius: '20px', padding: '1.25rem 1.5rem', marginBottom: '3rem' }}>
          <p style={{ fontFamily: 'var(--f-body)', fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>
            <strong>Please read these Terms carefully before engaging our services.</strong> They contain important provisions about payment obligations, out-of-scope billing, limitation of liability, and dispute resolution. By working with us, you agree to these Terms.
          </p>
        </div>

        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: '2.5rem', paddingBottom: '2.5rem', borderBottom: i < sections.length - 1 ? '1px solid var(--line)' : 'none' }}>
            <h2 style={{ fontFamily: 'var(--f-body)', fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.85rem', letterSpacing: '0.01em' }}>{s.title}</h2>
            {s.body.split('\n\n').map((para, j) => (
              <p key={j} style={{ fontFamily: 'var(--f-body)', fontSize: '0.88rem', color: 'rgba(15,15,14,0.72)', lineHeight: 1.8, marginBottom: j < s.body.split('\n\n').length - 1 ? '1rem' : 0, whiteSpace: 'pre-line' }}>
                {/* Replace email address with plain unlinked span */}
                {para.split(EMAIL).map((part, k, arr) => (
                  <span key={k}>
                    {part}
                    {k < arr.length - 1 && (
                      <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.85rem', color: 'var(--text)' }}>{EMAIL}</span>
                    )}
                  </span>
                ))}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
'@ }
$files += @{ Path = 'src\app\work\WorkPageClient.tsx'; Content = @'
'use client'

import { useState } from 'react'
import Navbar from '@/app/components/Navbar'

const projects = [
  { id: 1,  name: 'DoneForYouAI.com',        url: 'doneforyouai.com',         href: 'https://doneforyouai.com',         tag: 'AI Services',          year: '2025', description: 'AI implementation agency with expert marketplace, live pulse feed, and operator network.',                                          stack: ['Next.js', 'Supabase', 'Stripe', 'Vercel'],                           screenshot: '/screenshots/doneforyouai.png',         light: false },
  { id: 2,  name: 'AINewsClips.com',          url: 'ainewsclips.com',          href: 'https://ainewsclips.com',          tag: 'Media',                year: '2024', description: 'AI news publication covering tech, agents, jobs, and innovation — built on WordPress with custom theming.',                   stack: ['WordPress', 'Elementor', 'GoDaddy'],                                 screenshot: '/screenshots/ainewsclips.png',          light: false },
  { id: 3,  name: 'LiveReselling.com',        url: 'livereselling.com',        href: 'https://livereselling.com',        tag: 'Live Commerce',        year: '2025', description: 'Live-stream reselling platform. Sellers go live, drop items, and buyers claim in real time from their phone.',                stack: ['Next.js', 'Supabase', 'Mux', 'Stripe'],                              screenshot: '/screenshots/livereselling.png',        light: true  },
  { id: 4,  name: 'UGCAffiliates.com',        url: 'ugcaffiliates.com',        href: 'https://ugcaffiliates.com',        tag: 'Marketplace',          year: '2024', description: 'Affiliate marketplace connecting UGC creators with vendors. Promote products, earn commissions.',                             stack: ['Next.js', 'Supabase', 'Stripe'],                                     screenshot: '/screenshots/ugcaffiliates.png',        light: true  },
  { id: 5,  name: 'AIPrintOnDemand.com',      url: 'aiprintondemand.com',      href: 'https://aiprintondemand.com',      tag: 'AI + E-commerce',      year: '2025', description: 'Generate AI designs and push them directly to Printify products — instantly.',                                                stack: ['Next.js', 'Replicate', 'Printify', 'Stripe'],                        screenshot: '/screenshots/aipod.png',                light: true  },
  { id: 6,  name: 'VintageGarageSale.com',    url: 'vintagegaragesale.com',    href: 'https://vintagegaragesale.com',    tag: 'Marketplace',          year: '2025', description: 'Curated vintage & thrifted marketplace. Buy now or name your price with offer negotiation.',                                   stack: ['Next.js', 'Supabase', 'Cloudflare R2', 'Resend'],                    screenshot: '/screenshots/vintagegaragesale.png',    light: false },
  { id: 7,  name: 'AIDigitalProducts.com',    url: 'aidigitalproducts.com',    href: 'https://aidigitalproducts.com',    tag: 'Digital Marketplace',  year: '2025', description: 'Ready-made AI products that work out of the box. Built by experts, deployed in minutes.',                                      stack: ['Next.js', 'Supabase', 'Stripe', 'Resend'],                           screenshot: '/screenshots/aidigitalproducts.png',    light: true  },
  { id: 8,  name: 'HomeServiceAgents.com',    url: 'homeserviceagents.com',    href: 'https://homeserviceagents.com',    tag: 'AI + Home Services',   year: '2025', description: 'AI matches homeowners with vetted, insured agents for plumbing, junk removal, pool cleaning and more — instantly.',         stack: ['WordPress', 'AI Booking', 'Twilio'],                                 screenshot: '/screenshots/homeserviceagents.png',    light: true  },
  { id: 9,  name: 'FreeAIReceptionist.com',   url: 'freeaireceptionist.com',   href: 'https://freeaireceptionist.com',   tag: 'Voice AI',             year: '2025', description: 'AI receptionist that answers calls 24/7 — captures leads, books appointments, and routes callers so you never miss a call.',  stack: ['Next.js', 'Supabase', 'Twilio', 'ElevenLabs', 'Stripe'],             screenshot: '/screenshots/freeaireceptionist.png',   light: true  },
  { id: 10, name: 'HireAIReceptionist.com',   url: 'hireaireceptionist.com',   href: 'https://hireaireceptionist.com',   tag: 'Business Automation',  year: '2025', description: 'AI receptionist that answers calls, qualifies leads, books appointments, and delivers 24/7 customer support — for less than the cost of one shift.',  stack: ['Next.js', 'Supabase', 'Twilio', 'ElevenLabs', 'Stripe'],             screenshot: '/screenshots/hireaireceptionist.webp',   light: false },
]

export default function WorkPageClient() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="dfy-public" style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: 'var(--f-body)', paddingTop: '74px' }}>

      <Navbar />

      {/* HERO */}
      <div style={{
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1rem, 4vw, 3rem) clamp(2rem, 5vw, 4rem)',
        borderBottom: '1px solid rgba(15,15,14,0.1)',
        position: 'relative', overflow: 'hidden',
        background: 'var(--bg)',
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: '1.5rem' }}>Selected work</span>
          <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 400, lineHeight: 1, color: 'var(--text)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            Built from<br /><em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>scratch.</em>
          </h1>
          <p style={{ fontFamily: 'var(--f-body)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: 'rgba(15,15,14,0.5)', lineHeight: 1.75, maxWidth: '52ch' }}>
            Every platform here was designed, developed, and deployed solo — full-stack, from zero to production.
          </p>
        </div>
        <div style={{
          position: 'absolute', bottom: '-0.5rem', right: 'clamp(1rem, 4vw, 3rem)',
          fontFamily: 'var(--f-serif)', fontSize: 'clamp(6rem, 18vw, 14rem)',
          fontWeight: 400, color: 'rgba(160,160,160,0.18)',
          lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
        }}>
          {projects.length}
        </div>
      </div>

      {/* DESKTOP list */}
      <div className="desktop-list" style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem)' }}>
        {projects.map((p, i) => (
          <a key={p.id} href={p.href} target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)}
            style={{ display: 'grid', gridTemplateColumns: '3rem 1fr 1fr', gap: 'clamp(1rem, 3vw, 2.5rem)', alignItems: 'center', padding: 'clamp(1.5rem, 4vw, 2.5rem) 0', borderBottom: '1px solid rgba(15,15,14,0.1)', textDecoration: 'none', cursor: 'pointer', position: 'relative' }}
          >
            <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', fontWeight: 500, color: hovered === p.id ? 'var(--accent)' : 'rgba(15,15,14,0.25)', letterSpacing: '0.04em', transition: 'color 0.2s', alignSelf: 'start', paddingTop: '0.2rem' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                <h2 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 400, color: hovered === p.id ? 'var(--accent)' : 'var(--text)', lineHeight: 1.1, transition: 'color 0.2s' }}>{p.name}</h2>
                <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text)', border: '1px solid var(--accent-border)', borderRadius: 999, padding: '0.15rem 0.5rem', background: 'rgba(43,75,255,0.06)' }}>{p.tag}</span>
              </div>
              <p style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', fontWeight: 500, color: 'rgba(15,15,14,0.35)', letterSpacing: '0.04em', marginBottom: '1rem' }}>{p.url}</p>
              <p style={{ fontFamily: 'var(--f-body)', fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', color: 'rgba(15,15,14,0.6)', lineHeight: 1.7, maxWidth: '42ch', marginBottom: '1.25rem' }}>{p.description}</p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {p.stack.map(s => (
                  <span key={s} style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', fontWeight: 400, letterSpacing: '0.04em', padding: '0.2rem 0.5rem', background: 'var(--bg-2)', borderRadius: 999, color: 'var(--text)', border: '1px solid rgba(15,15,14,0.15)' }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{ transform: hovered === p.id ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)', transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)' }}>
              <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(15,15,14,0.1)', boxShadow: hovered === p.id ? '0 24px 64px rgba(0,0,0,0.15), 0 0 0 1px rgba(43,75,255,0.2)' : '0 8px 32px rgba(0,0,0,0.08)', transition: 'box-shadow 0.3s ease' }}>
                <div style={{ height: 32, background: '#2a2a2a', display: 'flex', alignItems: 'center', padding: '0 10px', gap: '5px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57', flexShrink: 0 }} />
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e', flexShrink: 0 }} />
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840', flexShrink: 0 }} />
                  <div style={{ flex: 1, height: 16, background: '#444', borderRadius: 3, margin: '0 6px', display: 'flex', alignItems: 'center', paddingLeft: 6, fontFamily: 'monospace', fontSize: '0.75rem', color: '#888', overflow: 'hidden', whiteSpace: 'nowrap' }}>{p.url}</div>
                </div>
                <div style={{ width: '100%', aspectRatio: '16/9', background: p.light ? '#f5f5f5' : '#1a1a1a', overflow: 'hidden' }}>
                  <img src={p.screenshot} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', filter: hovered === p.id ? 'none' : 'brightness(0.92)', transition: 'filter 0.3s ease' }}
                    onError={e => { const el = e.currentTarget.parentElement!; e.currentTarget.style.display = 'none'; el.style.display = 'flex'; el.style.alignItems = 'center'; el.style.justifyContent = 'center'; el.innerHTML = `<span style="font-family:monospace;font-size:0.65rem;color:rgba(0,0,0,0.3);letter-spacing:0.1em;text-transform:uppercase">${p.url}</span>` }}
                  />
                </div>
              </div>
            </div>
            <div style={{ position: 'absolute', top: 'clamp(1.5rem, 4vw, 2.5rem)', right: 0, fontFamily: 'var(--f-body)', fontSize: '0.75rem', color: hovered === p.id ? 'var(--accent)' : 'rgba(15,15,14,0.2)', transition: 'color 0.2s, transform 0.2s', transform: hovered === p.id ? 'translate(4px, -2px)' : 'translate(0,0)' }}>↗</div>
          </a>
        ))}
      </div>

      {/* MOBILE grid */}
      <div className="mobile-grid" style={{ display: 'none', padding: '1.5rem 1rem 3rem', flexDirection: 'column', gap: '1.5rem' }}>
        {projects.map((p, i) => (
          <a key={p.id} href={p.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none', border: '1px solid rgba(15,15,14,0.12)', borderRadius: '24px', overflow: 'hidden', background: '#ffffff' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: p.light ? '#f0f0f0' : '#1a1a1a', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 28, background: 'rgba(30,30,30,0.95)', zIndex: 2, display: 'flex', alignItems: 'center', padding: '0 10px', gap: '5px' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff5f57', flexShrink: 0 }} />
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#febc2e', flexShrink: 0 }} />
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#28c840', flexShrink: 0 }} />
                <div style={{ flex: 1, height: 14, background: 'rgba(255,255,255,0.1)', borderRadius: 3, margin: '0 6px', display: 'flex', alignItems: 'center', paddingLeft: 6, fontFamily: 'monospace', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', overflow: 'hidden', whiteSpace: 'nowrap' }}>{p.url}</div>
              </div>
              <img src={p.screenshot} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                onError={e => { const el = e.currentTarget.parentElement!; e.currentTarget.style.display = 'none'; el.style.display = 'flex'; el.style.alignItems = 'center'; el.style.justifyContent = 'center'; el.innerHTML += `<span style="font-family:monospace;font-size:0.65rem;color:rgba(0,0,0,0.3);letter-spacing:0.08em;text-transform:uppercase;padding-top:28px">${p.url}</span>` }}
              />
              <div style={{ position: 'absolute', top: 36, left: 12, fontFamily: 'var(--f-body)', fontSize: '0.75rem', fontWeight: 500, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }}>{String(i + 1).padStart(2, '0')}</div>
            </div>
            <div style={{ padding: '1.1rem 1.1rem 1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <h2 style={{ fontFamily: 'var(--f-serif)', fontSize: '1.3rem', fontWeight: 400, color: 'var(--text)', lineHeight: 1.15 }}>{p.name}</h2>
                <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text)', border: '1px solid var(--accent-border)', borderRadius: 999, padding: '0.15rem 0.45rem', background: 'rgba(43,75,255,0.06)', whiteSpace: 'nowrap', flexShrink: 0, marginTop: '0.2rem' }}>{p.tag}</span>
              </div>
              <p style={{ fontFamily: 'var(--f-body)', fontSize: '0.82rem', color: 'rgba(15,15,14,0.6)', lineHeight: 1.65, marginBottom: '1rem' }}>{p.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {p.stack.slice(0, 3).map(s => (
                    <span key={s} style={{ fontFamily: 'var(--f-body)', fontSize: '0.75rem', fontWeight: 400, letterSpacing: '0.04em', padding: '0.18rem 0.45rem', background: 'var(--bg-2)', borderRadius: 999, color: 'var(--text)', border: '1px solid rgba(15,15,14,0.15)' }}>{s}</span>
                  ))}
                </div>
                <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.7rem', color: 'var(--accent)' }}>↗</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* FOOTER CTA */}
      <div style={{ borderTop: '1px solid rgba(15,15,14,0.1)', padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem)', textAlign: 'center', position: 'relative', overflow: 'hidden', background: 'var(--text)' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#C9CCD8', display: 'block', marginBottom: '1.5rem' }}>Want something built?</span>
          <h2 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 400, lineHeight: 1.1, color: '#ffffff', marginBottom: '1.5rem' }}>
            Your business.<br /><em style={{ fontStyle: 'italic', color: '#BFC9FF' }}>Powered by AI.</em>
          </h2>
          <a href="/#contact" style={{ display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--f-body)', fontSize: '1rem', fontWeight: 600, background: '#ffffff', color: 'var(--text)', minHeight: 52, padding: '0 2rem', borderRadius: 999, textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >Book a Strategy Call →</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .desktop-list { display: none !important; }
          .mobile-grid  { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
'@ }

foreach ($f in $files) {
  $target = Join-Path $Root $f.Path
  $dir = Split-Path -Parent $target
  if (-not (Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  [System.IO.File]::WriteAllText($target, $f.Content, $utf8NoBom)
  Write-Host "Wrote $($f.Path)"
}

Write-Host ""
Write-Host "Done. $($files.Count) files written. Run: npm run dev"
