"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";

interface SuccessToastProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
}

export default function SuccessToast({ isVisible, message, onClose }: SuccessToastProps) {
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
          {/* 1. TACTILE SURFACE: A solid, grounded object */}
          <div className="bg-white p-5 rounded-card shadow-tactile flex items-center gap-6 relative overflow-hidden">
            
            {/* 2. MUSE ICONOGRAPHY: Refined feedback */}
            <motion.div 
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              className="bg-brand-accent/5 p-3 rounded-inner text-brand-accent flex-shrink-0"
            >
              <Check size={18} strokeWidth={2.5} />
            </motion.div>

            {/* 3. HUMANIST MICRO-COPY */}
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[9px] font-bold text-brand-text/30 uppercase tracking-[0.3em]">
                  Registry Update
                </span>
                <Sparkles size={10} className="text-accent-thermal opacity-60" />
              </div>
              <p className="font-body text-[13px] text-brand-text/70 font-medium leading-tight truncate">
                {message}
              </p>
            </div>

            {/* 4. TACTILE DISMISSAL */}
            <button 
              onClick={onClose} 
              className="p-2.5 hover:bg-brand-base rounded-full transition-colors duration-500 group"
              aria-label="Dismiss"
            >
              <X size={14} className="text-brand-text/10 group-hover:text-brand-text/30 transition-colors" />
            </button>

            {/* 5. LIQUID CHRONOGRAPH: Unhurried progress */}
            <motion.div 
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 5, ease: "linear" }}
              onAnimationComplete={onClose}
              style={{ originX: 0 }}
              className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-brand-accent/15"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
