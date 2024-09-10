import { Delete, Editor, FolderPlus, Refresh } from '@icon-park/react'
import { cn } from '@renderer/utils/utils'

export interface ContentToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  refreshDisable?: boolean
  addDisable?: boolean
  editDisable?: boolean
  deleteDisable?: boolean
  showRefresh?: boolean
  showAdd?: boolean
  showEdit?: boolean
  showDelete?: boolean
  onRefreshClick?: () => void
  onAddClick?: () => void
  onEditClick?: () => void
  onDeleteClick?: () => void
}

export default function ContentToolbar({
  onRefreshClick,
  onAddClick,
  onEditClick,
  onDeleteClick,
  className,
  showRefresh = true,
  showAdd = true,
  showEdit = true,
  showDelete = true,
  refreshDisable = false,
  addDisable = false,
  editDisable = false,
  deleteDisable = false,
  ...props
}: ContentToolbarProps) {
  const handleRefreshClick = () => {
    if (refreshDisable) {
      return
    }
    onRefreshClick?.()
  }

  const handleAddClick = () => {
    if (addDisable) {
      return
    }
    onAddClick?.()
  }

  const handleEditClick = () => {
    if (editDisable) {
      return
    }
    onEditClick?.()
  }

  const handleDeleteClick = () => {
    if (deleteDisable) {
      return
    }
    onDeleteClick?.()
  }

  return (
    <div
      className={cn('w-full flex justify-center items-center gap-x-1 border-t pt-2', className)}
      {...props}
    >
      {showRefresh && (
        <Refresh
          theme="outline"
          size="20"
          className={cn(
            'p-1 text-gray-800 hover:bg-slate-200 rounded-md cursor-pointer',
            refreshDisable && 'cursor-not-allowed text-gray-400'
          )}
          onClick={handleRefreshClick}
        />
      )}

      {showAdd && (
        <FolderPlus
          size={20}
          className={cn(
            'p-1 text-gray-800 hover:bg-slate-200 rounded-md cursor-pointer',
            addDisable && 'cursor-not-allowed text-gray-400'
          )}
          onClick={handleAddClick}
        />
      )}

      {showEdit && (
        <Editor
          theme="outline"
          size={20}
          className={cn(
            'p-1 text-gray-800 hover:bg-slate-200 rounded-md cursor-pointer',
            editDisable && 'cursor-not-allowed text-gray-400'
          )}
          onClick={handleEditClick}
        />
      )}

      {showDelete && (
        <Delete
          theme="outline"
          size={20}
          className={cn(
            'p-1 text-red-500 hover:bg-slate-200 rounded-md cursor-pointer',
            deleteDisable && 'cursor-not-allowed text-gray-400'
          )}
          onClick={handleDeleteClick}
        />
      )}
    </div>
  )
}
