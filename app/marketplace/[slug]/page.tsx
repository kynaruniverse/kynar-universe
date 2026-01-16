import { supabase } from '../../../lib/supabase';

// Force dynamic rendering
export const revalidate = 0;

export default async function ProductPage({ params }: { params: { slug: string } }) {
  // 1. Log the slug we are looking for (Check Netlify logs if needed)
  console.log("Looking for slug:", params.slug);

  // 2. Simple Fetch
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', params.slug)
    .single();

  // 3. Error State (Print it to the screen)
  if (error) {
    return (
      <div className="p-10 text-red-500">
        <h1>Database Error</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  // 4. Missing Product State
  if (!product) {
    return <div className="p-10">Product not found in Database.</div>;
  }

  // 5. Success State (Raw Data Dump)
  return (
    <div className="p-10 font-mono text-sm">
      <h1 className="text-2xl font-bold text-green-600 mb-4">SUCCESS: CONNECTION ESTABLISHED</h1>
      <p><strong>Title:</strong> {product.title}</p>
      <p><strong>Slug:</strong> {product.slug}</p>
      <p><strong>Image URL:</strong> {product.image}</p>
      <hr className="my-4"/>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(product, null, 2)}</pre>
    </div>
  );
}
