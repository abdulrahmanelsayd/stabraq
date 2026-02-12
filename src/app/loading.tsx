export default function Loading() {
    return (
        <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-2 border-black/10 border-t-luxury-black rounded-full animate-spin" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-black animate-pulse">
                    Loading
                </span>
            </div>
        </div>
    )
}
