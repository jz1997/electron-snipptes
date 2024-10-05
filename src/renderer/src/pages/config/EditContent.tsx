import { Result } from '@main/db/entites/common'
import { Content } from '@main/db/entites/content'
import ContentForm from '@renderer/components/ContentForm'
import HeaderBar from '@renderer/components/HeaderBar'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function EditContent() {
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

  return (
    <>
      <HeaderBar title="编辑内容" />
      <ContentForm content={content} />
    </>
  )
}
