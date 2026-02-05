"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Settings, LogOut, Shield } from "lucide-react";
import { logout } from "@/app/auth/actions";
import { cn } from "@/lib/utils"; // Added this back in!

interface UserMenuProps {
  user: any;
}

export default function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return (
      <Link 
        href="/auth/login"
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface border border-border text-kyn-slate-400 hover:text-kyn-slate-900 transition-colors"
      >
        <User size={16} strokeWidth={2.5} />
      </Link>
    );
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "group relative flex h-10 w-10 items-center justify-center rounded-xl border transition-all active:scale-90 shadow-sm",
          isOpen 
            ? "bg-kyn-slate-900 text-white border-kyn-slate-900" 
            : "bg-surface border-border text-kyn-slate-900"
        )}
      >
        <User size={16} strokeWidth={2.5} />
        <span className="absolute inset-0 rounded-xl ring-2 ring-kyn-green-500/20 animate-pulse" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-64 z-[100] overflow-hidden rounded-2xl border border-border bg-white shadow-kynar-soft animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-border bg-surface/50">
              <p className="font-ui text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400">Identity Active</p>
              <p className="font-brand text-sm font-bold truncate text-kyn-slate-900">{user.email}</p>
            </div>
            
            <div className="p-2">
              <Link 
                href="/account" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface text-sm font-ui text-kyn-slate-600 transition-colors"
              >
                <Shield size={16} />
                Account Vault
              </Link>
              <Link 
                href="/account/settings" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface text-sm font-ui text-kyn-slate-600 transition-colors"
              >
                <Settings size={16} />
                Settings
              </Link>
            </div>

            <div className="p-2 border-t border-border">
              <form action={logout}>
                <button 
                  type="submit"
                  className="flex w-full items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-sm font-ui text-red-600 transition-colors"
                >
                  <LogOut size={16} />
                  Terminate Session
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
