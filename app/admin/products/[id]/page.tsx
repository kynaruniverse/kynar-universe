import { supabase } from '@/lib/supabase';
import ProductForm from '@/components/admin/ProductForm';
import { notFound } from 'next/navigation';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Fetch existing data
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-kyn-slate-900 dark:text-white">
        Edit Product
      </h1>
      <ProductForm initialData={product} />
    </div>
  );
}
