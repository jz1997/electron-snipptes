import React, { useEffect, useRef } from 'react'
import { ScrollArea } from '../../../../components/ui/scroll-area'
import { cn } from '@renderer/utils/utils'
import { Category } from '@main/db/entites/category'
import OperationDropMenu from '../../../../components/OperationDropMenu'
import useCategory from '@renderer/hooks/useCategory'
import { useNavigate } from 'react-router-dom'

import ContentToolbar from '@renderer/components/config/ContentToolbar'
import ModifyCategoryDialog, {
  ModifyCategoryDialogHandle
} from '@renderer/components/config/ModifyCategoryDialog'
import useConfirm from '@renderer/hooks/useConfirm'

const CategoryList: React.FC = ({}) => {
  const navigate = useNavigate()
  const {
    categories = [],
    getCategories,
    activeId,
    setActiveId,
    addCategory,
    editCategory,
    deleteCategory
  } = useCategory()

  const modifyCategoryDialogRef = useRef<ModifyCategoryDialogHandle>(null)
  const { confirm } = useConfirm()

  useEffect(() => {
    getCategories()
    if (activeId === -1) {
      navigate(`/config/content/categories/${-1}/contents`)
    }
  }, [])

  const onCategoryClick = (c: Category) => {
    setActiveId(c.id || -1)
    navigate(`/config/content/categories/${c.id}/contents`)
  }

  const onAddClick = () => {
    modifyCategoryDialogRef.current?.open()
  }

  const saveOrUpdateCategory = (c: Category) => {
    if (!c.createAt) {
      c.createAt = new Date()
    }

    if (c.id) {
      editCategory(c)
    } else {
      addCategory(c)
    }
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

        {/* Toolbar */}
        <ContentToolbar
          onRefreshClick={() => getCategories()}
          onAddClick={onAddClick}
          editDisable={activeId === -1}
          deleteDisable={activeId === -1}
          onDeleteClick={() =>
            confirm('系统提示', '是否删除选中的分类？', {
              onConfirm: () => deleteCategory(activeId)
            })
          }
        />

        {/* Modify Category Dialog */}
        <ModifyCategoryDialog ref={modifyCategoryDialogRef} onSubmit={saveOrUpdateCategory} />
      </div>
    </>
  )
}

export default CategoryList
