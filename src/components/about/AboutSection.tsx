'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * About section — Brand Story preview for the Home page
 * Scroll-triggered word reveal animation + brand stats
 */
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const words = textRef.current.querySelectorAll('.word')

    gsap.fromTo(
      words,
      { opacity: 0.1 },
      {
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1,
        },
      }
    )
  }, [])

  const aboutText =
    'Born from the streets of Egypt, Stabraq fuses heritage calligraphy with modern streetwear silhouettes. Every stitch carries intention — premium fabrics, purposeful design, and uncompromising quality for those who move differently.'

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-40 bg-luxury-gold-light overflow-hidden"
    >
      <div className="section-container">
        {/* Scroll-reveal text */}
        <div ref={textRef} className="max-w-4xl mx-auto text-center mb-20">
          <p className="text-2xl md:text-4xl font-display text-luxury-black leading-relaxed tracking-tight">
            {aboutText.split(' ').map((word, i) => (
              <span key={i} className="word inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { value: '2024', label: 'Established' },
            { value: '100%', label: 'Egyptian Cotton' },
            { value: '10+', label: 'Collections Released' },
            { value: '5K+', label: 'Members Worldwide' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 md:p-8 glass-light rounded-sm text-center"
            >
              <div className="text-3xl md:text-5xl font-display text-luxury-black mb-2">
                {stat.value}
              </div>
              <div className="text-luxury-black/70 uppercase tracking-wider text-[10px] md:text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-luxury-gold/5 blur-3xl pointer-events-none" />
    </section>
  )
}
