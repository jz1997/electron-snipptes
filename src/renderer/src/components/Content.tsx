import React, { ReactElement } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { PlusIcon } from 'lucide-react'
import { ScrollArea } from './ui/scroll-area'
import { cn } from '@renderer/utils/utils'
import { Category } from '@main/db/entites/category'
import { useNavigate } from 'react-router-dom'

export interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: Category[]
  onSearchChange?: (val: string) => void
}

const Content: React.FC<ContentProps> = ({ categories, onSearchChange, className, ...props }) => {
  const naviagte = useNavigate()

  const gotoAddCategory = () => {
    naviagte('/config/category/add')
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof onSearchChange === 'function') {
      onSearchChange(e.target.value)
    }
  }

  return (
    <>
      <div className={cn('flex flex-col gap-y-2', className)} {...props}>
        <div className="w-full flex flex-row justify-between items-center gap-x-2">
          <Input placeholder="Search" className="h-10" onChange={handleSearchChange}></Input>
          <Button size="sm" onClick={gotoAddCategory}>
            <PlusIcon />
          </Button>
        </div>

        <ScrollArea className="flex-1 shrink-0 w-full rounded-md border">
          <div className="p-4">
            {categories.map((category) => (
              <div key={'category_' + category.id}>
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

export default Content
