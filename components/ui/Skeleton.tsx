export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-md bg-kyn-slate-200 dark:bg-kyn-slate-700 ${className}`}
      {...props}
    />
  );
}
