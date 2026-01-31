"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, ShieldCheck, Mail, User as UserIcon, Loader2 } from "lucide-react";

/**
 * KYNAR UNIVERSE: Settings Workshop
 * Aligned with UX Canon Section 7 (Identity)
 * Provides a calm, secure interface for profile mutations.
 */
export function SettingsForm({ user, profile }: { user: any; profile: any }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [fullName, setFullName] = useState(profile?.full_name || "");

  async function updateProfile() {
    if (!fullName.trim()) {
      setMessage({ type: 'error', text: 'Identity requires a name.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    const { error } = await supabase
      .from("profiles")
      .update({ 
        full_name: fullName.trim(),
        updated_at: new Date().toISOString()
      })
      .eq("id", user.id);

    if (error) {
      setMessage({ type: 'error', text: 'Connectivity issue. Please try again.' });
    } else {
      setMessage({ type: 'success', text: 'Your profile has been harmonized.' });
    }
    setLoading(false);
  }

  return (
    <div className="space-y-12">
      {/* Identity Section - UX Canon 7.1 */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-border">
          <UserIcon className="h-4 w-4 text-kyn-green-600" />
          <h2 className="font-brand text-lg font-bold text-kyn-slate-900">Identity</h2>
        </div>

        <div className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="font-ui text-[10px] font-bold uppercase tracking-[0.15em] text-kyn-slate-400">
              Full Name
            </label>
            <input 
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-kynar border border-border bg-white px-4 py-3.5 font-ui text-sm text-kyn-slate-900 focus:border-kyn-green-500/50 focus:ring-4 focus:ring-kyn-green-500/5 focus:outline-none calm-transition"
              placeholder="How should we address you?"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-ui text-[10px] font-bold uppercase tracking-[0.15em] text-kyn-slate-400">
              Email Address
            </label>
            <div className="flex items-center gap-3 rounded-kynar border border-border bg-surface/50 px-4 py-3.5 font-ui text-sm text-kyn-slate-500 cursor-not-allowed">
              <Mail className="h-4 w-4 opacity-40" />
              {user.email}
            </div>
            <p className="font-ui text-[10px] italic text-kyn-slate-400">
              Email changes require separate security verification.
            </p>
          </div>
        </div>
      </div>

      {/* Security Section - Business Ref Section 7 */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-border">
          <ShieldCheck className="h-4 w-4 text-kyn-caramel-600" />
          <h2 className="font-brand text-lg font-bold text-kyn-slate-900">Security</h2>
        </div>
        
        <button 
          onClick={() => supabase.auth.resetPasswordForEmail(user.email!)}
          className="w-full rounded-kynar border border-border bg-white py-4 font-brand text-xs font-bold text-kyn-slate-700 hover:bg-surface hover:text-kyn-slate-900 calm-transition active:scale-[0.99]"
        >
          Send Password Reset Email
        </button>
      </div>

      {/* Action Area - Reassured State Canon */}
      <div className="pt-4">
        {message && (
          <div className={`mb-6 flex items-center gap-3 rounded-kynar px-4 py-3 text-xs font-semibold animate-in fade-in slide-in-from-top-2 ${
            message.type === 'success' 
              ? 'bg-kyn-green-50 text-kyn-green-700 border border-kyn-green-100' 
              : 'bg-kyn-caramel-50 text-kyn-caramel-700 border border-kyn-caramel-100'
          }`}>
            <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${message.type === 'success' ? 'bg-kyn-green-500' : 'bg-kyn-caramel-500'}`} />
            {message.text}
          </div>
        )}

        <button 
          onClick={updateProfile}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-kynar bg-kyn-slate-900 py-4 font-brand text-base font-bold text-white shadow-kynar-soft calm-transition hover:bg-kyn-slate-800 disabled:opacity-50 active:scale-[0.98]"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin opacity-70" />
          ) : (
            <Save className="h-5 w-5 opacity-70" />
          )}
          <span>{loading ? 'Harmonizing...' : 'Save Preferences'}</span>
        </button>
      </div>
    </div>
  );
}
