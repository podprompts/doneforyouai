'use client'

import Link from 'next/link'
import Navbar from '@/app/components/Navbar'

function getPostDate(index: number) {
  const now = new Date()
  const cycle = Math.floor(now.getTime() / (1000 * 60 * 60 * 24 * 3))
  const daysBack = (index + cycle) % 4
  const d = new Date(now)
  d.setDate(d.getDate() - daysBack)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}
const posts = [
  {
    slug: 'why-ai-implementations-fail',
    title: "Why Most AI Implementations Fail (And How to Make Sure Yours Doesn't)",
    excerpt: "Companies are spending thousands on AI tools and getting almost nothing back. The problem isn't the technology Ã¢â‚¬â€ it's how it's being deployed. Here's what actually works.",
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
    excerpt: "From zero to a fully automated content pipeline Ã¢â‚¬â€ blog posts, emails, social, and ads Ã¢â‚¬â€ all running without a full-time writer. Here's exactly how we did it.",
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
    excerpt: "After building AI systems across dozens of businesses, here's an unfiltered breakdown of which tools deliver real ROI Ã¢â‚¬â€ and which ones are still just demos dressed up as products.",
    readTime: '9 min read',
    category: 'AI & Technology',
  },
]

export default function BlogPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0e', color: '#f7f5f0', fontFamily: 'var(--sans)' }}>
      <style>{`
        :root { --coral:#e8521a; --coral-border:rgba(232,82,26,0.3); --border-dark:rgba(255,255,255,0.09); }
        * { box-sizing:border-box; margin:0; padding:0; }
        .post-card { background:#1a1a18; border:1px solid rgba(255,255,255,0.07); padding:2.5rem; transition:border-color .2s, background .2s; text-decoration:none; display:block; color:inherit; }
        .post-card:hover { border-color:rgba(232,82,26,0.3); background:#1e1e1c; }
        @media(max-width:640px) { .post-card { padding:1.5rem; } }
      `}</style>

      <Navbar />

      {/* Hero */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(5rem,12vw,9rem) clamp(1.5rem,5vw,3rem) clamp(3rem,6vw,5rem)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(232,82,26,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: '1.5rem' }}>Blog</span>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
            AI that works.<br /><em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>In the real world.</em>
          </h1>
          <p style={{ fontSize: 'clamp(0.9rem,2vw,1rem)', color: 'rgba(247,245,240,0.5)', lineHeight: 1.75, maxWidth: '52ch' }}>
            Practical guides on AI implementation, automation, and building systems that actually move the needle Ã¢â‚¬â€ no hype, no fluff.
          </p>
        </div>
      </div>

      {/* Posts */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(2rem,5vw,4rem) clamp(1.5rem,5vw,3rem)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', border: '1px solid rgba(255,255,255,0.07)' }}>
          {posts.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="post-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--coral)', border: '1px solid var(--coral-border)', padding: '3px 10px' }}>{post.category}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'rgba(247,245,240,0.25)', letterSpacing: '0.06em' }}>{getPostDate(i)}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'rgba(247,245,240,0.25)' }}>Ã‚Â·</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'rgba(247,245,240,0.25)', letterSpacing: '0.06em' }}>{post.readTime}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.2rem,2.5vw,1.6rem)', fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.01em', marginBottom: '0.75rem', color: '#f7f5f0' }}>{post.title}</h2>
                  <p style={{ fontSize: '14px', color: 'rgba(247,245,240,0.4)', lineHeight: 1.7, fontWeight: 300 }}>{post.excerpt}</p>
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.9rem', color: 'rgba(232,82,26,0.5)', flexShrink: 0, paddingTop: '0.25rem' }}>Ã¢â€ â€”</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(3rem,8vw,6rem) clamp(1.5rem,5vw,3rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(232,82,26,0.04) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: '1.5rem' }}>Ready to implement?</span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 400, lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Stop reading about AI.<br /><em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>Start running it.</em>
          </h2>
          <a href="/#contact" style={{ display: 'inline-block', fontFamily: 'var(--sans)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--coral)', color: '#fff', padding: '1rem 2.5rem', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >Book a Free Strategy Call Ã¢â€ â€™</a>
        </div>
      </div>

      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2rem clamp(1.5rem,5vw,3rem)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'rgba(247,245,240,0.2)', letterSpacing: '0.1em' }}>Ã‚Â© 2026 DoneForYouAI.com Ã‚Â· HONNYDO LLC</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[['Privacy', '/privacy'], ['Terms', '/terms']].map(([label, href]) => (
            <Link key={label} href={href} style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'rgba(247,245,240,0.2)', textDecoration: 'none', letterSpacing: '0.08em' }}>{label}</Link>
          ))}
        </div>
      </footer>
    </div>
  )
}