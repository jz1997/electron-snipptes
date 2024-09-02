import { Result } from '@main/db/entites/common'
import { Content } from '@main/db/entites/content'
import ContentForm from '@renderer/components/ContentForm'
import HeaderBar from '@renderer/components/HeaderBar'
import useMessage from '@renderer/hooks/useMessage'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function EditContent() {
  const { successMsg, errorMsg } = useMessage()

  const { id } = useParams()
  const [content, setContent] = useState<Content>()

  useEffect(() => {
    if (id) {
      window.api.findContentById(parseInt(id)).then((result: Result<Content>) => {
        if (result.success) {
          setContent(result.data)
        }
      })
    }
  }, [])

  const onSubmit = (content: Content) => {
    window.api.updateContent(content).then((result: Result<boolean>) => {
      if (result.success) {
        successMsg({ description: '更新内容成功' })
      } else {
        errorMsg({ description: result.message || '更新内容失败' })
      }
    })
  }
  return (
    <>
      <HeaderBar title="编辑内容" />
      <ContentForm onSubmit={onSubmit} content={content} />
    </>
  )
}
