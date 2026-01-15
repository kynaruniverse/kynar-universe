import Link from 'next/link';
import { BookOpen, ArrowRight, Lightbulb, Coffee } from 'lucide-react';

export default function Guides() {
  return (
    <main className="min-h-screen bg-life-base pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="bg-life-surface px-4 py-20 text-center border-b border-life-accent/20">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-life-accent/20 text-life-accent mb-4">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-sans text-primary-text tracking-tight">
            Guides & Resources
          </h1>
          <p className="text-xl font-serif text-primary-text/80 italic leading-relaxed">
            Here’s where your story grows. Explore ideas, tutorials, and support for your journey.
          </p>
        </div>
      </section>

      {/* 2. FEATURED GUIDES GRID */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* ARTICLE CARD 1 */}
          <article className="group bg-white rounded-card p-8 shadow-sm hover:shadow-md transition-all border border-transparent hover:border-life-accent/40">
            <div className="text-life-accent mb-4">
              <Lightbulb className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold font-sans text-primary-text mb-3 group-hover:text-life-accent transition-colors">
              Getting Started with Digital Tools
            </h2>
            <p className="font-serif text-primary-text/70 mb-6 leading-relaxed">
              New to digital planning? Here is a gentle introduction to setting up your first workspace without the overwhelm.
            </p>
            <span className="inline-flex items-center text-sm font-bold text-primary-text border-b-2 border-life-accent/30 pb-1 group-hover:border-life-accent transition-all">
              Read Guide <ArrowRight className="ml-2 w-4 h-4" />
            </span>
          </article>

          {/* ARTICLE CARD 2 */}
          <article className="group bg-white rounded-card p-8 shadow-sm hover:shadow-md transition-all border border-transparent hover:border-life-accent/40">
            <div className="text-life-accent mb-4">
              <Coffee className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold font-sans text-primary-text mb-3 group-hover:text-life-accent transition-colors">
              Building a Calm Routine
            </h2>
            <p className="font-serif text-primary-text/70 mb-6 leading-relaxed">
              How to use Kynar tools to create moments of pause in a busy day. Less grinding, more living.
            </p>
            <span className="inline-flex items-center text-sm font-bold text-primary-text border-b-2 border-life-accent/30 pb-1 group-hover:border-life-accent transition-all">
              Read Guide <ArrowRight className="ml-2 w-4 h-4" />
            </span>
          </article>

        </div>
      </section>

      {/* 3. SUB-SECTION: HELP & SUPPORT */}
      <section className="max-w-3xl mx-auto px-4 text-center py-12 border-t border-life-accent/10">
        <h3 className="text-2xl font-bold font-sans text-primary-text mb-4">Need help with a purchase?</h3>
        <p className="font-serif text-primary-text/80 mb-8">
          Our support guides answer common questions about downloads, formats, and setup.
        </p>
        <Link 
          href="/help" 
          className="inline-block px-8 py-3 bg-white border border-primary-text/10 rounded-btn font-medium hover:bg-gray-50 transition-colors"
        >
          Visit Help Center
        </Link>
      </section>

    </main>
  );
}
