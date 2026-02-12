'use client'

import { useState, useMemo } from 'react'
import { products } from '@/data/products'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Heart, SlidersHorizontal } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { useWishlistStore } from '@/store/wishlistStore'

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name'

interface ProductGridProps {
    category?: string
}

/** Actual product categories derived from data */
const CATEGORY_OPTIONS = ['All', 'Men', 'Kids', 'Thawb', 'Accessories'] as const

export default function ProductGrid({ category }: ProductGridProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(category || 'All')
    const [sortBy, setSortBy] = useState<SortOption>('newest')
    const { toggleItem: toggleWishlistItem, isInWishlist } = useWishlistStore()

    const isCategoryPage = !!category

    /** Derive filtered + sorted product list */
    const filteredProducts = useMemo(() => {
        let result = products.filter((product) => {
            // Search match
            const matchesSearch =
                !searchQuery ||
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())

            // Category match
            let matchesCategory = true
            if (isCategoryPage) {
                matchesCategory =
                    product.category?.toLowerCase() === category!.toLowerCase()
            } else if (selectedCategory !== 'All') {
                matchesCategory =
                    product.category?.toLowerCase() === selectedCategory.toLowerCase()
            }

            return matchesSearch && matchesCategory
        })

        // Sort
        switch (sortBy) {
            case 'price-asc':
                result = [...result].sort((a, b) => a.price - b.price)
                break
            case 'price-desc':
                result = [...result].sort((a, b) => b.price - a.price)
                break
            case 'name':
                result = [...result].sort((a, b) => a.name.localeCompare(b.name))
                break
            case 'newest':
            default:
                // new items first, then featured
                result = [...result].sort((a, b) => {
                    if (a.new && !b.new) return -1
                    if (!a.new && b.new) return 1
                    if (a.featured && !b.featured) return -1
                    if (!a.featured && b.featured) return 1
                    return 0
                })
        }

        return result
    }, [searchQuery, selectedCategory, category, isCategoryPage, sortBy])

    return (
        <div className="w-full bg-[#F9F8F6] min-h-screen py-12 md:py-24 px-4 md:px-8">
            <div className="max-w-[1800px] mx-auto">
                {/* Toolbar: Search + Filter + Sort */}
                <div className="flex flex-col gap-6 mb-16">
                    {/* Row 1: Search + Sort */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Search Bar */}
                        <div className="relative w-full md:w-96 group">
                            <input
                                type="text"
                                placeholder="Search in collection..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white rounded-full py-4 px-8 pl-14 text-luxury-black placeholder-gray-400 outline-none shadow-sm transition-shadow duration-300 focus:shadow-md border border-transparent focus:border-luxury-gold/20"
                            />
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-luxury-gold transition-colors duration-300" />
                        </div>

                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-3">
                            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                className="bg-white rounded-full py-3 px-6 text-sm text-luxury-black outline-none shadow-sm cursor-pointer border border-transparent focus:border-luxury-gold/20 appearance-none pr-10"
                            >
                                <option value="newest">Newest First</option>
                                <option value="price-asc">Price: Low → High</option>
                                <option value="price-desc">Price: High → Low</option>
                                <option value="name">Name A–Z</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 2: Category Filters (only on main collections page) */}
                    {!isCategoryPage && (
                        <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 w-full scrollbar-hide">
                            {CATEGORY_OPTIONS.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setSelectedCategory(item)}
                                    className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${selectedCategory === item
                                        ? 'bg-luxury-black text-white shadow-lg scale-105'
                                        : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-luxury-black shadow-sm'
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Results count */}
                <div className="mb-8">
                    <p className="text-xs text-gray-400 uppercase tracking-widest">
                        {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-20">
                    {filteredProducts.map((product) => (
                        <Link
                            href={`/products/${product.id}`}
                            key={product.id}
                            className="group cursor-pointer"
                        >
                            {/* Image */}
                            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-white shadow-sm mb-6 transition-transform duration-500 ease-out group-hover:scale-[1.03] group-hover:-translate-y-2">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    priority={true}
                                />
                                {/* Gloss */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                                    {product.new && (
                                        <span className="bg-luxury-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                            New
                                        </span>
                                    )}
                                </div>

                                {/* Wishlist */}
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

                            {/* Text */}
                            <div className="space-y-1 pl-1">
                                <p className="text-gray-500 text-xs font-medium tracking-widest uppercase">
                                    {product.category}
                                </p>
                                <h3 className="text-luxury-black text-lg font-display tracking-tight leading-tight group-hover:text-luxury-copper transition-colors duration-300">
                                    {product.name}
                                </h3>
                                <p className="text-gray-400 text-sm">{formatPrice(product.price)}</p>
                            </div>
                        </Link>
                    ))}

                    {filteredProducts.length === 0 && (
                        <div className="col-span-full text-center py-20 text-gray-400">
                            <p className="text-lg mb-2">No products found.</p>
                            <p className="text-sm">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
