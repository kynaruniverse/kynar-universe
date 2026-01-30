'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function EditProductForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialData);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('products')
      .update({
        ...form,
        price_gbp: parseFloat(form.price_gbp),
      })
      .eq('id', initialData.id);

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
    <form onSubmit={handleUpdate} className="space-y-6">
      <div>
        <label className={labelStyle}>Product Title</label>
        <input 
          type="text" required value={form.title} className={inputStyle}
          onChange={e => setForm({...form, title: e.target.value})}
        />
      </div>

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
          />
        </div>
      </div>

      <div>
        <label className={labelStyle}>Format Label</label>
        <input 
          type="text" required value={form.format_label} className={inputStyle}
          onChange={e => setForm({...form, format_label: e.target.value})}
        />
      </div>

      <div>
        <label className={labelStyle}>Description</label>
        <textarea 
          rows={4} value={form.description} className={inputStyle}
          onChange={e => setForm({...form, description: e.target.value})}
        />
      </div>

      <div className="p-6 rounded-[24px] bg-kyn-green-500/5 border border-kyn-green-500/10">
        <label className={labelStyle}>Lemon Squeezy Variant ID</label>
        <input 
          type="text" value={form.lemon_squeezy_variant_id} className={inputStyle}
          onChange={e => setForm({...form, lemon_squeezy_variant_id: e.target.value})}
        />
      </div>

      {/* The Publish Toggle */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-kyn-slate-500/10">
        <span className="text-sm font-medium text-kyn-slate-700">Publish Status</span>
        <button
          type="button"
          onClick={() => setForm({...form, is_published: !form.is_published})}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors outline-none ${
            form.is_published ? 'bg-kyn-green-700' : 'bg-kyn-slate-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              form.is_published ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 py-4 text-sm font-bold text-kyn-slate-400 uppercase tracking-widest"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-[2] bg-kyn-green-700 text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {loading ? 'Saving Changes...' : 'Update Product'}
        </button>
      </div>
    </form>
  );
}
