/* ══════════════════════════════════════════════════════════════════════════
   THE KYNAR VAULT (UK Edition)
   Currency: GBP (£)
   ══════════════════════════════════════════════════════════════════════════ */

const VAULT = [
    {
        id: 'universe-os',
        category: 'planner',
        title: "Universe OS",
        price: "£29.00",
        tag: "Notion",
        desc: "The complete life operating system. Organize projects, habits, and finances in one unified dashboard.",
        features: ["All-in-one Dashboard", "Financial Tracker 2.0", "Mobile Optimized", "Lifetime Updates"],
        bg: "var(--pastel-sage)",
        image: "assets/images/planner-mockup.png",
        checkout: "https://store.kynaruniverse.com/checkout/buy/VARIANT-ID-1"
    },
    {
        id: 'creator-bundle',
        category: 'creative',
        title: "Creator Bundle",
        price: "£45.00",
        tag: "Assets",
        desc: "A massive library of 200+ high-resolution textures, gradients, and mockups for modern creators.",
        features: ["4K Textures", "PSD Mockups", "Commercial License", "Figma Files"],
        bg: "var(--pastel-clay)",
        image: "assets/images/creative-mockup.png",
        checkout: "https://store.kynaruniverse.com/checkout/buy/VARIANT-ID-2"
    },
    {
        id: 'saas-starter',
        category: 'code',
        title: "SaaS Starter",
        price: "£69.00",
        tag: "Next.js",
        desc: "Stop rebuilding auth and payments. The ultimate boilerplate for founders who want to ship fast.",
        features: ["Next.js 14 App Router", "Supabase Auth", "Stripe Integration", "SEO Optimized"],
        bg: "var(--pastel-sky)",
        image: "assets/images/code-mockup.png",
        checkout: "https://store.kynaruniverse.com/checkout/buy/VARIANT-ID-3"
    },
    {
        id: 'finance-tracker',
        category: 'planner',
        title: "Finance Tracker",
        price: "£15.00",
        tag: "Sheets",
        desc: "Automated Google Sheets template to track income, expenses, and investments visually.",
        features: ["Auto-categorization", "Investment Portfolio", "Monthly Reports", "Video Guide"],
        bg: "var(--pastel-sage)",
        image: "assets/images/finance-mockup.png",
        checkout: "https://store.kynaruniverse.com/checkout/buy/VARIANT-ID-4"
    }
];

// UTILITY: Fetch product by ID
function getProduct(id) {
    return VAULT.find(p => p.id === id);
}
