import { Category } from '@main/db/entites/category'
import { Toaster } from '@renderer/components/ui/toaster'
import { Result } from '@main/db/entites/common'
import CategoryForm from '@renderer/components/CategoryForm'
import useMessage from '@renderer/hooks/useMessage'

export default function EditCategory() {
  const { successMsg, errorMsg } = useMessage()

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
    <div className="p-4">
      <CategoryForm onSubmit={onSubmit} />

      {/* Toast */}
      <Toaster />
    </div>
  )
}
