'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL

export default function AdminPage() {
  const router = useRouter()
  const [applications, setApplications] = useState<any[]>([])
  const [operators,    setOperators]    = useState<any[]>([])
  const [loading,      setLoading]      = useState(true)
  const [authChecked,  setAuthChecked]  = useState(false)
  const [acting,       setActing]       = useState<string | null>(null)

  // Auth guard — admin only
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session || session.user.email !== ADMIN_EMAIL) {
        router.replace('/login')
        return
      }
      setAuthChecked(true)
      fetchData()
    })
  }, [])

  const fetchData = async () => {
    setLoading(true)
    const [appsRes, opsRes] = await Promise.all([
      supabase.from('operator_applications').select('*').order('created_at', { ascending: false }),
      supabase.from('operators').select('id, name, handle, email, tier, approved, available, created_at').order('created_at', { ascending: false }).limit(20),
    ])
    if (appsRes.data) setApplications(appsRes.data)
    if (opsRes.data)  setOperators(opsRes.data)
    setLoading(false)
  }

  const handleApprove = async (app: any) => {
    setActing(app.id)
    try {
      const res = await fetch(`/api/admin/approve?email=${encodeURIComponent(app.email)}&tier=${app.tier}&name=${encodeURIComponent(app.name)}&secret=${process.env.NEXT_PUBLIC_ADMIN_SECRET}`)
      if (res.ok) await fetchData()
      else alert('Approve failed — check console')
    } catch (e) { console.error(e) }
    setActing(null)
  }

  const handleDeny = async (app: any) => {
    if (!confirm(`Deny ${app.name}? This will send them a denial email.`)) return
    setActing(app.id)
    try {
      const res = await fetch(`/api/admin/deny?email=${encodeURIComponent(app.email)}&secret=${process.env.NEXT_PUBLIC_ADMIN_SECRET}`)
      if (res.ok) await fetchData()
      else alert('Deny failed — check console')
    } catch (e) { console.error(e) }
    setActing(null)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const statusColor: Record<string, string> = {
    pending:  'rgba(247,245,240,0.3)',
    paid:     '#f59e0b',
    approved: '#3ecf8e',
    denied:   '#f87171',
  }

  if (!authChecked || loading) {
    return (
      <div style={{ background: 'var(--ink)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.25)' }}>Loading...</span>
      </div>
    )
  }

  const pending  = applications.filter(a => a.status === 'paid')
  const allApps  = applications

  return (
    <div style={{ background: 'var(--ink)', minHeight: '100vh', fontFamily: 'var(--sans)' }}>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', height: 56, background: 'rgba(15,15,14,0.97)', borderBottom: '1px solid var(--border-dark)', backdropFilter: 'blur(12px)' }}>
        <Link href="/" style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.45)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: 6, height: 6, background: 'var(--coral)', borderRadius: '50%' }} />
          DFYAI
        </Link>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--coral)' }}>Admin Panel</span>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {pending.length > 0 && (
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', background: 'var(--coral)', color: '#fff', padding: '0.2rem 0.5rem', borderRadius: '3px' }}>
              {pending.length} pending
            </span>
          )}
          <button onClick={handleSignOut} style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.3)', background: 'transparent', border: 'none', cursor: 'pointer' }}>Sign out</button>
        </div>
      </nav>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1px', background: 'var(--border-dark)', marginBottom: '2.5rem' }}>
          {[
            { label: 'Total applications', value: allApps.length },
            { label: 'Awaiting review',    value: pending.length,                               accent: pending.length > 0 },
            { label: 'Approved experts',   value: allApps.filter(a => a.status === 'approved').length },
            { label: 'Total operators',    value: operators.length },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--ink)', padding: '1.25rem' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', fontWeight: 400, color: s.accent ? 'var(--coral)' : 'var(--page)', lineHeight: 1, marginBottom: '0.4rem' }}>{s.value}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.3)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Pending applications */}
        {pending.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 6, height: 6, background: 'var(--coral)', borderRadius: '50%', animation: 'pulse-dot 2s infinite' }} />
              Awaiting your review
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              {pending.map(app => (
                <div key={app.id} style={{ background: 'var(--ink-2)', border: '1px solid rgba(232,82,26,0.2)', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--page)' }}>{app.name}</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--coral)', border: '1px solid var(--coral-border)', padding: '0.1rem 0.4rem', textTransform: 'uppercase' }}>{app.tier}</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: '#f59e0b' }}>● Paid — awaiting approval</span>
                    </div>
                    <a href={`mailto:${app.email}`} style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'rgba(247,245,240,0.4)', textDecoration: 'none' }}>{app.email}</a>
                    {app.skills && <p style={{ fontFamily: 'var(--sans)', fontSize: '0.8rem', color: 'rgba(247,245,240,0.4)', margin: '0.35rem 0 0' }}>{app.skills}</p>}
                    {app.message && <p style={{ fontFamily: 'var(--sans)', fontSize: '0.8rem', color: 'rgba(247,245,240,0.35)', margin: '0.25rem 0 0', maxWidth: '50ch' }}>{app.message}</p>}
                    <p style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'rgba(247,245,240,0.2)', margin: '0.5rem 0 0' }}>
                      {new Date(app.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                    <button
                      onClick={() => handleApprove(app)}
                      disabled={acting === app.id}
                      style={{ fontFamily: 'var(--sans)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--coral)', color: '#fff', border: 'none', padding: '0.65rem 1.25rem', cursor: 'pointer', opacity: acting === app.id ? 0.5 : 1 }}
                    >
                      {acting === app.id ? '...' : '✓ Approve'}
                    </button>
                    <button
                      onClick={() => handleDeny(app)}
                      disabled={acting === app.id}
                      style={{ fontFamily: 'var(--sans)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'transparent', color: 'rgba(247,245,240,0.4)', border: '1px solid var(--border-dark)', padding: '0.65rem 1.25rem', cursor: 'pointer', opacity: acting === app.id ? 0.5 : 1 }}
                    >
                      ✕ Deny
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All applications */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.3)', marginBottom: '1rem' }}>All applications</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {allApps.map(app => (
              <div key={app.id} style={{ background: 'var(--ink-2)', border: '1px solid var(--border-dark)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: '0.88rem', color: 'var(--page)' }}>{app.name}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'rgba(247,245,240,0.3)' }}>{app.email}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'var(--coral)', textTransform: 'uppercase' }}>{app.tier}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: statusColor[app.status] || 'rgba(247,245,240,0.3)', textTransform: 'uppercase' }}>
                    ● {app.status}
                  </span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'rgba(247,245,240,0.2)' }}>
                    {new Date(app.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
            {allApps.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', fontFamily: 'var(--serif)', fontSize: '1.2rem', color: 'rgba(247,245,240,0.2)' }}>No applications yet.</div>
            )}
          </div>
        </div>

        {/* Live operators */}
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.3)', marginBottom: '1rem' }}>Live experts</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {operators.filter(o => o.approved).map(op => (
              <div key={op.id} style={{ background: 'var(--ink-2)', border: '1px solid var(--border-dark)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: '0.88rem', color: 'var(--page)' }}>{op.name}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'rgba(247,245,240,0.3)' }}>@{op.handle}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'var(--coral)', textTransform: 'uppercase' }}>{op.tier}</span>
                  {op.available && <span style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', color: '#3ecf8e' }}>● available</span>}
                </div>
                <Link href={`/marketplace/${op.handle}`} style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'rgba(247,245,240,0.3)', textDecoration: 'none' }}>View profile →</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}