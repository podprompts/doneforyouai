import { Metadata } from 'next'
import WorkPageClient from './WorkPageClient'

export const metadata: Metadata = {
  title: 'Our Work — Full-Stack AI Platforms Built from Scratch',
  description: 'Explore 9 live platforms built solo by DoneForYouAI — from AI automation tools to live commerce, marketplaces, and voice AI. Full-stack, zero to production.',
  alternates: {
    canonical: 'https://www.doneforyouai.com/work',
  },
  openGraph: {
    title: 'Our Work — Full-Stack AI Platforms Built from Scratch',
    description: 'Explore 9 live platforms built solo by DoneForYouAI — from AI automation tools to live commerce, marketplaces, and voice AI.',
    url: 'https://www.doneforyouai.com/work',
    siteName: 'Done For You AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Done For You AI — Selected Work',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Work — Full-Stack AI Platforms Built from Scratch',
    description: 'Explore 9 live platforms built solo by DoneForYouAI — from AI automation tools to live commerce, marketplaces, and voice AI.',
    images: ['/og-image.png'],
  },
}

export default function WorkPage() {
  return <WorkPageClient />
}