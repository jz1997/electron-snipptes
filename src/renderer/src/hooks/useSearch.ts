import { KeyboardEvent, useEffect, useState } from 'react'
import { useStore } from '@renderer/store'
import { Result } from '@main/db/entites/common'
import { Content, ContentType, parseContentType } from '@main/db/entites/content'
import { CommandType } from '@main/manager/command'
import useMessage from './useMessage'
import { EverythingFile, EverythingResponse } from '@main/api/everything'
import { parseCommand } from '../../../common/utils/command-utils'
import AbstractCommand from '@main/manager/abstract-command'

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
  const [currentCommand, setCurrentCommand] = useState<AbstractCommand<any, any> | null>(null)

  useEffect(() => {
    const command: CommandType | undefined = parseCommand((searchValue || '').toUpperCase())
    window.api.getCommand(command).then((res) => {
      setCurrentCommand(res)
    })
  }, [searchValue])

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
      } else if (command === CommandType.SEARCH) {
        setResult([])
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

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      return false
    } else if (e.key === 'Enter') {
      const command: CommandType | undefined = parseCommand(searchValue || '')
      if (command === CommandType.SEARCH) {
        const keyword: string = searchValue.substring(CommandType.SEARCH.length + 1)
        window.api.doCommand(CommandType.SEARCH, keyword).then(() => {})
        window.api.hideWindow()
      }
    } else if (e.key === 'Backspace') {
      if (searchValue.trim().toUpperCase() === currentCommand?.command) {
        setCurrentCommand(null)
        setSearchValue('')
      }
    }
    return true
  }

  const formatSearchValue = (): string => {
    if (!searchValue) {
      return ''
    }

    if (!currentCommand) {
      return searchValue
    }

    if (
      searchValue.startsWith(currentCommand.command.toUpperCase()) ||
      searchValue.startsWith(currentCommand.command.toLowerCase())
    ) {
      return searchValue.substring(currentCommand.command.length + 1)
    }

    return searchValue ?? ''
  }

  return {
    onKeyDown,
    currentCommand,
    onChange,
    searchValue,
    setSearchValue,
    formatSearchValue
  }
}
