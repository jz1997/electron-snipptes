import { Category } from '@main/db/entites/category'
import { Toaster } from '@renderer/components/ui/toaster'
import { Result } from '@main/db/entites/common'
import CategoryForm from '@renderer/components/CategoryForm'
import useMessage from '@renderer/hooks/useMessage'
import HeaderBar from '@renderer/components/HeaderBar'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function EditCategory() {
  const { successMsg, errorMsg } = useMessage()
  const [category, setCategory] = useState<Category>()

  const { id } = useParams()
  useEffect(() => {
    if (id) {
      window.api.findCategoryById(parseInt(id)).then((result: Result<Category>) => {
        if (result.success) {
          setCategory(result.data)
        } else {
          errorMsg({ description: result.message || '获取分类失败' })
        }
      })
    }
  }, [])

  function onSubmit(values: any) {
    const category: Category = {
      ...values
    }
    window.api.updateCategory(category).then((result: Result<boolean>) => {
      if (result.success) {
        successMsg({ description: '更新分类成功' })
      } else {
        errorMsg({ description: result.message || '更新分类失败' })
      }
    })
  }

  return (
    <>
      <HeaderBar title="编辑分类" />
      <div className="p-4">
        <CategoryForm onSubmit={onSubmit} category={category} />

        {/* Toast */}
        <Toaster />
      </div>
    </>
  )
}
