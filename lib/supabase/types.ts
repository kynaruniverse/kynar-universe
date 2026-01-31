/**
 * KYNAR UNIVERSE: Canonical Type System (v1.5 - Schema Sync)
 * Sync Date: 2026-01-31
 * Verified against Supabase Snippet Schema and Object Inventory-2.csv
 * Hardened for Next.js 15 & Production Deployment
 */

export const WORLDS = ['Home', 'Lifestyle', 'Tools'] as const;
export type World = (typeof WORLDS)[number];

export const FILE_TYPES = ['PDF', 'Notion', 'Excel', 'PNG', 'ZIP', 'PWA'] as const;
export type FileType = (typeof FILE_TYPES)[number];

export type GuideCategory = 'usage' | 'spotlight' | 'tips';

export interface Product {
  id: string; // UUID in DB
  title: string;
  slug: string;
  world: World;
  category: string | null;
  tags: string[] | null;
  description: string | null;
  short_description: string | null; // Used in your Store/Product pages
  description_short?: string | null; // Safe-guard alias for v1.4 migration
  price_id: string;      // Lemon Squeezy Variant Reference
  file_types: FileType[] | null;
  preview_image: string | null; // Standardized visual field
  image_url?: string | null;    // Fallback for legacy records
  is_published: boolean;
  metadata: {
    use_case?: string;
    software_required?: string;
    world_category?: string;
    format?: string[];
  } | null;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  email: string;
  is_admin: boolean; 
  created_at: string;
  updated_at: string;
}

export interface UserLibrary {
  id: string;
  user_id: string;
  product_id: string;
  order_id: string | null; 
  acquired_at: string;
  status: string | null; // Default 'active'
  source: string | null; // Default 'marketplace_v1'
  product?: Product; // For joined queries in the Library page
}

export interface Guide {
  id: string;
  title: string;
  slug: string;
  category: GuideCategory;
  world: World | 'All';
  content: string | null;
  excerpt: string | null;
  thumbnail_url: string | null;
  read_time_minutes: number | null;
  related_product_ids: string[] | null;
  author: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Database Type Definitions
 * Used by the Supabase Client for full IntelliSense
 */
export type Database = {
  public: {
    Tables: {
      products: { 
        Row: Product; 
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>; 
        Update: Partial<Product>; 
      };
      profiles: { 
        Row: Profile; 
        Insert: Omit<Profile, 'created_at' | 'updated_at'>; 
        Update: Partial<Profile>; 
      };
      user_library: { 
        Row: UserLibrary; 
        Insert: Omit<UserLibrary, 'id' | 'acquired_at'>; 
        Update: Partial<UserLibrary>; 
      };
      guides: { 
        Row: Guide; 
        Insert: Omit<Guide, 'id' | 'created_at' | 'updated_at'>; 
        Update: Partial<Guide>; 
      };
    };
  };
};
