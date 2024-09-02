import { Result } from '@main/db/entites/common'
import { Content } from '@main/db/entites/content'
import ContentForm from '@renderer/components/ContentForm'
import HeaderBar from '@renderer/components/HeaderBar'
import useMessage from '@renderer/hooks/useMessage'

export default function AddContent() {
  const { successMsg, errorMsg } = useMessage()

  const onSubmit = (content: Content) => {
    window.api.insertContent(content).then((result: Result<boolean>) => {
      if (result.success) {
        successMsg({ description: '添加内容成功' })
      } else {
        errorMsg({ description: result.message || '添加内容失败' })
      }
    })
  }
  return (
    <>
      <HeaderBar title="新增内容" />
      <ContentForm onSubmit={onSubmit} />
    </>
  )
}
