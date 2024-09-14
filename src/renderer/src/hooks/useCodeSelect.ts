import { useEffect, useRef, useState } from 'react'
import { useStore } from '@renderer/store'
import { Content } from '@main/db/entites/content'

export default () => {
  const resultRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const { result, setResult, searchValue, setSearchValue } = useStore((state) => {
    return {
      result: state.result,
      setResult: state.setResult,
      searchValue: state.searchValue,
      setSearchValue: state.setSearchValue
    }
  })

  const copyToClipboard = (result: Content) => {
    navigator.clipboard.writeText(result.content).then(() => {
      // close window
      window.api.hideWindow()
    })
    afterSelect()
  }

  const afterSelect = () => {
    setResult([])
    setCurrentIndex(0)
    setSearchValue('')
  }

  const scrollToActive = (index) => {
    if (!resultRef.current) {
      return
    }
    const elements: HTMLCollectionOf<Element> =
      resultRef.current.getElementsByClassName('result-item')
    if (!elements || elements.length === 0) {
      return
    }

    elements[index].scrollIntoView({
      behavior: 'smooth'
    })
  }

  const handleKeyEvent = (e: KeyboardEvent) => {
    e.stopPropagation()
    if (!result || result.length == 0) {
      return
    }

    switch (e.code) {
      case 'ArrowDown':
        setCurrentIndex((pre) => {
          const nextIndex = pre + 1 > result.length - 1 ? 0 : pre + 1
          scrollToActive(nextIndex)
          return nextIndex
        })
        break
      case 'ArrowUp':
        setCurrentIndex((pre) => {
          const nextIndex = pre - 1 < 0 ? result.length - 1 : pre - 1
          scrollToActive(nextIndex)
          return nextIndex
        })
        break
      case 'ArrowRight':
        break
      case 'Digit1':
        if (e.altKey) {
          window.electron.ipcRenderer.send('open-link-in-browser', result[currentIndex].content)
          window.electron.ipcRenderer.send('hide-window')
        }
        break
      case 'Digit2':
        if (e.altKey) {
          copyToClipboard(result[currentIndex])
        }
        break
      case 'Enter':
        copyToClipboard(result[currentIndex])
        break
    }
  }

  // 鼠标选中
  const handleMouseSelect = (result: Content, index: number) => {
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
    resultRef,
    currentIndex,
    handleMouseSelect,
    searchValue
  }
}
