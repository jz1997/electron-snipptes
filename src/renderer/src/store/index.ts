import { create } from 'zustand'
import { SnippetsType } from '@renderer/data/snippets'

export const useStore = create<{
    result: SnippetsType[]
    setResult: (val: SnippetsType[]) => void
    searchValue: string
    setSearchValue: (val: string) => void
}>((set) => ({
    result: [],
    setResult: (newResult) => set({ result: newResult || [] }),
    searchValue: '',
    setSearchValue: (newSearchValue) => set({ searchValue: newSearchValue || '' }),
}))