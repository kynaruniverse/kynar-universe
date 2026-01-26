import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, FileCode, CheckCircle2, Sparkles } from 'lucide-react';

import { WORLD_CONFIG } from '@/shared/constants/worlds';
import { getProductBySlug } from '@/features/products/services/products.server';
import { createClient } from '@/lib/supabase/server'; // Updated to your verified path
import BuyButton from '@/features/products/components/BuyButton';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = params;
    const product = await getProductBySlug(slug);
  
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: `${product.title} | Kynar Universe`,
    description: product.short_description,
    openGraph: {
      images: product.preview_image ? [product.preview_image] : [],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
    const { slug } = params;
  
  // 1. Initialize Supabase
  const supabase = await createClient();

  // 2. Parallel Fetch: Get product and user at the same time
  const [product, { data: authData }] = await Promise.all([
    getProductBySlug(slug),
    supabase.auth.getUser(),
  ]);

  if (!product) notFound();

  const user = authData?.user;
  const worldInfo = WORLD_CONFIG[product.world as keyof typeof WORLD_CONFIG];
  const theme = worldInfo?.colorClasses;

  return (
    <div className="min-h-screen pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 1. Breadcrumbs */}
      <nav className="px-4 py-6 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-kyn-slate-400">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight size={10} strokeWidth={3} />
        <Link 
          href={`/store?world=${product.world.toLowerCase()}`} 
          className="hover:text-primary transition-colors"
        >
          {product.world}
        </Link>
        <ChevronRight size={10} strokeWidth={3} />
        <span className="text-kyn-green-600 dark:text-kyn-green-400 font-black truncate max-w-[120px]">
          {product.title}
        </span>
      </nav>

      {/* 2. Hero Media */}
      <section className="px-4 mb-10">
        <div className="aspect-[4/3] relative rounded-[2.5rem] overflow-hidden bg-surface border border-kyn-slate-100 dark:border-kyn-slate-800 shadow-2xl shadow-kyn-slate-200/50 dark:shadow-none">
          {product.preview_image ? (
            <Image 
              src={product.preview_image} 
              alt={product.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YwZjBmMCIvPjwvc3ZnPg=="
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-kyn-slate-200 bg-kyn-slate-50 dark:bg-kyn-slate-900/50">
              <FileCode size={48} strokeWidth={1} />
              <span className="text-[10px] font-black mt-4 uppercase tracking-widest opacity-50">Blueprint Pending</span>
            </div>
          )}
        </div>
      </section>

      {/* 3. Product Info */}
      <section className="px-6 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className={`
              px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.15em] text-white shadow-sm
              ${theme.badge}
            `}>
              {product.world}
            </span>
            <span className="text-[9px] font-black text-kyn-slate-300 dark:text-kyn-slate-600 uppercase tracking-[0.2em]">
              {product.category || 'Digital Asset'}
            </span>
          </div>
          
          <h1 className="text-4xl font-black text-primary leading-[1.05] tracking-tight italic">
            {product.title}
          </h1>
          <p className="text-sm text-kyn-slate-500 dark:text-kyn-slate-400 leading-relaxed font-medium">
            {product.short_description}
          </p>
        </div>

        {/* Action Button Area */}
        <div className="flex flex-col gap-4 pt-2">
          <BuyButton 
            variantId={product.price_id} 
            userId={user?.id}
            className="w-full py-5 text-sm"
          />
          <div className="flex items-center justify-center gap-4">
             <span className="h-[1px] flex-grow bg-kyn-slate-100 dark:bg-kyn-slate-800"></span>
             <p className="text-[9px] font-black text-kyn-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
               Instant Access
             </p>
             <span className="h-[1px] flex-grow bg-kyn-slate-100 dark:bg-kyn-slate-800"></span>
          </div>
        </div>

        {/* Quick Specs Grid */}
        {product.file_types && product.file_types.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {product.file_types.map((type) => (
              <div key={type} className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-surface border border-kyn-slate-50 dark:border-kyn-slate-800/50">
                <CheckCircle2 size={12} className="text-kyn-green-500" />
                <span className="text-[10px] font-black text-primary uppercase tracking-wider">{type}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Detailed Content */}
      <section className="px-6 pt-12 mt-12 border-t border-kyn-slate-100 dark:border-kyn-slate-800/50">
         <div className="flex items-center gap-2 mb-8">
           <Sparkles size={16} className="text-kyn-caramel-500 animate-pulse" />
           <h2 className="text-xs font-black uppercase tracking-[0.3em] text-kyn-slate-400">
             Technical Specs
           </h2>
         </div>
         <div className="prose prose-sm dark:prose-invert max-w-none">
           <div className="whitespace-pre-wrap leading-relaxed text-kyn-slate-600 dark:text-kyn-slate-300 text-[13px] font-medium italic opacity-80">
             {product.description || "Transmitting detailed intelligence for this asset..."}
           </div>
         </div>
      </section>

    </div>
  );
}
