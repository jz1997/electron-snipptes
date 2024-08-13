import { useEffect, useRef } from 'react'
import Result from './components/Result'
import Search from './components/Search'
import { SnippetProvider } from './context/SnippetContext'
import { Toaster } from './components/ui/toaster'

function App(): JSX.Element {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // mainRef.current?.addEventListener('mouseover', (e: MouseEvent) => {
    //   e.stopPropagation()
    //   // 取消鼠标穿透
    //   window.electron.ipcRenderer.send('set-ignore-mouse-events', false)
    // })

    // document.body?.addEventListener('mouseover', (e: MouseEvent) => {
    //   e.stopPropagation()
    //   // 设置鼠标穿透
    //   window.electron.ipcRenderer.send('set-ignore-mouse-events', true, { forward: true })
    // })
  }, [])

  return (
    <>
      <SnippetProvider>
        <main ref={mainRef} className="w-full p-2">
          <div className="drag bg-transparent h-[1rem]"></div>
          <div className="flex w-full flex-col shadow-md border border-gray-300 rounded-lg overflow-hidden">
            <Search />
            <Result className={'-mt-2'} />
          </div>
        </main>
      </SnippetProvider>

      <Toaster />
    </>
  )
}

export default App
