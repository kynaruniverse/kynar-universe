/**
 * KYNAR UNIVERSE: Final Anchor (v1.6)
 * Role: Closure, structural integrity, and legal clarity.
 * Optimization: Mobile-safe padding, hardware-accelerated transitions.
 */

import Link from "next/link";
import { Compass, ArrowUpRight } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-kyn-slate-50 bg-white px-gutter pt-20 pb-40 md:pb-20">
      <div className="mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-4">
          
          {/* Brand Philosophy Block */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-kyn-slate-900 text-white transition-transform group-hover:rotate-12">
                <Compass size={20} />
              </div>
              <span className="font-brand text-xl font-bold tracking-tighter text-kyn-slate-900">
                KYNAR<span className="text-kyn-slate-400">UNIVERSE</span>
              </span>
            </Link>
            <p className="font-ui text-sm text-text-secondary leading-relaxed max-w-sm">
              Engineered for digital permanence. We build frameworks and tools 
              designed to ground your creative and technical life in the UK and beyond.
            </p>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-kyn-green-500 animate-pulse" />
              <span className="font-ui text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400">
                System Active • London
              </span>
            </div>
          </div>

          {/* Navigation Matrix */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <FooterGroup 
              title="Explore" 
              links={[
                { label: 'Marketplace', href: '/store' },
                { label: 'Library', href: '/library' },
                { label: 'Briefings', href: '/guides' },
                { label: 'Changelog', href: '/updates' }
              ]} 
            />
            <FooterGroup 
              title="Identity" 
              links={[
                { label: 'Privacy Protocol', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Support Gate', href: '/support' },
                { label: 'Account', href: '/account' }
              ]} 
            />
          </div>
        </div>

        {/* Bottom Bar: Copyright & Location */}
        <div className="mt-20 pt-8 border-t border-kyn-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-kyn-slate-400">
            © {currentYear} Kynar Universe • Technical Integrity Reserved
          </p>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 font-brand text-[10px] font-bold uppercase tracking-widest text-kyn-slate-900 hover:text-kyn-green-600 transition-colors"
          >
            Ascend to Top
            <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

interface FooterGroupProps {
  title: string;
  links: { label: string; href: string; }[];
}

function FooterGroup({ title, links }: FooterGroupProps) {
  return (
    <div className="flex flex-col gap-6">
      <span className="font-brand text-[10px] font-black uppercase tracking-[0.2em] text-kyn-slate-900">
        {title}
      </span>
      <nav className="flex flex-col gap-4">
        {links.map(link => (
          <Link 
            key={link.label} 
            href={link.href} 
            className="font-ui text-sm text-text-secondary hover:text-kyn-slate-900 hover:translate-x-1 transition-all duration-300"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
