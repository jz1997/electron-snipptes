import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@renderer/components/ui/dialog'
import CategoryForm, { CategoryFormHandle } from '../CategoryForm'
import { Button } from '../ui/button'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Category } from '@main/db/entites/category'
import { Domain } from 'domain'

export interface ModifyCategoryDialogProps {
  onSubmit?: (value: Category) => void
}

export interface ModifyCategoryDialogHandle {
  open: () => void
  close: () => void
}

const ModifyCategoryDialog = forwardRef<ModifyCategoryDialogHandle, ModifyCategoryDialogProps>(
  ({ onSubmit }: ModifyCategoryDialogProps, ref) => {
    const formRef = useRef<CategoryFormHandle>(null)
    const [open, setOpen] = useState<boolean>(false)

    useImperativeHandle(ref, () => {
      return {
        open: openDialog,
        close: closeDialog
      }
    })

    const openDialog = () => {
      setOpen(true)
    }

    const closeDialog = () => {
      setOpen(false)
    }

    const submitForm = () => {
      formRef.current?.submit().then((c: Category) => {
        onSubmit?.(c)
      })
    }

    return (
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新增分类</DialogTitle>
          </DialogHeader>
          <DialogDescription></DialogDescription>
          <CategoryForm ref={formRef} />
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              取消
            </Button>
            <Button onClick={submitForm}>提交</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
)

export default ModifyCategoryDialog
