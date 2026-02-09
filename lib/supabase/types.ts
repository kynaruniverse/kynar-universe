/* KYNAR UNIVERSE: Supabase Types & Constants (v2.0) */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface LemonSqueezyCustomData {
  user_id: string;
  product_id: string;
}

// =======================
// DATABASE TYPES
// =======================
export type Database = {
  __InternalSupabase: { PostgrestVersion: "14.1" };
  graphql_public: {
    Tables: Record<never, never>;
    Views: Record<never, never>;
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
  public: {
    Tables: {
      guides: {
        Row: {
          id: string;
          title: string;
          author: string | null;
          slug: string;
          category: string;
          world: string;
          excerpt: string | null;
          content: string | null;
          thumbnail_url: string | null;
          is_published: boolean | null;
          read_time_minutes: number | null;
          related_product_ids: string[] | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: Partial<Omit<Database['public']['Tables']['guides']['Row'], 'id'>>;
        Update: Partial<Database['public']['Tables']['guides']['Row']>;
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          title: string;
          slug: string;
          price_id: string;
          world: string;
          category: string | null;
          description: string | null;
          short_description: string | null;
          preview_image: string | null;
          download_path: string | null;
          lemon_squeezy_id: string | null;
          metadata: Json | null;
          variant_id: string | null;
          file_types: string[] | null;
          tags: string[] | null;
          is_published: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: Partial<Omit<Database['public']['Tables']['products']['Row'], 'id' | 'price_id' | 'slug' | 'title' | 'world'>>;
        Update: Partial<Database['public']['Tables']['products']['Row']>;
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          is_admin: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: Partial<Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'email'>>;
        Update: Partial<Database['public']['Tables']['profiles']['Row']>;
        Relationships: [];
      };
      purchases: {
        Row: {
          id: string;
          product_id: string;
          user_id: string | null;
          user_email: string;
          lemon_squeezy_checkout_id: string | null;
          lemon_squeezy_order_id: string | null;
          status: string;
          purchase_date: string | null;
        };
        Insert: Partial<Omit<Database['public']['Tables']['purchases']['Row'], 'id'>>;
        Update: Partial<Database['public']['Tables']['purchases']['Row']>;
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
          id: string;
          user_id: string;
          product_id: string;
          order_id: string | null;
          price_id: string | null;
          purchase_price: number | null;
          purchased_at: string | null;
          acquired_at: string | null;
          status: string | null;
          source: string | null;
        };
        Insert: Partial<Omit<Database['public']['Tables']['user_library']['Row'], 'id' | 'user_id' | 'product_id'>>;
        Update: Partial<Database['public']['Tables']['user_library']['Row']>;
        Relationships: [
          {
            foreignKeyName: "user_library_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: true;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      webhook_events: {
        Row: {
          id: string;
          event_id: string;
          event_name: string;
          payload: Json;
          error_message: string | null;
          status: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: Partial<Omit<Database['public']['Tables']['webhook_events']['Row'], 'id'>>;
        Update: Partial<Database['public']['Tables']['webhook_events']['Row']>;
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: {
      audit_action:
        | "CREATE_PRODUCT"
        | "UPDATE_PRODUCT"
        | "DELETE_PRODUCT"
        | "SAVE_PRODUCT"
        | "UPDATE_SETTINGS"
        | "MANUAL_REFUND";
      world_type: "home" | "lifestyle" | "tools";
    };
    CompositeTypes: Record<never, never>;
  };
};

// =======================
// TYPES FOR COMPONENTS
// =======================
export type Product = Database['public']['Tables']['products']['Row'];
export type Guide = Database['public']['Tables']['guides']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type UserLibrary = Database['public']['Tables']['user_library']['Row'];
export type User = Profile;
export type World = 'home' | 'lifestyle' | 'tools';

// =======================
// CONSTANTS
// =======================
export const WORLDS = [
  { id: 'home' as const, name: 'Home', slug: 'home', description: 'Home world products and guides' },
  { id: 'lifestyle' as const, name: 'Lifestyle', slug: 'lifestyle', description: 'Lifestyle world products and guides' },
  { id: 'tools' as const, name: 'Tools', slug: 'tools', description: 'Tools world products and guides' }
] as const;

export const Constants = {
  public: {
    Enums: {
      audit_action: [
        "CREATE_PRODUCT",
        "UPDATE_PRODUCT",
        "DELETE_PRODUCT",
        "SAVE_PRODUCT",
        "UPDATE_SETTINGS",
        "MANUAL_REFUND",
      ],
      world_type: ["home", "lifestyle", "tools"] as const,
    },
  },
} as const;