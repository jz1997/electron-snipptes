import { KeyboardEvent } from 'react'
import { useStore } from '@renderer/store'
import { Result } from '@main/db/entites/common'
import { Content, ContentType, parseContentType } from '@main/db/entites/content'
import { AbstractCommand, CommandType } from '@main/manager/command'
import useMessage from './useMessage'
import { EverythingFile, EverythingResponse } from '@main/api/everything'
import { parseCommand } from '../../../common/utils/command-utils'

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

  const onChange = async (value: string) => {
    setSearchValue(value)
    const command: CommandType | undefined = parseCommand(value || '')
    if (command) {
      if (command === CommandType.FIND_FILE) {
        const fileName = value.substring(CommandType.FIND_FILE.length + 1)
        window.api
          .doCommand(CommandType.FIND_FILE, {
            s: fileName,
            c: 100
          })
          .then((result: Result<EverythingResponse>) => {
            if (result.success) {
              const results = (result.data?.results || []).map((file: EverythingFile): Content => {
                return {
                  title: file.name,
                  content: file.path,
                  type: parseContentType(file.type)
                }
              })
              setResult(results)
            } else {
              errorMsg({ description: result.message })
            }
          })
      }
    } else {
      const commands = await window.electron.ipcRenderer.invoke('get-command-list', value)
      let results: Array<Content> = commands.map((command) => {
        return {
          title: command.command,
          content: command.name,
          type: ContentType.COMMAND
        } as Content
      })

      const params = new Map<string, any>([['title', value]])
      const contentResult: Result<Content[]> = await window.api.findAllContent(params)
      if (contentResult.success && contentResult.data && contentResult.data.length > 0) {
        results = results.concat(contentResult.data)
      }

      setResult(results)
    }
  }

  const doSearch = () => {
    const value: string = searchValue
    if (value === undefined || value === '') {
      setResult([])
      return
    }

    // 如果是命令
    if (value.toUpperCase().startsWith(CommandType.FIND_FILE)) {
      const fileName = value.substring(CommandType.FIND_FILE.length + 1)
      window.api
        .doCommand(CommandType.FIND_FILE, {
          s: fileName,
          c: 100
        })
        .then((result: Result<EverythingResponse>) => {
          if (result.success) {
            const results = (result.data?.results || []).map((file: EverythingFile): Content => {
              return {
                title: file.name,
                content: file.path,
                type: parseContentType(file.type)
              }
            })
            setResult(results)
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
