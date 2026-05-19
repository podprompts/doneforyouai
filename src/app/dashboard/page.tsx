'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase, type ExpertRow } from '@/lib/supabase'
import ProfileTab from './components/ProfileTab'
import VideoTab from './components/VideoTab'
import StatsTab from './components/StatsTab'
import AvailabilityTab from './components/AvailabilityTab'
import { Suspense } from 'react'

type Tab = 'profile' | 'video' | 'stats' | 'availability'

const tabs: { id: Tab; label: string; proOnly?: boolean }[] = [
  { id: 'profile',      label: 'Profile' },
  { id: 'video',        label: 'Video Reel', proOnly: true },
  { id: 'stats',        label: 'Stats' },
  { id: 'availability', label: 'Availability' },
]

const tierColors = {
  basic:     { bg: 'rgba(247,245,240,0.06)', color: 'rgba(247,245,240,0.4)', label: 'Basic' },
  free:      { bg: 'rgba(247,245,240,0.06)', color: 'rgba(247,245,240,0.4)', label: 'Basic' },
  pro:       { bg: 'rgba(232,82,26,0.12)',   color: 'var(--coral)',           label: 'Pro'   },
  elite:     { bg: 'rgba(232,82,26,0.12)',   color: 'var(--coral)',           label: 'Pro'   },
  pro_video: { bg: 'rgba(62,207,142,0.12)',  color: '#3ecf8e',               label: 'Pro + Video' },
}

