import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { Input } from './ui/input'
import { cn } from '@renderer/utils/utils'
import useSearch from '@renderer/hooks/useSearch'
import { SettingOne } from '@icon-park/react'
import useSetting from '@renderer/hooks/useSetting'

export interface SearchHandle {
  focus: () => void
  blur: () => void
  clear: () => void
}

interface SearchProps extends React.HTMLAttributes<HTMLDivElement> {}

const Search = forwardRef<SearchHandle, SearchProps>(
  ({ className, ...props }: SearchProps, ref) => {
    const { onKeyDown, onChange, searchValue, setSearchValue } = useSearch()
    const inputRef = React.useRef<HTMLInputElement>(null)

    const focusInput = () => {
      inputRef.current?.focus()
    }
    const clearInput = () => {
      setSearchValue('')
    }

    useEffect(() => {
      window.electron.ipcRenderer.on('search-input-focus', focusInput)

      return () => {
        window.electron.ipcRenderer.removeAllListeners('search-input-focus')
      }
    }, [])

    useImperativeHandle(ref, () => {
      return {
        focus: () => {
          focusInput()
        },
        blur: () => {
          inputRef.current?.blur()
        },
        clear: () => {
          clearInput()
        }
      }
    })

    return (
      <div
        className={cn('w-full bg-white flex flex-row items-center gap-x-2', className)}
        {...props}
      >
        <input
          ref={inputRef}
          value={searchValue}
          className="w-full outline-none border h-12 rounded-md px-2 text-md focus:border-gray-600 focus:border-2 text-gray-800"
          onKeyDown={onKeyDown}
          onChange={onChange}
          autoFocus={true}
        />
      </div>
    )
  }
)

export default Search
