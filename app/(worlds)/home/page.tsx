/**
 * KYNAR UNIVERSE: World Landing (Home) v3.0
 * Refactored to use shared WorldPage component
 */

import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { WorldPage } from "@/components/worlds/WorldPage";
import { homeWorldConfig } from "@/lib/worlds/configs";
import { Product } from "@/lib/supabase/types";

export const metadata: Metadata = homeWorldConfig.metadata;

export default async function HomeWorldPage() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("world", "home")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  
  const products = (data as Product[]) ?? [];
  
  return <WorldPage config={homeWorldConfig} products={products} error={error?.message} />;
}