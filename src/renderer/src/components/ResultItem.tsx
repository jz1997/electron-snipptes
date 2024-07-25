import { cn } from '@renderer/utils/utils'
import React from 'react'

export interface ResultItemType {
  id: number
  content: string
}

export interface ReusltItemProps {
  isActive?: boolean
  item: ResultItemType
  onClick?: (item: ResultItemType) => void
}

const ResultItem: React.FC<ReusltItemProps> = ({ isActive, item, onClick, ...props }) => {
  const handleMouseClick = (item: ResultItemType) => {
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
        <div className={'truncate no-select'}>{item.content}</div>
      </div>
    </>
  )
}

export default ResultItem
