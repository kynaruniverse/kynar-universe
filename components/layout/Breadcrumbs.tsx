"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import { Fragment } from "react";

interface Path {
  label: string;
  href: string;
}

export const Breadcrumbs = ({ paths }: { paths: Path[] }) => {
  return (
    <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar whitespace-nowrap px-gutter py-4 text-[11px] font-bold uppercase tracking-widest">
      <Link href="/" className="text-kyn-slate-400 hover:text-kyn-slate-900">Universe</Link>
      {paths.map((path, index) => (
        <Fragment key={path.href}>
          <ChevronRight size={10} className="text-kyn-slate-300 shrink-0" />
          <Link 
            href={path.href} 
            className={clsx(
              index === paths.length - 1 ? "text-kyn-slate-900" : "text-kyn-slate-400 hover:text-kyn-slate-900"
            )}
          >
            {path.label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};
