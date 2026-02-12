import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/types'

interface WishlistStore {
    items: string[] // Store product IDs
    addItem: (id: string) => void
    removeItem: (id: string) => void
    toggleItem: (id: string) => void
    isInWishlist: (id: string) => boolean
    clearWishlist: () => void
    isOpen: boolean
    toggleWishlist: () => void
    closeWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (id) => {
                const { items } = get()
                if (!items.includes(id)) {
                    set({ items: [...items, id] })
                }
            },

            removeItem: (id) => {
                const { items } = get()
                set({ items: items.filter((itemId) => itemId !== id) })
            },

            toggleItem: (id) => {
                const { items } = get()
                if (items.includes(id)) {
                    set({ items: items.filter((itemId) => itemId !== id) })
                } else {
                    set({ items: [...items, id] })
                }
            },

            isInWishlist: (id) => {
                return get().items.includes(id)
            },

            clearWishlist: () => set({ items: [] }),

            // UI State
            isOpen: false,
            toggleWishlist: () => set((state) => ({ isOpen: !state.isOpen })),
            closeWishlist: () => set({ isOpen: false }),
        }),
        {
            name: 'stabraq-wishlist',
            partialize: (state) => ({ items: state.items }), // Only persist items, not UI state
        }
    )
)
