import { type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface StatePageLayoutProps {
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  title: ReactNode;
  description: string;
  primaryAction: {
    label: string;
    icon: LucideIcon;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  children?: ReactNode; // For additional content like CelebrationTrigger
}

export function StatePageLayout({
  icon: Icon,
  iconColor,
  iconBgColor,
  title,
  description,
  primaryAction,
  secondaryAction,
  children,
}: StatePageLayoutProps) {
  const PrimaryIcon = primaryAction.icon;

  return (
    <main className="min-h-[90vh] flex flex-col items-center justify-center bg-canvas px-gutter">
      {children}

      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <div className={`mx-auto h-24 w-24 rounded-[2rem] ${iconBgColor} flex items-center justify-center ${iconColor}`}>
          <Icon size={48} strokeWidth={1.5} />
        </div>

        <div className="space-y-4">
          <h1 className="font-brand text-4xl font-bold text-kyn-slate-900 tracking-tight">
            {title}
          </h1>
          <p className="font-ui text-base text-text-secondary leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-4">
          {primaryAction.href ? (
            <a 
              href={primaryAction.href}
              className="flex items-center justify-center gap-3 w-full py-5 bg-kyn-slate-900 text-white rounded-2xl font-brand text-sm font-black uppercase tracking-widest hover:bg-black transition-all active:scale-[0.98]"
            >
              <PrimaryIcon size={18} />
              {primaryAction.label}
            </a>
          ) : (
            <button
              onClick={primaryAction.onClick}
              className="flex items-center justify-center gap-3 w-full py-5 bg-kyn-slate-900 text-white rounded-2xl font-brand text-sm font-black uppercase tracking-widest hover:bg-black transition-all active:scale-[0.98]"
            >
              <PrimaryIcon size={18} />
              {primaryAction.label}
            </button>
          )}
          
          {secondaryAction && (
            <a 
              href={secondaryAction.href}
              className="font-brand text-[10px] font-bold uppercase tracking-[0.2em] text-kyn-slate-400 hover:text-kyn-slate-900 transition-colors"
            >
              {secondaryAction.label}
            </a>
          )}
        </div>
      </div>
    </main>
  );
}