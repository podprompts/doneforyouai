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
        name:         form.name,
        email:        form.email,
        company:      form.company || null,
        service:      form.service || null,
        message:      form.message,
        source:       'homepage_contact',
        status:       'new',
        created_at:   new Date().toISOString(),
      })
      if (error) throw error
      setStatus('success')
      setForm({ name: '', email: '', company: '', message: '', service: '' })
    } catch (e) {
      console.error('Contact form error:', e)
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'transparent', border: 'none',
    borderBottom: '1px solid var(--border-light)',
    padding: '0.85rem 0', fontFamily: 'var(--sans)', fontSize: '0.9rem',
    color: 'var(--ink)', outline: 'none', transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" style={{ background: 'var(--page)', color: 'var(--ink)', padding: '7rem 2.5rem', borderTop: '1px solid var(--border-light)' }}>
      <div id="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>

        {/* Left */}
        <div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: '1.25rem' }}>Get Started</span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 400, lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Let's build something<br />
            <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>that actually works.</em>
          </h2>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.88rem', color: 'var(--muted-light)', lineHeight: 1.75, marginBottom: '2.5rem' }}>
            Tell us about your business and what you're trying to solve.
            We'll come back within 24 hours with a clear plan — no pressure, no pitch deck.
          </p>

          {[
            { label: 'Response time', value: 'Within 24 hours' },
            { label: 'First call',    value: '30-min strategy session' },
            { label: 'Commitment',   value: 'None required upfront' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.9rem 0', borderBottom: '1px solid var(--border-light)' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-light)' }}>{item.label}</span>
              <span style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', fontWeight: 500, color: 'var(--ink)' }}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* Right — Form */}
        <div>
          {status === 'success' ? (
            <div style={{ border: '1px solid var(--border-light)', padding: '3rem', textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, border: '1px solid var(--coral-border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--coral)', fontSize: '1.2rem' }}>✓</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', fontWeight: 400, marginBottom: '0.75rem' }}>Message received.</h3>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: 'var(--muted-light)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                We'll be back in touch within 24 hours. Check your inbox.
              </p>
              <button onClick={() => setStatus('idle')} style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', border: '1px solid var(--border-light)', color: 'var(--muted-light)', padding: '0.65rem 1.25rem', cursor: 'pointer' }}>
                Send another →
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* Name + Company */}
              <div id="contact-name-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted-light)', display: 'block', marginBottom: '0.25rem' }}>Name *</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" style={inputStyle}
                    onFocus={e => (e.target.style.borderBottomColor = 'var(--coral)')}
                    onBlur={e => (e.target.style.borderBottomColor = 'var(--border-light)')}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted-light)', display: 'block', marginBottom: '0.25rem' }}>Company</label>
                  <input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Your company" style={inputStyle}
                    onFocus={e => (e.target.style.borderBottomColor = 'var(--coral)')}
                    onBlur={e => (e.target.style.borderBottomColor = 'var(--border-light)')}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted-light)', display: 'block', marginBottom: '0.25rem' }}>Email *</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" style={inputStyle}
                  onFocus={e => (e.target.style.borderBottomColor = 'var(--coral)')}
                  onBlur={e => (e.target.style.borderBottomColor = 'var(--border-light)')}
                />
              </div>

              {/* Service */}
              <div>
                <label style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted-light)', display: 'block', marginBottom: '0.25rem' }}>I'm interested in</label>
                <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={e => (e.target.style.borderBottomColor = 'var(--coral)')}
                  onBlur={e => (e.target.style.borderBottomColor = 'var(--border-light)')}
                >
                  <option value="">Select a service...</option>
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Message */}
              <div>
                <label style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted-light)', display: 'block', marginBottom: '0.25rem' }}>Tell us about your business *</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="What does your business do, and what are you hoping AI can solve for you?" rows={5}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                  onFocus={e => (e.target.style.borderBottomColor = 'var(--coral)')}
                  onBlur={e => (e.target.style.borderBottomColor = 'var(--border-light)')}
                />
              </div>

              {/* Submit */}
              <button onClick={handleSubmit} disabled={status === 'loading'} style={{ fontFamily: 'var(--sans)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', background: status === 'loading' ? 'rgba(232,82,26,0.6)' : 'var(--coral)', color: 'var(--white)', border: 'none', padding: '1rem 2rem', cursor: status === 'loading' ? 'not-allowed' : 'pointer', width: '100%', transition: 'opacity 0.2s' }}
                onMouseEnter={e => { if (status !== 'loading') e.currentTarget.style.opacity = '0.85' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message →'}
              </button>

              {status === 'error' && (
                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: '#e53e3e', letterSpacing: '0.06em' }}>
                  Something went wrong. Email us at <a href="mailto:hello@doneforyouai.com" style={{ color: '#e53e3e' }}>hello@doneforyouai.com</a>
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          #contact { padding: 4rem 1.25rem !important; }
          #contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          #contact-name-row { grid-template-columns: 1fr !important; gap: 1rem !important; }
        }
        input::placeholder, textarea::placeholder { color: rgba(15,15,14,0.3) !important; }
        select option { background: var(--page); color: var(--ink); }
      `}</style>
    </section>
  )
}