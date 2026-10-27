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