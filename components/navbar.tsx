import Link from 'next/link';
import { Menu, ShoppingBag } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full bg-home-base border-b border-white/20 px-4 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Mobile Menu Icon */}
        <button className="p-2 -ml-2 text-home-text hover:bg-white/20 rounded-md lg:hidden">
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link href="/" className="text-xl font-bold font-sans tracking-tight">
          KYNAR UNIVERSE
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-8 font-sans font-medium">
          <Link href="/" className="hover:text-signal-cyan transition-colors">Home</Link>
          <Link href="/marketplace" className="hover:text-signal-cyan transition-colors">Marketplace</Link>
          <Link href="/guides" className="hover:text-signal-cyan transition-colors">Guides</Link>
        </div>

        {/* Cart Icon */}
        <button className="p-2 -mr-2 text-home-text hover:bg-white/20 rounded-md relative">
          <ShoppingBag size={24} />
          <span className="absolute top-1 right-0 bg-signal-cyan text-white text-[10px] font-bold px-1.5 rounded-full">
            0
          </span>
        </button>
      </div>
    </nav>
  );
}
