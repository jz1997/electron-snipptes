import { cn } from '@renderer/utils/utils'
import React from 'react'
import ResultItem from './ResultItem'
import useCodeSelect from '@renderer/hooks/useCodeSelect'

export interface ResultProps extends React.HTMLAttributes<HTMLDivElement> {
}

const Result: React.FC<ResultProps> = ({ className, ...props }) => {
  const { result, currentIndex, handleMouseSelect } = useCodeSelect()

  return (
    <>
      {result && result.length > 0 && (
        <div className={cn('w-full p-3 bg-white  text-slate-700 text-base', className)} {...props}>
          {result.map((item, index) => {
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
