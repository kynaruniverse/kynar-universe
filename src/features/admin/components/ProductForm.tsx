'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Save, Globe, DollarSign, FileText, Image as ImageIcon, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { sanitizeSlug, parseCommaSeparated } from '@/shared/utils/sanitization'
import { WORLDS } from '@/shared/constants/worlds'
import { saveProduct } from '@/features/admin/actions/products'
import type { Product } from '@/lib/types/models'
import { Input } from '@/shared/components/ui/Input'
import { Button } from '@/shared/components/ui/Button'

interface ProductFormProps {
  initialData?: Partial<Product>
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [saveError, setSaveError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    world: initialData?.world || WORLDS[0],
    category: initialData?.category || '',
    price_id: initialData?.price_id || '', 
    content_url: initialData?.content_url || '',
    short_description: initialData?.short_description || '',
    description: initialData?.description || '',
    preview_image: initialData?.preview_image || '',
    tags: initialData?.tags?.join(', ') || '',
    file_types: initialData?.file_types?.join(', ') || '',
    is_published: initialData?.is_published ?? true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleToggle = () => {
    setFormData(prev => ({ ...prev, is_published: !prev.is_published }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaveError(null)

    startTransition(async () => {
      const finalSlug = formData.slug 
        ? sanitizeSlug(formData.slug) 
        : sanitizeSlug(formData.title)
  
      const payload = {
        ...formData,
        id: initialData?.id,
        slug: finalSlug,
        tags: parseCommaSeparated(formData.tags),
        file_types: parseCommaSeparated(formData.file_types),
      }

      const result = await saveProduct(payload)

      if (!result.success) {
        setSaveError(result.error)
        return
      }

      router.push('/admin')
      router.refresh()
    })
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-10 max-w-5xl mx-auto pb-32 animate-in fade-in duration-500'>
      
      <div className='flex flex-col gap-2 border-b border-kyn-slate-100 dark:border-kyn-slate-800 pb-6'>
        <h2 className='text-3xl font-black text-primary tracking-tight italic uppercase'>
          {initialData?.id ? 'Edit Artifact' : 'New Blueprint'}
        </h2>
        <p className='text-sm text-kyn-slate-400 font-medium'>
          Transmit artifact data to the Kynar database.
        </p>
      </div>

      {saveError && (
        <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-red-600 dark:text-red-400 font-bold shadow-sm'>
          <div className='w-2 h-2 rounded-full bg-red-500 animate-pulse' />
          <span>Error: {saveError}</span>
        </div>
      )}
      
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-10'>
        {/* Main Content Column */}
        <div className='lg:col-span-8 space-y-10'>
          <section className='bg-surface p-8 rounded-[2rem] border border-kyn-slate-100 dark:border-kyn-slate-800 shadow-sm space-y-6'>
            <h3 className='font-black text-[10px] uppercase tracking-[0.25em] text-kyn-slate-400 flex items-center gap-2'>
              <Globe size={14} /> Core Identity
            </h3>
            
            <div className='grid gap-6'>
              <div className='space-y-2'>
                <label className='text-[10px] font-black uppercase tracking-widest text-kyn-slate-500 ml-1'>Title</label>
                <Input
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder='The Ultimate Studio Manager'
                  className='font-bold text-lg rounded-2xl'
                />
              </div>

              <div className='space-y-2'>
                <label className='text-[10px] font-black uppercase tracking-widest text-kyn-slate-500 ml-1'>Slug</label>
                <div className='flex items-center group'>
                  <span className='bg-kyn-slate-50 dark:bg-kyn-slate-900 border border-r-0 border-kyn-slate-100 dark:border-kyn-slate-800 px-4 py-4 rounded-l-2xl text-[10px] text-kyn-slate-400 font-black uppercase select-none'>
                    /product/
                  </span>
                  <Input
                    name='slug'
                    value={formData.slug}
                    onChange={handleChange}
                    required
                    className='rounded-l-none font-mono text-kyn-green-600 rounded-r-2xl'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-[10px] font-black uppercase tracking-widest text-kyn-slate-500 ml-1'>Short Pitch</label>
                <textarea
                  name='short_description'
                  value={formData.short_description}
                  onChange={handleChange}
                  rows={2}
                  className='w-full px-5 py-4 rounded-2xl border border-kyn-slate-100 dark:border-kyn-slate-800 bg-white dark:bg-kyn-slate-900 text-sm font-medium focus:ring-4 focus:ring-kyn-green-500/10 focus:border-kyn-green-500 outline-none transition-all'
                  placeholder='One sentence pitch...'
                />
              </div>
            </div>
          </section>

          <section className='bg-surface p-8 rounded-[2rem] border border-kyn-slate-100 dark:border-kyn-slate-800 shadow-sm space-y-6'>
             <h3 className='font-black text-[10px] uppercase tracking-[0.25em] text-kyn-slate-400 flex items-center gap-2'>
              <ImageIcon size={14} /> Visual Media
            </h3>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <label className='text-[10px] font-black uppercase tracking-widest text-kyn-slate-500 ml-1'>Preview Image URL</label>
                <Input
                  name='preview_image'
                  value={formData.preview_image}
                  onChange={handleChange}
                  placeholder='https://...'
                  className='font-mono text-xs rounded-2xl'
                />
              </div>
              {formData.preview_image && (
                <div className='aspect-video relative rounded-3xl overflow-hidden bg-kyn-slate-50 dark:bg-kyn-slate-950 border border-kyn-slate-100 dark:border-kyn-slate-800'>
                  <img 
                    src={formData.preview_image} 
                    alt='Preview' 
                    className='object-cover w-full h-full'
                    onError={(e) => (e.currentTarget.style.display = 'none')} 
                  />
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className='lg:col-span-4 space-y-10'>
          <section className='bg-surface p-8 rounded-[2rem] border border-kyn-slate-100 dark:border-kyn-slate-800 shadow-sm space-y-6'>
            <h3 className='font-black text-[10px] uppercase tracking-[0.25em] text-kyn-slate-400 flex items-center gap-2'>
              <Sparkles size={14} /> Organization
            </h3>
            
            <div className='space-y-6'>
              <div className='space-y-2'>
                <label className='text-[10px] font-black uppercase tracking-widest text-kyn-slate-500 ml-1'>World</label>
                <select
                  name='world'
                  value={formData.world}
                  onChange={handleChange}
                  className='w-full px-5 py-4 rounded-2xl border border-kyn-slate-100 dark:border-kyn-slate-800 bg-white dark:bg-kyn-slate-900 font-bold text-primary appearance-none cursor-pointer focus:ring-4 focus:ring-kyn-green-500/10 outline-none transition-all'
                >
                  {WORLDS.map(w => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>

              <div className='space-y-2'>
                <label className='text-[10px] font-black uppercase tracking-widest text-kyn-slate-500 ml-1'>Category</label>
                <Input
                  name='category'
                  value={formData.category}
                  onChange={handleChange}
                  placeholder='Notion, Figma, PDF'
                  className='font-bold rounded-2xl'
                />
              </div>

               <div className='space-y-2'>
                <label className='text-[10px] font-black uppercase tracking-widest text-kyn-slate-500 ml-1'>LS Price ID</label>
                <Input
                  name='price_id'
                  value={formData.price_id}
                  onChange={handleChange}
                  placeholder='Variant ID'
                  className='font-mono rounded-2xl'
                />
              </div>
            </div>
          </section>

          <section className='bg-kyn-green-600 p-8 rounded-[2rem] shadow-xl shadow-kyn-green-600/20 space-y-4'>
             <h3 className='font-black text-[10px] uppercase tracking-[0.25em] text-white/60 flex items-center gap-2'>
              <DollarSign size={14} /> Content Access
            </h3>
            <div className='space-y-2'>
              <label className='text-[10px] font-black uppercase tracking-widest text-white/80 ml-1'>Secure Storage URL</label>
              <Input
                name='content_url'
                value={formData.content_url}
                onChange={handleChange}
                className='bg-white text-kyn-green-900 font-bold border-none placeholder:text-kyn-green-200 rounded-2xl'
                placeholder='Google Drive / Dropbox Link'
              />
            </div>
          </section>
          
          <section className='bg-surface p-8 rounded-[2rem] border border-kyn-slate-100 dark:border-kyn-slate-800 shadow-sm space-y-4'>
            <h3 className='font-black text-[10px] uppercase tracking-[0.25em] text-kyn-slate-400 flex items-center gap-2'>
              <FileText size={14} /> Extended Intelligence
            </h3>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className='w-full px-5 py-4 rounded-2xl border border-kyn-slate-100 dark:border-kyn-slate-800 bg-white dark:bg-kyn-slate-900 text-sm font-medium focus:ring-4 focus:ring-kyn-green-500/10 focus:border-kyn-green-500 outline-none transition-all'
              placeholder='Full technical specs...'
            />
          </section>
        </div>
      </div>

      {/* Persistent Action Bar */}
      <div className='fixed bottom-8 left-6 right-6 z-20 mx-auto max-w-5xl'>
        <div className='bg-kyn-slate-950/95 text-white p-4 rounded-[2.5rem] shadow-2xl flex items-center justify-between border border-white/10 backdrop-blur-xl'>
          <button 
            type='button'
            onClick={handleToggle}
            className={`flex items-center gap-3 px-6 py-2 rounded-full transition-all ${formData.is_published ? 'bg-kyn-green-600/20 text-kyn-green-400' : 'bg-kyn-slate-800 text-kyn-slate-400'}`}
          >
            <div className={`w-2 h-2 rounded-full ${formData.is_published ? 'bg-kyn-green-400 animate-pulse' : 'bg-kyn-slate-500'}`} />
            <span className='font-black text-[10px] uppercase tracking-widest'>
              {formData.is_published ? 'Live' : 'Draft'}
            </span>
          </button>

          <div className='flex items-center gap-4'>
            <Link href='/admin' className='text-[10px] font-black uppercase tracking-widest text-kyn-slate-400 hover:text-white px-4 transition-colors'>
              Discard
            </Link>
            <Button
              type='submit'
              isLoading={isPending}
              className='bg-white text-kyn-slate-900 hover:bg-kyn-slate-100 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest'
            >
              {!isPending && <Save size={16} className='mr-2' />}
              Save Artifact
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
