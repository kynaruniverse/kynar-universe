/**
 * POSTCSS CONFIGURATION
 * Configures the post-processing pipeline for Tailwind CSS and Autoprefixer.
 */

module.exports = {
  plugins: {
    // Enables support for nested CSS rules within Tailwind
    'tailwindcss/nesting': {}, 
    
    // Core Tailwind CSS processing
    tailwindcss: {},
    
    // Automatic browser prefixing for CSS compatibility
    autoprefixer: {},
  },
}
