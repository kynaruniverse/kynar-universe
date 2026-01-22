// Core Type Definitions for Kynar Universe
// Aligned with database schema and brand requirements

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
  price_id: string; // Lemon Squeezy Variant ID or Checkout URL
  content_url: string | null;
  preview_image: string | null;
  file_types: string[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  product_id: string;
  lemon_squeezy_order_id: string;
  lemon_squeezy_checkout_id: string;
  purchase_date: string;
  status: 'completed' | 'pending' | 'refunded';
  product?: Product;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Profile {
  id: string;
  is_admin: boolean;
  created_at: string;
}

// Filter State
export interface FilterState {
  world: World | null;
  priceRange: string | null;
  fileType: string | null;
  tags: string[];
}

// Cart Item (for future cart functionality)
export interface CartItem {
  product: Product;
  quantity: number;
}

// API Response Types
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
    };
  };
}