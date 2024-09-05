import { Content } from '@main/db/entites/content'
import { cn } from '@renderer/utils/utils'
import React, { useEffect } from 'react'

export interface ReusltItemProps {
  isActive?: boolean
  item: Content
  onClick?: (item: Content) => void
}

const ResultItem: React.FC<ReusltItemProps> = ({ isActive, item, onClick, ...props }) => {
  const handleMouseClick = (item: Content) => {
    onClick && onClick(item)
  }


  return (
    <>
      <div
        onClick={() => handleMouseClick(item)}
        className={cn(
          'w-full leading-loose flex flex-row justify-start gap-x-1 cursor-pointer px-2 py-1 rounded-lg',
          isActive ? 'bg-accent' : ''
        )}
        {...props}
      >
        <div className='w-full flex flex-col gap-y-1'>
          <div className="truncate no-select font-bold text-base">{item.title}</div>
          <div className={'truncate no-select text-sm'}>{item.content}</div>
        </div>
      </div>
    </>
  )
}

export default ResultItem
