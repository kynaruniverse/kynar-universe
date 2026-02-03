/**
 * KYNAR UNIVERSE: Acquisition Success (v1.6)
 * Role: Post-purchase "Vault Opening" experience.
 */

import Link from "next/link";
import { ShieldCheck, Library } from "lucide-react";
import { CelebrationTrigger } from "@/components/marketplace/CelebrationTrigger";

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-[90vh] flex flex-col items-center justify-center bg-canvas px-gutter">
      {/* This runs on the client once the page mounts */}
      <CelebrationTrigger />

      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <div className="mx-auto h-24 w-24 rounded-[2rem] bg-kyn-green-500/10 flex items-center justify-center text-kyn-green-600">
          <ShieldCheck size={48} strokeWidth={1.5} />
        </div>

        <div className="space-y-4">
          <h1 className="font-brand text-4xl font-bold text-kyn-slate-900 tracking-tight">
            Acquisition Secured
          </h1>
          <p className="font-ui text-base text-text-secondary leading-relaxed">
            Your technical assets have been successfully registered to your identity. 
            The Kynar Vault is now synchronized.
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-4">
          <Link 
            href="/library" 
            className="flex items-center justify-center gap-3 w-full py-5 bg-kyn-slate-900 text-white rounded-2xl font-brand text-sm font-black uppercase tracking-widest hover:bg-black transition-all active:scale-[0.98]"
          >
            <Library size={18} />
            Enter My Library
          </Link>
          
          <Link 
            href="/" 
            className="font-brand text-[10px] font-bold uppercase tracking-[0.2em] text-kyn-slate-400 hover:text-kyn-slate-900 transition-colors"
          >
            Return to Hub
          </Link>
        </div>
      </div>
    </main>
  );
}
