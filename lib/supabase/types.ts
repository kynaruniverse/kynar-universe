/**
 * KYNAR UNIVERSE: Canonical Type System (v1.6)
 * Fully aligned with Supabase + Next.js 15
 */

export const WORLDS = ['Home', 'Lifestyle', 'Tools'] as const;
export type World = (typeof WORLDS)[number];

export const FILE_TYPES = ['PDF', 'Notion', 'Excel', 'PNG', 'ZIP', 'PWA'] as const;
export type FileType = (typeof FILE_TYPES)[number];

export type GuideCategory = 'usage' | 'spotlight' | 'tips';

/**
 * Supabase-compatible JSON
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

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
          file_types: FileType[] | null;
          preview_image: string | null;
          image_url: string | null;
          is_published: boolean;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['products']['Row'],
          'id' | 'created_at' | 'updated_at'
        >;
        Update: Partial<Database['public']['Tables']['products']['Row']>;
      };

      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          email: string | null;
          updated_at: string;
          /** Optional admin flag — fixes settings page error */
          is_admin?: boolean;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          updated_at?: string;
          is_admin?: boolean;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Row']>;
      };

      user_library: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          acquired_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['user_library']['Row'],
          'id' | 'acquired_at'
        >;
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
        Insert: Omit<
          Database['public']['Tables']['guides']['Row'],
          'id' | 'created_at' | 'updated_at'
        >;
        Update: Partial<Database['public']['Tables']['guides']['Row']>;
      };
    };
  };
};

/* -------------------------------------------------------------------------- */
/*                               Helper Aliases                               */
/* -------------------------------------------------------------------------- */

export type Tables<
  T extends keyof Database['public']['Tables']
> = Database['public']['Tables'][T]['Row'];

export type TablesInsert<
  T extends keyof Database['public']['Tables']
> = Database['public']['Tables'][T]['Insert'];

export type TablesUpdate<
  T extends keyof Database['public']['Tables']
> = Database['public']['Tables'][T]['Update'];

/* -------------------------------------------------------------------------- */
/*                              UI / App Aliases                              */
/* -------------------------------------------------------------------------- */

export type Product = Tables<'products'>;
export type Profile = Tables<'profiles'>;
export type Guide = Tables<'guides'>;

export type UserLibrary = Tables<'user_library'> & {
  product?: Product;
};

/**
 * Auth user alias (prevents broken imports)
 * Mirrors Supabase session.user
 */
export type User = {
  id: string;
  email?: string;
};