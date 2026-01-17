import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-home-base flex flex-col items-center justify-center p-4 text-center">
      
      {/* Visual Icon */}
      <div className="w-24 h-24 bg-white/50 rounded-full flex items-center justify-center mb-8 animate-pulse">
        <span className="text-4xl">🔭</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold font-sans text-primary-text mb-4">
        Drifting in space.
      </h1>
      
      <p className="text-xl font-serif text-primary-text/70 italic max-w-md mx-auto mb-10 leading-relaxed">
        The page you are looking for has moved or doesn't exist. Let's get you back to solid ground.
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <Link 
          href="/" 
          className="inline-flex items-center px-8 py-4 bg-home-accent text-white rounded-btn font-medium hover:opacity-90 transition-all shadow-md"
        >
          <Home className="mr-2 w-5 h-5" /> Return Home
        </Link>
        
        <Link 
          href="/marketplace" 
          className="inline-flex items-center px-8 py-4 bg-white text-primary-text rounded-btn font-medium border border-primary-text/10 hover:bg-gray-50 transition-all"
        >
          <ArrowLeft className="mr-2 w-5 h-5" /> Back to Marketplace
        </Link>
      </div>

    </div>
  );
}
