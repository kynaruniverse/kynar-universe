'use client';

interface CheckoutButtonProps {
  variantId: string;
  userEmail?: string; // Pre-fill email for a smoother experience
}

export default function CheckoutButton({ variantId, userEmail }: CheckoutButtonProps) {
  const checkoutUrl = `https://kynar.lemonsqueezy.com/checkout/buy/${variantId}?embed=1${
    userEmail ? `&checkout[email]=${userEmail}` : ''
  }`;

  const handleCheckout = () => {
    // We use a simple window open to maintain the mobile "handrail" feel
    window.open(checkoutUrl, '_blank');
  };

  return (
    <button
      onClick={handleCheckout}
      className="w-full bg-kyn-green-700 text-white py-4 rounded-[20px] font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-kyn-green-700/10 active:scale-[0.98] transition-all"
    >
      Own This Tool — £15
    </button>
  );
}
