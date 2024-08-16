import { useEffect, useState } from "react"
import { ResultItemType } from "@renderer/components/ResultItem"
import { useStore } from "@renderer/store"

export default () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const { result, setResult, searchValue, setSearchValue } = useStore(state => {
        return {
            result: state.result,
            setResult: state.setResult,
            searchValue: state.searchValue,
            setSearchValue: state.setSearchValue
        }
    })

    const copyToClipboard = (result: ResultItemType) => {
        navigator.clipboard.writeText(result.content).then(() => {
            // close window
            window.api.hideWindow()
        })
        afterSelect()
    }

    const afterSelect = () => {
        setResult([])
        setCurrentIndex(0)
        setSearchValue("")
    }

    const handleKeyEvent = (e: KeyboardEvent) => {
        if (!result || result.length == 0) {
            return
        }
        switch (e.code) {
            case 'ArrowDown':
                setCurrentIndex((pre) => (pre + 1 > result.length - 1 ? 0 : pre + 1))
                break
            case 'ArrowUp':
                setCurrentIndex((pre) => (pre - 1 < 0 ? result.length - 1 : pre - 1))
                break
            case 'Enter':
                copyToClipboard(result[currentIndex])
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
    }, [result, currentIndex])

    useEffect(() => {
        setCurrentIndex(0)
    }, [result])


    return {
        result,
        currentIndex,
        handleMouseSelect,
        searchValue
    }
}