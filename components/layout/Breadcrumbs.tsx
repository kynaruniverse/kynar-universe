"use client";

/**
 * KYNAR UNIVERSE: Breadcrumbs (v2.3)
 * Fix: Removed React import & Fragment to resolve Turbopack parsing error.
 */

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Path {
  label: string;
  href: string;
}

export const Breadcrumbs = ({ paths }: { paths: Path[] }) => {
  return (
    <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar whitespace-nowrap px-gutter py-4 text-[11px] font-bold uppercase tracking-widest">
      <Link 
        href="/" 
        className="text-kyn-slate-400 hover:text-kyn-slate-900 transition-colors"
      >
        Universe
      </Link>
      
      {paths.map((path, index) => (
        <div key={path.href} className="flex items-center gap-2">
          <ChevronRight size={10} className="text-kyn-slate-300 shrink-0" />
          <Link 
            href={path.href} 
            className={cn(
              "transition-colors",
              index === paths.length - 1 
                ? "text-kyn-slate-900 cursor-default" 
                : "text-kyn-slate-400 hover:text-kyn-slate-900"
            )}
          >
            {path.label}
          </Link>
        </div>
      ))}
    </nav>
  );
};
