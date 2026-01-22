import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import ProductActions from '@/components/ProductActions';
import type { Product } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> })

async function getProduct(slug: string) {
  const { data } = await supabase
    .from('products')
    .select('id, title, slug, description, price_id, world, tags, file_types, preview_image, content_url')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();
  
  return data as Product | null;
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  import { WORLD_CONFIG } from '@/lib/constants';

    const worldConfig = WORLD_CONFIG[product.world];
    const accentColor = `${worldConfig.colorClasses.text} ${worldConfig.colorClasses.bg}`;

  return (
    <div className="px-4 py-6 pb-24 space-y-8">
      {/* Breadcrumbs */}
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
        
        {/* Product Preview */}
        <div className="aspect-video bg-kyn-slate-100 dark:bg-kyn-slate-800 rounded-xl flex items-center justify-center text-kyn-slate-400" role="img" aria-label={`Preview of ${product.title}`}>
           {product.preview_image ? (
             <img 
               src={product.preview_image} 
               alt={`${product.title} preview`}
               className="w-full h-full object-cover rounded-xl"
             />
           ) : (
             <span className="text-sm">Product Preview Image</span>
           )}
        </div>

        {/* Dynamic Actions [Updated] */}
        <ProductActions checkoutUrl={product.price_id} price="£5.00" />
      </section>
      
      {/* Description / Content */}
      <section className="space-y-4 pt-6">
         <h2 className="font-bold text-lg">About this Product</h2>
         <p className="text-kyn-slate-600 dark:text-kyn-slate-300">{product.description}</p>
      </section>
    </div>
  );
}
