import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Library | Kynar Universe',
  description: 'Manage your purchases and downloads.',
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
