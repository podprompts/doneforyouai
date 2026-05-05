import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DoneForYouAI — AI Implementation Partner',
  description:
    'We build and deploy custom AI systems inside your business — automations, assistants, content engines, and more. Done for you.',
  metadataBase: new URL('https://doneforyouai.com'),
  openGraph: {
    title: 'DoneForYouAI — AI Implementation Partner',
    description: 'Custom AI systems built and deployed inside your business. No learning curve.',
    url: 'https://doneforyouai.com',
    siteName: 'DoneForYouAI',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ overflowX: 'hidden' }}>{children}</body>
    </html>
  )
}