function DashboardContent() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const isWelcome    = searchParams.get('welcome') === 'true'
  const welcomeTier  = searchParams.get('tier') || ''

  const [activeTab,   setActiveTab]   = useState<Tab>('profile')
  const [expert,      setExpert]      = useState<any>(null)
  const [loading,     setLoading]     = useState(true)
  const [authLoading, setAuthLoading] = useState(true)
  const [saveStatus,  setSaveStatus]  = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [showWelcome, setShowWelcome] = useState(isWelcome)

  // 1. Check auth session
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace('/login')
        return
      }
      setAuthLoading(false)
      fetchExpert(session.user.id, session.user.email!)
    }
    checkSession()

    // Listen for auth changes (magic link callback)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace('/login')
      } else {
        setAuthLoading(false)
        fetchExpert(session.user.id, session.user.email!)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  // 2. Fetch expert by user_id
  const fetchExpert = async (userId: string, email: string) => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('operators')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error || !data) {
        // Try by email as fallback (for experts approved before user_id was set)
        const { data: byEmail } = await supabase
          .from('operators')
          .select('*')
          .eq('email', email)
          .single()

        if (!byEmail) {
          // Expert paid but not approved yet
          router.replace('/apply-pending')
          return
        }

        // Link user_id if missing
        if (!byEmail.user_id) {
          await supabase.from('operators').update({ user_id: userId }).eq('id', byEmail.id)
        }
        setExpert(byEmail)
      } else {
        setExpert(data)
      }
    } catch (err) {
      console.error('[Dashboard] Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  // 3. Save handler
  const handleSave = async (updates: Record<string, any>) => {
    if (!expert) return
    setSaveStatus('saving')
    try {
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
        .eq('id', expert.id)

      if (error) throw error
      setExpert((prev: any) => ({ ...prev, ...updates }))
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2500)
    } catch (err) {
      console.error('[Dashboard] Save error:', err)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  if (authLoading || loading) {
    return (
      <div style={{ background: 'var(--ink)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.25)', animation: 'pulse-dot 1.5s infinite' }}>Loading...</span>
      </div>
    )
  }

  if (!expert) return null

  const isPro = expert.tier === 'pro' || expert.tier === 'pro_video' || expert.tier === 'elite'
  const tier  = tierColors[expert.tier as keyof typeof tierColors] || tierColors.basic

  return (
    <div style={{ background: 'var(--ink)', minHeight: '100vh', fontFamily: 'var(--sans)' }}>

      {/* Welcome banner */}
      {showWelcome && (
        <div style={{ background: 'rgba(62,207,142,0.1)', borderBottom: '1px solid rgba(62,207,142,0.2)', padding: '0.85rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: '#3ecf8e', margin: 0 }}>
            🎉 Welcome! Your <strong>{welcomeTier}</strong> plan is active. Fill out your profile to go live on the marketplace.
          </p>
          <button onClick={() => setShowWelcome(false)} style={{ background: 'transparent', border: 'none', color: 'rgba(62,207,142,0.5)', cursor: 'pointer', fontSize: '1rem', padding: '0.25rem', flexShrink: 0 }}>✕</button>
        </div>
      )}

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', height: 56, background: 'rgba(15,15,14,0.97)', borderBottom: '1px solid var(--border-dark)', backdropFilter: 'blur(12px)' }}>
        <Link href="/" style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.45)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: 6, height: 6, background: 'var(--coral)', borderRadius: '50%' }} />
          DFYAI
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {saveStatus !== 'idle' && (
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300, letterSpacing: '0.08em', color: saveStatus === 'saved' ? '#3ecf8e' : saveStatus === 'error' ? '#e53e3e' : 'rgba(247,245,240,0.4)' }}>
              {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? '✓ Saved' : '✗ Save failed'}
            </span>
          )}
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.25rem 0.6rem', background: tier.bg, color: tier.color, border: `1px solid ${tier.color}44` }}>
            {tier.label}
          </span>
          <Link href={`/marketplace/${expert.handle}`} style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.3)', textDecoration: 'none' }}>
            View Profile →
          </Link>
          <button onClick={handleSignOut} style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.2)', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
            Sign out
          </button>
        </div>
      </nav>

      {/* HEADER */}
      <div style={{ padding: '2rem 1.5rem 0', borderBottom: '1px solid var(--border-dark)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--coral)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: '0.85rem', color: '#fff' }}>
            {expert.avatar || expert.name?.slice(0, 2).toUpperCase() || 'EX'}
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: '1rem', color: 'var(--page)', margin: 0 }}>
              {expert.name || 'Your Profile'}
            </h1>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300, color: 'rgba(247,245,240,0.35)' }}>
              @{expert.handle}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0 }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.75rem 1.25rem', background: 'none', border: 'none', borderBottom: activeTab === tab.id ? '2px solid var(--coral)' : '2px solid transparent', color: activeTab === tab.id ? 'var(--page)' : 'rgba(247,245,240,0.35)', cursor: 'pointer', transition: 'color 0.2s' }}>
              {tab.label}
              {tab.proOnly && !isPro && <span style={{ marginLeft: '0.35rem', color: 'var(--coral)', fontSize: '0.55rem' }}>PRO</span>}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div style={{ padding: '2rem 1.5rem', maxWidth: 800 }}>
        {activeTab === 'profile' && (
          <ProfileTab
            Expert={{
              name:        expert.name        || '',
              handle:      expert.handle      || '',
              title:       expert.title       || '',
              location:    expert.location    || '',
              bio:         expert.bio         || '',
              rate:        expert.rate        || '',
              rateType:    expert.rate_type   || 'per hour',
              specialty:   expert.specialty   || '',
              tags:        expert.tags        || [],
              deliverables: expert.deliverables || [],
              avatar:      expert.avatar      || '',
            }}
            onSave={handleSave}
          />
        )}
        {activeTab === 'video' && (
          <VideoTab
            Expert={{
              handle:        expert.handle           || '',
              r2Key:         expert.r2_key           || '',
              muxPlaybackId: expert.mux_playback_id  || '',
              youtubeUrl:    expert.youtube_url      || '',
              tier:          expert.tier             || 'basic',
            }}
            onSave={handleSave}
            isPro={isPro}
          />
        )}
        {activeTab === 'stats' && (
          <StatsTab
            stats={{
              profileViews:    expert.profile_views    || 0,
              cardExpands:     expert.card_expands     || 0,
              callBookings:    expert.call_bookings    || 0,
              messagesSent:    expert.messages_sent    || 0,
              viewsThisWeek:   expert.views_this_week  || 0,
              expandsThisWeek: expert.expands_this_week || 0,
            }}
          />
        )}
        {activeTab === 'availability' && (
          <AvailabilityTab
            Expert={{
              available:        expert.available         ?? true,
              capacity:         expert.capacity          || '',
              responseTime:     expert.response_time     || '',
              projectDuration:  expert.project_duration  || '',
              availabilityNote: expert.availability_note || '',
            }}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  )
}