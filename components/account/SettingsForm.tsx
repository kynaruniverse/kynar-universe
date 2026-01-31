/**
 * KYNAR UNIVERSE: Settings Workshop (v1.5)
 * Role: Calm Identity Mutation & Security.
 * Aligned with: UX Canon Section 7 & Design System Section 4.
 */

"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser"; // Hardened Browser Client
import { User } from "@supabase/supabase-js";
import { Profile } from "@/lib/supabase/types";
import { Save, ShieldCheck, Mail, User as UserIcon, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface SettingsFormProps {
  user: User;
  profile: Profile | null;
}

export function SettingsForm({ user, profile }: SettingsFormProps) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || "");

  async function updateProfile() {
    if (!fullName.trim()) {
      toast.error("Identity requires a name.");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("profiles")
      .update({ 
        full_name: fullName.trim(),
        updated_at: new Date().toISOString()
      })
      .eq("id", user.id);

    if (error) {
      toast.error("Connectivity issue. Please try again.");
    } else {
      toast.success("Your profile has been harmonized.");
    }
    setLoading(false);
  }

  async function handlePasswordReset() {
    setResetLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(user.email!);
    
    if (error) {
      toast.error("Could not send reset email.");
    } else {
      toast.success("Verification link sent to your email.");
    }
    setResetLoading(false);
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Identity Section: Grounded & Simple */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-border">
          <UserIcon className="h-4 w-4 text-kyn-green-700" />
          <h2 className="font-brand text-lg font-medium text-kyn-slate-900">Identity</h2>
        </div>

        <div className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="font-ui text-[10px] font-medium uppercase tracking-[0.2em] text-kyn-slate-400">
              Full Name
            </label>
            <input 
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-border bg-white px-4 py-3.5 font-ui text-sm text-kyn-slate-900 focus:border-kyn-green-600/30 focus:ring-4 focus:ring-kyn-green-500/5 focus:outline-none transition-all duration-300"
              placeholder="How should we address you?"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-ui text-[10px] font-medium uppercase tracking-[0.2em] text-kyn-slate-400">
              Email Address
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-kyn-slate-50/50 px-4 py-3.5 font-ui text-sm text-kyn-slate-400 cursor-not-allowed">
              <Mail className="h-4 w-4 opacity-40" />
              {user.email}
            </div>
            <p className="font-ui text-[10px] italic text-kyn-slate-400">
              Email changes require separate security verification.
            </p>
          </div>
        </div>
      </div>

      {/* Security Section: Functional Trust */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-border">
          <ShieldCheck className="h-4 w-4 text-kyn-caramel-600" />
          <h2 className="font-brand text-lg font-medium text-kyn-slate-900">Security</h2>
        </div>
        
        <button 
          onClick={handlePasswordReset}
          disabled={resetLoading}
          className="w-full rounded-xl border border-border bg-white py-4 font-brand text-xs font-medium uppercase tracking-widest text-kyn-slate-600 hover:bg-kyn-slate-50 hover:text-kyn-slate-900 transition-all duration-300 disabled:opacity-50"
        >
          {resetLoading ? 'Sending...' : 'Send Password Reset Email'}
        </button>
      </div>

      {/* Action Area: High-Contrast Commitment */}
      <div className="pt-4">
        <button 
          onClick={updateProfile}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-kyn-slate-900 py-4 font-brand text-base font-medium text-white shadow-sm transition-all duration-300 hover:bg-black disabled:opacity-50 active:scale-[0.98]"
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
