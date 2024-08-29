import React from 'react'
import { Input } from './ui/input'
import { cn } from '@renderer/utils/utils'
import useSearch from '@renderer/hooks/useSearch'
import { SettingOne } from '@icon-park/react'
import useSetting from '@renderer/hooks/useSetting'

interface SearchProps extends React.HTMLAttributes<HTMLDivElement> {}

const Search: React.FC<SearchProps> = ({ className, ...props }) => {
  const { onKeyDown, onChange, searchValue } = useSearch()
  const { openSettingModal } = useSetting()

  return (
    <div
      className={cn('w-full p-3 bg-white flex flex-row items-center gap-x-2', className)}
      {...props}
    >
      <Input
        value={searchValue}
        className="no-drag"
        onKeyDown={onKeyDown}
        onChange={onChange}
        autoFocus={true}
      />
      <SettingOne
        className=" cursor-pointer"
        fill={'gray'}
        size={24}
        onClick={openSettingModal}
      ></SettingOne>
    </div>
  )
}

export default Search
