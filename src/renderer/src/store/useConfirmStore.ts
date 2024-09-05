import { create } from 'zustand'

export const useConfirmStore = create<{
  title: string
  content: string
  open: boolean
  setOpen: (val: boolean) => void
  setTitle: (val: string) => void
  setContent: (val: string) => void
  onConfirm: () => void
  setOnConfirm: (val: () => void) => void
  onCancel: () => void
  setOnCancel: (val: () => void) => void
}>((set) => ({
  title: '',
  content: '',
  open: false,
  setOpen: (open: boolean) => set({ open }),
  setTitle: (title: string) => set({ title }),
  setContent: (content: string) => set({ content }),
  onConfirm: () => {},
  setOnConfirm: (onConfirm: () => void) => set({ onConfirm }),
  onCancel: () => {},
  setOnCancel: (onCancel: () => void) => set({ onCancel })
}))
