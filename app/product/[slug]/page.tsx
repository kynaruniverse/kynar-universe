import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, FileText, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// 1. Force dynamic rendering so we always get fresh data
export const dynamic = 'force-dynamic';

interface Product {
  id: string;
  title: string;
  description: string;
  price_id: string;
  world: 'Home' | 'Lifestyle' | 'Tools';
  tags: string[];
  file_types: string[];
}

// 2. Fetch specific product
async function getProduct(slug: string) {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();
    
  return data as Product | null;
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await params for Next.js 15+
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // World-specific color logic
  const accentColor = 
    product.world === 'Home' ? 'text-kyn-green-600 bg-kyn-green-50 dark:bg-kyn-green-900/20' :
    product.world === 'Lifestyle' ? 'text-kyn-caramel-600 bg-kyn-caramel-50 dark:bg-kyn-caramel-900/20' :
    'text-kyn-slate-600 bg-kyn-slate-50 dark:bg-kyn-slate-800/50';

  const btnColor =
    product.world === 'Home' ? 'bg-kyn-green-600 hover:bg-kyn-green-700' :
    product.world === 'Lifestyle' ? 'bg-kyn-caramel-500 hover:bg-kyn-caramel-600' :
    'bg-kyn-slate-600 hover:bg-kyn-slate-700';

  return (
    <div className="px-4 py-6 pb-24 space-y-8">
      
      {/* Breadcrumbs [UX Guide 1.4] */}
      <nav className="text-sm text-kyn-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-kyn-green-600">Home</Link>
        <span>/</span>
        <Link href={`/store?world=${product.world.toLowerCase()}`} className="hover:text-kyn-green-600">{product.world}</Link>
        <span>/</span>
        <span className="text-kyn-slate-900 dark:text-white font-medium truncate">{product.title}</span>
      </nav>

      {/* Hero Section */}
      <section className="space-y-4">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${accentColor}`}>
          {product.world}
        </span>
        <h1 className="text-3xl font-bold text-kyn-slate-900 dark:text-white leading-tight">
          {product.title}
        </h1>
        
        {/* Placeholder for Preview Gallery [UX Guide 3.1] */}
        <div className="aspect-video bg-kyn-slate-100 dark:bg-kyn-slate-800 rounded-xl flex items-center justify-center text-kyn-slate-400">
          <span className="text-sm">Product Preview Image</span>
        </div>

        {/* Primary Actions [UX Guide 3.2] */}
        <div className="flex gap-3 pt-2">
          <button className={`flex-1 py-3.5 rounded-xl font-semibold text-white shadow-sm transition-colors ${btnColor}`}>
            Buy Now
          </button>
          {/* Cart button deferred to Phase 3 */}
          <button className="px-4 py-3.5 rounded-xl font-semibold text-kyn-slate-700 dark:text-kyn-slate-200 border border-kyn-slate-200 dark:border-kyn-slate-700 hover:bg-kyn-slate-50 dark:hover:bg-kyn-slate-800">
            Add to Cart
          </button>
        </div>
      </section>

      {/* "What's Included" [UX Guide 3.1] */}
      <section className="space-y-4 pt-6 border-t border-kyn-slate-200 dark:border-kyn-slate-800">
        <h2 className="font-bold text-lg">What's Included</h2>
        <div className="grid grid-cols-2 gap-3">
          {product.file_types?.map((type) => (
            <div key={type} className="flex items-center gap-2 p-3 rounded-lg bg-white dark:bg-kyn-slate-800 border border-kyn-slate-100 dark:border-kyn-slate-700">
              <FileText size={18} className="text-kyn-slate-400" />
              <span className="text-sm font-medium">{type}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-white dark:bg-kyn-slate-800 border border-kyn-slate-100 dark:border-kyn-slate-700">
            <ShieldCheck size={18} className="text-kyn-green-500" />
            <span className="text-sm font-medium">Lifetime Access</span>
          </div>
        </div>
      </section>

      {/* Description / "Who It's For" */}
      <section className="space-y-4">
        <h2 className="font-bold text-lg">About this Product</h2>
        <p className="text-kyn-slate-600 dark:text-kyn-slate-300 leading-relaxed">
          {product.description || "No description available."}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {product.tags?.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-md text-xs font-medium bg-kyn-slate-100 dark:bg-kyn-slate-800 text-kyn-slate-600 dark:text-kyn-slate-300">
              #{tag}
            </span>
          ))}
        </div>
      </section>
      
    </div>
  );
}
