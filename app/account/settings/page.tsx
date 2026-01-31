import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/account/SettingsForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

/**
 * KYNAR UNIVERSE: Account Workshop (v1.2)
 * Purpose: A grounded space for identity and security maintenance.
 * Alignment: Verified against profiles table schema (full_name, is_admin).
 */
export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 1. Identity Guard: Business Reference Section 7
  if (!user) {
    redirect("/login?next=/account/settings");
  }

  // 2. Profile Retrieval: CSV Alignment (id, email, full_name, is_admin)
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, is_admin")
    .eq("id", user.id)
    .single();

  const breadcrumbPaths = [
    { label: 'Universe', href: '/' },
    { label: 'Library', href: '/library' },
    { label: 'Settings', href: '/account/settings' }
  ];

  return (
    <main className="mx-auto max-w-2xl pb-32 animate-in fade-in duration-700">
      {/* Handrail Layer: UX Canon 2.2 */}
      <div className="px-6 pt-8">
        <Breadcrumbs paths={breadcrumbPaths} />
      </div>

      {/* Workshop Header: Design System Section 4 */}
      <header className="px-6 py-12 md:py-20">
        <h1 className="font-brand text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          Account Settings
        </h1>
        <p className="font-ui mt-3 text-base text-text-secondary leading-relaxed max-w-md">
          Maintain your identity and digital preferences within the Kynar Universe.
        </p>
      </header>

      {/* Workshop Form: Design System Section 13 */}
      <section className="px-6">
        <div className="rounded-2xl border border-kyn-slate-100 bg-surface p-6 md:p-8 shadow-sm">
          <SettingsForm 
            user={user} 
            profile={profile || { 
              id: user.id, 
              email: user.email, 
              full_name: '', 
              is_admin: false 
            }} 
          />
        </div>
        
        {/* Support Reassurance: Business Reference Section 19 */}
        <div className="mt-12 border-t border-kyn-slate-100 pt-8 text-center">
          <p className="font-ui text-[11px] uppercase tracking-widest text-kyn-slate-400">
            Digital Autonomy Support
          </p>
          <p className="mt-2 font-ui text-xs text-text-secondary leading-relaxed">
            For data migration or permanent account closure, please contact 
            <br />
            <span className="text-text-primary font-medium">support@kynaruniverse.com</span>
          </p>
        </div>
      </section>
    </main>
  );
}
