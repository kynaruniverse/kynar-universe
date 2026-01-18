"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";
import SuccessToast from "./SuccessToast";

export default function SuccessToastWrapper() {
  const { showSuccess, setShowSuccess, lastAddedItem } = useCart();
  const pathname = usePathname();

  // 1. NAVIGATION CLEANUP: Reset notification state on page change
  // Ensures the UI remains clean during page transitions.
  useEffect(() => {
    setShowSuccess(false);
  }, [pathname, setShowSuccess]);

  // 2. AUTO-DISMISS LOGIC: Timer for feedback visibility
  // Uses a 5-second window to provide the user enough time to read the 
  // confirmation before the toast automatically closes.
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
        // User Feedback: Standardized cart confirmation
        message={`${lastAddedItem} has been added to your cart.`} 
        onClose={() => setShowSuccess(false)} 
      />
    </div>
  );
}
