/**
 * KYNAR UNIVERSE: Identity Registration (v1.0)
 * Role: Creating new records in the Universe.
 */

import Link from "next/link";
import { Compass, ShieldCheck, ArrowRight } from "lucide-react";
import { signup } from "../actions";
export default function SignupPage() {
  return (
    <main className="relative min-h-[80vh] flex items-center justify-center px-gutter py-20">
      <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-kyn-caramel-50/50 blur-[100px]" />

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-kyn-slate-900 text-white mb-6">
            <Compass size={24} />
          </div>
          <h1 className="font-brand text-3xl font-bold text-kyn-slate-900 tracking-tight">Create Identity</h1>
          <p className="mt-2 font-ui text-sm text-text-secondary">Begin your journey in the Kynar ecosystem.</p>
        </div>

        <div className="bg-white border border-border rounded-[2rem] p-8 shadow-kynar-soft">
          <form action={signup} className="space-y-6">
            <div>
              <label className="block font-ui text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400 mb-2">Email Address</label>
              <input name="email" type="email" required placeholder="identity@kynar.uk" className="w-full px-4 py-3 rounded-xl border border-border bg-surface font-ui text-sm focus:ring-2 focus:ring-kyn-green-500/20 focus:border-kyn-green-500 transition-all outline-none" />
            </div>

            <div>
              <label className="block font-ui text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400 mb-2">Access Key (Password)</label>
              <input name="password" type="password" required placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-border bg-surface font-ui text-sm focus:ring-2 focus:ring-kyn-green-500/20 focus:border-kyn-green-500 transition-all outline-none" />
            </div>

            <button type="submit" className="group w-full flex items-center justify-center gap-2 py-4 bg-kyn-slate-900 text-white font-brand font-bold rounded-xl hover:bg-kyn-slate-800 transition-all active:scale-[0.98]">
              Register Identity
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="font-ui text-xs text-text-secondary">
              Already have an identity? <Link href="/auth/login" className="ml-1 text-kyn-slate-900 font-bold hover:text-kyn-green-600 transition-colors">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
