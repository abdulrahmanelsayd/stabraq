'use client'

import { useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshReflectorMaterial, Text, useTexture, useGLTF, Html } from '@react-three/drei'
import * as THREE from 'three'

function Loader() {
  return (
    <Html center>
      <div className="text-white text-sm font-light tracking-widest">
        LOADING
      </div>
    </Html>
  )
}

import { GroupProps } from '@react-three/fiber'

function Carla(props: GroupProps) {
  const { scene } = useGLTF('/carla-draco.glb')
  return <primitive object={scene} {...props} />
}

function VideoText(props: any) {
  const [video] = useState(() => {
    if (typeof window === 'undefined') return null
    const vid = document.createElement('video')
    vid.src = '/azzony.mp4'
    vid.crossOrigin = 'Anonymous'
    vid.loop = true
    vid.muted = true
    vid.playsInline = true
    return vid
  })

  if (video) {
    video.play().catch(() => { })
  }

  if (!video) return null

  return (
    <Text
      font="/Inter-Bold.woff"
      fontSize={2.5}
      letterSpacing={-0.06}
      {...props}
    >
      stabraq
      <meshBasicMaterial toneMapped={false}>
        <videoTexture
          attach="map"
          args={[video]}
          encoding={THREE.sRGBEncoding}
        />
      </meshBasicMaterial>
    </Text>
  )
}

function Ground() {
  const [floor, normal] = useTexture([
    '/SurfaceImperfections003_1K_var1.jpg',
    '/SurfaceImperfections003_1K_Normal.jpg'
  ])

  return (
    <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, -2, 0]}>
      <planeGeometry args={[10, 10]} />
      <MeshReflectorMaterial
        blur={[400, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={10}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#101010"
        metalness={0.5}
        mirror={0.75}
        roughnessMap={floor}
        normalMap={normal}
        normalScale={[2, 2] as any}
      />
    </mesh>
  )
}

function CameraController() {
  const [vec] = useState(() => new THREE.Vector3())
  const { camera } = useThree()

  useFrame((state) => {
    const intensity = state.viewport.width < 7 ? 2 : 5
    camera.position.lerp(
      vec.set(state.mouse.x * intensity, 3 + state.mouse.y * 2, 14),
      0.05
    )
    camera.lookAt(0, 0, 0)
  })

  return null
}

function ResponsiveCarla() {
  const { viewport } = useThree()
  const isMobile = viewport.width < 7
  const scale = isMobile ? 0.22 : 0.26
  const position = isMobile ? [0, -0.5, 0.6] : [-1.2, 0, 0.6] as any

  return <Carla rotation={[0, Math.PI - 0.4, 0]} position={position} scale={[scale, scale, scale]} />
}

function ResponsiveText() {
  const { viewport } = useThree()
  const isMobile = viewport.width < 7
  const fontSize = isMobile ? 1.2 : 2.5
  const position = isMobile ? [0, 2.0, -2] : [0, 1.3, -2] as any

  return <VideoText position={position} fontSize={fontSize} />
}

function BrandScene() {
  return (
    <>
      <color attach="background" args={['#0a0a0a']} />
      <fog attach="fog" args={['#0a0a0a', 15, 20]} />

      <group position={[0, -1, 0]}>
        <ResponsiveCarla />
        <ResponsiveText />
        <Ground />
      </group>

      <ambientLight intensity={0.5} />
      <spotLight position={[0, 10, 0]} intensity={0.3} />
      <directionalLight position={[-50, 0, -40]} intensity={0.7} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-5, 3, -5]} intensity={0.4} color="#f5f5dc" />
      <pointLight position={[0, 8, 0]} intensity={0.3} color="#faf9f6" />

      <CameraController />
    </>
  )
}

export default function HeroBrandScene() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-luxury-black">
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: false, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        camera={{ position: [0, 3, 100], fov: 15 }}
        className="w-full h-full"
      >
        <Suspense fallback={<Loader />}>
          <BrandScene />
        </Suspense>
      </Canvas>
    </section>
  )
}
