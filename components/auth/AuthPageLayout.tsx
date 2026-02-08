"use client";

import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { Compass, ShieldCheck } from "lucide-react";
import { AuthMessage } from "@/components/auth/AuthMessage";

interface AuthPageLayoutProps {
  mode: "login" | "signup";
  title: string;
  subtitle: string;
  glowColor: string; // e.g., "bg-kyn-green-50/50" or "bg-kyn-caramel-50/50"
  formAction: (formData: FormData) => Promise<void>;
  submitButtonText: {
    idle: string;
    loading: string;
  };
  footerLink: {
    text: string;
    linkText: string;
    href: string;
  };
  showSecurityFootnote?: boolean;
  children?: ReactNode; // For any additional form fields
}

export function AuthPageLayout({
  mode,
  title,
  subtitle,
  glowColor,
  formAction,
  submitButtonText,
  footerLink,
  showSecurityFootnote = false,
}: AuthPageLayoutProps) {
  return (
    <main className="relative min-h-[80vh] flex items-center justify-center px-gutter py-20">
      {/* Background Glow */}
      <div className={`absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full ${glowColor} blur-[100px]`} />

      <div className="w-full max-w-md">
        {/* Brand Identity */}
        <div className="text-center mb-10">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-kyn-slate-900 text-white mb-6">
            <Compass size={24} />
          </div>
          <h1 className="font-brand text-3xl font-bold text-kyn-slate-900 tracking-tight">
            {title}
          </h1>
          <p className="mt-2 font-ui text-sm text-text-secondary">
            {subtitle}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white border border-border rounded-[2rem] p-8 shadow-kynar-soft">
          
          {/* Feedback Messages (Error/Success) */}
          <Suspense fallback={<div className="h-10 mb-6 bg-surface animate-pulse rounded-xl" />}>
            <AuthMessage />
          </Suspense>

          <form action={formAction} className="space-y-6">
            <div>
              <label className="block font-ui text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400 mb-2">
                Email Address
              </label>
              <input 
                name="email"
                type="email"
                required
                placeholder="identity@kynar.uk"
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface font-ui text-sm focus:outline-none focus:ring-2 focus:ring-kyn-green-500/20 focus:border-kyn-green-500 transition-all"
              />
            </div>

            <div>
              <label className="block font-ui text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400 mb-2">
                {mode === "login" ? "Access Key" : "Access Key (Password)"}
              </label>
              <input 
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface font-ui text-sm focus:outline-none focus:ring-2 focus:ring-kyn-green-500/20 focus:border-kyn-green-500 transition-all"
              />
            </div>

            <SubmitButton 
              idleText={submitButtonText.idle}
              loadingText={submitButtonText.loading}
            />
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="font-ui text-xs text-text-secondary">
              {footerLink.text}{" "}
              <Link href={footerLink.href} className="ml-1 text-kyn-slate-900 font-bold hover:text-kyn-green-600 transition-colors">
                {footerLink.linkText}
              </Link>
            </p>
          </div>
        </div>

        {/* Security Footnote (optional - only for login) */}
        {showSecurityFootnote && (
          <div className="mt-8 flex items-center justify-center gap-2 text-kyn-slate-400">
            <ShieldCheck size={14} />
            <span className="font-ui text-[10px] font-bold uppercase tracking-widest">
              End-to-End Encryption Active
            </span>
          </div>
        )}
      </div>
    </main>
  );
}

// Import the existing SubmitButton (we already extracted this in Phase 1)
import { SubmitButton } from "./SubmitButton";