import PageShell from '@/components/layout/PageShell'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Terms of Service | STABRAQ',
    description: 'Terms and conditions for using the Stabraq website and services.',
}

export default function TermsPage() {
    return (
        <PageShell>
            <section className="py-20 md:py-28 bg-luxury-black text-white text-center px-4">
                <span className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] block mb-4">Legal</span>
                <h1 className="text-4xl md:text-6xl font-display tracking-tight">Terms of Service</h1>
                <p className="text-white/40 text-sm mt-4">Last updated: February 2025</p>
            </section>

            <section className="py-20 px-4 md:px-8">
                <div className="max-w-3xl mx-auto prose prose-gray prose-headings:font-display prose-headings:tracking-tight">
                    <h2>1. Agreement to Terms</h2>
                    <p>By accessing or using the Stabraq website (stabraq.com), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our site.</p>

                    <h2>2. Products & Pricing</h2>
                    <ul>
                        <li>All prices are listed in <strong>Egyptian Pounds (EGP)</strong> and include applicable taxes unless otherwise stated.</li>
                        <li>We reserve the right to modify prices at any time without prior notice.</li>
                        <li>Product colors may vary slightly from what is displayed on screen due to monitor settings.</li>
                        <li>We strive to maintain accurate stock levels, but items may occasionally sell out before the website is updated.</li>
                    </ul>

                    <h2>3. Orders & Payment</h2>
                    <ul>
                        <li>By placing an order, you confirm that all information provided is accurate.</li>
                        <li>We reserve the right to cancel any order due to pricing errors, stock issues, or suspected fraud.</li>
                        <li>Payment must be completed at the time of order placement.</li>
                    </ul>

                    <h2>4. Intellectual Property</h2>
                    <p>All content on this website — including but not limited to logos, designs, images, text, and graphics — is the property of Stabraq and is protected by copyright laws. You may not reproduce, distribute, or use any content without our prior written consent.</p>

                    <h2>5. User Accounts</h2>
                    <ul>
                        <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                        <li>You must provide accurate and complete information when creating an account.</li>
                        <li>We reserve the right to suspend or terminate accounts that violate these terms.</li>
                    </ul>

                    <h2>6. Limitation of Liability</h2>
                    <p>Stabraq shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products. Our total liability shall not exceed the amount paid for the specific product in question.</p>

                    <h2>7. Governing Law</h2>
                    <p>These terms are governed by and construed in accordance with the laws of the Arab Republic of Egypt. Any disputes shall be resolved in the competent courts of Cairo.</p>

                    <h2>8. Changes to Terms</h2>
                    <p>We may update these terms from time to time. Continued use of the website after changes constitutes acceptance of the revised terms.</p>

                    <h2>9. Contact</h2>
                    <p>For questions about these terms, contact us at <strong>info@stabraq.com</strong>.</p>
                </div>
            </section>
        </PageShell>
    )
}
