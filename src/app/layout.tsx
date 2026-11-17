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

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.doneforyouai.com/#organization',
      name: 'Done For You AI',
      url: 'https://www.doneforyouai.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.doneforyouai.com/og-image.png',
      },
      description:
        'Hire vetted AI experts to build automations, assistants, and content engines — deployed inside your business.',
      founder: {
        '@type': 'Person',
        name: 'Adrien Nash',
      },
      foundingDate: '2025',
      areaServed: 'Worldwide',
      serviceType: [
        'AI Implementation',
        'AI Automation',
        'Custom AI Assistants',
        'AI Content Systems',
        'AI Strategy Consulting',
        'AI Workflow Automation',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.doneforyouai.com/#website',
      url: 'https://www.doneforyouai.com',
      name: 'Done For You AI',
      description:
        'Hire vetted AI experts to build automations, assistants, and content engines — deployed inside your business.',
      publisher: {
        '@id': 'https://www.doneforyouai.com/#organization',
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://www.doneforyouai.com/#service',
      name: 'Done For You AI',
      url: 'https://www.doneforyouai.com',
      image: 'https://www.doneforyouai.com/og-image.png',
      description:
        'We build and deploy custom AI systems inside your business — automations, assistants, content engines, and more.',
      priceRange: '$499 - $1499/month',
      areaServed: 'Worldwide',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'AI Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Automation & Workflows' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom AI Assistants & Chatbots' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Content Systems' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI-Powered Lead Generation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Done-For-You AI Tool Stack' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Strategy & Prompting Playbook' } },
        ],
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
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
