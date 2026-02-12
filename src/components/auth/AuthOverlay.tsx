'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { X, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react'

export default function AuthOverlay() {
    const { isAuthOpen, closeAuth, authView, setAuthView, login } = useAuthStore()
    const [isLoading, setIsLoading] = useState(false)
    const [activeTab, setActiveTab] = useState(authView)

    // Sync internal state with store
    useEffect(() => {
        setActiveTab(authView)
    }, [authView, isAuthOpen])

    // Temporary mock login
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(() => {
            login({
                id: 'user-123',
                name: 'Stabraq Member',
                email: 'member@stabraq.com',
                avatar: 'https://ui-avatars.com/api/?name=Stabraq+Member&background=000&color=fff'
            })
            setIsLoading(false)
        }, 1500)
    }

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(() => {
            login({
                id: 'user-new',
                name: 'New Member',
                email: 'new@stabraq.com',
                avatar: 'https://ui-avatars.com/api/?name=New+Member&background=000&color=fff'
            })
            setIsLoading(false)
        }, 1500)
    }

    if (!isAuthOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center sm:p-4">
            {/* Cinematic Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-xl transition-all duration-700 animate-in fade-in"
                onClick={closeAuth}
            />

            {/* Main Card Container */}
            <div className="relative w-full md:max-w-[850px] h-[85vh] md:h-[550px] bg-white md:rounded-[2rem] rounded-t-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in slide-in-from-bottom-12 md:zoom-in-95 duration-500 ease-out border border-white/20">

                {/* Left Side - Minimal Premium (Desktop Only) */}
                <div className="hidden md:flex w-5/12 relative overflow-hidden bg-black text-white flex-col justify-center items-center p-12">
                    {/* Subtle Animated Gradient */}


                    {/* Minimal Brand Presence */}
                    <div className="relative z-10 text-center">
                        <h2 className="text-3xl font-display font-medium tracking-[0.3em] text-white uppercase">Stabraq</h2>
                        <div className="h-[1px] w-8 bg-white/30 mx-auto mt-6" />
                    </div>
                </div>

                {/* Right Side - The "Interaction" */}
                <div className="w-full md:w-7/12 bg-white relative flex flex-col h-full">
                    {/* Mobile Handle */}
                    <div className="md:hidden w-full flex justify-center pt-4 pb-2">
                        <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={closeAuth}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-50 transition-colors z-20 group"
                    >
                        <X className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" strokeWidth={1.5} />
                    </button>

                    <div className="flex-1 overflow-y-auto p-8 md:p-12 scrollbar-hide flex flex-col justify-center">
                        {/* Mobile Brand Header */}
                        <div className="md:hidden mb-8 text-center">
                            <h2 className="text-2xl font-display text-luxury-black uppercase tracking-widest">Stabraq</h2>
                        </div>

                        {/* Animated Tab Switcher */}
                        <div className="flex items-center justify-center mb-10">
                            <div className="relative flex bg-gray-50 p-1 rounded-full w-full max-w-[240px] border border-gray-100">
                                <div
                                    className={`absolute inset-y-1 w-1/2 bg-white shadow-sm rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeTab === 'login' ? 'left-1' : 'left-[calc(50%-4px)] translate-x-[4px]'
                                        }`}
                                />
                                <button
                                    onClick={() => setAuthView('login')}
                                    className={`relative z-10 flex-1 py-2 text-[11px] font-bold uppercase tracking-wider text-center transition-colors duration-300 ${activeTab === 'login' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    Log In
                                </button>
                                <button
                                    onClick={() => setAuthView('register')}
                                    className={`relative z-10 flex-1 py-2 text-[11px] font-bold uppercase tracking-wider text-center transition-colors duration-300 ${activeTab === 'register' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>

                        {/* Forms Container */}
                        <div className="max-w-xs mx-auto w-full">
                            {activeTab === 'login' ? (
                                <form onSubmit={handleLogin} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="group space-y-1.5">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Email</label>
                                        <div className="relative group/input">
                                            <input
                                                type="email"
                                                required
                                                autoComplete="off"
                                                className="w-full bg-white border-b border-gray-200 py-3 pl-0 pr-4 outline-none focus:border-black transition-all duration-300 text-sm font-medium text-gray-900 placeholder-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div className="group space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Password</label>
                                            <button type="button" className="text-[10px] uppercase font-bold text-gray-400 hover:text-black transition-colors">
                                                Forgot?
                                            </button>
                                        </div>
                                        <div className="relative group/input">
                                            <input
                                                type="password"
                                                required
                                                autoComplete="new-password"
                                                className="w-full bg-white border-b border-gray-200 py-3 pl-0 pr-4 outline-none focus:border-black transition-all duration-300 text-sm font-medium text-gray-900 placeholder-transparent"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full group bg-black text-white rounded-full py-3.5 font-medium tracking-wide hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10 mt-6"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <span className="text-xs font-bold uppercase tracking-widest">Enter</span>
                                        )}
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleRegister} className="space-y-5 animate-in fade-in slide-in-from-left-4 duration-500">
                                    <div className="group space-y-1.5">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Name</label>
                                        <input
                                            type="text"
                                            required
                                            autoComplete="off"
                                            className="w-full bg-white border-b border-gray-200 py-3 pl-0 pr-4 outline-none focus:border-black transition-all duration-300 text-sm font-medium text-gray-900 placeholder-transparent"
                                        />
                                    </div>

                                    <div className="group space-y-1.5">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Email</label>
                                        <input
                                            type="email"
                                            required
                                            autoComplete="off"
                                            className="w-full bg-white border-b border-gray-200 py-3 pl-0 pr-4 outline-none focus:border-black transition-all duration-300 text-sm font-medium text-gray-900 placeholder-transparent"
                                        />
                                    </div>

                                    <div className="group space-y-1.5">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Password</label>
                                        <input
                                            type="password"
                                            required
                                            autoComplete="new-password"
                                            className="w-full bg-white border-b border-gray-200 py-3 pl-0 pr-4 outline-none focus:border-black transition-all duration-300 text-sm font-medium text-gray-900 placeholder-transparent"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full group bg-black text-white rounded-full py-3.5 font-medium tracking-wide hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10 mt-6"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <span className="text-xs font-bold uppercase tracking-widest">Join</span>
                                        )}
                                    </button>
                                </form>
                            )}

                            {/* Social Login */}
                            <div className="mt-8">
                                <div className="relative flex justify-center text-[9px] uppercase text-gray-300 font-bold tracking-widest mb-6">
                                    <span className="bg-white px-2 relative z-10">Or</span>
                                    <div className="absolute inset-0 top-1/2 border-t border-gray-50 -z-0" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-100 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 group">
                                        {/* Official Google Icon */}
                                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 group-hover:text-gray-900">Google</span>
                                    </button>
                                    <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-100 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 group">
                                        {/* Official Apple Icon - Simple Black */}
                                        <svg className="w-5 h-5 text-black" viewBox="0 0 384 512" fill="currentColor">
                                            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 43.3-24.3 68.8 26.7 1.7 51.5-16.1 68.2-31.2z" />
                                        </svg>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 group-hover:text-gray-900">Apple</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
