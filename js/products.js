/* js/products.js - KYNAR UNIVERSE PRODUCT DATABASE V2.7 (Unified Sync) */
const KynarDatabase = {
    // --- KYNAR FAMILY SECTOR ---
    "preschool-bundle": {
        title: "Ultimate Preschool Bundle",
        tagline: "Educational Logic for Early Years.",
        price: "£18",
        category: "Family",
        badgeType: "Printable",
        badgeLevel: "Ages 3-5",
        meta: "100+ PAGE_REGISTRY • INSTANT_DOWNLOAD",
        description: `
            <p>Eliminate screen fatigue with over 100 pages of educational logic. Designed by early-years specialists to develop motor skills, pattern recognition, and numeracy.</p>
            <p>Physical engagement for the modern household. Simply download, print, and initiate learning protocols.</p>
        `,
        image: "assets/images/product-family-1.jpg",
        lsLink: "https://kynar.lemonsqueezy.com/checkout/buy/PRESCHOOL_ID",
        files: ["Tracing_Pack.pdf", "Logic_Puzzles.pdf", "Counting_Games.pdf"],
        related: ["chore-system", "mood-journal"]
    },

    "chore-system": {
        title: "Household Chore System",
        tagline: "Systematize Responsibility.",
        price: "£6",
        category: "Family",
        badgeType: "Printable",
        badgeLevel: "Visual OS",
        meta: "Interactive Chart • Habit Builder",
        description: "<p>A visual command center for household tasks. Reward logic integrated to turn chores into habit-forming achievements.</p>",
        image: "assets/images/product-family-2.jpg",
        lsLink: "https://kynar.lemonsqueezy.com/checkout/buy/CHORE_ID",
        files: ["Chore_Chart.pdf", "Icon_Pack.pdf", "Instructions.pdf"],
        related: ["preschool-bundle", "meal-plan"]
    },

    // --- KYNAR LIFE SECTOR ---
    "life-os-planner": {
        title: "2026 Life OS Planner",
        tagline: "Master the 2026 Timeline.",
        price: "£12",
        category: "Life",
        badgeType: "Digital PDF",
        badgeLevel: "Hyperlinked",
        meta: "JAN_DEC 2026 • 450+ PAGES",
        description: `
            <p>The 2026 Life OS is a high-performance command center. Built with precision-engineered hyperlinked tabs for instantaneous navigation between yearly vision and daily execution.</p>
            <p>Optimized for iPad and Tablet users requiring a tactile, focused organization protocol.</p>
        `,
        image: "assets/images/product-life-1.jpg",
        lsLink: "https://kynar.lemonsqueezy.com/checkout/buy/PLANNER_ID",
        files: ["Life_OS_2026.pdf", "User_Guide.pdf"],
        related: ["finance-dashboard", "mood-journal"]
    },

    "finance-dashboard": {
        title: "Personal Finance Dashboard",
        tagline: "Wealth Management Protocol.",
        price: "£15",
        category: "Life",
        badgeType: "Spreadsheet",
        badgeLevel: "Automated",
        meta: "Excel / Google Sheets Compatible",
        description: "<p>A robust financial architecture to track assets, liabilities, and monthly cash flow. Automated formulas provide a real-time health check of your economy.</p>",
        image: "assets/images/product-life-2.jpg",
        lsLink: "https://kynar.lemonsqueezy.com/checkout/buy/FINANCE_ID",
        files: ["Finance_Dashboard.xlsx", "Documentation.pdf"],
        related: ["life-os-planner", "routine-architect"]
    },

    "mood-journal": {
        title: "Mood & Gratitude Journal",
        tagline: "Calibrate Clarity.",
        price: "£8",
        category: "Life",
        badgeType: "PDF",
        badgeLevel: "Wellness",
        meta: "Daily Reflection • Digital_Native",
        description: "<p>A minimalist interface for emotional data logging. Track daily intentions and long-term mental trends with zero clutter.</p>",
        image: "assets/images/product-life-4.jpg",
        lsLink: "https://kynar.lemonsqueezy.com/checkout/buy/MOOD_ID",
        files: ["Daily_Journal.pdf"],
        related: ["life-os-planner", "routine-architect"]
    },

    // --- KYNAR TECH SECTOR ---
    "auto-invoice": {
        title: "Auto-Invoice Generator",
        tagline: "Automated Billing Protocol.",
        price: "£24",
        category: "Tech",
        badgeType: "Python Script",
        badgeLevel: "Core Utility",
        meta: "VERSION 2.1 • CLI_OPTIMIZED",
        description: `
            <p>Eliminate administrative friction. This Python script parses local CSV timesheets, calculates totals, and generates professional PDF invoices in seconds.</p>
            <p>Engineered for developers and freelancers who prioritize work over paperwork.</p>
        `,
        image: "assets/images/product-tech-1.jpg",
        lsLink: "https://kynar.lemonsqueezy.com/checkout/buy/INVOICE_ID",
        files: ["generator.py", "config.json", "Setup_Guide.pdf"],
        related: ["desktop-cleaner", "bulk-resizer"]
    },

    "desktop-cleaner": {
        title: "Desktop Cleaner & Organizer",
        tagline: "Restore Workspace Order.",
        price: "£8",
        category: "Tech",
        badgeType: "Python",
        badgeLevel: "Utility",
        meta: "One-Click Cleanup • Cross_Platform",
        description: "<p>A high-speed utility script that categorizes and organizes cluttered directories instantly. Keep your dev environment pristine with a single command.</p>",
        image: "assets/images/product-tech-2.jpg",
        lsLink: "https://kynar.lemonsqueezy.com/checkout/buy/CLEANER_ID",
        files: ["cleaner.py", "rules.json"],
        related: ["auto-invoice", "bulk-resizer"]
    }
};
