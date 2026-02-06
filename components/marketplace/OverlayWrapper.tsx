"use client";

import { useEffect } from "react";
import { useUIStore } from "@/lib/store/ui";
import SelectionOverlay from "./SelectionOverlay";

export default function OverlayWrapper() {
  const isSelectionOpen = useUIStore((state) => state.isSelectionOpen);
  const isUserMenuOpen = useUIStore((state) => state.isUserMenuOpen);
  const closeSelection = useUIStore((state) => state.closeSelection);
  const closeAll = useUIStore((state) => state.closeAll);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeAll();
      }
    };

    if (isSelectionOpen || isUserMenuOpen) {
      window.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      // Fixed: Setting to empty string is safer for CSS inheritance
      document.body.style.overflow = "";
    };
  }, [isSelectionOpen, isUserMenuOpen, closeAll]);

  return (
    <>
      <SelectionOverlay 
        isOpen={isSelectionOpen} 
        onClose={closeSelection} 
      />
    </>
  );
}
