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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="group relative flex flex-col bg-white rounded-card overflow-hidden border border-color-border transition-all duration-slow"
    >
      <Link href={`/products/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-brand-surface/20">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-slow group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-brand-text/0 group-hover:bg-brand-text/5 transition-colors duration-slow" />
      </Link>

      <div className="p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-text/40">
            {product.category}
          </span>
          <span className="text-lg font-bold text-brand-text">
            £{product.price.toFixed(2)}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-brand-text mb-4 leading-tight group-hover:text-brand-accent transition-colors">
          <Link href={`/products/${product.id}`}>
            {product.name}
          </Link>
        </h3>

        <div className="mt-auto pt-6 flex gap-3">
          <button
            onClick={() => addToCart(product)}
            className="flex-grow py-4 bg-brand-surface text-brand-text rounded-btn font-bold text-xs uppercase tracking-widest hover:bg-brand-text hover:text-white transition-all duration-base border border-color-border flex items-center justify-center gap-2"
          >
            <ShoppingCart size={16} />
            Add to Bag
          </button>
          <Link
            href={`/products/${product.id}`}
            className="p-4 bg-brand-text text-white rounded-btn hover:bg-brand-accent transition-all duration-base"
            aria-label="View Details"
          >
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
