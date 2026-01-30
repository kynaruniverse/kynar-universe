'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  accentColor?: string; // Optional top-border accent
}

export default function Card({ children, className = "", onClick, accentColor }: CardProps) {
  return (
    <div 
      onClick={onClick}
      className={`
        relative overflow-hidden bg-white border border-kyn-slate-500/10 
        rounded-[32px] transition-all duration-500 ease-out
        active:scale-[0.98] shadow-sm ${className}
      `}
    >
      {accentColor && (
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${accentColor} opacity-80`} />
      )}
      {children}
    </div>
  );
}
