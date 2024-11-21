import { ChangeEvent, KeyboardEvent } from 'react'
import { useStore } from '@renderer/store'
import { Result } from '@main/db/entites/common'
import { Content, parseContentType } from '@main/db/entites/content'
import { CommandType } from '@main/manager/command'
import useMessage from './useMessage'
import { EverythingFile, EverythingResponse } from '@main/api/everything'

export default () => {
  const { errorMsg } = useMessage()
  const setResult = useStore((state) => state.setResult)
  const { searchValue, setSearchValue } = useStore((state) => {
    return {
      searchValue: state.searchValue,
      setSearchValue: state.setSearchValue,
      result: (state) => state.result,
      setResult: (state) => state.setResult
    }
  })

  const onChange = (value: string) => {
    setSearchValue(value)
    setResult([])
  }

  const doSearch = () => {
    const value: string = searchValue
    if (value === undefined || value === '') {
      setResult([])
      return
    }

    // 如果是命令
    if (value.startsWith(CommandType.FIND_FILE)) {
      const fileName = value.substring(CommandType.FIND_FILE.length + 1)
      window.api
        .doCommand(CommandType.FIND_FILE, {
          s: fileName,
          c: 100
        })
        .then((result: Result<EverythingResponse>) => {
          if (result.success) {
            console.log(result)
            const results = (result.data?.results || []).map((file: EverythingFile): Content => {
              return {
                title: file.name,
                content: file.path,
                type: parseContentType(file.type)
              }
            })
            setResult(results)
            console.log(results)
          } else {
            errorMsg({ description: result.message })
          }
        })
    } else {
      const params = new Map<string, any>([['title', value]])
      window.api.findAllContent(params).then((r: Result<Content[]>) => {
        if (r.success && r.data) {
          setResult(r.data)
        } else {
          setResult([])
        }
      })
    }
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      return false
    } else if (e.key === 'Enter') {
      doSearch()
    }
    return true
  }

  return {
    onKeyDown,
    onChange,
    searchValue,
    setSearchValue
  }
}
