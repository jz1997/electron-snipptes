import { cn } from '@renderer/utils/utils'
import React from 'react'
import ResultItem from './ResultItem'
import useCodeSelect from '@renderer/hooks/useCodeSelect'
import { ScrollArea } from './ui/scroll-area'

export interface ResultProps extends React.HTMLAttributes<HTMLDivElement> {}

const Result: React.FC<ResultProps> = ({ className, ...props }) => {
  const { result, resultRef, currentIndex, handleMouseSelect } = useCodeSelect()

  return (
    <>
      <div className="bg-white w-full h-full flex flex-col justify-between relative">
        {result && result.length > 0 && (
          <>
            <ScrollArea
              ref={resultRef}
              className={cn(
                'w-full flex-1 bg-white text-slate-700 text-base overflow-y-auto no-scrollbar mb-8',
                className
              )}
            >
              {result.map((item, index) => {
                return (
                  <ResultItem
                    className='result-item'
                    onClick={(item) => handleMouseSelect(item, index)}
                    isActive={currentIndex === index}
                    key={index}
                    item={item}
                  />
                )
              })}
            </ScrollArea>
            <div className="absolute bg-slate-100 bottom-0 left-0 h-7 w-full px-2 flex flex-row shrink-0 items-center text-xs text-gray-500 gap-x-2 rounded-md">
              <span>浏览器打开[alt+1]</span>
              <span>复制内容[alt+2]</span>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Result
