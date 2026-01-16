import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-home-surface border-t border-home-accent/20 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0">
        
        {/* Brand & Lore */}
        <div className="space-y-2">
          <span className="text-xl font-bold font-sans text-primary-text tracking-tight block">
            KYNAR
          </span>
          <p className="font-serif text-sm text-primary-text/60 italic">
            One Universe. Infinite Solutions.
          </p>
        </div>

        {/* Essential Links (Spec Section 2) */}
        <div className="flex space-x-8 text-sm font-medium text-primary-text/80">
          <Link href="/marketplace" className="hover:text-home-accent transition-colors">Marketplace</Link>
          <Link href="/guides" className="hover:text-home-accent transition-colors">Guides</Link>
          <Link href="/help" className="hover:text-home-accent transition-colors">Help</Link>
        </div>

        {/* Copyright */}
        <div className="text-xs text-primary-text/40 font-sans">
          © {currentYear} Kynar Universe.
        </div>
        
      </div>
    </footer>
  );
}
