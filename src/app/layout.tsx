import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.doneforyouai.com'),
  title: {
    default: 'Done For You AI — AI Expert Marketplace',
    template: '%s | Done For You AI',
  },
  description:
    'Hire vetted AI experts to build automations, assistants, and content engines — deployed inside your business. No guesswork, no wasted months.',
  keywords: [
    'done for you AI',
    'AI implementation',
    'AI automation services',
    'custom AI assistants',
    'AI experts for hire',
    'business AI solutions',
    'AI chatbot development',
    'AI content systems',
    'AI workflow automation',
    'AI strategy consulting',
  ],
  authors: [{ name: 'DoneForYouAI.com' }],
  creator: 'HONNYDO LLC',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.doneforyouai.com',
  },
  openGraph: {
    title: 'Done For You AI — AI Expert Marketplace',
    description:
      'Hire vetted AI experts to build automations, assistants, and content engines — deployed inside your business.',
    url: 'https://www.doneforyouai.com',
    siteName: 'Done For You AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Done For You AI — Your business. Powered by AI. Done for you.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Done For You AI — AI Expert Marketplace',
    description:
      'Hire vetted AI experts to build automations, assistants, and content engines — deployed inside your business.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ overflowX: 'hidden' }}>
        {children}
        <div dangerouslySetInnerHTML={{ __html: '<elevenlabs-convai agent-id="agent_7101ksrc9n2cen9ab11x17c1m2ks"></elevenlabs-convai>' }} />
        <Script
          src="https://unpkg.com/@elevenlabs/convai-widget-embed"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}