import { useState } from 'react'
import Result from './components/Result'
import Search from './components/Search'
import { SnippetsType } from './data/snippets'
import { SnippetContext } from './context/SnippetContext'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const [snippets, setSnippets] = useState<SnippetsType[]>([])

  return (
    <>
      <SnippetContext.Provider value={{ snippets, setSnippets }}>
        <div className='w-full p-1'>
          <div className="flex w-full flex-col shadow-md rounded-lg overflow-hidden">
            <Search />
            <Result className={'-mt-2'} />
          </div>
        </div>
      </SnippetContext.Provider>
    </>
  )
}

export default App
