import { Category } from '@main/db/entites/category'
import { Result } from '@main/db/entites/common'
import { toast } from '@renderer/components/ui/use-toast'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [activeId, setActiveId] = useState<number | bigint>(-1)
  const navigate = useNavigate()

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

  const editCategory = (c: Category) => {
    navigate('/config/category/edit/' + c.id)
  }

  const deleteCategory = (c: Category) => {
    window.api.removeCategory(c.id).then((result: Result<boolean>) => {
      if (result.success) {
        toast({
          title: '操作提示',
          description: '已删除分类'
        })
        getCategories()
      }
    })
  }

  return {
    activeId,
    setActiveId,
    categories,
    getCategories,
    onSearchChange,
    addCategory,
    editCategory,
    deleteCategory
  }
}
