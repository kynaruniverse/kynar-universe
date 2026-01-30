import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import EditProductForm from './EditProductForm';

export default async function EditPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  // Fetch the existing product data
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !product) {
    return notFound();
  }

  return (
    <div className="max-w-xl mx-auto pb-20">
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-2">
           <div className={`w-2 h-2 rounded-full ${product.is_published ? 'bg-kyn-green-500' : 'bg-kyn-slate-300'}`} />
           <span className="text-[10px] uppercase tracking-widest font-bold text-kyn-slate-400">
             {product.is_published ? 'Live in Universe' : 'Draft Nebula'}
           </span>
        </div>
        <h1 className="text-2xl font-semibold text-kyn-green-700">Edit Asset</h1>
        <p className="text-sm text-kyn-slate-500">Modify {product.title}</p>
      </header>

      <EditProductForm initialData={product} />
    </div>
  );
}
