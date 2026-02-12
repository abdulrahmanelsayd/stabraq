import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import AuthOverlay from '@/components/auth/AuthOverlay'
import CartDrawer from '@/components/cart/CartDrawer'
import WishlistDrawer from '@/components/wishlist/WishlistDrawer'
import SearchDrawer from '@/components/search/SearchDrawer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Stabraq | Luxury Egyptian Streetwear',
  description: 'Premium streetwear fusing modern aesthetics with Egyptian heritage.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} bg-luxury-gold-light text-luxury-black antialiased`}>
        <AuthOverlay />
        {children}
        <CartDrawer />
        <WishlistDrawer />
        <SearchDrawer />
      </body>
    </html>
  )
}
