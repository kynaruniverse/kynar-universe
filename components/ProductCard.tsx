import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  title: string;
  category: string;
  price: number;
  summary: string;
  slug: string;
  image?: string;
}

export default function ProductCard({ title, category, price, summary, slug, image }: ProductCardProps) {
  const isTools = category === 'Tools';
  const isLife = category === 'Life';
  
  const accentColor = isTools ? 'text-tools-accent' : isLife ? 'text-life-accent' : 'text-cat-home-accent';
  const bgSurface = isTools ? 'bg-tools-surface' : isLife ? 'bg-life-surface' : 'bg-cat-home-surface';

  return (
    <div className={`group relative flex flex-col h-full ${bgSurface} rounded-card p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}>
      {/* IMAGE AREA */}
      <div className="w-full aspect-video mb-4 overflow-hidden rounded-md bg-gray-100 relative">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className={`w-full h-full flex items-center justify-center opacity-30 ${category === 'Tools' ? 'bg-tools-accent' : category === 'Life' ? 'bg-life-accent' : 'bg-cat-home-accent'}`}>
             <span className="font-serif italic text-primary-text/50">Kynar Universe</span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <span className={`text-xs font-bold tracking-wider uppercase ${accentColor} border border-current px-2 py-1 rounded-sm`}>
          {category}
        </span>
      </div>

      <h3 className="text-xl font-bold font-sans text-primary-text mb-2 group-hover:text-opacity-80">{title}</h3>
      <p className="font-serif text-primary-text/70 text-sm leading-relaxed mb-6 flex-grow line-clamp-2">{summary}</p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5">
        <span className="text-lg font-bold font-sans text-primary-text">£{price}</span>
        <Link href={`/marketplace/${slug}`} className="inline-flex items-center text-sm font-medium text-primary-text hover:opacity-70 transition-opacity">
          Choose <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
