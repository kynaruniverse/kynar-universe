import ProductForm from '@/components/admin/ProductForm';
import { requireAdmin } from '@/lib/auth/server';

export default async function NewProductPage() {
  await requireAdmin();
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-primary">
          New Product
        </h1>
        <p className="text-sm text-kyn-slate-500">
          Create a new product for the store
        </p>
      </div>

      <div className="bg-surface p-6 rounded-3xl border border-kyn-slate-200 dark:border-kyn-slate-800 shadow-sm">
        <ProductForm />
      </div>
    </div>
  );
}