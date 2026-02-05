/**
 * KYNAR UNIVERSE: Auth Feedback (v1.0)
 * Role: Displaying session errors or registration success.
 */

"use client";
import { useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export function AuthMessage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");

  if (!error && !message) return null;

  return (
    <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-red-700">
          <AlertCircle size={18} />
          <p className="font-ui text-xs font-medium">{error}</p>
        </div>
      )}
      {message && (
        <div className="flex items-center gap-3 rounded-xl border border-kyn-green-100 bg-kyn-green-50 p-4 text-kyn-green-700">
          <CheckCircle2 size={18} />
          <p className="font-ui text-xs font-medium">{message}</p>
        </div>
      )}
    </div>
  );
}
