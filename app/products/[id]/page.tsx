"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Star, ShieldCheck, Clock, Zap } from 'lucide-react';
import UniverseCanvas from '../../../components/UniverseCanvas';
import { useCart } from '../../../context/CartContext';

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Workflow Pro Template',
    price: 24.99,
    category: 'Tools',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=800&auto=format&fit=crop',
    description: 'A comprehensive Notion workspace designed for modern professionals and creative teams. Includes specialized modules for project management, financial tracking, and knowledge management.',
    features: ['Custom CRM', 'Project Tracker', 'Financial Ledger', 'Knowledge Base']
  },
  {
    id: '2',
    name: 'Minimalist UI Kit',
    price: 49.00,
    category: 'Life',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800&auto=format&fit=crop',
    description: 'Clean, accessible, and high-performance UI components for React and Figma. Built with accessibility and performance as first-class citizens.',
    features: ['100+ Components', 'Figma Files Included', 'React/Tailwind Support', 'Accessibility Audited']
  },
  {
    id: '3',
    name: 'Digital Garden Planner',
    price: 15.00,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1544411047-c491584222f0?q=80&w=800&auto=format&fit=crop',
    description: 'A structured system for organizing your learning, research, and long-term goals. Transition from passive consumption to active creation.',
    features: ['Weekly Reviews', 'Goal Mapping', 'Resource Library', 'Quick Capture']
  }
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const { addToCart } = useCart();
  const product = MOCK_PRODUCTS.find(p => p.id === params.id) || MOCK_PRODUCTS[0];

  return (
    <div className="min-h-screen bg-brand-base pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <Link 
          href="/marketplace" 
          className="inline-flex items-center gap-2 text-brand-text/50 hover:text-brand-text mb-12 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-semibold">Back to Marketplace</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Visual Showcase */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square relative rounded-3xl overflow-hidden bg-brand-surface/20 border border-color-border"
            >
              <div className="absolute inset-0 z-0 opacity-20">
                <UniverseCanvas />
              </div>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover relative z-10"
              />
            </motion.div>

            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square relative rounded-xl overflow-hidden bg-brand-surface border border-color-border opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                  <Image src={product.image} alt="Preview" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-brand-surface text-brand-text text-[10px] font-bold uppercase tracking-widest rounded-full border border-color-border">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-brand-accent ml-2">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-bold">4.9</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-2xl font-bold text-brand-text">
                £{product.price.toFixed(2)}
              </p>
            </header>

            <p className="text-color-muted leading-relaxed mb-10 text-lg">
              {product.description}
            </p>

            <div className="space-y-4 mb-10">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-brand-text">
                  <div className="w-5 h-5 rounded-full bg-brand-accent/10 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                  </div>
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={() => addToCart(product)}
                className="flex-grow py-5 bg-brand-text text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-accent transition-all duration-base shadow-tactile group"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-6 pt-10 border-t border-color-border">
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-brand-text/30" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-text">Secure Access</p>
                  <p className="text-[10px] text-color-muted">Encrypted Delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Zap size={20} className="text-brand-text/30" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-text">Instant Setup</p>
                  <p className="text-[10px] text-color-muted">No Waiting Time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
