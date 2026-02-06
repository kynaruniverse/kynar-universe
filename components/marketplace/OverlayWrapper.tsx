"use client";

import { useEffect } from "react";
import { useUIStore } from "@/lib/store/ui";
import SelectionOverlay from "./SelectionOverlay";

export default function OverlayWrapper() {
  const { 
    isSelectionOpen, 
    closeSelection, 
    isUserMenuOpen, 
    closeAll 
  } = useUIStore();

  // Evolution: Global Keyboard Listener
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeAll();
      }
    };

    if (isSelectionOpen || isUserMenuOpen) {
      window.addEventListener("keydown", handleEscape);
      // Prevent background scrolling when any overlay is active
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isSelectionOpen, isUserMenuOpen, closeAll]);

  return (
    <>
      {/* SelectionOverlay handles the Cart/Marketplace drawer.
          Note: UserMenu is handled separately in root layout.tsx 
          to maintain the highest z-index and backdrop blur.
      */}
      <SelectionOverlay 
        isOpen={isSelectionOpen} 
        onClose={closeSelection} 
      />
      
      {/* If you eventually add more global overlays (Search, Notifications, etc.),
          they should be registered here to maintain a single source of truth.
      */}
    </>
  );
}
