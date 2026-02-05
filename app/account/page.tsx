/**
 * KYNAR UNIVERSE: Account Dashboard
 * Role: User profile overview and session management.
 */

import Link from "next/link";
import { logout } from "../auth/actions";

export default function AccountPage() {
  return (
    <main className="max-w-screen-xl mx-auto px-gutter py-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="font-brand text-4xl font-bold text-kyn-slate-900">Your Account</h1>
          <p className="mt-2 text-text-secondary font-ui">Manage your presence in the Kynar Universe.</p>
        </div>
        
        {/* Logout Action */}
        <form action={logout}>
          <button 
            type="submit" 
            className="px-6 py-2 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 font-brand font-bold transition-all active:scale-[0.98]"
          >
            Terminate Session
          </button>
        </form>
      </div>

      <div className="grid gap-6">
        <Link 
          href="/account/settings" 
          className="group p-8 border border-border rounded-[2rem] hover:border-kyn-green-500 transition-colors bg-white shadow-kynar-soft"
        >
          <h2 className="font-brand text-xl font-bold group-hover:text-kyn-green-600 transition-colors">Go to Settings →</h2>
          <p className="text-text-secondary text-sm mt-1">Update your security protocols and profile details.</p>
        </Link>
      </div>
    </main>
  );
}
