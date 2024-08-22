import { Category } from '@main/db/entites/category'
import CategoryList from '@renderer/components/CategoryList'
import SnippetList from '@renderer/components/SnippetList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'
import { snippets } from '@renderer/data/snippets'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Config Page
export default function Config() {
  const [categories, setCategories] = useState<Category[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = (params?: Map<string, any>) => {
    window.api.findAllCategory(params).then((data) => {
      setCategories(data || [])
    })
  }

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    const params = new Map<string, any>([['name', val]])
    getCategories(params)
  }

  const addCategory = () => {
    navigate('/config/category/add')
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
              className="w-48 flex shrink-0"
              categories={categories}
              onSearchChange={onSearchChange}
              onAddClick={addCategory}
            />
            <SnippetList className="flex-1 h-full w-full" snippets={snippets} />
          </div>
        </TabsContent>
        <TabsContent value="shortcut">Change your password here.</TabsContent>
      </Tabs>
    </div>
  )
}
