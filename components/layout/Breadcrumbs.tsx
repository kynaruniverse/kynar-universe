"use client";

import Link from "next/link";
import React from "react";
import { ChevronRight } from "lucide-react";
import { clsx } from "clsx";

/**
 * KYNAR UNIVERSE: Breadcrumbs
 * Purpose: Provide a non-intrusive 'Handrail' for navigation.
 * Hierarchy: Universe > [World/Store] > [Category] > [Product]
 */

interface Path {
  label: string;
  href: string;
  colorClass?: string; // Optional: e.g., 'text-kyn-green-600' for World context
}

interface BreadcrumbsProps {
  paths: Path[];
  showUniverseRoot?: boolean;
}

export const Breadcrumbs = ({ paths, showUniverseRoot = true }: BreadcrumbsProps) => {
  return (
    <nav 
      className="flex items-center gap-2 overflow-x-auto no-scrollbar whitespace-nowrap px-4 py-3 md:px-6 text-[13px] font-medium tracking-tight" 
      aria-label="Breadcrumb"
    >
      {showUniverseRoot && (
        <>
          <Link 
            href="/" 
            className="text-text-secondary hover:text-text-primary transition-colors duration-300 ease-in-out"
          >
            Universe
          </Link>
          {paths.length > 0 && (
            <ChevronRight 
              size={12} 
              className="text-kyn-slate-300 shrink-0" 
              strokeWidth={2} 
              aria-hidden="true" 
            />
          )}
        </>
      )}

      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        
        return (
          <React.Fragment key={path.href}>
            <Link 
              href={path.href}
              aria-current={isLast ? "page" : undefined}
              className={clsx(
                "transition-colors duration-300 ease-in-out",
                isLast 
                  ? "text-text-primary font-semibold" 
                  : "text-text-secondary hover:text-text-primary",
                path.colorClass && !isLast && path.colorClass
              )}
            >
              {path.label}
            </Link>

            {!isLast && (
              <ChevronRight 
                size={12} 
                className="text-kyn-slate-300 shrink-0" 
                strokeWidth={2} 
                aria-hidden="true" 
              />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
