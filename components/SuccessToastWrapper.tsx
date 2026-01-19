"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";
import SuccessToast from "./SuccessToast";

export default function SuccessToastWrapper() {
  // Added lastAddedCategory from our CartContext
  const { showSuccess, setShowSuccess, lastAddedItem, lastAddedCategory } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    setShowSuccess(false);
  }, [pathname, setShowSuccess]);

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
        message={`${lastAddedItem} has been added to your cart.`} 
        // Pass the category to trigger the Green, Lavender, or Thermal branding
        category={lastAddedCategory} 
        onClose={() => setShowSuccess(false)} 
      />
    </div>
  );
}
