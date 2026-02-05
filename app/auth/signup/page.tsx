"use client";
 /**
 * KYNAR UNIVERSE: Identity Registration (v1.1)
 * Role: Creating new records in the Universe.
 * Features: Error/Success messaging & dynamic loading states via useFormStatus.
 */

import Link from "next/link";
import { Suspense } from "react";
import { useFormStatus } from "react-dom";
import { Compass, ArrowRight, Loader2 } from "lucide-react";
import { signup } from "../actions";
import { AuthMessage } from "@/components/auth/AuthMessage";

export default function SignupPage() {
  return (
    <main className="relative min-h-[80vh] flex items-center justify-center px-gutter py-20">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-kyn-caramel-50/50 blur-[100px]" />

      <div className="w-full max-w-md">
        {/* Brand Identity */}
        <div className="text-center mb-10">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-kyn-slate-900 text-white mb-6">
            <Compass size={24} />
          </div>
          <h1 className="font-brand text-3xl font-bold text-kyn-slate-900 tracking-tight">
            Create Identity
          </h1>
          <p className="mt-2 font-ui text-sm text-text-secondary">
            Begin your journey in the Kynar ecosystem.
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white border border-border rounded-[2rem] p-8 shadow-kynar-soft">
          
          {/* Feedback Messages (Error/Success) */}
          <Suspense fallback={<div className="h-10 mb-6 bg-surface animate-pulse rounded-xl" />}>
            <AuthMessage />
          </Suspense>

          <form action={signup} className="space-y-6">
            <div>
              <label className="block font-ui text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400 mb-2">
                Email Address
              </label>
              <input 
                name="email" 
                type="email" 
                required 
                placeholder="identity@kynar.uk" 
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface font-ui text-sm focus:ring-2 focus:ring-kyn-green-500/20 focus:border-kyn-green-500 transition-all outline-none" 
              />
            </div>

            <div>
              <label className="block font-ui text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400 mb-2">
                Access Key (Password)
              </label>
              <input 
                name="password" 
                type="password" 
                required 
                placeholder="••••••••" 
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface font-ui text-sm focus:ring-2 focus:ring-kyn-green-500/20 focus:border-kyn-green-500 transition-all outline-none" 
              />
            </div>

            <SubmitButton />
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="font-ui text-xs text-text-secondary">
              Already have an identity? 
              <Link href="/auth/login" className="ml-1 text-kyn-slate-900 font-bold hover:text-kyn-green-600 transition-colors">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/**
 * Sub-component to handle loading state via useFormStatus
 */
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="group w-full flex items-center justify-center gap-2 py-4 bg-kyn-slate-900 text-white font-brand font-bold rounded-xl hover:bg-kyn-slate-800 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          Registering...
        </>
      ) : (
        <>
          Register Identity
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </button>
  );
}
