import { ChangeEvent, useState, KeyboardEvent } from "react"
import { useSnippet } from "./useSnippet"
import { snippets as mockSnippets } from '@renderer/data/snippets'


export default () => {
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
        return true
    }

    return {
        onKeyDown,
        onChange,
        search
    }
}