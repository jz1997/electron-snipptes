// 文字显示 双击变成 input 组件

import { cn } from '@renderer/utils/utils'
import { Input } from './ui/input'
import React, { useRef, useState } from 'react'

export interface InputTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  active?: boolean
  onTextClick?: (text: string) => void
  onInputEnterKeyDown?: (text: string) => void
  onInputBlur?: (text: string) => void
}

export default function InputText({
  text = '',
  active = false,
  onTextClick = () => {},
  onInputEnterKeyDown = () => {},
  onInputBlur = () => {}
}: InputTextProps) {
  const [showInput, setShowInput] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div className="w-full">
      {showInput && (
        <div className="w-full flex flex-row justify-between items-center gap-x-2 px-1">
          <Input
            ref={inputRef}
            defaultValue={text}
            className="h-9"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                setShowInput(false)
                const newName = e.currentTarget.value
                inputRef?.current?.blur()
                onInputEnterKeyDown?.(newName)
              }
            }}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
              setShowInput(false)
              const newTxet = e.currentTarget.value
              onInputBlur?.(newTxet)
            }}
          />
        </div>
      )}
      {!showInput && (
        <div
          className={cn(
            'w-full text-sm cursor-pointer flex-1 flex justify-between items-center hover:bg-slate-200 px-2 py-2 rounded-md',
            active && 'bg-slate-200'
          )}
          onClick={() => onTextClick(text)}
          onDoubleClick={() => {
            setShowInput(true)
            inputRef?.current?.focus()
          }}
        >
          <span className="w-full truncate">{text}</span>
        </div>
      )}
    </div>
  )
}
