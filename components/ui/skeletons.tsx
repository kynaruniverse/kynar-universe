/**
 * KYNAR UNIVERSE: Skeleton Primitives (v1.1)
 * Role: Reusable loading-state surfaces
 */

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className ? : string;
}

/* ───────────── Base Primitive ───────────── */

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "animate-pulse rounded-md bg-kyn-slate-100/80",
        className
      )}
    />
  );
}

/* ───────────── Text Variants ───────────── */

export const SkeletonText = ({ className }: SkeletonProps) => (
  <Skeleton className={cn("h-4 w-full", className)} />
);

export const SkeletonHeading = ({ className }: SkeletonProps) => (
  <Skeleton className={cn("h-8 w-3/4", className)} />
);

/* ───────────── Shape Variants ───────────── */

export const SkeletonCircle = ({ className }: SkeletonProps) => (
  <Skeleton className={cn("h-12 w-12 rounded-full", className)} />
);

/* ───────────── Composite Surfaces ───────────── */

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[2rem] border border-border bg-white",
        className
      )}
    >
      <Skeleton className="aspect-[16/10] w-full" />

      <div className="space-y-6 p-8">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-6 w-12" />
          </div>

          <SkeletonText />
          <SkeletonText className="w-4/5" />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-2">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-10" />
          </div>

          <Skeleton className="h-10 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/* ───────────── Layout Helpers ───────────── */

interface SkeletonGridProps {
  count ? : number;
}

export function SkeletonProductGrid({ count = 6 }: SkeletonGridProps) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}