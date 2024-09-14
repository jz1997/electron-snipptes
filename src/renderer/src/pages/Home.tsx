import { useEffect, useRef } from 'react'
import Result from '@renderer/components/Result'
import Search from '@renderer/components/Search'
import Error from '@renderer/components/Error'
import { Toaster } from '@renderer/components/ui/toaster'
import useKeymap from '@renderer/hooks/useKeymap'
import { KeymapType } from '@main/manager/keymap'
import useHomeKeydown from '@renderer/hooks/useHomeKeydown'
import { Close, More, SettingConfig } from '@icon-park/react'
import { cn } from '@renderer/utils/utils'
import { ipcRenderer } from 'electron'
import { useStore } from '@renderer/store'
import useSetting from '@renderer/hooks/useSetting'

function Home(): JSX.Element {
  const mainRef = useRef<HTMLDivElement>(null)
  const { addKeydownEventHandler, removeKeydownEventHandler } = useHomeKeydown()
  const { openSettingModal } = useSetting()
  const { register } = useKeymap()
  const { setResult, setSearchValue } = useStore((state) => {
    return {
      setResult: state.setResult,
      setSearchValue: state.setSearchValue
    }
  })
  useEffect(() => {
    register(KeymapType.SHOW_HIDE_WINDOW, 'CommandOrControl+Shift+;')
  }, [])

  useEffect(() => {
    addKeydownEventHandler()
    return () => {
      removeKeydownEventHandler()
    }
  }, [])

  useEffect(() => {
    window.electron.ipcRenderer.on('reset', (event, arg) => {
      setResult([])
      setSearchValue('')
    })
    return () => window.electron.ipcRenderer.removeAllListeners('reset')
  }, [])

  // const rootMouseEnter = () => {
  //   // 取消鼠标穿透
  //   window.electron.ipcRenderer.send('set-ignore-mouse-events', false)
  // }

  // const rootMouseLeave = () => {
  //   // 设置鼠标穿透
  //   window.electron.ipcRenderer.send('set-ignore-mouse-events', true, { forward: true })
  // }

  // useEffect(() => {
  //   document.getElementById('root')?.addEventListener('mouseenter', rootMouseEnter)
  //   document.getElementById('root')?.addEventListener('mouseleave', rootMouseLeave)

  //   return () => {
  //     document.getElementById('root')?.removeEventListener('mouseenter', rootMouseEnter)
  //     document.getElementById('root')?.removeEventListener('mouseleave', rootMouseLeave)
  //   }
  // }, [])

  return (
    <>
      <main ref={mainRef} className="w-screen h-screen p-4">
        <div className="w-full h-full flex flex-col p-2 overflow-hidden rounded-lg shadow-[0_2px_10px] shadow-[rgba(0, 0, 0, 0.1)] bg-white">
          <div className="drag w-full flex flex-row gap-x-2 items-start border-b h-6 shrink-0">
            <div
              className="nodrag rounded-full bg-red-500 flex justify-center items-center h-4 w-4 cursor-pointer shrink-0"
              onClick={() => window.electron.ipcRenderer.send('hide-window')}
            >
              <Close size={10} className={cn('text-transparent hover:text-white')} />
            </div>
            <div className="text-gray-700 flex-1 text-sm truncate text-center"></div>
            <div className="flex flex-row items-center gap-x-2 nodrag">
              <div className="p-1 rounded-md hover:bg-slate-200 cursor-pointer">
                <SettingConfig size={14} color="#333" onClick={() => openSettingModal()} />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-1 flex-col h-0 mt-2 border-gray-300 overflow-hidden">
            <Error />
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
