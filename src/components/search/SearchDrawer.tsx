'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Search, ArrowRight } from 'lucide-react'
import { useSearchStore } from '@/store/searchStore'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import gsap from 'gsap'

export default function SearchDrawer() {
    const { isOpen, toggleSearch } = useSearchStore()
    const [query, setQuery] = useState('')
    const drawerRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Filter products based on search
    const filteredProducts = query
        ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 4)
        : []

    // Animation effect
    useEffect(() => {
        if (!drawerRef.current || !overlayRef.current) return

        if (isOpen) {
            gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.3 })
            gsap.to(drawerRef.current, { x: '0%', duration: 0.5, ease: 'power3.out' })
            // Focus input after animation
            setTimeout(() => inputRef.current?.focus(), 300)
        } else {
            gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.3 })
            gsap.to(drawerRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' })
        }
    }, [isOpen])

    return (
        <>
            {/* Overlay Backdrop */}
            <div
                ref={overlayRef}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 invisible opacity-0 transition-opacity"
                onClick={toggleSearch}
            />

            {/* Drawer Panel - Wider for search */}
            <div
                ref={drawerRef}
                className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-[#FAF9F6] shadow-2xl z-[60] transform translate-x-full flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 md:p-10 border-b border-black/5">
                    <h2 className="text-xl font-display font-bold text-luxury-black">
                        What are you looking for?
                    </h2>
                    <button
                        onClick={toggleSearch}
                        className="p-2 hover:bg-black/5 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-luxury-black" />
                    </button>
                </div>

                {/* Search Input Section */}
                <div className="p-6 md:p-10 pb-0">
                    <div className="relative group">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Type to search..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full bg-white rounded-full py-5 px-8 pl-16 text-lg text-luxury-black placeholder-gray-400 outline-none shadow-sm transition-shadow duration-300 focus:shadow-md border border-transparent focus:border-luxury-gold/20"
                        />
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-luxury-gold transition-colors duration-300" />
                    </div>
                </div>

                {/* Results Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
                    {query && filteredProducts.length > 0 ? (
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-6">
                                Top Results
                            </span>
                            <div className="space-y-6">
                                {filteredProducts.map((product) => (
                                    <Link
                                        href={`/products/${product.id}`}
                                        key={product.id}
                                        onClick={toggleSearch}
                                        className="flex items-center gap-4 group p-2 rounded-xl hover:bg-white hover:shadow-sm transition-all"
                                    >
                                        <div className="relative w-16 h-20 bg-white rounded-lg overflow-hidden shrink-0 border border-gray-100">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                sizes="64px"
                                                className="object-contain p-1 mix-blend-multiply"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-display text-luxury-black group-hover:text-luxury-copper transition-colors">
                                                {product.name}
                                            </h4>
                                            <p className="text-sm text-gray-500">{formatPrice(product.price)}</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-gray-300 ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-8 text-center">
                                <Link
                                    href={`/collections?search=${query}`}
                                    onClick={toggleSearch}
                                    className="inline-block text-sm font-bold uppercase tracking-widest text-luxury-black border-b border-black pb-1 hover:text-luxury-copper hover:border-luxury-copper transition-colors"
                                >
                                    View All Results
                                </Link>
                            </div>
                        </div>
                    ) : query ? (
                        <div className="text-center py-20 text-gray-400">
                            <p>No results found for &quot;{query}&quot;</p>
                        </div>
                    ) : (
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-6">
                                Quick Links
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {['Men', 'Thawb', 'Summer', 'Hoodies', 'Accessories'].map(tag => (
                                    <Link
                                        key={tag}
                                        href={`/collections/${tag.toLowerCase()}`}
                                        onClick={toggleSearch}
                                        className="px-6 py-2 bg-white border border-gray-100 rounded-full text-sm text-gray-600 hover:border-luxury-copper hover:text-luxury-copper transition-colors"
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
