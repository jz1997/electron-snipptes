import { ChangeEvent, KeyboardEvent } from 'react'
import { snippets as mockSnippets } from '@renderer/data/snippets'
import { useStore } from '@renderer/store'

export default () => {
  const setResult = useStore((state) => state.setResult)
  const { searchValue, setSearchValue } = useStore((state) => {
    return {
      searchValue: state.searchValue,
      setSearchValue: state.setSearchValue
    }
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.target.value
    setSearchValue(value)
    if (value === undefined || value === '') {
      setResult([])
      return
    }
    const filteredSnippets = mockSnippets.filter(
      (snippet) => snippet.content && snippet.content.toLowerCase().includes(value.toLowerCase())
    )
    setResult(filteredSnippets)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      return false
    }
    return true
  }

  return {
    onKeyDown,
    onChange,
    searchValue
  }
}
