import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-border bg-canvas px-gutter py-16 md:px-inner">
      <div className="mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Calm Updates - Business Reference Section 19 */}
          <div className="space-y-6 lg:col-span-1">
            <h3 className="font-brand text-lg font-bold text-kyn-slate-900">Calm updates</h3>
            <p className="max-w-xs text-sm leading-relaxed text-text-secondary font-ui">
              Occasional releases and guides. No noise, no pressure, just tools for a grounded life.
            </p>
            <form className="flex max-w-sm flex-col gap-3 sm:flex-row">
              <input 
                type="email" 
                placeholder="Email address"
                required
                className="w-full rounded-kynar border border-border bg-surface px-4 py-3 text-sm font-ui focus:border-kyn-green-400 focus:outline-none calm-transition"
              />
              <button className="rounded-kynar bg-kyn-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-kyn-slate-800 calm-transition active:scale-[0.98]">
                Subscribe
              </button>
            </form>
          </div>
          
          {/* Navigation Links - UX Canon Section 11 (Loop) */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div className="flex flex-col gap-4">
              <span className="font-brand text-xs font-bold uppercase tracking-wider text-kyn-slate-900">Explore</span>
              <nav className="flex flex-col gap-3 text-sm font-ui">
                <Link href="/home" className="text-text-secondary hover:text-kyn-green-600 calm-transition">Home World</Link>
                <Link href="/lifestyle" className="text-text-secondary hover:text-kyn-caramel-600 calm-transition">Lifestyle World</Link>
                <Link href="/tools" className="text-text-secondary hover:text-kyn-slate-600 calm-transition">Tools World</Link>
                <Link href="/store" className="text-text-secondary hover:text-kyn-green-600 calm-transition">Marketplace</Link>
              </nav>
            </div>
            
            <div className="flex flex-col gap-4">
              <span className="font-brand text-xs font-bold uppercase tracking-wider text-kyn-slate-900">Ownership</span>
              <nav className="flex flex-col gap-3 text-sm font-ui">
                <Link href="/library" className="text-text-secondary hover:text-kyn-slate-900 calm-transition">Your Library</Link>
                <Link href="/about" className="text-text-secondary hover:text-kyn-slate-900 calm-transition">Philosophy</Link>
                <Link href="/guides" className="text-text-secondary hover:text-kyn-slate-900 calm-transition">Guides</Link>
                <Link href="/support" className="text-text-secondary hover:text-kyn-slate-900 calm-transition">Support</Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Footer Base - Business Reference Section 13 */}
        <div className="mt-20 border-t border-border pt-8 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <p className="text-[11px] font-medium text-kyn-slate-400 font-ui italic">
            © 2026 Kynar Universe • Built for Calm • United Kingdom
          </p>
          <div className="flex gap-6 text-[11px] font-medium text-kyn-slate-400 font-ui">
            <Link href="/privacy" className="hover:text-kyn-slate-900">Privacy</Link>
            <Link href="/terms" className="hover:text-kyn-slate-900">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
