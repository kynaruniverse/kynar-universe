import { notFound } from 'next/navigation';
import { supabase } from '../../../lib/supabase'; // Corrects the path depth
import Link from 'next/link';
import { ArrowLeft, Check, ShieldCheck, Zap } from 'lucide-react';
import AddToCartButton from '../../../components/AddToCartButton'; // Import your actual cart button

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

  // 3. Determine Theme Colors based on the product's category
  const isTools = product.category === 'Tools';
  const isLife = product.category === 'Life';
  
  // Default to Home if not Tools/Life
  const themeClass = isTools ? 'bg-tools-base' : isLife ? 'bg-life-base' : 'bg-cat-home-base';
  const accentText = isTools ? 'text-tools-accent' : isLife ? 'text-life-accent' : 'text-cat-home-accent';

  return (
    <main className={`min-h-screen ${themeClass} pb-24 transition-colors duration-700`}>
      
      {/* HEADER / BACK BUTTON */}
      <div className="max-w-7xl mx-auto px-4 pt-8 mb-8">
        <nav className="flex items-center space-x-2 text-sm font-sans text-primary-text/50 mb-4">
          <Link href="/" className="hover:text-primary-text transition-colors">Home</Link>
          <span className="text-primary-text/30">&gt;</span>
          <Link href="/marketplace" className="hover:text-primary-text transition-colors">Marketplace</Link>
          <span className="text-primary-text/30">&gt;</span>
          <span className="text-primary-text font-medium">{product.category}</span>
        </nav>
        
        <Link href="/marketplace" className="inline-flex items-center text-sm font-bold text-primary-text/60 hover:text-primary-text transition-colors">
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
              <div className={`w-full h-full flex items-center justify-center bg-gray-50 text-primary-text/20 font-bold text-xl`}>
                {product.title}
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
          <div className="mb-10">
             {/* This connects to your Context/Cart system */}
             <AddToCartButton product={product} />
             
             <p className="mt-4 text-center text-xs text-primary-text/40 flex items-center justify-center">
              <ShieldCheck className="w-3 h-3 mr-1" /> Secure checkout via Kynar Universe
            </p>
          </div>

          {/* DESCRIPTION */}
          <div className="prose prose-lg text-primary-text/80 font-serif">
            <h3 className="font-sans font-bold text-xl mb-4 text-primary-text">Overview</h3>
            <p className="whitespace-pre-wrap leading-relaxed">
              {product.description || product.summary}
            </p>
            
            <div className="mt-8 p-6 bg-white rounded-card border border-black/5 not-prose">
              <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-primary-text/40 mb-4">Included in download</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-primary-text">
                  <Check className={`w-5 h-5 ${accentText} mr-3`} />
                  <span className="font-medium">Main Product File ({product.format || 'PDF'})</span>
                </li>
                <li className="flex items-center text-primary-text">
                  <Check className={`w-5 h-5 ${accentText} mr-3`} />
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
