'use client'

import { useState } from 'react'

const specialties = [
  'Workflow Automation', 'AI Assistants', 'Content Engines',
  'Lead Generation', 'AI Strategy', 'Tool Stack Setup',
]

const rateTypes = ['per hour', 'per project', 'per month']

const allTags = [
  'Automation', 'Zapier', 'Make', 'n8n', 'ChatGPT', 'Claude',
  'Voiceflow', 'Content', 'SEO', 'Email', 'Social', 'Lead Gen',
  'Clay', 'Apollo', 'Cold Email', 'Strategy', 'Airtable',
  'APIs', 'Integrations', 'Prompting', 'Copywriting', 'Analytics',
]

interface Props {
  operator: {
    name: string
    handle: string
    title: string
    location: string
    bio: string
    rate: string
    rateType: string
    tags: string[]
    specialty: string
    deliverables?: string[]
    avatar?: string
  }
  onSave: (data: any) => Promise<void>
}

export default function ProfileTab({ operator, onSave }: Props) {
  const [form, setForm] = useState({
    name: operator.name,
    handle: operator.handle,
    title: operator.title,
    location: operator.location,
    bio: operator.bio,
    rate: operator.rate,
    rateType: operator.rateType,
    specialty: operator.specialty,
    tags: operator.tags,
  })

  const toggleTag = (tag: string) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : prev.tags.length < 6 ? [...prev.tags, tag] : prev.tags,
    }))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Name + Handle */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
        <Field label="Full Name">
          <Input value={form.name} onChange={v => setForm(p => ({ ...p, name: v }))} placeholder="Your full name" />
        </Field>
        <Field label="Handle">
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
              fontFamily: 'var(--mono)', fontSize: '0.82rem',
              color: 'rgba(247,245,240,0.3)',
            }}>@</span>
            <Input value={form.handle} onChange={v => setForm(p => ({ ...p, handle: v }))} placeholder="yourhandle" style={{ paddingLeft: '1.1rem' }} />
          </div>
        </Field>
      </div>

      {/* Title + Location */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
        <Field label="Professional Title">
          <Input value={form.title} onChange={v => setForm(p => ({ ...p, title: v }))} placeholder="e.g. AI Automation Architect" />
        </Field>
        <Field label="Location">
          <Input value={form.location} onChange={v => setForm(p => ({ ...p, location: v }))} placeholder="City, State or Remote" />
        </Field>
      </div>

      {/* Bio */}
      <Field label={`Bio (${form.bio.length}/280)`}>
        <textarea
          value={form.bio}
          maxLength={280}
          onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
          placeholder="Describe what you do and who you help..."
          rows={4}
          style={{
            width: '100%', background: 'transparent',
            border: 'none', borderBottom: '1px solid var(--border-dark)',
            color: 'var(--page)', fontFamily: 'var(--sans)', fontSize: '0.88rem',
            padding: '0.5rem 0', outline: 'none', resize: 'vertical',
            lineHeight: 1.65,
          }}
          onFocus={e => e.target.style.borderBottomColor = 'var(--coral)'}
          onBlur={e => e.target.style.borderBottomColor = 'var(--border-dark)'}
        />
      </Field>

      {/* Rate */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'end' }}>
        <Field label="Rate">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', color: 'rgba(247,245,240,0.4)' }}>$</span>
            <Input
              value={form.rate}
              onChange={v => setForm(p => ({ ...p, rate: v.replace(/\D/g, '') }))}
              placeholder="2400"
              style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem' }}
            />
          </div>
        </Field>
        <Field label="Rate Type">
          <select
            value={form.rateType}
            onChange={e => setForm(p => ({ ...p, rateType: e.target.value }))}
            style={{
              background: 'transparent', border: 'none',
              borderBottom: '1px solid var(--border-dark)',
              color: 'var(--page)', fontFamily: 'var(--mono)',
              fontSize: '0.75rem', padding: '0.5rem 0',
              outline: 'none', cursor: 'pointer', letterSpacing: '0.06em',
            }}
          >
            {rateTypes.map(r => <option key={r} value={r} style={{ background: 'var(--ink)' }}>{r}</option>)}
          </select>
        </Field>
      </div>

      {/* Specialty */}
      <Field label="Primary Specialty">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.5rem' }}>
          {specialties.map(s => (
            <button key={s} onClick={() => setForm(p => ({ ...p, specialty: s }))} style={{
              fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300,
              letterSpacing: '0.08em', padding: '0.45rem 0.9rem',
              border: '1px solid',
              borderColor: form.specialty === s ? 'var(--coral)' : 'var(--border-dark)',
              background: form.specialty === s ? 'rgba(232,82,26,0.1)' : 'transparent',
              color: form.specialty === s ? 'var(--coral)' : 'rgba(247,245,240,0.4)',
              cursor: 'pointer', transition: 'all 0.15s',
            }}>{s}</button>
          ))}
        </div>
      </Field>

      {/* Tags */}
      <Field label={`Skills & Tools (${form.tags.length}/6 selected)`}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.5rem' }}>
          {allTags.map(tag => {
            const selected = form.tags.includes(tag)
            const maxed = form.tags.length >= 6 && !selected
            return (
              <button key={tag} onClick={() => toggleTag(tag)} disabled={maxed} style={{
                fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300,
                letterSpacing: '0.06em', padding: '0.35rem 0.75rem',
                border: '1px solid',
                borderColor: selected ? 'var(--coral)' : 'var(--border-dark)',
                background: selected ? 'rgba(232,82,26,0.1)' : 'transparent',
                color: selected ? 'var(--coral)' : maxed ? 'rgba(247,245,240,0.15)' : 'rgba(247,245,240,0.4)',
                cursor: maxed ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s',
              }}>{tag}</button>
            )
          })}
        </div>
      </Field>

      {/* Save */}
      <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border-dark)' }}>
        <button
          onClick={() => onSave(form)}
          style={{
            fontFamily: 'var(--sans)', fontSize: '0.75rem', fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            background: 'var(--coral)', color: 'var(--white)',
            border: 'none', padding: '0.9rem 2rem', cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Save Profile →
        </button>
      </div>

    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{
        fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: 'rgba(247,245,240,0.3)', display: 'block', marginBottom: '0.5rem',
      }}>{label}</label>
      {children}
    </div>
  )
}

function Input({ value, onChange, placeholder, style = {} }: {
  value: string; onChange: (v: string) => void
  placeholder?: string; style?: React.CSSProperties
}) {
  return (
    <input
      type="text" value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%', background: 'transparent',
        border: 'none', borderBottom: '1px solid var(--border-dark)',
        color: 'var(--page)', fontFamily: 'var(--sans)', fontSize: '0.9rem',
        padding: '0.5rem 0', outline: 'none', transition: 'border-color 0.2s',
        ...style,
      }}
      onFocus={e => e.target.style.borderBottomColor = 'var(--coral)'}
      onBlur={e => e.target.style.borderBottomColor = 'var(--border-dark)'}
    />
  )
}