"use client";
import { useEffect, useState } from "react";
export const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) setProgress((window.scrollY / scrollHeight) * 100);
    };
    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);
  return (
    <div className="fixed bottom-0 left-0 h-1 bg-kyn-green-600 transition-all duration-150 z-50" 
         style={{ width: `${progress}%` }} />
  );
};
