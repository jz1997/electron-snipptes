import React, { useEffect } from 'react'
import CategoryList from '../CategoryList'
import SnippetList from '../SnippetList'
import useContent from '@renderer/hooks/useContent'
import useCategory from '@renderer/hooks/useCategory'
import { Category } from '@main/db/entites/category'

export default function ContentTab() {
  const {
    categories,
    getCategories,
    activeId,
    setActiveId,
    onSearchChange,
    addCategory,
    editCategory,
    deleteCategory
  } = useCategory()

  const {
    contents,
    updateCateoryParamsAndFetch,
    getContents,
    onSearch: onSearchContent,
    onAddContent,
    onEditContent,
    onRemoveContent
  } = useContent()

  useEffect(() => {
    getCategories()
    getContents()
  }, [])

  const onCategoryClick = (c: Category) => {
    setActiveId(c.id)
    updateCateoryParamsAndFetch(c.id)
  }

  return (
    <div className="flex flex-row w-full h-full  justify-between gap-x-2">
      <CategoryList
        showAll={true}
        className="w-64 flex shrink-0"
        activeId={activeId}
        categories={categories}
        onCategoryClick={onCategoryClick}
        onSearchChange={onSearchChange}
        onAddClick={addCategory}
        onEditClick={editCategory}
        onDeleteClick={deleteCategory}
      />
      <SnippetList
        className="flex-1 h-full w-full"
        contents={contents}
        onSearch={onSearchContent}
        onDeleteClick={onRemoveContent}
        onAddClick={onAddContent}
        onEditClick={onEditContent}
      />
    </div>
  )
}
