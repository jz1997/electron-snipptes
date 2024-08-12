import { ChangeEvent, KeyboardEvent } from "react"
import { useSnippet } from "./useSnippet"
import { snippets as mockSnippets } from '@renderer/data/snippets'


export default () => {
    const { searchValue, setSearchValue, setSnippets } = useSnippet()

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const value = e.target.value
        setSearchValue(value)
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
        return true
    }

    return {
        onKeyDown,
        onChange,
        searchValue
    }
}