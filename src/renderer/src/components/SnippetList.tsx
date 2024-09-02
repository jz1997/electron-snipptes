import React from 'react'
import { ScrollArea } from './ui/scroll-area'
import { cn } from '@renderer/utils/utils'
import InputButtonGroup from './InputButtonGroup'
import OperationDropMenu from './OperationDropMenu'
import { Content } from '@main/db/entites/content'
import moment from 'moment'
import { formatDate } from '@renderer/utils/datetime'

export interface SnippetListProps extends React.HTMLAttributes<HTMLDivElement> {
  contents: Content[]
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAddClick?: () => void
  onEditClick?: (c: Content) => void
  onDeleteClick?: (c: Content) => void
}

export default function SnippetList({
  contents = [],
  onSearch = (_e) => {},
  onAddClick = () => {},
  onEditClick = () => {},
  onDeleteClick = () => {},
  className,
  ...props
}: SnippetListProps) {
  return (
    <div className={cn('flex flex-col gap-y-2 border rounded-md p-2', className)} {...props}>
      <InputButtonGroup onInputChange={onSearch} onButtonClick={onAddClick} />

      <ScrollArea className="shrink-0 w-full rounded-md border flex-1">
        <div className="w-full p-4">
          {contents.map((snippet) => (
            <div
              className="w-full flex flex-row justify-between items-center gap-x-2"
              key={'category_' + snippet.id}
            >
              <div className="text-base cursor-pointer h-9 flex justify-between items-center gap-x-2 hover:bg-slate-200 px-3 rounded-md flex-1 w-0">
                <span className="truncate">{snippet.title}</span>
                <span className="text-xs text-gray-700">
                  {formatDate(snippet.createAt, 'YYYY/MM/DD')}
                </span>
              </div>
              <div className="flex flex-row justify-between items-center shrink-0">
                <OperationDropMenu
                  onEditClick={() => onEditClick(snippet)}
                  onDeleteClick={() => onDeleteClick(snippet)}
                />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
