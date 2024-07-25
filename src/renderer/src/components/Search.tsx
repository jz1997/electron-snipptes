import React from 'react'
import { Input } from './ui/input'
import { cn } from '@renderer/utils/utils'
import useSearch from '@renderer/hooks/useSearch'

interface SearchProps extends React.HTMLAttributes<HTMLDivElement> {}

const Search: React.FC<SearchProps> = ({ className, ...props }) => {
  const { onKeyDown, onChange } = useSearch()

  return (
    <div className={cn('w-full p-3  bg-white ', className)} {...props}>
      <Input className="no-drag" onKeyDown={onKeyDown} onChange={onChange} />
    </div>
  )
}

export default Search
