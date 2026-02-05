import Link from "next/link";
/** * Add this to app/account/page.tsx 
 */
import { logout } from "../auth/actions";

export default function AccountPage() {
  return (
    <main className="max-w-screen-xl mx-auto px-gutter py-20">
      <h1 className="font-brand text-4xl font-bold text-kyn-slate-900">Account</h1>
      
      <form action={logout} className="mt-12">
        <button 
          type="submit" 
          className="px-6 py-2 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 font-brand font-bold transition-colors"
        >
          Terminate Session (Logout)
        </button>
      </form>
    </main>
  );
}

export default function AccountPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-gutter py-20">
      <h1 className="font-brand text-4xl font-bold">Your Account</h1>
      <p className="mt-4 text-text-secondary">Manage your presence in the Kynar Universe.</p>
      <Link href="/account/settings" className="mt-8 inline-block text-kyn-green-600 font-bold">
        Go to Settings →
      </Link>
    </div>
  );
}
