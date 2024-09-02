import { Category } from '@main/db/entites/category'
import { Toaster } from '@renderer/components/ui/toaster'
import { Result } from '@main/db/entites/common'
import CategoryForm from '@renderer/components/CategoryForm'
import useMessage from '@renderer/hooks/useMessage'
import HeaderBar from '@renderer/components/HeaderBar'

export default function AddCategory() {
  const { successMsg, errorMsg } = useMessage()
  function onSubmit(values: any) {
    const category: Category = {
      ...values
    }
    window.api.insertCategory(category).then((result: Result<boolean>) => {
      if (result.success) {
        successMsg({ description: '添加分类成功' })
      } else {
        errorMsg({ description: result.message || '添加分类失败' })
      }
    })
  }

  return (
    <>
      <HeaderBar title='添加分类' />
      <div className="p-4">
        <CategoryForm onSubmit={onSubmit} />

        {/* Toast */}
        <Toaster />
      </div>
    </>
  )
}
