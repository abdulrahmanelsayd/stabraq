'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function PremiumBanner() {
    return (
        <section className="relative w-full h-[85vh] overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 bg-black">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-80"
                >
                    <source src="/hh.mp4" type="video/mp4" />
                </video>
                {/* Cinema Overlay */}
                <div className="absolute inset-0 bg-black/30 md:bg-black/20" />
            </div>

            {/* Editorial Content */}
            <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-6 md:px-16 items-start md:items-center text-center">
                <span className="text-white text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-4 animate-fade-in-up">
                    EST. 2024
                </span>

                <h2 className="text-4xl md:text-8xl font-display text-white mb-6 max-w-4xl leading-none animate-fade-in-up delay-100">
                    LEGACY
                </h2>

                <p className="text-white/90 text-lg md:text-xl font-medium tracking-wide mb-10 animate-fade-in-up delay-200">
                    Quality speaks.
                </p>

                <Link
                    href="/collections"
                    className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold transition-colors duration-300 animate-fade-in-up delay-300 group"
                >
                    SHOP
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    )
}
