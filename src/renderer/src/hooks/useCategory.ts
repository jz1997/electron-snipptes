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

  const addCategory = (c: Category) => {
    window.api.insertCategory(c).then((result: Result<boolean>) => {
      if (!result.success) {
        errorMsg({ description: result.message || '添加分类失败' })
        return
      }
      successMsg({ description: '添加分类成功' })
      getCategories()
    })
  }

  const editCategory = (c: Category) => {
    window.api.updateCategory(c).then((result: Result<boolean>) => {
      if (!result.success) {
        errorMsg({ description: result.message || '更新分类失败' })
        return
      }
      successMsg({ description: '更新分类成功' })
      getCategories()
    })
  }

  const deleteCategory = async (id: bigint | number) => {
    const deletedCategories = categories.filter((item) => item.id === id)
    if (deletedCategories.length === 0) {
      errorMsg({ description: '分类不存在' })
      return
    }

    const toDeleteCategory = deletedCategories[0]

    if (toDeleteCategory.id === -1) {
      errorMsg({ description: '默认分类不能删除' })
      return
    }

    if (!toDeleteCategory.id) {
      errorMsg({ description: '分类不存在' })
      return
    }

    const removeResult = await window.api.removeCategory(toDeleteCategory.id)
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
