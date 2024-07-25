import { useEffect, useRef } from 'react'
import Result from './components/Result'
import Search from './components/Search'
import { SnippetProvider } from './context/SnippetContext'

function App(): JSX.Element {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mainRef.current?.addEventListener('mouseover', (e: MouseEvent) => {
      e.stopPropagation()
      window.electron.ipcRenderer.send('set-ignore-mouse-events', false)
    })

    document.body?.addEventListener('mouseover', (e: MouseEvent) => {
      e.stopPropagation()
      window.electron.ipcRenderer.send('set-ignore-mouse-events', true, { forward: true })
    })
  }, [])

  return (
    <>
      <SnippetProvider>
        <main ref={mainRef} className="w-full p-1 bg-red-200">
          <div className="drag bg-transparent h-[1rem]"></div>
          <div className="flex w-full flex-col shadow-md rounded-lg overflow-hidden">
            <Search />
            <Result className={'-mt-2'} />
          </div>
        </main>
      </SnippetProvider>
    </>
  )
}

export default App