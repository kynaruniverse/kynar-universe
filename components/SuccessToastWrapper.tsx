"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";
import SuccessToast from "./SuccessToast";

export default function SuccessToastWrapper() {
  const { showSuccess, setShowSuccess, lastAddedItem } = useCart();
  const pathname = usePathname();

  // SAFETY: If the user changes pages while a toast is active, 
  // we dismiss it to keep the "Universe" clean and focused.
  useEffect(() => {
    setShowSuccess(false);
  }, [pathname, setShowSuccess]);

  return (
    <SuccessToast 
      isVisible={showSuccess} 
      message={lastAddedItem} 
      onClose={() => setShowSuccess(false)} 
    />
  );
}
