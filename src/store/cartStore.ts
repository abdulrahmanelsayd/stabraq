import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '@/types'

interface CartState {
    items: CartItem[]
    isOpen: boolean
    addItem: (product: Product, quantity: number, size?: string, color?: string) => void
    removeItem: (cartId: string) => void
    updateQuantity: (cartId: string, quantity: number) => void
    toggleCart: () => void
    clearCart: () => void
    getTotal: () => number
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (product, quantity, size, color) => {
                const cartId = `${product.id}-${size || 'default'}-${color || 'default'}`
                set((state) => {
                    const existingItem = state.items.find((item) => item.cartId === cartId)
                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.cartId === cartId
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            ),
                            isOpen: true, // Auto-open cart on add
                        }
                    }
                    return {
                        items: [
                            ...state.items,
                            { ...product, cartId, quantity, selectedSize: size, selectedColor: color },
                        ],
                        isOpen: true,
                    }
                })
            },

            removeItem: (cartId) => {
                set((state) => ({
                    items: state.items.filter((item) => item.cartId !== cartId),
                }))
            },

            updateQuantity: (cartId, quantity) => {
                set((state) => ({
                    items: state.items.map((item) =>
                        item.cartId === cartId ? { ...item, quantity: Math.max(1, quantity) } : item
                    ),
                }))
            },

            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

            clearCart: () => set({ items: [] }),

            getTotal: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
            },
        }),
        {
            name: 'stabraq-cart-storage',
            // partialize: (state) => ({ items: state.items }), // Only persist items
        }
    )
)
