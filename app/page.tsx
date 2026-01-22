import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="px-4 py-6 space-y-8">
      
      {/* 1. Hero Section [UX Guide 2.1] */}
      <section className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold tracking-tight text-kyn-slate-900 dark:text-white">
          One universe, <br />
          <span className="text-kyn-green-600 dark:text-kyn-green-400">unlimited solutions.</span>
        </h1>
        <p className="text-kyn-slate-600 dark:text-kyn-slate-300 text-lg">
          Organise home, life, and projects in one place.
        </p>
        <div className="pt-4">
          <Link 
            href="/store" 
            className="inline-flex items-center bg-kyn-green-600 hover:bg-kyn-green-700 text-white font-medium px-8 py-3 rounded-full transition-colors"
          >
            Browse Store
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 2. Worlds Showcase [UX Guide 2.1] */}
      <section className="space-y-4">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-kyn-slate-500">
          Explore Worlds
        </h2>
        
        <div className="grid gap-4">
          {/* Home World Card */}
          <Link href="/store?world=home" className="block group">
            <div className="bg-kyn-green-50 dark:bg-kyn-green-900/20 border border-kyn-green-100 dark:border-kyn-green-800 p-6 rounded-2xl transition-all hover:shadow-md hover:border-kyn-green-300">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-kyn-green-500 text-white mb-3">
                Home
              </span>
              <h3 className="text-xl font-bold text-kyn-green-900 dark:text-kyn-green-100">
                Make everyday life less chaotic
              </h3>
            </div>
          </Link>

          {/* Lifestyle World Card */}
          <Link href="/store?world=lifestyle" className="block group">
            <div className="bg-kyn-caramel-50 dark:bg-kyn-caramel-900/20 border border-kyn-caramel-100 dark:border-kyn-caramel-800 p-6 rounded-2xl transition-all hover:shadow-md hover:border-kyn-caramel-300">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-kyn-caramel-500 text-white mb-3">
                Lifestyle
              </span>
              <h3 className="text-xl font-bold text-kyn-caramel-900 dark:text-kyn-caramel-100">
                Build better habits and routines
              </h3>
            </div>
          </Link>

          {/* Tools World Card */}
          <Link href="/store?world=tools" className="block group">
            <div className="bg-kyn-slate-50 dark:bg-kyn-slate-800/50 border border-kyn-slate-200 dark:border-kyn-slate-700 p-6 rounded-2xl transition-all hover:shadow-md hover:border-kyn-slate-400">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-kyn-slate-500 text-white mb-3">
                Tools
              </span>
              <h3 className="text-xl font-bold text-kyn-slate-900 dark:text-kyn-slate-100">
                Power up your projects
              </h3>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Trust Signals [UX Guide 2.1] */}
      <section className="pt-4 border-t border-kyn-slate-200 dark:border-kyn-slate-800">
        <div className="flex justify-between text-xs text-kyn-slate-400 dark:text-kyn-slate-500 font-medium text-center">
           <span>UK-First <br/>Marketplace</span>
           <span>Secure <br/>Downloads</span>
           <span>Curated <br/>Quality</span>
        </div>
      </section>
    </div>
  );
}
