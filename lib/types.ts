/**
 * Core Type Definitions for Kynar Universe
 * Aligned with database schema and brand requirements
 */

export type World = 'Home' | 'Lifestyle' | 'Tools';

export interface Product {
  id: string;
  title: string;
  slug: string;
  world: World;
  category: string;
  tags: string[];
  description: string;
  short_description: string;
  
  // Lemon Squeezy Integration
  price_id: string; // Variant ID or Checkout URL
  
  // Assets
  content_url: string | null;
  preview_image: string | null;
  file_types: string[];
  
  // Status
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  product_id: string;
  
  // Lemon Squeezy Data
  lemon_squeezy_order_id: string;
  lemon_squeezy_checkout_id: string;
  
  purchase_date: string;
  status: 'completed' | 'pending' | 'refunded';
  
  // Joined Data (Optional)
  product?: Product;
}

// Renamed from 'User' to avoid conflict with Supabase Auth 'User'
export interface UserProfile {
  id: string; // References auth.users.id
  email: string;
  is_admin: boolean;
  created_at: string;
}

export interface FilterState {
  world: World | null;
  priceRange: string | null;
  fileType: string | null;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// --- API & Webhook Types ---

export interface ApiError {
  error: string;
  message?: string;
}

export interface WebhookPayload {
  meta: {
    event_name: string;
    custom_data?: {
      user_id: string;
    };
  };
  data: {
    id: string;
    attributes: {
      identifier: string;
      first_order_item: {
        variant_id: string | number;
      };
      status: string;
    };
  };
}
