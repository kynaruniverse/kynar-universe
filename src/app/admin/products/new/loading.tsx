import { Skeleton } from '@/shared/components/ui/Skeleton';

export default function NewProductLoading() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Skeleton className="h-12 w-64 rounded-xl" />
      <Skeleton className="h-[600px] rounded-3xl" />
    </div>
  );
}