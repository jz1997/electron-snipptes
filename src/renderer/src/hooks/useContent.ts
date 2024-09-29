import { Result } from '@main/db/entites/common'
import { Content } from '@main/db/entites/content'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStateWithCallbackLazy } from 'use-state-with-callback'
import useMessage from './useMessage'
import useConfirm from './useConfirm'

export interface ContentParams {
  title?: string
  categoryId?: number | bigint
}

export interface UseContentParams {
  cid: number | bigint
}

export default ({ cid }: UseContentParams) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [contents, setContents] = useState<Content[]>([])
  const [params, setParams] = useStateWithCallbackLazy<ContentParams>({})
  const navigate = useNavigate()
  const { successMsg, errorMsg } = useMessage()
  const [activeId, setActiveId] = useState<number | bigint | undefined>(-1)
  const { confirm } = useConfirm()
  const paramsToMap = (params: ContentParams = {}): Map<string, any> => {
    return new Map<string, any>(Object.entries(params))
  }

  const getContents = () => {
    getContentWithParams(params)
  }

  const getContentWithParams = (contentParams: ContentParams) => {
    const paramsMap = paramsToMap(contentParams)
    if (paramsMap.get('categoryId') == -1) {
      paramsMap.set('categoryId', undefined)
    }
    setLoading(false)
    window.api
      .findAllContent(paramsMap)
      .then((result: Result<Content[]>) => {
        if (result.success) {
          setContents(result.data || [])
        }
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 200)
      })
  }

  const updateCateoryParamsAndFetch = (categoryId?: number | bigint) => {
    if (categoryId && categoryId >= 0) {
      setParams({ ...params, categoryId }, (currentParams: ContentParams) => {
        getContentWithParams(currentParams)
      })
    } else {
      setParams({ ...params, categoryId: undefined }, (currentParams: ContentParams) => {
        getContentWithParams(currentParams)
      })
    }
  }

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setParams({ ...params, title: value }, (currentParams: ContentParams) => {
      getContentWithParams(currentParams)
    })
  }

  const onAddContent = () => {
    navigate(`/config/content/categories/${cid}/contents/-1`)
  }

  const onEditContent = (c: Content) => {
    navigate(`/config/content/edit/${c.id}`)
  }

  const onContentClick = (c: Content) => {
    setActiveId(c.id || -1)
    navigate(`/config/content/categories/${cid}/contents/${c.id}`)
  }

  const onDeleteContent = (id: number | bigint) => {
    if (id === -1) {
      errorMsg({ description: '请选择要删除的内容' })
      return
    }

    confirm('系统提示', '确定要删除该条内容吗？', {
      onConfirm: () => {
        window.api.removeContent(id).then((result: Result<boolean>) => {
          if (result.success) {
            successMsg({ description: '删除成功' })
            getContents()
            if (activeId === id) {
              navigate(`/config/content/categories/${cid}/contents/-1`)
            }
          } else {
            errorMsg({ description: result.message || '删除失败' })
          }
        })
      }
    })
  }

  const saveOrUpdateContent = (content: Content) => {
    if (content.id) {
      window.api.updateContent(content).then((result: Result<boolean>) => {
        if (result.success) {
          successMsg({ description: '更新内容成功' })
        } else {
          errorMsg({ description: result.message || '更新内容失败' })
        }
      })
    } else {
      window.api.insertContent(content).then((result: Result<boolean>) => {
        if (result.success) {
          successMsg({ description: '添加内容成功' })
        } else {
          errorMsg({ description: result.message || '添加内容失败' })
        }
      })
    }
  }

  return {
    contents,
    activeId,
    setActiveId,
    setParams,
    updateCateoryParamsAndFetch,
    setContents,
    getContents,
    onSearch,
    onAddContent,
    onEditContent,
    onDeleteContent,
    onContentClick,
    loading,
    setLoading,
    saveOrUpdateContent
  }
}
