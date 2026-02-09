"use client";

/**
 * KYNAR UNIVERSE: Overlay Wrapper
 * Role: Global overlay orchestration + escape handling.
 */

import { useEffect } from "react";
import { useUIStore } from "@/lib/store/ui";
import SelectionOverlay from "./SelectionOverlay";

export default function OverlayWrapper() {
  const {
    isSelectionOpen,
    isUserMenuOpen,
    closeSelection,
    closeAll,
  } = useUIStore();
  
  const isAnyOverlayOpen = isSelectionOpen || isUserMenuOpen;
  
  useEffect(() => {
    if (!isAnyOverlayOpen) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    
    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isAnyOverlayOpen, closeAll]);
  
  return (
    <SelectionOverlay
      isOpen={isSelectionOpen}
      onClose={closeSelection}
    />
  );
}