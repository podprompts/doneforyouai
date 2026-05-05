'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase, type OperatorRow } from '@/lib/supabase'
import ProfileTab from './components/ProfileTab'
import VideoTab from './components/VideoTab'
import StatsTab from './components/StatsTab'
import AvailabilityTab from './components/AvailabilityTab'

// ─────────────────────────────────────────────────────────────────
// OPERATOR DASHBOARD — /dashboard
//
// Fetches the operator row from Supabase on load using the
// logged-in user's ID. Falls back to mock data if Supabase
// is not yet configured (env vars missing).
//
// To fully activate:
//   1. Run schema.sql in your Supabase SQL Editor
//   2. Add NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY
//      to .env.local
//   3. Set up Supabase Auth for operator logins
// ─────────────────────────────────────────────────────────────────

const MOCK_OPERATOR = {
  id: 'mock-id',
  name: 'Maya Reeves',
  handle: 'mayabuilds',
  title: 'AI Automation Architect',
  location: 'Austin, TX',
  bio: 'I build end-to-end automation systems that eliminate manual work.',
  rate: '2400',
  rate_type: 'per project',
  specialty: 'Workflow Automation',
  tags: ['Automation', 'Zapier', 'Make', 'n8n'],
  deliverables: ['Workflow audit', 'Full build + testing', 'Team handoff doc'],
  available: true,
  featured: true,
  approved: true,
  tier: 'pro' as const,
  avatar: 'MR',
  rating: 4.9,
  reviews: 34,
  r2_key: null,
  mux_playback_id: null,
  youtube_url: '',
  capacity: '2 projects',
  response_time: 'Within 24 hours',
  project_duration: '2–4 weeks',
  availability_note: '',
  profile_views: 284,
  card_expands: 91,
  call_bookings: 12,
  messages_sent: 7,
  views_this_week: 43,
  expands_this_week: 14,
}

type Tab = 'profile' | 'video' | 'stats' | 'availability'

const tabs: { id: Tab; label: string; proOnly?: boolean }[] = [
  { id: 'profile',      label: 'Profile' },
  { id: 'video',        label: 'Video Reel', proOnly: true },
  { id: 'stats',        label: 'Stats' },
  { id: 'availability', label: 'Availability' },
]

