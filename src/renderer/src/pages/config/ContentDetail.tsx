import { InternalExpansion } from '@icon-park/react'
import { Result } from '@main/db/entites/common'
import { Content } from '@main/db/entites/content'
import useMessage from '@renderer/hooks/useMessage'
import { useStore } from '@renderer/store'
import { DEFAULT_CATEGORY_ID } from '@renderer/utils/const'
import { parseNumber } from '@renderer/utils/string'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import useStateWithCallback, { useStateWithCallbackLazy } from 'use-state-with-callback'

export interface ContentDetailProps {
  afterUpdate?: () => void
  afterInsert?: () => void
}

export default function ContentDetail({}: ContentDetailProps) {
  const { cid, id } = useParams()
  const [content, setContent] = useStateWithCallbackLazy<Content>({
    id: id ? parseNumber(id) : undefined,
    title: '',
    content: '',
    categoryId: cid ? parseNumber(cid) : DEFAULT_CATEGORY_ID,
    createAt: new Date()
  })
  const { errorMsg } = useMessage()
  const setArticleUpdateFlag = useStore((state) => state.setArticleUpdateFlag)

  useEffect(() => {
    if (id) {
      window.api.findContentById(parseInt(id)).then((result: Result<Content>) => {
        if (result.success && result.data) {
          setContent(result.data, () => {})
        } else {
          errorMsg({ description: result.message || '获取内容失败' })
        }
      })
    }
  }, [id])

  const updateContent = (content: Content) => {
    if (content.id) {
      window.api.updateContent(content).then((result: Result<boolean>) => {
        if (result.success) {
          // successMsg({ description: result.message || '更新内容成功' })
          setArticleUpdateFlag(true)
        } else {
          errorMsg({ description: result.message || '更新内容失败' })
        }
      })
    } else {
      window.api.insertContent(content).then((result: Result<boolean>) => {
        if (result.success) {
          // successMsg({ description: result.message || '新增内容成功' })
          setArticleUpdateFlag(true)
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
        defaultValue={content?.title}
        onInput={(e) => {
          setContent({ ...(content || {}), title: e.currentTarget.value }, (currentContent) => {
            if (currentContent) {
              updateContent(currentContent)
            }
          })
        }}
      ></input>

      <textarea
        defaultValue={content?.content}
        className="w-full h-full mt-2 p-2 resize-none outline-none"
        onInput={(e) => {
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
