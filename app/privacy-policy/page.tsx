'use client'

import Link from "next/link"
import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#2B0F45] to-black text-white">
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#FF1CF7] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl font-bold mb-4 text-[#FF1CF7]">LITT LIVE PTY LTD – PRIVACY POLICY</h1>
            <p className="text-gray-400">ABN 92 661 906 270</p>
            <p className="text-gray-400">Effective Date: 18 November 2025</p>
          </div>

          <p className="text-lg leading-relaxed">
            This Privacy Policy explains how LITT Live Pty Ltd (<span className="text-[#FF1CF7]">"LITT Live"</span>, "we", "our", "us") collects, uses, stores, discloses, and protects your personal information when you use <span className="font-semibold">music.littlive.com</span>, submit content, or purchase any services from us.
          </p>

          <p className="text-lg leading-relaxed">
            By using our website or services, you consent to the practices described in this Privacy Policy.
          </p>

          <div className="space-y-6">
            <section>
              <h2 className="text-3xl font-bold mb-4 text-[#FF1CF7]">1. Information We Collect</h2>
              <p className="text-lg leading-relaxed mb-4">
                We collect information that you voluntarily provide and information that is automatically collected when you use our platform.
              </p>
              
              <h3 className="text-2xl font-semibold mb-3 text-white">1.1 Information You Provide</h3>
              <p className="text-lg leading-relaxed mb-3">We may collect:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Social media handles</li>
                <li>Artist/label biographies</li>
                <li>Uploaded music, content, artwork, images, videos, and files</li>
                <li>Payment details (processed by Stripe – we do not store credit card numbers)</li>
                <li>Any information provided through forms, submissions, or customer support</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-3 mt-6 text-white">1.2 Automatically Collected Information</h3>
              <p className="text-lg leading-relaxed mb-3">When you use our website or services, we may automatically collect:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information (device type, OS, hardware model)</li>
                <li>Approximate geographic location</li>
                <li>Cookies and tracking pixels</li>
                <li>Behaviour analytics (pages visited, time spent, interactions, listening data, performance data)</li>
                <li>Referring websites and exit pages</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-[#FF1CF7]">2. Cookies & Tracking</h2>
              <p className="text-lg leading-relaxed mb-3">LITT Live uses:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                <li>Cookies</li>
                <li>Tracking pixels</li>
                <li>Social media tracking (Meta, Facebook, Instagram, TikTok)</li>
                <li>Analytics tools (Google Analytics, website analytics tools)</li>
              </ul>
              <p className="text-lg leading-relaxed mb-3">
                These are used to improve user experience, measure engagement, optimise performance, and run advertising and retargeting campaigns.
              </p>
              <p className="text-lg leading-relaxed">
                You may disable cookies in your browser, but certain features may not function correctly.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-[#FF1CF7]">3. How We Use Your Information</h2>
              <p className="text-lg leading-relaxed mb-3">We use your information to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Process purchases and payments</li>
                <li>Deliver and manage your promotional campaign</li>
                <li>Communicate with you about your account or submissions</li>
                <li>Personalise your user experience</li>
                <li>Improve our services, programming, and website functionality</li>
                <li>Conduct analytics and performance tracking</li>
                <li>Promote your music or campaign across LITT Live channels</li>
                <li>Conduct marketing, advertising, and promotional activities</li>
                <li>Operate and expand the LITT Live platform</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-[#FF1CF7]">4. Use of Customer Content & Marketing Rights</h2>
              <p className="text-lg leading-relaxed mb-3">By submitting content to LITT Live, you grant us the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                <li>Display your name, artist information, and campaign results</li>
                <li>Feature your Content on radio, email newsletters, social media, and our website</li>
                <li>Use your success stories as case studies</li>
                <li>Showcase your plays, rotation details, and campaign outcomes</li>
                <li>Promote your music or story in LITT Live advertising or promotional material</li>
              </ul>
              <p className="text-lg leading-relaxed">
                These uses may continue indefinitely unless otherwise requested and legally required.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-[#FF1CF7]">5. Sharing of Information</h2>
              <p className="text-lg leading-relaxed mb-3">We may share personal information with:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                <li>Stripe (payment processing)</li>
                <li>Email marketing providers (Mailchimp or equivalent)</li>
                <li>Social media platforms (Meta, Instagram, Facebook, TikTok, YouTube)</li>
                <li>Analytics and tracking providers</li>
                <li>Advertising partners and remarketing tools</li>
                <li>Radio distribution or streaming infrastructure partners</li>
                <li>Developers, contractors, engineers, and support staff</li>
                <li>Cloud hosting providers</li>
                <li>Professional advisers, lawyers, and auditors</li>
              </ul>
              <p className="text-lg leading-relaxed mb-3">
                We only share information necessary for providing services, improving performance, or meeting legal requirements.
              </p>
              <p className="text-lg leading-relaxed font-semibold text-white">
                We do not sell your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-[#FF1CF7]">6. International Data Transfers</h2>
              <p className="text-lg leading-relaxed mb-3">
                Because our service providers and systems may be located outside Australia, we may transfer your personal information internationally.
              </p>
              <p className="text-lg leading-relaxed mb-3">You acknowledge that:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Overseas jurisdictions may have different privacy laws</li>
                <li>By using our services, you consent to this transfer</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-[#FF1CF7]">7. Data Retention</h2>
              <p className="text-lg leading-relaxed mb-3">We retain personal information indefinitely, unless:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                <li>You request deletion</li>
                <li>Legal, contractual, or operational requirements require further retention</li>
              </ul>
              <p className="text-lg leading-relaxed">
                Campaign-related content may be retained for historical, promotional, or archival purposes.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-[#FF1CF7]">8. Minors</h2>
              <p className="text-lg leading-relaxed mb-3">Because we do not impose a minimum age requirement:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                <li>We may collect data from individuals under 18</li>
                <li>We do not knowingly identify or target minors</li>
                <li>If a minor uses our services without parental approval, LITT Live is not liable for any resulting issues</li>
              </ul>
              <p className="text-lg leading-relaxed">
                Parents or guardians may contact us for data removal requests
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-[#FF1CF7]">9. Data Security</h2>
              <p className="text-lg leading-relaxed mb-3">LITT Live takes reasonable steps to protect personal information from:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                <li>Misuse</li>
                <li>Loss</li>
                <li>Unauthorised access</li>
                <li>Disclosure</li>
                <li>Modification</li>
                <li>Destruction</li>
              </ul>
              <p className="text-lg leading-relaxed mb-3">
                While we implement industry-standard security measures, no system is completely secure.
              </p>
              <p className="text-lg leading-relaxed font-semibold text-white">
                You use the service at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-[#FF1CF7]">10. Your Rights</h2>
              <p className="text-lg leading-relaxed mb-3">Under Australian privacy law, you may request:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your data</li>
              </ul>
              <p className="text-lg leading-relaxed mb-3">To make a request, email:</p>
              <p className="text-xl font-semibold text-[#FF1CF7] mb-4">📧 support@littlive.com</p>
              <p className="text-lg leading-relaxed">
                We may need to verify your identity before processing your request.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-[#FF1CF7]">11. Third-Party Links</h2>
              <p className="text-lg leading-relaxed">
                Our website may contain links to third-party sites. We are not responsible for their content, policies, or practices.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-[#FF1CF7]">12. Changes to This Privacy Policy</h2>
              <p className="text-lg leading-relaxed mb-3">
                We may update this Privacy Policy at any time.
              </p>
              <p className="text-lg leading-relaxed">
                Continued use of our website after updates constitutes acceptance of the revised policy.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-[#FF1CF7]">13. Contact Us</h2>
              <p className="text-lg leading-relaxed mb-3">
                If you have questions about this Privacy Policy or wish to request access or deletion of your personal information, contact us at:
              </p>
              <p className="text-xl font-semibold text-[#FF1CF7]">📧 support@littlive.com</p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#FF1CF7] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
