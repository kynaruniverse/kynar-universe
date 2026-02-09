"use client";

/**
 * KYNAR UNIVERSE: Celebration Trigger
 * Role: Fire a one-shot celebration effect on mount.
 */

import { useEffect } from "react";
import { triggerCelebration } from "@/lib/utils/celebration";

export function CelebrationTrigger() {
  useEffect(() => {
    triggerCelebration({
      particleCount: 80,
      spread: 100,
      origin: {
        x: 0.5,
        y: 0.6,
      },
    });
  }, []);
  
  return null;
}