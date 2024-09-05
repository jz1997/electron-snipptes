import { Content } from '@main/db/entites/content'
import { create } from 'zustand'

export const useStore = create<{
  result: Content[]
  setResult: (val: Content[]) => void
  searchValue: string
  setSearchValue: (val: string) => void
  error: string
  setError: (val: string) => void
  articleUpdateFlag: boolean
  setArticleUpdateFlag: (val: boolean) => void
}>((set) => ({
  result: [],
  setResult: (newResult) => set({ result: newResult || [] }),
  searchValue: '',
  setSearchValue: (newSearchValue) => set({ searchValue: newSearchValue || '' }),
  error: '',
  setError: (newError) => set({ error: newError || '' }),
  articleUpdateFlag: false,
  setArticleUpdateFlag: (newFlag) => set({ articleUpdateFlag: newFlag || false })
}))
