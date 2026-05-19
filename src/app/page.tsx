import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Problem from './components/Problem'
import Services from './components/Services'
import FeaturedAndPulse from './components/FeaturedAndPulse'
import VideoShowcase from './components/VideoShowcase'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Audience from './components/Audience'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Problem />
        <Services />
        <FeaturedAndPulse />
        <VideoShowcase mode="embed" />
        <Process />
        <Testimonials />
        <Audience />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  )
}