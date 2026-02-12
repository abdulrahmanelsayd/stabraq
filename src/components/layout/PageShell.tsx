import Navigation from '@/components/layout/Navigation'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'

/**
 * Shared page shell for all inner pages (about, contact, policies, etc.)
 * Keeps layout DRY and consistent across the site.
 */
export default function PageShell({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-[#FAF9F6] min-h-screen text-luxury-black">
            <HeaderWrapper>
                <AnnouncementBar />
                <Navigation />
            </HeaderWrapper>

            <div className="pt-[92px] lg:pt-[140px]">{children}</div>

            <Footer />
        </main>
    )
}
