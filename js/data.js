/* KYNAR UNIVERSE DATA ENGINE (js/data.js)
   Source of Truth for the Digital Department Store.
   Status: FINAL MASTER (Aligned with Grand Vision & Elevator Pitch)
*/

export const KYNAR_DATA = {
  
  // =========================================
  // 1. PRODUCT CATALOGUE (The Inventory)
  // =========================================
  products: [
    
    // --- DEPARTMENT: KYNAR TOOLS (Developers & Entrepreneurs) ---
    {
      id: "python-automation-bundle",
      category: "tools",
      subCategory: "Automation",
      title: "Python Workflow Automator",
      price: 15.00,
      tag: "Production-Ready Script",
      shortDesc: "Automate your file management and data entry tasks instantly.",
      lore: "Blueprints for your best work.",
      description: "Stop wasting time on repetitive tasks. This verified Python bundle watches your directories, sorts files automatically, and cleans up digital clutter. Deployment takes less than 2 minutes.",
      features: [
        "Auto-Sort Downloads Folder",
        "Bulk File Renamer Script",
        "PDF Text Extractor",
        "Config.yaml for Custom Rules"
      ],
      // Technical Specs for the "Specification Sheet"
      specs: {
        format: "Python (.py)",
        version: "v2.4 (Stable)",
        os: "Windows / macOS / Linux"
      },
      // Code Preview for the "Tech Specs" card
      codePreview: `import os
import shutil

# KYNAR AUTOMATION PROTOCOL
def organize_directory():
    print("Initiating sort sequence...")
    for filename in os.listdir(DOWNLOADS):
        if filename.endswith(".pdf"):
            shutil.move(filename, DOCS_DIR)
            print(f"Moved: {filename}")`,
      
      actionBtn: "Secure Instant Download",
      previewIcon: "ph-code",
      image: "assets/products/script-preview.png"
    },
    {
      id: "business-intelligence",
      category: "tools",
      subCategory: "Business",
      title: "Startup Financial Model",
      price: 25.00,
      tag: "Business Intelligence",
      shortDesc: "A master spreadsheet for forecasting revenue and runway.",
      lore: "Data is clarity.",
      description: "Don't guess your growth. This pre-built financial model helps entrepreneurs track burn rate, project revenue, and secure funding.",
      features: [
        "Revenue Forecasting Tab",
        "Expense Categorization",
        "Investor Dashboard View",
        "Google Sheets / Excel"
      ],
      specs: {
        format: "XLSX / G-Sheets",
        version: "2025 Edition",
        license: "Commercial Use"
      },
      actionBtn: "Download Template",
      previewIcon: "ph-chart-bar",
      image: "assets/products/finance-sheet.png"
    },
    
    {
      id: "creative-assets",
      category: "tools",
      subCategory: "Design",
      title: "Creator Asset Pack",
      price: 18.00,
      tag: "Design Assets",
      shortDesc: "High-fidelity textures, fonts, and icons for UI design.",
      lore: "Shape your reality.",
      description: "A curated collection of dark-mode UI elements, noisy gradients, and glass-morphism textures. Perfect for building interfaces that feel alive.",
      features: [
        "20+ High-Res Textures",
        "Figma Component Library",
        "Custom Icon Set (SVG)",
        "Commercial License"
      ],
      specs: {
        format: "Figma / PNG / SVG",
        size: "1.2 GB",
        license: "Commercial Use"
      },
      actionBtn: "Download Assets",
      previewIcon: "ph-paint-brush-broad", // This was referenced in your HTML icon
      image: "assets/products/creative.png"
    },
    

    // --- DEPARTMENT: KYNAR LIVING (High Performers) ---
    {
      id: "finance-tracker",
      category: "living",
      subCategory: "Finance",
      title: "LifeOS Finance Tracker",
      price: 12.00,
      tag: "System",
      shortDesc: "Bring clarity to your daily chaos with zero-based budgeting.",
      lore: "Maps for inner growth.",
      description: "Where does your money go? This high-performance dashboard gives you a clear view of your net worth, monthly spending, and savings goals. No complex setup required.",
      features: [
        "Zero-Based Budgeting Layout",
        "Debt Payoff Calculator",
        "Subscription Auditor",
        "Visual Spending Graphs"
      ],
      specs: {
        format: "Digital Spreadsheet",
        compatibility: "Mobile & Desktop",
        license: "Personal Use"
      },
      actionBtn: "Get Dashboard",
      previewIcon: "ph-currency-dollar",
      image: "assets/products/finance-tracker.png"
    },
    {
      id: "morning-mindset-journal",
      category: "living",
      subCategory: "Wellness",
      title: "The Clarity Journal",
      price: 8.00,
      tag: "Wellness",
      shortDesc: "A 5-minute protocol to set a calm tone for the day.",
      lore: "Quiet clarity in a noisy world.",
      description: "This isn't just a diary. It's a structured cognitive framework to declutter your mind before you start work. Print it out or use it on your tablet.",
      features: [
        "Daily Intention Setting",
        "Gratitude Framework",
        "Brain Dump Section",
        "Printable PDF (A4/Letter)"
      ],
      specs: {
        format: "Interactive PDF",
        pages: "120 Pages",
        license: "Personal Use"
      },
      actionBtn: "Download Journal",
      previewIcon: "ph-sun",
      image: "assets/products/journal.png"
    },

    // --- DEPARTMENT: KYNAR HOME (Parents & Families) ---
    {
      id: "kids-bundles",
      category: "home",
      subCategory: "Education",
      title: "Rainy-Day Activity Pack",
      price: 6.00,
      tag: "Family",
      shortDesc: "Educational printables to keep toddlers engaged and learning.",
      lore: "Foundations for a calm home.",
      description: "Stuck inside? Print these vetted activity sheets to turn boredom into learning. Covers basic math, coloring, and logic puzzles for ages 4-6.",
      features: [
        "15 Math Logic Puzzles",
        "Creative Coloring Sheets",
        "Scavenger Hunt Template",
        "Parent Guide Included"
      ],
      specs: {
        format: "Print-Ready PDF",
        ageGroup: "4-7 Years",
        license: "Household Use"
      },
      actionBtn: "Download Bundle",
      previewIcon: "ph-smiley-sticker",
      image: "assets/products/kids-pack.png"
    },
    {
      id: "home-management",
      category: "home",
      subCategory: "Management",
      title: "Family Command Center",
      price: 10.00,
      tag: "Management",
      shortDesc: "Meal planners and chore charts for busy households.",
      lore: "Order brings peace.",
      description: "Run your home like a well-oiled machine. This bundle includes meal planners, cleaning schedules, and important contact sheets to keep the whole family on the same page.",
      features: [
        "Weekly Meal Planner",
        "Chore Delegation Chart",
        "Grocery Master List",
        "Emergency Info Sheet"
      ],
      specs: {
        format: "PDF / Notion Template",
        version: "v1.0",
        license: "Household Use"
      },
      actionBtn: "Get Organized",
      previewIcon: "ph-house",
      image: "assets/products/home-org.png"
    }
  ],

  // =========================================
  // 2. KNOWLEDGE LIBRARY (The Hub)
  // =========================================
  guides: [
    {
      id: "start-journaling",
      title: "Protocol: Habit Formation",
      category: "hub",
      date: "Verified Guide",
      readTime: "3 min read",
      shortDesc: "How to build a journaling habit that actually sticks.",
      content: `
        <h2 class="text-h2">The 2-Minute Rule</h2>
        <p class="text-body">Most habits fail because they are too big. Your goal is not to write a novel. It is to open the notebook.</p>
        <br>
        <h2 class="text-h2">Environment Design</h2>
        <p class="text-body">Place your Kynar Journal on your pillow every morning. Visual cues trigger action. We reject complexity.</p>
      `
    },
    {
      id: "calm-morning-routine",
      title: "Protocol: The First Hour",
      category: "hub",
      date: "Verified Guide",
      readTime: "5 min read",
      shortDesc: "Reclaiming your morning from digital noise.",
      content: `
        <h2 class="text-h2">Input Deprivation</h2>
        <p class="text-body">Do not check email for the first 60 minutes. This preserves your cognitive baseline for high-value work.</p>
        <br>
        <h2 class="text-h2">The Review</h2>
        <p class="text-body">Use the Daily Clarity Planner to map your three primary objectives before the chaos begins.</p>
      `
    }
  ],

  // =========================================
  // 3. WHISPERS (The Lore)
  // =========================================
  lore: {
    tools: [
      "Every tool is a spark.",
      "Blueprints for the builders.",
      "Optimize your reality."
    ],
    living: [
      "Clarity is a weapon.",
      "Maps for inner growth.",
      "Silence the noise."
    ],
    home: [
      "Foundations of peace.",
      "A space for what matters.",
      "Warmth in the details."
    ],
    general: [
      "One Universe. Infinite Solutions.",
      "No digital filler.",
      "Download your upgrade."
    ]
  }
};

/* HELPER FUNCTIONS */
export function getProductById(id) {
  return KYNAR_DATA.products.find(p => p.id === id);
}

export function getGuideById(id) {
  return KYNAR_DATA.guides.find(g => g.id === id);
}
