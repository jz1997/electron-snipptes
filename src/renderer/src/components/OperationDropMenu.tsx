import { More } from '@icon-park/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'

export interface OperationDropMenuProps {
  showEdit?: boolean
  onEditClick?: () => void
  showDelete?: boolean
  onDeleteClick?: () => void
}

export default function OperationDropMenu({
  showEdit = true,
  showDelete = true,
  onEditClick = () => {},
  onDeleteClick = () => {}
}: OperationDropMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={true}>
        <div className="cursor-pointer p-2 hover:bg-slate-200 rounded-md">
          <More className="" theme="outline" size="20" fill="#333" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {showEdit && (
          <DropdownMenuItem className="cursor-pointer" onClick={onEditClick}>
            编辑
          </DropdownMenuItem>
        )}
        {showDelete && (
          <DropdownMenuItem
            className="cursor-pointer text-red-500 focus:bg-accent focus:text-red-500"
            onClick={onDeleteClick}
          >
            删除
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
