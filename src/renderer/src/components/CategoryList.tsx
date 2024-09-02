import React from 'react'
import { ScrollArea } from './ui/scroll-area'
import { cn } from '@renderer/utils/utils'
import { Category } from '@main/db/entites/category'
import InputButtonGroup from './InputButtonGroup'
import OperationDropMenu from './OperationDropMenu'

export interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: Category[]
  showAll?: boolean
  activeId?: number | bigint
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAddClick?: () => void
  onCategoryClick?: (e: Category) => void
  onEditClick?: (c: Category) => void
  onDeleteClick?: (c: Category) => void
}

const CategoryList: React.FC<ContentProps> = ({
  categories = [],
  showAll = false,
  activeId = -1,
  onSearchChange = () => {},
  onAddClick = () => {},
  onCategoryClick = () => {},
  onEditClick = () => {},  onDeleteClick = () => {},
  className,
  ...props
}) => {
  return (
    <>
      <div className={cn('flex flex-col gap-y-2 border rounded-md p-2', className)} {...props}>
        <InputButtonGroup onInputChange={onSearchChange} onButtonClick={onAddClick} />

        <ScrollArea className="flex-1 shrink-0 rounded-md border w-full">
          <div className="w-full p-4">
            {showAll && (
              <div
                className="flex flex-row justify-between items-center"
                key={'category_all'}
                onClick={() => onCategoryClick({ id: -1, name: 'ALL' })}
              >
                <div
                  className={cn(
                    'text-sm cursor-pointer flex-1 w-0 h-9 flex justify-between items-center hover:bg-slate-200 px-3 rounded-md gap-y-2',
                    activeId === -1 && 'bg-slate-200'
                  )}
                >
                  <span className="w-full truncate">ALL</span>
                </div>
              </div>
            )}
            {categories.map((category) => (
              <div
                className="flex flex-row justify-between items-center"
                key={'category_' + category.id}
                onClick={() => onCategoryClick(category)}
              >
                <div
                  className={cn(
                    'text-sm cursor-pointer flex-1 w-0 h-9 flex justify-between items-center hover:bg-slate-200 px-3 rounded-md gap-y-2',
                    activeId === category.id && 'bg-slate-200'
                  )}
                >
                  <span className="w-full truncate">{category.name}</span>
                </div>

                <OperationDropMenu
                  onEditClick={() => onEditClick(category)}
                  onDeleteClick={() => onDeleteClick(category)}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  )
}

export default CategoryList
