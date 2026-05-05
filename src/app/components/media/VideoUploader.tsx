'use client'

import { useState, useRef } from 'react'
import { getR2OperatorKey, isValidYouTubeUrl } from '@/lib/media'

interface Props {
  handle: string
  currentR2Key?: string
  currentMuxId?: string
  currentYouTubeUrl?: string
  onSave: (data: { r2Key?: string; muxPlaybackId?: string; youtubeUrl?: string }) => Promise<void>
  isPro: boolean
}

type Tab = 'r2' | 'youtube' | 'mux'
type UploadState = 'idle' | 'uploading' | 'success' | 'error'

export default function VideoUploader({ handle, currentR2Key, currentMuxId, currentYouTubeUrl, onSave, isPro }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('r2')
  const [uploadState, setUploadState] = useState<UploadState>('idle')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [youtubeInput, setYoutubeInput] = useState(currentYouTubeUrl || '')
  const [youtubeValid, setYoutubeValid] = useState(Boolean(currentYouTubeUrl))
  const [muxInput, setMuxInput] = useState(currentMuxId || '')
  const [dragOver, setDragOver] = useState(false)
  const [fileName, setFileName] = useState(currentR2Key ? currentR2Key.split('/').pop() || '' : '')
  const fileRef = useRef<HTMLInputElement>(null)

  if (!isPro) {
    return (
      <div style={{
        border: '1px solid var(--coral-border)',
        padding: '1.5rem', textAlign: 'center',
        background: 'var(--coral-dim)',
      }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'var(--coral)', display: 'block', marginBottom: '0.75rem',
        }}>Pro Feature</span>
        <p style={{
          fontFamily: 'var(--sans)', fontSize: '0.85rem',
          color: 'rgba(247,245,240,0.5)', lineHeight: 1.6, marginBottom: '1rem',
        }}>
          Video backgrounds are available on Pro and Elite plans.
          Upgrade to make your profile come alive.
        </p>
        <button style={{
          fontFamily: 'var(--sans)', fontSize: '0.75rem', fontWeight: 600,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          background: 'var(--coral)', color: 'var(--white)',
          border: 'none', padding: '0.75rem 1.5rem', cursor: 'pointer',
        }}>Upgrade to Pro →</button>
      </div>
    )
  }

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('video/')) return
    setFileName(file.name)
    setUploadState('uploading')
    setUploadProgress(0)
    try {
      const key = getR2OperatorKey(handle, file.name)
      const res = await fetch('/api/r2/presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, contentType: file.type }),
      })
      if (!res.ok) throw new Error('Failed to get upload URL')
      const { uploadUrl } = await res.json()
      await uploadWithProgress(file, uploadUrl, (pct) => setUploadProgress(pct))
      setUploadState('success')
      await onSave({ r2Key: key })
    } catch {
      setUploadState('error')
    }
  }

  const tabs: { id: Tab; label: string; desc: string }[] = [
    { id: 'r2',      label: 'Upload MP4',   desc: 'Best quality · No branding' },
    { id: 'youtube', label: 'YouTube URL',  desc: 'Easiest · Paste & go' },
    { id: 'mux',     label: 'Mux ID',       desc: 'Power users · Adaptive' },
  ]

  return (
    <div style={{ border: '1px solid var(--border-dark)', background: 'var(--ink-2)' }}>
      {/* Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: '1px solid var(--border-dark)' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: '0.85rem 0.5rem', background: activeTab === tab.id ? 'var(--ink-3)' : 'transparent',
            border: 'none', borderBottom: activeTab === tab.id ? '2px solid var(--coral)' : '2px solid transparent',
            cursor: 'pointer', textAlign: 'center',
          }}>
            <span style={{
              fontFamily: 'var(--sans)', fontWeight: 600, fontSize: '0.75rem',
              color: activeTab === tab.id ? 'var(--page)' : 'rgba(247,245,240,0.35)',
              display: 'block', marginBottom: '0.15rem',
            }}>{tab.label}</span>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '0.58rem', fontWeight: 300,
              color: activeTab === tab.id ? 'var(--coral)' : 'rgba(247,245,240,0.2)',
            }}>{tab.desc}</span>
          </button>
        ))}
      </div>

      <div style={{ padding: '1.25rem' }}>
        {/* R2 Upload */}
        {activeTab === 'r2' && (
          <div>
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
              onClick={() => fileRef.current?.click()}
              style={{
                border: `1px dashed ${dragOver ? 'var(--coral)' : 'var(--border-dark)'}`,
                padding: '2.5rem 1rem', textAlign: 'center', cursor: 'pointer',
                background: dragOver ? 'var(--coral-dim)' : 'transparent',
                transition: 'all 0.2s', marginBottom: '1rem',
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem', opacity: 0.4 }}>↑</div>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: 'rgba(247,245,240,0.5)' }}>
                {fileName
                  ? <span style={{ color: 'var(--coral)' }}>{fileName}</span>
                  : <>Drag your reel here or <span style={{ color: 'var(--coral)' }}>browse</span></>
                }
              </p>
              <p style={{
                fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300,
                color: 'rgba(247,245,240,0.2)', marginTop: '0.35rem',
              }}>MP4 · WebM · MOV — max 500MB</p>
            </div>
            <input ref={fileRef} type="file" accept="video/mp4,video/webm,video/quicktime"
              style={{ display: 'none' }}
              onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
            />
            {uploadState === 'uploading' && (
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ height: 2, background: 'var(--border-dark)', marginBottom: '0.5rem' }}>
                  <div style={{ height: '100%', background: 'var(--coral)', width: `${uploadProgress}%`, transition: 'width 0.3s' }} />
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300, color: 'rgba(247,245,240,0.4)' }}>
                  Uploading to Cloudflare R2... {uploadProgress}%
                </span>
              </div>
            )}
            {uploadState === 'success' && <StatusBadge type="success" message="Uploaded to Cloudflare R2. Your reel is live." />}
            {uploadState === 'error' && <StatusBadge type="error" message="Upload failed. Check your file and try again." />}
          </div>
        )}

        {/* YouTube */}
        {activeTab === 'youtube' && (
          <div>
            <Label>YouTube URL</Label>
            <input type="url" value={youtubeInput}
              placeholder="https://youtube.com/watch?v=..."
              onChange={e => { setYoutubeInput(e.target.value); setYoutubeValid(isValidYouTubeUrl(e.target.value)) }}
              style={{
                width: '100%', background: 'var(--ink)',
                border: `1px solid ${youtubeInput && !youtubeValid ? '#e53e3e' : youtubeValid ? '#3ecf8e' : 'var(--border-dark)'}`,
                color: 'var(--page)', fontFamily: 'var(--sans)', fontSize: '0.85rem',
                padding: '0.65rem 0.85rem', outline: 'none', marginBottom: '0.5rem',
              }}
            />
            <p style={{
              fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300,
              color: youtubeInput && !youtubeValid ? '#e53e3e' : 'rgba(247,245,240,0.25)',
              marginBottom: '1rem',
            }}>
              {youtubeInput && !youtubeValid
                ? 'Unrecognized URL — try a standard watch or youtu.be link'
                : 'Works with youtube.com/watch, youtu.be, and Shorts'}
            </p>
            <SaveButton onClick={() => onSave({ youtubeUrl: youtubeInput })} disabled={!youtubeValid} label="Save YouTube URL" />
          </div>
        )}

        {/* Mux */}
        {activeTab === 'mux' && (
          <div>
            <Label>Mux Playback ID</Label>
            <input type="text" value={muxInput}
              placeholder="DS00Spx1CV902MCtPj5WknGlR"
              onChange={e => setMuxInput(e.target.value)}
              style={{
                width: '100%', background: 'var(--ink)',
                border: '1px solid var(--border-dark)',
                color: 'var(--page)', fontFamily: 'var(--mono)', fontSize: '0.82rem',
                padding: '0.65rem 0.85rem', outline: 'none',
                letterSpacing: '0.04em', marginBottom: '0.5rem',
              }}
            />
            <p style={{
              fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 300,
              color: 'rgba(247,245,240,0.25)', marginBottom: '1rem',
            }}>Find this in Mux dashboard → Assets → Playback IDs</p>
            <SaveButton onClick={() => onSave({ muxPlaybackId: muxInput.trim() })} disabled={!muxInput.trim()} label="Save Mux ID" />
          </div>
        )}
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{
      fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 300,
      letterSpacing: '0.1em', textTransform: 'uppercase',
      color: 'rgba(247,245,240,0.3)', display: 'block', marginBottom: '0.5rem',
    }}>{children}</label>
  )
}

