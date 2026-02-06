/**
 * KYNAR UNIVERSE: Canonical Type System (v2.3)
 * Fully aligned with generated Supabase schema + Next.js 15 logic
 */

/* -------------------------------------------------------------------------- */
/* 1. Custom App Enums & Consts                                               */
/* -------------------------------------------------------------------------- */

export const WORLDS = ['Home', 'Lifestyle', 'Tools'] as const;
export type World = (typeof WORLDS)[number];

export const FILE_TYPES = ['PDF', 'Notion', 'Excel', 'PNG', 'ZIP', 'PWA'] as const;
export type FileType = (typeof FILE_TYPES)[number];

export type GuideCategory = 'usage' | 'spotlight' | 'tips';

/* -------------------------------------------------------------------------- */
/* 2. Database Schema (Unified with Supabase API Docs)                         */
/* -------------------------------------------------------------------------- */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      guides: {
        Row: {
          author: string | null;
          category: string;
          content: string | null;
          created_at: string | null;
          excerpt: string | null;
          id: string;
          is_published: boolean | null;
          read_time_minutes: number | null;
          related_product_ids: string[] | null;
          slug: string;
          thumbnail_url: string | null;
          title: string;
          updated_at: string | null;
          world: string;
        };
        Insert: {
          author?: string | null;
          category: string;
          content?: string | null;
          created_at?: string | null;
          excerpt?: string | null;
          id?: string;
          is_published?: boolean | null;
          read_time_minutes?: number | null;
          related_product_ids?: string[] | null;
          slug: string;
          thumbnail_url?: string | null;
          title: string;
          updated_at?: string | null;
          world: string;
        };
        Update: {
          author?: string | null;
          category?: string;
          content?: string | null;
          created_at?: string | null;
          excerpt?: string | null;
          id?: string;
          is_published?: boolean | null;
          read_time_minutes?: number | null;
          related_product_ids?: string[] | null;
          slug?: string;
          thumbnail_url?: string | null;
          title?: string;
          updated_at?: string | null;
          world?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          category: string | null;
          created_at: string | null;
          description: string | null;
          download_path: string | null;
          file_types: string[] | null;
          id: string;
          is_published: boolean | null;
          lemon_squeezy_id: string | null;
          metadata: Json | null;
          preview_image: string | null;
          price_id: string;
          short_description: string | null;
          slug: string;
          tags: string[] | null;
          title: string;
          updated_at: string | null;
          variant_id: string | null;
          world: string;
        };
        Insert: {
          category?: string | null;
          created_at?: string | null;
          description?: string | null;
          download_path?: string | null;
          file_types?: string[] | null;
          id?: string;
          is_published?: boolean | null;
          lemon_squeezy_id?: string | null;
          metadata?: Json | null;
          preview_image?: string | null;
          price_id: string;
          short_description?: string | null;
          slug: string;
          tags?: string[] | null;
          title: string;
          updated_at?: string | null;
          variant_id?: string | null;
          world: string;
        };
        Update: {
          category?: string | null;
          created_at?: string | null;
          description?: string | null;
          download_path?: string | null;
          file_types?: string[] | null;
          id?: string;
          is_published?: boolean | null;
          lemon_squeezy_id?: string | null;
          metadata?: Json | null;
          preview_image?: string | null;
          price_id?: string;
          short_description?: string | null;
          slug?: string;
          tags?: string[] | null;
          title?: string;
          updated_at?: string | null;
          variant_id?: string | null;
          world?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          created_at: string | null;
          email: string;
          full_name: string | null;
          id: string;
          is_admin: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          full_name?: string | null;
          id: string;
          is_admin?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          full_name?: string | null;
          id?: string;
          is_admin?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      purchases: {
        Row: {
          id: string;
          lemon_squeezy_checkout_id: string | null;
          lemon_squeezy_order_id: string | null;
          product_id: string;
          purchase_date: string | null;
          status: string;
          user_email: string;
          user_id: string | null;
        };
        Insert: {
          id?: string;
          lemon_squeezy_checkout_id?: string | null;
          lemon_squeezy_order_id?: string | null;
          product_id: string;
          purchase_date?: string | null;
          status: string;
          user_email: string;
          user_id?: string | null;
        };
        Update: {
          id?: string;
          lemon_squeezy_checkout_id?: string | null;
          lemon_squeezy_order_id?: string | null;
          product_id?: string;
          purchase_date?: string | null;
          status?: string;
          user_email?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "purchases_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      user_library: {
        Row: {
          acquired_at: string | null;
          id: string;
          order_id: string | null;
          price_id: string | null;
          product_id: string;
          purchase_price: number | null;
          purchased_at: string | null;
          source: string | null;
          status: string | null;
          user_id: string;
        };
        Insert: {
          acquired_at?: string | null;
          id?: string;
          order_id?: string | null;
          price_id?: string | null;
          product_id: string;
          purchase_price?: number | null;
          purchased_at?: string | null;
          source?: string | null;
          status?: string | null;
          user_id: string;
        };
        Update: {
          acquired_at?: string | null;
          id?: string;
          order_id?: string | null;
          price_id?: string | null;
          product_id?: string;
          purchase_price?: number | null;
          purchased_at?: string | null;
          source?: string | null;
          status?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_product";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_library_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      webhook_events: {
        Row: {
          created_at: string | null;
          error_message: string | null;
          event_id: string;
          event_name: string;
          id: string;
          payload: Json;
          status: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          error_message?: string | null;
          event_id: string;
          event_name: string;
          id?: string;
          payload: Json;
          status?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          error_message?: string | null;
          event_id?: string;
          event_name?: string;
          id?: string;
          payload?: Json;
          status?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Enums: {
      audit_action: "CREATE_PRODUCT" | "UPDATE_PRODUCT" | "DELETE_PRODUCT" | "SAVE_PRODUCT" | "UPDATE_SETTINGS" | "MANUAL_REFUND";
      world_type: "home" | "lifestyle" | "tools";
    };
  };
};

/* -------------------------------------------------------------------------- */
/* 3. Helper Aliases (Strict Extraction)                                       */
/* -------------------------------------------------------------------------- */

type DefaultSchema = Database['public'];

export type Tables<
  T extends keyof DefaultSchema['Tables']
> = DefaultSchema['Tables'][T]['Row'];

export type TablesInsert<
  T extends keyof DefaultSchema['Tables']
> = DefaultSchema['Tables'][T]['Insert'];

export type TablesUpdate<
  T extends keyof DefaultSchema['Tables']
> = DefaultSchema['Tables'][T]['Update'];

/* -------------------------------------------------------------------------- */
/* 4. Domain-Specific UI Aliases                                              */
/* -------------------------------------------------------------------------- */

export type Product = Tables<'products'>;
export type Profile = Tables<'profiles'>;
export type Guide = Tables<'guides'>;
export type Purchase = Tables<'purchases'>;
export type WebhookEvent = Tables<'webhook_events'>;

// Extended type for components that fetch the related product object
export type UserLibrary = Tables<'user_library'> & { 
  product?: Product;
};

// Generic User for auth-specific components
export type User = {
  id: string;
  email?: string;
};
