'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase, type ExpertRow } from '@/lib/supabase'
import ProfileTab from './components/ProfileTab'
import VideoTab from './components/VideoTab'
import StatsTab from './components/StatsTab'
import AvailabilityTab from './components/AvailabilityTab'

// ── Expert DASHBOARD ─────────────────────────────────────────────
// Saves by handle — no auth required for now.
// Set DASHBOARD_HANDLE in .env.local to your Expert handle.
// e.g. NEXT_PUBLIC_DASHBOARD_HANDLE=mayabuilds
// ──────────────────────────────────────────────────────────────────

const DASHBOARD_HANDLE = process.env.NEXT_PUBLIC_DASHBOARD_HANDLE || 'mayabuilds'

const MOCK_Expert = {
  id: '',
  name: 'Maya Reeves',
  handle: DASHBOARD_HANDLE,
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
  r2_key: null as string | null,
  mux_playback_id: null as string | null,
  youtube_url: 'https://www.youtube.com/watch?v=1dga9Qxx_co',
  capacity: '2 projects',
  response_time: 'Within 24 hours',
  project_duration: '2–4 weeks',
  availability_note: '',
  profile_views: 0,
  card_expands: 0,
  call_bookings: 0,
  messages_sent: 0,
  views_this_week: 0,
  expands_this_week: 0,
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
  const [Expert, setExpert] = useState(MOCK_Expert)
  const [loading, setLoading] = useState(true)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  useEffect(() => { fetchExpert() }, [])

  const fetchExpert = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('operators')
        .select('*')
        .eq('handle', DASHBOARD_HANDLE)
        .single()

      if (error) throw error
      if (data) {
        setExpert({
          ...MOCK_Expert,
          ...data,
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

  const handleSave = async (updates: Record<string, any>) => {
    setSaveStatus('saving')
    try {
      // Map camelCase → snake_case for Supabase
      const keyMap: Record<string, string> = {
        rateType:         'rate_type',
        r2Key:            'r2_key',
        muxPlaybackId:    'mux_playback_id',
        youtubeUrl:       'youtube_url',
        responseTime:     'response_time',
        projectDuration:  'project_duration',
        availabilityNote: 'availability_note',
      }
      const dbUpdates: Record<string, any> = {}
      for (const [key, value] of Object.entries(updates)) {
        dbUpdates[keyMap[key] || key] = value
      }

      const { error } = await supabase
        .from('operators')
        .update(dbUpdates)
        .eq('handle', DASHBOARD_HANDLE)

      if (error) throw error

      // Update local state to reflect immediately
      setExpert(prev => ({ ...prev, ...updates }))
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2500)
    } catch (err) {
      console.error('[Dashboard] Save error:', err)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }

  const isPro = Expert.tier === 'pro' || Expert.tier === 'elite'
  const tier = tierColors[Expert.tier]

  if (loading) {
    return (
      <div style={{
        background: 'var(--ink)', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'rgba(247,245,240,0.25)', animation: 'pulse-dot 1.5s infinite',
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Save status */}
          {saveStatus !== 'idle' && (
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300,
              letterSpacing: '0.08em',
              color: saveStatus === 'saved' ? '#3ecf8e' : saveStatus === 'error' ? '#e53e3e' : 'rgba(247,245,240,0.4)',
            }}>
              {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? '✓ Saved to Supabase' : '✗ Save failed'}
            </span>
          )}

          {/* Tier badge */}
          <span style={{
            fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '0.25rem 0.6rem',
            background: tier.bg, color: tier.color,
            border: `1px solid ${tier.color}44`,
          }}>{tier.label}</span>

          <Link href="/marketplace" style={{
            fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'rgba(247,245,240,0.3)', textDecoration: 'none',
          }}>View Profile →</Link>
        </div>
      </nav>

      {/* HEADER */}
      <div style={{
        padding: '2rem 1.5rem 0',
        borderBottom: '1px solid var(--border-dark)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'var(--coral)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--sans)', fontWeight: 700, fontSize: '0.85rem', color: '#fff',
          }}>{Expert.avatar}</div>
          <div>
            <h1 style={{
              fontFamily: 'var(--sans)', fontWeight: 700, fontSize: '1rem',
              color: 'var(--page)', margin: 0,
            }}>{Expert.name}</h1>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300,
              color: 'rgba(247,245,240,0.35)',
            }}>@{Expert.handle}</span>
          </div>
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', gap: 0 }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '0.75rem 1.25rem',
                background: 'none', border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid var(--coral)' : '2px solid transparent',
                color: activeTab === tab.id ? 'var(--page)' : 'rgba(247,245,240,0.35)',
                cursor: 'pointer', transition: 'color 0.2s',
              }}
            >
              {tab.label}
              {tab.proOnly && !isPro && (
                <span style={{ marginLeft: '0.35rem', color: 'var(--coral)', fontSize: '0.55rem' }}>PRO</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div style={{ padding: '2rem 1.5rem', maxWidth: 800 }}>
        {activeTab === 'profile' && (
          <ProfileTab
  Expert={{
    name: Expert.name, handle: Expert.handle,
    title: Expert.title, location: Expert.location,
    bio: Expert.bio, rate: Expert.rate,
    rateType: Expert.rate_type, specialty: Expert.specialty,
    tags: Expert.tags, deliverables: Expert.deliverables,
    avatar: Expert.avatar,
  }}
  onSave={handleSave}
/>
        )}
        {activeTab === 'video' && (
          <VideoTab
            Expert={{
              handle: Expert.handle,
              r2Key: Expert.r2_key || '',
              muxPlaybackId: Expert.mux_playback_id || '',
              youtubeUrl: Expert.youtube_url || '',
              tier: Expert.tier,
            }}
            onSave={handleSave}
            isPro={isPro}
          />
        )}
        {activeTab === 'stats' && (
          <StatsTab
            stats={{
              profileViews: Expert.profile_views,
              cardExpands: Expert.card_expands,
              callBookings: Expert.call_bookings,
              messagesSent: Expert.messages_sent,
              viewsThisWeek: Expert.views_this_week,
              expandsThisWeek: Expert.expands_this_week,
            }}
          />
        )}
        {activeTab === 'availability' && (
          <AvailabilityTab
            Expert={{
              available: Expert.available,
              capacity: Expert.capacity || '',
              responseTime: Expert.response_time || '',
              projectDuration: Expert.project_duration || '',
              availabilityNote: Expert.availability_note || '',
            }}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  )
}
