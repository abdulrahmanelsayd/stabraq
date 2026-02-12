import { products } from '@/data/products'
import ProductGallery from '@/components/product-detail/ProductGallery'
import ProductInfo from '@/components/product-detail/ProductInfo'
import RelatedProducts from '@/components/product-detail/RelatedProducts'
import Navigation from '@/components/layout/Navigation'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface ProductPageProps {
    params: {
        id: string
    }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const product = products.find((p) => p.id === params.id)

    if (!product) {
        return {
            title: 'Product Not Found | STABRAQ',
        }
    }

    return {
        title: `${product.name} | STABRAQ`,
        description: product.description,
        openGraph: {
            images: [product.image],
        },
    }
}

export default function ProductPage({ params }: ProductPageProps) {
    const product = products.find((p) => p.id === params.id)

    if (!product) {
        notFound()
    }

    // Mock multiple images for the gallery since our data only has one
    const galleryImages = [
        product.image,
        product.image,
        product.image,
        product.image
    ]

    return (
        <main className="bg-[#FAF9F6] min-h-screen">
            <HeaderWrapper>
                <AnnouncementBar />
                <Navigation />
            </HeaderWrapper>

            <div className="pt-[92px] lg:pt-[140px] pb-12 md:pb-32">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20">
                        {/* Left: Immersive Gallery (7 cols) */}
                        <div className="lg:col-span-7">
                            <ProductGallery images={galleryImages} />
                        </div>

                        {/* Right: Sticky Details (5 cols) */}
                        <div className="lg:col-span-5 relative">
                            <ProductInfo product={product} />
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <RelatedProducts currentProductId={product.id} category={product.category} />
            </div>

            <Footer />
        </main>
    )
}
