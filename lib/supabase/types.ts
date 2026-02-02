/**
 * KYNAR UNIVERSE: Canonical Type System (v1.5)
 * Hardened for Next.js 15 & Production Deployment
 */

export const WORLDS = ['Home', 'Lifestyle', 'Tools'] as const;
export type World = (typeof WORLDS)[number];

export const FILE_TYPES = ['PDF', 'Notion', 'Excel', 'PNG', 'ZIP', 'PWA'] as const;
export type FileType = (typeof FILE_TYPES)[number];

export type GuideCategory = 'usage' | 'spotlight' | 'tips';

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          title: string;
          slug: string;
          world: World;
          category: string | null;
          tags: string[] | null;
          description: string | null;
          short_description: string | null;
          price_id: string;
          file_types: string[] | null;
          preview_image: string | null;
          image_url: string | null;
          is_published: boolean;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['products']['Row']>;
      };
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          email: string | null;
          updated_at: string;
        };
        Insert: { id: string; full_name?: string | null; avatar_url?: string | null; email?: string | null; updated_at?: string };
        Update: Partial<Database['public']['Tables']['profiles']['Row']>;
      };
      user_library: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          acquired_at: string;
        };
        Insert: Omit<Database['public']['Tables']['user_library']['Row'], 'id' | 'acquired_at'>;
        Update: Partial<Database['public']['Tables']['user_library']['Row']>;
      };
      guides: {
        Row: {
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
        };
        Insert: Omit<Database['public']['Tables']['guides']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['guides']['Row']>;
      };
    };
  };
};

// UI & Component Aliases
export type Product = Database['public']['Tables']['products']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type UserLibrary = Database['public']['Tables']['user_library']['Row'] & {
  product?: Product;
};
export type Guide = Database['public']['Tables']['guides']['Row'];
