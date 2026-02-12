import PageShell from '@/components/layout/PageShell'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Privacy Policy | STABRAQ',
    description: 'How Stabraq collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
    return (
        <PageShell>
            <section className="py-20 md:py-28 bg-luxury-black text-white text-center px-4">
                <span className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] block mb-4">Legal</span>
                <h1 className="text-4xl md:text-6xl font-display tracking-tight">Privacy Policy</h1>
                <p className="text-white/40 text-sm mt-4">Last updated: February 2025</p>
            </section>

            <section className="py-20 px-4 md:px-8">
                <div className="max-w-3xl mx-auto prose prose-gray prose-headings:font-display prose-headings:tracking-tight">
                    <h2>Information We Collect</h2>
                    <p>When you visit our site or make a purchase, we collect certain information including:</p>
                    <ul>
                        <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address, and billing information provided during checkout.</li>
                        <li><strong>Account Data:</strong> Login credentials and profile preferences when you create an account.</li>
                        <li><strong>Usage Data:</strong> Pages visited, time spent on site, and interactions with our features.</li>
                        <li><strong>Device Data:</strong> Browser type, IP address, and device information for analytics.</li>
                    </ul>

                    <h2>How We Use Your Information</h2>
                    <ul>
                        <li>Process and fulfill your orders</li>
                        <li>Communicate with you about your orders and account</li>
                        <li>Send marketing emails (only with your consent)</li>
                        <li>Improve our website and product offerings</li>
                        <li>Prevent fraud and ensure security</li>
                    </ul>

                    <h2>Data Protection</h2>
                    <p>We implement industry-standard security measures to protect your personal information. Your payment data is encrypted using SSL technology and processed through secure payment gateways. We never store your full credit card details on our servers.</p>

                    <h2>Third-Party Sharing</h2>
                    <p>We do not sell your personal information. We share data only with:</p>
                    <ul>
                        <li>Shipping providers (to deliver your orders)</li>
                        <li>Payment processors (to process transactions securely)</li>
                        <li>Analytics tools (anonymized data to improve our service)</li>
                    </ul>

                    <h2>Cookies</h2>
                    <p>We use cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can manage cookie preferences through your browser settings.</p>

                    <h2>Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Access, correct, or delete your personal data</li>
                        <li>Opt out of marketing communications at any time</li>
                        <li>Request a copy of your data</li>
                    </ul>

                    <h2>Contact</h2>
                    <p>For privacy-related inquiries, contact us at <strong>info@stabraq.com</strong>.</p>
                </div>
            </section>
        </PageShell>
    )
}
