import { useEffect, useRef } from 'react'
import { ScrollArea } from '../../../../components/ui/scroll-area'
import { cn } from '@renderer/utils/utils'
import { Category } from '@main/db/entites/category'
import useCategory from '@renderer/hooks/useCategory'
import { useNavigate } from 'react-router-dom'

import ContentToolbar from '@renderer/components/config/ContentToolbar'
import ModifyCategoryDialog, {
  ModifyCategoryDialogHandle
} from '@renderer/components/config/ModifyCategoryDialog'
import useConfirm from '@renderer/hooks/useConfirm'
import { INVALID_ID } from '@renderer/utils/const'
import InputText from '@renderer/components/InputText'
import { Input } from '@renderer/components/ui/input'

export default function CategoryList() {
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

  const onInputEnterKeyDown = (newText: string, c: Category) => {
    if (newText && c.id !== INVALID_ID) {
      c.name = newText
      editCategory(c)
    }
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
        <div className='w-full pr-2'>
          <input className="w-full border outline-none focus:border-slate-200 rounded px-2 py-1 text-sm h-9" />
        </div>
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
              >
                <InputText
                  text={category.name || ''}
                  active={category.id === activeId}
                  onTextClick={() => onCategoryClick(category)}
                  onInputEnterKeyDown={(text) => onInputEnterKeyDown(text, category)}
                />
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Toolbar */}
        <ContentToolbar
          onRefreshClick={() => getCategories()}
          onAddClick={onAddClick}
          editDisable={activeId === INVALID_ID}
          showEdit={false}
          deleteDisable={activeId === INVALID_ID}
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
