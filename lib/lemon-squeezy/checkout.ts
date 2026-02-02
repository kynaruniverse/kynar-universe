import { Database } from "@/lib/supabase/types";

interface CheckoutProduct {
  id: string;
  title: string;
  price_id: string;
  slug: string;
}

interface CheckoutConfig {
  products: CheckoutProduct[];
  userEmail: string;
  userId: string;
  config ? : { redirectUrl ? : string };
  metadata ? : Record < string,
  any > ;
}

export async function generateCheckoutUrl({
  products,
  userEmail,
  userId,
  config,
  metadata
}: CheckoutConfig): Promise < string > {
  const API_KEY = process.env.LEMONSQUEEZY_API_KEY;
  const STORE_ID = process.env.LEMONSQUEEZY_STORE_ID;
  
  // Use Netlify's URL env var if available, fall back to public site URL
  const SITE_URL = process.env.URL || process.env.NEXT_PUBLIC_SITE_URL;
  
  if (!API_KEY || !STORE_ID) {
    throw new Error("Payment gateway configuration missing.");
  }
  
  const validProducts = products.filter(p => p.price_id && p.price_id !== "0");
  
  const payload = {
    data: {
      type: "checkouts",
      attributes: {
        store_id: parseInt(STORE_ID),
        variant_id: parseInt(validProducts[0].price_id),
        checkout_data: {
          email: userEmail,
          custom: {
            user_id: userId,
            product_ids: validProducts.map(p => p.id).join(","),
            ...metadata
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
      "Accept": "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    cache: 'no-store', // Next.js 15: prevent caching unique checkout links
    body: JSON.stringify(payload),
  });
  
  const result = await response.json();
  return result.data.attributes.url;
}