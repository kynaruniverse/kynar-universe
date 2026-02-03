/**
 * KYNAR UNIVERSE: Account Workshop (v2.0)
 * Fully aligned with canonical types.ts and Supabase v2.
 */

import { createClient } from "@/lib/supabase/server";
import { SettingsForm } from "@/components/account/SettingsForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ShieldCheck, Info } from "lucide-react";
import { User, Profile } from "@/lib/supabase/types";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const supabase = await createClient();
  
  // 1. Get the authenticated user
  const { data: authData } = await supabase.auth.getUser();
  const user = authData.user as User | null;
  
  if (!user) {
    redirect("/auth/login");
  }
  
  // 2. Fetch the profile
  const { data: profileData } = await supabase
    .from("profiles")
    .select("id, email, full_name, is_admin")
    .eq("id", user.id)
    .single();
  
  // Aligning with the Profile type from types.ts
  const profile: Profile = (profileData as Profile) ?? {
    id: user.id,
    email: user.email ?? "",
    full_name: "",
    is_admin: false,
    created_at: null, // Including missing fields from Profile type
    updated_at: null,
    avatar_url: null
  };
  
  const breadcrumbPaths = [
    { label: "Library", href: "/library" },
    { label: "Settings", href: "/account/settings" },
  ];
  
  return (
    <main className="mx-auto max-w-2xl pb-32 animate-in fade-in duration-700 ease-out">
      {/* Handrail Layer: UX Canon 2.2 */}
      <div className="px-gutter pt-8">
        <Breadcrumbs paths={breadcrumbPaths} />
      </div>

      {/* Header */}
      <header className="px-gutter py-12 md:py-20">
        <h1 className="font-brand text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          Account Settings
        </h1>
        <p className="font-ui mt-3 text-base text-text-secondary leading-relaxed max-w-md">
          Maintain your identity and digital preferences within the Kynar Universe.
        </p>
      </header>

      {/* Settings Form */}
      <section className="px-gutter">
        <div className="rounded-2xl border border-border bg-surface p-6 md:p-8 shadow-kynar-soft">
          <SettingsForm user={user} profile={profile} />
        </div>

        {/* Support Info */}
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

      {/* Security Context */}
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
