import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Input } from './ui/input'
import { useSnippet } from '@renderer/hooks/useSnippet'
import { snippets as mockSnippets } from '@renderer/data/snippets'

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  const [search, setSearch] = useState('')
  const { setSnippets } = useSnippet()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.target.value
    setSearch(value)
    if (value === undefined || value === '') {
      setSnippets([])
      return
    }
    const filteredSnippets = mockSnippets.filter(
      (snippet) => snippet.content && snippet.content.toLowerCase().includes(value.toLowerCase())
    )
    setSnippets(filteredSnippets)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      return false
    }
    return true;
  }

  return (
    <div className={'w-full p-3 drag bg-white '}>
      <Input onKeyDown={onKeyDown} onChange={onChange} />
    </div>
  )
}

export default Search
