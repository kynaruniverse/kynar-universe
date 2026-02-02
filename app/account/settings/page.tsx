/**
 * KYNAR UNIVERSE: Account Workshop (v1.5)
 * Role: A grounded space for identity and security maintenance.
 * Security: Middleware-enforced (Silent Guard).
 * Refactor: Aligned with Canonical Schema & Mobile-First UX.
 */

import { createClient } from "@/lib/supabase/server";
import { SettingsForm } from "@/components/account/SettingsForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ShieldCheck, Mail, Info } from "lucide-react";

export default async function SettingsPage() {
  const supabase = await createClient();
  
  // Middleware handles the redirect; we assume session exists here.
  const { data: { user } } = await supabase.auth.getUser();

  // Profile Retrieval: Aligned with Database['public']['Tables']['profiles']['Row']
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, is_admin")
    .eq("id", user?.id)
    .single();

  const breadcrumbPaths = [
    { label: 'Library', href: '/library' },
    { label: 'Settings', href: '/account/settings' }
  ];

  return (
    <main className="mx-auto max-w-2xl pb-32 animate-in fade-in duration-700 ease-out">
      {/* Handrail Layer: UX Canon 2.2 */}
      <div className="px-gutter pt-8">
        <Breadcrumbs paths={breadcrumbPaths} />
      </div>

      {/* Header: Design System Section 4 */}
      <header className="px-gutter py-12 md:py-20">
        <h1 className="font-brand text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          Account Settings
        </h1>
        <p className="font-ui mt-3 text-base text-text-secondary leading-relaxed max-w-md">
          Maintain your identity and digital preferences within the Kynar Universe.
        </p>
      </header>

      {/* Workshop Form: Design System Section 13 */}
      <section className="px-gutter">
        <div className="rounded-2xl border border-border bg-surface p-6 md:p-8 shadow-kynar-soft">
          <SettingsForm 
            user={user!} 
            profile={profile || { 
              id: user?.id || '', 
              email: user?.email || '', 
              full_name: '', 
              is_admin: false 
            }} 
          />
        </div>
        
        {/* Support Reassurance: Business Reference Section 19 */}
        <div className="mt-12 border-t border-border pt-8 text-center">
          <div className="flex justify-center mb-4 text-kyn-slate-300">
            <ShieldCheck size={20} strokeWidth={1.5} />
          </div>
          <p className="font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-kyn-slate-400">
            Digital Autonomy Support
          </p>
          <p className="mt-3 font-ui text-xs text-text-secondary leading-relaxed max-w-xs mx-auto">
            For data migration or permanent account closure, please reach out to our human support team.
          </p>
          <a 
            href="mailto:support@kynaruniverse.com" 
            className="mt-4 inline-block font-brand text-sm font-bold text-kyn-slate-900 underline underline-offset-4 decoration-border hover:decoration-kyn-caramel-300 transition-colors"
          >
            support@kynaruniverse.com
          </a>
        </div>
      </section>

      {/* Security Context Tip */}
      <section className="mt-12 px-gutter">
        <div className="flex gap-4 p-5 rounded-xl bg-kyn-green-50/50 border border-kyn-green-100">
          <div className="shrink-0 text-kyn-green-600">
            <Info size={18} />
          </div>
          <p className="font-ui text-[13px] leading-relaxed text-kyn-green-800/80">
            Your session is secured via <strong>PKCE encryption</strong>. Any changes to your identity are synchronized across all your devices instantly.
          </p>
        </div>
      </section>
    </main>
  );
}
