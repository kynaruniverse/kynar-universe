import Link from 'next/link';
import { notFound } from 'next/navigation';

interface WorldContent {
  title: string;
  description: string;
  accent: string;
  text: string;
  quote: string;
}

const WORLDS: Record<string, WorldContent> = {
  home: {
    title: 'The Home World',
    description: 'A sanctuary for your household. Manage your space, your admin, and your family rhythms with absolute clarity.',
    accent: 'bg-kyn-green-500',
    text: 'text-kyn-green-700',
    quote: 'Peace begins at the threshold.'
  },
  lifestyle: {
    title: 'The Lifestyle World',
    description: 'Intentional habits and quiet rituals. Tools designed to help you slow down and find your natural rhythm.',
    accent: 'bg-kyn-caramel-500',
    text: 'text-kyn-caramel-700',
    quote: 'The way we spend our days is the way we live our lives.'
  },
  tools: {
    title: 'The Tools World',
    description: 'Precision instruments for the digital craftsman. Minimalist assets for focus, creativity, and deep work.',
    accent: 'bg-kyn-slate-500',
    text: 'text-kyn-slate-700',
    quote: 'Simplicity is the ultimate sophistication.'
  }
};

export default function WorldPage({ params }: { params: { world: string } }) {
  const content = WORLDS[params.world];

  if (!content) return notFound();

  return (
    <div className="flex flex-col min-h-[80vh] px-6 pt-12 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* 1. Visual Anchor */}
      <div className={`w-16 h-1 rounded-full ${content.accent} mb-8`} />

      {/* 2. World Narrative */}
      <header className="space-y-6 mb-12">
        <h1 className={`text-5xl font-semibold leading-tight tracking-tight ${content.text}`}>
          {content.title}
        </h1>
        <p className="text-xl text-kyn-slate-500 font-light leading-relaxed max-w-sm">
          {content.description}
        </p>
      </header>

      {/* 3. Emotional Quote */}
      <section className="py-12 border-y border-kyn-slate-500/10 mb-12">
        <p className="text-2xl font-serif italic text-kyn-slate-700 leading-snug">
          "{content.quote}"
        </p>
      </section>

      {/* 4. Action Handrail */}
      <div className="mt-auto space-y-4">
        <p className="text-[10px] uppercase tracking-[0.3em] text-kyn-slate-400 font-bold">
          Available Assets
        </p>
        <Link 
          href={`/?filter=${params.world}`}
          className={`block w-full text-center py-5 rounded-2xl text-white font-bold text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all ${content.accent}`}
        >
          Explore {params.world} Tools
        </Link>
        <Link 
          href="/" 
          className="block w-full text-center py-2 text-[10px] uppercase tracking-widest text-kyn-slate-400 font-medium"
        >
          Return to Universe
        </Link>
      </div>
    </div>
  );
}
