import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, FileText, Download } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

// Force dynamic so we always get the latest price/details
export const revalidate = 0;

export default async function ProductPage({ params }: { params: { slug: string } }) {
  
  // 1. Fetch the specific product matching the URL slug
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', params.slug)
    .single();

  // 2. If no product found, show 404
  if (error || !product) {
    notFound();
  }

  // Determine colors based on category
  const isTools = product.category === 'Tools';
  const isLife = product.category === 'Life';
  const accentColor = isTools ? 'text-tools-accent' : isLife ? 'text-life-accent' : 'text-cat-home-accent';
  const bgAccent = isTools ? 'bg-tools-accent' : isLife ? 'bg-life-accent' : 'bg-cat-home-accent';

  return (
    <main className="min-h-screen bg-home-surface pb-24">
      
      {/* NAVIGATION HEADER */}
      <div className="max-w-4xl mx-auto px-4 pt-8 mb-8">
        <Link href="/marketplace" className="inline-flex items-center text-primary-text/60 hover:text-primary-text transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Marketplace
        </Link>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* LEFT COLUMN: Image & Quick Info */}
        <div className="space-y-8">
          {/* Placeholder Image (Gray Box for now) */}
          <div className="aspect-video bg-gray-100 rounded-card flex items-center justify-center text-gray-400">
            <span className="font-serif italic">Product Image</span>
          </div>

          <div className="bg-white p-6 rounded-card border border-gray-100 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 opacity-50" /> What's Included
            </h3>
            <ul className="space-y-3">
              {/* Hardcoded for now - we will make this dynamic later */}
              <li className="flex items-start text-sm text-primary-text/80">
                <Check className={`w-4 h-4 mr-2 mt-0.5 ${accentColor}`} />
                Digital Download (ZIP)
              </li>
              <li className="flex items-start text-sm text-primary-text/80">
                <Check className={`w-4 h-4 mr-2 mt-0.5 ${accentColor}`} />
                Instant Access
              </li>
              <li className="flex items-start text-sm text-primary-text/80">
                <Check className={`w-4 h-4 mr-2 mt-0.5 ${accentColor}`} />
                Lifetime Updates
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: Product Details */}
        <div className="flex flex-col h-full">
          
          {/* Category Badge */}
          <div className="mb-4">
            <span className={`text-xs font-bold tracking-wider uppercase ${accentColor} border border-current px-2 py-1 rounded-sm`}>
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold font-sans text-primary-text mb-4 leading-tight">
            {product.title}
          </h1>

          {/* Price */}
          <div className="text-3xl font-bold font-sans text-primary-text mb-6">
            £{product.price}
          </div>

          {/* Short Summary */}
          <p className="font-serif text-lg text-primary-text/80 italic mb-8 leading-relaxed">
            {product.summary}
          </p>

          {/* CTA Button */}
          <button className={`w-full py-4 ${bgAccent} text-white font-medium rounded-btn hover:opacity-90 transition-opacity mb-8 flex items-center justify-center`}>
            Choose This Tool <ArrowRight className="ml-2 w-5 h-5" />
          </button>

          {/* Long Description (Rich Text) */}
          <div className="prose prose-blue max-w-none text-primary-text/80">
            <h3 className="font-bold text-lg text-primary-text mb-2">About this tool</h3>
            <p className="whitespace-pre-wrap leading-relaxed">
              {/* If no description in DB, show fallback */}
              {product.description || "A detailed description will appear here."}
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
