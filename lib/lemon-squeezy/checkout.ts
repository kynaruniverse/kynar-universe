import { Product } from "@/lib/supabase/types";

interface CheckoutConfig {
  products: Product[];
  userEmail: string;
  userId: string;
  config?: {
    redirectUrl?: string;
  };
  metadata?: Record<string, any>;
}

/**
 * Generates a checkout URL via the Lemon Squeezy API.
 * Filters out products without valid price IDs and sets up checkout metadata.
 */
export async function generateCheckoutUrl({
  products,
  userEmail,
  userId,
  config,
  metadata = {},
}: CheckoutConfig): Promise<string> {
  const API_KEY = process.env.LEMONSQUEEZY_API_KEY;
  const STORE_ID = process.env.LEMONSQUEEZY_STORE_ID;
  const SITE_URL = process.env.URL || process.env.NEXT_PUBLIC_SITE_URL;

  if (!API_KEY || !STORE_ID || !SITE_URL) {
    throw new Error("Payment gateway or site URL configuration missing.");
  }

  // Only include products with valid price IDs
  const validProducts = products.filter((p) => p.price_id && p.price_id !== "0");

  if (validProducts.length === 0) {
    throw new Error("No valid products with price IDs found for checkout.");
  }

  const payload = {
    data: {
      type: "checkouts",
      attributes: {
        store_id: Number(STORE_ID),
        variant_id: Number(validProducts[0].price_id),
        checkout_data: {
          email: userEmail,
          custom: {
            user_id: userId,
            product_ids: validProducts.map((p) => p.id).join(","),
            ...metadata,
          },
        },
        product_options: {
          redirect_url: config?.redirectUrl || `${SITE_URL}/checkout/success`,
        },
      },
    },
  };

  const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
    method: "POST",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error("Lemon Squeezy Error:", result);
    throw new Error(result.errors?.[0]?.detail || "Failed to generate checkout URL");
  }

  return result.data.attributes.url;
}