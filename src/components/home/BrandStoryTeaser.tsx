import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * Editorial brand story teaser for homepage — leads to /about
 */
export default function BrandStoryTeaser() {
    return (
        <section className="py-24 md:py-32 bg-[#FAF9F6] overflow-hidden">
            <div className="section-container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Text */}
                    <div className="order-2 md:order-1">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 block mb-6">
                            Our Story
                        </span>
                        <h2 className="text-3xl md:text-5xl font-display text-luxury-black mb-8 tracking-tight leading-tight">
                            Rooted in Heritage.
                            <br />
                            Built for the Streets.
                        </h2>
                        <p className="text-gray-500 leading-relaxed mb-6 max-w-md">
                            From the ancient craftsmanship of Egypt to the energy of modern street culture —
                            Stabraq bridges two worlds. Every piece is a statement of heritage meeting hustle.
                        </p>
                        <p className="text-gray-500 leading-relaxed mb-10 max-w-md">
                            We source the finest Egyptian cotton, work with local artisans, and design for
                            those who refuse to blend in.
                        </p>
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 text-luxury-black text-xs font-bold uppercase tracking-widest group"
                        >
                            Read Our Story
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Visual — Split blocks */}
                    <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="aspect-[3/4] bg-luxury-black rounded-2xl overflow-hidden relative">
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover opacity-70"
                                >
                                    <source src="/men.mp4" type="video/mp4" />
                                </video>
                            </div>
                            <div className="bg-luxury-black/5 rounded-2xl p-6 text-center">
                                <div className="text-2xl font-display text-luxury-black">100%</div>
                                <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Egyptian Cotton</div>
                            </div>
                        </div>
                        <div className="space-y-4 pt-8">
                            <div className="bg-luxury-black/5 rounded-2xl p-6 text-center">
                                <div className="text-2xl font-display text-luxury-black">2024</div>
                                <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Established</div>
                            </div>
                            <div className="aspect-[3/4] bg-luxury-black rounded-2xl overflow-hidden relative">
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover opacity-70"
                                >
                                    <source src="/summers.mp4" type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
