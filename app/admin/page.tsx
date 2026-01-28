"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Plus, Package, FileText, LayoutDashboard, X, Globe, Lock, Save } from 'lucide-react';

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
    const { data } = await supabase.from('profiles').select('is_admin').eq('id', user?.id).single();
    if (data?.is_admin) {
      setIsAdmin(true);
      fetchProducts();
    } else {
      setFetching(false);
    }
  }

  async function fetchProducts() {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    setProducts(data || []);
    setFetching(false);
  }

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    const slug = formData.name.toLowerCase().trim().replace(/\s+/g, '-');
    
    const { error } = await supabase.from('products').insert([{
      ...formData,
      price_gbp: parseFloat(formData.price_gbp)
    }]);

    
    if (!error) {
      setIsAdding(false);
      fetchProducts();
      setFormData({ name: '', price_gbp: '', world: 'Home', ls_variant_id: '', hero_benefit: '', thumbnail_url: '', preview_url: '' });
    }
  }

  if (authLoading || fetching) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-kyn-canvas">
      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-kyn-slate-400 animate-pulse">Verifying Architect...</div>
    </div>
  );

  if (!isAdmin) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-kyn-canvas p-6 text-center">
      <Lock className="text-kyn-slate-200 mb-4" size={48} />
      <h1 className="text-2xl font-black uppercase tracking-tighter">401: Vault Restricted</h1>
      <p className="text-xs font-medium text-kyn-slate-400 mt-2 uppercase tracking-widest">Only Universe Architects may enter here.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-kyn-canvas dark:bg-kyn-slate-950 p-6 pb-40">
      <header className="max-w-4xl mx-auto flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-kyn-slate-900 dark:text-white">Universe Control</h1>
          <p className="text-[10px] font-black text-kyn-green-600 uppercase tracking-[0.25em] mt-1">Live Inventory Management</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all active:scale-95 ${
            isAdding ? 'bg-kyn-slate-200 text-kyn-slate-600' : 'bg-kyn-slate-900 dark:bg-white text-white dark:text-kyn-slate-900 shadow-kyn-lift'
          }`}
        >
          {isAdding ? <><X size={16} /> Close Form</> : <><Plus size={16} /> New Asset</>}
        </button>
      </header>

      <main className="max-w-4xl mx-auto">
        {isAdding && (
          <form onSubmit={handleAddProduct} className="kyn-card p-8 mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-kyn-slate-400 mb-8">Manifest New Product</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 md:col-span-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-kyn-slate-400 ml-2">Product Name</label>
                <input placeholder="Visual Planner v1" className="kyn-input w-full p-4 rounded-2xl bg-kyn-canvas dark:bg-kyn-slate-800 outline-none font-bold" onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>
              
              <div className="space-y-4">
                <label className="text-[9px] font-black uppercase tracking-widest text-kyn-slate-400 ml-2">Investment (£)</label>
                <input type="number" placeholder="29" className="kyn-input w-full p-4 rounded-2xl bg-kyn-canvas outline-none font-bold" onChange={e => setFormData({...formData, price_gbp: e.target.value})} required />
              </div>

              <div className="space-y-4">
                <label className="text-[9px] font-black uppercase tracking-widest text-kyn-slate-400 ml-2">Target World</label>
                <select className="kyn-input w-full p-4 rounded-2xl bg-kyn-canvas outline-none font-bold appearance-none" onChange={e => setFormData({...formData, world: e.target.value})}>
                  <option value="Home">Home World</option>
                  <option value="Lifestyle">Lifestyle World</option>
                  <option value="Tools">Tools World</option>
                </select>
              </div>

              <div className="space-y-4 md:col-span-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-kyn-slate-400 ml-2">Hero Benefit (Italicized on PDP)</label>
                <input placeholder="Organise your family schedules in one tap." className="kyn-input w-full p-4 rounded-2xl bg-kyn-canvas outline-none font-bold" onChange={e => setFormData({...formData, hero_benefit: e.target.value})} />
              </div>

              <div className="space-y-4 md:col-span-2 border-t border-kyn-slate-50 pt-6 mt-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-kyn-slate-400 ml-2 text-kyn-green-600">Lemon Squeezy Variant ID</label>
                <input placeholder="456789" className="kyn-input w-full p-4 rounded-2xl bg-kyn-green-50/30 outline-none font-bold" onChange={e => setFormData({...formData, ls_variant_id: e.target.value})} required />
              </div>
            </div>
            
            <button type="submit" className="w-full bg-kyn-slate-900 dark:bg-white text-white dark:text-kyn-slate-900 py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] mt-10 shadow-kyn-lift flex items-center justify-center gap-3 active:scale-95 transition-all">
              <Save size={16} /> Push to Universe
            </button>
          </form>
        )}

        {/* Inventory Section */}
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
