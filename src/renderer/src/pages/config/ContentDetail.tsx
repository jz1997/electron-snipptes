import { Result } from '@main/db/entites/common'
import { Content } from '@main/db/entites/content'
import useMessage from '@renderer/hooks/useMessage'
import { useStore } from '@renderer/store'
import { DEFAULT_CATEGORY_ID } from '@renderer/utils/const'
import { parseNumber } from '@renderer/utils/string'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStateWithCallbackLazy } from 'use-state-with-callback'

export interface ContentDetailProps {
  afterUpdate?: () => void
  afterInsert?: () => void
}

export default function ContentDetail() {
  const { cid, id } = useParams()
  const [content, setContent] = useStateWithCallbackLazy<Content>({
    id: id ? parseNumber(id) : -1,
    title: '',
    content: '',
    categoryId: cid ? parseNumber(cid) : DEFAULT_CATEGORY_ID,
    createAt: new Date()
  })
  const { errorMsg } = useMessage()
  const { setContentChangeState } = useStore((state) => {
    return {
      setContentChangeState: state.setContentChangeState
    }
  })
  const navigate = useNavigate()
  useEffect(() => {
    if (id && id !== '-1' && id !== 'undefined') {
      window.api.findContentById(parseInt(id)).then((result: Result<Content>) => {
        if (result.success && result.data) {
          setContent(result.data, () => {})
        } else {
          errorMsg({ description: result.message || '获取内容失败' })
        }
      })
    } else {
      setContent(
        {
          id: -1,
          title: '',
          content: '',
          categoryId: cid ? parseNumber(cid) : DEFAULT_CATEGORY_ID,
          createAt: new Date()
        },
        () => {}
      )
    }
  }, [id])

  const updateContent = (content: Content) => {
    if (content.id && content.id !== -1) {
      window.api.updateContent(content).then((result: Result<number | bigint>) => {
        if (result.success) {
          // successMsg({ description: result.message || '更新内容成功' })
          setContentChangeState({ flag: true, id: content.id })
        } else {
          errorMsg({ description: result.message || '更新内容失败' })
        }
      })
    } else {
      window.api.insertContent(content).then((result: Result<number | bigint>) => {
        if (result.success) {
          navigate(`/config/content/categories/${cid}/contents/${result.data}`)
          setContentChangeState({ flag: true, id: result.data })
        } else {
          errorMsg({ description: result.message || '新增内容失败' })
        }
      })
    }
  }

  return (
    <div className="pl-2 w-full h-full flex flex-col">
      <input
        className="w-full h-14 text-2xl font-bold outline-none border-b"
        value={content?.title}
        placeholder="标题"
        onChange={(e) => {
          setContent({ ...(content || {}), title: e.currentTarget.value }, (currentContent) => {
            if (currentContent) {
              updateContent(currentContent)
            }
          })
        }}
      ></input>

      <textarea
        value={content?.content}
        className="w-full h-full mt-2 py-2 resize-none outline-none"
        placeholder="内容"
        onChange={(e) => {
          setContent({ ...(content || {}), content: e.currentTarget.value }, (currentContent) => {
            if (currentContent) {
              updateContent(currentContent)
            }
          })
        }}
      ></textarea>
    </div>
  )
}
