import { useEffect, useRef } from 'react'
import Result from '@renderer/components/Result'
import Search from '@renderer/components/Search'
import Error from '@renderer/components/Error'
import { Toaster } from '@renderer/components/ui/toaster'
import useKeymap from '@renderer/hooks/useKeymap'
import { KeymapType } from '@main/manager/keymap'

function Home(): JSX.Element {
  const mainRef = useRef<HTMLDivElement>(null)
  const { register } = useKeymap()
  useEffect(() => {
    register(KeymapType.SHOW_HIDE_WINDOW, 'CommandOrControl+Shift+;')
  }, [])

  useEffect(() => {
    mainRef.current?.addEventListener('mouseover', (e: MouseEvent) => {
      e.stopPropagation()
      // 取消鼠标穿透
      window.electron.ipcRenderer.send('set-ignore-mouse-events', false)
    })
    document.body?.addEventListener('mouseover', (e: MouseEvent) => {
      e.stopPropagation()
      // 设置鼠标穿透
      window.electron.ipcRenderer.send('set-ignore-mouse-events', true, { forward: true })
    })
  }, [])

  return (
    <>
      <main ref={mainRef} className="w-full p-2">
        <div className="drag bg-transparent h-[1rem]"></div>
        <div className="flex w-full flex-col shadow-md border border-gray-300 rounded-lg overflow-hidden">
          <Error />
          <Search />
          <Result className={'-mt-2'} />
        </div>
      </main>

      <Toaster />
    </>
  )
}

export default Home
