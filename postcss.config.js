/**
 * THE MUSE ENGINE STYLE PROCESSOR
 * Foundation for high-fidelity tactile CSS and Humanist typography.
 */

module.exports = {
  plugins: {
    // Allows for modular, nested CSS patterns (Essential for Curator components)
    'tailwindcss/nesting': {}, 
    
    tailwindcss: {},
    
    // Automatic browser compatibility for the UK Digital Standard
    autoprefixer: {},
  },
}
