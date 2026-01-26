import { Skeleton } from "@/shared/components/ui/Skeleton";
export function PageHeaderSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-10 w-48 rounded-xl" />
      <Skeleton className="h-4 w-64 rounded-lg" />
    </div>
  );
}