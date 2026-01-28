"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

/**
 * Hook to verify if a user owns a specific product.
 * Essential for the "Calm Confidence" UX to prevent double-purchasing.
 * Aligned with Database Schema: table 'purchases'
 */
export function useIsOwned(productId: string | undefined, userId: string | undefined) {
  const [isOwned, setIsOwned] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Logic Gate: No user or ID means no ownership
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
          .maybeSingle(); 
        
        // Convert record presence to boolean
        setIsOwned(!!data && !error);
      } catch (err) {
        // Diagnostic Fix: Silence error logs for simple "not found" results in production
        setIsOwned(false);
      } finally {
        setLoading(false);
      }
    };

    checkOwnership();
  }, [productId, userId]);

  return { isOwned, loading };
}
