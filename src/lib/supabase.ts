import { createClient } from '@supabase/supabase-js'

// ─────────────────────────────────────────────────────────────────
// SUPABASE CLIENT — DoneForYouAI
//
// Add these to .env.local:
//   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
//   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
// ─────────────────────────────────────────────────────────────────

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type OperatorRow = {
  id: string
  created_at: string
  user_id: string
  name: string
  handle: string
  title: string
  location: string
  bio: string
  rate: string
  rate_type: string
  specialty: string
  tags: string[]
  deliverables: string[]
  available: boolean
  featured: boolean
  tier: 'free' | 'pro' | 'elite'
  avatar: string
  rating: number
  reviews: number
  r2_key: string | null
  mux_playback_id: string | null
  youtube_url: string | null
  capacity: string | null
  response_time: string | null
  project_duration: string | null
  availability_note: string | null
  profile_views: number
  card_expands: number
  call_bookings: number
  messages_sent: number
  views_this_week: number
  expands_this_week: number
  approved: boolean
}