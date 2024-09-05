import React, { useEffect, useRef } from 'react'
import { ScrollArea } from '../../../../components/ui/scroll-area'
import { cn } from '@renderer/utils/utils'
import { Category } from '@main/db/entites/category'
import OperationDropMenu from '../../../../components/OperationDropMenu'
import useCategory from '@renderer/hooks/useCategory'
import { useNavigate } from 'react-router-dom'
import { Delete, Editor, FolderPlus, Refresh } from '@icon-park/react'

import CategoryForm, { CategoryFormHandle } from '@renderer/components/CategoryForm'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@renderer/components/ui/dialog'
import { Button } from '@renderer/components/ui/button'

const CategoryList: React.FC = ({}) => {
  const navigate = useNavigate()
  const {
    categories = [],
    getCategories,
    activeId,
    setActiveId,
    editCategory,
    deleteCategory
  } = useCategory()

  const categoryFormRef = useRef<CategoryFormHandle>(null)

  useEffect(() => {
    getCategories()
    if (activeId === -1) {
      navigate(`/config/content/categories/${-1}/contents`)
    }
  }, [])

  const onCategoryClick = (c: Category) => {
    setActiveId(c.id)
    navigate(`/config/content/categories/${c.id}/contents`)
  }

  return (
    <>
      <div className="flex flex-col justify-between items-center gap-y-2 w-full h-full">
        <ScrollArea className="rounded-md w-full flex-1 h-0">
          <div className="w-full flex flex-col gap-y-1 pr-2">
            <div
              className="flex flex-row justify-between items-center"
              key={'category_all'}
              onClick={() => onCategoryClick({ id: -1, name: 'ALL' })}
            >
              <div
                className={cn(
                  'text-sm cursor-pointer flex-1 w-0 flex justify-between items-center hover:bg-slate-200 px-2 py-2 rounded-md',
                  activeId === -1 && 'bg-slate-200'
                )}
              >
                <span className="w-full truncate">ALL</span>
              </div>
            </div>

            {categories.map((category) => (
              <div
                className="flex flex-row justify-between items-center"
                key={'category_' + category.id}
                onClick={() => onCategoryClick(category)}
              >
                <div
                  className={cn(
                    'text-sm cursor-pointer flex-1 w-0 flex justify-between items-center hover:bg-slate-200 px-2 py-2 rounded-md',
                    activeId === category.id && 'bg-slate-200'
                  )}
                >
                  <span className="w-full truncate">{category.name}</span>
                </div>

                <OperationDropMenu
                  onEditClick={() => editCategory(category)}
                  onDeleteClick={() => deleteCategory(category)}
                />
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="w-full flex justify-center items-center gap-x-1 border-t pt-2">
          <Refresh
            theme="outline"
            size="20"
            className="p-1 text-gray-800 hover:bg-slate-200 rounded-md cursor-pointer"
            onClick={() => getCategories()}
          />
          <Dialog>
            <DialogTrigger asChild>
              <FolderPlus
                size={20}
                className="p-1 text-gray-800 hover:bg-slate-200 rounded-md cursor-pointer"
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新增分类</DialogTitle>
              </DialogHeader>
              <CategoryForm ref={categoryFormRef} />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">取消</Button>
                </DialogClose>
                <Button
                  onClick={() => {
                    categoryFormRef.current?.submit()
                  }}
                >
                  提交
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Editor
            theme="outline"
            size={20}
            className="p-1 text-gray-800 hover:bg-slate-200 rounded-md"
          />
          <Delete
            theme="outline"
            size={20}
            className="p-1 text-red-500 hover:bg-slate-200 rounded-md"
          />
        </div>
      </div>
    </>
  )
}

export default CategoryList
