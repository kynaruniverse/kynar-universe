'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ProductFormProps {
  initialData?: any; // If present, we are editing
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    world: initialData?.world || 'Home',
    category: initialData?.category || '',
    price_id: initialData?.price_id || '', // Lemon Squeezy URL
    content_url: initialData?.content_url || '', // Download Link
    short_description: initialData?.short_description || '',
    description: initialData?.description || '',
    preview_image: initialData?.preview_image || '',
    tags: initialData?.tags?.join(', ') || '', // Convert array to string for editing
    file_types: initialData?.file_types?.join(', ') || '',
    is_published: initialData?.is_published || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    setFormData(prev => ({ ...prev, is_published: !prev.is_published }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert comma-separated strings back to arrays
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map((t: string) => t.trim()).filter(Boolean),
        file_types: formData.file_types.split(',').map((t: string) => t.trim()).filter(Boolean),
      };

      let error;
      
      if (initialData) {
        // UPDATE Mode
        const { error: updateError } = await supabase
          .from('products')
          .update(payload)
          .eq('id', initialData.id);
        error = updateError;
      } else {
        // CREATE Mode
        const { error: insertError } = await supabase
          .from('products')
          .insert([payload]);
        error = insertError;
      }

      if (error) throw error;

      router.push('/admin');
      router.refresh(); // Refresh list to show changes
    } catch (err: any) {
      alert('Error saving product: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate slug from title if slug is empty
  const handleTitleBlur = () => {
    if (!formData.slug && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      
      {/* Basic Info Card */}
      <div className="bg-white dark:bg-kyn-slate-800 p-6 rounded-xl border border-kyn-slate-200 dark:border-kyn-slate-700 space-y-4">
        <h3 className="font-bold text-lg text-kyn-slate-900 dark:text-white mb-4">Basic Info</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={handleTitleBlur}
              required
              className="w-full p-2 rounded border border-kyn-slate-300 dark:border-kyn-slate-600 bg-transparent"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Slug (URL)</label>
            <input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border border-kyn-slate-300 dark:border-kyn-slate-600 bg-transparent font-mono text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="space-y-1">
            <label className="text-sm font-medium">World</label>
            <select
              name="world"
              value={formData.world}
              onChange={handleChange}
              className="w-full p-2 rounded border border-kyn-slate-300 dark:border-kyn-slate-600 bg-white dark:bg-kyn-slate-800"
            >
              <option value="Home">Home</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Tools">Tools</option>
            </select>
          </div>
          <div className="space-y-1">
             <label className="text-sm font-medium">Category</label>
             <input
              name="category"
              placeholder="e.g. Planners"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border border-kyn-slate-300 dark:border-kyn-slate-600 bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Content & Files Card */}
      <div className="bg-white dark:bg-kyn-slate-800 p-6 rounded-xl border border-kyn-slate-200 dark:border-kyn-slate-700 space-y-4">
        <h3 className="font-bold text-lg text-kyn-slate-900 dark:text-white mb-4">Content & Delivery</h3>
        
        <div className="space-y-1">
          <label className="text-sm font-medium">Lemon Squeezy Checkout URL (Price ID)</label>
          <input
            name="price_id"
            value={formData.price_id}
            onChange={handleChange}
            placeholder="https://store.lemonsqueezy.com/checkout/..."
            className="w-full p-2 rounded border border-kyn-slate-300 dark:border-kyn-slate-600 bg-transparent font-mono text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Content URL (Download/Notion Link)</label>
          <input
            name="content_url"
            value={formData.content_url}
            onChange={handleChange}
            placeholder="https://notion.so/..."
            className="w-full p-2 rounded border border-kyn-slate-300 dark:border-kyn-slate-600 bg-transparent font-mono text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Preview Image URL</label>
           <input
            name="preview_image"
            value={formData.preview_image}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full p-2 rounded border border-kyn-slate-300 dark:border-kyn-slate-600 bg-transparent font-mono text-sm"
          />
          {/* Tip for V1 Mobile: Upload manually to Supabase Storage and paste link here */}
          <p className="text-xs text-kyn-slate-400">Paste direct image link here.</p>
        </div>
      </div>

      {/* Descriptions Card */}
      <div className="bg-white dark:bg-kyn-slate-800 p-6 rounded-xl border border-kyn-slate-200 dark:border-kyn-slate-700 space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Short Description (Card)</label>
          <textarea
            name="short_description"
            value={formData.short_description}
            onChange={handleChange}
            rows={2}
            className="w-full p-2 rounded border border-kyn-slate-300 dark:border-kyn-slate-600 bg-transparent"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Full Description (Page)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-full p-2 rounded border border-kyn-slate-300 dark:border-kyn-slate-600 bg-transparent"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
           <div className="space-y-1">
            <label className="text-sm font-medium">Tags (comma separated)</label>
            <input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Creator, Productivity"
              className="w-full p-2 rounded border border-kyn-slate-300 dark:border-kyn-slate-600 bg-transparent"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">File Types (comma separated)</label>
            <input
              name="file_types"
              value={formData.file_types}
              onChange={handleChange}
              placeholder="PDF, Notion, Zip"
              className="w-full p-2 rounded border border-kyn-slate-300 dark:border-kyn-slate-600 bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-4 pb-12">
        <div className="flex items-center gap-2">
           <input
            type="checkbox"
            id="is_published"
            checked={formData.is_published}
            onChange={handleToggle}
            className="w-5 h-5 rounded border-kyn-slate-300 text-kyn-green-600 focus:ring-kyn-green-500"
          />
          <label htmlFor="is_published" className="font-bold text-kyn-slate-900 dark:text-white">
            Publish Immediately
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-kyn-green-600 hover:bg-kyn-green-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
          Save Product
        </button>
      </div>

    </form>
  );
}
