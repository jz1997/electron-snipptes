import { useConfirmStore } from '@renderer/store/useConfirmStore'

export interface ConfirmOptions {
  onConfirm?: () => void
  onCancel?: () => void
}

export default () => {
  const { setOpen, setTitle, setContent, setOnConfirm, setOnCancel } = useConfirmStore(
    (state) => state
  )

  const confirm = (title: string, content: string, options?: ConfirmOptions) => {
    const { onConfirm = () => {}, onCancel = () => {} } = options || {}
    setTitle(title)
    setContent(content)
    setOnConfirm(onConfirm)
    setOnCancel(onCancel)
    setOpen(true)
  }
  return {
    confirm
  }
}
