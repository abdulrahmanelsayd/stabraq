# STABRAQ

Stabraq is a premium fashion e-commerce platform blending modern streetwear aesthetics with Egyptian heritage. The project emphasizes high-performance 3D visuals, smooth animations, and a seamless shopping experience.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **3D Graphics:** React Three Fiber (@react-three/drei, @react-three/fiber)
- **Animations:** GSAP
- **State Management:** Zustand
- **Fonts:** Inter (Sans), Playfair Display (Serif)

## Key Features

- **Immersive 3D Hero:** Custom React Three Fiber scene with optimized loading.
- **Dynamic Collections:** Filterable product grids with search and sorting.
- **Cart & Wishlist:** Persistent state management with slide-out drawers.
- **Checkout Flow:** Multi-step process (Shipping -> Payment -> Review).
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop.
- **Performance:** Dynamic imports, lazy loading, and optimized assets.

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
stabraq/
├── src/
│   ├── app/                 # Next.js App Router (Pages & Layouts)
│   ├── components/          # React Components
│   │   ├── auth/            # Authentication Overlay
│   │   ├── cart/            # Cart Drawer & Logic
│   │   ├── checkout/        # Checkout Flow
│   │   ├── collections/     # Grid, 3D Cards, Filtering
│   │   ├── hero/            # 3D Hero Scenes
│   │   ├── home/            # Landing Page Sections
│   │   ├── layout/          # Header, Footer, Shell
│   │   ├── product-detail/  # Gallery, Info, Related
│   │   ├── search/          # Search Drawer
│   │   └── wishlist/        # Wishlist Logic
│   ├── data/                # Static Data (Products)
│   ├── lib/                 # Utilities & Constants
│   ├── store/               # Zustand Stores
│   └── types/               # TypeScript Interfaces
├── public/                  # Static Assets
└── ...
```

## Credits

Designed and developed by the Stabraq Engineering Team.
