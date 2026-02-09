"use client";

import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { Compass, ShieldCheck } from "lucide-react";
import { AuthMessage } from "@/components/auth/AuthMessage";
import { SubmitButton } from "./SubmitButton";

interface AuthPageLayoutProps {
  mode: "login" | "signup";
  title: string;
  subtitle: string;
  glowColor: string; // e.g., "bg-kyn-green-50/50"
  formAction: (formData: FormData) => Promise < void > ;
  submitButtonText: {
    idle: string;
    loading: string;
  };
  footerLink: {
    text: string;
    linkText: string;
    href: string;
  };
  showSecurityFootnote ? : boolean;
  children ? : ReactNode; // Additional fields if needed
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
  children,
}: AuthPageLayoutProps) {
  return (
    <main className="relative min-h-[80vh] flex items-center justify-center px-gutter py-20">
      
      {/* Background Glow */}
      <div
        className={`absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full ${glowColor} blur-[100px]`}
      />

      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-10">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-kyn-slate-900 text-white mb-6">
            <Compass size={24} />
          </div>
          <h1 className="font-brand text-3xl font-bold text-kyn-slate-900 tracking-tight">
            {title}
          </h1>
          <p className="mt-2 font-ui text-sm text-text-secondary">{subtitle}</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white border border-border rounded-[2rem] p-8 shadow-kynar-soft space-y-6">

          {/* Feedback Messages */}
          <Suspense fallback={<div className="h-10 bg-surface animate-pulse rounded-xl" />}>
            <AuthMessage />
          </Suspense>

          {/* Form */}
          <form action={formAction} className="space-y-6">
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="identity@kynar.uk"
              required
            />

            <FormInput
              label={mode === "login" ? "Access Key" : "Access Key (Password)"}
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />

            {children}

            <SubmitButton
              idleText={submitButtonText.idle}
              loadingText={submitButtonText.loading}
            />
          </form>

          {/* Footer Link */}
          <div className="pt-6 border-t border-border text-center">
            <p className="font-ui text-xs text-text-secondary">
              {footerLink.text}{" "}
              <Link
                href={footerLink.href}
                className="ml-1 text-kyn-slate-900 font-bold hover:text-kyn-green-600 transition-colors"
              >
                {footerLink.linkText}
              </Link>
            </p>
          </div>
        </div>

        {/* Security Footnote */}
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

/** Reusable Form Input Component */
interface FormInputProps {
  label: string;
  name: string;
  type: string;
  placeholder ? : string;
  required ? : boolean;
}

function FormInput({ label, name, type, placeholder, required }: FormInputProps) {
  return (
    <div>
      <label className="block font-ui text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400 mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-border bg-surface font-ui text-sm
                   focus:outline-none focus:ring-2 focus:ring-kyn-green-500/20 focus:border-kyn-green-500
                   transition-all"
      />
    </div>
  );
}