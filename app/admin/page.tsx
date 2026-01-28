"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Plus, Package, X, Globe, Lock, Save, Loader2 } from 'lucide-react';

/**
 * AdminDashboard: The Universe Architect's Interface
 * Aligned with Brand Strategy 4.0: "Total control over the systems of order."
 */
export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    name: '', 
    price_gbp: '', 
    world: 'Home', 
    ls_variant_id: '', 
    hero_benefit: '',
    thumbnail_url: '',
    preview_url: ''
  });

  useEffect(() => {
    if (user) checkAdmin();
    else if (!authLoading) setFetching(false);
  }, [user, authLoading]);

  async function checkAdmin() {
    // Verify admin status against the private profiles table
    const { data } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user?.id)
      .single();
    
    if (data?.is_admin) {
      setIsAdmin(true);
      fetchProducts();
    } else {
      setFetching(false);
    }
  }

  async function fetchProducts() {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    setProducts(data || []);
    setFetching(false);
  }

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    
    // Auto-generate SEO Slug: "Visual Planner" -> "visual-planner"
    const slug = formData.name.toLowerCase().trim().replace(/\s+/g, '-');
    
    const { error } = await supabase.from('products').insert([{
      ...formData,
      slug,
      price_gbp: parseFloat(formData.price_gbp),
      is_active: true,
      category: 'Templates' 
    }]);

    if (!error) {
      setIsAdding(false);
      fetchProducts();
      setFormData({ 
        name: '', price_gbp: '', world: 'Home', ls_variant_id: '', 
        hero_benefit: '', thumbnail_url: '', preview_url: '' 
      });
    } else {
      console.error("Universe Manifest Error:", error.message);
    }
  }

  if (authLoading || fetching) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-kyn-canvas dark:bg-kyn-slate-900">
      <Loader2 className="animate-spin text-kyn-green-500 mb-4" size={24} />
      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-kyn-slate-400">
        Verifying Architect...
      </div>
    </div>
  );

  if (!isAdmin) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-kyn-canvas p-6 text-center">
      <div className="p-6 bg-white dark:bg-kyn-slate-800 rounded-[2.5rem] shadow-kyn-lift">
        <Lock className="text-kyn-slate-200 mb-4 mx-auto" size={48} />
        <h1 className="text-2xl font-black uppercase tracking-tighter">Vault Restricted</h1>
        <p className="text-[10px] font-medium text-kyn-slate-400 mt-2 uppercase tracking-widest">
          Only Universe Architects may enter here.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-kyn-canvas dark:bg-kyn-slate-950 p-6 pb-40 pt-24 md:pt-32">
      <header className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-kyn-slate-900 dark:text-white leading-none">Control</h1>
          <p className="text-[10px] font-black text-kyn-green-600 uppercase tracking-[0.25em] mt-2">Live Inventory Management</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all active:scale-95 ${
            isAdding ? 'bg-kyn-slate-200 text-kyn-slate-600' : 'bg-kyn-slate-900 dark:bg-white text-white dark:text-kyn-slate-900 shadow-kyn-lift'
          }`}
        >
          {isAdding ? <><X size={16} /> Close Form</> : <><Plus size={16} /> New Asset</>}
        </button>
      </header>

      <main className="max-w-4xl mx-auto">
        {isAdding && (
          <form onSubmit={handleAddProduct} className="kyn-card p-8 mb-16 animate-in fade-in slide-in-from-top-4 duration-500">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-kyn-slate-400 mb-8">Manifest New Product</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 md:col-span-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-kyn-slate-400 ml-2">Product Name</label>
                <input 
                  placeholder="Visual Planner v1" 
                  className="w-full p-5 rounded-2xl bg-kyn-canvas dark:bg-kyn-slate-800 border border-kyn-slate-100 dark:border-kyn-slate-700 outline-none font-bold dark:text-white" 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  required 
                />
              </div>
              
              <div className="space-y-4">
                <label className="text-[9px] font-black uppercase tracking-widest text-kyn-slate-400 ml-2">Investment (£)</label>
                <input 
                  type="number" 
                  placeholder="29" 
                  className="w-full p-5 rounded-2xl bg-kyn-canvas dark:bg-kyn-slate-800 border border-kyn-slate-100 dark:border-kyn-slate-700 outline-none font-bold dark:text-white" 
                  onChange={e => setFormData({...formData, price_gbp: e.target.value})} 
                  required 
                />
              </div>

              <div className="space-y-4">
                <label className="text-[9px] font-black uppercase tracking-widest text-kyn-slate-400 ml-2">Target World</label>
                <select 
                  className="w-full p-5 rounded-2xl bg-kyn-canvas dark:bg-kyn-slate-800 border border-kyn-slate-100 dark:border-kyn-slate-700 outline-none font-bold dark:text-white appearance-none" 
                  onChange={e => setFormData({...formData, world: e.target.value as any})}
                >
                  <option value="Home">Home World</option>
                  <option value="Lifestyle">Lifestyle World</option>
                  <option value="Tools">Tools World</option>
                </select>
              </div>

              <div className="space-y-4 md:col-span-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-kyn-slate-400 ml-2">Hero Benefit</label>
                <input 
                  placeholder="Organise your family schedules in one tap." 
                  className="w-full p-5 rounded-2xl bg-kyn-canvas dark:bg-kyn-slate-800 border border-kyn-slate-100 dark:border-kyn-slate-700 outline-none font-bold dark:text-white" 
                  onChange={e => setFormData({...formData, hero_benefit: e.target.value})} 
                />
              </div>

              <div className="space-y-4 md:col-span-2 border-t border-kyn-slate-50 dark:border-kyn-slate-800 pt-6 mt-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-kyn-green-600 ml-2">LS Variant ID (Deployment Key)</label>
                <input 
                  placeholder="456789" 
                  className="w-full p-5 rounded-2xl bg-kyn-green-50/30 dark:bg-kyn-green-900/10 border border-kyn-green-100 dark:border-kyn-green-800 outline-none font-bold dark:text-white" 
                  onChange={e => setFormData({...formData, ls_variant_id: e.target.value})} 
                  required 
                />
              </div>
            </div>
            
            <button type="submit" className="w-full bg-kyn-slate-900 dark:bg-white text-white dark:text-kyn-slate-900 py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] mt-12 shadow-kyn-lift flex items-center justify-center gap-3 active:scale-95 transition-all">
              <Save size={16} /> Push to Universe
            </button>
          </form>
        )}

        {/* Inventory Feed */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <Package size={16} className="text-kyn-slate-400" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-kyn-slate-400">Live Inventory</h2>
          </div>
          
          <div className="grid gap-4">
            {products.map(product => (
              <div key={product.id} className="kyn-card p-6 flex justify-between items-center group hover:border-kyn-green-200 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-kyn-canvas dark:bg-kyn-slate-800 rounded-xl flex items-center justify-center text-kyn-slate-300">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-kyn-slate-900 dark:text-white uppercase tracking-tight">{product.name}</h3>
                    <div className="flex gap-3 mt-1">
                      <span className="text-[9px] font-black uppercase tracking-widest text-kyn-green-600">£{product.price_gbp}</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-kyn-slate-300">/</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-kyn-slate-400">{product.world} World</span>
                    </div>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-full text-[9px] font-black tracking-widest border transition-colors ${
                  product.is_active 
                  ? 'bg-kyn-green-50 text-kyn-green-600 border-kyn-green-100' 
                  : 'bg-kyn-slate-50 text-kyn-slate-400 border-kyn-slate-100'
                }`}>
                  {product.is_active ? 'SYSTEM LIVE' : 'DORMANT'}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
