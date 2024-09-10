import { ChangeEvent, KeyboardEvent } from 'react'
import { useStore } from '@renderer/store'
import { Result } from '@main/db/entites/common'
import { Content } from '@main/db/entites/content'

export default () => {
  const setResult = useStore((state) => state.setResult)
  const { searchValue, setSearchValue } = useStore((state) => {
    return {
      searchValue: state.searchValue,
      setSearchValue: state.setSearchValue,
      result: (state) => state.result,
      setResult: (state) => state.setResult
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

    const params = new Map<string, any>([['title', value]])
    window.api.findAllContent(params).then((r: Result<Content[]>) => {
      if (r.success && r.data) {
        setResult(r.data)
      } else {
        setResult([])
      }
    })
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
