"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-[94%] max-w-7xl mx-auto mb-12 mt-32 relative z-10">
      {/* 1. FOOTER CONTAINER: Physical Depth Surface */}
      <div className="brand-card surface-mocha px-8 md:px-16 py-20 shadow-tactile relative overflow-hidden">
        
        {/* Subtle accent reveal */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-20">
          
          {/* 2. BRAND IDENTITY */}
          <div className="text-center lg:text-left space-y-6 max-w-sm">
            <span className="text-4xl font-semibold text-brand-text tracking-tighter block">
              KYNAR
            </span>
            <p className="text-[15px] text-brand-text/50 leading-relaxed font-medium">
              Practical digital products to help you do more — for work, learning, creativity, and play.
            </p>
          </div>

          {/* 3. NAVIGATION CLUSTERS */}
          <div className="flex flex-col md:flex-row gap-16 lg:gap-32 items-center lg:items-start text-center md:text-left">
            
            {/* Primary Navigation */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-text/30">Shop</h4>
              <nav className="flex flex-col gap-5 text-[11px] uppercase tracking-widest font-semibold text-brand-text/50">
                {[
                  { name: 'The Store', href: '/marketplace' },
                  { name: 'Guides', href: '/guides' },
                  { name: 'Help', href: '/help' },
                  { name: 'Account', href: '/account' }
                ].map((link) => (
                  <Link 
                    key={link.name}
                    href={link.href} 
                    className="hover:text-brand-text hover:translate-x-1 transition-all duration-500"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Support & Legal */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-text/30">Information</h4>
              <nav className="flex flex-col gap-5 text-[11px] uppercase tracking-widest font-semibold text-brand-text/40">
                <Link href="/terms" className="hover:text-brand-text transition-colors duration-500">
                  Terms of Service
                </Link>
                <Link href="/privacy" className="hover:text-brand-text transition-colors duration-500">
                  Privacy Policy
                </Link>
                <Link href="/contact" className="hover:text-brand-text transition-colors duration-500">
                  Contact Us
                </Link>
              </nav>
            </div>
          </div>

          {/* 4. COMPLIANCE & BRAND MARKS */}
          <div className="flex flex-col items-center lg:items-end gap-10 pt-10 lg:pt-0 border-t lg:border-t-0 border-brand-text/5 w-full lg:w-auto">
            <div className="flex gap-6">
               <motion.div whileHover={{ scale: 1.2 }} className="w-2.5 h-2.5 rounded-full bg-brand-accent shadow-sm" />
               <motion.div whileHover={{ scale: 1.2 }} className="w-2.5 h-2.5 rounded-full bg-accent-thermal shadow-sm" />
               <motion.div whileHover={{ scale: 1.2 }} className="w-2.5 h-2.5 rounded-full bg-accent-lavender shadow-sm" />
            </div>
            <div className="text-center lg:text-right">
              <p className="text-[10px] uppercase tracking-[0.3em] text-brand-text/20 font-bold">
                © {currentYear} KYNAR Universe
              </p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-brand-text/10 font-semibold mt-2">
                Quality Digital Goods — UK
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