function StatusBadge({ type, message }: { type: 'success' | 'error'; message: string }) {
  const color = type === 'success' ? '#3ecf8e' : '#e53e3e'
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.5rem',
      padding: '0.65rem 0.85rem',
      border: `1px solid ${color}44`,
      background: `${color}0f`,
    }}>
      <span style={{ fontSize: '0.75rem', color }}>{type === 'success' ? '✓' : '✕'}</span>
      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 300, color, letterSpacing: '0.04em' }}>{message}</span>
    </div>
  )
}

function SaveButton({ onClick, disabled, label }: { onClick: () => void; disabled: boolean; label: string }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      fontFamily: 'var(--sans)', fontSize: '0.75rem', fontWeight: 600,
      letterSpacing: '0.08em', textTransform: 'uppercase',
      background: disabled ? 'rgba(247,245,240,0.06)' : 'var(--coral)',
      color: disabled ? 'rgba(247,245,240,0.25)' : 'var(--white)',
      border: 'none', padding: '0.75rem 1.5rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
    }}>{label}</button>
  )
}

function uploadWithProgress(file: File, url: string, onProgress: (pct: number) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.upload.addEventListener('progress', e => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100))
    })
    xhr.addEventListener('load', () => xhr.status < 400 ? resolve() : reject(new Error(`${xhr.status}`)))
    xhr.addEventListener('error', () => reject(new Error('Network error')))
    xhr.open('PUT', url)
    xhr.setRequestHeader('Content-Type', file.type)
    xhr.send(file)
  })
}