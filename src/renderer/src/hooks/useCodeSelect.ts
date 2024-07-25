import { useEffect, useState } from "react"
import { useSnippet } from "./useSnippet"

export default () => {
    const { snippets } = useSnippet()
    const [currentIndex, setCurrentIndex] = useState(0)

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
                navigator.clipboard.writeText(snippets[currentIndex].content)
                break
        }
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
        snippets, currentIndex
    }
}