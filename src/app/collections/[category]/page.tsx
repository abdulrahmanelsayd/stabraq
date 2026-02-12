import dynamic from 'next/dynamic'
import Navigation from '@/components/layout/Navigation'
import ProductGrid from '@/components/collections/ProductGrid'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import { Metadata } from 'next'

// Dynamic Import for Performance
const CollectionsHero = dynamic(() => import('@/components/collections/CollectionsHero'), {
    ssr: false,
    loading: () => <div className="w-full h-[55vh] bg-[#000000]" />
})

// Generate metadata dynamically
export function generateMetadata({ params }: { params: { category: string } }): Metadata {
    return {
        title: `${params.category.toUpperCase()} Collection | STABRAQ`,
        description: `Explore the exclusive ${params.category} collection from Stabraq.`,
    }
}

export default function CategoryPage({ params }: { params: { category: string } }) {
    // Decode category from URL (e.g. "classic-thawb" -> "Classic Thawb")
    const categoryTitle = params.category.replace(/-/g, ' ').toUpperCase()

    return (
        <main className="bg-luxury-black min-h-screen pt-[92px] lg:pt-[140px]">
            <HeaderWrapper>
                <AnnouncementBar />
                <Navigation />
            </HeaderWrapper>

            {/* 1. Hero Section - Dynamic Title */}
            <CollectionsHero title={categoryTitle} />

            {/* 2. Grid Section - Filtered by Category */}
            <ProductGrid category={params.category} />

            <Footer />
        </main>
    )
}
