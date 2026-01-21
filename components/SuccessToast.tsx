"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";
import { getCategoryTheme } from "../lib/theme";

interface SuccessToastProps {
  isVisible: boolean;
  message: string;
  category?: string;
  onClose: () => void;
}

export default function SuccessToast({ isVisible, message, category, onClose }: SuccessToastProps) {
  const theme = getCategoryTheme(category);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96, x: "-50%" }}
          animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
          exit={{ opacity: 0, scale: 0.98, y: 12, transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } }}
          transition={{ 
            type: "spring", 
            damping: 32, 
            stiffness: 280 
          }}
          className="fixed bottom-10 left-1/2 z-[250] w-[94%] max-w-[380px] will-change-transform"
        >
          <div className="bg-white p-5 rounded-card shadow-tactile flex items-center gap-6 relative overflow-hidden">
            
            {/* STATUS ICON */}
            <motion.div 
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              className={`${theme.lightBg} p-3 rounded-inner ${theme.text} flex-shrink-0`}
            >
              <Check size={18} strokeWidth={2.5} />
            </motion.div>

            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[9px] font-bold text-brand-text/30 uppercase tracking-[0.3em]">
                  {theme.label} Added
                </span>
                <Sparkles size={10} className={`${theme.text} opacity-60`} />
              </div>
              <p className="font-body text-[13px] text-brand-text/70 font-medium leading-tight truncate">
                {message}
              </p>
            </div>

            <button 
              onClick={onClose} 
              className="p-2.5 hover:bg-brand-base rounded-full transition-colors duration-base group"
              aria-label="Dismiss"
            >
              <X size={14} className="text-brand-text/10 group-hover:text-brand-text/30 transition-colors" />
            </button>

            {/* ✅ FIX: Duration reduced to 3s to match AppProvider timeout */}
            <motion.div 
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 3, ease: "linear" }}
              onAnimationComplete={onClose}
              style={{ originX: 0 }}
              className={`absolute bottom-0 left-0 right-0 h-[2.5px] ${theme.bg} opacity-20`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
