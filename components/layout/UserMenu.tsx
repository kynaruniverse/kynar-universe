"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Shield, Library, Settings, LogOut, X, 
  ArrowRight, Loader2, Mail, Lock, ChevronLeft 
} from "lucide-react";
import { login, signup, logout } from "@/app/auth/actions";
import { AuthMessage } from "../auth/AuthMessage";
import { useFormStatus } from "react-dom";
import { Suspense } from "react";
import { useUIStore } from "@/lib/store/ui";
import { Database } from "@/lib/supabase/types";

// Get the specific Row type for your profiles table
type Profile = Database['public']['Tables']['profiles']['Row'];

export default function UserMenu({ user }: { user: Profile | null }) {
  const isOpen = useUIStore((state) => state.isUserMenuOpen);
  const closeUserMenu = useUIStore((state) => state.closeUserMenu);
  
  const [view, setView] = useState<'gateway' | 'login' | 'register' | 'user-menu'>(
    user ? 'user-menu' : 'gateway'
  );

  useEffect(() => {
    if (user) setView('user-menu');
    else if (view === 'user-menu') setView('gateway');
  }, [user, view]);

  if (!isOpen) return null;

  const closeAll = () => {
    closeUserMenu();
    if (!user) setTimeout(() => setView('gateway'), 300);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
      
      <div 
        className="absolute inset-0 bg-kyn-slate-900/60 backdrop-blur-md animate-in fade-in duration-500" 
        onClick={closeAll} 
      />

      <div className="relative w-full max-w-[400px] overflow-hidden rounded-[2.5rem] border border-white/20 bg-white p-8 shadow-2xl animate-in zoom-in-95 fade-in slide-in-from-bottom-8 duration-500 ease-out">
        
        <div className="absolute left-8 top-8 flex items-center gap-4 z-10">
          {view !== 'gateway' && view !== 'user-menu' && (
            <button 
              onClick={() => setView('gateway')}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
          )}
        </div>

        <button 
          onClick={closeAll} 
          className="absolute right-8 top-8 flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors z-10"
        >
          <X size={18} />
        </button>

        <div className="mt-4">
          <Suspense fallback={null}>
              <AuthMessage />
          </Suspense>
        </div>

        {(!user && view === 'gateway') && (
            <div className="flex flex-col gap-4 py-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="text-center mb-6">
                  <h3 className="font-bold text-3xl text-slate-900 tracking-tight">Access Portal</h3>
                  <p className="text-sm text-slate-500 mt-2">Identify yourself to proceed.</p>
              </div>
              <button 
                onClick={() => setView('login')} 
                className="group w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Sign In <ArrowRight size={16} className="opacity-50 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setView('register')} 
                className="w-full py-4 border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-[0.98]"
              >
                Register Identity
              </button>
            </div>
        )}

        {view === 'login' && (
            <form action={login} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">Sign In</h3>
                  <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Initialize Session</p>
              </div>
              <div className="space-y-4">
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={16} />
                    <input name="email" type="email" required placeholder="Email Address" className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 outline-none transition-all" />
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={16} />
                    <input name="password" type="password" required placeholder="Access Key" className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 outline-none transition-all" />
                  </div>
              </div>
              <SubmitButton label="Initialize Session" />
            </form>
        )}

        {view === 'register' && (
            <form action={signup} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">Register</h3>
                  <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Create Identity</p>
              </div>
              <div className="space-y-4">
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={16} />
                    <input name="email" type="email" required placeholder="Email Address" className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 outline-none transition-all" />
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={16} />
                    <input name="password" type="password" required placeholder="Create Password" className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 outline-none transition-all" />
                  </div>
              </div>
              <SubmitButton label="Create Identity" />
            </form>
        )}

        {(user && view === 'user-menu') && (
            <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="mb-6 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Identity Active</p>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200">
                    {/* Note: In your DB 'profiles' table, verify if email exists or use another field */}
                    <p className="font-bold text-slate-900 truncate max-w-[200px] text-sm">{user?.id}</p>
                  </div>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <MenuButton href="/account" icon={Shield} label="Account" onClick={closeAll} />
                <MenuButton href="/library" icon={Library} label="Library" onClick={closeAll} />
                <MenuButton href="/account/settings" icon={Settings} label="Settings" onClick={closeAll} />
              </div>

              <form action={logout} className="mt-4">
                  <button type="submit" className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors active:scale-95">
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
    <button disabled={pending} type="submit" className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all disabled:opacity-70 active:scale-[0.98] shadow-lg shadow-slate-900/10">
      {pending ? <Loader2 size={18} className="animate-spin" /> : <>{label} <ArrowRight size={16} /></>}
    </button>
  );
}

function MenuButton({ href, icon: Icon, label, onClick }: { href: string, icon: any, label: string, onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-slate-50 border border-transparent hover:border-slate-200 hover:bg-white text-slate-900 font-bold transition-all active:scale-[0.98]">
      <Icon size={18} className="text-slate-400" /> {label}
    </Link>
  );
}
