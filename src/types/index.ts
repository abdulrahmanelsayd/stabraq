/**
 * Type definitions for Stabraq
 */

// Product types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: string
  category: string
  image: string
  model3D?: string
  scents?: string[]
  notes?: {
    top: string[]
    middle: string[]
    base: string[]
  }
  materials?: string[]
  sizes?: string[]
  colors: ColorVariant[]
  featured?: boolean
  new?: boolean
}

export interface ColorVariant {
  id: string
  name: string
  color: string
  image?: string
}

export interface CartItem extends Product {
  cartId: string // unique id for cart item (product.id + variants)
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

// 3D Scene types
export interface SceneConfig {
  camera: {
    position: [number, number, number]
    fov: number
  }
  lights: {
    ambient: {
      intensity: number
      color: string
    }
    directional: {
      position: [number, number, number]
      intensity: number
      color: string
    }
  }
  background: string
}

export interface ParticleConfig {
  count: number
  size: number
  color: string
  opacity: number
  speed: number
}

// Animation types
export interface AnimationConfig {
  duration: number
  ease: string
  delay?: number
  stagger?: number
}

// Navigation types
export interface NavItem {
  label: string
  href: string
}

// WebXR types
export interface XRSessionConfig {
  requiredFeatures: string[]
  optionalFeatures?: string[]
}

// Component prop types
export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
}

export interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}
