import React from 'react';

export default function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`py-12 px-6 max-w-xl mx-auto ${className}`}>
      {children}
    </section>
  );
}
