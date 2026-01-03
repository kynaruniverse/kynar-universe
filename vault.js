/* ==========================================================================
   DATA LAYER | SINGLE SOURCE OF TRUTH
   ========================================================================== */

/**
 * @typedef {Object} Product
 * @property {string} id - Unique identifier (kebab-case)
 * @property {string} title - Display title
 * @property {string} price - Formatted price string (e.g., "£24.00")
 * @property {string} image - Relative path to image asset
 * @property {string} category - Primary category (Personal, Work, Creative, Education)
 * @property {string} tag - Secondary descriptive tag
 * @property {string} shortDesc - One-line summary for cards
 * @property {string} longDesc - Full description for modals
 * @property {string} status - 'active' | 'coming-soon' | 'sold-out'
 * @property {string} accentColor - Hex code or var() for background accents
 * @property {string} checkout - External checkout URL
 */

/** * The immutable product inventory.
 * @type {Product[]} 
 */
export const VAULT = [
  // --- PERSONAL ---
  {
    id: "finance-tracker",
    title: "The Finance Tracker",
    price: "£24.00",
    image: "assets/images/finance-mockup.webp",
    category: "Personal",
    tag: "Finance",
    shortDesc: "Complete wealth management system.",
    longDesc: "A high-fidelity wealth management system designed to track income, automate budgeting, and visualize long-term savings in one clinical dashboard.",
    status: "active",
    accentColor: "var(--color-sage)",
    checkout: "https://shop.kynaruniverse.co.uk/buy/finance-tracker"
  },
  {
    id: "life-os",
    title: "Life Operating System",
    price: "£32.00",
    image: "assets/images/visual-mockup.webp",
    category: "Personal",
    tag: "Organization",
    shortDesc: "The ultimate Notion workspace for life management.",
    longDesc: "Centralize your tasks, goals, habits, and knowledge in one interconnected operating system. Built for peak productivity.",
    status: "active",
    accentColor: "var(--color-clay)",
    checkout: "https://shop.kynaruniverse.co.uk/buy/life-os"
  },
  
  // --- WORK ---
  {
    id: "saas-starter-kit",
    title: "SaaS Starter Kit",
    price: "£45.00",
    image: "assets/images/code-mockup.webp",
    category: "Work",
    tag: "Development",
    shortDesc: "Production-ready boilerplate for your next startup.",
    longDesc: "Launch faster with a pre-configured stack including Auth, Database, and Stripe integration. Clean code, ready to scale.",
    status: "active",
    accentColor: "var(--color-sky)",
    checkout: "https://shop.kynaruniverse.co.uk/buy/saas-starter"
  },
  {
    id: "influence-suite",
    title: "Influence Suite",
    price: "£28.00",
    image: "assets/images/social-share.webp",
    category: "Work",
    tag: "Marketing",
    shortDesc: "Content planning and analytics system.",
    longDesc: "Plan, schedule, and analyze your content strategy across all platforms. Includes templates for high-conversion posts.",
    status: "active",
    accentColor: "#E0E0E0",
    checkout: "https://shop.kynaruniverse.co.uk/buy/influence-suite"
  },

  // --- CREATIVE ---
  {
    id: "aura-presets",
    title: "Aura Presets",
    price: "£18.00",
    image: "assets/images/creative-mockup.webp",
    category: "Creative",
    tag: "Photography",
    shortDesc: "Professional grading for Lightroom.",
    longDesc: "A collection of 12 high-fidelity presets designed to give your photos a timeless, cinematic look.",
    status: "coming-soon",
    accentColor: "#D4C5C5",
    checkout: "#"
  },
  
  // --- EDUCATION ---
  {
    id: "homeschool-planner",
    title: "Homeschool Planner",
    price: "£15.00",
    image: "assets/images/log-in-icon.webp",
    category: "Education",
    tag: "Planning",
    shortDesc: "Curriculum and schedule management.",
    longDesc: "Keep your students on track with lesson planning, grade tracking, and attendance logs.",
    status: "coming-soon",
    accentColor: "#DEDEE0",
    checkout: "#"
  }
];

/**
 * Helper: Find product by ID
 * @param {string} id 
 * @returns {Product | undefined}
 */
export function getProduct(id) {
  return VAULT.find(p => p.id === id);
}
