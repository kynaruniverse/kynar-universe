"use client";

import { useEffect, useState } from "react";

export const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Skip server-side rendering
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setProgress(Math.min(Math.max(scrolled, 0), 100)); // Clamp 0-100
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial progress check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 h-1 bg-kyn-green-600 transition-all duration-150 z-50"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
};