import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-home-base">
      <Navbar />

      {/* Hero Section */}
      <section className="px-4 py-12 text-center max-w-2xl mx-auto">
        <h1 className="text-h1-mob md:text-h1-desk font-bold text-home-text mb-4 leading-tight">
          One Universe v1.<br/>Infinite Solutions.
        </h1>
        <p className="text-body text-home-text/80 font-serif italic mb-8">
          Explore calm tools for work, life, and home.
        </p>
      </section>

      {/* The 3 Worlds Grid */}
      <section className="px-4 pb-20 max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
        
        {/* TOOLS */}
        <Link href="/marketplace/tools" className="group block">
          <div className="bg-tools-base p-8 rounded-2xl shadow-sm border border-transparent hover:border-tools-accent hover:shadow-md transition-all duration-300">
            <h2 className="text-2xl font-bold text-tools-text mb-2">Tools</h2>
            <p className="text-tools-text/80 font-serif text-sm">
              Functional, productive, technical.
            </p>
            <span className="inline-block mt-4 text-tools-accent font-bold text-sm group-hover:translate-x-1 transition-transform">
              Explore Tools &rarr;
            </span>
          </div>
        </Link>

        {/* LIFE */}
        <Link href="/marketplace/life" className="group block">
          <div className="bg-life-base p-8 rounded-2xl shadow-sm border border-transparent hover:border-life-accent hover:shadow-md transition-all duration-300">
            <h2 className="text-2xl font-bold text-life-text mb-2">Life</h2>
            <p className="text-life-text/80 font-serif text-sm">
              Wellbeing, learning, growth.
            </p>
            <span className="inline-block mt-4 text-life-accent font-bold text-sm group-hover:translate-x-1 transition-transform">
              Explore Life &rarr;
            </span>
          </div>
        </Link>

        {/* HOME */}
        <Link href="/marketplace/home" className="group block">
          <div className="bg-home-surface p-8 rounded-2xl shadow-sm border border-transparent hover:border-home-accent hover:shadow-md transition-all duration-300">
            <h2 className="text-2xl font-bold text-home-text mb-2">Home</h2>
            <p className="text-home-text/80 font-serif text-sm">
              Family, routines, daily comfort.
            </p>
            <span className="inline-block mt-4 text-home-accent font-bold text-sm group-hover:translate-x-1 transition-transform">
              Explore Home &rarr;
            </span>
          </div>
        </Link>

      </section>
    </main>
  );
}
