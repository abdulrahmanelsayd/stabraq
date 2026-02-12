import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
    id: string
    name: string
    email: string
    avatar?: string
}

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    isAuthOpen: boolean
    authView: 'login' | 'register'

    // Actions
    login: (userData: User) => void
    logout: () => void
    openAuth: (view?: 'login' | 'register') => void
    closeAuth: () => void
    setAuthView: (view: 'login' | 'register') => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isAuthOpen: false,
            authView: 'login',

            login: (userData) => set({ user: userData, isAuthenticated: true, isAuthOpen: false }),

            logout: () => set({ user: null, isAuthenticated: false }),

            openAuth: (view = 'login') => set({ isAuthOpen: true, authView: view }),

            closeAuth: () => set({ isAuthOpen: false }),

            setAuthView: (view) => set({ authView: view }),
        }),
        {
            name: 'stabraq-auth-storage',
            // Only persist the user session, not the modal state
            partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
        }
    )
)
