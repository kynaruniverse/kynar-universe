import { notFound } from 'next/navigation';
import { supabase } from '../../../lib/supabase'; 
import Link from 'next/link';
import { ArrowLeft, Check, ShieldCheck, Zap } from 'lucide-react';

// Force dynamic rendering so we always get the latest product details
export const revalidate = 0;

export default async function ProductPage({ params }: { params: { slug: string } }) {
  
  // 1. Fetch the specific product from Supabase
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', params.slug)
    .single();

  // 2. Handle missing products (404)
  if (error || !product) {
    notFound(); 
  }

  return (
    <main className="min-h-screen bg-home-base pb-24">
      
      {/* HEADER / BACK BUTTON */}
      <div className="max-w-7xl mx-auto px-4 pt-8 mb-8">
        <Link href="/marketplace" className="inline-flex items-center text-sm font-bold text-primary-text/60 hover:text-home-accent transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Marketplace
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* LEFT: IMAGE */}
        <div className="bg-white p-2 rounded-card border border-black/5 shadow-sm h-fit">
          <div className="aspect-video bg-gray-100 rounded-md overflow-hidden relative">
            {product.image ? (
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-50 text-primary-text/20 font-bold text-xl">
                No Image
              </div>
            )}
            {/* Category Badge */}
            <span className="absolute top-4 left-4 px-3 py-1 bg-black/80 text-white text-xs font-bold uppercase tracking-wider rounded-sm backdrop-blur-md">
              {product.category}
            </span>
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold font-sans text-primary-text mb-4 leading-tight">
            {product.title}
          </h1>
          
          <div className="flex items-center gap-4 mb-6 text-sm">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold flex items-center">
              <Zap className="w-3 h-3 mr-1" /> Instant Download
            </span>
            <span className="text-primary-text/60 font-serif italic">
              Digital License
            </span>
          </div>

          <div className="text-3xl font-bold text-primary-text mb-8">
            £{product.price}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col gap-4 mb-10">
            {/* NOTE: We will connect this to the Cart Context in the next step */}
            <button className="w-full py-4 bg-primary-text text-white font-bold rounded-btn hover:opacity-90 transition-all shadow-md text-lg">
              Add to Basket
            </button>
            <p className="text-center text-xs text-primary-text/40 flex items-center justify-center">
              <ShieldCheck className="w-3 h-3 mr-1" /> Secure checkout via Kynar Universe
            </p>
          </div>

          {/* DESCRIPTION */}
          <div className="prose prose-lg text-primary-text/80 font-serif">
            <h3 className="font-sans font-bold text-xl mb-4 text-primary-text">Overview</h3>
            <p className="whitespace-pre-wrap leading-relaxed">
              {product.description || product.summary}
            </p>
            
            {/* "What's Included" Box */}
            <div className="mt-8 p-6 bg-white rounded-card border border-black/5 not-prose">
              <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-primary-text/40 mb-4">Included in download</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-primary-text">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="font-medium">Main Product File ({product.format || 'PDF'})</span>
                </li>
                <li className="flex items-center text-primary-text">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="font-medium">Lifetime Updates</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
