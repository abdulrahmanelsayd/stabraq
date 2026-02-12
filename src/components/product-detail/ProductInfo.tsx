'use client'

import { useState } from 'react'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { Minus, Plus, ShoppingBag, Star } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

interface ProductInfoProps {
    product: Product
}

export default function ProductInfo({ product }: ProductInfoProps) {
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M')
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.id || '')
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState<'description' | 'size' | 'shipping'>('description')
    const addItem = useCartStore((state) => state.addItem)

    const handleAddToCart = () => {
        addItem(product, quantity, selectedSize, selectedColor)
    }

    return (
        <div className="sticky top-32 flex flex-col gap-8 text-luxury-black">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight leading-none">
                        {product.name}
                    </h1>
                    <div className="flex flex-col items-end">
                        <p className="text-2xl font-light tracking-wide">
                            {formatPrice(product.price)}
                        </p>
                        <div className="flex items-center gap-1 text-gold-500 mt-1">
                            <Star className="w-3.5 h-3.5 fill-luxury-gold text-luxury-gold" />
                            <span className="text-xs font-medium">4.9</span>
                            <span className="text-[10px] text-gray-400">(120)</span>
                        </div>
                    </div>
                </div>
                <p className="text-gray-500 leading-relaxed font-light text-sm md:text-base">
                    {product.description}
                </p>
            </div>

            <div className="h-[1px] w-full bg-black/5" />

            {/* Selectors */}
            <div className="space-y-6">
                {/* Colors */}
                {product.colors && (
                    <div className="space-y-3">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Color: {product.colors.find(c => c.id === selectedColor)?.name}</span>
                        <div className="flex gap-3">
                            {product.colors.map((color) => (
                                <button
                                    key={color.id}
                                    onClick={() => setSelectedColor(color.id)}
                                    className={`w-10 h-10 rounded-full border transition-all duration-300 ${selectedColor === color.id
                                        ? 'border-luxury-black scale-110 ring-1 ring-luxury-black ring-offset-2'
                                        : 'border-transparent hover:scale-105'
                                        }`}
                                    style={{ backgroundColor: color.color }}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Sizes */}
                {product.sizes && (
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Size: {selectedSize}</span>
                            <button className="text-xs underline text-luxury-black/60 hover:text-luxury-black">Size Guide</button>
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`py-3 text-sm font-medium rounded-lg border transition-all duration-200 ${selectedSize === size
                                        ? 'bg-luxury-black text-white border-luxury-black shadow-md'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-luxury-black'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quantity & Add to Cart */}
                <div className="flex gap-4 pt-4">
                    <div className="flex items-center border border-gray-200 rounded-full px-4 h-14 bg-white">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-1 hover:text-luxury-copper transition-colors"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-1 hover:text-luxury-copper transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-luxury-black text-white rounded-full h-14 font-bold tracking-widest uppercase hover:bg-luxury-gold hover:text-luxury-black transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        Add to Bag
                    </button>
                </div>
            </div>

            {/* Information Tabs */}
            <div className="pt-8">
                <div className="flex border-b border-gray-100 mb-6 overflow-x-auto pb-1 gap-8 no-scrollbar">
                    {['description', 'size', 'shipping'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab
                                ? 'text-luxury-black border-b-2 border-luxury-black'
                                : 'text-gray-400 hover:text-luxury-black'
                                }`}
                        >
                            {tab === 'size' ? 'Size & Fit' : tab === 'shipping' ? 'Shipping & Returns' : 'Details'}
                        </button>
                    ))}
                </div>

                <div className="min-h-[150px] text-sm text-gray-500 leading-relaxed animate-fade-in">
                    {activeTab === 'description' && (
                        <div className="space-y-4">
                            <p>
                                Crafted with precision and attention to detail, this piece embodies the Stabraq philosophy of merging heritage with modern streetwear.
                            </p>
                            {product.materials && (
                                <div>
                                    <span className="font-bold text-luxury-black block mb-1">Materials</span>
                                    {product.materials.join(', ')}
                                </div>
                            )}
                            <div>
                                <span className="font-bold text-luxury-black block mb-1">Product Code</span>
                                {product.id.toUpperCase()}
                            </div>
                        </div>
                    )}
                    {activeTab === 'size' && (
                        <div className="space-y-4">
                            <p>
                                Designed for a relaxed, comfortable fit. We recommend taking your usual size for a standard fit, or sizing up for an oversized look.
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Model is 185cm and wears size L</li>
                                <li>Ribbed cuffs and hem</li>
                                <li>Pre-shrunk to maintain fit</li>
                            </ul>
                        </div>
                    )}
                    {activeTab === 'shipping' && (
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="font-bold text-luxury-black min-w-[100px]">Shipping</div>
                                <div>
                                    Free shipping on orders over 2000 EGP.<br />
                                    Cairo & Giza: 1-2 business days.<br />
                                    Other Governorates: 3-5 business days.
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="font-bold text-luxury-black min-w-[100px]">Returns</div>
                                <div>
                                    Free returns within 14 days of delivery. Item must be unworn and in original packaging.
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
