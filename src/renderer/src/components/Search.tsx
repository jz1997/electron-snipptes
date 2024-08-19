import React from 'react'
import { Input } from './ui/input'
import { cn } from '@renderer/utils/utils'
import useSearch from '@renderer/hooks/useSearch'
import { SettingOne } from '@icon-park/react'

interface SearchProps extends React.HTMLAttributes<HTMLDivElement> {}

const Search: React.FC<SearchProps> = ({ className, ...props }) => {
  const { onKeyDown, onChange, searchValue } = useSearch()

  return (
    <div className={cn('w-full p-3 bg-white flex flex-row items-center gap-x-2', className)} {...props}>
      <Input value={searchValue} className="no-drag focus-visible:ring-slate-200 h-8" onKeyDown={onKeyDown} onChange={onChange} autoFocus={true} />
      <SettingOne className=' cursor-pointer' fill={'gray'}  size={24}></SettingOne>
    </div>
  )
}

export default Search
