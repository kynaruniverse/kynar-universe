import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Library | Kynar Universe',
  description: 'Manage your digital artifacts and indexed purchases.',
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
