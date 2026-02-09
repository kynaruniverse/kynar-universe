"use client";

import { useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export function AuthMessage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");
  
  if (!error && !message) return null;
  
  const renderAlert = (text: string, colorClass: string, Icon: React.ElementType) => (
    <div className={`flex items-center gap-3 rounded-xl border ${colorClass} p-4`}>
      <Icon size={18} />
      <p className="font-ui text-xs font-medium">{text}</p>
    </div>
  );
  
  return (
    <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300 space-y-2">
      {error && renderAlert(error, "border-red-100 bg-red-50 text-red-700", AlertCircle)}
      {message && renderAlert(message, "border-kyn-green-100 bg-kyn-green-50 text-kyn-green-700", CheckCircle2)}
    </div>
  );
}