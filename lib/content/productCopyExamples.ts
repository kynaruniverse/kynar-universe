/**
 * KYNAR UNIVERSE: Calm Copy Templates (v1.7)
 * Role: Narrative Engine for the Marketplace
 * Language: Plain UK English
 * Constraints: No hype, no exclamation marks
 */

export interface ProductTemplate {
  title: string;
  tagline: string;
  whoItsFor: string;
  included: readonly string[];
  philosophy: string;
  howItHelps: string;
  usage: string;
}

/* -------------------------------------------------------------------------- */
/* Internal helper to enforce template shape                                   */
/* -------------------------------------------------------------------------- */

const defineTemplate = <T extends ProductTemplate>(template: T) => template;

/* -------------------------------------------------------------------------- */
/* Copy Library                                                                */
/* -------------------------------------------------------------------------- */

export const KYNAR_COPY_LIBRARY = {
  HOME_ORGANISER: defineTemplate({
    title: "Digital Home Organiser",
    tagline:
      "A quiet space to coordinate your daily routines without the noise of typical productivity apps.",
    whoItsFor:
      "Designed for those who seek a simpler, more manual way to organise domestic life.",
    included: [
      "1 x Comprehensive PDF Guide (Print-ready)",
      "1 x Interactive Notion Template (Mobile-Optimised)",
      "Setup instructions for offline use",
      "Lifetime access to future versions",
    ],
    philosophy:
      "Digital life should support your physical reality, not distract from it. We avoid complex automations in favour of intentional, manual entry.",
    howItHelps:
      "By providing a fixed structure for your home data, it removes the 'blank page' anxiety of starting a new system. It focuses on clarity and calm retrieval.",
    usage:
      "Designed for a five-minute daily check-in. No notifications, no pressure. It works whenever you are ready.",
  }),

  BUDGET_TRACKER: defineTemplate({
    title: "Mindful Budget Tracker",
    tagline:
      "A stripped-back financial tool focused on awareness and long-term decisions.",
    whoItsFor:
      "Ideal for those who find automated banking apps overwhelming or 'gamified'.",
    included: [
      "1 x Excel/Sheets Budgeting Framework",
      "1 x Digital Guide on Manual Tracking",
      "Monthly review protocols",
      "Multi-currency support",
    ],
    philosophy:
      "When you track money manually, you feel the weight of your spending. This is a tool for awareness, not just math. It encourages slow, deliberate financial decisions.",
    howItHelps:
      "It strips away the complexity of modern banking apps to show you the truth of your cash flow without the 'gamified' distractions.",
    usage:
      "Update once a week or after major transactions. High-performance utility for long-term stability.",
  }),

  PROJECT_DASHBOARD: defineTemplate({
    title: "Project Clarity Dashboard",
    tagline:
      "A minimal framework for moving projects from initial thought to finished reality.",
    whoItsFor:
      "Ideal for independent professionals who want to track progress without the pressure of streaks.",
    included: [
      "1 x Project Sequencing Framework",
      "1 x Visual Progress Board",
      "Archive protocols for finished work",
      "Native mobile layout",
    ],
    philosophy:
      "Projects should have a beginning and an end. This dashboard treats your work as a series of intentional sequences rather than a never-ending 'to-do' list.",
    howItHelps:
      "It provides a single source of truth for your active work, reducing the mental load of switching between different tasks.",
    usage:
      "Check in at the start and end of your work session. Keep your focus narrow and your output high.",
  }),
} satisfies Record<string, ProductTemplate>;

/* -------------------------------------------------------------------------- */
/* Markdown Generation                                                         */
/* -------------------------------------------------------------------------- */

export function generateFullDescription(template: ProductTemplate): string {
  return [
    "# Philosophy",
    template.philosophy,
    "",
    "# How it helps",
    template.howItHelps,
    "",
    "# Usage",
    template.usage,
  ].join("\n");
}