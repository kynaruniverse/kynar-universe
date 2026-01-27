import { EmptyState } from '@/shared/components/feedback/EmptyState'
import { Package } from 'lucide-react'

export default function NoPurchases() {
  return (
    <EmptyState
      icon={Package}
      title='Vault Is Empty'
      description='Your digital archive is currently awaiting its first artifact. Explore the universe to find your next tool.'
      action={{ label: 'Enter Store', href: '/store' }}
    />
  )
}
