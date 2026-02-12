'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Search, ShoppingBag, Heart, User, LogOut, Package } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/useAuthStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useSearchStore } from '@/store/searchStore'
import Image from 'next/image'

/**
 * Navigation component with Mega Menu for Stabraq
 * High-End Dual-Tier Layout
 */
export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const pathname = usePathname()
  const { toggleCart, items } = useCartStore()
  const { user, isAuthenticated, openAuth, logout } = useAuthStore()
  const wishlistItems = useWishlistStore((state) => state.items)

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  // Stabraq Navigation Structure
  const topTierLinks = [
    { label: 'THAWB', href: '/collections/thawb' },
  ]

  const mainNavItems = [
    {
      label: 'Men',
      href: '/collections/men',
      dropdown: [
        { title: 'Tops', links: ['T-shirts', 'Graphics', 'Polo', 'Shirts', 'Hoodies', 'Zippers', 'Jackets'] },
        { title: 'Bottoms', links: ['Jeans', 'Joggers', 'Sweatpants', 'Shorts'] },
        { title: 'Accessories', links: ['Socks', 'Headwear', 'Bags'] },
      ]
    },
    {
      label: 'Kids',
      href: '/collections/kids',
      dropdown: [
        { title: 'Collections', links: ['Jilbab', 'Graphics', 'Zippers', 'Pants', 'Summers'] }
      ]
    },
    { label: 'Summers', href: '/collections/summers' },
    { label: 'Accessories', href: '/collections/accessories' },
    { label: 'Clearance', href: '/collections/clearance', highlight: true },
  ]

  return (
    <>
      <header className="relative w-full max-w-[100vw] z-50 flex flex-col transition-transform duration-500 overflow-x-hidden">

        {/* Tier 1: The Vault (Dark, Utility, Branding) */}
        <div className="bg-luxury-black text-white px-4 md:px-12 h-14 flex items-center justify-between border-b border-white/5 relative z-50">

          {/* Left: Mobile Menu & Exclusive Links */}
          <div className="flex-1 flex items-center">
            <button
              className="lg:hidden p-2.5 -ml-1 mr-2 text-white hover:text-luxury-gold transition-colors active:scale-95"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden lg:flex items-center gap-6">
              {topTierLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs font-medium tracking-[0.2em] hover:text-luxury-gold transition-colors uppercase"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Center: Brand Logo */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="font-display text-2xl tracking-[0.25em] font-bold text-white hover:text-luxury-gold/90 transition-colors">
              STABRAQ
            </Link>
          </div>

          {/* Right: Utilities */}
          <div className="flex-1 flex justify-end items-center gap-3 md:gap-6">

            {/* User Account / Auth */}
            <div className="relative group hidden md:block">
              <button
                onClick={() => isAuthenticated ? setUserMenuOpen(!userMenuOpen) : openAuth()}
                className="text-white/80 hover:text-luxury-gold transition-colors flex items-center gap-2"
              >
                {isAuthenticated && user?.avatar ? (
                  <div className="w-5 h-5 rounded-full overflow-hidden border border-white/20">
                    <Image src={user.avatar} alt={user.name} width={20} height={20} />
                  </div>
                ) : (
                  <User className="w-4 h-4" />
                )}
              </button>

              {/* Desktop Dropdown */}
              {isAuthenticated && (
                <div className="absolute top-full right-0 mt-4 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
                  <div className="p-4 border-b border-gray-50">
                    <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                    <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <div className="py-2">
                    <Link href="/account" className="flex items-center gap-3 px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 hover:text-luxury-black transition-colors">
                      <User className="w-3 h-3" /> My Profile
                    </Link>
                    <Link href="/account/orders" className="flex items-center gap-3 px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 hover:text-luxury-black transition-colors">
                      <Package className="w-3 h-3" /> Orders
                    </Link>
                    <Link href="/account/wishlist" className="flex items-center gap-3 px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 hover:text-luxury-black transition-colors">
                      <Heart className="w-3 h-3" /> Wishlist
                    </Link>
                  </div>
                  <div className="border-t border-gray-50 pt-2 pb-2">
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-3 h-3" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile User Icon */}
            <button
              onClick={() => isAuthenticated ? setUserMenuOpen(!userMenuOpen) : openAuth()}
              className="md:hidden p-2 text-white/80 hover:text-luxury-gold transition-colors active:scale-95"
            >
              <User className="w-4 h-4" />
            </button>

            <button
              onClick={() => useSearchStore.getState().toggleSearch()}
              className="p-2 text-white/80 hover:text-luxury-gold transition-colors active:scale-95"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => useWishlistStore.getState().toggleWishlist()}
              className="relative p-2 text-white/80 hover:text-luxury-gold transition-colors active:scale-95"
            >
              <Heart className="w-4 h-4" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-luxury-gold text-luxury-black text-[9px] font-bold flex items-center justify-center rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </button>
            <button
              onClick={toggleCart}
              className="relative p-2 text-white/80 hover:text-luxury-gold transition-colors active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              {items.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-luxury-gold text-luxury-black text-[9px] font-bold flex items-center justify-center rounded-full">
                  {items.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Tier 2: The Avenue (Light, Main Categories) */}
        <div className="hidden lg:flex bg-luxury-gold-light text-luxury-black h-12 items-center justify-center border-b border-black/5 relative z-40 shadow-sm">
          <nav className="flex items-center gap-10">
            {mainNavItems.map((item) => (
              <div
                key={item.label}
                className="relative group h-12 flex items-center"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-300 relative
                    ${item.highlight ? 'text-red-800' : 'text-luxury-black/70 hover:text-luxury-black'}
                    after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] 
                    after:bg-luxury-black after:transition-all after:duration-300 group-hover:after:w-full
                  `}
                >
                  {item.label}
                </Link>

                {item.dropdown && activeDropdown === item.label && (
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] bg-white border border-black/5 shadow-2xl p-8 grid grid-cols-3 gap-8 opacity-0 animate-fade-in origin-top cursor-default">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-luxury-gold" />
                    {item.dropdown.map((section) => (
                      <div key={section.title} className="col-span-1">
                        <h4 className="font-display text-luxury-black text-lg mb-4 pb-2 border-b border-black/5">
                          {section.title}
                        </h4>
                        <ul className="space-y-2">
                          {section.links.map((link) => (
                            <li key={link}>
                              <Link
                                href={`/collections/${link.toLowerCase().replace(/ /g, '-')}`}
                                className="text-luxury-black/60 hover:text-luxury-black hover:translate-x-1 transition-all duration-200 text-xs tracking-wide block py-0.5"
                              >
                                {link}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] w-full h-full lg:hidden transition-all duration-300 ${isMobileMenuOpen
          ? 'opacity-100 visible pointer-events-auto'
          : 'opacity-0 invisible pointer-events-none'
          }`}
      >
        {/* Dark backdrop */}
        <div
          className="absolute inset-0 bg-[#050505]"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Close button — top-right */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-5 right-5 z-[70] p-3 text-white/60 hover:text-white transition-colors active:scale-90"
          style={{ paddingTop: 'calc(0.75rem + env(safe-area-inset-top))' }}
        >
          <X className="w-6 h-6" />
        </button>

        <div
          className="relative z-[101] w-full h-full flex flex-col justify-between overflow-y-auto overscroll-contain bg-luxury-black/95 backdrop-blur-md"
          style={{
            paddingTop: 'calc(4rem + env(safe-area-inset-top))',
            paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Main Navigation */}
          <nav className="px-8 space-y-1">
            {/* Exclusive Links */}
            {topTierLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-[12px] font-bold tracking-[0.3em] text-luxury-gold uppercase py-3 border-b border-white/5"
              >
                {link.label}
              </Link>
            ))}

            {/* Divider */}
            <div className="h-px bg-white/10 my-4" />

            {/* Main Categories */}
            {mainNavItems.map((item) => (
              <div key={item.label} className="py-2 border-b border-white/5">
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block font-display text-[32px] font-bold tracking-wide py-1
                    transition-colors duration-300
                    ${item.highlight
                      ? 'text-red-500 hover:text-red-400'
                      : 'text-white hover:text-luxury-copper'
                    }`}
                >
                  {item.label}
                </Link>

                {/* Sub-links */}
                {item.dropdown && (
                  <div className="pl-1 pb-3 space-y-3">
                    {item.dropdown.map(sec => (
                      <div key={sec.title} className="mb-4">
                        <span className="text-[11px] text-luxury-gold uppercase tracking-[0.25em] block mb-2 font-bold opacity-100">
                          {sec.title}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {sec.links.map(link => (
                            <Link
                              key={link}
                              href={`/collections/${link.toLowerCase().replace(/ /g, '-')}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-[13px] text-white font-medium py-2 px-4 rounded-md border border-white/20
                                         bg-white/10 active:bg-white/20 block w-full text-center"
                            >
                              {link}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Bottom Section: Auth + Socials */}
          <div className="px-8 mt-auto pt-8 opacity-100 transform translate-y-0">
            <div className="h-px bg-white/10 mb-6" />
            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {user?.avatar && (
                    <Image src={user.avatar} alt={user.name} width={36} height={36} className="rounded-full border border-white/10" />
                  )}
                  <div>
                    <p className="text-white text-sm font-medium">{user?.name}</p>
                    <p className="text-white/30 text-[11px]">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="text-red-400/80 text-xs font-medium flex items-center gap-2 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setIsMobileMenuOpen(false); openAuth(); }}
                className="w-full py-3.5 border border-white/20 text-white text-[11px] font-medium uppercase tracking-[0.25em]
                           rounded-sm hover:bg-white/5 hover:border-luxury-copper/50 active:scale-[0.98]
                           transition-all duration-300"
              >
                Login / Join Club
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
