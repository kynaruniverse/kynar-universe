"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Shield, Library, Settings, LogOut, X, ArrowRight, Loader2, Mail, Lock } from "lucide-react";
import { login, signup, logout } from "@/app/auth/actions";
import { cn } from "@/lib/utils";
import { AuthMessage } from "../auth/AuthMessage";
import { useFormStatus } from "react-dom";
import { Suspense } from "react";

export default function UserMenu({ user }: { user: any }) {
  const [view, setView] = useState<'closed' | 'gateway' | 'login' | 'register' | 'user-menu'>('closed');

  const closeAll = () => setView('closed');

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={() => setView(user ? 'user-menu' : 'gateway')}
        className={cn(
          "group relative flex h-10 w-10 items-center justify-center rounded-xl border transition-all active:scale-90 z-[70]",
          view !== 'closed' ? "bg-kyn-slate-900 text-white border-kyn-slate-900" : "bg-surface border-border text-kyn-slate-400"
        )}
      >
        <User size={16} strokeWidth={2.5} />
        {user && <span className="absolute inset-0 rounded-xl ring-2 ring-kyn-green-500/20 animate-pulse" />}
      </button>

      {view !== 'closed' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-gutter">
          
          {/* DARK BACKDROP: Clicking this now explicitly closes the menu */}
          <div 
            className="absolute inset-0 bg-kyn-slate-900/60 backdrop-blur-sm animate-in fade-in duration-500" 
            onClick={closeAll} 
          />

          {/* CENTERED MODAL BOX */}
          <div className="relative w-full max-w-sm overflow-hidden rounded-[2.5rem] border border-border bg-white p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            
            {/* Close Button */}
            <button 
              onClick={closeAll} 
              className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-surface text-kyn-slate-400 hover:text-kyn-slate-900 transition-colors z-10"
            >
              <X size={18} />
            </button>

            <Suspense fallback={null}>
               <AuthMessage />
            </Suspense>

            {/* GATEWAY VIEW */}
            {view === 'gateway' && (
              <div className="flex flex-col gap-4 py-4">
                <div className="text-center mb-4">
                  <h3 className="font-brand text-2xl font-bold text-kyn-slate-900">Access Portal</h3>
                  <p className="text-sm text-text-secondary font-ui mt-1">Select your entry method.</p>
                </div>
                <button onClick={() => setView('login')} className="w-full py-4 bg-kyn-slate-900 text-white rounded-2xl font-brand font-bold hover:bg-kyn-slate-800 transition-all active:scale-[0.98]">
                  Sign In
                </button>
                <button onClick={() => setView('register')} className="w-full py-4 border border-border text-kyn-slate-900 rounded-2xl font-brand font-bold hover:bg-surface transition-all active:scale-[0.98]">
                  Register Identity
                </button>
              </div>
            )}

            {/* LOGIN VIEW */}
            {view === 'login' && (
              <form action={login} className="space-y-5">
                <div className="mb-6">
                  <h3 className="font-brand text-2xl font-bold text-kyn-slate-900">Sign In</h3>
                  <p className="text-xs text-kyn-slate-400 font-ui uppercase tracking-widest mt-1">Initialize Session</p>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-kyn-slate-400" size={16} />
                    <input name="email" type="email" required placeholder="Email Address" className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-surface font-ui text-sm focus:ring-2 focus:ring-kyn-green-500/20 outline-none" />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-kyn-slate-400" size={16} />
                    <input name="password" type="password" required placeholder="Access Key" className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-surface font-ui text-sm focus:ring-2 focus:ring-kyn-green-500/20 outline-none" />
                  </div>
                </div>
                <SubmitButton label="Initialize Session" />
                <button type="button" onClick={() => setView('register')} className="w-full text-center text-xs font-bold font-ui text-kyn-slate-400 hover:text-kyn-slate-900 transition-colors">Need an identity? Register</button>
              </form>
            )}

            {/* REGISTER VIEW */}
            {view === 'register' && (
              <form action={signup} className="space-y-5">
                <div className="mb-6">
                  <h3 className="font-brand text-2xl font-bold text-kyn-slate-900">Register</h3>
                  <p className="text-xs text-kyn-slate-400 font-ui uppercase tracking-widest mt-1">Create Identity</p>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-kyn-slate-400" size={16} />
                    <input name="email" type="email" required placeholder="Email Address" className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-surface font-ui text-sm focus:ring-2 focus:ring-kyn-green-500/20 outline-none" />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-kyn-slate-400" size={16} />
                    <input name="password" type="password" required placeholder="Create Password" className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-surface font-ui text-sm focus:ring-2 focus:ring-kyn-green-500/20 outline-none" />
                  </div>
                </div>
                <SubmitButton label="Create Identity" />
                <button type="button" onClick={() => setView('login')} className="w-full text-center text-xs font-bold font-ui text-kyn-slate-400 hover:text-kyn-slate-900 transition-colors">Already registered? Sign in</button>
              </form>
            )}

            {/* USER MENU VIEW */}
            {view === 'user-menu' && (
              <div className="flex flex-col gap-3">
                <div className="mb-4 text-center">
                  <p className="font-ui text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400">Identity Active</p>
                  <p className="font-brand font-bold text-kyn-slate-900 truncate">{user.email}</p>
                </div>
                <MenuButton href="/account" icon={Shield} label="Account" onClick={closeAll} />
                <MenuButton href="/library" icon={Library} label="Library" onClick={closeAll} />
                <MenuButton href="/account/settings" icon={Settings} label="Settings" onClick={closeAll} />
                <form action={logout} className="mt-2">
                  <button type="submit" className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-red-50 text-red-600 font-brand font-bold hover:bg-red-100 transition-colors active:scale-95">
                    <LogOut size={18} /> Terminate Session
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit" className="w-full flex items-center justify-center gap-2 py-4 bg-kyn-slate-900 text-white rounded-2xl font-brand font-bold hover:bg-kyn-slate-800 transition-all disabled:opacity-70 active:scale-[0.98]">
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
