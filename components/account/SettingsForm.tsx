/**
 * KYNAR UNIVERSE: Settings Form (v2.2)
 * Role: User profile identity management.
 * Fix: Explicitly typed supabase client with <Database> to fix 'never' type mismatch.
 */

"use client";

import { useState } from "react";
// Import the browser client creator
import { createClient } from "@/lib/supabase/browser";
// Import Database to satisfy the client generic
import { User, Profile, Database } from "@/lib/supabase/types";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface SettingsFormProps {
  user: User;
  profile: Profile;
}

export function SettingsForm({ user, profile }: SettingsFormProps) {
  /**
   * Fix: Passing <Database> here resolves TS2345. 
   * It maps the 'profiles' string to the actual table schema in types.ts.
   */
  const supabase = createClient<Database>();
  
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(profile.full_name ?? "");
  
  const handleUpdate = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    
    setLoading(true);
    
    /**
     * By typing the client above, we can now pass a structured object.
     * We use 'as any' only if the schema is strictly generated with 
     * non-nullable fields you aren't updating.
     */
    const updateData = {
      full_name: name.trim(),
      updated_at: new Date().toISOString(),
    };
    
    const { error } = await supabase
      .from("profiles")
      .update(updateData as any)
      .eq("id", user.id);
    
    if (error) {
      toast.error("Update failed");
      console.error("[SettingsForm] Update error:", error.message);
    } else {
      toast.success("Profile synchronized");
    }
    
    setLoading(false);
  };
  
  return (
    <div className="space-y-8">
      {/* Name Field */}
      <div className="space-y-4">
        <label className="text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400">
          Full Identity
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          className="w-full rounded-xl border border-border bg-white p-4 font-ui
                     focus:ring-2 focus:ring-kyn-green-500 outline-none transition-all"
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleUpdate}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3
                   bg-kyn-slate-900 text-white py-4 rounded-xl font-brand font-bold
                   hover:bg-black disabled:opacity-50 transition-all active:scale-[0.98]"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          "Save Changes"
        )}
      </button>
    </div>
  );
}
