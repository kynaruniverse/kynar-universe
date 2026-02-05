import Link from "next/link";

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
