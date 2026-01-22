// Auto-generated types from Supabase schema
// These should match your actual database structure

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          title: string
          slug: string
          world: 'Home' | 'Lifestyle' | 'Tools'
          category: string
          tags: string[]
          description: string
          short_description: string
          price_id: string
          content_url: string | null
          preview_image: string | null
          file_types: string[]
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          world: 'Home' | 'Lifestyle' | 'Tools'
          category: string
          tags?: string[]
          description: string
          short_description: string
          price_id: string
          content_url?: string | null
          preview_image?: string | null
          file_types?: string[]
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          world?: 'Home' | 'Lifestyle' | 'Tools'
          category?: string
          tags?: string[]
          description?: string
          short_description?: string
          price_id?: string
          content_url?: string | null
          preview_image?: string | null
          file_types?: string[]
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      purchases: {
        Row: {
          id: string
          user_id: string
          product_id: string
          lemon_squeezy_order_id: string
          lemon_squeezy_checkout_id: string
          purchase_date: string
          status: 'completed' | 'pending' | 'refunded'
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          lemon_squeezy_order_id: string
          lemon_squeezy_checkout_id: string
          purchase_date?: string
          status?: 'completed' | 'pending' | 'refunded'
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          lemon_squeezy_order_id?: string
          lemon_squeezy_checkout_id?: string
          purchase_date?: string
          status?: 'completed' | 'pending' | 'refunded'
        }
      }
      profiles: {
        Row: {
          id: string
          is_admin: boolean
          created_at: string
        }
        Insert: {
          id: string
          is_admin?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          is_admin?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}