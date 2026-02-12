'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface ProductGalleryProps {
    images: string[]
}

export default function ProductGallery({ images }: ProductGalleryProps) {
    const container = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        // Parallax effect for images
        const imgWrapper = container.current?.querySelectorAll('.img-wrapper')
        imgWrapper?.forEach((wrapper) => {
            gsap.fromTo(
                wrapper.querySelector('img'),
                { y: '-10%' },
                {
                    y: '10%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: wrapper,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    },
                }
            )
        })
    }, { scope: container })

    return (
        <div ref={container} className="w-full flex flex-col gap-4 md:gap-8">
            {images.map((src, i) => (
                <div
                    key={i}
                    className="img-wrapper relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-[2rem] bg-gray-100"
                >
                    <Image
                        src={src}
                        alt={`Product view ${i + 1}`}
                        fill
                        className="object-cover scale-110"
                        priority={i === 0}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
            ))}
        </div>
    )
}
