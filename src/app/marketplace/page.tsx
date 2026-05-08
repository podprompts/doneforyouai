'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import OperatorVideoBackground from '@/app/components/media/OperatorVideoBackground'
import { resolveVideoSource, getVideoLabel } from '@/lib/media'
import { supabase } from '@/lib/supabase'

// ── Types ─────────────────────────────────────────────────────────
interface Operator {
  id: string
  name: string
  handle: string
  title: string
  location: string
  avatar: string
  tags: string[]
  specialty: string
  rate: string
  rate_type: string
  rating: number
  reviews: number
  available: boolean
  featured: boolean
  bio: string
  deliverables: string[]
  tier: string
  mux_playback_id?: string
  r2_key?: string
  youtube_url?: string
  avatarColor?: string
}

const AVATAR_COLORS: Record<string, string> = {
  MR: '#e8521a', JO: '#3ecf8e', PN: '#a78bfa',
  DL: '#60a5fa', SM: '#f59e0b', TV: '#f472b6',
}

const COLOR_POOL = ['#e8521a', '#3ecf8e', '#a78bfa', '#60a5fa', '#f59e0b', '#f472b6', '#34d399', '#fb923c']

const specialties = ['All', 'Workflow Automation', 'AI Assistants', 'Content Engines', 'Lead Generation', 'AI Strategy', 'Tool Stack Setup']

