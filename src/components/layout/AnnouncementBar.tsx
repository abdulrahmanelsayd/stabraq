'use client'

import { useState, useRef, useEffect } from 'react'
import { X } from 'lucide-react'
import gsap from 'gsap'

export default function AnnouncementBar() {
    const [isVisible, setIsVisible] = useState(true)
    const marqueeRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!marqueeRef.current) return

        // Infinite marquee animation
        gsap.to(marqueeRef.current, {
            xPercent: -50,
            ease: 'none',
            duration: 40,
            repeat: -1,
        })
    }, [])

    const handleClose = () => {
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <div className="relative glass-light text-luxury-black overflow-hidden h-9 flex items-center border-b border-black/5">
            {/* Marquee Container */}
            <div className="flex whitespace-nowrap" ref={marqueeRef}>
                {[...Array(10)].map((_, i) => (
                    <span key={i} className="mx-8 text-xs font-medium uppercase tracking-[0.15em]">
                        15% off SITE-WIDE • Buy 2 Get 3rd Free • Free Shipping on orders over 2000 EGP
                    </span>
                ))}
            </div>

            {/* Close Button */}
            {/* <button 
        onClick={handleClose}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity z-10"
      >
        <X className="w-3 h-3" />
      </button> */}
        </div>
    )
}
