/**
 * KYNAR UNIVERSE: Account Dashboard (v2.3)
 * Evolution: Added Auth Guarding and Type-Safe Layout
 */

import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "../auth/actions";

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If no session exists, bounce to login
  if (!user) redirect("/auth/login?return_to=/account");

  return (
    <main className="max-w-screen-xl mx-auto px-gutter py-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="font-brand text-4xl font-bold text-kyn-slate-900 tracking-tight">Your Account</h1>
          <p className="mt-2 text-text-secondary font-ui max-w-sm">
            Manage your presence and verified credentials in the Kynar Universe.
          </p>
        </div>
        
        <form action={logout}>
          <button 
            type="submit" 
            className="px-6 py-3 border border-red-100 text-red-600 rounded-2xl hover:bg-red-50 font-brand text-xs font-bold uppercase tracking-widest transition-all active:scale-95"
          >
            Terminate Session
          </button>
        </form>
      </div>

      <div className="grid gap-6">
        <Link 
          href="/account/settings" 
          className="group p-8 border border-border rounded-[2.5rem] hover:border-kyn-green-500 transition-all duration-500 bg-white shadow-kynar-soft hover:shadow-kynar-deep"
        >
          <h2 className="font-brand text-xl font-bold group-hover:text-kyn-green-600 transition-colors">Identity Settings →</h2>
          <p className="text-text-secondary text-sm mt-2 font-ui">Update your security protocols and profile details.</p>
        </Link>
      </div>
    </main>
  );
}
