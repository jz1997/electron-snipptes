import { Content } from '@main/db/entites/content'
import ContentForm, { ContentFormHandle } from '@renderer/components/ContentForm'
import HeaderBar from '@renderer/components/HeaderBar'
import { Button } from '@renderer/components/ui/button'
import { Toaster } from '@renderer/components/ui/toaster'
import useContent from '@renderer/hooks/useContent'
import { INVALID_ID } from '@renderer/utils/const'
import { MouseEvent, useEffect, useRef, useState } from 'react'

export default function QuickSave() {
  const [content, setContent] = useState<string | undefined>()
  const { saveOrUpdateContent } = useContent({ cid: INVALID_ID })
  const formRef = useRef<ContentFormHandle>(null)

  useEffect(() => {
    navigator.clipboard.readText().then((data) => {
      setContent(data || '')
    })
  }, [])

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    formRef.current?.submit().then((values: Content) => {
      saveOrUpdateContent(values)
    })
  }
  return (
    <>
      <HeaderBar title="新增内容" showBack={false} />
      <div className="page-container">
        <ContentForm ref={formRef} content={{ content: content }} />
        <div className="flex flex-row justify-start items-center mt-4 gap-x-4">
          <Button onClick={onSubmit}>提交</Button>
        </div>
      </div>

      <Toaster />
    </>
  )
}
