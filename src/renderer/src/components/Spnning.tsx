import { Loading } from '@icon-park/react'
import { cn } from '@renderer/utils/utils'

export interface SpnningProps {
  title?: string
  className?: string
  size?: number
  fontSize?: string
}

export default function Spnning({ title = '', size = 16, className = '', fontSize }: SpnningProps) {
  return (
    <div className="flex flex-row items-center justify-center gap-x-1">
      <Loading className={cn('animate-spin text-gray-600', className)} size={size}></Loading>
      {title && <span className={cn('text-gray-600 text-xs', fontSize)}>{title}</span>}
    </div>
  )
}
