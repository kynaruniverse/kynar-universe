"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/lib/marketplace/cart-store"; // Adjust path as needed
import { getPriceFromId, formatGBP } from "@/lib/marketplace/pricing";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem } = useCart();

  // 1. Calculate subtotal directly to avoid "getTotal" missing error
  const subtotal = items.reduce((acc, item) => {
    return acc + getPriceFromId(item.price_id);
  }, 0);

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div className="w-20 h-20 bg-kyn-slate-50 rounded-full flex items-center justify-center mb-8">
          <ShoppingBag className="text-kyn-slate-300" size={40} />
        </div>
        <h1 className="font-brand text-3xl font-medium text-kyn-slate-900 mb-4">Your vault is empty</h1>
        <p className="font-ui text-kyn-slate-500 mb-10 max-w-sm">
          You haven't selected any tools for your digital estate yet.
        </p>
        <Link 
          href="/store" 
          className="px-8 py-4 bg-kyn-slate-900 text-white rounded-xl font-brand text-sm font-medium hover:bg-black transition-all"
        >
          Return to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-16 md:py-24">
      <h1 className="font-brand text-4xl font-medium text-kyn-slate-900 mb-12">Current Selection</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Item List */}
        <div className="lg:col-span-2 space-y-8">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-6 pb-8 border-b border-border">
              <div className="h-24 w-24 bg-kyn-slate-100 rounded-xl flex-shrink-0 animate-in fade-in fill-mode-both" />
              <div className="flex-1">
                <h3 className="font-brand text-lg font-medium text-kyn-slate-900">{item.title}</h3>
                <p className="font-ui text-sm text-kyn-slate-500 capitalize">{item.world} Sector</p>
              </div>
              <div className="text-right">
                <p className="font-brand text-lg font-medium text-kyn-slate-900">
                  {formatGBP(getPriceFromId(item.price_id))}
                </p>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="mt-2 text-kyn-slate-400 hover:text-red-500 transition-colors p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-surface border border-border rounded-3xl p-8 sticky top-32">
            <h2 className="font-brand text-xl font-medium text-kyn-slate-900 mb-6">Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between font-ui text-sm text-kyn-slate-500">
                <span>Subtotal</span>
                <span>{formatGBP(subtotal)}</span>
              </div>
              <div className="flex justify-between font-ui text-sm text-kyn-slate-500">
                <span>Network Fee</span>
                <span>£0.00</span>
              </div>
              <div className="pt-4 border-t border-border flex justify-between font-brand text-xl font-medium text-kyn-slate-900">
                <span>Total</span>
                <span>{formatGBP(subtotal)}</span>
              </div>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-3 py-5 bg-kyn-slate-900 text-white rounded-2xl font-brand text-sm font-medium hover:bg-black transition-all active:scale-[0.98]"
            >
              Initiate Checkout
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
