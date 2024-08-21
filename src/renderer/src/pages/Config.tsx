import { Category } from '@main/db/entites/category'
import Content from '@renderer/components/Content'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'
import { useEffect, useState } from 'react'

// Config Page
export default function Config() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    window.api.findAllCategory().then((data) => {
      setCategories(data || [])
    })
  }, [])

  const onSearchChange = (val: string) => {
    const newCategories = categories.filter((item) => item.name.includes(val))
    const params = new Map<string, any>([['name', val]])
    window.api.findAllCategory(params).then((data) => {
      setCategories(data || [])
    })
    setCategories(newCategories)
  }

  return (
    <div className="w-screen h-screen bg-white p-4">
      <Tabs defaultValue="content" className="w-full h-full">
        <TabsList>
          <TabsTrigger value="content">内容</TabsTrigger>
          <TabsTrigger value="shortcut">快捷键</TabsTrigger>
        </TabsList>
        <TabsContent value="content">
          <div className="w-48 flex" style={{ height: 'calc(100vh - 5rem)' }}>
            <Content categories={categories} onSearchChange={onSearchChange} />
          </div>
        </TabsContent>
        <TabsContent value="shortcut">Change your password here.</TabsContent>
      </Tabs>
    </div>
  )
}
