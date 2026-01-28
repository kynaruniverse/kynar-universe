/**
 * SkeletonCard Component
 * Aligned with Visual Guide 11.2: Skeleton screens with shimmer effect.
 */
export const SkeletonCard = () => (
  <div className="bg-white dark:bg-kyn-slate-900 border border-kyn-slate-100 dark:border-kyn-slate-800 rounded-kyn p-4 overflow-hidden">
    {/* Image Placeholder with Shimmer */}
    <div className="shimmer aspect-square w-full bg-kyn-slate-100 dark:bg-kyn-slate-800 rounded-2xl mb-4"></div>
    
    {/* Title Placeholder */}
    <div className="shimmer h-5 w-3/4 bg-kyn-slate-100 dark:bg-kyn-slate-800 rounded-lg mb-3"></div>
    
    {/* Price/Subtitle Placeholder */}
    <div className="shimmer h-4 w-1/4 bg-kyn-slate-50 dark:bg-kyn-slate-800 rounded-lg"></div>
  </div>
);
