"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Shield, Library, Settings, LogOut, X, 
  ArrowRight, Loader2, Mail, Lock, ChevronLeft 
} from "lucide-react";
import { login, signup, logout } from "@/app/auth/actions";
import { cn } from "@/lib/utils";
import { AuthMessage } from "../auth/AuthMessage";
import { useFormStatus } from "react-dom";
import { Suspense } from "react";
import { useUIStore } from "@/lib/store/ui";

export default function UserMenu({ user }: { user: any }) {
  const isOpen = useUIStore((state) => state.isUserMenuOpen);
  const closeUserMenu = useUIStore((state) => state.closeUserMenu);
  
  // Set initial view based on user presence
  const [view, setView] = useState<'gateway' | 'login' | 'register' | 'user-menu'>(
    user ? 'user-menu' : 'gateway'
  );

  // Sync view if auth state changes while menu is open
  useEffect(() => {
    if (user) setView('user-menu');
    else if (view === 'user-menu') setView('gateway');
  }, [user]);

  if (!isOpen) return null;

  const closeAll = () => {
    closeUserMenu();
    // Reset to gateway on close if not logged in
    if (!user) setTimeout(() => setView('gateway'), 300);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
      
      {/* FULL PAGE BACKDROP */}
      <div 
        className="absolute inset-0 bg-kyn-slate-900/60 backdrop-blur-md animate-in fade-in duration-500" 
        onClick={closeAll} 
      />

      {/* CENTERED MODAL BOX */}
      <div className="relative w-full max-w-[400px] overflow-hidden rounded-[2.5rem] border border-white/20 bg-white p-8 shadow-kynar-deep animate-in zoom-in-95 fade-in slide-in-from-bottom-8 duration-500 ease-out">
        
        {/* Navigation Controls */}
        <div className="absolute left-8 top-8 flex items-center gap-4 z-10">
          {view !== 'gateway' && view !== 'user-menu' && (
            <button 
              onClick={() => setView('gateway')}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-kyn-slate-400 hover:text-kyn-slate-900 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
          )}
        </div>

        <button 
          onClick={closeAll} 
          className="absolute right-8 top-8 flex h-8 w-8 items-center justify-center rounded-full bg-surface text-kyn-slate-400 hover:text-kyn-slate-900 transition-colors z-10"
        >
          <X size={18} />
        </button>

        <div className="mt-4">
          <Suspense fallback={null}>
              <AuthMessage />
          </Suspense>
        </div>

        {/* GATEWAY VIEW */}
        {(!user && view === 'gateway') && (
            <div className="flex flex-col gap-4 py-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="text-center mb-6">
                  <h3 className="font-brand text-3xl font-bold text-kyn-slate-900 tracking-tight">Access Portal</h3>
                  <p className="text-sm text-text-secondary font-ui mt-2">Identify yourself to proceed.</p>
              </div>
              <button 
                onClick={() => setView('login')} 
                className="group w-full py-4 bg-kyn-slate-900 text-white rounded-2xl font-brand font-bold hover:bg-kyn-slate-800 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Sign In <ArrowRight size={16} className="opacity-50 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setView('register')} 
                className="w-full py-4 border border-border text-kyn-slate-900 rounded-2xl font-brand font-bold hover:bg-surface transition-all active:scale-[0.98]"
              >
                Register Identity
              </button>
            </div>
        )}

        {/* LOGIN VIEW */}
        {view === 'login' && (
            <form action={login} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="mb-6">
                  <h3 className="font-brand text-2xl font-bold text-kyn-slate-900">Sign In</h3>
                  <p className="text-xs text-kyn-slate-400 font-ui uppercase tracking-widest mt-1">Initialize Session</p>
              </div>
              <div className="space-y-4">
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-kyn-slate-400 group-focus-within:text-kyn-green-600 transition-colors" size={16} />
                    <input name="email" type="email" required placeholder="Email Address" className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-surface font-ui text-sm focus:border-kyn-green-500/50 focus:ring-4 focus:ring-kyn-green-500/5 outline-none transition-all" />
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-kyn-slate-400 group-focus-within:text-kyn-green-600 transition-colors" size={16} />
                    <input name="password" type="password" required placeholder="Access Key" className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-surface font-ui text-sm focus:border-kyn-green-500/50 focus:ring-4 focus:ring-kyn-green-500/5 outline-none transition-all" />
                  </div>
              </div>
              <SubmitButton label="Initialize Session" />
            </form>
        )}

        {/* REGISTER VIEW */}
        {view === 'register' && (
            <form action={signup} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="mb-6">
                  <h3 className="font-brand text-2xl font-bold text-kyn-slate-900">Register</h3>
                  <p className="text-xs text-kyn-slate-400 font-ui uppercase tracking-widest mt-1">Create Identity</p>
              </div>
              <div className="space-y-4">
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-kyn-slate-400 group-focus-within:text-kyn-green-600 transition-colors" size={16} />
                    <input name="email" type="email" required placeholder="Email Address" className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-surface font-ui text-sm focus:border-kyn-green-500/50 focus:ring-4 focus:ring-kyn-green-500/5 outline-none transition-all" />
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-kyn-slate-400 group-focus-within:text-kyn-green-600 transition-colors" size={16} />
                    <input name="password" type="password" required placeholder="Create Password" className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-surface font-ui text-sm focus:border-kyn-green-500/50 focus:ring-4 focus:ring-kyn-green-500/5 outline-none transition-all" />
                  </div>
              </div>
              <SubmitButton label="Create Identity" />
            </form>
        )}

        {/* USER MENU VIEW */}
        {(user && view === 'user-menu') && (
            <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="mb-6 text-center">
                  <p className="font-ui text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400 mb-1">Identity Active</p>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-surface border border-border">
                    <p className="font-brand font-bold text-kyn-slate-900 truncate max-w-[200px] text-sm">{user?.email}</p>
                  </div>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <MenuButton href="/account" icon={Shield} label="Account" onClick={closeAll} />
                <MenuButton href="/library" icon={Library} label="Library" onClick={closeAll} />
                <MenuButton href="/account/settings" icon={Settings} label="Settings" onClick={closeAll} />
              </div>

              <form action={logout} className="mt-4">
                  <button type="submit" className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-red-50 text-red-600 font-brand font-bold hover:bg-red-100 transition-colors active:scale-95">
                    <LogOut size={18} /> Terminate Session
                  </button>
              </form>
            </div>
        )}
      </div>
    </div>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit" className="w-full flex items-center justify-center gap-2 py-4 bg-kyn-slate-900 text-white rounded-2xl font-brand font-bold hover:bg-kyn-slate-800 transition-all disabled:opacity-70 active:scale-[0.98] shadow-lg shadow-kyn-slate-900/10">
      {pending ? <Loader2 size={18} className="animate-spin" /> : <>{label} <ArrowRight size={16} /></>}
    </button>
  );
}

function MenuButton({ href, icon: Icon, label, onClick }: any) {
  return (
    <Link href={href} onClick={onClick} className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-surface border border-transparent hover:border-border hover:bg-white text-kyn-slate-900 font-brand font-bold transition-all active:scale-[0.98]">
      <Icon size={18} className="text-kyn-slate-400" /> {label}
    </Link>
  );
}
