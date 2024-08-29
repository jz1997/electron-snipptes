import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { PlusIcon } from 'lucide-react'

export interface InputButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onButtonClick?: () => void
}

export default function InputButtonGroup({
  onInputChange = (e) => {},
  onButtonClick = () => {}
}: InputButtonGroupProps) {
  return (
    <div className="w-full flex flex-row justify-between items-center gap-x-2 shrink-0">
      <Input placeholder="Search" className="h-10" onInput={onInputChange}></Input>
      <Button size="sm" onClick={onButtonClick}>
        <PlusIcon />
      </Button>
    </div>
  )
}
