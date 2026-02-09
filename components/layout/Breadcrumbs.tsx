"use client";

/* KYNAR UNIVERSE: components/layout/Breadcrumbs.tsx */

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbPath {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  paths: BreadcrumbPath[];
}

export const Breadcrumbs = ({ paths }: BreadcrumbsProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 overflow-x-auto no-scrollbar whitespace-nowrap px-gutter py-4 text-[11px] font-bold uppercase tracking-widest"
    >
      {/* Home / Root link */}
      <Link
        href="/"
        className="text-kyn-slate-400 hover:text-kyn-slate-900 transition-colors"
      >
        Universe
      </Link>

      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;

        return (
          <div key={path.href} className="flex items-center gap-2">
            <ChevronRight size={10} className="text-kyn-slate-300 shrink-0" />
            {isLast ? (
              <span className="text-kyn-slate-900 cursor-default">{path.label}</span>
            ) : (
              <Link
                href={path.href}
                className="text-kyn-slate-400 hover:text-kyn-slate-900 transition-colors"
              >
                {path.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};