'use client'

import { useState, useEffect, useCallback } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const TESTIMONIALS = [
    {
        name: 'Ahmed M.',
        location: 'Cairo',
        text: 'The quality of the fabric is unmatched. I ordered the Oversized Heritage Hoodie and it instantly became my go-to piece. Stabraq takes streetwear to another level.',
        rating: 5,
        product: 'Oversized Heritage Hoodie',
    },
    {
        name: 'Sara K.',
        location: 'Alexandria',
        text: 'Bought the Kids Calligraphy Set for my son — the embroidery detail is incredible. You can feel the craftsmanship. Will be ordering more.',
        rating: 5,
        product: 'Kids Calligraphy Set',
    },
    {
        name: 'Omar H.',
        location: 'Giza',
        text: 'Finally a brand that represents our culture in a modern way. The Desert Storm Cargo Pants are both comfortable and make a statement.',
        rating: 5,
        product: 'Desert Storm Cargo Pants',
    },
    {
        name: 'Nour A.',
        location: 'Mansoura',
        text: 'The Embroidered Classic Thawb is a masterpiece. Perfect for both everyday wear and special occasions. True Egyptian craftsmanship.',
        rating: 5,
        product: 'Embroidered Classic Thawb',
    },
    {
        name: 'Youssef T.',
        location: 'Cairo',
        text: 'Ordered the Cairo Nights Essential Tee — premium cotton, perfect fit, and the calligraphy print is fire. Shipping was fast too.',
        rating: 5,
        product: 'Cairo Nights Essential Tee',
    },
]

export default function TestimonialsSection() {
    const [current, setCurrent] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const goTo = useCallback((index: number) => {
        if (isAnimating) return
        setIsAnimating(true)
        setCurrent(index)
        setTimeout(() => setIsAnimating(false), 500)
    }, [isAnimating])

    const next = useCallback(() => goTo((current + 1) % TESTIMONIALS.length), [current, goTo])
    const prev = useCallback(() => goTo((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length), [current, goTo])

    // Auto-advance every 6s
    useEffect(() => {
        const timer = setInterval(next, 6000)
        return () => clearInterval(timer)
    }, [next])

    const t = TESTIMONIALS[current]

    return (
        <section className="py-24 md:py-32 bg-white overflow-hidden">
            <div className="section-container">
                <div className="text-center mb-16">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 block mb-4">
                        Testimonials
                    </span>
                    <h2 className="text-3xl md:text-5xl font-display text-luxury-black tracking-tight">
                        What Our Community Says
                    </h2>
                </div>

                {/* Testimonial Card */}
                <div className="max-w-2xl mx-auto text-center">
                    <div
                        key={current}
                        className="animate-fade-in"
                    >
                        {/* Stars */}
                        <div className="flex justify-center gap-1 mb-6">
                            {Array.from({ length: t.rating }).map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
                            ))}
                        </div>

                        {/* Quote */}
                        <blockquote className="text-lg md:text-xl text-luxury-black leading-relaxed font-display mb-8">
                            &ldquo;{t.text}&rdquo;
                        </blockquote>

                        {/* Author */}
                        <div className="space-y-1">
                            <p className="font-medium text-luxury-black">{t.name}</p>
                            <p className="text-xs text-gray-400">
                                {t.location} · Purchased {t.product}
                            </p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-6 mt-10">
                        <button
                            onClick={prev}
                            className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-luxury-black hover:text-white transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        {/* Dots */}
                        <div className="flex gap-2">
                            {TESTIMONIALS.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    className={`transition-all duration-300 rounded-full ${i === current
                                        ? 'w-8 h-2 bg-luxury-black'
                                        : 'w-2 h-2 bg-black/15 hover:bg-black/30'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-luxury-black hover:text-white transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
