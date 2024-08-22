import React from 'react'
import { ScrollArea } from './ui/scroll-area'
import { snippets, SnippetsType } from '@renderer/data/snippets'
import { DeleteOne, Editor } from '@icon-park/react'
import { cn } from '@renderer/utils/utils'
import InputButtonGroup from './InputButtonGroup'

export interface SnippetListProps extends React.HTMLAttributes<HTMLDivElement> {
  snippets: SnippetsType[]
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAddClick?: () => void
  onEditClick?: () => void
  onDeleteClick?: () => void
}

export default function SnippetList({
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

      <ScrollArea className="shrink-0 w-full rounded-md border">
        <div className="w-full p-4">
          {snippets.map((snippet) => (
            <div
              className="w-full flex flex-row justify-between items-center gap-x-2"
              key={'category_' + snippet.id}
            >
              <div className="text-base cursor-pointer h-9 flex items-center hover:bg-slate-200 px-3 rounded-md flex-1 w-0">
                <span className="truncate">{snippet.title}</span>
              </div>
              <div className="flex flex-row justify-between items-center shrink-0">
                <Editor
                  theme="outline"
                  size="18"
                  fill="#333"
                  className="cursor-pointer hover:bg-slate-200 rounded-md p-2"
                  onClick={onEditClick}
                />
                <DeleteOne
                  theme="outline"
                  size="18"
                  fill="red"
                  className="cursor-pointer hover:bg-slate-200 rounded-md p-2"
                  onClick={onDeleteClick}
                />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
