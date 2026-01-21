/**
 * CATEGORY THEMES
 * Centralized mapping of marketplace categories to Tailwind classes
 */

export const CATEGORY_THEMES = {
  Tools: {
    label: "Productivity",
    sublabel: "Tools & Efficiency",
    text: "text-brand-accent",
    bg: "bg-brand-accent",
    border: "border-brand-accent",
    lightBg: "bg-brand-accent/5",
  },
  Life: {
    label: "Creative",
    sublabel: "Design & Creation",
    text: "text-accent-lavender",
    bg: "bg-accent-lavender",
    border: "border-accent-lavender",
    lightBg: "bg-accent-lavender/5",
  },
  Home: {
    label: "Learning",
    sublabel: "Growth & Lifestyle",
    text: "text-accent-thermal",
    bg: "bg-accent-thermal",
    border: "border-accent-thermal",
    lightBg: "bg-accent-thermal/5",
  },
  Default: {
    label: "Digital",
    sublabel: "All Products",
    text: "text-brand-text/30",
    bg: "bg-brand-text/10",
    border: "border-brand-surface/20",
    lightBg: "bg-brand-surface/5",
  },
};

/**
 * Get theme by category
 * @param {string} category - The category for which to get the theme
 * @returns {object} The theme object corresponding to the category
 */
export const getCategoryTheme = (category: keyof typeof CATEGORY_THEMES = "Default") => {
  return CATEGORY_THEMES[category] || CATEGORY_THEMES.Default;
};