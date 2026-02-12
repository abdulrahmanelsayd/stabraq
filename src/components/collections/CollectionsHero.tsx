'use client'

import * as THREE from 'three'
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { Image, PresentationControls, Float } from '@react-three/drei'
import { easing } from 'maath'
import { BentPlaneGeometry, MeshSineMaterial } from './RotaryUtils'

// Extend R3F catalog
extend({ BentPlaneGeometry, MeshSineMaterial })

interface CollectionsHeroProps {
    title?: string
}

export default function CollectionsHero({ title = 'STABRAQ' }: CollectionsHeroProps) {
    return (
        <div className="w-full h-[55vh] bg-[#000000] relative z-10">
            <Canvas camera={{ position: [0, 0, 7.0], fov: 15 }}>
                <fog attach="fog" args={['#000000', 8.5, 12]} />

                {/* User Interaction: Tilt & Rotate */}
                <PresentationControls
                    global
                    rotation={[0, 0, 0]}
                    polar={[-0.1, 0.1]} // Limit vertical tilt
                    azimuth={[-Infinity, Infinity]} // Allow full horizontal rotation
                    config={{ mass: 1, tension: 170, friction: 26 }}
                    snap={{ mass: 4, tension: 1500, friction: 30 }}
                >
                    <Float rotationIntensity={0.2} floatIntensity={0.5} speed={2}>
                        <group position={[0, 0.2, 0]}>
                            {/* Auto-Rotating Carousel */}
                            <Carousel />
                            <Banner position={[0, -0.15, 0]} text={title} />
                        </group>
                    </Float>
                </PresentationControls>
            </Canvas>
        </div>
    )
}

import { products } from '@/data/products'

// ... existing code ...

function Carousel({ radius = 1.6, count = 8 }) {
    // Basic Auto-Rotation
    const group = useRef<THREE.Group>(null)
    useFrame((state, delta) => {
        if (group.current) {
            group.current.rotation.y += delta * 0.1 // Slow rotation
        }
    })

    return (
        <group ref={group}>
            {Array.from({ length: count }, (_, i) => {
                const product = products[i % products.length]
                return (
                    <Card
                        key={i}
                        url={product.image}
                        position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
                        rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
                    />
                )
            })}
        </group>
    )
}

function Card({ url, ...props }: any) {
    const ref = useRef<THREE.Mesh>(null)
    const [hovered, hover] = useState(false)
    const pointerOver = (e: any) => (e.stopPropagation(), hover(true))
    const pointerOut = () => hover(false)
    useFrame((state, delta) => {
        if (!ref.current) return
        easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta)
        // @ts-ignore - custom material properties
        easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta)
        // @ts-ignore
        easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.15, 0.2, delta)
    })
    return (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image
            ref={ref as any}
            url={url}
            transparent
            side={THREE.DoubleSide}
            onPointerOver={pointerOver}
            onPointerOut={pointerOut}
            {...props}
        >
            {/* @ts-ignore - custom geometry */}
            <bentPlaneGeometry args={[0.1, 1, 1.5, 20, 20]} />
        </Image>
    )
}

function Banner({ text, ...props }: any) {
    const ref = useRef<THREE.Mesh>(null)
    const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null)

    useEffect(() => {
        const canvas = document.createElement('canvas')
        canvas.width = 1024
        canvas.height = 256
        const context = canvas.getContext('2d')
        if (context) {
            context.clearRect(0, 0, canvas.width, canvas.height)
            context.fillStyle = '#FFFFFF' // White text for black bg
            context.font = 'bold 160px "Inter", sans-serif'
            context.textAlign = 'center'
            context.textBaseline = 'middle'
            context.fillText(text, canvas.width / 2, canvas.height / 2)
        }
        const t = new THREE.CanvasTexture(canvas)
        t.wrapS = t.wrapT = THREE.RepeatWrapping
        t.anisotropy = 16
        setTexture(t)
    }, [text])

    useFrame((state, delta) => {
        if (!ref.current || !texture) return
        // @ts-ignore
        ref.current.material.time.value += delta // Use time instead of scroll delta
        // @ts-ignore
        ref.current.material.map.offset.x += delta / 2
    })

    if (!texture) return null

    return (
        <mesh ref={ref} {...props}>
            <cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
            {/* @ts-ignore - custom material */}
            <meshSineMaterial map={texture} map-anisotropy={16} map-repeat={[12, 1]} side={THREE.DoubleSide} toneMapped={false} transparent />
        </mesh>
    )
}
