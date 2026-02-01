/**
 * KYNAR UNIVERSE: Lemon Squeezy Gateway (v1.5)
 * Role: Multi-Product Handoff & Webhook Metadata Sync
 */

// Fixed: Relative pathing for Netlify build stability
import { Database } from "../supabase/types";

type Product = {
  id: string;
  title: string;
  price_id: string; // This corresponds to the LS Variant ID
  slug: string;
};

interface CheckoutConfig {
  products: Product[];
  userEmail: string;
  userId: string;
  config ? : {
    currency ? : string;
    receiptButtonText ? : string;
    redirectUrl ? : string;
  };
  metadata ? : Record < string,
  any > ;
}

export async function generateCheckoutUrl({
  products,
  userEmail,
  userId,
  config,
  metadata
}: CheckoutConfig) {
  // Server-side env vars (Ensured private on Netlify)
  const API_KEY = process.env.LEMONSQUEEZY_API_KEY;
  const STORE_ID = process.env.LEMONSQUEEZY_STORE_ID;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kynaruniverse.com";
  
  if (!API_KEY || !STORE_ID) {
    throw new Error("Kynar System: Payment configuration is currently unavailable.");
  }
  
  const validProducts = products.filter(p => p.price_id);
  if (validProducts.length === 0) {
    throw new Error("Your selection appears to be empty or contains invalid items.");
  }
  
  // Hardened parsing to prevent NaN errors
  const storeIdInt = Number(STORE_ID);
  const variantIdInt = Number(validProducts[0].price_id);
  
  if (isNaN(storeIdInt) || isNaN(variantIdInt)) {
    throw new Error("Gateway Error: Invalid Store or Product configuration.");
  }
  
  const payload = {
    data: {
      type: "checkouts",
      attributes: {
        store_id: storeIdInt,
        variant_id: variantIdInt,
        checkout_data: {
          email: userEmail,
          custom: {
            user_id: userId,
            // These strings are vital for your Webhook to fulfill the "Selection"
            product_ids: validProducts.map((p) => p.id).join(","),
            product_slugs: validProducts.map((p) => p.slug).join(","),
            ...metadata
          },
        },
        checkout_options: {
          embed: false,
          media: true,
          logo: true,
          desc: true,
          discount_button: false,
          dark: false,
          button_color: "#166534",
        },
        product_options: {
          redirect_url: config?.redirectUrl || `${SITE_URL}/library?status=success`,
          receipt_button_text: config?.receiptButtonText || "Open My Library",
          receipt_thank_you_note: "Your selection is now part of your permanent collection. Explore it at your own pace.",
        },
      },
    },
  };
  
  try {
    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        "Accept": "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      // Next.js 15: Explicitly disable caching for checkout generation
      cache: 'no-store',
      body: JSON.stringify(payload),
    });
    
    const json = await response.json();
    
    if (json.errors) {
      console.error("LS_API_ERROR:", json.errors);
      throw new Error(json.errors[0].detail);
    }
    
    return json.data.attributes.url;
  } catch (error) {
    console.error("LS_GATEWAY_FAILURE:", error);
    throw new Error("Connection to the secure gateway timed out. Please try again.");
  }
}