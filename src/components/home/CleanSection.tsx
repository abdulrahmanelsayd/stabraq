'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { ArrowRight, Heart } from 'lucide-react'
import { Product } from '@/types'
import { useWishlistStore } from '@/store/wishlistStore'

interface CleanSectionProps {
    title: string
    subtitle?: string
    products: Product[]
    viewAllLink?: string
}

export default function CleanSection({ title, subtitle, products, viewAllLink = '/collections' }: CleanSectionProps) {
    const { toggleItem: toggleWishlistItem, isInWishlist } = useWishlistStore()
    return (
        <section className="w-full bg-white py-24 px-4 md:px-8">
            <div className="max-w-[1800px] mx-auto">
                {/* Minimal Header */}
                <div className="flex justify-between items-end mb-12 border-b border-black/5 pb-6">
                    <div>
                        {subtitle && (
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">
                                {subtitle}
                            </span>
                        )}
                        <h2 className="text-3xl md:text-4xl font-display text-luxury-black tracking-tight">
                            {title}
                        </h2>
                    </div>
                    <Link
                        href={viewAllLink}
                        className="hidden md:flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-gray-500 hover:text-luxury-black transition-colors group"
                    >
                        View All
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Clean Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-16">
                    {products.map((product, i) => (
                        <Link href={`/products/${product.id}`} key={`${product.id}-${i}`} className="group cursor-pointer block">
                            {/* Image Container */}
                            <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-6 transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain mix-blend-multiply"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Wishlist Button */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        toggleWishlistItem(product.id)
                                    }}
                                    className="absolute top-3 right-3 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-sm z-10"
                                >
                                    <Heart
                                        className={`w-4 h-4 transition-colors ${isInWishlist(product.id)
                                            ? 'fill-red-500 text-red-500'
                                            : 'text-luxury-black'
                                            }`}
                                    />
                                </button>
                            </div>

                            {/* Minimal Details */}
                            <div className="space-y-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-luxury-black font-medium text-base group-hover:underline underline-offset-4 decoration-1">
                                        {product.name}
                                    </h3>
                                    <p className="text-luxury-black text-sm font-medium">
                                        {formatPrice(product.price)}
                                    </p>
                                </div>
                                <p className="text-gray-500 text-xs uppercase tracking-wider">
                                    {product.category || 'Collection'}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Mobile View All */}
                <div className="md:hidden mt-12 text-center">
                    <Link
                        href={viewAllLink}
                        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-luxury-black border-b border-black pb-1"
                    >
                        View All Collections
                    </Link>
                </div>
            </div>
        </section>
    )
}
