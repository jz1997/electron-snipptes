import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { cn } from '@renderer/utils/utils'
import useSearch from '@renderer/hooks/useSearch'

export interface SearchHandle {
  focus: () => void
  blur: () => void
  clear: () => void
}

interface SearchProps extends React.HTMLAttributes<HTMLDivElement> { }

const Search = forwardRef<SearchHandle, SearchProps>(
  ({ className, ...props }: SearchProps, ref) => {
    const { onKeyDown, onChange, searchValue, setSearchValue, currentCommand, formatSearchValue } = useSearch()
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
        {
          currentCommand &&
          <div className="h-10 bg-neutral-800 rounded-md leading-10 px-4 text-center text-nowrap text-white text-sm">
            {currentCommand.name}
          </div>
        }

        {
          !currentCommand &&
          <input
            ref={inputRef}
            value={searchValue}
            className="w-full outline-none border h-10 rounded-md px-2 text-md focus:border-gray-600 focus:border-2 text-gray-800"
            onKeyDown={onKeyDown}
            autoFocus={true}
            onChange={(e) => onChange(e.target.value)}
          />
        }
        {
          currentCommand &&
          <input
            ref={inputRef}
            value={formatSearchValue()}
            className="w-full outline-none border h-10 rounded-md px-2 text-md focus:border-gray-600 focus:border-2 text-gray-800"
            onKeyDown={onKeyDown}
            autoFocus={true}
            onChange={(e) => onChange(currentCommand.command + " " + e.target.value)}
          />
        }
      </div>
    )
  }
)

export default Search
