import WorldCard from '@/components/ui/WorldCard';

export default function HomePage() {
  const worlds = [
    {
      title: "Home",
      description: "Practical solutions to make everyday life feel less chaotic.",
      slug: "home",
      accentColor: "bg-kyn-green-500",
      motif: "Base"
    },
    {
      title: "Lifestyle",
      description: "Systems designed for better habits and automatic progress.",
      slug: "lifestyle",
      accentColor: "bg-kyn-caramel-500",
      motif: "Sun"
    },
    {
      title: "Tools",
      description: "Muted, powerful assets that accelerate your creative projects.",
      slug: "tools",
      accentColor: "bg-kyn-slate-500",
      motif: "Grid"
    }
  ];

  return (
    <div className="flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* Hero Section (Existing) */}
      <section className="pt-12 pb-4">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-1 rounded-full bg-kyn-green-500 animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-kyn-slate-500 font-medium">The Universe Gate</span>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight leading-[1.1] text-kyn-green-700 mb-6">
          One calm place to <br />
          <span className="text-kyn-caramel-500 italic">organise</span> modern life.
        </h1>
        <p className="text-lg text-kyn-slate-500 leading-relaxed max-w-[90%]">
          Thoughtfully designed digital tools. No noise, no pressure—just clarity.
        </p>
      </section>

      {/* Three Worlds Showcase */}
      <section className="flex flex-col gap-6 pb-20">
        <div className="flex flex-col gap-2 mb-2">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-kyn-slate-500">Pick a World</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {worlds.map((world) => (
            <WorldCard key={world.slug} {...world} />
          ))}
        </div>
      </section>

    </div>
  );
}
