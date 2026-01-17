"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

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
          initial={{ opacity: 0, y: 100, scale: 0.9, x: "-50%" }}
          animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 300 
          }}
          className="fixed bottom-10 left-1/2 z-[100] w-[92%] max-w-[380px] will-change-transform"
        >
          <div className="bg-white/70 backdrop-blur-2xl border border-white/40 p-4 rounded-card shadow-glass flex items-center gap-4 relative overflow-hidden">
            {/* Success Icon */}
            <div className="bg-green-500/10 p-2 rounded-xl text-green-600">
              <CheckCircle2 size={22} />
            </div>

            {/* Text Content */}
            <div className="flex-grow min-w-0">
              <p className="text-[13px] font-bold text-primary-text tracking-tight uppercase">
                Universe Updated
              </p>
              <p className="text-xs text-primary-text/60 font-serif italic truncate">
                {message}
              </p>
            </div>

            {/* Close Button */}
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-black/5 active:bg-black/10 rounded-full transition-colors"
              aria-label="Close notification"
            >
              <X size={16} className="text-primary-text/40" />
            </button>

            {/* Kinetic Progress Bar */}
            <motion.div 
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 3, ease: "linear" }}
              style={{ originX: 0 }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-green-500/40"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
