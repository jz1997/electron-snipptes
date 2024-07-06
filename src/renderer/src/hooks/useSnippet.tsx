import { SnippetContext, SnippetContextProps } from '@renderer/context/SnippetContext'
import { useContext } from 'react'

export function useSnippet() {
  const context: SnippetContextProps = useContext(SnippetContext)
  return context
}
