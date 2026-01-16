"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // For redirection
import { ShoppingCart, ArrowRight, Trash2, Lock, ShieldCheck, Loader2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { processCheckout } from './actions'; // Import the server action

export default function CartPage() {
  const { items, removeFromCart, clearCart, totalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  // HANDLE CHECKOUT CLICK
  async function handleCheckout() {
    setIsProcessing(true);

    // 1. Get list of IDs/Slugs
    const productSlugs = items.map(item => item.slug);

    // 2. Call the Server Action
    const result = await processCheckout(productSlugs);

    if (result.error) {
      // If error (likely not logged in), redirect to login
      alert(result.error);
      router.push('/account'); // Send them to login
      setIsProcessing(false);
    } else {
      // 3. Success!
      clearCart(); // Wipe the cart
      router.push('/account'); // Send to Library to see new items
    }
  }

  // MODE A: EMPTY CART
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-account-base flex flex-col items-center justify-center p-4">
        <div className="bg-account-surface w-full max-w-2xl p-8 md:p-12 rounded-card shadow-sm border border-black/5 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-primary-text shadow-sm">
            <ShoppingCart className="w-10 h-10 opacity-80" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-sans text-primary-text mb-4 tracking-tight">
            Your basket is empty.
          </h1>
          <p className="font-serif text-lg text-primary-text/70 mb-10 leading-relaxed max-w-md mx-auto">
            The shelves are full of tools to help you work and live better. Take a look around.
          </p>
          <Link 
            href="/marketplace" 
            className="inline-flex items-center px-8 py-4 bg-primary-text text-white font-medium rounded-btn hover:opacity-90 transition-all hover:scale-105 shadow-md"
          >
            Return to Marketplace <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </main>
    );
  }

  // MODE B: FULL CART
  return (
    <main className="min-h-screen bg-account-base py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold font-sans text-primary-text mb-8">Your Basket</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: ITEM LIST */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div key={`${item.id}-${index}`} className="bg-white p-4 rounded-card border border-black/5 flex gap-4 items-center shadow-sm">
                
                {/* Thumbnail */}
                <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-xs text-gray-400">Img</div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-grow">
                  <h3 className="font-bold font-sans text-lg text-primary-text">{item.title}</h3>
                  <p className="text-sm font-serif text-primary-text/60 italic">Digital License</p>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="font-bold text-lg">£{item.price}</p>
                </div>

                {/* Remove Button */}
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: SUMMARY CARD */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-card border border-black/5 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold font-sans text-primary-text mb-6">Summary</h2>
              
              <div className="space-y-3 mb-6 border-b border-black/5 pb-6">
                <div className="flex justify-between text-primary-text/80">
                  <span>Subtotal</span>
                  <span>£{totalPrice}</span>
                </div>
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Delivery</span>
                  <span>Free (Digital)</span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold text-primary-text mb-8">
                <span>Total</span>
                <span>£{totalPrice}</span>
              </div>

              {/* CHECKOUT BUTTON */}
              <button 
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full py-4 bg-primary-text text-white font-medium rounded-btn hover:opacity-90 transition-all flex items-center justify-center shadow-md mb-4 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>Processing <Loader2 className="ml-2 w-5 h-5 animate-spin" /></>
                ) : (
                  <>Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>

              <div className="flex items-center justify-center space-x-4 text-xs text-primary-text/40">
                <span className="flex items-center"><Lock size={12} className="mr-1" /> Secure Payment</span>
                <span className="flex items-center"><ShieldCheck size={12} className="mr-1" /> Instant Access</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
