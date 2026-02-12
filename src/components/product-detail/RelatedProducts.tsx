'use client'

import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { useWishlistStore } from '@/store/wishlistStore'
import { Heart } from 'lucide-react'

interface RelatedProductsProps {
    currentProductId: string
    category: string
}

export default function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
    // Find products in the same category, excluding the current one
    const related = products
        .filter((p) => p.category === category && p.id !== currentProductId)
        .slice(0, 4)

    // Fallback: If not enough related products, fill with 'Featured' products
    if (related.length < 4) {
        const more = products
            .filter((p) => p.featured && p.id !== currentProductId && !related.find((r) => r.id === p.id))
            .slice(0, 4 - related.length)
        related.push(...more)
    }

    if (related.length === 0) return null

    return (
        <section className="py-24 bg-white border-t border-black/5">
            <div className="section-container">
                <h2 className="text-2xl md:text-3xl font-display text-luxury-black mb-12 tracking-tight">
                    You May Also Like
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {related.map((product) => (
                        <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            className="group block"
                        >
                            <div className="relative aspect-[3/4] bg-gray-50 rounded-xl overflow-hidden mb-4">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    className="object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Wishlist Button */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        useWishlistStore.getState().toggleItem(product.id)
                                    }}
                                    className="absolute top-3 right-3 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-sm z-10"
                                >
                                    <Heart
                                        className={`w-4 h-4 transition-colors ${useWishlistStore.getState().isInWishlist(product.id)
                                            ? 'fill-red-500 text-red-500'
                                            : 'text-luxury-black'
                                            }`}
                                    />
                                </button>
                            </div>

                            <div className="space-y-1">
                                <h3 className="font-medium text-luxury-black group-hover:underline underline-offset-4">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-500">{formatPrice(product.price)}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
