import * as THREE from 'three'
import { useRef, useState } from 'react'
import { RoundedBox, Text, useCursor, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { formatPrice } from '@/lib/utils'
import { useRouter } from 'next/navigation'

import { Product } from '@/types'

interface ProductCard3DProps {
    product: Product
    index: number
    position: [number, number, number]
}


function RoundedPlane({ args, radius, children, ...props }: any) {
    const [width, height] = args
    const shape = new THREE.Shape()


    shape.moveTo(-width / 2, -height / 2 + radius)
    shape.lineTo(-width / 2, height / 2 - radius)
    shape.quadraticCurveTo(-width / 2, height / 2, -width / 2 + radius, height / 2)
    shape.lineTo(width / 2 - radius, height / 2)
    shape.quadraticCurveTo(width / 2, height / 2, width / 2, height / 2 - radius)
    shape.lineTo(width / 2, -height / 2 + radius)
    shape.quadraticCurveTo(width / 2, -height / 2, width / 2 - radius, -height / 2)
    shape.lineTo(-width / 2 + radius, -height / 2)
    shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2, -height / 2 + radius)


    const geometry = new THREE.ShapeGeometry(shape)
    geometry.computeBoundingBox()
    const uvAttribute = geometry.attributes.uv
    const posAttribute = geometry.attributes.position


    if (posAttribute && uvAttribute) {
        for (let i = 0; i < posAttribute.count; i++) {
            const x = posAttribute.getX(i)
            const y = posAttribute.getY(i)
            const u = (x + width / 2) / width
            const v = (y + height / 2) / height
            uvAttribute.setXY(i, u, v)
        }
        uvAttribute.needsUpdate = true
    }

    return (
        <mesh geometry={geometry} {...props}>
            {children}
        </mesh>
    )
}

export default function ProductCard3D({ product, index, position }: ProductCard3DProps) {
    const mesh = useRef<THREE.Group>(null)
    const [hovered, setHover] = useState(false)
    const router = useRouter()

    useCursor(hovered)


    const imageIndex = (index % 10) + 1
    const imageUrl = `/collections/img${imageIndex}_.jpg`
    const texture = useTexture(imageUrl)
    texture.colorSpace = THREE.SRGBColorSpace

    useFrame((state, delta) => {
        if (!mesh.current) return

        const targetY = hovered ? position[1] + 0.1 : position[1]
        const targetScale = hovered ? 1.02 : 1

        easing.damp3(mesh.current.position, [position[0], targetY, position[2]], 0.2, delta)
        easing.damp3(mesh.current.scale, [targetScale, targetScale, targetScale], 0.2, delta)
    })

    const handleClick = () => {
        router.push(`/products/${product.id}`)
    }

    return (
        <group
            ref={mesh}
            position={position}
            onClick={handleClick}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >

            <RoundedPlane
                args={[2.0, 2.6]}
                radius={0.12}
                position={[0, 0, 0]}
            >
                <meshBasicMaterial
                    map={texture}
                    transparent={false}
                    toneMapped={false}
                    fog={false}
                />
            </RoundedPlane>


            <group position={[-0.95, -1.6, 0.02]}>

                <Text
                    position={[0, 0.22, 0]}
                    fontSize={0.07}
                    color="#888888"
                    anchorX="left"
                    anchorY="middle"
                    fontWeight={600}
                    letterSpacing={0.05}
                    font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                >
                    STABRAQ
                </Text>


                <Text
                    position={[0, 0.08, 0]}
                    fontSize={0.14}
                    color="#FFFFFF"
                    anchorX="left"
                    anchorY="middle"
                    letterSpacing={-0.02}
                    maxWidth={1.9}
                    lineHeight={1.1}
                    fontWeight={600}
                    font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                >
                    {product.name}
                </Text>


                <Text
                    position={[0, -0.15, 0]}
                    fontSize={0.12}
                    color="#CCCCCC"
                    anchorX="left"
                    anchorY="middle"
                    fontWeight={400}
                    font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                >
                    {formatPrice(product.price)}
                </Text>
            </group>


            <mesh position={[0, -1.3, -0.1]} scale={[2.0, 0.5, 1]}>
                <planeGeometry />
                <meshBasicMaterial color="#000000" transparent opacity={0.15} />

            </mesh>
        </group>
    )
}