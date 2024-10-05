import { useEffect, useRef } from 'react'
import Result from '@renderer/components/Result'
import Search from '@renderer/components/Search'
import { Toaster } from '@renderer/components/ui/toaster'
import useKeymap from '@renderer/hooks/useKeymap'
import { KeymapType } from '@main/manager/keymap'
import useHomeKeydown from '@renderer/hooks/useHomeKeydown'
import { useStore } from '@renderer/store'
import WindowTitle from '@renderer/components/WindowTitle'

function Home(): JSX.Element {
  const mainRef = useRef<HTMLDivElement>(null)
  const { addKeydownEventHandler, removeKeydownEventHandler } = useHomeKeydown()
  const { register } = useKeymap()
  const { setResult, setSearchValue } = useStore((state) => {
    return {
      setResult: state.setResult,
      setSearchValue: state.setSearchValue
    }
  })
  useEffect(() => {
    register(KeymapType.SHOW_HIDE_WINDOW, 'CommandOrControl+Shift+;')
    register(KeymapType.QUICK_SAVE, 'CommandOrControl+Shift+I')
  }, [])

  useEffect(() => {
    addKeydownEventHandler()
    return () => {
      removeKeydownEventHandler()
    }
  }, [])

  useEffect(() => {
    window.electron.ipcRenderer.on('reset', (_event, _arg) => {
      setResult([])
      setSearchValue('')
    })
    return () => window.electron.ipcRenderer.removeAllListeners('reset')
  }, [])

  return (
    <>
      <main ref={mainRef} className="w-screen h-screen p-4">
        <div className="w-full h-full flex flex-col p-2 overflow-hidden rounded-lg shadow-[0_2px_10px] shadow-gray-400 bg-white">
          <WindowTitle />
          <div className="w-full flex flex-1 flex-col h-0 mt-2 border-gray-300 overflow-hidden">
            <Search />
            <div className="flex-1 h-0 mt-2">
              <Result />
            </div>
          </div>
        </div>
      </main>

      <Toaster />
    </>
  )
}

export default Home
