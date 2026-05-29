import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | DoneForYouAI',
  description: 'Privacy Policy for DoneForYouAI.com',
}

const EFFECTIVE_DATE = 'June 1, 2026'
const COMPANY       = 'HONNYDO LLC d/b/a DoneForYouAI'
const SITE          = 'DoneForYouAI.com'
const EMAIL         = 'hello@doneforyouai.com'
const STATE         = 'Arizona'

const sections = [
  {
    title: '1. Who We Are',
    body: `${COMPANY} ("Company," "we," "us," or "our") operates ${SITE} and provides AI implementation services. This Privacy Policy explains how we collect, use, disclose, and protect information about you when you use our Site or services. By using our Site, you consent to the practices described in this Policy.`,
  },
  {
    title: '2. Information We Collect',
    body: `2.1 Information You Provide. We collect information you voluntarily provide, including: your name, email address, company name, and any other information you submit through our contact forms, expert application, or during service engagement.

2.2 Payment Information. Payment transactions are processed by Stripe, a PCI-DSS compliant payment processor. We do not store your full credit card number, CVV, or billing details on our servers. We receive limited transaction metadata (amount, status, and partial card info) from Stripe.

2.3 Automatically Collected Information. When you visit the Site, we may automatically collect: IP address, browser type and version, operating system, pages viewed, time spent on pages, referring URLs, and device identifiers. This information is collected via cookies, pixels, and similar tracking technologies.

2.4 Expert Profile Data. If you apply as an Expert, we collect professional information including your skills, bio, portfolio links, social handles, rates, and availability. This information may be displayed publicly on the Site.

2.5 Communications. We retain records of communications between you and the Company, including emails, chat messages, and support requests.`,
  },
  {
    title: '3. How We Use Your Information',
    body: `We use the information we collect to:

· Provide, operate, and improve our services and the Site
· Process transactions and send related information including invoices and receipts
· Respond to your inquiries, comments, and requests
· Send you technical notices, updates, security alerts, and administrative messages
· Send marketing communications (where you have opted in or where permitted by law)
· Match Clients with Experts on our marketplace platform
· Monitor and analyze usage patterns and trends to improve user experience
· Detect, investigate, and prevent fraudulent transactions and other illegal activities
· Comply with legal obligations and enforce our Terms of Service
· Protect the rights, property, and safety of ${COMPANY}, our users, and the public`,
  },
  {
    title: '4. Cookies and Tracking Technologies',
    body: `We use cookies and similar tracking technologies to collect and track information and to improve and analyze our Site. Cookies are small data files stored on your device.

Types of cookies we use:
· Essential cookies: necessary for the Site to function properly
· Analytics cookies: help us understand how visitors interact with the Site (e.g., Google Analytics)
· Functional cookies: remember your preferences and settings
· Marketing cookies: used to deliver relevant advertising (where applicable)

You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of the Site may not function properly. You may also opt out of Google Analytics by installing the Google Analytics opt-out browser add-on.`,
  },
  {
    title: '5. How We Share Your Information',
    body: `We do not sell your personal information. We may share your information in the following circumstances:

5.1 Service Providers. We share information with third-party vendors and service providers that perform services on our behalf, including payment processing (Stripe), email delivery (Resend), database hosting (Supabase), cloud infrastructure (Vercel, Cloudflare), and analytics providers. These providers are contractually obligated to protect your information.

5.2 Expert Marketplace. If you are a Client, limited profile information may be shared with Experts you engage. If you are an Expert, your profile information is displayed on the Site as part of the marketplace.

5.3 Business Transfers. If we are involved in a merger, acquisition, financing, reorganization, bankruptcy, or sale of company assets, your information may be transferred as part of that transaction.

5.4 Legal Requirements. We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).

5.5 Protection of Rights. We may disclose information where we believe it is necessary to investigate, prevent, or take action regarding illegal activities, suspected fraud, violations of our Terms, or threats to the safety of any person.`,
  },
  {
    title: '6. Data Retention',
    body: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this Policy, comply with our legal obligations, resolve disputes, and enforce our agreements. When we no longer need your information, we will securely delete or anonymize it. Client project records, invoices, and communications may be retained for up to seven (7) years for accounting and legal purposes.`,
  },
  {
    title: '7. Security',
    body: `We implement reasonable technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. These measures include encrypted data transmission (HTTPS/TLS), access controls, and secure cloud infrastructure. However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security and you use the Site at your own risk. In the event of a data breach that affects your rights and freedoms, we will notify you as required by applicable law.`,
  },
  {
    title: '8. Your Rights and Choices',
    body: `Depending on your location, you may have certain rights regarding your personal information:

· Access: request a copy of the personal information we hold about you
· Correction: request that we correct inaccurate or incomplete information
· Deletion: request that we delete your personal information, subject to certain exceptions
· Portability: request that we provide your data in a machine-readable format
· Opt-out of marketing: unsubscribe from marketing emails at any time using the unsubscribe link in any email we send
· Withdraw consent: where processing is based on consent, withdraw it at any time

To exercise any of these rights, contact us at ${EMAIL}. We will respond to your request within 30 days. We may need to verify your identity before processing your request.`,
  },
  {
    title: '9. California Privacy Rights (CCPA)',
    body: `If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, use, and disclose; the right to delete your personal information; and the right to opt out of the sale of personal information. We do not sell personal information. To exercise your CCPA rights, contact us at ${EMAIL}. We will not discriminate against you for exercising your privacy rights.`,
  },
  {
    title: '10. Children\'s Privacy',
    body: `Our Site and services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take steps to delete that information promptly. If you believe we have inadvertently collected such information, please contact us at ${EMAIL}.`,
  },
  {
    title: '11. Third-Party Links',
    body: `Our Site may contain links to third-party websites, tools, and services. We are not responsible for the privacy practices or content of those third parties. We encourage you to review the privacy policies of any third-party sites you visit. The inclusion of a link does not imply our endorsement of that site or service.`,
  },
  {
    title: '12. International Transfers',
    body: `Your information may be transferred to and processed in countries other than your own, including the United States. These countries may have data protection laws that differ from your jurisdiction. By using our Site or services, you consent to the transfer of your information to the United States and to other countries as necessary to provide our services.`,
  },
  {
    title: '13. Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Policy on this page with an updated effective date. Your continued use of the Site after such changes constitutes your acceptance of the updated Policy. We encourage you to review this Policy periodically.`,
  },
  {
    title: '14. Contact Us',
    body: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:\n\n${COMPANY}\nEmail: ${EMAIL}\nLocation: Tempe, ${STATE}`,
  },
]

/* Renders a paragraph, replacing any email address with a plain unclickable span */
function SafeParagraph({ text, email }: { text: string; email: string }) {
  const parts = text.split(email)
  return (
    <p style={{ fontFamily: 'var(--sans)', fontSize: '0.88rem', color: 'rgba(15,15,14,0.72)', lineHeight: 1.8, marginBottom: '1rem', whiteSpace: 'pre-line' }}>
      {parts.map((part, k) => (
        <span key={k}>
          {part}
          {k < parts.length - 1 && (
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', color: '#0f0f0e', userSelect: 'text' }}>{email}</span>
          )}
        </span>
      ))}
    </p>
  )
}

export default function PrivacyPage() {
  return (
    <div style={{ background: '#f5f4f0', minHeight: '100vh', fontFamily: 'var(--sans)', paddingTop: '60px' }}>

      {/* Hero */}
      <div style={{ background: '#0f0f0e', padding: '5rem 2.5rem 4rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '2.5rem' }}>
            <span style={{ width: 8, height: 8, background: '#e8521a', borderRadius: '50%', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: '0.88rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#f7f5f0' }}>DFYAI</span>
          </Link>

          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#e8521a', display: 'block', marginBottom: '1rem' }}>Legal</span>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, color: '#f7f5f0', lineHeight: 1.1, marginBottom: '1rem' }}>
            Privacy Policy
          </h1>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'rgba(247,245,240,0.35)', letterSpacing: '0.06em' }}>
            Effective date: {EFFECTIVE_DATE} · {COMPANY}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '4rem 2.5rem 6rem' }}>

        {/* Intro callout */}
        <div style={{ background: '#ffffff', border: '1px solid rgba(232,82,26,0.25)', borderLeft: '3px solid #e8521a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '3rem' }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.88rem', color: '#0f0f0e', lineHeight: 1.7, margin: 0 }}>
            Your privacy matters to us. This Policy explains exactly what data we collect, why we collect it, and how we protect it. We do not sell your personal information — ever.
          </p>
        </div>

        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: '2.5rem', paddingBottom: '2.5rem', borderBottom: i < sections.length - 1 ? '1px solid rgba(15,15,14,0.08)' : 'none' }}>
            <h2 style={{ fontFamily: 'var(--sans)', fontSize: '1rem', fontWeight: 600, color: '#0f0f0e', marginBottom: '0.85rem' }}>{s.title}</h2>
            {s.body.split('\n\n').map((para, j) => (
              <SafeParagraph key={j} text={para} email={EMAIL} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}