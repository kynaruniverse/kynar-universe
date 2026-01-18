"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";
import SuccessToast from "./SuccessToast";

export default function SuccessToastWrapper() {
  const { showSuccess, setShowSuccess, lastAddedItem } = useCart();
  const pathname = usePathname();

  // 1. CONTEXTUAL SYNC: Reset on Navigation
  // Space is a luxury signal; we clear the UI before new page transitions.
  useEffect(() => {
    setShowSuccess(false);
  }, [pathname, setShowSuccess]);

  // 2. INTELLIGENCE ON DEMAND: Auto-Dismiss Logic
  // We use a 5-second window to allow the user to acknowledge the success
  // without feeling rushed, maintaining the "Quiet Luxury" pace.
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [showSuccess, setShowSuccess]);

  return (
    <div className="relative z-[200]">
      <SuccessToast 
        isVisible={showSuccess} 
        // Muse Engine Correction: Clean, editorial feedback
        message={`${lastAddedItem} has been added to your library.`} 
        onClose={() => setShowSuccess(false)} 
      />
    </div>
  );
}
