import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-color-border hover:shadow-tactile-hover transition-all duration-slow"
    >
      <div className="aspect-square relative overflow-hidden bg-brand-surface/10">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-slow group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-brand-text/0 group-hover:bg-brand-text/5 transition-colors duration-slow" />
        
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-brand-text shadow-sm border border-color-border">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-brand-text mb-2 group-hover:text-brand-accent transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-color-muted line-clamp-2 mb-6">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-brand-text/40 font-bold uppercase tracking-tighter">Price</span>
            <span className="text-xl font-bold text-brand-text">£{product.price.toFixed(2)}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => addToCart(product)}
              className="p-3 bg-brand-surface rounded-xl hover:bg-brand-accent hover:text-white transition-all duration-base border border-color-border"
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} />
            </button>
            <Link
              href={`/products/${product.id}`}
              className="p-3 bg-brand-text text-white rounded-xl hover:bg-brand-accent transition-all duration-base"
              aria-label="View Details"
            >
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
