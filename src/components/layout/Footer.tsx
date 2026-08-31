"use client";

import Link from "react-router-dom";
import { MapPin, Heart, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "All Properties", href: "/properties" },
      { label: "Map Search", href: "/map-search" },
      { label: "For Rent", href: "/properties?type=rent" },
      { label: "Featured Listings", href: "/properties?featured=true" },
      { label: "New Developments", href: "/properties?new=true" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Press", href: "/press" },
    ],
    support: [
      { label: "Help Center", href: "/help" },
      { label: "Contact Us", href: "/contact" },
      { label: "Safety Guidelines", href: "/safety" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
    resources: [
      { label: "Rental Guide", href: "/guides/renting" },
      { label: "Neighborhood Guides", href: "/guides/neighborhoods" },
      { label: "Moving Checklist", href: "/guides/moving" },
      { label: "Tenant Rights", href: "/guides/rights" },
      { label: "Landlord Resources", href: "/guides/landlords" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/pata_nyumba", label: "Twitter" },
    { icon: Facebook, href: "https://facebook.com/pata_nyumba", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/pata_nyumba", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/pata-nyumba", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-2" aria-label="PataNyumba Home">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500">
                <MapPin className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold text-white">PataNyumba</span>
            </Link>
            <p className="text-base leading-relaxed max-w-xs">
              Kenya's trusted rental marketplace. Discover, compare, and connect with verified properties across the country.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Product</h3>
                <ul className="mt-4 space-y-3">
                  {footerLinks.product.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-base hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h3>
                <ul className="mt-4 space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-base hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-8 mt-10 md:mt-0">
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Support</h3>
                <ul className="mt-4 space-y-3">
                  {footerLinks.support.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-base hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Resources</h3>
                <ul className="mt-4 space-y-3">
                  {footerLinks.resources.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-base hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} PataNyumba. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>Made with <Heart className="h-4 w-4 text-emerald-500" aria-hidden="true" /> in Kenya</span>
              <span>v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;