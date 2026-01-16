import Link from 'next/link';
import { User, ArrowRight } from 'lucide-react';

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-account-base flex flex-col items-center justify-center p-4">
      
      {/* CARD CONTAINER */}
      <div className="bg-account-surface w-full max-w-md p-8 rounded-card shadow-sm border border-black/5 text-center">
        
        {/* ICON */}
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-primary-text shadow-sm">
          <User className="w-8 h-8" />
        </div>

        {/* LORE & WELCOME (Spec Section 6) */}
        <h1 className="text-3xl font-bold font-sans text-primary-text mb-2 tracking-tight">
          Welcome back, traveler.
        </h1>
        
        <p className="font-serif text-primary-text/70 mb-8 leading-relaxed">
          Your library awaits. Enter your email to access your tools and guides.
        </p>

        {/* VISUAL FORM (No logic yet) */}
        <div className="space-y-4 text-left">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-primary-text mb-1">Email Address</label>
            <input 
              type="email" 
              id="email"
              placeholder="name@example.com" 
              className="w-full px-4 py-3 rounded-btn border border-gray-300 focus:outline-none focus:ring-2 focus:ring-home-accent bg-white/80"
            />
          </div>
          
          <button className="w-full py-3 bg-primary-text text-white font-medium rounded-btn hover:opacity-90 transition-opacity flex items-center justify-center">
            Send Access Link <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>

        {/* FOOTER NUDGE */}
        <div className="mt-8 pt-8 border-t border-black/10">
          <p className="text-sm text-primary-text/60">
            Just browsing? <Link href="/marketplace" className="font-bold underline hover:text-primary-text">Return to the Marketplace</Link>.
          </p>
        </div>

      </div>
    </main>
  );
}
