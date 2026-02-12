import PageShell from '@/components/layout/PageShell'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About Us | STABRAQ',
    description: 'Discover the story behind Stabraq — Egyptian heritage meets modern streetwear.',
}

export default function AboutPage() {
    return (
        <PageShell>
            {/* Hero */}
            <section className="relative h-[50vh] min-h-[340px] bg-luxury-black flex items-end overflow-hidden">
                <video
                    autoPlay loop muted playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                >
                    <source src="/men.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative z-10 section-container pb-16">
                    <span className="text-white/50 text-xs font-bold uppercase tracking-[0.3em] block mb-4">Our Story</span>
                    <h1 className="text-5xl md:text-7xl font-display text-white tracking-tight">About Stabraq</h1>
                </div>
            </section>

            {/* Mission */}
            <section className="py-24 px-4 md:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 block mb-6">The Vision</span>
                    <h2 className="text-3xl md:text-5xl font-display text-luxury-black mb-8 leading-tight">
                        Where Heritage Meets the Streets
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        Stabraq was born from a simple belief — that fashion can honor tradition while pushing boundaries.
                        We draw from the richness of Egyptian culture, its calligraphy, its craftsmanship, its boldness —
                        and translate it into streetwear that speaks to a new generation.
                    </p>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-24 bg-luxury-black text-white px-4 md:px-8">
                <div className="max-w-[1400px] mx-auto">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 block mb-6 text-center">What We Stand For</span>
                    <h2 className="text-3xl md:text-5xl font-display text-center mb-16 tracking-tight">Our Pillars</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
                        {[
                            {
                                title: 'Heritage',
                                desc: 'Every design carries the weight of centuries of Egyptian artistry — reimagined for today.',
                                icon: '✦',
                            },
                            {
                                title: 'Quality',
                                desc: 'Premium Egyptian cotton, reinforced stitching, and fabrics that age beautifully.',
                                icon: '◆',
                            },
                            {
                                title: 'Community',
                                desc: 'More than a brand — a movement. Built by and for people who dare to be different.',
                                icon: '●',
                            },
                        ].map((v) => (
                            <div key={v.title} className="bg-luxury-black p-12 md:p-16 text-center">
                                <span className="text-3xl mb-6 block opacity-40">{v.icon}</span>
                                <h3 className="text-xl font-display mb-4 tracking-wide">{v.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24 px-4 md:px-8">
                <div className="max-w-3xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 block mb-6 text-center">Our Journey</span>
                    <h2 className="text-3xl md:text-5xl font-display text-center text-luxury-black mb-16 tracking-tight">The Timeline</h2>

                    <div className="space-y-12 border-l-2 border-black/10 pl-8 md:pl-12">
                        {[
                            { year: '2023', title: 'The Genesis', desc: 'Stabraq is founded with a singular vision: to bridge the gap between luxury fashion and cultural heritage.' },
                            { year: '2024', title: 'The First Collection', desc: 'Our debut collection launches, featuring premium Egyptian cotton and intricate detailing. The response is overwhelming.' },
                            { year: '2025', title: 'Global Reach', desc: 'Expanding beyond borders, Stabraq establishes a presence in key fashion capitals, introducing the Thawb collection.' },
                            { year: 'Future', title: 'The Evolution', desc: 'Continuing to innovate with sustainable materials and cutting-edge design, pushing the boundaries of what streetwear can be.' },
                        ].map((item, i) => (
                            <div key={i} className="relative">
                                <div className="absolute -left-[2.65rem] md:-left-[3.65rem] top-1 w-4 h-4 rounded-full bg-luxury-black border-4 border-[#FAF9F6]" />
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">{item.year}</span>
                                <h3 className="text-xl font-display text-luxury-black mt-1 mb-2">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-luxury-black text-white text-center px-4">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-display mb-6 tracking-tight">Join the Movement</h2>
                    <p className="text-white/60 mb-10 text-lg">Explore our latest collections and become part of the story.</p>
                    <Link
                        href="/collections"
                        className="inline-block bg-white text-black px-12 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold transition-colors duration-300"
                    >
                        Shop Now
                    </Link>
                </div>
            </section>
        </PageShell>
    )
}
