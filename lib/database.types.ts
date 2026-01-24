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
          price_id: string // Lemon Squeezy Variant ID
          content_url: string | null
          preview_image: string | null
          file_types: string[]
          is_published: boolean
          created_at: string
          updated_at: string
        }
        // ... (Insert/Update match)
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
          // Recommendation: Add these for better admin tracking
          amount_total: number | null 
          currency: string | null
          customer_email: string | null
        }
        // ... (Insert/Update match)
      }
      profiles: {
        Row: {
          id: string
          email: string | null // Added for easier admin identification
          full_name: string | null
          avatar_url: string | null
          is_admin: boolean
          created_at: string
        }
        // ... (Insert/Update match)
      }
    }
  }
}

/**
 * Helpful Utility Types 
 * Usage: import type { Product } from '@/lib/database.types'
 */
export type Product = Database['public']['Tables']['products']['Row'];
export type Purchase = Database['public']['Tables']['purchases']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
