import { useEffect, useState } from "react"
import { useSnippet } from "./useSnippet"
import { useToast } from "@renderer/components/ui/use-toast"
import { ResultItemType } from "@renderer/components/ResultItem"

export default () => {
    const { snippets } = useSnippet()
    const [currentIndex, setCurrentIndex] = useState(0)

    const copyToClipboard = (result: ResultItemType) => {
        navigator.clipboard.writeText(result.content)
        // close window
        window.api.hideWindow()
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

    const handleMouseSelect = (result: ResultItemType, index: number) => {
        setCurrentIndex(index)
        copyToClipboard(result)
    }


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
        snippets, currentIndex, handleMouseSelect
    }
}