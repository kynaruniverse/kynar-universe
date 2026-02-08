import { Home, Leaf, Wind, Sun, Cpu, Zap, Sparkles, ShieldCheck, Coffee, Hammer } from "lucide-react";
import { WorldConfig } from "@/components/worlds/WorldPage";

export const homeWorldConfig: WorldConfig = {
  metadata: {
    title: "Home World | Kynar Universe",
    description: "Curated tools for domestic order and personal sanctuary management.",
  },
  breadcrumbLabel: "Home World",
  breadcrumbHref: "/home",
  hero: {
    primaryIcon: Home,
    primaryIconClasses: "bg-kyn-green-50 border border-kyn-green-100 text-kyn-green-600",
    accentIcon: Leaf,
    accentIconClasses: "bg-white border border-border text-kyn-green-500",
    title: "The Home World",
    description: "A curated sector for the architecture of daily life. From domestic inventory to family legacy planning—tools built for permanence.",
  },
  grid: {
    icon: Sparkles,
    iconClasses: "text-kyn-green-600",
    sectionTitle: "The Collection",
    countLabel: "Assets Available",
  },
  emptyState: {
    icon: Sparkles,
    iconClasses: "text-kyn-slate-300",
    message: "The Home World is currently being harmonized.",
    subMessage: "New additions arriving soon.",
  },
  footer: {
    bgClasses: "bg-surface border-t border-border",
    icon: ShieldCheck,
    iconClasses: "bg-white border border-border text-kyn-green-600",
    title: "The Kynar Promise",
    quote: "\"We believe the digital foundation of your home should be as stable as the physical one. Every tool here is selected for its lack of noise and its commitment to your long-term autonomy.\"",
    quoteClasses: "italic",
  },
};

export const lifestyleWorldConfig: WorldConfig = {
  metadata: {
    title: "Lifestyle World | Kynar Universe",
    description: "Curated tools for elegant living and personal digital sophistication.",
  },
  breadcrumbLabel: "Lifestyle",
  breadcrumbHref: "/lifestyle",
  hero: {
    primaryIcon: Wind,
    primaryIconClasses: "bg-kyn-caramel-50 border border-kyn-caramel-100 text-kyn-caramel-600",
    accentIcon: Sun,
    accentIconClasses: "bg-white border border-border text-kyn-caramel-500",
    iconAnimation: "group-hover:rotate-12",
    title: "Lifestyle World",
    titleClasses: "italic",
    description: "A sector dedicated to the rituals of focus and well-being. Tools for those who treat their digital habits as an art form.",
  },
  grid: {
    icon: Coffee,
    iconClasses: "text-kyn-caramel-600",
    sectionTitle: "The Selection",
    countLabel: "Objects Harmonized",
  },
  emptyState: {
    icon: Sparkles,
    iconClasses: "text-kyn-caramel-300",
    message: "The Lifestyle sector is currently being refined.",
    subMessage: "New arrivals are being harmonized.",
    messageClasses: "italic",
  },
  footer: {
    bgClasses: "bg-kyn-caramel-50/30 border-t border-kyn-caramel-100",
    icon: ShieldCheck,
    iconClasses: "bg-white border border-border text-kyn-caramel-600",
    title: "\"Sophistication is found in what we choose to remove.\"",
    titleClasses: "italic",
    quote: "In the Lifestyle World, we prioritize digital objects that offer mental clarity and aesthetic joy. No clutter. No subscriptions. Just permanent, beautiful utility.",
  },
};

export const toolsWorldConfig: WorldConfig = {
  metadata: {
    title: "Tools World | Kynar Technical Hub",
    description: "High-performance digital assets engineered for speed and reliability.",
  },
  breadcrumbLabel: "Tools Sector",
  breadcrumbHref: "/tools",
  hero: {
    primaryIcon: Cpu,
    primaryIconClasses: "bg-kyn-slate-900 text-white",
    accentIcon: Zap,
    accentIconClasses: "bg-kyn-green-500 text-white border-2 border-canvas",
    title: "Tools World",
    titleClasses: "uppercase",
    description: "A technical sector for high-leverage components. Engineered for professionals who require architectural stability in their digital stack.",
  },
  grid: {
    icon: Hammer,
    iconClasses: "text-kyn-slate-400",
    sectionTitle: "Technical Repository",
    countLabel: "Assets Indexed",
  },
  emptyState: {
    icon: Sparkles,
    iconClasses: "text-kyn-slate-300",
    message: "The technical repository is currently being indexed.",
    subMessage: "",
    messageClasses: "italic",
  },
  footer: {
    bgClasses: "bg-kyn-slate-900 text-white rounded-t-[3rem] shadow-2xl",
    icon: ShieldCheck,
    iconClasses: "bg-kyn-slate-800 text-kyn-green-400 border border-kyn-slate-700",
    title: "Kynar Standards",
    titleClasses: "uppercase tracking-widest",
    quote: "\"Performance is the baseline. Autonomy is the goal.\"",
    quoteClasses: "text-kyn-slate-400 italic max-w-md mx-auto",
  },
};