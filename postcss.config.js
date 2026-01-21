/**
 * PostCSS Configuration
 *
 * This file configures the post-processing pipeline for Tailwind CSS
 * and ensures browser compatibility with Autoprefixer.
 *
 * Plugins order is important:
 *   1. 'tailwindcss/nesting' – enables nested CSS rules
 *   2. 'tailwindcss'         – core Tailwind processing
 *   3. 'autoprefixer'        – adds vendor prefixes for cross-browser support
 */

module.exports = {
  plugins: {
    // Enable nested CSS rules similar to SCSS
    'tailwindcss/nesting': {},
    
    // Core Tailwind CSS processing
    tailwindcss: {},
    
    // Add vendor prefixes for better browser compatibility
    autoprefixer: {},
  },
};