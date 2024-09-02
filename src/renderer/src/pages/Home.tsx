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

  const rootMouseEnter = (e: MouseEvent) => {
    // 取消鼠标穿透
    window.electron.ipcRenderer.send('set-ignore-mouse-events', false)
  }

  const rootMouseLeave = (e: MouseEvent) => {
    // 设置鼠标穿透
    window.electron.ipcRenderer.send('set-ignore-mouse-events', true, { forward: true })
  }

  useEffect(() => {
    document.getElementById('root')?.addEventListener('mouseenter', rootMouseEnter)
    document.getElementById('root')?.addEventListener('mouseleave', rootMouseLeave)

    return () => {
      document.getElementById('root')?.removeEventListener('mouseenter', rootMouseEnter)
      document.getElementById('root')?.removeEventListener('mouseleave', rootMouseLeave)
    }
  }, [])

  return (
    <>
      <main ref={mainRef} className="w-full p-2">
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
