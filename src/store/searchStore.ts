import { create } from 'zustand'

interface SearchStore {
    isOpen: boolean
    toggleSearch: () => void
    closeSearch: () => void
    openSearch: () => void
}

export const useSearchStore = create<SearchStore>((set) => ({
    isOpen: false,
    toggleSearch: () => set((state) => ({ isOpen: !state.isOpen })),
    closeSearch: () => set({ isOpen: false }),
    openSearch: () => set({ isOpen: true }),
}))
