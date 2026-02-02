/**
 * KYNAR UNIVERSE: Calm Copy Templates (v1.6)
 * Role: The Narrative Engine for the Marketplace.
 * Guidelines: Plain UK English, no hype, no exclamation marks.
 * Identity: Grounded, Utility-focused, Professional.
 */

export interface ProductTemplate {
  title: string;
  tagline: string;
  whoItsFor: string;
  included: string[];
  philosophy: string;
  howItHelps: string;
  usage: string;
}

export const KYNAR_COPY_LIBRARY: Record<string, ProductTemplate> = {
  HOME_ORGANISER: {
    title: "Digital Home Organiser",
    tagline: "A quiet space to coordinate your daily routines without the noise of typical productivity apps.",
    whoItsFor: "Designed for those who seek a simpler, more manual way to organise domestic life.",
    included: [
      "1 x Comprehensive PDF Guide (Print-ready)",
      "1 x Interactive Notion Template (Mobile-Optimised)",
      "Setup instructions for offline use",
      "Lifetime access to future versions"
    ],
    philosophy: "Digital life should support your physical reality, not distract from it. We avoid complex automations in favour of intentional, manual entry.",
    howItHelps: "By providing a fixed structure for your home data, it removes the 'blank page' anxiety of starting a new system. It focuses on clarity and calm retrieval.",
    usage: "Designed for a five-minute daily check-in. No notifications, no pressure. It works whenever you are ready."
  },
  
  BUDGET_TRACKER: {
    title: "Mindful Budget Tracker",
    tagline: "A grounded approach to managing personal finances with clarity and intentionality.",
    whoItsFor: "Built for creators who need a clear boundary between their spending and their mental rest.",
    included: [
      "1 x Financial Architecture Guide",
      "1 x Clean Ledger System (CSV-Ready)",
      "Quarterly reflection prompts",
      "Immutable ownership of the tool"
    ],
    philosophy: "Wealth is built through awareness, not algorithms. This tool requires manual entry to ensure you remain connected to your financial decisions.",
    howItHelps: "It strips away the complexity of modern banking apps to show you the truth of your cash flow without the 'gamified' distractions.",
    usage: "Update once a week or after major transactions. High-performance utility for long-term stability."
  },

  PROJECT_DASHBOARD: {
    title: "Project Clarity Dashboard",
    tagline: "A minimal framework for moving projects from initial thought to finished reality.",
    whoItsFor: "Ideal for independent professionals who want to track progress without the pressure of streaks.",
    included: [
      "1 x Project Sequencing Framework",
      "1 x Visual Progress Board",
      "Archive protocols for finished work",
      "Native mobile layout"
    ],
    philosophy: "Projects should have a beginning and an end. This dashboard treats your work as a series of intentional sequences rather than a never-ending 'to-do' list.",
    howItHelps: "It provides a 'Single Source of Truth' for your active work, reducing the mental load of switching between different tasks.",
    usage: "Check in at the start and end of your work session. Keep your focus narrow and your output high."
  }
};

/**
 * Helper to generate full markdown description for Product Pages.
 * Ensures hydration-safe rendering in prose components.
 */
export const generateFullDescription = (template: ProductTemplate): string => {
  return `
# Philosophy
${template.philosophy}

# How it helps
${template.howItHelps}

# Usage
${template.usage}
  `.trim();
};
