import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://doneforyouai.com'),
  title: {
    default: 'DoneForYouAI.com',
    template: '%s | DoneForYouAI.com',
  },
  description:
    'Hire vetted AI experts to build automations, assistants, and content engines — deployed inside your business.',
  openGraph: {
    title: 'DoneForYouAI.com — AI Expert Marketplace',
    description:
      'Hire vetted AI experts to build automations, assistants, and content engines — deployed inside your business.',
    url: 'https://doneforyouai.com',
    siteName: 'DoneForYouAI.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DoneForYouAI.com — Your business. Powered by AI. Done for you.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DoneForYouAI.com — AI Expert Marketplace',
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