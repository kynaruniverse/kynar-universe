import Link from "next/link";

export default function UniverseGate() {
  const worlds = [
    { 
      name: "Home", 
      slug: "home", 
      color: "bg-kyn-green-500", 
      desc: "Order in your physical space" 
    },
    { 
      name: "Lifestyle", 
      slug: "lifestyle", 
      color: "bg-kyn-caramel-500", 
      desc: "Mindful daily routines" 
    },
    { 
      name: "Tools", 
      slug: "tools", 
      color: "bg-kyn-slate-500", // Corrected from Blue to Slate
      desc: "Clarity for your projects" 
    },
  ];

  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center px-gutter text-center py-section">
      {/* Brand Header - Design System Section 4 */}
      <h1 className="font-brand text-5xl font-bold tracking-tight text-kyn-slate-900 md:text-7xl lg:text-8xl">
        Kynar Universe
      </h1>
      
      <p className="mt-6 max-w-md text-lg md:text-xl text-text-secondary font-ui leading-relaxed">
        A calm digital ecosystem for useful tools that help you organise, reflect, and create.
      </p>

      {/* World Selection Grid - UX Canon Section 3 */}
      <div className="mt-16 grid w-full max-w-4xl gap-inner md:grid-cols-3">
        {worlds.map((world) => (
          <Link 
            key={world.slug} 
            href={`/${world.slug}`}
            className="kynar-card group flex flex-col items-start text-left calm-transition hover:border-kyn-green-400/50"
          >
            {/* World Indicator */}
            <div className={`h-1.5 w-10 rounded-full ${world.color} mb-6`} />
            
            <h3 className="font-brand text-2xl font-semibold text-kyn-slate-900">
              {world.name}
            </h3>
            
            <p className="mt-3 text-sm text-text-secondary font-ui leading-snug">
              {world.desc}
            </p>
            
            <span className="mt-6 text-xs font-medium text-kyn-slate-400 opacity-0 group-hover:opacity-100 calm-transition">
              Explore World →
            </span>
          </Link>
        ))}
      </div>

      {/* Secondary Action - Business Reference Section 12 */}
      <Link 
        href="/store" 
        className="mt-16 text-sm font-medium text-text-secondary hover:text-kyn-green-600 underline underline-offset-8 calm-transition"
      >
        Browse the Marketplace
      </Link>
    </div>
  );
}
