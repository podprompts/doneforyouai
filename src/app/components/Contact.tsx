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
        name:       form.name,
        email:      form.email,
        company:    form.company || null,
        service:    form.service || null,
        message:    form.message,
        source:     'homepage_contact',
        status:     'new',
        created_at: new Date().toISOString(),
      })
      if (error) throw error; fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: form.name, email: form.email, company: form.company, service: form.service, message: form.message }) }).catch(() => {})
      setStatus('success')
      setForm({ name: '', email: '', company: '', message: '', service: '' })
    } catch (e) {
      console.error('Contact form error:', e)
      setStatus('error')
    }
  }

  return (
    <section id="contact" style={{
      background: 'var(--bg)',
      color: 'var(--text)',
      padding: '0 2rem 7rem',
    }}>
      <div id="contact-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>

        {/* Left */}
        <div>
          <span className="dfy-eyebrow" style={{ color: 'var(--accent)' }}>Get Started</span>

          <h2 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
            lineHeight: 1.04, margin: '1rem 0 1.25rem',
            color: 'var(--text)',
          }}>
            Let's build something{' '}
            <em style={{ color: 'var(--accent)' }}>that actually works.</em>
          </h2>

          <p style={{
            fontFamily: 'var(--f-body)', fontSize: '1.1rem',
            color: 'var(--text-2)', lineHeight: 1.65, marginBottom: '2.25rem', maxWidth: '30rem',
          }}>
            Tell us about your business and what you're trying to solve.
            We'll come back within 24 hours with a clear plan — no pressure, no pitch deck.
          </p>

          <div style={{ borderTop: '1px solid var(--line-2)', maxWidth: '30rem' }}>
            {[
              { label: 'Response time', value: 'Within 24 hours' },
              { label: 'First call',    value: '30-min strategy session' },
              { label: 'Commitment',   value: 'None required upfront' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', gap: '1rem',
                padding: '1.1rem 0',
                borderBottom: '1px solid var(--line-2)',
              }}>
                <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.98rem', color: 'var(--text-3)' }}>{item.label}</span>
                <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.98rem', fontWeight: 600, color: 'var(--text)', textAlign: 'right' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div>
          {status === 'success' ? (
            <div style={{ border: '1px solid var(--line)', borderRadius: 28, padding: '3rem 2rem', textAlign: 'center', background: 'var(--surface)', boxShadow: '0 30px 60px rgba(21,22,26,0.08)' }}>
              <div style={{
                width: 56, height: 56,
                background: 'var(--accent-tint)', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.5rem', color: 'var(--accent)', fontSize: '1.4rem', fontWeight: 600,
              }}>✓</div>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', color: 'var(--text)' }}>Message received.</h3>
              <p style={{ fontFamily: 'var(--f-body)', fontSize: '1rem', color: 'var(--text-2)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                We'll be back in touch within 24 hours. Check your inbox.
              </p>
              <button className="dfy-btn dfy-btn-ghost" onClick={() => setStatus('idle')} style={{ minHeight: 44 }}>
                Send another →
              </button>
            </div>
          ) : (
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '1.25rem',
              padding: '2.25rem', borderRadius: 28,
              background: 'var(--surface)', border: '1px solid var(--line)',
              boxShadow: '0 30px 60px rgba(21,22,26,0.08)',
            }}>

              <div id="contact-name-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <label className="dfy-label" htmlFor="contact-name">Name *</label>
                  <input id="contact-name" className="dfy-field" type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                </div>
                <div>
                  <label className="dfy-label" htmlFor="contact-company">Company</label>
                  <input id="contact-company" className="dfy-field" type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Your company" />
                </div>
              </div>

              <div>
                <label className="dfy-label" htmlFor="contact-email">Email *</label>
                <input id="contact-email" className="dfy-field" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
              </div>

              <div>
                <label className="dfy-label" htmlFor="contact-service">I'm interested in</label>
                <select id="contact-service" className="dfy-field" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                  style={{ cursor: 'pointer' }}
                >
                  <option value="">Select a service...</option>
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="dfy-label" htmlFor="contact-message">Tell us about your business *</label>
                <textarea
                  id="contact-message"
                  className="dfy-field"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="What does your business do, and what are you hoping AI can solve for you?"
                  rows={5}
                  style={{ resize: 'vertical', minHeight: '130px' }}
                />
              </div>

              <button
                className="dfy-btn dfy-btn-primary"
                onClick={handleSubmit}
                disabled={status === 'loading'}
                style={{ width: '100%' }}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message →'}
              </button>

              {status === 'error' && (
                <p style={{ fontFamily: 'var(--f-body)', fontSize: '0.9rem', color: '#B42318' }}>
                  Something went wrong. Email us at{' '}
                  <span style={{ color: '#B42318', fontWeight: 600 }}>hire@doneforyouai.com</span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
        @media (max-width: 680px) {
          #contact { padding: 0 1.25rem 4rem !important; }
          #contact-name-row { grid-template-columns: 1fr !important; gap: 1.25rem !important; }
          #contact-grid > div:last-child > div { padding: 1.5rem !important; }
        }
      `}</style>
    </section>
  )
}
