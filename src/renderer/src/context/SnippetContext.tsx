import { SnippetsType } from '@renderer/data/snippets'
import { createContext, Dispatch, SetStateAction, useState } from 'react'

export interface SnippetContextProps {
  snippets: SnippetsType[]
  setSnippets: Dispatch<SetStateAction<SnippetsType[]>>
}

export const SnippetContext = createContext<SnippetContextProps>({
  snippets: [],
  setSnippets: () => {}
})

interface Props {
  children: React.ReactNode
}

export const SnippetProvider = ({ children }: Props) => {
  const [snippets, setSnippets] = useState<SnippetsType[]>([])
  return (
    <SnippetContext.Provider value={{ snippets, setSnippets }}>{children}</SnippetContext.Provider>
  )
}
