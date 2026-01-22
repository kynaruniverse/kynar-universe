// Global Constants for Kynar Universe
// Aligned with Brand Guide and Product Guide

export const WORLDS = ['Home', 'Lifestyle', 'Tools'] as const;

export const WORLD_CONFIG = {
  Home: {
    label: 'Home',
    tagline: 'Make everyday life less chaotic',
    description: 'Family-friendly organisation',
    color: 'kyn-green',
    colorClasses: {
      badge: 'bg-kyn-green-500',
      bg: 'bg-kyn-green-50 dark:bg-kyn-green-900/20',
      border: 'border-kyn-green-100 dark:border-kyn-green-800',
      hover: 'hover:border-kyn-green-300',
      text: 'text-kyn-green-600'
    }
  },
  Lifestyle: {
    label: 'Lifestyle',
    tagline: 'Build better habits and routines',
    description: 'Progress without pressure',
    color: 'kyn-caramel',
    colorClasses: {
      badge: 'bg-kyn-caramel-500',
      bg: 'bg-kyn-caramel-50 dark:bg-kyn-caramel-900/20',
      border: 'border-kyn-caramel-100 dark:border-kyn-caramel-800',
      hover: 'hover:border-kyn-caramel-300',
      text: 'text-kyn-caramel-600'
    }
  },
  Tools: {
    label: 'Tools',
    tagline: 'Power up your projects',
    description: 'Professional assets, instant results',
    color: 'kyn-slate',
    colorClasses: {
      badge: 'bg-kyn-slate-500',
      bg: 'bg-kyn-slate-50 dark:bg-kyn-slate-800/50',
      border: 'border-kyn-slate-200 dark:border-kyn-slate-700',
      hover: 'hover:border-kyn-slate-400',
      text: 'text-kyn-slate-600'
    }
  }
} as const;

export const PRICE_RANGES = [
  { label: 'Free', value: 'free', min: 0, max: 0 },
  { label: '£1-5', value: '1-5', min: 1, max: 5 },
  { label: '£5-15', value: '5-15', min: 5, max: 15 },
  { label: '£15+', value: '15+', min: 15, max: 999999 }
] as const;

export const FILE_TYPES = [
  'PDF',
  'Notion',
  'Excel',
  'Canva',
  'ZIP',
  'PNG',
  'JPG',
  'SVG'
] as const;

export const COMMON_TAGS = [
  'Creator',
  'Student',
  'Teacher',
  'Business',
  'Home',
  'Family'
] as const;

export const SITE_CONFIG = {
  name: 'Kynar Universe',
  url: 'https://kynar-universev3.netlify.app',
  description: 'One universe, unlimited solutions. Organise your home, life, and projects with curated digital tools and planners.',
  tagline: 'One universe, unlimited solutions',
  location: 'UK',
  currency: 'GBP',
  currencySymbol: '£'
} as const;

export const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: 'Home' },
  { label: 'Browse', href: '/store', icon: 'Grid' },
  { label: 'Guides', href: '/guides', icon: 'BookOpen' },
  { label: 'Library', href: '/account', icon: 'User' }
] as const;

// Copy aligned with Language Guide Section 3
export const PRODUCT_COPY = {
  heroLineFormula: (productType: string, outcome: string) => `${productType} that ${outcome}`,
  emptyLibrary: {
    title: 'Your library is empty',
    description: 'Start your collection to organise your digital life.',
    cta: 'Browse Store'
  },
  emptySearch: {
    title: 'No products found for this world yet.',
    cta: 'Clear filters'
  },
  loading: 'Loading your products...',
  error: 'Oops, something went wrong. Let\'s fix that.'
} as const;