"use client";

import { useEffect } from "react";
import { triggerCelebration } from "@/lib/utils/confetti";

export function CelebrationTrigger() {
  useEffect(() => {
    // We provide x and y to satisfy the strict interface
    triggerCelebration({
      particleCount: 80,
      spread: 100,
      origin: { x: 0.5, y: 0.6 } 
    });
  }, []);
  
  return null; // This component renders nothing but runs the effect
}
