'use client'

import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/data/products'

/**
 * Social/Instagram-style image grid for homepage
 * Uses real product images in a mosaic layout
 */
export default function InstagramFeed() {
    // Pick 6 distinct product images
    const feedImages = products.slice(0, 6).map((p) => ({
        src: p.image,
        alt: p.name,
        id: p.id,
    }))

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="section-container text-center mb-12">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 block mb-4">
                    @stabraqts
                </span>
                <h2 className="text-3xl md:text-5xl font-display text-luxury-black tracking-tight">
                    Follow Our Journey
                </h2>
            </div>

            {/* Mosaic grid */}
            <div className="max-w-[1800px] mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
                    {feedImages.map((img, i) => (
                        <Link
                            key={img.id}
                            href={`/products/${img.id}`}
                            className={`group relative overflow-hidden bg-[#F5F5F0] ${i === 0
                                    ? 'md:col-span-2 md:row-span-2 aspect-square'
                                    : 'aspect-square'
                                }`}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                                sizes={i === 0 ? '(max-width: 768px) 50vw, 33vw' : '(max-width: 768px) 50vw, 16vw'}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </Link>
                    ))}
                </div>
            </div>

            <div className="text-center mt-10">
                <a
                    href="https://instagram.com/stabraqts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs font-bold uppercase tracking-widest text-luxury-black border border-black/20 px-8 py-3 rounded-full hover:bg-luxury-black hover:text-white transition-colors"
                >
                    Follow on Instagram
                </a>
            </div>
        </section>
    )
}
