'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { OperatorCard, type OperatorCardData } from '@/app/components/OperatorCard'

const AVATAR_COLORS: Record<string, string> = {
  MR: '#e8521a', JO: '#3ecf8e', PN: '#a78bfa',
  DL: '#60a5fa', SM: '#f59e0b', TV: '#f472b6',
}
const COLOR_POOL = ['#e8521a', '#3ecf8e', '#a78bfa', '#60a5fa', '#f59e0b', '#f472b6', '#34d399', '#fb923c']

const specialties = ['All', 'Workflow Automation', 'AI Assistants', 'Content Engines', 'Lead Generation', 'AI Strategy', 'Tool Stack Setup']

// ── Waitlist Modal ────────────────────────────────────────────────
function WaitlistModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', website: '', skills: '', message: '', tier: 'pro' })

  const handleSubmit = async () => {
    if (!form.name || !form.email) return
    setLoading(true)
    try {
      const { error } = await supabase.from('operator_applications').insert({
        name: form.name, email: form.email,
        website: form.website || null, skills: form.skills || null,
        message: form.message || null, tier: form.tier,
        status: 'pending', created_at: new Date().toISOString(),
      })
      if (error) throw error
      setStep('success')
    } catch (e) {
      console.error('Waitlist error:', e)
    } finally {
      setLoading(false)
    }
  }

  const inp: React.CSSProperties = { width: '100%', background: 'var(--ink-2)', border: '1px solid var(--border-dark)', padding: '0.75rem 1rem', fontFamily: 'var(--sans)', fontSize: '0.85rem', color: 'var(--page)', outline: 'none', transition: 'border-color 0.2s' }

  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(15,15,14,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.25rem', backdropFilter: 'blur(8px)' }}
    >
      <div style={{ background: 'var(--ink)', border: '1px solid var(--border-dark)', width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ background: 'var(--ink-2)', padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-dark)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: '0.35rem' }}>Join the network</span>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--page)' }}>Apply as an Operator</h3>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'rgba(247,245,240,0.3)', cursor: 'pointer', fontSize: '1.2rem', padding: '0.25rem' }}>✕</button>
        </div>

        {step === 'success' ? (
          <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', border: '1px solid var(--coral-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--coral)', fontSize: '1.3rem' }}>✓</div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', fontWeight: 400, color: 'var(--page)', marginBottom: '0.75rem' }}>You're on the list.</h3>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: 'rgba(247,245,240,0.45)', lineHeight: 1.75, marginBottom: '1.5rem' }}>We review applications weekly. You'll hear from us within 5–7 days.</p>
            <button onClick={onClose} style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', border: '1px solid var(--border-dark)', color: 'rgba(247,245,240,0.4)', padding: '0.65rem 1.25rem', cursor: 'pointer' }}>
              Back to marketplace →
            </button>
          </div>
        ) : (
          <div style={{ padding: '2rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', display: 'block', marginBottom: '0.75rem' }}>Choose your plan</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {[
                  { value: 'basic',     label: 'Basic',       price: 'Free',   perks: ['Listed profile', 'No leads routed'] },
                  { value: 'pro',       label: 'Pro',         price: '$49/mo', perks: ['Leads routed', 'Priority placement'] },
                  { value: 'pro_video', label: 'Pro + Video', price: '$79/mo', perks: ['Everything in Pro', 'Video profile'] },
                ].map(t => (
                  <div key={t.value} onClick={() => setForm(f => ({ ...f, tier: t.value }))}
                    style={{ border: `1px solid ${form.tier === t.value ? 'var(--coral)' : 'var(--border-dark)'}`, padding: '0.85rem', cursor: 'pointer', background: form.tier === t.value ? 'rgba(232,82,26,0.06)' : 'transparent', transition: 'all 0.15s' }}
                  >
                    <div style={{ fontFamily: 'var(--sans)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--page)', marginBottom: '0.2rem' }}>{t.label}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--coral)', marginBottom: '0.5rem' }}>{t.price}</div>
                    {t.perks.map(p => <div key={p} style={{ fontFamily: 'var(--sans)', fontSize: '0.68rem', color: 'rgba(247,245,240,0.35)', lineHeight: 1.5 }}>· {p}</div>)}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', display: 'block', marginBottom: '0.35rem' }}>Name *</label>
                  <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" style={inp} onFocus={e => e.target.style.borderColor = 'var(--coral-border)'} onBlur={e => e.target.style.borderColor = 'var(--border-dark)'} />
                </div>
                <div>
                  <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', display: 'block', marginBottom: '0.35rem' }}>Email *</label>
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com" style={inp} onFocus={e => e.target.style.borderColor = 'var(--coral-border)'} onBlur={e => e.target.style.borderColor = 'var(--border-dark)'} />
                </div>
              </div>
              <div>
                <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', display: 'block', marginBottom: '0.35rem' }}>Website / LinkedIn</label>
                <input type="text" value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} placeholder="https://..." style={inp} onFocus={e => e.target.style.borderColor = 'var(--coral-border)'} onBlur={e => e.target.style.borderColor = 'var(--border-dark)'} />
              </div>
              <div>
                <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', display: 'block', marginBottom: '0.35rem' }}>Your AI specialties</label>
                <input type="text" value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))} placeholder="e.g. Zapier, Claude, Voiceflow..." style={inp} onFocus={e => e.target.style.borderColor = 'var(--coral-border)'} onBlur={e => e.target.style.borderColor = 'var(--border-dark)'} />
              </div>
              <div>
                <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', display: 'block', marginBottom: '0.35rem' }}>Tell us about your work</label>
                <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="What kind of AI systems have you built?" rows={4} style={{ ...inp, resize: 'vertical', minHeight: '96px' }} onFocus={e => e.target.style.borderColor = 'var(--coral-border)'} onBlur={e => e.target.style.borderColor = 'var(--border-dark)'} />
              </div>
              <button onClick={handleSubmit} disabled={loading || !form.name || !form.email}
                style={{ fontFamily: 'var(--sans)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', background: (!form.name || !form.email || loading) ? 'rgba(232,82,26,0.4)' : 'var(--coral)', color: '#fff', border: 'none', padding: '1rem', cursor: (!form.name || !form.email || loading) ? 'not-allowed' : 'pointer', width: '100%' }}>
                {loading ? 'Submitting...' : 'Submit Application →'}
              </button>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'rgba(247,245,240,0.2)', textAlign: 'center', letterSpacing: '0.06em', lineHeight: 1.6 }}>
                Reviews weekly · Stripe billing activates after approval
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────
export default function Marketplace() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [availableOnly, setAvailableOnly] = useState(false)
  const [search, setSearch] = useState('')
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const [showWaitlist, setShowWaitlist] = useState(false)
  const [operators, setOperators] = useState<OperatorCardData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const { data, error } = await supabase
          .from('operators')
          .select('id, name, handle, title, location, avatar, tags, specialty, rate, rate_type, rating, reviews, available, featured, bio, deliverables, tier, mux_playback_id, r2_key, youtube_url')
          .eq('approved', true)
          .order('featured', { ascending: false })
          .order('rating', { ascending: false })

        if (error) throw error
        if (data) {
          setOperators(data.map((op, i) => ({
            ...op,
            avatarColor: AVATAR_COLORS[op.avatar] || COLOR_POOL[i % COLOR_POOL.length],
            tier: op.tier || 'pro',
            tags: op.tags || [],
            deliverables: op.deliverables || [],
            mux_playback_id: op.mux_playback_id || '',
            r2_key: op.r2_key || '',
            youtube_url: op.youtube_url || '',
          })))
        }
      } catch (err) {
        console.error('[Marketplace] fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchOperators()
  }, [])

  const filtered = operators.filter(op => {
    const matchSpec   = activeFilter === 'All' || op.specialty === activeFilter
    const matchAvail  = !availableOnly || op.available
    const matchSearch = !search ||
      op.name.toLowerCase().includes(search.toLowerCase()) ||
      (op.specialty || '').toLowerCase().includes(search.toLowerCase()) ||
      op.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    return matchSpec && matchAvail && matchSearch
  })

  const featured = filtered.filter(o => o.featured)
  const rest      = filtered.filter(o => !o.featured)

  return (
    <div style={{ background: 'var(--ink)', minHeight: '100vh', fontFamily: 'var(--sans)' }}>

      {showWaitlist && <WaitlistModal onClose={() => setShowWaitlist(false)} />}

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.25rem', height: 56, background: 'rgba(15,15,14,0.97)', borderBottom: '1px solid var(--border-dark)', backdropFilter: 'blur(12px)' }}>
        <Link href="/" style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.5)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: 6, height: 6, background: 'var(--coral)', borderRadius: '50%' }} />
          DFYAI
        </Link>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--coral)' }}>Operator Marketplace</span>
        <button onClick={() => setShowWaitlist(true)} style={{ fontFamily: 'var(--sans)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)', background: 'var(--coral)', border: 'none', padding: '0.45rem 1rem', cursor: 'pointer' }}>
          Join as Operator
        </button>
      </nav>

      {/* HERO */}
      <div style={{ padding: 'clamp(3rem, 8vw, 6rem) 1.25rem clamp(2rem, 5vw, 4rem)', borderBottom: '1px solid var(--border-dark)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(232,82,26,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 640 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--coral)', border: '1px solid var(--coral-border)', padding: '0.35rem 0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ width: 5, height: 5, background: 'var(--coral)', borderRadius: '50%', animation: 'pulse-dot 2s infinite' }} />
            {loading ? '...' : `${operators.filter(o => o.available).length} operators available now`}
          </div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 400, lineHeight: 1.08, marginBottom: '1rem' }}>
            Find your<br />
            <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>AI operator.</em>
          </h1>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)', color: 'rgba(247,245,240,0.45)', lineHeight: 1.75, maxWidth: '42ch' }}>
            Independent AI specialists who build, deploy, and run AI systems inside your business. Vetted by DoneForYouAI. Ready to work.
          </p>
        </div>
      </div>

      {/* SEARCH + FILTERS */}
      <div style={{ position: 'sticky', top: 56, zIndex: 90, background: 'rgba(15,15,14,0.97)', borderBottom: '1px solid var(--border-dark)', backdropFilter: 'blur(12px)', padding: '0.85rem 1.25rem' }}>
        <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
          <span style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'rgba(247,245,240,0.25)' }}>⌕</span>
          <input type="text" placeholder="Search by skill, tool, or specialty..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', background: 'var(--ink-2)', border: '1px solid var(--border-dark)', color: 'var(--page)', fontFamily: 'var(--sans)', fontSize: '0.85rem', padding: '0.65rem 0.85rem 0.65rem 2.25rem', outline: 'none', transition: 'border-color 0.2s' }}
            onFocus={e => e.target.style.borderColor = 'var(--coral-border)'}
            onBlur={e => e.target.style.borderColor = 'var(--border-dark)'}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '2px', scrollbarWidth: 'none' }}>
          {specialties.map(s => (
            <button key={s} onClick={() => setActiveFilter(s)} style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.4rem 0.85rem', whiteSpace: 'nowrap', border: '1px solid', borderColor: activeFilter === s ? 'var(--coral)' : 'var(--border-dark)', background: activeFilter === s ? 'var(--coral)' : 'transparent', color: activeFilter === s ? '#fff' : 'rgba(247,245,240,0.4)', cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0 }}>{s}</button>
          ))}
          <button onClick={() => setAvailableOnly(!availableOnly)} style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.4rem 0.85rem', whiteSpace: 'nowrap', border: '1px solid', borderColor: availableOnly ? '#3ecf8e' : 'var(--border-dark)', background: availableOnly ? 'rgba(62,207,142,0.12)' : 'transparent', color: availableOnly ? '#3ecf8e' : 'rgba(247,245,240,0.4)', cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0, marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: availableOnly ? '#3ecf8e' : 'rgba(247,245,240,0.2)' }} />
            Available now
          </button>
        </div>
      </div>

      {/* RESULTS */}
      <div style={{ padding: '1.5rem 1.25rem', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.25)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ color: 'var(--coral)' }}>{loading ? '...' : filtered.length}</span> operators found
          <span style={{ flex: 1, height: '0.5px', background: 'var(--border-dark)' }} />
        </div>

        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ height: 80, background: 'var(--ink-2)', border: '1px solid var(--border-dark)', opacity: 0.5 }} />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 1.25rem', fontFamily: 'var(--serif)', fontSize: '1.4rem', color: 'rgba(247,245,240,0.25)' }}>
            No operators match that search.
          </div>
        )}

        {!loading && featured.length > 0 && (
          <>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 5, height: 5, background: 'var(--coral)', borderRadius: '50%' }} />
              Featured operators
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginBottom: '2rem' }}>
              {featured.map(op => (
                <OperatorCard key={op.id} op={op} active={activeCard === op.id} onToggle={() => setActiveCard(activeCard === op.id ? null : op.id)} showViewProfile={false} featured />
              ))}
            </div>
          </>
        )}

        {!loading && rest.length > 0 && (
          <>
            {featured.length > 0 && <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.25)', marginBottom: '0.85rem' }}>All operators</div>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              {rest.map(op => (
                <OperatorCard key={op.id} op={op} active={activeCard === op.id} onToggle={() => setActiveCard(activeCard === op.id ? null : op.id)} showViewProfile={false} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* JOIN CTA */}
      <div style={{ margin: '2rem auto 4rem', maxWidth: 860, border: '1px solid var(--border-dark)', padding: 'clamp(2rem, 6vw, 3.5rem) clamp(1.5rem, 5vw, 3rem)', position: 'relative', overflow: 'hidden', marginLeft: '1.25rem', marginRight: '1.25rem' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 'clamp(4rem, 15vw, 10rem)', color: 'rgba(255,255,255,0.025)', lineHeight: 1, letterSpacing: '-0.05em', pointerEvents: 'none', userSelect: 'none' }}>OP</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: '1rem' }}>Are you an AI operator?</span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 400, lineHeight: 1.15, marginBottom: '0.85rem' }}>
            Join the waitlist.<br />
            <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>Get found. Get hired.</em>
          </h2>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: 'rgba(247,245,240,0.4)', lineHeight: 1.7, maxWidth: '44ch', marginBottom: '1.5rem' }}>
            Apply for Basic (free), Pro ($49/mo), or Pro + Video ($79/mo). Approved operators get listed, leads routed, and dashboard access.
          </p>
          <button onClick={() => setShowWaitlist(true)} style={{ fontFamily: 'var(--sans)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--coral)', color: '#fff', border: 'none', padding: '0.85rem 2rem', cursor: 'pointer' }}>
            Apply to Join →
          </button>
        </div>
      </div>
    </div>
  )
}