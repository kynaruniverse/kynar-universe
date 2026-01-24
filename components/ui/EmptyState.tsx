import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
  variant?: 'default' | 'dashed';
  className?: string; // Added for layout flexibility
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  variant = 'default',
  className = '',
}: EmptyStateProps) {
  const borderClass = variant === 'dashed' 
    ? 'border-2 border-dashed' 
    : 'border';

  return (
    <div className={`
      text-center py-16 px-8 rounded-[2.5rem] 
      ${borderClass} border-kyn-slate-100 dark:border-kyn-slate-800 
      bg-surface/30 backdrop-blur-sm
      animate-in fade-in zoom-in-95 duration-500
      ${className}
    `}>
      {Icon && (
        <div className="bg-kyn-slate-50 dark:bg-kyn-slate-900 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
          <Icon 
            className="w-10 h-10 text-kyn-slate-300 dark:text-kyn-slate-600" 
            strokeWidth={1.5} 
            aria-hidden="true" 
          />
        </div>
      )}
      
      <h3 className="text-xl font-black text-primary tracking-tight mb-2 italic">
        {title}
      </h3>
      
      {description && (
        <p className="max-w-xs mx-auto text-sm text-kyn-slate-500 mb-8 leading-relaxed font-medium">
          {description}
        </p>
      )}
      
      {action && (
        <Link 
          href={action.href}
          className="
            inline-flex items-center justify-center
            bg-kyn-slate-950 dark:bg-white 
            text-white dark:text-kyn-slate-950 
            px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs
            shadow-xl shadow-kyn-slate-900/20 
            hover:scale-[1.02] active:scale-95 transition-all
          "
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
