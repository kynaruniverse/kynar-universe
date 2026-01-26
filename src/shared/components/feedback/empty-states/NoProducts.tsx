import EmptyState from '@/shared/components/feedback/EmptyState'
import { PackageX } from 'lucide-react'

export function NoProducts() {
  return (
    <EmptyState
      icon={PackageX}
      title='No Products Found'
      description='Try adjusting your filters or search terms'
    />
  )
}
