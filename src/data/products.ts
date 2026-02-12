import { Product } from '@/types'

export const products: Product[] = [
  // MEN - TOPS
  {
    id: 'stabraq-hoodie-black',
    name: 'Basic Hoodie',
    description: 'Heavyweight premium cotton hoodie with embroidered Stabraq calligraphy. The essential piece for your streetwear rotation.',
    price: 1250,
    currency: 'EGP',
    category: 'Men',
    image: '/collections/img1_.jpg',
    materials: ['100% Cotton', 'Heavyweight Fleece'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { id: 'black', name: 'Black', color: '#1a1a1a' },
      { id: 'olive', name: 'Olive', color: '#556b2f' },
    ],
    featured: true,
  },
  {
    id: 'graphic-tee-pharaoh',
    name: 'Basic Tee',
    description: 'Oversized fit t-shirt featuring modern Neo-Pharaonic artwork. Soft touch finish for daily comfort.',
    price: 650,
    currency: 'EGP',
    category: 'Men',
    image: '/collections/img2_.jpg',
    materials: ['Egyptian Cotton'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { id: 'white', name: 'White', color: '#ffffff' },
      { id: 'charcoal', name: 'Charcoal', color: '#36454f' },
    ],
    featured: false,
    new: true,
  },
  {
    id: 'oversized-zipper',
    name: 'Basic Jacket',
    description: 'Tactical inspired zipper jacket with multiple pockets and high neck collar. Perfect for layering.',
    price: 1850,
    currency: 'EGP',
    category: 'Men',
    image: '/collections/img4_.jpg',
    materials: ['Technical Nylon', 'Cotton Lining'],
    sizes: ['M', 'L', 'XL'],
    colors: [
      { id: 'navy', name: 'Navy', color: '#000080' },
      { id: 'black', name: 'Black', color: '#000000' },
    ],
    featured: true,
  },

  // THAWB & JILBAB
  {
    id: 'classic-thawb-white',
    name: 'Basic Thawb',
    description: 'Modern tailored thawb with subtle embroidery and structured collar. Elegant simplicity.',
    price: 2200,
    currency: 'EGP',
    category: 'Thawb',
    image: '/collections/img5_.jpg',
    materials: ['Premium Blend', 'Wrinkle Resistant'],
    sizes: ['52', '54', '56', '58', '60'],
    colors: [
      { id: 'white', name: 'White', color: '#ffffff' },
      { id: 'cream', name: 'Cream', color: '#f5f5dc' },
    ],
    featured: true,
    new: true,
  },
  {
    id: 'moroccan-jilbab',
    name: 'Basic Jilbab',
    description: 'A contemporary take on the classic Jilbab, featuring a relaxed fit and hood for casual wear.',
    price: 1950,
    currency: 'EGP',
    category: 'Thawb',
    image: '/collections/img6_.webp',
    materials: ['Wool Blend'],
    sizes: ['M', 'L', 'XL'],
    colors: [
      { id: 'grey', name: 'Grey', color: '#808080' },
      { id: 'camel', name: 'Camel', color: '#c19a6b' },
    ],
    featured: false,
  },

  // MEN - BOTTOMS
  {
    id: 'cargo-pants-utility',
    name: 'Basic Cargo',
    description: 'Functional cargos with ample storage and adjustable hem. Built for the city movement.',
    price: 1400,
    currency: 'EGP',
    category: 'Men',
    image: '/collections/img8_.jpg',
    materials: ['Cotton Twill', 'Elastane'],
    sizes: ['30', '32', '34', '36', '38'],
    colors: [
      { id: 'khaki', name: 'Khaki', color: '#f0e68c' },
      { id: 'black', name: 'Black', color: '#000000' },
    ],
    featured: true,
  },
  {
    id: 'sweatpants-basic',
    name: 'Basic Sweatpants',
    description: 'Ultra-soft fleece sweatpants with cuffed ankles and minimal branding. Maximum comfort.',
    price: 950,
    currency: 'EGP',
    category: 'Men',
    image: '/collections/img3_.jpg',
    materials: ['Cotton Blend'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { id: 'grey-marl', name: 'Grey Marl', color: '#d3d3d3' },
      { id: 'black', name: 'Black', color: '#000000' },
    ],
    featured: false,
  },

  // KIDS
  {
    id: 'kids-graphic-tee',
    name: 'Basic Kids Tee',
    description: 'Colourful graphic tee for the little ones. Durable and soft for all-day play.',
    price: 450,
    currency: 'EGP',
    category: 'Kids',
    image: '/collections/img9_.jpg',
    materials: ['100% Cotton'],
    sizes: ['4Y', '6Y', '8Y', '10Y', '12Y'],
    colors: [
      { id: 'blue', name: 'Blue', color: '#0000ff' },
      { id: 'red', name: 'Red', color: '#ff0000' },
    ],
    featured: false,
    new: true,
  },
  {
    id: 'kids-hoodie',
    name: 'Basic Kids Hoodie',
    description: 'Keep them warm in style. Cozy hoodie matching the adult collection.',
    price: 850,
    currency: 'EGP',
    category: 'Kids',
    image: '/collections/img10_.jpg',
    materials: ['Cotton Fleece'],
    sizes: ['6Y', '8Y', '10Y', '12Y'],
    colors: [
      { id: 'yellow', name: 'Yellow', color: '#ffd700' },
      { id: 'navy', name: 'Navy', color: '#000080' },
    ],
    featured: true,
  },

  // ACCESSORIES
  {
    id: 'stabraq-cap',
    name: 'Basic Cap',
    description: 'Classic 6-panel cap with raised 3D embroidery. Adjustable strap for perfect fit.',
    price: 350,
    currency: 'EGP',
    category: 'Accessories',
    image: '/collections/img7_.jpg',
    materials: ['Cotton Twill'],
    sizes: ['One Size'],
    colors: [
      { id: 'black', name: 'Black', color: '#000000' },
      { id: 'white', name: 'White', color: '#ffffff' },
    ],
    featured: false,
  },
]

export const featuredProducts = products.filter(p => p.featured)
export const newProducts = products.filter(p => p.new)
