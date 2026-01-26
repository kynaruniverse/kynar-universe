import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';

export default function AdminNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-black text-primary">Admin Page Not Found</h2>
        <Link href="/admin" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold">
          <LayoutDashboard size={18} />
          Dashboard
        </Link>
      </div>
    </div>
  );
}