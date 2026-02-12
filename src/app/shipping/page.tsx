import PageShell from '@/components/layout/PageShell'
import { Truck, Clock, MapPin, Package } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Shipping Policy | STABRAQ',
    description: 'Shipping information, delivery times, and costs for Stabraq orders.',
}

export default function ShippingPage() {
    return (
        <PageShell>
            {/* Hero */}
            <section className="py-20 md:py-28 bg-luxury-black text-white text-center px-4">
                <span className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] block mb-4">Policies</span>
                <h1 className="text-4xl md:text-6xl font-display tracking-tight">Shipping Policy</h1>
            </section>

            {/* Quick Info Cards */}
            <section className="py-16 px-4 md:px-8 border-b border-black/5">
                <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { icon: Truck, title: 'Free Shipping', desc: 'On orders over 2,000 EGP' },
                        { icon: Clock, title: '3–5 Days', desc: 'Standard delivery' },
                        { icon: MapPin, title: 'Nationwide', desc: 'All Egyptian governorates' },
                        { icon: Package, title: 'Tracked', desc: 'Every order is trackable' },
                    ].map((item) => (
                        <div key={item.title} className="bg-white rounded-2xl p-6 text-center border border-black/5">
                            <div className="w-12 h-12 rounded-full bg-luxury-black/5 flex items-center justify-center mx-auto mb-4">
                                <item.icon className="w-5 h-5 text-luxury-black" />
                            </div>
                            <h3 className="font-display text-lg text-luxury-black mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Policy Content */}
            <section className="py-20 px-4 md:px-8">
                <div className="max-w-3xl mx-auto prose prose-gray prose-headings:font-display prose-headings:tracking-tight">
                    <h2>Delivery Areas</h2>
                    <p>We currently ship to all governorates within Egypt. International shipping is coming soon — stay tuned.</p>

                    <h2>Shipping Costs</h2>
                    <ul>
                        <li><strong>Orders over 2,000 EGP:</strong> Free standard shipping</li>
                        <li><strong>Orders under 2,000 EGP:</strong> Flat rate of 60 EGP</li>
                        <li><strong>Express shipping:</strong> Available at 120 EGP (1–2 business days within Cairo/Giza)</li>
                    </ul>

                    <h2>Processing Time</h2>
                    <p>Orders are processed within 1–2 business days. You will receive a confirmation email with a tracking number once your order has shipped.</p>

                    <h2>Estimated Delivery Times</h2>
                    <ul>
                        <li><strong>Cairo & Giza:</strong> 1–3 business days</li>
                        <li><strong>Alexandria & Delta:</strong> 2–4 business days</li>
                        <li><strong>Upper Egypt:</strong> 3–5 business days</li>
                        <li><strong>Remote areas:</strong> 5–7 business days</li>
                    </ul>

                    <h2>Order Tracking</h2>
                    <p>Once your order is dispatched, you will receive an SMS and email with a tracking link. You can also track your order through our website by logging into your account.</p>

                    <h2>Failed Delivery Attempts</h2>
                    <p>If delivery is unsuccessful after two attempts, the order will be returned to our warehouse. We will contact you to arrange redelivery. Additional shipping fees may apply.</p>

                    <h2>Questions?</h2>
                    <p>If you have any questions about shipping, please don&apos;t hesitate to contact us at <strong>info@stabraq.com</strong> or call <strong>01123399345</strong>.</p>
                </div>
            </section>
        </PageShell>
    )
}
