/**
 * Kynar Universe Type Registry
 * Version: 1.2.0
 * Alignment: Architecture Guide 4.0 - "Total Type Safety"
 */

export type World = 'Home' | 'Lifestyle' | 'Tools';

export interface Product {
  id: string;
  created_at: string;
  name: string;
  slug: string; // For SEO-friendly URLs: kynar.app/store/visual-planner
  world: World;
  price_gbp: number;
  ls_variant_id: string; // Lemon Squeezy Variant ID (Commercial Key)
  category: 'Templates' | 'Systems' | 'Guides';
  
  // Brand Language Guide 3.1: "Hero line formula"
  hero_benefit: string;
  description: string;
  
  // Product Vision 8.1: Structured listing requirements
  who_it_is_for: string[];
  whats_included: string[];
  
  thumbnail_url: string;
  preview_url: string; // Link to a PDF/Image preview or demo
  file_path: string; // Private path in Supabase Storage 'vault' bucket
  is_active: boolean;
  is_featured: boolean;
}

/**
 * Guide Interface: 
 * Resolves Netlify Build Error in app/guides/page.tsx
 */
export interface Guide {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown or HTML string
  world: World;
  category: string;
  read_time: string;
  thumbnail_url: string;
  published_at: string;
  featured: boolean;
  author_id ? : string;
  // Optional linkage to upsell a product within a guide
  related_product_id ? : string;
}

export interface Profile {
  id: string; // Links to Supabase Auth ID
  email: string;
  full_name ? : string;
  avatar_url ? : string;
  is_admin: boolean;
  created_at: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  product_id: string;
  ls_order_id: string; // Lemon Squeezy Order Reference
  amount_total: number;
  created_at: string;
  // Relational data for the Library Vault
  product ? : Product;
}

/**
 * CartItem Interface:
 * Extends Product to ensure the "Calm" Cart UX (UX Guide 11.2)
 * quantity is usually 1 for digital assets, but kept for future expansion.
 */
export interface CartItem extends Product {
  quantity: number;
}

/**
 * Database Helper:
 * Ensures the 'purchases' relational query in LibraryPage is type-safe.
 */
export interface LibraryItem {
  id: string;
  product: Pick < Product,
  'id' | 'name' | 'world' | 'thumbnail_url' | 'hero_benefit' | 'file_path' > ;
}