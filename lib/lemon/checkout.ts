// lib/lemon/checkout.ts (Updated)
export const createCheckout = async (variantId: string, userEmail:
string) => {
  const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
      
  // Guard Clause: Ensure the API key exists before proceeding
  if (!apiKey) {
    throw new Error("Critical Security Error: LEMON_SQUEEZY_API_KEY is missing from environment variables.");
  }
      
  const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`, // Safe now
          'Content-Type': 'application/vnd.api+json',
        },
    body: JSON.stringify({
      data: {
        type: 'checkouts',
        attributes: {
          checkout_data: { email: userEmail },
        },
        relationships: {
          store: { data: { type: 'stores', id: storeId } },
          variant: { data: { type: 'variants', id: variantId } },
        },
      },
    }),
  });

  const { data } = await response.json();
  return data.attributes.url;
};
