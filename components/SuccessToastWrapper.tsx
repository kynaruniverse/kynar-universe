"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
// ✅ Import from unified AppProvider
import { useCart } from "../context/AppProvider";
import SuccessToast from "./SuccessToast";

export default function SuccessToastWrapper() {
  // ✅ Destructure dismissToast
  const { showSuccess, lastAddedItem, lastAddedCategory, dismissToast } = useCart();
  const pathname = usePathname();

  // Optional: Dismiss toast on navigation
  useEffect(() => {
    dismissToast();
  }, [pathname, dismissToast]);

  return (
    <div className="relative z-[200]">
      <SuccessToast 
        isVisible={showSuccess} 
        message={`${lastAddedItem} has been added to your cart.`} 
        category={lastAddedCategory}
        // ✅ Manual close now works
        onClose={dismissToast} 
      />
    </div>
  );
}
