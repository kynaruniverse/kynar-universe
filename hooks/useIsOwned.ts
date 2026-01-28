import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

/**
 * Hook to verify if a user owns a specific product.
 * Essential for the "Calm Confidence" UX to prevent double-purchasing.
 */
export function useIsOwned(productId: string | undefined, userId: string | undefined) {
  const [isOwned, setIsOwned] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // If no user is logged in, they can't own anything yet
    if (!userId || !productId) {
      setIsOwned(false);
      setLoading(false);
      return;
    }

    const checkOwnership = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('purchases')
          .select('id')
          .eq('user_id', userId)
          .eq('product_id', productId)
          .maybeSingle(); // Better than .single() as it doesn't throw error if empty
        
        setIsOwned(!!data);
      } catch (err) {
        console.error('Ownership check failed:', err);
        setIsOwned(false);
      } finally {
        setLoading(false);
      }
    };

    checkOwnership();
  }, [productId, userId]);

  return { isOwned, loading };
}
