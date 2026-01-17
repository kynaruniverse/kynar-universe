"use client";

import { useCart } from '../context/CartContext';
import { ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';

type Product = {
  id: number;
  title: string;
  price: number;
  slug: string;
  image?: string;
  category: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Determine colors based on category
  const isTools = product.category === 'Tools';
  const isLife = product.category === 'Life';
  const bgAccent = isTools ? 'bg-tools-accent' : isLife ? 'bg-life-accent' : 'bg-cat-home-accent';

  const handleAdd = () => {
    addToCart(product);
    setIsAdded(true);
    // Reset the "Added" text after 2 seconds
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button 
      onClick={handleAdd}
      disabled={isAdded}
      className={`w-full py-4 ${isAdded ? 'bg-green-600' : bgAccent} text-white font-medium rounded-btn hover:opacity-90 transition-all mb-8 flex items-center justify-center disabled:cursor-default`}
    >
      {isAdded ? (
        <>
          Added to Basket <Check className="ml-2 w-5 h-5" />
        </>
      ) : (
        <>
          Choose <ArrowRight className="ml-2 w-5 h-5" />
        </>
      )}
    </button>
  );
}
