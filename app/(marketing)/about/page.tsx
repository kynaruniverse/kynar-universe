import Article from '@/components/ui/Article';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-12 pb-24 animate-in fade-in duration-1000">
      
      {/* 1. The Core Stance */}
      <header className="pt-8">
        <h1 className="text-[10px] uppercase tracking-[0.3em] text-kyn-caramel-500 font-bold mb-4">
          Our Philosophy
        </h1>
        <h2 className="text-4xl font-semibold text-kyn-green-700 leading-tight">
          Systems for a <br />
          <span className="italic">quieter</span> digital life.
        </h2>
      </header>

      {/* 2. The Narrative */}
      <Article>
        <p className="text-xl text-kyn-slate-500 leading-relaxed font-light mb-12">
          Modern life is noisy by design. We are constantly prodded by streaks, 
          notifications, and subscriptions that demand our attention. 
          Kynar Universe was built to be the opposite.
        </p>

        <section className="space-y-8">
          <div>
            <h3 className="text-lg font-bold text-kyn-green-700 mb-2">Calm over Speed</h3>
            <p>
              We don't build "productivity engines." We build grounding points. 
              Our tools are designed to help you organize what matters so you can 
              spend less time managing your life and more time living it.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-kyn-green-700 mb-2">Ownership over Ranting</h3>
            <p>
              The era of "software as a service" has made us renters of our own data. 
              At Kynar, you buy a tool once, and it is yours forever. No monthly 
              fees, no price hikes, no expiring access.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-kyn-green-700 mb-2">UK-Born, Globally Minded</h3>
            <p>
              Based in the United Kingdom, we value transparency, quality craft, 
              and plain English. We believe that digital tools should be as 
              reliable and tactile as a well-made physical notebook.
            </p>
          </div>
        </section>
      </Article>

      {/* 3. The Visual Break: The "Universe Gate" Motif */}
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-kyn-slate-500/20 to-transparent my-4">
        <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 rounded-full bg-kyn-mist border border-kyn-slate-500/30" />
      </div>

      {/* 4. The Human Element / CTA */}
      <section className="bg-white border border-kyn-slate-500/5 rounded-[32px] p-8 space-y-6">
        <h3 className="text-xs uppercase tracking-widest font-bold text-kyn-slate-500">The V1 Promise</h3>
        <p className="text-sm text-kyn-slate-700 leading-relaxed">
          Kynar Universe is starting small. We are launching with <strong>Kynar Home</strong>—one 
          flagship system to prove that digital organization can be peaceful. 
          As the universe expands, our commitment to calm remains the North Star.
        </p>
        
        <Link 
          href="/"
          className="block w-full text-center py-4 rounded-2xl bg-kyn-mist text-kyn-green-700 font-bold text-sm uppercase tracking-widest active:scale-[0.98] transition-all"
        >
          Return to Gate
        </Link>
      </section>

    </div>
  );
}
