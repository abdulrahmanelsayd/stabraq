import Link from 'next/link'
import { MoveLeft } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-luxury-black p-4 text-center">
            <h1 className="text-[12rem] font-display font-bold leading-none select-none opacity-5">404</h1>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h2 className="text-3xl md:text-5xl font-display mb-4">Page Not Found</h2>
                <p className="text-gray-500 max-w-md mb-8">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-luxury-black text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold hover:text-luxury-black transition-colors"
                >
                    <MoveLeft className="w-4 h-4" /> Back to Home
                </Link>
            </div>
        </div>
    )
}
