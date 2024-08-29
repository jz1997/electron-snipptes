import { Result } from '@main/db/entites/common'
import { Content } from '@main/db/entites/content'
import { useToast } from '@renderer/components/ui/use-toast'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStateWithCallbackLazy } from 'use-state-with-callback'
import useMessage from './useMessage'

export interface ContentParams {
  title?: string
  categoryId?: number | bigint
}

export default () => {
  const [contents, setContents] = useState<Content[]>([])
  const [params, setParams] = useStateWithCallbackLazy<ContentParams>({})
  const navigate = useNavigate()
  const { successMsg, errorMsg } = useMessage()
  const paramsToMap = (params: ContentParams = {}): Map<string, any> => {
    return new Map<string, any>(Object.entries(params))
  }

  const getContents = () => {
    getContentWithParams(params)
  }

  const getContentWithParams = (contentParams: ContentParams) => {
    window.api.findAllContent(paramsToMap(contentParams)).then((result: Result<Content[]>) => {
      if (result.success) {
        setContents(result.data || [])
      }
    })
  }

  const updateCateoryParamsAndFetch = (categoryId?: number | bigint) => {
    if (categoryId && categoryId >= 0) {
      setParams({ ...params, categoryId }, (currentParams: ContentParams) => {
        console.log(currentParams)
        getContentWithParams(currentParams)
      })
    } else {
      setParams({ ...params, categoryId: undefined }, (currentParams: ContentParams) => {
        console.log(currentParams)
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
    navigate('/config/content/add')
  }

  const onEditContent = (c: Content) => {
    navigate(`/config/content/edit/${c.id}`)
  }

  const onRemoveContent = (c: Content) => {
    window.api.removeContent(c.id).then((result: Result<boolean>) => {
      if (result.success) {
        successMsg({ description: '删除成功' })
        getContents()
      } else {
        errorMsg({ description: result.message || '删除失败' })
      }
    })
  }

  return {
    contents,
    setParams,
    updateCateoryParamsAndFetch,
    setContents,
    getContents,
    onSearch,
    onAddContent,
    onEditContent,
    onRemoveContent
  }
}
