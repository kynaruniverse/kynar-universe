export type Json = |
  string |
  number |
  boolean |
  null |
  {
    [key: string]: Json | undefined } |
  Json[]

export type Database = {
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
          id ? : string
          title: string
          slug: string
          world: 'Home' | 'Lifestyle' | 'Tools'
          category: string
          tags: string[]
          description: string
          short_description: string
          price_id: string
          content_url ? : string | null
          preview_image ? : string | null
          file_types: string[]
          is_published: boolean
          created_at ? : string
          updated_at ? : string
        }
        Update: {
          title ? : string
          slug ? : string
          world ? : 'Home' | 'Lifestyle' | 'Tools'
          category ? : string
          tags ? : string[]
          description ? : string
          short_description ? : string
          price_id ? : string
          content_url ? : string | null
          preview_image ? : string | null
          file_types ? : string[]
          is_published ? : boolean
          updated_at ? : string
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
          amount_total: number | null
          currency: string | null
          customer_email: string | null
        }
        Insert: {
          id ? : string
          user_id: string
          product_id: string
          lemon_squeezy_order_id: string
          lemon_squeezy_checkout_id: string
          purchase_date ? : string
          status ? : 'completed' | 'pending' | 'refunded'
          amount_total ? : number | null
          currency ? : string | null
          customer_email ? : string | null
        }
        Update: {
          status ? : 'completed' | 'pending' | 'refunded'
          amount_total ? : number | null
          currency ? : string | null
          customer_email ? : string | null
        }
      }
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          is_admin: boolean
          created_at: string
        }
        Insert: {
          id: string
          email ? : string | null
          full_name ? : string | null
          avatar_url ? : string | null
          is_admin ? : boolean
          created_at ? : string
        }
        Update: {
          email ? : string | null
          full_name ? : string | null
          avatar_url ? : string | null
          is_admin ? : boolean
        }
      }
    }
  }
}