'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { X, Trash2, Heart, ShoppingBag } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import gsap from 'gsap'
import Link from 'next/link'

export default function WishlistDrawer() {
    const { items, isOpen, toggleWishlist, removeItem } = useWishlistStore()
    const { addItem } = useCartStore()
    const drawerRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    // Filter products that are in the wishlist
    const wishlistProducts = products.filter(product => items.includes(product.id))

    // Animation effect
    useEffect(() => {
        if (!drawerRef.current || !overlayRef.current) return

        if (isOpen) {
            gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.3 })
            gsap.to(drawerRef.current, { x: '0%', duration: 0.5, ease: 'power3.out' })
        } else {
            gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.3 })
            gsap.to(drawerRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' })
        }
    }, [isOpen])

    const handleMoveToBag = (product: typeof products[0]) => {
        addItem(
            product,
            1,
            product.sizes?.[0],
            product.colors?.[0]?.id
        )
        removeItem(product.id)
    }

    return (
        <>
            {/* Overlay Backdrop */}
            <div
                ref={overlayRef}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 invisible opacity-0 transition-opacity"
                onClick={toggleWishlist}
            />

            {/* Drawer Panel */}
            <div
                ref={drawerRef}
                className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#FAF9F6] shadow-2xl z-[60] transform translate-x-full flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-black/5">
                    <h2 className="text-xl font-display font-bold text-luxury-black flex items-center gap-2">
                        Your Favorites
                        <span className="text-sm font-sans font-normal text-gray-400">({items.length})</span>
                    </h2>
                    <button
                        onClick={toggleWishlist}
                        className="p-2 hover:bg-black/5 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-luxury-black" />
                    </button>
                </div>

                {/* Wishlist Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {wishlistProducts.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-400">
                            <Heart className="w-12 h-12 opacity-20" />
                            <p>Your wishlist is empty.</p>
                            <button
                                onClick={toggleWishlist}
                                className="text-luxury-black underline underline-offset-4 hover:text-luxury-copper transition-colors"
                            >
                                Continue Exploring
                            </button>
                        </div>
                    ) : (
                        wishlistProducts.map((product) => (
                            <div key={product.id} className="flex gap-4 group">
                                {/* Image */}
                                <Link href={`/products/${product.id}`} className="relative w-20 h-24 bg-white rounded-xl overflow-hidden shadow-sm shrink-0">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        sizes="80px"
                                        className="object-contain p-2 mix-blend-multiply"
                                    />
                                </Link>

                                {/* Details */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <Link href={`/products/${product.id}`}>
                                                <h3 className="text-sm font-bold text-luxury-black uppercase tracking-wide hover:text-luxury-copper transition-colors">
                                                    {product.name}
                                                </h3>
                                            </Link>
                                            <button
                                                onClick={() => removeItem(product.id)}
                                                className="text-gray-300 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1 uppercase">{product.category}</p>
                                    </div>

                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-sm font-medium text-luxury-black">
                                            {formatPrice(product.price)}
                                        </span>

                                        <button
                                            onClick={() => handleMoveToBag(product)}
                                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-luxury-black text-white px-3 py-1.5 rounded-full hover:bg-luxury-gold hover:text-luxury-black transition-all"
                                        >
                                            <ShoppingBag className="w-3 h-3" />
                                            Add to Bag
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}
