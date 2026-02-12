'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

/**
 * Premium newsletter CTA section for homepage
 */
export default function NewsletterCTA() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return
        setSubmitted(true)
        setEmail('')
        setTimeout(() => setSubmitted(false), 4000)
    }

    return (
        <section className="py-24 md:py-32 bg-luxury-black text-white relative overflow-hidden">
            {/* Decorative gradient orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

            <div className="section-container relative z-10 text-center">
                <span className="text-white/30 text-xs font-bold uppercase tracking-[0.3em] block mb-6">
                    Stay Connected
                </span>
                <h2 className="text-4xl md:text-6xl font-display mb-6 tracking-tight leading-tight">
                    Join the Inner Circle
                </h2>
                <p className="text-white/50 max-w-lg mx-auto mb-10 text-sm md:text-base">
                    Be the first to know about new drops, exclusive offers, and behind-the-scenes content.
                </p>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    {submitted ? (
                        <div className="flex items-center justify-center gap-2 py-4 text-green-400 animate-fade-in">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">Welcome to the circle!</span>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <input
                                type="email"
                                required
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 bg-white/10 backdrop-blur-sm rounded-full py-4 px-7 text-sm text-white placeholder-white/40 outline-none border border-white/10 focus:border-white/30 transition-colors"
                            />
                            <button
                                type="submit"
                                className="bg-white text-luxury-black px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold-light transition-colors duration-300 flex items-center gap-2 shrink-0"
                            >
                                <Send className="w-4 h-4" />
                                <span className="hidden sm:inline">Join</span>
                            </button>
                        </div>
                    )}
                    <p className="text-[10px] text-white/20 mt-4">
                        No spam, ever. Unsubscribe at any time.
                    </p>
                </form>
            </div>
        </section>
    )
}
