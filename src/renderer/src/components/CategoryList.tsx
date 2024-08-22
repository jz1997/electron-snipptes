import React from 'react'
import { ScrollArea } from './ui/scroll-area'
import { cn } from '@renderer/utils/utils'
import { Category } from '@main/db/entites/category'
import InputButtonGroup from './InputButtonGroup'

export interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: Category[]
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAddClick?: () => void
}

const CategoryList: React.FC<ContentProps> = ({
  categories,
  onSearchChange = (_e) => {},
  onAddClick = () => {},
  className,
  ...props
}) => {
  return (
    <>
      <div className={cn('flex flex-col gap-y-2 border rounded-md p-2', className)} {...props}>
        <InputButtonGroup onInputChange={onSearchChange} onButtonClick={onAddClick} />

        <ScrollArea className="flex-1 shrink-0 w-full rounded-md border">
          <div className="p-4">
            {categories.map((category) => (
              <div
                className="flex flex-row justify-between items-center"
                key={'category_' + category.id}
              >
                <div className="text-sm  cursor-pointer w-full h-9 flex justify-between items-center hover:bg-slate-200 px-3 rounded-md gap-y-2">
                  {category.name}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  )
}

export default CategoryList
