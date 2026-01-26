import { Skeleton } from '@/shared/components/ui/Skeleton'

export default function NewProductLoading() {
  return (
    <div className='space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto px-4'>
      <div className='space-y-2'>
        <Skeleton className='h-10 w-64 rounded-xl' />
        <Skeleton className='h-4 w-48 rounded-lg' />
      </div>
      
      {/* Mirroring the rounded-[2.5rem] form container */}
      <Skeleton className='h-[600px] w-full rounded-[2.5rem]' />
    </div>
  )
}
