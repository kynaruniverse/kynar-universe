'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = "", 
  ...props 
}: ButtonProps) {
  const baseStyles = "w-full py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 active:scale-[0.97] disabled:opacity-50";
  
  const variants = {
    primary: "bg-kyn-green-700 text-white shadow-xl shadow-kyn-green-700/10 hover:bg-kyn-green-600",
    secondary: "bg-white border border-kyn-slate-500/10 text-kyn-slate-500 hover:border-kyn-slate-500/30"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? "Processing..." : children}
    </button>
  );
}
