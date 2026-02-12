import PageShell from '@/components/layout/PageShell'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Returns & Exchanges | STABRAQ',
    description: 'Our returns and exchange policy for all Stabraq products.',
}

export default function ReturnsPage() {
    return (
        <PageShell>
            {/* Hero */}
            <section className="py-20 md:py-28 bg-luxury-black text-white text-center px-4">
                <span className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] block mb-4">Policies</span>
                <h1 className="text-4xl md:text-6xl font-display tracking-tight">Returns & Exchanges</h1>
            </section>

            {/* Highlight */}
            <section className="py-12 px-4 md:px-8 border-b border-black/5">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-block bg-luxury-black text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest">
                        14-Day Return Window
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-20 px-4 md:px-8">
                <div className="max-w-3xl mx-auto prose prose-gray prose-headings:font-display prose-headings:tracking-tight">
                    <h2>Return Policy</h2>
                    <p>We want you to be completely satisfied with your purchase. If you&apos;re not happy with your order, you may return it within <strong>14 days</strong> of delivery for a full refund or exchange.</p>

                    <h2>Conditions</h2>
                    <ul>
                        <li>Items must be <strong>unworn, unwashed, and in original condition</strong> with all tags attached.</li>
                        <li>Items must be returned in their original packaging.</li>
                        <li>Sale and clearance items are <strong>final sale</strong> and cannot be returned.</li>
                        <li>Accessories (caps, bags, socks) are non-refundable for hygiene reasons but may be exchanged if defective.</li>
                    </ul>

                    <h2>How to Return</h2>
                    <ol>
                        <li><strong>Contact us</strong> at info@stabraq.com with your order number and reason for return.</li>
                        <li>We&apos;ll provide you with a <strong>return authorization</strong> and instructions.</li>
                        <li><strong>Ship the item</strong> back to our warehouse (return shipping is at the customer&apos;s expense unless the item is defective).</li>
                        <li>Once received and inspected, your <strong>refund will be processed within 5–7 business days</strong>.</li>
                    </ol>

                    <h2>Exchanges</h2>
                    <p>Want a different size or color? We&apos;re happy to exchange — subject to availability. Simply mention your preferred exchange option when contacting us. Exchange shipping is free.</p>

                    <h2>Defective Items</h2>
                    <p>If you receive a defective or damaged item, please contact us within <strong>48 hours</strong> of delivery with photos of the defect. We will arrange a <strong>free return and replacement</strong>.</p>

                    <h2>Refund Method</h2>
                    <p>Refunds are issued to the original payment method. Please allow 5–10 business days for the refund to appear on your statement, depending on your bank.</p>
                </div>
            </section>
        </PageShell>
    )
}
