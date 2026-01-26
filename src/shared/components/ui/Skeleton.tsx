import React from 'react';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-kyn-slate-200 dark:bg-kyn-slate-800 ${className || ''}`}
      {...props}
    />
  );
}
