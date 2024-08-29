import { Category } from '@main/db/entites/category'
import CategoryList from '@renderer/components/CategoryList'
import SnippetList from '@renderer/components/SnippetList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'
import { Toaster } from '@renderer/components/ui/toaster'
import useCategory from '@renderer/hooks/useCategory'
import useContent from '@renderer/hooks/useContent'
import { useEffect } from 'react'

// Config Page
export default function Config() {
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
    <div className="w-screen h-screen bg-white p-4">
      <Tabs defaultValue="content" className="w-full h-full flex flex-col">
        <div className="h-12 flex items-center">
          <TabsList>
            <TabsTrigger value="content">内容</TabsTrigger>
            <TabsTrigger value="shortcut">快捷键</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent className="w-full flex-1 h-0" value="content">
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
        </TabsContent>
        <TabsContent value="shortcut">Change your password here.</TabsContent>
      </Tabs>

      <Toaster />
    </div>
  )
}
