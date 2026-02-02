"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { User, Profile } from "@/lib/supabase/types";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export function SettingsForm({ user, profile }: { user: any, profile: Profile | null }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(profile?.full_name || "");
  const supabase = createClient();

  const handleUpdate = async () => {
    setLoading(true);
    const { error } = await supabase.from("profiles").update({ full_name: name }).eq("id", user.id);
    if (error) toast.error("Update failed");
    else toast.success("Profile synchronized");
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <label className="text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400">Full Identity</label>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-border bg-white p-4 font-ui focus:ring-2 focus:ring-kyn-green-500 outline-none transition-all"
        />
      </div>
      <button 
        onClick={handleUpdate} 
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 bg-kyn-slate-900 text-white py-4 rounded-xl font-brand font-bold disabled:opacity-50"
      >
        {loading && <Loader2 size={18} className="animate-spin" />}
        Update Profile
      </button>
    </div>
  );
}