const TIER_CONFIG: Record<string, { label: string; color: string; border: string; desc: string }> = {
  basic:     { label: 'Basic',      color: 'rgba(247,245,240,0.3)',  border: 'rgba(247,245,240,0.12)', desc: 'Listed'          },
  free:      { label: 'Basic',      color: 'rgba(247,245,240,0.3)',  border: 'rgba(247,245,240,0.12)', desc: 'Listed'          },
  pro:       { label: 'Pro',        color: '#f59e0b',               border: 'rgba(245,158,11,0.3)',   desc: 'Leads + Priority' },
  elite:     { label: 'Pro',        color: '#f59e0b',               border: 'rgba(245,158,11,0.3)',   desc: 'Leads + Priority' },
  pro_video: { label: 'Pro+Video',  color: '#3ecf8e',               border: 'rgba(62,207,142,0.3)',   desc: 'Leads + Video'   },
}

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

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'var(--ink-2)', border: '1px solid var(--border-dark)',
    padding: '0.75rem 1rem', fontFamily: 'var(--sans)', fontSize: '0.85rem',
    color: 'var(--page)', outline: 'none', transition: 'border-color 0.2s',
  }

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
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: 'rgba(247,245,240,0.45)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              We review applications weekly. You'll hear from us within 5–7 days with next steps and access to your operator dashboard.
            </p>
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
              {form.tier === 'pro_video' && (
                <div style={{ marginTop: '0.5rem', padding: '0.6rem 0.85rem', background: 'rgba(62,207,142,0.06)', border: '1px solid rgba(62,207,142,0.2)' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3ecf8e' }}>✦ Video profile — upload via dashboard after approval</span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', display: 'block', marginBottom: '0.35rem' }}>Name *</label>
                  <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--coral-border)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border-dark)'}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', display: 'block', marginBottom: '0.35rem' }}>Email *</label>
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--coral-border)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border-dark)'}
                  />
                </div>
              </div>
              <div>
                <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', display: 'block', marginBottom: '0.35rem' }}>Website / LinkedIn</label>
                <input type="text" value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} placeholder="https://..." style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--coral-border)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border-dark)'}
                />
              </div>
              <div>
                <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', display: 'block', marginBottom: '0.35rem' }}>Your AI specialties</label>
                <input type="text" value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))} placeholder="e.g. Zapier, Claude, Voiceflow..." style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--coral-border)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border-dark)'}
                />
              </div>
              <div>
                <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', display: 'block', marginBottom: '0.35rem' }}>Tell us about your work</label>
                <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="What kind of AI systems have you built? Who do you work with?" rows={4}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '96px' }}
                  onFocus={e => e.target.style.borderColor = 'var(--coral-border)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border-dark)'}
                />
              </div>
              <button onClick={handleSubmit} disabled={loading || !form.name || !form.email}
                style={{ fontFamily: 'var(--sans)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', background: (!form.name || !form.email || loading) ? 'rgba(232,82,26,0.4)' : 'var(--coral)', color: 'var(--white)', border: 'none', padding: '1rem', cursor: (!form.name || !form.email || loading) ? 'not-allowed' : 'pointer', width: '100%' }}>
                {loading ? 'Submitting...' : 'Submit Application →'}
              </button>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'rgba(247,245,240,0.2)', textAlign: 'center', letterSpacing: '0.06em', lineHeight: 1.6 }}>
                We review applications weekly · Stripe billing activates after approval
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
  const [operators, setOperators] = useState<Operator[]>([])
  const [loading, setLoading] = useState(true)

  // ── Pull live operators from Supabase ─────────────────────────
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
      op.specialty?.toLowerCase().includes(search.toLowerCase()) ||
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
            <button key={s} onClick={() => setActiveFilter(s)} style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.4rem 0.85rem', whiteSpace: 'nowrap', border: '1px solid', borderColor: activeFilter === s ? 'var(--coral)' : 'var(--border-dark)', background: activeFilter === s ? 'var(--coral)' : 'transparent', color: activeFilter === s ? 'var(--white)' : 'rgba(247,245,240,0.4)', cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0 }}>{s}</button>
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

        {/* Loading skeletons */}
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ height: 80, background: 'var(--ink-2)', border: '1px solid var(--border-dark)', animation: 'pulse-dot 1.5s ease-in-out infinite', animationDelay: `${i * 0.1}s` }} />
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
                <OperatorCard key={op.id} op={op} active={activeCard === op.id} onToggle={() => setActiveCard(activeCard === op.id ? null : op.id)} onApply={() => setShowWaitlist(true)} featured />
              ))}
            </div>
          </>
        )}

        {!loading && rest.length > 0 && (
          <>
            {featured.length > 0 && <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.25)', marginBottom: '0.85rem' }}>All operators</div>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              {rest.map(op => (
                <OperatorCard key={op.id} op={op} active={activeCard === op.id} onToggle={() => setActiveCard(activeCard === op.id ? null : op.id)} onApply={() => setShowWaitlist(true)} />
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
            Apply for your tier — Basic (free), Pro ($49/mo), or Pro + Video ($79/mo). Approved operators get listed, leads routed, and dashboard access.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <button onClick={() => setShowWaitlist(true)} style={{ fontFamily: 'var(--sans)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--coral)', color: 'var(--white)', border: 'none', padding: '0.85rem 2rem', cursor: 'pointer' }}>
              Apply to Join →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── OPERATOR CARD ─────────────────────────────────────────────────
// ── OPERATOR CARD — Option 1: full-bleed video + frosted glass content panel ─
function OperatorCard({ op, active, onToggle, onApply, featured = false }: {
  op: Operator; active: boolean; onToggle: () => void; onApply: () => void; featured?: boolean
}) {
  const videoSource = resolveVideoSource({ r2Key: op.r2_key, muxPlaybackId: op.mux_playback_id, youtubeUrl: op.youtube_url })
  const hasVideo    = Boolean(videoSource)
  const videoLabel  = getVideoLabel(videoSource)
  const tier        = TIER_CONFIG[op.tier] || TIER_CONFIG.pro
  const avatarColor = op.avatarColor || AVATAR_COLORS[op.avatar] || '#e8521a'

  return (
    <div style={{
      position: 'relative',
      background: active ? 'var(--ink-2)' : featured ? 'rgba(232,82,26,0.04)' : 'var(--ink)',
      border: `1px solid ${active ? 'var(--coral-border)' : featured ? 'rgba(232,82,26,0.15)' : 'var(--border-dark)'}`,
      transition: 'background 0.3s, border-color 0.3s',
      marginBottom: '1px',
      // Taller when video is active so the video has room to breathe
      minHeight: active && hasVideo ? 460 : undefined,
      overflow: 'hidden',
    }}>

      {/* Full-bleed video layer */}
      <OperatorVideoBackground source={videoSource} active={active && hasVideo} opacity={0.28} />

      {/* All card content — sits above video */}
      <div style={{ position: 'relative', zIndex: 3 }}>

        {/* ── Header row — always visible, click toggles ── */}
        <div onClick={onToggle} style={{
          display: 'grid', gridTemplateColumns: 'auto 1fr auto',
          gap: 'clamp(0.75rem, 3vw, 1.25rem)',
          padding: 'clamp(1rem, 4vw, 1.5rem)',
          cursor: 'pointer', alignItems: 'center',
          // When video is active, add a subtle dark scrim behind the header too
          background: active && hasVideo ? 'rgba(15,15,14,0.45)' : 'transparent',
          backdropFilter: active && hasVideo ? 'blur(4px)' : 'none',
          transition: 'background 0.5s',
        }}>
          {/* Avatar */}
          <div style={{ width: 'clamp(40px, 10vw, 52px)', height: 'clamp(40px, 10vw, 52px)', borderRadius: '50%', background: avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 'clamp(0.7rem, 2.5vw, 0.85rem)', color: 'var(--white)', flexShrink: 0, opacity: op.available ? 1 : 0.5, position: 'relative' }}>
            {op.avatar}
            {op.available && <span style={{ position: 'absolute', bottom: 2, right: 2, width: 8, height: 8, background: '#3ecf8e', borderRadius: '50%', border: '1.5px solid var(--ink)' }} />}
          </div>

          {/* Name / title / tags */}
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)', color: 'var(--page)' }}>{op.name}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, color: 'rgba(247,245,240,0.3)' }}>@{op.handle}</span>
              {featured && <span style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--coral)', border: '1px solid var(--coral-border)', padding: '0.1rem 0.4rem' }}>Featured</span>}
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: tier.color, border: `1px solid ${tier.border}`, padding: '0.1rem 0.4rem' }}>{tier.label}</span>
              {op.tier === 'pro_video' && (
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#3ecf8e', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span style={{ fontSize: '0.5rem' }}>▶</span> video
                </span>
              )}
              {hasVideo && active && (
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.7)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: 4, height: 4, background: 'var(--coral)', borderRadius: '50%', animation: 'pulse-dot 1.5s infinite' }} />
                  {videoLabel}
                </span>
              )}
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(0.75rem, 2vw, 0.82rem)', color: 'rgba(247,245,240,0.55)', marginBottom: '0.5rem' }}>{op.title} · {op.location}</div>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {(op.tags || []).slice(0, 3).map(tag => (
                <span key={tag} style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.06em', padding: '0.2rem 0.5rem', background: 'var(--ink-3)', color: 'rgba(247,245,240,0.45)', border: '1px solid var(--border-dark)' }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Rate + rating */}
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 400, color: 'var(--page)', lineHeight: 1 }}>{op.rate}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, color: 'rgba(247,245,240,0.3)', marginBottom: '0.35rem' }}>{op.rate_type}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, color: '#3ecf8e' }}>★ {op.rating} ({op.reviews})</div>
          </div>
        </div>

        {/* ── Expanded panel ── */}
        {active && (
          <div style={{
            // When video is playing: frosted glass panel at the bottom of the card
            // When no video: normal panel with border
            ...(hasVideo ? {
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              background: 'rgba(15,15,14,0.78)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderTop: '1px solid rgba(247,245,240,0.08)',
            } : {
              borderTop: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.02)',
            }),
            padding: 'clamp(1rem, 4vw, 1.5rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            // Always 100% readable — no opacity ghosting
            opacity: 1,
          }}>
            <div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.4)', display: 'block', marginBottom: '0.5rem' }}>About</span>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: 'rgba(247,245,240,0.85)', lineHeight: 1.7 }}>{op.bio}</p>
              <div style={{ marginTop: '1rem' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.4)', display: 'block', marginBottom: '0.5rem' }}>What you get</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {(op.deliverables || []).map((d, i) => (
                    <span key={i} style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', color: 'rgba(247,245,240,0.8)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--coral)', fontSize: '0.6rem' }}>◆</span>{d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.4)' }}>Connect</span>
              <button style={{ fontFamily: 'var(--sans)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: op.available ? 'var(--coral)' : 'rgba(247,245,240,0.08)', color: op.available ? 'var(--white)' : 'rgba(247,245,240,0.25)', border: 'none', padding: '0.85rem 1.5rem', cursor: op.available ? 'pointer' : 'not-allowed', width: '100%', textAlign: 'left' }}>
                {op.available ? 'Book a Strategy Call →' : 'Currently Unavailable'}
              </button>
              {op.available && (
                <button style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300, letterSpacing: '0.08em', background: 'transparent', color: 'rgba(247,245,240,0.6)', border: '1px solid rgba(255,255,255,0.12)', padding: '0.85rem 1.5rem', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
                  Send a message →
                </button>
              )}
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.06em', color: 'rgba(247,245,240,0.25)', lineHeight: 1.6 }}>
                All operators are vetted<br />by the DoneForYouAI team.
              </div>
            </div>
          </div>
        )}

        {/* Close hint — bottom right, above the frosted panel */}
        {active && hasVideo && (
          <div onClick={onToggle}
            style={{
              position: 'absolute',
              // sits just above the frosted panel
              bottom: 'calc(100% - 100% + 0.75rem)',
              right: '1.25rem',
              zIndex: 10,
              fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'rgba(247,245,240,0.5)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.35rem 0.75rem',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(15,15,14,0.60)',
              backdropFilter: 'blur(8px)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--page)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(247,245,240,0.5)'}
          >
            ✕ close
          </div>
        )}
      </div>
    </div>
  )
}