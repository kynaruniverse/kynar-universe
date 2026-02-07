export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface LemonSqueezyCustomData {
  user_id: string;
  product_id: string;
}

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      guides: {
        Row: {
          author: string | null
          category: string
          content: string | null
          created_at: string | null
          excerpt: string | null
          id: string
          is_published: boolean | null
          read_time_minutes: number | null
          related_product_ids: string[] | null
          slug: string
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          world: string
        }
        Insert: {
          author?: string | null
          category: string
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          is_published?: boolean | null
          read_time_minutes?: number | null
          related_product_ids?: string[] | null
          slug: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          world: string
        }
        Update: {
          author?: string | null
          category?: string
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          is_published?: boolean | null
          read_time_minutes?: number | null
          related_product_ids?: string[] | null
          slug?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          world?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          download_path: string | null
          file_types: string[] | null
          id: string
          is_published: boolean | null
          lemon_squeezy_id: string | null
          metadata: Json | null
          preview_image: string | null
          price_id: string
          short_description: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string | null
          variant_id: string | null
          world: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          download_path?: string | null
          file_types?: string[] | null
          id?: string
          is_published?: boolean | null
          lemon_squeezy_id?: string | null
          metadata?: Json | null
          preview_image?: string | null
          price_id: string
          short_description?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
          variant_id?: string | null
          world: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          download_path?: string | null
          file_types?: string[] | null
          id?: string
          is_published?: boolean | null
          lemon_squeezy_id?: string | null
          metadata?: Json | null
          preview_image?: string | null
          price_id?: string
          short_description?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          variant_id?: string | null
          world?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          is_admin: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          is_admin?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      purchases: {
        Row: {
          id: string
          lemon_squeezy_checkout_id: string | null
          lemon_squeezy_order_id: string | null
          product_id: string
          purchase_date: string | null
          status: string
          user_email: string
          user_id: string | null
        }
        Insert: {
          id?: string
          lemon_squeezy_checkout_id?: string | null
          lemon_squeezy_order_id?: string | null
          product_id: string
          purchase_date?: string | null
          status: string
          user_email: string
          user_id?: string | null
        }
        Update: {
          id?: string
          lemon_squeezy_checkout_id?: string | null
          lemon_squeezy_order_id?: string | null
          product_id?: string
          purchase_date?: string | null
          status?: string
          user_email?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchases_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      user_library: {
        Row: {
          acquired_at: string | null
          id: string
          order_id: string | null
          price_id: string | null
          product_id: string
          purchase_price: number | null
          purchased_at: string | null
          source: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          acquired_at?: string | null
          id?: string
          order_id?: string | null
          price_id?: string | null
          product_id: string
          purchase_price?: number | null
          purchased_at?: string | null
          source?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          acquired_at?: string | null
          id?: string
          order_id?: string | null
          price_id?: string | null
          product_id?: string
          purchase_price?: number | null
          purchased_at?: string | null
          source?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_library_product_id_fkey",
            columns: ["product_id"],
            isOneToOne: true, // user_library entry relates to one product
            referencedRelation: "products",
            referencedColumns: ["id"],
          },
        ]
      }
      webhook_events: {
        Row: {
          created_at: string | null
          error_message: string | null
          event_id: string
          event_name: string
          id: string
          payload: Json
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          event_id: string
          event_name: string
          id?: string
          payload: Json
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          event_id?: string
          event_name?: string
          id?: string
          payload?: Json
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      audit_action:
        | "CREATE_PRODUCT"
        | "UPDATE_PRODUCT"
        | "DELETE_PRODUCT"
        | "SAVE_PRODUCT"
        | "UPDATE_SETTINGS"
        | "MANUAL_REFUND"
      world_type: "home" | "lifestyle" | "tools"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
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
      world_type: ["home", "lifestyle", "tools"],
    },
  },
} as const

// Export specific table row types that components need
export type Product = Database['public']['Tables']['products']['Row']
export type Guide = Database['public']['Tables']['guides']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
export type UserLibrary = Database['public']['Tables']['user_library']['Row']
export type User = Database['public']['Tables']['profiles']['Row'] // User = Profile

// Export World type and WORLDS constant
export type World = 'home' | 'lifestyle' | 'tools'

export const WORLDS = {
  home: {
    id: 'home' as const,
    name: 'Home',
    slug: 'home',
    description: 'Home world products and guides'
  },
  lifestyle: {
    id: 'lifestyle' as const,
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Lifestyle world products and guides'
  },
  tools: {
    id: 'tools' as const,
    name: 'Tools',
    slug: 'tools',
    description: 'Tools world products and guides'
  }
} as const