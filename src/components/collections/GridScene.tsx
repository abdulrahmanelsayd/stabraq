import { useRef } from 'react'
import { useScroll, useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import { products } from '@/data/products'
import ProductCard3D from './ProductCard3D'
import * as THREE from 'three'

export default function GridScene() {
    const groupRef = useRef<THREE.Group>(null)
    const scroll = useScroll()
    const { width, height } = useThree((state) => state.viewport)

    // Layout Configuration
    // Responsive columns - Even more density for smaller cards
    const columns = width > 12 ? 6 : width > 8 ? 5 : width > 5 ? 3 : 2

    // Generate mocked data for "Many Products" feel
    // Duplicating the 6 products 4 times = 24 items
    const allProducts = [...products, ...products, ...products, ...products]

    // Spacing - Even Smaller Dimensions
    const cardWidth = 2.0
    const cardHeight = 3.0
    const gapX = 0.5
    const gapY = 1.0

    // Total width of grid
    const gridWidth = columns * cardWidth + (columns - 1) * gapX
    // Center offset
    // Center offset
    const startX = -(gridWidth / 2) + (cardWidth / 2)
    const startY = -height * 2.5 // Start much deeper (2.5 screens down)

    useFrame((state, delta) => {
        if (!groupRef.current) return

        // Scroll Logic - SEPARATION UPDATE
        const scrollData = scroll.offset
        // Start moving only after 45% scroll (when Hero is gone)
        // Map 0.45 -> 1.0 range to 0 -> 1 progress
        const activeRange = Math.max(0, scrollData - 0.45) / 0.55

        // Base Target Y
        const rows = Math.ceil(allProducts.length / columns)
        const totalHeight = rows * (cardHeight + gapY)
        const baseTargetY = (activeRange * (Math.abs(startY) + totalHeight + 5))

        easing.damp3(groupRef.current.position, [0, startY + baseTargetY, 0], 0.2, delta)
    })

    return (
        <group ref={groupRef}>
            {/* Title for the section - Floating 3D Text */}
            <group position={[0, 4, 0]}>
                {/* Center slightly above first row */}
                {/* We can use standard HTML for title if cleaner, but user asked for Three.js */}
                {/* Let's skip title or use simple text mesh? */}
            </group>

            {allProducts.map((product, i) => {
                const col = i % columns
                const row = Math.floor(i / columns)

                // Fixed Grid (No Stagger)
                const x = startX + col * (cardWidth + gapX)
                const y = -row * (cardHeight + gapY)

                return (
                    <ProductCard3D
                        key={`${product.id}-${i}`}
                        product={product}
                        index={i}
                        position={[x, y, 0]}
                    />
                )
            })}

            {/* Grounding Shadows - Key for depth */}
            {/* Position deeply negative Y so it covers the whole scrolling area? No, shadows should be local? 
                 ContactShadows works on the whole scene. 
                 Since the grid moves, the shadows must move? 
                 Actually, ContactShadows usually projects everything. 
                 If we put it attached to the group, it might be expensive.
                 Let's try AccumulativeShadows or just assume the cards have shadows.
                 Wait, ContactShadows renders from a camera.
                 Let's stick to a simpler "Drop Shadow" mesh *per card* if ContactShadows is too heavy?
                 No, let's try a global ContactShadows at z=-0.5 behind the cards.
             */}
            {/* Actually, for a scrolling grid, ContactShadows is tricky.
                 Let's use a simple sprite shadow per card in ProductCard3D? 
                 YES. Much more performant.
             */}
        </group>
    )
}
