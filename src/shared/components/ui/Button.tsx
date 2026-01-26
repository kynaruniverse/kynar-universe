import { cn } from "@/shared/utils/formatting"; // Ensure you move your cn helper if you have one
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-green-600 text-white hover:bg-green-700',
      secondary: 'bg-slate-800 text-white hover:bg-slate-900',
      ghost: 'bg-transparent hover:bg-slate-100 text-slate-600',
      outline: 'border border-slate-200 hover:bg-slate-50 text-slate-600',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50',
          variants[variant],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? <span className="mr-2 animate-spin">⏳</span> : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
