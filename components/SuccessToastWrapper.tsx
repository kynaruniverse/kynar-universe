"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";
import SuccessToast from "./SuccessToast";

export default function SuccessToastWrapper() {
  const { showSuccess, setShowSuccess, lastAddedItem } = useCart();
  const pathname = usePathname();

  // 1. CLEANSE ON NAVIGATION
  // If a user jumps from Marketplace to Cart, we clear the toast 
  // to avoid overlapping with new page logic.
  useEffect(() => {
    setShowSuccess(false);
  }, [pathname, setShowSuccess]);

  // 2. AUTO-DISMISS FAILSAFE
  // While the component handles its own animation, this ensures 
  // the CartContext state is reset to "false" after the toast fades.
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 4500); // Slightly longer than the CSS animation for safety
      return () => clearTimeout(timer);
    }
  }, [showSuccess, setShowSuccess]);

  return (
    <div className="relative z-[100]">
      <SuccessToast 
        isVisible={showSuccess} 
        message={`${lastAddedItem} Successfully addedThe page you are looking for does not exist or has been moved.`} 
        onClose={() => setShowSuccess(false)} 
      />
    </div>
  );
}
