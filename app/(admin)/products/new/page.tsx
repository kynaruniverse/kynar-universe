'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function NewProductPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    slug: '',
    world: 'home',
    price_gbp: '',
    format_label: '',
    description: '',
    lemon_squeezy_variant_id: '',
    is_published: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('products')
      .insert([{
        ...form,
        price_gbp: parseFloat(form.price_gbp),
      }]);

    if (error) {
      alert(error.message);
    } else {
      router.push('/admin/products');
      router.refresh();
    }
    setLoading(false);
  };

  const inputStyle = "w-full px-4 py-3 rounded-xl border border-kyn-slate-500/10 bg-white text-kyn-green-700 focus:ring-2 focus:ring-kyn-green-500/20 outline-none transition-all";
  const labelStyle = "text-[10px] uppercase tracking-widest font-bold text-kyn-slate-400 mb-1 block ml-1";

  return (
    <div className="max-w-xl mx-auto pb-20">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold text-kyn-green-700">New Product</h1>
        <p className="text-sm text-kyn-slate-500">Add a new asset to the Kynar Universe.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className={labelStyle}>Product Title</label>
            <input 
              type="text" required value={form.title} className={inputStyle}
              onChange={e => setForm({...form, title: e.target.value})}
              placeholder="e.g. Kynar Home v1"
            />
          </div>

          <div>
            <label className={labelStyle}>Slug (URL path)</label>
            <input 
              type="text" required value={form.slug} className={inputStyle}
              onChange={e => setForm({...form, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
              placeholder="kynar-home-v1"
            />
          </div>
        </div>

        {/* Categorization & Pricing */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelStyle}>World</label>
            <select 
              value={form.world} className={inputStyle}
              onChange={e => setForm({...form, world: e.target.value})}
            >
              <option value="home">Home</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="tools">Tools</option>
            </select>
          </div>
          <div>
            <label className={labelStyle}>Price (GBP)</label>
            <input 
              type="number" step="0.01" required value={form.price_gbp} className={inputStyle}
              onChange={e => setForm({...form, price_gbp: e.target.value})}
              placeholder="15.00"
            />
          </div>
        </div>

        {/* Description & Metadata */}
        <div>
          <label className={labelStyle}>Format Label</label>
          <input 
            type="text" required value={form.format_label} className={inputStyle}
            onChange={e => setForm({...form, format_label: e.target.value})}
            placeholder="e.g. Mobile PDF + Notion Template"
          />
        </div>

        <div>
          <label className={labelStyle}>Description</label>
          <textarea 
            rows={4} value={form.description} className={inputStyle}
            onChange={e => setForm({...form, description: e.target.value})}
            placeholder="The 'Why' behind this tool..."
          />
        </div>

        {/* Payment Integration */}
        <div className="p-6 rounded-[24px] bg-kyn-green-500/5 border border-kyn-green-500/10">
          <label className={labelStyle}>Lemon Squeezy Variant ID</label>
          <input 
            type="text" value={form.lemon_squeezy_variant_id} className={inputStyle}
            onChange={e => setForm({...form, lemon_squeezy_variant_id: e.target.value})}
            placeholder="123456"
          />
          <p className="text-[10px] text-kyn-green-700/60 mt-2 italic">Connects the purchase to your payment gateway.</p>
        </div>

        {/* Status Toggle */}
        <div className="flex items-center gap-3 px-1">
          <input 
            type="checkbox" id="published"
            checked={form.is_published}
            onChange={e => setForm({...form, is_published: e.target.checked})}
            className="w-5 h-5 rounded border-kyn-slate-300 text-kyn-green-700 focus:ring-kyn-green-500"
          />
          <label htmlFor="published" className="text-sm font-medium text-kyn-slate-700">
            Publish to Universe immediately
          </label>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-kyn-green-700 text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest active:scale-[0.98] transition-all disabled:opacity-50 shadow-xl shadow-kyn-green-700/10"
        >
          {loading ? 'Manifesting...' : 'Create Product'}
        </button>

      </form>
    </div>
  );
}
