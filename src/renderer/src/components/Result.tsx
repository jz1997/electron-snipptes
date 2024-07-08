import { useSnippet } from '@renderer/hooks/useSnippet'
import { cn } from '@renderer/utils/utils'
import React, { useEffect, useState } from 'react'
import ResultItem from './ResultItem'

interface ResultProps extends React.HTMLAttributes<HTMLDivElement> {}

const Result: React.FC<ResultProps> = ({ className, ...props }) => {
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
  return (
    <>
      {snippets && snippets.length > 0 && (
        <div className={cn('w-full p-3 bg-white  text-slate-700 text-base', className)} {...props}>
          {snippets.map((item, index) => {
            return <ResultItem isActive={currentIndex === index} key={index} item={item} />
          })}
        </div>
      )}
    </>
  )
}

export default Result
