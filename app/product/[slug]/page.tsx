import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, FileText, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ProductActions from '@/components/ProductActions'; // <-- Import

export const dynamic = 'force-dynamic';

interface Product {
  id: string;
  title: string;
  description: string;
  price_id: string; // This now holds the Checkout URL
  world: 'Home' | 'Lifestyle' | 'Tools';
  tags: string[];
  file_types: string[];
}

async function getProduct(slug: string) {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();
    
  return data as Product | null;
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  // World-specific styling (Simplified for brevity)
  const accentColor = 
    product.world === 'Home' ? 'text-kyn-green-600 bg-kyn-green-50 dark:bg-kyn-green-900/20' :
    product.world === 'Lifestyle' ? 'text-kyn-caramel-600 bg-kyn-caramel-50 dark:bg-kyn-caramel-900/20' :
    'text-kyn-slate-600 bg-kyn-slate-50 dark:bg-kyn-slate-800/50';

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
        
        {/* Placeholder Preview */}
        <div className="aspect-video bg-kyn-slate-100 dark:bg-kyn-slate-800 rounded-xl flex items-center justify-center text-kyn-slate-400">
           <span className="text-sm">Product Preview Image</span>
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
