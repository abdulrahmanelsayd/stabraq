'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

export default function CategorySplit() {
    return (
        <section className="w-full grid grid-cols-1 md:grid-cols-2 h-[80vh] md:h-screen">
            {/* Left: MEN */}
            <Link href="/collections/men" className="relative group overflow-hidden block h-full">
                <div className="absolute inset-0 bg-gray-100">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    >
                        <source src="/men.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
                    <div className="flex justify-between items-end border-b border-white/30 pb-4 mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h2 className="text-4xl md:text-6xl font-display text-white">MEN</h2>
                        <ArrowUpRight className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <p className="text-white/80 text-sm md:text-base font-light max-w-md transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        Explore the latest in luxury streetwear. Hoodies, oversized tees, and denim.
                    </p>
                </div>
            </Link>

            {/* Right: SUMMERS / NEW */}
            <Link href="/collections/summers" className="relative group overflow-hidden block h-full">
                <div className="absolute inset-0 bg-gray-100">
                    <Image
                        src="/summer.png"
                        alt="Summer Collection"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
                    <div className="flex justify-between items-end border-b border-white/30 pb-4 mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h2 className="text-4xl md:text-6xl font-display text-white">SUMMERS</h2>
                        <ArrowUpRight className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <p className="text-white/80 text-sm md:text-base font-light max-w-md transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        Lightweight fabrics and vibrant aesthetics for the season.
                    </p>
                </div>
            </Link>
        </section>
    )
}
