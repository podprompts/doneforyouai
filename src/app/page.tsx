import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Problem from './components/Problem'
import Services from './components/Services'
import VideoShowcase from './components/VideoShowcase'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Audience from './components/Audience'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'

// ─────────────────────────────────────────────────────────────────
// PAGE ASSEMBLY
//
// VideoShowcase accepts a `mode` prop:
//   mode="embed"  → Framed video player (default) — great for brand reel / demo
//   mode="bg"     → Full-bleed video background section — bold mid-page moment
//
// You can use ONE or BOTH by duplicating the component with different modes.
// Each pulls from its own env var so you can have two different videos:
//   NEXT_PUBLIC_HERO_MUX_PLAYBACK_ID     → Hero background video
//   NEXT_PUBLIC_SHOWCASE_MUX_PLAYBACK_ID → VideoShowcase section video
// ─────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Dark entry — video BG hero */}
        <Hero />

        {/* Animated ticker band */}
        <Ticker />

        {/* Light sections — the "chill moment" */}
        <Problem />
        <Services />

        {/* Video showcase — framed embed mode */}
        <VideoShowcase mode="embed" />

        {/* Dark interlude — process */}
        <Process />

        {/* Light again — social proof */}
        <Testimonials />

        {/* Audience tags */}
        <Audience />

        {/* Video background section — bold mid-page moment */}
        {/* Uncomment below to add a second video section in bg mode */}
        {/* <VideoShowcase mode="bg" /> */}

        {/* Dark CTA */}
        <CTA />

        {/* Contact form — light */}
        <Contact />
      </main>
      <Footer />
    </>
  )
}
