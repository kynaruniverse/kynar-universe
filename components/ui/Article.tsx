'use client';

export default function Article({ children }: { children: React.ReactNode }) {
  return (
    <article className="prose prose-slate max-w-none 
      prose-headings:text-kyn-green-700 prose-headings:font-semibold 
      prose-p:text-kyn-slate-700 prose-p:leading-relaxed prose-p:mb-6
      prose-strong:text-kyn-green-700 prose-strong:font-bold
      prose-li:text-kyn-slate-700 prose-li:mb-2
      animate-in fade-in duration-1000">
      {children}
    </article>
  );
}
