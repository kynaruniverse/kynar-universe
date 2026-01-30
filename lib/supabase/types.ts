export type World = 'home' | 'lifestyle' | 'tools';

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string | null;
  price_gbp: number;
  slug: string;
  world: World;
  format_label: string;
  image_url: string | null;
  is_published: boolean;
  lemon_squeezy_variant_id: string | null;
  created_at: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  product_id: string;
  ls_order_id: string | null;
  amount_paid: number;
  created_at: string;
}
