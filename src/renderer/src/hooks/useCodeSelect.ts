import { useEffect, useRef, useState } from 'react'
import { useStore } from '@renderer/store'
import { Content, ContentOpenType, ContentType } from '@main/db/entites/content'
import useClipboard from './useClipboard'
import useMessage from './useMessage'

export default () => {
  const resultRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const { writeText } = useClipboard()
  const { result, setResult, searchValue, setSearchValue } = useStore((state) => {
    return {
      result: state.result,
      setResult: state.setResult,
      searchValue: state.searchValue,
      setSearchValue: state.setSearchValue
    }
  })
  const { errorMsg } = useMessage()

  const openWithBrowser = (result: Content) => {
    window.electron.ipcRenderer.send('open-link-in-browser', result.content)
    window.electron.ipcRenderer.send('hide-window')
  }

  const openPath = (result: Content) => {
    if (!result.content) {
      errorMsg({ description: '无内容' })
      return
    }
    window.electron.ipcRenderer.send('open-path', result.content + '/' + result.title)
    window.electron.ipcRenderer.send('hide-window')
  }

  const copyToClipboard = (result: Content) => {
    writeText(result.content || '').then(() => {
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
      case 'Enter':
        const selectedResult = result[currentIndex]
        if (selectedResult.type === ContentType.COMMAND) {
          setSearchValue(selectedResult.title || '')
        } else {
          openWithDefaultType(selectedResult)
        }
        break
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
          openWithBrowser(result[currentIndex])
        }
        break
      case 'Digit2':
        if (e.altKey) {
          copyToClipboard(result[currentIndex])
        }
        break
    }
  }

  // 根据打开方式打开
  const openWithDefaultType = (result: Content) => {
    if (result.defaultOpenType) {
      switch (result.defaultOpenType) {
        case ContentOpenType.COPY_TO_CLIPBOARD:
          copyToClipboard(result)
          break
        case ContentOpenType.OPEN_WITH_BRAWSER:
          openWithBrowser(result)
          break
        default:
          copyToClipboard(result)
      }
    } else {
      switch (result.type) {
        case ContentType.FILE:
        case ContentType.FOLDER:
          openPath(result)
          break
        case ContentType.URL:
          openWithBrowser(result)
          break
        case ContentType.UNKNOWN:
        default:
          copyToClipboard(result)
      }
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
