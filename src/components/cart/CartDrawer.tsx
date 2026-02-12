'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { ColorVariant } from '@/types'
import { formatPrice } from '@/lib/utils'
import gsap from 'gsap'

export default function CartDrawer() {
    const { items, isOpen, toggleCart, removeItem, updateQuantity, getTotal } = useCartStore()
    const drawerRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    // Animation effect
    useEffect(() => {
        if (isOpen) {
            gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.3 })
            gsap.to(drawerRef.current, { x: '0%', duration: 0.5, ease: 'power3.out' })
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
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 invisible opacity-0 transition-opacity"
                onClick={toggleCart}
            />

            {/* Drawer Panel */}
            <div
                ref={drawerRef}
                className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#FAF9F6] shadow-2xl z-[60] transform translate-x-full flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-black/5">
                    <h2 className="text-xl font-display font-bold text-luxury-black flex items-center gap-2">
                        Writing Your Story
                        <span className="text-sm font-sans font-normal text-gray-400">({items.length})</span>
                    </h2>
                    <button
                        onClick={toggleCart}
                        className="p-2 hover:bg-black/5 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-luxury-black" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-400">
                            <ShoppingBag className="w-12 h-12 opacity-20" />
                            <p>Your vault is empty.</p>
                            <button
                                onClick={toggleCart}
                                className="text-luxury-black underline underline-offset-4 hover:text-luxury-copper transition-colors"
                            >
                                Continue Exploring
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.cartId} className="flex gap-4 group">
                                {/* Image */}
                                <div className="relative w-20 h-24 bg-white rounded-xl overflow-hidden shadow-sm shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        sizes="80px"
                                        className="object-contain p-2"
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-sm font-bold text-luxury-black uppercase tracking-wide">
                                                {item.name}
                                            </h3>
                                            <button
                                                onClick={() => removeItem(item.cartId)}
                                                className="text-gray-300 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="flex gap-2 text-xs text-gray-500 mt-1">
                                            {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                                            {item.selectedColor && (
                                                <span className="flex items-center gap-1">
                                                    Color:
                                                    <span
                                                        className="w-2 h-2 rounded-full border border-gray-200"
                                                        style={{ backgroundColor: item.colors?.find((c: ColorVariant) => c.id === item.selectedColor)?.color || '#000' }}
                                                    />
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mt-2">
                                        <div className="flex items-center border border-gray-200 rounded-full h-8 px-2 bg-white">
                                            <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} className="p-1 hover:text-luxury-copper"><Minus className="w-3 h-3" /></button>
                                            <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)} className="p-1 hover:text-luxury-copper"><Plus className="w-3 h-3" /></button>
                                        </div>
                                        <span className="text-sm font-medium text-luxury-black">
                                            {formatPrice(item.price * item.quantity)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-6 bg-white border-t border-black/5 space-y-4">
                        <div className="flex justify-between items-end">
                            <span className="text-gray-500 text-sm">Subtotal</span>
                            <span className="text-2xl font-display text-luxury-black">{formatPrice(getTotal())}</span>
                        </div>
                        <p className="text-xs text-gray-400 text-center">
                            Shipping & taxes calculated at checkout.
                        </p>
                        <button
                            onClick={() => {
                                toggleCart()
                                window.location.href = '/checkout'
                            }}
                            className="w-full bg-luxury-black text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-luxury-gold transition-colors duration-300 flex items-center justify-center gap-2 group"
                        >
                            Checkout
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}
