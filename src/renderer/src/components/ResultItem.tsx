import { cn } from '@renderer/utils/utils'
import React from 'react'

export interface ResultItemType {
  content: string
}

export interface ReusltItemProps {
  isActive?: boolean
  item: ResultItemType
}

const ResultItem: React.FC<ReusltItemProps> = ({ isActive, item }) => {
  return (
    <>
      <div
        className={cn(
          'w-full leading-loose flex flex-row justify-start gap-x-1 cursor-pointer px-2 py-1 rounded-lg',
          isActive ? 'bg-accent' : ''
        )}
      >
        <div className={'truncate'}>{item.content}</div>
      </div>
    </>
  )
}

export default ResultItem
