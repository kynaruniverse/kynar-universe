import { EmptyState } from '@/shared/components/feedback/EmptyState';
import { Package } from 'lucide-react';

export function NoPurchases() {
  return (
    <EmptyState
      icon={Package}
      title="The vault is empty"
      description="Explore the store to find tools that simplify your life."
      action={{ label: 'Browse Store', href: '/store' }}
    />
  );
}