import { notFound, redirect } from 'next/navigation';
import { requireAdmin } from '@/features/auth/lib/server';
import { createClient } from '@/lib/supabase/server';
import ProductForm from '@/features/admin/components/ProductForm';

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const { id } = params;
    await requireAdmin();

    const supabase = await createClient();

  // 2. Fetch existing product data
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) {
    notFound();
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-primary">
          Edit Product
        </h1>
        <p className="text-sm text-kyn-slate-500">
          Updating: <span className="font-mono text-kyn-green-600">{product.title}</span>
        </p>
      </div>

      <div className="bg-surface p-6 rounded-3xl border border-kyn-slate-200 dark:border-kyn-slate-800 shadow-sm">
        <ProductForm initialData={product} />
      </div>
    </div>
  );
}
