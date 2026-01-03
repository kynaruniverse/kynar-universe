/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: KYNAR DATA VAULT (PRODUCT DATABASE)
 * ══════════════════════════════════════════════════════════════════════════
 * @description The central source of truth for all digital assets.
 * Contains metadata, pricing, status flags, and file mapping.
 * @version 6.0 - Secure Asset Mapping
 * @module DataVault
 */

// #region [ 1. DATA REPOSITORY ]

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
    accentColor: "var(--pastel-sage)",
    image: "assets/images/finance-mockup.webp",
    checkout: "#",
    file: "#",
    features: [
      "Income Tracking",
      "Budget Automation",
      "Savings Visualization",
      "Mobile Optimized"
    ]
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
    accentColor: "var(--pastel-clay)",
    image: "assets/images/visual-mockup.webp",
    checkout: "#",
    file: "#",
    features: [
      "Task Management",
      "Habit Tracking",
      "Project Roadmap",
      "Journaling Suite"
    ]
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
    accentColor: "var(--pastel-sky)",
    image: "assets/images/creative-mockup.webp",
    checkout: "#",
    file: "#",
    features: [
      "Mood Tracker",
      "Routine Builder",
      "Wellness Audits",
      "Reflection Journal"
    ]
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
    accentColor: "var(--pastel-sage)",
    image: "assets/images/code-mockup.webp",
    checkout: "#",
    file: "#",
    features: [
      "100+ Pro Prompts",
      "Coding Assistants",
      "Writing Frameworks",
      "Strategy Templates"
    ]
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
    accentColor: "var(--pastel-clay)",
    image: "assets/images/finance-mockup.webp",
    checkout: "#",
    file: "#",
    features: [
      "SEO Checklists",
      "Shop Banners",
      "Listing Templates",
      "Launch Guide"
    ]
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
    accentColor: "var(--pastel-sky)",
    image: "assets/images/creative-mockup.webp",
    checkout: "#",
    file: "#",
    features: [
      "Content Calendar",
      "Platform Strategies",
      "Visual Planner",
      "Analytics Tracker"
    ]
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
    accentColor: "var(--pastel-sage)",
    image: "assets/images/code-mockup.webp",
    checkout: "#",
    file: "#",
    features: [
      "Deep Scan Logic",
      "Safety Backup",
      "One-Click Clean",
      "Storage Report"
    ]
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
    accentColor: "var(--pastel-clay)",
    image: "assets/images/visual-mockup.webp",
    checkout: "#",
    file: "#",
    features: [
      "Lesson Scheduling",
      "Student Tracking",
      "Grade Book",
      "Resource Library"
    ]
  }
];

// #endregion

// #region [ 2. SECURITY & IMMUTABILITY ]

// High-Fidelity Data Lock: Prevents runtime modification of product data
VAULT.forEach(Object.freeze);
Object.freeze(VAULT);

// #endregion

// #region [ 3. ACCESSORS ]

/**
 * Retrieves a specific product by its unique ID.
 * @param {string} id - The product ID (e.g., 'notion-life-os').
 * @returns {Object|null} The product object or null if not found.
 */
export function getProduct(id) {
  return VAULT.find((p) => p.id === id) || null;
}

/**
 * Retrieves all products belonging to a specific category.
 * @param {string} cat - The category key (e.g., 'personal', 'work').
 * @returns {Array} Array of matching product objects.
 */
export function getByCategory(cat) {
  return VAULT.filter((p) => p.category === cat);
}

// #endregion
