import { Content } from '@main/db/entites/content'
import { create } from 'zustand'

export interface ContentChangeState {
  id?: number | bigint
  flag: boolean
}

export interface AppState {
  result: Content[]
  setResult: (val: Content[]) => void
  searchValue: string
  setSearchValue: (val: string) => void
  error: string
  setError: (val: string) => void
  contentChangeState: ContentChangeState
  setContentChangeState: (newContentChangeState: ContentChangeState) => void
}

export const useStore = create<AppState>((set) => ({
  result: [],
  setResult: (newResult) => set({ result: newResult || [] }),
  searchValue: '',
  setSearchValue: (newSearchValue) => set({ searchValue: newSearchValue || '' }),
  error: '',
  setError: (newError) => set({ error: newError || '' }),
  contentChangeState: {
    flag: false
  },
  setContentChangeState: (newContentChangeState) =>
    set({ contentChangeState: newContentChangeState })
}))
