import { More } from '@icon-park/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'
import { forwardRef, useImperativeHandle, useState } from 'react'

export interface ResultItemContextMenuHandle {
  open: () => void
  close: () => void
}

export interface ResultItemContextMenuProps {}

const ResultItemContextMenu = forwardRef<ResultItemContextMenuHandle, ResultItemContextMenuProps>(
  ({}: ResultItemContextMenuProps, ref) => {
    const [open, setOpen] = useState<boolean>(false)

    useImperativeHandle(ref, () => {
      return {
        open: () => setOpen(true),
        close: () => setOpen(false)
      }
    })

    return (
      <DropdownMenu open={open}>
        <DropdownMenuTrigger asChild={true}>
          <div className="flex justify-center items-center" onClick={() => setOpen(true)}>
            <div className="cursor-pointer p-2 hover:bg-slate-200 rounded-md">
              <More className="" theme="outline" size="20" fill="#333" />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          onKeyDown={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
        >
          <DropdownMenuItem className="cursor-pointer" onClick={() => setOpen(false)}>
            编辑
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-red-500 focus:bg-accent focus:text-red-500"
            onClick={() => setOpen(false)}
          >
            删除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)

export default ResultItemContextMenu
