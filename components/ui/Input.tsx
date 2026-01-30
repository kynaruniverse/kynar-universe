import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <div className="w-full space-y-2">
      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-kyn-slate-400 ml-1">
        {label}
      </label>
      <input 
        {...props}
        className="w-full px-5 py-4 rounded-2xl border border-kyn-slate-500/10 bg-white text-kyn-green-700 focus:ring-2 focus:ring-kyn-green-500/20 outline-none transition-all placeholder:text-kyn-slate-300"
      />
    </div>
  );
}
