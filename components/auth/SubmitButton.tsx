"use client";

import { useFormStatus } from "react-dom";
import { ArrowRight, Loader2 } from "lucide-react";

interface SubmitButtonProps {
  idleText: string;
  loadingText: string;
}

export function SubmitButton({ idleText, loadingText }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="
        group
        w-full flex items-center justify-center gap-2
        py-4
        bg-kyn-slate-900 text-white font-brand font-bold
        rounded-xl
        hover:bg-kyn-slate-800
        transition-all
        active:scale-[0.98]
        disabled:opacity-70
        disabled:cursor-not-allowed
      "
    >
      {pending ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          <span>{idleText}</span>
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </>
      )}
    </button>
  );
}