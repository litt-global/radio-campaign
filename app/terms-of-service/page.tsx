'use client'

import Link from "next/link"
import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#2B0F45] to-black text-white">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#FF1CF7] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF1CF7]">LITT LIVE PTY LTD – TERMS OF SERVICE</h1>
          
          <div className="space-y-2 mb-8 text-sm text-gray-400">
            <p>ABN 92 661 906 270</p>
            <p>Effective Date: 18 November 2025</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <p className="text-base leading-relaxed">
              These Terms of Service ("Terms") govern your use of music.littlive.com and all services, digital products, promotions, and radio packages offered by LITT Live Pty Ltd ("LITT Live", "we", "us", "our").
            </p>
            
            <p className="text-base leading-relaxed font-semibold text-white">
              By purchasing any package, uploading any content, or using any LITT Live service, you agree to be legally bound by these Terms.
              If you do not agree, do not purchase or submit content.
            </p>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-[#FF1CF7] mt-8">1. Eligibility</h2>
              <p>There is no minimum age requirement to purchase or submit content.</p>
              <p>By using the platform, you represent that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You have the legal capacity to enter into this agreement; or</li>
                <li>If you are under 18, a parent/guardian/manager has approved your participation and agrees to these Terms on your behalf.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-[#FF1CF7] mt-8">2. Services & Packages</h2>
              <p>LITT Live offers the following promotional packages ("Packages"), each running for a 30-day campaign:</p>
              
              <div className="space-y-6 mt-4">
                <div className="bg-black/30 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-2">SPARK – $499</h3>
                  <p className="italic mb-2">Your first spins. Your voice on air.</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Airplay on 1 genre-matched station</li>
                    <li>3 plays/day × 30 days = 90 plays</li>
                    <li>Self-recorded intro liner before the track</li>
                    <li>1× Instagram Reel feature on @LITTXLIVE</li>
                  </ul>
                </div>

                <div className="bg-black/30 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-2">WAVE – $999</h3>
                  <p className="italic mb-2">Your voice. Your song. Your wave.</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Airplay on 2 genre-matched stations</li>
                    <li>6 plays/day × 30 days = 180 plays</li>
                    <li>Self-recorded intro liner</li>
                    <li>2× Instagram Reel features</li>
                    <li>Feature in LITT Live News email (400,000+ subscribers)</li>
                  </ul>
                </div>

                <div className="bg-black/30 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-2">PRIME – $1,999</h3>
                  <p className="italic mb-2">Prime time presence.</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Airplay on 3 genre-matched stations</li>
                    <li>8 plays/day × 30 days = 240 plays</li>
                    <li>Self-recorded intro liner</li>
                    <li>Homepage carousel feature – 7 days (website + app)</li>
                    <li>3× Instagram Reel features</li>
                  </ul>
                </div>

                <div className="bg-black/30 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-2">EXEC – $2,999</h3>
                  <p className="italic mb-2">Sound like a star. Move like an exec.</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Airplay on 4 genre-matched stations</li>
                    <li>12 plays/day × 30 days = 360 plays</li>
                    <li>Self-recorded intro liner</li>
                    <li>Homepage carousel feature – 14 days</li>
                    <li>4× Instagram Reel features</li>
                    <li>News email feature</li>
                  </ul>
                </div>

                <div className="bg-black/30 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-2">ICON – $4,999</h3>
                  <p className="italic mb-2">Icon energy – your voice across the network.</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Airplay on 5 genre-matched stations</li>
                    <li>24 plays/day × 30 days = 720 plays</li>
                    <li>Self-recorded intro liner</li>
                    <li>Homepage carousel feature – 30 days</li>
                    <li>5× Instagram Reel features</li>
                    <li>IG Collab Post – 30 days minimum</li>
                    <li>News email feature</li>
                    <li>30-second Akon-recorded promo, played once per day for 30 days</li>
                  </ul>
                </div>
              </div>
              
              <p className="mt-4">Packages may be updated, varied, or amended at any time without notice.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-[#FF1CF7] mt-8">3. Submission Standards & Right to Refuse</h2>
              <p>LITT Live retains full editorial and programming control.</p>
              <p>We may refuse, decline, suspend, or remove any submitted content at any time for any reason, including but not limited to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Poor audio quality</li>
                <li>Unsuitable content</li>
                <li>Copyright concerns</li>
                <li>Offensive or harmful material</li>
                <li>Lack of rights or ownership</li>
                <li>Breach of content rules</li>
                <li>Incomplete submission</li>
                <li>Misleading information</li>
                <li>Any reason determined by LITT Live programmers</li>
              </ul>
              <p className="mt-3">LITT Live is not required to provide an explanation for refusal.</p>
              <p>If content is refused before the campaign begins, you will receive a 100% refund. If refusal occurs after the campaign begins, refunds may be denied at LITT Live's discretion.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-[#FF1CF7] mt-8">4. Content Rules</h2>
              <p>You must not upload or submit content that:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Contains hate speech, discrimination, violence, or threats</li>
                <li>Contains sexually explicit or pornographic content</li>
                <li>Defames or harms any individual or group</li>
                <li>Contains illegal or dangerous content</li>
                <li>Includes copyrighted material you do not own or have rights to</li>
                <li>Includes AI-generated vocals or music without full commercial rights</li>
                <li>Contains unlicensed samples, beats, or stems</li>
                <li>Violates any Australian law or broadcasting standard</li>
                <li>Is extremely low quality or unfit for radio</li>
              </ul>
              <p className="mt-3">LITT Live may determine violations at its sole discretion.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-[#FF1CF7] mt-8">5. Rights Granted to LITT Live</h2>
              <p>By uploading or submitting any audio, artwork, video, voice liner, promotional material, or related files ("Content"), you grant LITT Live a:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Fully-paid</li>
                <li>Royalty-free</li>
                <li>Non-exclusive</li>
                <li>Worldwide</li>
                <li>Sublicensable</li>
                <li>Transferable</li>
              </ul>
              <p className="mt-3">licence to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Broadcast your Content</li>
                <li>Stream and replay your Content</li>
                <li>Promote your Content</li>
                <li>Use your Content across radio, social media, website, app, email, and live events</li>
                <li>Use your Content for marketing, advertising, and internal analytics</li>
                <li>Use your Content permanently for historical or archival purposes</li>
              </ul>
              <p className="mt-3 font-semibold text-white">You retain all ownership of your Content.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-[#FF1CF7] mt-8">6. Programming Control</h2>
              <p>You acknowledge that LITT Live has complete discretion over:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Station assignment</li>
                <li>Scheduling</li>
                <li>Timing of plays</li>
                <li>Frequency of plays (within your package limits)</li>
                <li>Rescheduling due to programming needs</li>
                <li>Adjustments for better audience reach</li>
                <li>Rotation changes</li>
                <li>Genre-matching decisions</li>
              </ul>
              <p className="mt-3">LITT Live always aims to achieve the best possible audience exposure but makes no guarantees regarding audience size or outcomes.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-[#FF1CF7] mt-8">7. Payments, Billing & No Chargebacks</h2>
              <p>All payments are processed by Stripe.</p>
              <p>By purchasing a package, you agree that:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>All sales are final except where content is refused prior to the campaign</li>
                <li>You will not initiate any chargeback or payment dispute</li>
                <li>Attempting a chargeback is a breach of this agreement</li>
                <li>LITT Live may seek recovery of costs, legal fees, and damages for fraudulent disputes</li>
              </ul>
              <p className="mt-3 font-semibold text-white">This clause applies globally.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-[#FF1CF7] mt-8">8. Refund Policy</h2>
              <p>Refunds are only issued if:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your submission is refused before campaign activation; or</li>
                <li>LITT Live cancels the campaign for internal reasons</li>
              </ul>
              <p className="mt-3">Refunds are not available for:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Dissatisfaction with play results or audience size</li>
                <li>Change of mind</li>
                <li>Failure to provide correct files or materials</li>
                <li>Technical issues caused by the user</li>
                <li>Copyright or rights disputes</li>
                <li>Breaches of these Terms</li>
                <li>Campaigns that have already commenced</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-[#FF1CF7] mt-8">9. Copyright, Ownership & Indemnity</h2>
              <p>You warrant that:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>You fully own or control all rights to your Content</li>
                <li>You have the authority to grant LITT Live the licence described herein</li>
                <li>Your Content does not infringe any third-party copyright or rights</li>
                <li>All samples, stems, beats, vocals, and AI elements are properly licensed</li>
                <li>Your Content complies with all applicable laws</li>
              </ul>
              <p className="mt-3">You agree to indemnify, defend, and hold harmless LITT Live, its directors, staff, and partners from any claims or damages arising from:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your Content</li>
                <li>Copyright disputes</li>
                <li>Third-party claims</li>
                <li>Misrepresentation</li>
                <li>Breach of these Terms</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-[#FF1CF7] mt-8">10. No Guarantees</h2>
              <p>LITT Live guarantees only the deliverables explicitly stated in your package.</p>
              <p>You acknowledge that LITT Live does not guarantee:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Audience size</li>
                <li>Fan growth</li>
                <li>Streams</li>
                <li>Followers</li>
                <li>Charting</li>
                <li>Media coverage</li>
                <li>Viral exposure</li>
                <li>Music career outcomes</li>
              </ul>
              <p className="mt-3 font-semibold text-white">The service is strictly promotional.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-[#FF1CF7] mt-8">11. Data, Privacy & Communications</h2>
              <p>LITT Live may collect and store:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Contact information</li>
                <li>Submitted Content and metadata</li>
                <li>Analytics</li>
                <li>Purchase and usage history</li>
                <li>IP address and technical logs</li>
              </ul>
              <p className="mt-3">Data is used for:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Service delivery</li>
                <li>Account management</li>
                <li>Communication</li>
                <li>Compliance with law</li>
                <li>Marketing (opt-out available)</li>
              </ul>
              <p className="mt-3">All data is handled under Australian privacy law.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-[#FF1CF7] mt-8">12. Termination</h2>
              <p>LITT Live may suspend or terminate a campaign if:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>You breach these Terms</li>
                <li>Your Content violates policies</li>
                <li>Fraud, payment issues, or disputes occur</li>
                <li>You present a legal, reputational, or operational risk</li>
              </ul>
              <p className="mt-3">No refunds apply to terminations caused by your breach.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-[#FF1CF7] mt-8">13. Limitation of Liability</h2>
              <p>To the fullest extent permitted by law:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>LITT Live is not liable for indirect, incidental, or consequential damages</li>
                <li>LITT Live's total liability is limited strictly to the amount paid for your package</li>
                <li>You use the platform and services at your own risk</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-[#FF1CF7] mt-8">14. Governing Law & Jurisdiction</h2>
              <p>These Terms are governed by the laws of Western Australia.</p>
              <p>You agree that all disputes must be brought exclusively in a Western Australian court, and you submit to its jurisdiction.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-[#FF1CF7] mt-8">15. Acceptance of Terms</h2>
              <p>By purchasing a package, uploading content, or accessing LITT Live services, you:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Confirm you have read and understood these Terms</li>
                <li>Agree to be legally bound by them</li>
                <li>Authorise LITT Live to broadcast and use your Content</li>
                <li>Accept the refund and no-chargeback policies</li>
                <li>Accept that all programming decisions are final</li>
                <li>Confirm you own the rights to all submitted Content</li>
              </ul>
              <p className="mt-3 font-semibold text-white">If you do not agree, do not proceed with any purchase.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-[#FF1CF7] mt-8">16. Agreement Between You and LITT Live</h2>
              <p>By purchasing any package or uploading any Content, you enter into a legally binding agreement with LITT Live Pty Ltd (ABN 92 661 906 270).</p>
              
              <h3 className="text-xl font-bold text-white mt-4">16.1 Your Obligations</h3>
              <p>You agree to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide accurate information and lawful Content</li>
                <li>Own or control all rights to the Content</li>
                <li>Comply with all Terms and all applicable laws</li>
                <li>Pay all fees and not initiate chargebacks</li>
                <li>Accept programming decisions as final</li>
                <li>Indemnify LITT Live from all claims relating to your Content</li>
              </ul>

              <h3 className="text-xl font-bold text-white mt-4">16.2 LITT Live's Obligations</h3>
              <p>LITT Live agrees to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Deliver package inclusions within the 30-day campaign</li>
                <li>Use reasonable professional judgment for programming and placement</li>
                <li>Issue refunds only where specified</li>
                <li>Handle your data in accordance with Australian privacy law</li>
              </ul>

              <h3 className="text-xl font-bold text-white mt-4">16.3 Binding Contract</h3>
              <p>Upon purchase:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>A binding legal contract is formed</li>
                <li>You grant LITT Live all necessary rights to your Content</li>
                <li>You waive any rights to dispute payment via chargebacks</li>
                <li>You accept all limitations and conditions within these Terms</li>
              </ul>

              <h3 className="text-xl font-bold text-white mt-4">16.4 Entire Agreement</h3>
              <p>These Terms constitute the entire agreement between you and LITT Live and override any previous written or spoken communication.</p>

              <h3 className="text-xl font-bold text-white mt-4">16.5 Amendments</h3>
              <p>LITT Live may update these Terms at any time. Continuing to use the platform after updates constitutes acceptance.</p>

              <h3 className="text-xl font-bold text-white mt-4">16.6 Severability</h3>
              <p>If any clause is deemed unenforceable, the remainder of the Terms remain fully valid.</p>
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
