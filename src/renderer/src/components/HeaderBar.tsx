import { ArrowLeft } from '@icon-park/react'
import { cn } from '@renderer/utils/utils'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export interface HeaderBarProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  title?: string
  showBack?: boolean
  onBackClick?: () => void
}

export default function HeaderBar({
  title,
  showBack = true,
  onBackClick,
  className,
  ...props
}: HeaderBarProps) {
  const navigate = useNavigate()
  const handleBackClick = () => {
    if (typeof onBackClick === 'function') {
      onBackClick()
    } else {
      navigate(-1)
    }
  }
  return (
    <div
      className={cn('flex flex-row justify-start items-center border-b p-2', className)}
      {...props}
    >
      {showBack && (
        <div className="cursor-pointer p-2 hover:bg-slate-200 rounded-md" onClick={handleBackClick}>
          <ArrowLeft size={18} color="gray"></ArrowLeft>
        </div>
      )}

      <span className="text-base font-bold ml-4">{title}</span>
    </div>
  )
}
