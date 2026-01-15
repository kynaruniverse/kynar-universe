/* KYNAR DATA CORE (js/data.js)
   Status: FINAL (Standardized Schema)
*/

export const KYNAR_DATA = {
  products: [
    /* --- HOME CATEGORY --- */
    {
      id: 'h-01',
      title: 'Sanctuary OS',
      category: 'home',
      subCategory: 'Notion System',
      price: 24.00,
      status: 'available',
      previewIcon: 'ph-house-line',
      shortDesc: 'The ultimate dashboard for managing your living space, chores, and maintenance.',
      description: 'Sanctuary OS turns your home maintenance into a self-driving system. Track warranties, schedule repairs, and manage household chores with a beautiful, dark-mode Notion dashboard.',
      lore: 'For those who treat their environment as an extension of their mind.',
      features: ['Automated Chore Scheduling', 'Warranty Vault', 'Plant Care Tracker', 'Utility Cost Analysis'],
      image: 'assets/products/sanctuary-preview.jpg',
      specs: { format: 'Notion Template', version: '2.4.0', size: '12MB' }
    },
    {
      id: 'h-02',
      title: 'Finance Flow',
      category: 'home',
      subCategory: 'Finance',
      price: 18.00,
      status: 'available',
      previewIcon: 'ph-currency-gbp',
      shortDesc: 'Zero-friction expense tracking and budget visualization.',
      description: 'Stop wrestling with spreadsheets. Finance Flow provides a visual, intuitive interface for tracking income, expenses, and subscription audits.',
      lore: 'Clarity in finance leads to clarity in life.',
      features: ['Subscription Audit', 'Monthly Burn Rate', 'Income Streams', 'Tax Estimator'],
      image: 'assets/products/finance-preview.jpg'
    },

    /* --- LIFE CATEGORY --- */
    {
      id: 'l-01',
      title: 'Odyssey Journal',
      category: 'life',
      subCategory: 'Wellness',
      price: 12.00,
      status: 'available',
      previewIcon: 'ph-compass',
      shortDesc: 'A stoic journaling system for documenting your personal evolution.',
      description: 'Based on Stoic principles, the Odyssey Journal helps you process daily events, track habits, and visualize your personal growth over years, not just days.',
      lore: 'The unexamined life is not worth recording.',
      features: ['Daily Stoic Prompts', 'Mood Heatmap', 'Habit Streaks', 'Annual Review Template'],
      image: 'assets/products/journal-preview.jpg'
    },
    {
      id: 'l-02',
      title: 'Vitals Health',
      category: 'life',
      subCategory: 'Health',
      price: 15.00,
      status: 'upcoming',
      previewIcon: 'ph-heart-beat',
      shortDesc: 'Aggregated health metrics dashboard connecting fitness and nutrition.',
      description: 'Centralize your health data. Track workouts, meal macros, and sleep cycles in one unified interface designed for high-performers.',
      lore: 'Your biological machinery requires precision tuning.',
      features: ['Workout Logs', 'Macro Calculator', 'Sleep Analysis', 'Supplement Stack'],
      image: 'assets/products/vitals-preview.jpg'
    },

    /* --- TOOLS CATEGORY --- */
    {
      id: 't-01',
      title: 'DevStack UI',
      category: 'tools',
      subCategory: 'Code',
      price: 45.00,
      status: 'available',
      previewIcon: 'ph-code',
      shortDesc: 'A library of copy-paste Tailwind & Alpine.js components.',
      description: 'Ship faster with 50+ pre-built components. Fully accessible, dark-mode ready, and optimized for minimal bundle size.',
      lore: 'Do not reinvent the wheel. Reinvent the vehicle.',
      features: ['50+ Components', 'Tailwind Ready', 'Accessibility Tested', 'Figma Files Included'],
      image: 'assets/products/devstack-preview.jpg',
      codePreview: '<div class="card p-6 bg-surface">\n  <h2 class="text-xl font-bold">Deploy</h2>\n  <button class="btn-primary mt-4">Push</button>\n</div>'
    },
    {
      id: 't-02',
      title: 'Creator CRM',
      category: 'tools',
      subCategory: 'Productivity',
      price: 29.00,
      status: 'available',
      previewIcon: 'ph-users',
      shortDesc: 'Manage sponsorships, collaborations, and client pipelines.',
      description: 'The CRM designed for the creator economy. Track deal stages, manage deliverables, and ensure you never miss a payout.',
      lore: 'Relationships are your most valuable asset class.',
      features: ['Deal Pipeline', 'Invoice Generator', 'Contact Sync', 'Deliverable Calendar'],
      image: 'assets/products/crm-preview.jpg'
    }
  ],
  
  guides: [
    {
      id: 'g-01',
      title: 'The Automation Mindset',
      category: 'philosophy',
      readTime: '5 min read',
      previewIcon: 'ph-brain'
    },
    {
      id: 'g-02',
      title: 'Setting up Supabase',
      category: 'technical',
      readTime: '12 min read',
      previewIcon: 'ph-database'
    }
  ]
};

// --- DATA ACCESSORS ---

export function getProductById(id) {
  return KYNAR_DATA.products.find(p => p.id === id);
}

export function getProductsByCategory(category) {
  if (category === 'all') return KYNAR_DATA.products;
  return KYNAR_DATA.products.filter(p => p.category === category);
}

export function searchUniverse(term) {
  const t = term.toLowerCase();
  return [
    ...KYNAR_DATA.products.filter(p => p.title.toLowerCase().includes(t)),
    ...KYNAR_DATA.guides.filter(g => g.title.toLowerCase().includes(t))
  ];
}
