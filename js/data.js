/* KYNAR UNIVERSE DATA ENGINE (js/data.js)
   Source of Truth for Products, Guides, and Lore.
   Aligned with: Category Architecture & Business Vision.
*/

export const KYNAR_DATA = {
  
  // =========================================
  // 1. PRODUCT CATALOGUE (The Marketplace)
  // =========================================
  products: [
    {
      id: "daily-clarity-planner",
      category: "tools",
      subCategory: "Productivity",
      title: "The Daily Clarity Planner",
      price: 8.00,
      tag: "Best Seller",
      shortDesc: "A simple, guided system to organize your day without the overwhelm.",
      lore: "A small tool for a brighter day.", // Renamed 'loreWhisper' to 'lore' for consistency
      description: "This isn't just a to-do list. It's a framework for clearing your mind. Designed for creators who have too many ideas and not enough time.",
      features: [
        "Daily Focus Blocks",
        "Energy Tracking System",
        "End-of-Day Reflection",
        "Printable PDF (A4/Letter)"
      ],
      actionBtn: "Download Now",
      previewIcon: "ph-pencil-simple",
      image: "assets/products/planner-preview.png"
    },
    {
      id: "morning-mindset-journal",
      category: "living",
      subCategory: "Wellness",
      title: "Morning Mindset Journal",
      price: 12.00,
      tag: "Wellness",
      shortDesc: "Start your day with intention and calm.",
      lore: "Here’s where your story grows.",
      description: "A 5-minute journaling routine to set a calm, positive tone for the rest of your day. No pressure, just clarity.",
      features: [
        "Gratitude Prompts",
        "Intention Setting",
        "Mood Tracker Dashboard",
        "Interactive PDF"
      ],
      actionBtn: "Get Journal",
      previewIcon: "ph-sun",
      image: "assets/products/journal.png"
    },
    {
      id: "kids-math-pack",
      category: "home", // Triggers 'home-category' theme logic in loader
      subCategory: "Family",
      title: "Little Math Explorers",
      price: 6.00,
      tag: "Family",
      shortDesc: "Fun, colorful math worksheets for ages 4-6.",
      lore: "This space is yours.",
      description: "Turn math practice into a game. Visual storytelling helps kids understand numbers without the tears.",
      features: [
        "Counting Animals",
        "Simple Addition Stories",
        "Color-by-Number",
        "Parent Guide Included"
      ],
      actionBtn: "Download Pack",
      previewIcon: "ph-star",
      image: "assets/products/math-pack.png"
    },

    // --- AUTOMATION SCRIPT (Business Vision Phase 1) ---
    {
      id: "auto-declutter-script",
      category: "tools",
      subCategory: "Automation",
      title: "Auto-Declutter Script",
      price: 15.00,
      tag: "Python Script",
      shortDesc: "Instantly organize your Downloads folder.",
      lore: "Clear tools for a brighter workflow.",
      description: "Never sort a file manually again. This Python script watches your Downloads folder and automatically moves files into 'Images', 'Docs', and 'Installers' folders instantly.",
      features: [
        "Python Script (.py)",
        "Setup Guide (PDF)",
        "Config File",
        "Lifetime Updates"
      ],
      // Technical Specs (Vision Requirement)
      specs: {
        language: "Python 3.8+",
        os: "Windows / macOS / Linux",
        difficulty: "Beginner"
      },
      // Code Preview (Vision Requirement)
      codePreview: `import os
import shutil

# Watch Directory
DOWNLOADS_DIR = "/Users/You/Downloads"

def organize():
    for filename in os.listdir(DOWNLOADS_DIR):
        if filename.endswith(".jpg"):
            shutil.move(filename, "/Images")
            print(f"Moved {filename}")`,
      
      actionBtn: "Download Script",
      previewIcon: "ph-code",
      image: "assets/products/script-preview.png"
    }
  ],

  // =========================================
  // 2. GUIDES (The Hub)
  // =========================================
  guides: [
    {
      id: "start-journaling",
      title: "How to Start Journaling (Without Pressure)",
      category: "hub",
      date: "Guide 01",
      readTime: "3 min read",
      shortDesc: "Simple tips to build a habit that sticks.",
      content: `
        <h2 class="text-h2">Start Small</h2>
        <p class="text-body">You don't need to write a novel. Start with one sentence a day. The goal is consistency, not volume.</p>
        <br>
        <h2 class="text-h2">Set the Scene</h2>
        <p class="text-body">Find a quiet corner. Make a tea. A specific time of day helps your brain recognize it's time to slow down.</p>
      `
    },
    {
      id: "calm-morning-routine",
      title: "Building a Calm Morning Routine",
      category: "hub",
      date: "Guide 02",
      readTime: "5 min read",
      shortDesc: "Reclaim your mornings from chaos.",
      content: `
        <h2 class="text-h2">No Phones First</h2>
        <p class="text-body">The world can wait. Give yourself 10 minutes of silence before letting the noise in.</p>
        <br>
        <h2 class="text-h2">Hydrate and Move</h2>
        <p class="text-body">A glass of water and a simple stretch tells your body it's time to wake up gently.</p>
      `
    }
  ],

  // =========================================
  // 3. LORE LIBRARY (Language Bible)
  // Used by app.js to inject "Whispers"
  // =========================================
  lore: {
    tools: [
      "Every tool is a small spark in the world.",
      "Clear tools for a brighter workflow.",
      "Optimize your world."
    ],
    living: [
      "Here’s where your story grows.",
      "Breathe. Create. Live.",
      "Small steps matter."
    ],
    home: [
      "This space is yours.",
      "Warmth in every corner.",
      "Simple days, quiet nights."
    ],
    general: [
      "The path continues.",
      "Built for the journey.",
      "A space, not a screen."
    ]
  }
};

/* HELPER FUNCTIONS
   These allow the pages to "Ask" the database for specific items.
*/
export function getProductById(id) {
  return KYNAR_DATA.products.find(p => p.id === id);
}

export function getGuideById(id) {
  return KYNAR_DATA.guides.find(g => g.id === id);
}
