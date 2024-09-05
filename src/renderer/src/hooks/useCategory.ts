import { Category } from '@main/db/entites/category'
import { Result } from '@main/db/entites/common'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useMessage from './useMessage'

export default () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [activeId, setActiveId] = useState<number | bigint>(-1)
  const navigate = useNavigate()
  const { errorMsg, successMsg } = useMessage()

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

  const deleteCategory = async (c: Category) => {
    const getResult: Result<Category> = await window.api.findCategoryByName(c.name)
    if (!getResult.success) {
      errorMsg({ description: getResult.message || '获取分类失败' })
    }
    if (!getResult.data) {
      errorMsg({ description: '分类已删除' })
      getCategories()
      return
    }

    const removeResult = await window.api.removeCategory(c.id)
    if (!removeResult.success) {
      errorMsg({ description: removeResult.message || '删除分类失败' })
      return
    }
    successMsg({ description: '删除分类成功' })
    getCategories()
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
