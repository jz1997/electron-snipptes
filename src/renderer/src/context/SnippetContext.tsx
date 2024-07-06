import { SnippetsType } from '@renderer/data/snippets'
import { createContext, Dispatch, SetStateAction } from 'react'

export interface SnippetContextProps {
  snippets: SnippetsType[]
  setSnippets: Dispatch<SetStateAction<SnippetsType[]>>
}

export const SnippetContext = createContext<SnippetContextProps>({
  snippets: [],
  setSnippets: () => {}
})
