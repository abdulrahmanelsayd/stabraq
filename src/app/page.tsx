import dynamic from 'next/dynamic'
import Navigation from '@/components/layout/Navigation'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import CleanSection from '@/components/home/CleanSection'
import PremiumBanner from '@/components/home/PremiumBanner'
import CategorySplit from '@/components/home/CategorySplit'
import BrandStoryTeaser from '@/components/home/BrandStoryTeaser'
import { products } from '@/data/products'
import type { Metadata } from 'next'

// Dynamic Imports for Performance
const HeroBrandScene = dynamic(() => import('@/components/hero/HeroBrandScene'), { ssr: false })
const TestimonialsSection = dynamic(() => import('@/components/home/TestimonialsSection'))
const InstagramFeed = dynamic(() => import('@/components/home/InstagramFeed'))
const NewsletterCTA = dynamic(() => import('@/components/home/NewsletterCTA'))

export const metadata: Metadata = {
  title: 'STABRAQ — Egyptian Heritage Meets Modern Streetwear',
  description:
    'Luxury Egyptian streetwear. Premium cotton, heritage calligraphy, bold designs. Shop the latest collections.',
}

export default function Home() {
  const newArrivals = products.filter((p) => p.new).slice(0, 4)
  const trending = products.filter((p) => p.featured).slice(0, 4)

  return (
    <main className="bg-luxury-gold-light">
      <HeaderWrapper>
        <AnnouncementBar />
        <Navigation />
      </HeaderWrapper>

      <div className="pt-[92px] lg:pt-[140px]" />

      <HeroBrandScene />

      <CleanSection
        title="New Arrivals"
        subtitle="JUST DROPPED"
        products={newArrivals}
        viewAllLink="/collections"
      />

      <BrandStoryTeaser />

      <PremiumBanner />

      <CleanSection
        title="Trending Now"
        subtitle="COMMUNITY FAVORITES"
        products={trending}
        viewAllLink="/collections"
      />

      <CategorySplit />

      <TestimonialsSection />

      <InstagramFeed />

      <NewsletterCTA />

      <Footer />
    </main>
  )
}
