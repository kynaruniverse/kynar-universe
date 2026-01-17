import Link from 'next/link';
import { ArrowRight, Wrench, Heart, Home as HomeIcon } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-home-base flex flex-col">
      
      {/* 1. HERO SECTION */}
      <section className="w-full py-20 md:py-32 text-center px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold font-sans text-primary-text tracking-tight">
            One Universe. Infinite Solutions.
          </h1>
          <p className="text-xl md:text-2xl font-serif text-primary-text/80 italic max-w-2xl mx-auto leading-relaxed">
            A calm, modern digital space where everyday tools help people everywhere work, live, and learn with ease.
          </p>
          <div className="pt-8">
            <Link 
              href="/marketplace" 
              className="inline-flex items-center px-8 py-4 bg-home-accent text-white rounded-btn font-medium hover:bg-home-accent/90 transition-all hover:scale-105"
            >
              Explore <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY GRID (The "Three Worlds") */}
      <section className="max-w-7xl mx-auto px-4 w-full pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* CARD: TOOLS */}
          <Link href="/marketplace?category=Tools" className="group">
            <div className="bg-tools-surface p-8 rounded-card h-full border border-transparent hover:border-tools-accent/30 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-tools-accent/20 rounded-full flex items-center justify-center mb-6 text-tools-accent">
                <Wrench className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-primary-text group-hover:text-tools-accent transition-colors">Tools</h2>
              <p className="font-serif text-primary-text/80 leading-relaxed">
                Everything you need to build, create, and stay organised. Clear tools for a brighter workflow.
              </p>
            </div>
          </Link>

          {/* CARD: LIFE */}
          <Link href="/marketplace?category=Life" className="group">
            <div className="bg-life-surface p-8 rounded-card h-full border border-transparent hover:border-life-accent/30 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-life-accent/20 rounded-full flex items-center justify-center mb-6 text-life-accent">
                <Heart className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-primary-text group-hover:text-life-accent transition-colors">Life</h2>
              <p className="font-serif text-primary-text/80 leading-relaxed">
                Guides, ideas, and resources for everyday life. Explore what helps you learn, grow, and feel inspired.
              </p>
            </div>
          </Link>

          {/* CARD: HOME */}
          <Link href="/marketplace?category=Home" className="group">
            <div className="bg-cat-home-surface p-8 rounded-card h-full border border-transparent hover:border-cat-home-accent/30 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-cat-home-accent/20 rounded-full flex items-center justify-center mb-6 text-primary-text">
                <HomeIcon className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-primary-text group-hover:text-cat-home-accent transition-colors">Home</h2>
              <p className="font-serif text-primary-text/80 leading-relaxed">
                Warm, simple tools for families, routines, and daily comfort. A space for the people who matter.
              </p>
            </div>
          </Link>

        </div>
      </section>

    </main>
  );
}
