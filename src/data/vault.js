/* ==========================================================================
   DATA LAYER | SINGLE SOURCE OF TRUTH
   ========================================================================== */

/**
 * @typedef {Object} Product
 * @property {string} id - Unique identifier (kebab-case)
 * @property {string} title - Display title
 * @property {string} price - Formatted price string (e.g., "£24.00")
 * @property {string} image - Relative path to image asset
 * @property {string} category - 'personal' | 'work' | 'creative' | 'education'
 * @property {string} tag - Secondary descriptive tag
 * @property {string} shortDesc - One-line summary for cards
 * @property {string} longDesc - Full description for details page
 * @property {string} status - 'active' | 'coming-soon' | 'sold-out'
 * @property {string} accentColor - Hex code or var() for background accents
 * @property {string} checkout - External checkout URL
 * @property {string[]} [features] - List of product features (Optional)
 * @property {string} [actionLabel] - Custom button text (Optional)
 * @property {string} [file] - Filename for download (Optional)
 * @property {string} [previewUrl] - Link to live demo (Optional)
 */

/** * The immutable product inventory.
 * @type {Product[]} 
 */
export const VAULT = [
  // --- PERSONAL (Life & Flow) ---
  {
    id: "finance-tracker",
    category: "personal",
    status: "coming-soon",
    actionLabel: "Arriving Soon",
    title: "The Finance Tracker",
    shortDesc: "Complete wealth management",
    longDesc: "A high-fidelity wealth management system designed to track income, automate budgeting, and visualize long-term savings in one clinical dashboard.",
    price: "£24.00",
    tag: "Finance",
    accentColor: "var(--color-sage)",
    image: "assets/images/finance-mockup.webp",
    checkout: "#",
    features: ["Income Tracking", "Budget Automation", "Savings Visualization", "Mobile Optimized"]
  },
  {
    id: "life-os",
    category: "personal",
    status: "coming-soon",
    actionLabel: "Arriving Soon",
    title: "Life OS Dashboard",
    shortDesc: "The ultimate Notion system",
    longDesc: "A complete central nervous system for your life. Manage tasks, habits, journals, and projects within a professional, connected ecosystem.",
    price: "£45.00",
    tag: "Notion",
    accentColor: "var(--color-clay)",
    image: "assets/images/visual-mockup.webp",
    checkout: "#",
    features: ["Task Management", "Habit Tracking", "Project Roadmap", "Journaling Suite"]
  },
  {
    id: "self-care-planner",
    category: "personal",
    status: "coming-soon",
    actionLabel: "Arriving Soon",
    title: "Self-Care Planner",
    shortDesc: "Prioritize your well-being",
    longDesc: "A digital sanctuary for mental health and routine building. Features mood tracking, wellness audits, and guided reflection templates.",
    price: "£15.00",
    tag: "Wellness",
    accentColor: "var(--color-sky)",
    image: "assets/images/creative-mockup.webp",
    checkout: "#",
    features: ["Mood Tracker", "Routine Builder", "Wellness Audits", "Reflection Journal"]
  },

  // --- WORK (Business & Growth) ---
  {
    id: "ai-prompt-pack",
    category: "work",
    status: "coming-soon",
    actionLabel: "Arriving Soon",
    title: "AI Prompt Pack",
    shortDesc: "Engineered AI commands",
    longDesc: "A collection of high-performance prompts designed to turn AI into a full-time assistant for writing, coding, and strategic planning.",
    price: "£19.00",
    tag: "AI Tools",
    accentColor: "var(--color-sage)",
    image: "assets/images/code-mockup.webp",
    checkout: "#",
    features: ["100+ Pro Prompts", "Coding Assistants", "Writing Frameworks", "Strategy Templates"]
  },
  {
    id: "etsy-starter-kit",
    category: "work",
    status: "coming-soon",
    actionLabel: "Arriving Soon",
    title: "Etsy Seller Starter Kit",
    shortDesc: "Launch your digital shop",
    longDesc: "Everything you need to dominate the Etsy marketplace. Includes SEO checklists, shop banner templates, and listing strategies.",
    price: "£35.00",
    tag: "Business",
    accentColor: "var(--color-clay)",
    image: "assets/images/finance-mockup.webp",
    checkout: "#",
    features: ["SEO Checklists", "Shop Banners", "Listing Templates", "Launch Guide"]
  },

  // --- CREATIVE (Content & Style) ---
  {
    id: "social-content-system",
    category: "creative",
    status: "coming-soon",
    actionLabel: "Arriving Soon",
    title: "Social Media Content System",
    shortDesc: "Scale your digital presence",
    longDesc: "A professional framework for content creators. Plan, schedule, and execute high-fidelity social campaigns across all platforms.",
    price: "£29.00",
    tag: "Content",
    accentColor: "var(--color-sky)",
    image: "assets/images/creative-mockup.webp",
    checkout: "#",
    features: ["Content Calendar", "Platform Strategies", "Visual Planner", "Analytics Tracker"]
  },
  {
    id: "file-finder-remover",
    category: "creative",
    status: "coming-soon",
    actionLabel: "Arriving Soon",
    title: "Duplicate File Finder",
    shortDesc: "Clean your digital workspace",
    longDesc: "An elite utility script designed to scan, identify, and remove redundant files, optimizing your storage and workflow speed.",
    price: "£10.00",
    tag: "Utility",
    accentColor: "var(--color-sage)",
    image: "assets/images/code-mockup.webp",
    checkout: "#",
    features: ["Deep Scan Logic", "Safety Backup", "One-Click Clean", "Storage Report"]
  },

  // --- EDUCATION ---
  {
    id: "homeschool-planner",
    category: "education",
    status: "coming-soon",
    actionLabel: "Arriving Soon",
    title: "Homeschool Curriculum Planner",
    shortDesc: "Structured learning systems",
    longDesc: "A comprehensive planner for modern educators. Track lesson plans, student progress, and curriculum requirements in one place.",
    price: "£20.00",
    tag: "Education",
    accentColor: "var(--color-clay)",
    image: "assets/images/visual-mockup.webp",
    checkout: "#",
    features: ["Lesson Scheduling", "Student Tracking", "Grade Book", "Resource Library"]
  }
];

// Security: Prevent runtime modification
VAULT.forEach(Object.freeze);
Object.freeze(VAULT);

/**
 * Helper: Find product by ID
 * @param {string} id 
 * @returns {Product | undefined}
 */
export function getProduct(id) {
  return VAULT.find(p => p.id === id);
}
