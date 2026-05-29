import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service | DoneForYouAI',
  description: 'Terms of Service for DoneForYouAI.com',
}

const EFFECTIVE_DATE = 'June 1, 2026'
const COMPANY       = 'HONNYDO LLC d/b/a DoneForYouAI'
const SITE          = 'DoneForYouAI.com'
const EMAIL         = 'hello@doneforyouai.com'
const STATE         = 'Arizona'

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing or using ${SITE} (the "Site") or engaging ${COMPANY} ("Company," "we," "us," or "our") for any services, you ("Client," "you," or "your") agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use the Site or engage our services. These Terms apply to all visitors, clients, and others who access or use the Site or our services.`,
  },
  {
    title: '2. Services',
    body: `${COMPANY} provides AI implementation services including, but not limited to: AI automation and workflow design, custom AI assistants and chatbots, AI content systems, AI-powered lead generation, done-for-you AI tool stack setup, AI strategy consulting, and prompt engineering. The specific scope of services to be delivered will be defined in a separate proposal, statement of work, or written agreement between you and the Company ("Project Agreement").`,
  },
  {
    title: '3. Pricing and Payment Terms',
    body: `Services are billed either on a per-hour or per-project basis, at the sole discretion of ${COMPANY}. The applicable rate and billing method will be specified in the Project Agreement or invoice issued prior to commencement of work.

3.1 Per-Hour Engagements. For hourly engagements, you agree to pay the agreed hourly rate for all time logged by the Company in connection with your project, including time spent on research, communication, revision, testing, and deployment.

3.2 Per-Project Engagements. For fixed-price project engagements, the quoted price covers only the scope of work explicitly described in the Project Agreement. Work that falls outside that defined scope — including additional features, integrations, revisions beyond the agreed revision rounds, or post-delivery modifications — is not included in the project price.

3.3 Invoicing. Invoices are due upon receipt unless otherwise stated in writing. Overdue balances accrue interest at 1.5% per month (18% per annum) or the maximum rate permitted by ${STATE} law, whichever is lower.

