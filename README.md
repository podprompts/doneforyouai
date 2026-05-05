# DoneForYouAI — Homepage

A production-ready Next.js 14 landing page for DoneForYouAI.com.

## Stack
- **Next.js 14** (App Router)
- **Mux** — video background (hero) + video showcase section
- **Resend** — contact form email delivery
- **Vercel** — deployment

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.local.example .env.local
```
Fill in the values in `.env.local` (see below).

### 3. Run locally
```bash
npm run dev
```

### 4. Deploy
```bash
npx vercel --prod
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_HERO_MUX_PLAYBACK_ID` | No | Mux Playback ID for the hero background video |
| `NEXT_PUBLIC_SHOWCASE_MUX_PLAYBACK_ID` | No | Mux Playback ID for the showcase section video |
| `RESEND_API_KEY` | No | Resend API key for contact form emails |
| `CONTACT_TO_EMAIL` | No | Email address to receive contact form submissions |

All variables are optional — the site works without them (placeholder states shown).

---

## Video Setup (Mux)

### Hero Background Video
1. Go to [dashboard.mux.com](https://dashboard.mux.com)
2. Upload your video
3. Copy the **Playback ID**
4. Set `NEXT_PUBLIC_HERO_MUX_PLAYBACK_ID=your_playback_id`

The hero video plays muted, looped, at low opacity behind the headline copy.

### Showcase Section Video
Same process, different env var: `NEXT_PUBLIC_SHOWCASE_MUX_PLAYBACK_ID`

The showcase section has two modes — set in `src/app/page.tsx`:
- `mode="embed"` — Framed player with thumbnail and play button (default)
- `mode="bg"` — Full-bleed background video with overlay copy

You can use both modes simultaneously by using two different Mux IDs.

---

## Contact Form (Resend)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` in `.env.local`
4. Open `src/app/api/contact/route.ts` and uncomment the Resend block

---

## Customization

| What | Where |
|---|---|
| Colors, fonts, CSS variables | `src/app/globals.css` |
| Services list | `src/app/components/Services.tsx` |
| Testimonials | `src/app/components/Testimonials.tsx` |
| Audience tags | `src/app/components/Audience.tsx` |
| Stats (hero panel) | `src/app/components/Hero.tsx` |
| Page section order | `src/app/page.tsx` |
| Nav links | `src/app/components/Navbar.tsx` |
