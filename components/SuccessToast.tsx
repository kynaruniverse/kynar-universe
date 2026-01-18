"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X, Sparkles } from "lucide-react";

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
          initial={{ opacity: 0, y: 40, scale: 0.9, x: "-50%" }}
          animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
          exit={{ opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 400 
          }}
          className="fixed bottom-10 left-1/2 z-[100] w-[90%] max-w-[340px] will-change-transform"
        >
          <div className="bg-white/60 backdrop-blur-3xl border border-white/60 p-4 rounded-[28px] shadow-glass flex items-center gap-4 relative overflow-hidden">
            
            {/* Animated Success Icon */}
            <motion.div 
              initial={{ rotate: -20, scale: 0.5 }}
              animate={{ rotate: 0, scale: 1 }}
              className="bg-home-accent/20 p-2.5 rounded-2xl text-primary-text shadow-inner"
            >
              <CheckCircle2 size={20} />
            </motion.div>

            {/* Text Content */}
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-black text-primary-text uppercase tracking-[0.2em]">
                  Added
                </p>
                <Sparkles size={10} className="text-home-accent animate-pulse" />
              </div>
              <p className="text-xs text-primary-text/50 font-serif italic truncate pr-2">
                {message}
              </p>
            </div>

            {/* Close Button */}
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-white/40 active:scale-90 rounded-full transition-all"
              aria-label="Close notification"
            >
              <X size={14} className="text-primary-text/20" />
            </button>

            {/* Kinetic Progress Bar (Thin & Elegant) */}
            <motion.div 
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 4, ease: "linear" }}
              onAnimationComplete={onClose}
              style={{ originX: 0 }}
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-home-accent/30"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