3.4 Non-Refundable Deposits. Any deposit paid to initiate a project is non-refundable. Deposits secure the Company's time and availability and are earned upon receipt.`,
  },
  {
    title: '4. Out-of-Scope Work and Additional Charges',
    body: `This is a critical provision. Any work requested by you that was not included in the original Project Agreement constitutes out-of-scope work and will be subject to additional charges.

4.1 Change Requests. If you request changes, additions, or modifications to the original agreed-upon scope — whether during the project, at delivery, or after delivery — the Company reserves the right to assess and charge for that additional work at its then-current hourly rate or issue a revised project quote.

4.2 No After-the-Fact Disputes. By requesting and receiving out-of-scope work — whether verbally, via email, text, chat, or any other communication — you acknowledge and agree that such work will be billed separately and that you are responsible for payment. You waive any right to dispute charges for work you requested and received on the basis that it was not included in the original agreement.

4.3 Retrospective Billing. The Company reserves the right to bill for work completed but not yet invoiced, including work performed under verbal or informal agreement. Acceptance of deliverables — including use of any system, code, content, or tool we provide — constitutes acceptance of billing for that work.

4.4 Scope Creep. The Company is not obligated to absorb scope creep. If a project grows beyond its original definition, we will notify you and present a revised estimate. We may pause work until a revised agreement is signed or a deposit is received.`,
  },
  {
    title: '5. Client Responsibilities',
    body: `You agree to: (a) provide timely feedback, approvals, and access to systems required for us to perform the work; (b) ensure all content, data, and credentials you provide are accurate and lawful; (c) maintain appropriate backups of your systems and data; and (d) notify us promptly of any issues or concerns. Delays caused by you — including delayed feedback, missing assets, or failure to provide access — may result in project timeline extensions or additional charges for re-engagement.`,
  },
  {
    title: '6. Intellectual Property',
    body: `Upon receipt of full payment, you own all custom deliverables created specifically for you under a Project Agreement. The Company retains ownership of all pre-existing tools, frameworks, methodologies, proprietary workflows, and general-purpose code, templates, or systems used in delivering services. We retain the right to use your project in our portfolio and to describe the work performed in marketing materials, unless you request otherwise in writing prior to project commencement.`,
  },
  {
    title: '7. Confidentiality',
    body: `Each party agrees to keep confidential any non-public, proprietary, or sensitive information disclosed by the other party in connection with services. This obligation does not apply to information that is publicly available, independently developed, or required to be disclosed by law. You agree not to reverse-engineer, resell, or redistribute any proprietary tools, systems, or methodologies we provide without prior written consent.`,
  },
  {
    title: '8. Expert Marketplace',
    body: `${SITE} operates a marketplace connecting businesses with independent AI experts ("Experts"). Experts are independent contractors, not employees or agents of ${COMPANY}. The Company does not guarantee the quality, accuracy, legality, or timeliness of Expert services. You engage Experts at your own risk. Any disputes between you and an Expert are between you and that Expert. The Company takes a platform fee on transactions facilitated through the marketplace. Fees are non-refundable except as required by law.`,
  },
  {
    title: '9. Limitation of Liability',
    body: `To the maximum extent permitted by applicable law, ${COMPANY} shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including lost profits, lost data, business interruption, or reputational harm — arising out of or related to your use of our services, even if advised of the possibility of such damages. Our total cumulative liability to you for any claim arising out of or related to these Terms or our services shall not exceed the total amount paid by you to the Company in the three (3) months preceding the claim.`,
  },
  {
    title: '10. No Guarantee of Results',
    body: `The Company makes no guarantees regarding the performance, revenue impact, or business outcomes of any AI system, workflow, or strategy we implement. AI tools and systems are subject to the policies and availability of third-party providers. Results depend on many factors outside our control, including your business operations, market conditions, and third-party platform changes. You acknowledge that AI implementation is an evolving field and that no specific outcome is guaranteed.`,
  },
  {
    title: '11. Third-Party Services',
    body: `Our services may involve integration with or reliance on third-party tools, platforms, and APIs (including but not limited to OpenAI, Anthropic, Zapier, Make, Supabase, Stripe, Vercel, Cloudflare, and others). The Company is not responsible for outages, policy changes, pricing changes, or discontinuation of third-party services. Additional costs from third-party tools are your responsibility unless explicitly included in the Project Agreement.`,
  },
  {
    title: '12. Termination',
    body: `Either party may terminate a project engagement with written notice. Upon termination: (a) you owe payment for all work completed up to the termination date, including any out-of-scope work performed; (b) any non-refundable deposits are forfeited; (c) the Company will deliver all completed work product upon receipt of final payment. The Company reserves the right to terminate or suspend access to the Site or our services at any time for violation of these Terms.`,
  },
  {
    title: '13. Dispute Resolution',
    body: `Any dispute arising out of or relating to these Terms or our services shall first be subject to good-faith negotiation between the parties. If not resolved within 30 days, disputes shall be resolved by binding arbitration administered in ${STATE} under the rules of the American Arbitration Association. You waive any right to a jury trial or class action. Notwithstanding the foregoing, either party may seek injunctive relief in a court of competent jurisdiction in ${STATE} to prevent irreparable harm.`,
  },
  {
    title: '14. Governing Law',
    body: `These Terms are governed by and construed in accordance with the laws of the State of ${STATE}, without regard to its conflict-of-law provisions. You consent to the exclusive jurisdiction of the courts located in ${STATE} for any matters not subject to arbitration.`,
  },
  {
    title: '15. Changes to These Terms',
    body: `We reserve the right to update these Terms at any time. We will post the updated Terms on this page with a revised effective date. Continued use of the Site or our services after such changes constitutes your acceptance of the updated Terms. It is your responsibility to review these Terms periodically.`,
  },
  {
    title: '16. Entire Agreement',
    body: `These Terms, together with any Project Agreement or invoice, constitute the entire agreement between you and ${COMPANY} with respect to its subject matter and supersede all prior agreements, understandings, and representations. If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.`,
  },
  {
    title: '17. Contact',
    body: `Questions about these Terms? Contact us at ${EMAIL} or by mail at ${COMPANY}, Tempe, Arizona.`,
  },
]

export default function TermsPage() {
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
            Terms of Service
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
            <strong>Please read these Terms carefully before engaging our services.</strong> They contain important provisions about payment obligations, out-of-scope billing, limitation of liability, and dispute resolution. By working with us, you agree to these Terms.
          </p>
        </div>

        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: '2.5rem', paddingBottom: '2.5rem', borderBottom: i < sections.length - 1 ? '1px solid rgba(15,15,14,0.08)' : 'none' }}>
            <h2 style={{ fontFamily: 'var(--sans)', fontSize: '1rem', fontWeight: 600, color: '#0f0f0e', marginBottom: '0.85rem', letterSpacing: '0.01em' }}>{s.title}</h2>
            {s.body.split('\n\n').map((para, j) => (
              <p key={j} style={{ fontFamily: 'var(--sans)', fontSize: '0.88rem', color: 'rgba(15,15,14,0.72)', lineHeight: 1.8, marginBottom: j < s.body.split('\n\n').length - 1 ? '1rem' : 0, whiteSpace: 'pre-line' }}>
                {/* Replace email address with plain unlinked span */}
                {para.split(EMAIL).map((part, k, arr) => (
                  <span key={k}>
                    {part}
                    {k < arr.length - 1 && (
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', color: '#0f0f0e' }}>{EMAIL}</span>
                    )}
                  </span>
                ))}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}