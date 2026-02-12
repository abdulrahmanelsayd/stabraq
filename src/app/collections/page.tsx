import dynamic from 'next/dynamic'
import Navigation from '@/components/layout/Navigation'
import ProductGrid from '@/components/collections/ProductGrid'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import type { Metadata } from 'next'

// Dynamic Import for Performance
const CollectionsHero = dynamic(() => import('@/components/collections/CollectionsHero'), {
    ssr: false,
    loading: () => <div className="w-full h-[55vh] bg-[#000000]" /> // Placeholder to prevent layout shift
})

export const metadata: Metadata = {
    title: 'Collections | STABRAQ',
    description: 'Explore our full range of premium streetwear.',
}

export default function CollectionsPage() {
    return (
        <main className="bg-luxury-black min-h-screen pt-[92px] lg:pt-[140px]">
            <HeaderWrapper>
                <AnnouncementBar />
                <Navigation />
            </HeaderWrapper>

            {/* 1. Hero Section - Fixed Height (60vh) */}
            <CollectionsHero />

            {/* 2. Grid Section - Standard Scroll */}
            <ProductGrid />

            <Footer />
        </main>
    )
}
