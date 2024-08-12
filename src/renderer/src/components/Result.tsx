import { cn } from '@renderer/utils/utils'
import React from 'react'
import ResultItem from './ResultItem'
import useCodeSelect from '@renderer/hooks/useCodeSelect'
import { SnippetsType } from '@renderer/data/snippets'

export interface ResultProps extends React.HTMLAttributes<HTMLDivElement> {
  onResultSelect?: (result: SnippetsType) => void;
}

const Result: React.FC<ResultProps> = ({ className, ...props }) => {
  const { snippets, currentIndex, handleMouseSelect } = useCodeSelect(props)

  return (
    <>
      {snippets && snippets.length > 0 && (
        <div className={cn('w-full p-3 bg-white  text-slate-700 text-base', className)} {...props}>
          {snippets.map((item, index) => {
            return (
              <ResultItem
                onClick={item => handleMouseSelect(item, index)}
                isActive={currentIndex === index}
                key={index}
                item={item}
              />
            )
          })}
        </div>
      )}
    </>
  )
}

export default Result
