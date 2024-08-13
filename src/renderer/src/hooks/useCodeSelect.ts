import { useEffect, useState } from "react"
import { useSnippet } from "./useSnippet"
import { ResultItemType } from "@renderer/components/ResultItem"

export default () => {
    const { snippets, setSnippets, setSearchValue, searchValue } = useSnippet()
    const [currentIndex, setCurrentIndex] = useState(0)

    const copyToClipboard = (result: ResultItemType) => {
        navigator.clipboard.writeText(result.content).then(() => {
            // close window
            window.api.hideWindow()
        })
        afterSelect()
    }

    const afterSelect = () => {
        setSnippets([])
        setCurrentIndex(0)
        setSearchValue("")
    }

    const handleKeyEvent = (e: KeyboardEvent) => {
        if (snippets.length == 0) {
            return
        }
        switch (e.code) {
            case 'ArrowDown':
                setCurrentIndex((pre) => (pre + 1 > snippets.length - 1 ? 0 : pre + 1))
                break
            case 'ArrowUp':
                setCurrentIndex((pre) => (pre - 1 < 0 ? snippets.length - 1 : pre - 1))
                break
            case 'Enter':
                copyToClipboard(snippets[currentIndex])
                break
        }
    }

    // 鼠标选中
    const handleMouseSelect = (result: ResultItemType, index: number) => {
        setCurrentIndex(index)
        copyToClipboard(result)
    }


    // 方向键选中
    useEffect(() => {
        document.addEventListener('keydown', handleKeyEvent)
        // clear keyboard event
        return () => {
            document.removeEventListener('keydown', handleKeyEvent)
        }
    }, [snippets, currentIndex])

    useEffect(() => {
        setCurrentIndex(0)
    }, [snippets])


    return {
        snippets,
        currentIndex,
        handleMouseSelect,
        searchValue
    }
}