import Link from 'next/link';
import { Download } from 'lucide-react';

// Section 5.5 Product Card Specs
interface ProductCardProps {
  title: string;
  category: 'Tools' | 'Life' | 'Home';
  price: string;
  summary: string;
  image: string; // We will use placeholders for now
  slug: string;
}

export default function ProductCard({ title, category, price, summary, slug }: ProductCardProps) {
  
  // Section 5.1 Color Mapping
  const categoryColors = {
    Tools: 'bg-tools-base text-tools-accent',
    Life: 'bg-life-base text-life-accent',
    Home: 'bg-home-surface text-home-accent',
  };

  return (
    <div className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
      
      {/* 16:9 Image Placeholder */}
      <div className={`h-48 w-full ${categoryColors[category]} flex items-center justify-center`}>
        <span className="font-bold opacity-20 text-2xl">{category}</span>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        {/* Category Badge */}
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
          {category}
        </span>

        {/* Title */}
        <h3 className="text-lg font-bold text-home-text mb-2 group-hover:text-signal-cyan transition-colors">
          {title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-gray-500 font-serif line-clamp-2 mb-4 flex-grow">
          {summary}
        </p>

        {/* Footer: Price + Button */}
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
          <span className="font-bold text-lg text-home-text">£{price}</span>
          
          <Link href={`/marketplace/product/${slug}`}>
            <button className="bg-home-text text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-signal-cyan transition-colors">
              Choose
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
