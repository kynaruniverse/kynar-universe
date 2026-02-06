/**
 * KYNAR UNIVERSE: Settings Page (v2.3)
 * Evolution: Strict Schema Alignment & Default State Fallbacks
 */

import { getUserProfile } from "@/lib/supabase/helpers";
import { SettingsForm } from "@/components/account/SettingsForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ShieldCheck, Info } from "lucide-react";
import { Profile } from "@/lib/supabase/types"; // Import only Profile
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();
  
  if (!authUser) redirect("/auth/login");

  // Fetch the real profile from the DB
  const fetchedProfile = await getUserProfile();
  
  /**
   * EVOLUTION: Default Object Construction
   * We ensure the object strictly follows the 'Profile' type from types.ts
   */
  const profile: Profile = fetchedProfile ?? {
    id: authUser.id,
    full_name: "",
    email: authUser.email ?? "",
    avatar_url: null,
    updated_at: new Date().toISOString()
  };
  
  const breadcrumbPaths = [
    { label: "Account", href: "/account" },
    { label: "Settings", href: "/account/settings" },
  ];
  
  return (
    <main className="mx-auto max-w-2xl pb-32 animate-in fade-in duration-700 ease-out">
      <div className="px-gutter pt-8">
        <Breadcrumbs paths={breadcrumbPaths} />
      </div>

      <header className="px-gutter py-12 md:py-20">
        <h1 className="font-brand text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          Account Settings
        </h1>
        <p className="font-ui mt-3 text-base text-text-secondary leading-relaxed max-w-md">
          Maintain your identity and digital preferences within the Kynar Universe.
        </p>
      </header>

      <section className="px-gutter">
        <div className="rounded-[2rem] border border-border bg-white p-6 md:p-10 shadow-kynar-soft">
          {/* Note: Ensure SettingsForm component accepts 'profile' prop as type Profile */}
          <SettingsForm profile={profile} />
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <div className="flex justify-center mb-4 text-kyn-slate-300">
            <ShieldCheck size={24} strokeWidth={1} />
          </div>
          <p className="font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-kyn-slate-400">
            Digital Autonomy Support
          </p>
          <a
            href="mailto:support@kynaruniverse.com"
            className="mt-4 inline-block font-brand text-sm font-bold text-kyn-slate-900 underline underline-offset-8 decoration-kyn-green-200 hover:decoration-kyn-green-500 transition-all"
          >
            support@kynaruniverse.com
          </a>
        </div>
      </section>

      <section className="mt-12 px-gutter">
        <div className="flex gap-4 p-6 rounded-2xl bg-kyn-green-50/30 border border-kyn-green-100/50">
          <div className="shrink-0 text-kyn-green-600">
            <Info size={20} />
          </div>
          <p className="font-ui text-[13px] leading-relaxed text-kyn-green-900/70">
            Your session is secured via <strong>PKCE encryption</strong>. Your identity data is encrypted at rest and never shared with third-party trackers.
          </p>
        </div>
      </section>
    </main>
  );
}
