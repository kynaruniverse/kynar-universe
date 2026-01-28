export type World = 'Home' | 'Lifestyle' | 'Tools';

export interface Product {
  id: string;
  created_at: string;
  name: string;
  slug: string; // For SEO-friendly URLs in Guides/Store
  world: World;
  price_gbp: number;
  ls_variant_id: string; // Lemon Squeezy Variant ID (String or Number)
  category: 'Templates' | 'Systems' | 'Guides'; // Added for Store filtering
  slug: string;
  
  // Brand Language Guide 3.1: "Hero line formula"
  hero_benefit: string; 
  description: string;
  
  // Product Vision 8.1: Structured listing requirements
  who_it_is_for: string[]; 
  whats_included: string[];
  
  thumbnail_url: string;
  preview_url: string; // Link to a PDF/Image preview
  is_active: boolean;
  is_featured: boolean;
}

export interface Profile {
  id: string; // Matches Supabase Auth ID
  email: string;
  full_name?: string;
  avatar_url?: string;
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
  // Relationship for easy display in Library
  product?: Product; 
}

// For the "Calm" Cart UX
export interface CartItem extends Product {
  quantity: number;
}
