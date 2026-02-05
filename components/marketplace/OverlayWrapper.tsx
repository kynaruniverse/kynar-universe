"use client";

import { useUIStore } from "@/lib/store/ui";
import SelectionOverlay from "./SelectionOverlay";

export default function OverlayWrapper() {
  const { isSelectionOpen, closeSelection } = useUIStore();
  return <SelectionOverlay isOpen={isSelectionOpen} onClose={closeSelection} />;
}
