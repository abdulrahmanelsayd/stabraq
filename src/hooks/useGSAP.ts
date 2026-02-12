'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Custom hook for GSAP animations
 * @returns GSAP timeline and animation utilities
 */
export function useGSAPAnimations() {
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    return () => {
      // Cleanup ScrollTrigger instances on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  /**
   * Create a reveal animation for elements
   * @param selector - CSS selector for elements
   * @param options - Animation options
   */
  const reveal = (
    selector: string,
    options: {
      y?: number
      duration?: number
      stagger?: number
      delay?: number
      ease?: string
    } = {}
  ) => {
    const { y = 50, duration = 1, stagger = 0.1, delay = 0, ease = 'power3.out' } = options

    gsap.fromTo(
      selector,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        delay,
        ease,
        scrollTrigger: {
          trigger: selector,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }

  /**
   * Create a text split animation (letter by letter)
   * @param element - Element to animate
   * @param options - Animation options
   */
  const splitTextReveal = (
    element: HTMLElement,
    options: {
      duration?: number
      stagger?: number
      delay?: number
    } = {}
  ) => {
    const { duration = 0.8, stagger = 0.02, delay = 0 } = options

    const chars = element.querySelectorAll('.char')
    
    gsap.fromTo(
      chars,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        delay,
        ease: 'power3.out',
      }
    )
  }

  /**
   * Parallax effect
   * @param selector - CSS selector
   * @param speed - Parallax speed
   */
  const parallax = (selector: string, speed: number = 0.5) => {
    gsap.to(selector, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: selector,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }

  /**
   * Magnetic hover effect
   * @param element - Element to apply effect
   */
  const magneticHover = (element: HTMLElement) => {
    const strength = 0.3

    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      })
    })

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      })
    })
  }

  return {
    gsap,
    ScrollTrigger,
    timeline: timelineRef.current,
    reveal,
    splitTextReveal,
    parallax,
    magneticHover,
  }
}
