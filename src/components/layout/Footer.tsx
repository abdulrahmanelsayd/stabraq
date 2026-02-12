import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react'
import Link from 'next/link'

/**
 * Footer component
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    shop: [
      { label: 'Men', href: '/collections/men' },
      { label: 'Kids', href: '/collections/kids' },
      { label: 'Thawb', href: '/collections/thawb' },
      { label: 'Accessories', href: '/collections/accessories' },
      { label: 'Clearance', href: '/collections/clearance' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Store Locations', href: '/stores' },
      { label: 'Careers', href: '/careers' },
    ],
    support: [
      { label: 'Shipping Policy', href: '/shipping' },
      { label: 'Returns & Exchanges', href: '/returns' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  }

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/stabraqts', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/StabraqTS', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/StabraqTS', label: 'Twitter' }, // Using X icon would be better if available
  ]

  return (
    <footer className="relative bg-luxury-gold-light border-t border-black/5 pt-20 pb-10">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-display text-luxury-black mb-6 tracking-widest">
              STABRAQ
            </h3>
            <p className="text-luxury-black/70 mb-8 max-w-sm font-light leading-relaxed">
              Egyptian heritage meets modern streetwear innovation. Crafting high-quality apparel for those who dare to express themselves.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              <p className="text-luxury-black/70 text-sm">
                <span className="text-luxury-black block mb-1 uppercase tracking-widest text-xs font-medium">Contact Us</span>
                01123399345<br />
                info@stabraq.com
              </p>
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-luxury-black/70 hover:text-luxury-black hover:border-luxury-black transition-colors bg-black/5"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-luxury-black mb-8 font-medium">
              Shop
            </h4>
            <ul className="space-y-4">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-luxury-black/60 hover:text-luxury-black transition-colors text-sm font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-luxury-black mb-8 font-medium">
              Company
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-luxury-black/60 hover:text-luxury-black transition-colors text-sm font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-luxury-black mb-8 font-medium">
              Support
            </h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-luxury-black/60 hover:text-luxury-black transition-colors text-sm font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-luxury-black/40 text-xs font-light">
            &copy; {currentYear} Stabraq. All rights reserved.
          </p>

          {/* Payment Icons (Placeholder SVGs or similar) - Darken for light theme */}
          <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="h-6 w-10 bg-black/10 rounded flex items-center justify-center text-[8px] text-luxury-black">VISA</div>
            <div className="h-6 w-10 bg-black/10 rounded flex items-center justify-center text-[8px] text-luxury-black">MC</div>
            <div className="h-6 w-10 bg-black/10 rounded flex items-center justify-center text-[8px] text-luxury-black">APPLE</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