const tierColors = {
  free:  { bg: 'rgba(247,245,240,0.06)', color: 'rgba(247,245,240,0.4)', label: 'Free' },
  pro:   { bg: 'rgba(232,82,26,0.12)',   color: 'var(--coral)',           label: 'Pro' },
  elite: { bg: 'rgba(62,207,142,0.12)',  color: '#3ecf8e',               label: 'Elite' },
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const [operator, setOperator] = useState<typeof MOCK_OPERATOR>(MOCK_OPERATOR)
  const [loading, setLoading] = useState(true)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const isSupabaseConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL)

  useEffect(() => {
    if (!isSupabaseConfigured) { setLoading(false); return }
    fetchOperator()
  }, [])

  const fetchOperator = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

      const { data, error } = await supabase
        .from('operators')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error) throw error
      if (data) {
        // Map snake_case DB columns to camelCase for components
        setOperator({
          ...data,
          rate: data.rate || '',
          youtube_url: data.youtube_url || '',
          r2_key: data.r2_key || null,
          mux_playback_id: data.mux_playback_id || null,
          profile_views: data.profile_views || 0,
          card_expands: data.card_expands || 0,
          call_bookings: data.call_bookings || 0,
          messages_sent: data.messages_sent || 0,
          views_this_week: data.views_this_week || 0,
          expands_this_week: data.expands_this_week || 0,
        })
      }
    } catch (err) {
      console.error('[Dashboard] Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  // ── SAVE HANDLER — called by every tab's save button ──────────
  const handleSave = async (updates: Record<string, any>) => {
    setSaveStatus('saving')
    try {
      if (isSupabaseConfigured && operator.id !== 'mock-id') {
        // Map any camelCase keys back to snake_case for Supabase
        const dbUpdates: Record<string, any> = {}
        const keyMap: Record<string, string> = {
          rateType:         'rate_type',
          r2Key:            'r2_key',
          muxPlaybackId:    'mux_playback_id',
          youtubeUrl:       'youtube_url',
          responseTime:     'response_time',
          projectDuration:  'project_duration',
          availabilityNote: 'availability_note',
        }
        for (const [key, value] of Object.entries(updates)) {
          dbUpdates[keyMap[key] || key] = value
        }

        const { error } = await supabase
          .from('operators')
          .update(dbUpdates)
          .eq('id', operator.id)

        if (error) throw error
      }

      // Always update local state so UI reflects changes immediately
      setOperator(prev => ({ ...prev, ...updates }))
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2500)
    } catch (err) {
      console.error('[Dashboard] Save error:', err)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }

  const isPro = operator.tier === 'pro' || operator.tier === 'elite'
  const tier = tierColors[operator.tier]

  if (loading) {
    return (
      <div style={{
        background: 'var(--ink)', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'rgba(247,245,240,0.25)',
          animation: 'pulse-dot 1.5s infinite',
        }}>Loading...</span>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--ink)', minHeight: '100vh', fontFamily: 'var(--sans)' }}>

      {/* NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.5rem', height: 56,
        background: 'rgba(15,15,14,0.97)',
        borderBottom: '1px solid var(--border-dark)',
        backdropFilter: 'blur(12px)',
      }}>
        <Link href="/" style={{
          fontFamily: 'var(--sans)', fontWeight: 800, fontSize: '0.82rem',
          letterSpacing: '0.06em', textTransform: 'uppercase',
          color: 'rgba(247,245,240,0.45)', textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
        }}>
          <span style={{ width: 6, height: 6, background: 'var(--coral)', borderRadius: '50%' }} />
          DFYAI
        </Link>

        <span style={{
          fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'rgba(247,245,240,0.3)',
        }}>Operator Dashboard</span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {saveStatus !== 'idle' && (
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300,
              letterSpacing: '0.08em',
              color: saveStatus === 'saved' ? '#3ecf8e' : saveStatus === 'error' ? '#e53e3e' : 'rgba(247,245,240,0.35)',
              transition: 'color 0.3s',
            }}>
              {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? '✓ Saved' : '✕ Error — try again'}
            </span>
          )}
          {!isSupabaseConfigured && (
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300,
              letterSpacing: '0.08em', color: 'var(--coral)',
              border: '1px solid var(--coral-border)', padding: '0.2rem 0.5rem',
            }}>Demo mode</span>
          )}
          <Link href="/marketplace" style={{
            fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'rgba(247,245,240,0.35)', textDecoration: 'none',
            border: '1px solid var(--border-dark)',
            padding: '0.4rem 0.85rem', transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--page)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(247,245,240,0.35)'; e.currentTarget.style.borderColor = 'var(--border-dark)' }}
          >
            View Profile →
          </Link>
        </div>
      </nav>

      {/* HEADER */}
      <div style={{
        padding: '2.5rem 1.5rem 0',
        borderBottom: '1px solid var(--border-dark)',
        maxWidth: 860, margin: '0 auto',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap',
        }}>
          {/* Avatar */}
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'var(--coral)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--sans)', fontWeight: 700, fontSize: '0.9rem',
            color: 'var(--white)', flexShrink: 0,
          }}>
            {operator.name.split(' ').map((n: string) => n[0]).join('')}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: '1rem', color: 'var(--page)' }}>
                {operator.name}
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300, color: 'rgba(247,245,240,0.3)' }}>
                @{operator.handle}
              </span>
              <span style={{
                fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                background: tier.bg, color: tier.color,
                padding: '0.2rem 0.6rem', border: `1px solid ${tier.color}44`,
              }}>{tier.label}</span>
              <span style={{
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300,
                color: operator.available ? '#3ecf8e' : 'rgba(247,245,240,0.25)',
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: operator.available ? '#3ecf8e' : 'rgba(247,245,240,0.2)',
                  animation: operator.available ? 'pulse-dot 2s infinite' : 'none',
                }} />
                {operator.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
            <div style={{
              fontFamily: 'var(--sans)', fontSize: '0.82rem',
              color: 'rgba(247,245,240,0.4)', marginTop: '0.2rem',
            }}>{operator.title} · {operator.location}</div>
          </div>

          {(operator.tier as string) === 'free' && (
            <button style={{
              fontFamily: 'var(--sans)', fontSize: '0.72rem', fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              background: 'var(--coral)', color: 'var(--white)',
              border: 'none', padding: '0.6rem 1.25rem', cursor: 'pointer', flexShrink: 0,
            }}>Upgrade to Pro →</button>
          )}
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', gap: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '0.85rem 1.25rem',
              background: 'transparent', border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid var(--coral)' : '2px solid transparent',
              color: activeTab === tab.id ? 'var(--page)' : 'rgba(247,245,240,0.35)',
              cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color 0.2s',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
            }}>
              {tab.label}
              {tab.proOnly && !isPro && (
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: '0.5rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--coral)', border: '1px solid var(--coral-border)',
                  padding: '0.1rem 0.3rem',
                }}>Pro</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        {activeTab === 'profile' && (
          <ProfileTab
            operator={{
              name: operator.name,
              handle: operator.handle,
              title: operator.title || '',
              location: operator.location || '',
              bio: operator.bio || '',
              rate: operator.rate || '',
              rateType: operator.rate_type || 'per project',
              tags: operator.tags || [],
              specialty: operator.specialty || '',
            }}
            onSave={handleSave}
          />
        )}
        {activeTab === 'video' && (
          <VideoTab
            operator={{
              handle: operator.handle,
              r2Key: operator.r2_key || '',
              muxPlaybackId: operator.mux_playback_id || '',
              youtubeUrl: operator.youtube_url || '',
              tier: operator.tier,
            }}
            onSave={handleSave}
            isPro={isPro}
          />
        )}
        {activeTab === 'stats' && (
          <StatsTab
            operator={{
              tier: operator.tier,
              stats: {
                profileViews:    operator.profile_views || 0,
                cardExpands:     operator.card_expands || 0,
                callBookings:    operator.call_bookings || 0,
                messagesSent:    operator.messages_sent || 0,
                viewsThisWeek:   operator.views_this_week || 0,
                expandsThisWeek: operator.expands_this_week || 0,
              },
            }}
          />
        )}
        {activeTab === 'availability' && (
          <AvailabilityTab
            operator={{
              available: operator.available,
              tier: operator.tier,
            }}
            onSave={handleSave}
          />
        )}
        
      </div>
    </div>
  )
}
