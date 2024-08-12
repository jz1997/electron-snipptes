import { SnippetsType } from '@renderer/data/snippets'
import { createContext, Dispatch, SetStateAction, useState } from 'react'

export interface SnippetContextProps {
  snippets: SnippetsType[]
  setSnippets: Dispatch<SetStateAction<SnippetsType[]>>
  searchValue: string
  setSearchValue: Dispatch<SetStateAction<string>>
}

export const SnippetContext = createContext<SnippetContextProps>({
  snippets: [],
  searchValue: '',
  setSnippets: () => {},
  setSearchValue: () => {}
})

interface Props {
  children: React.ReactNode
}

export const SnippetProvider = ({ children }: Props) => {
  const [snippets, setSnippets] = useState<SnippetsType[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  return (
    <SnippetContext.Provider value={{ snippets, setSnippets, searchValue, setSearchValue }}>{children}</SnippetContext.Provider>
  )
}
