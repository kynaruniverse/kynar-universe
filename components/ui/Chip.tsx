'use client';

/**
 * Unified Chip Component - Kynar Universe 2.0
 * Merged from tactile design and world-logic.
 * Supports both clickable filters and static badges.
 */

interface ChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void; // If provided, renders as a button; otherwise, a static badge
  world?: 'home' | 'lifestyle' | 'tools';
  className?: string;
}

export default function Chip({ label, active, onClick, world, className = "" }: ChipProps) {
  const worldAccents = {
    home: 'bg-kyn-green-500',
    lifestyle: 'bg-kyn-caramel-500',
    tools: 'bg-kyn-slate-500',
    default: 'bg-kyn-green-700' 
  };

  const accentColor = world ? worldAccents[world] : worldAccents.default;

  const baseStyles = `
    px-5 py-2 rounded-full border text-[10px] uppercase tracking-widest font-bold 
    transition-all duration-300 whitespace-nowrap inline-flex items-center justify-center
    ${className}
  `;

  const stateStyles = active 
    ? `${accentColor} border-transparent text-white shadow-md scale-105` 
    : 'bg-white border-kyn-slate-500/10 text-kyn-slate-400 hover:border-kyn-slate-500/30';

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${baseStyles} ${stateStyles} active:scale-95`}
      >
        {label}
      </button>
    );
  }

  return (
    <span className={`${baseStyles} ${accentColor} text-white border-transparent`}>
      {label}
    </span>
  );
}
