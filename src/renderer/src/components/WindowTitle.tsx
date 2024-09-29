import { Close, Minus, SettingConfig } from '@icon-park/react'
import useSetting from '@renderer/hooks/useSetting'
import { cn } from '@renderer/utils/utils'

export interface WindowTitleProps {
  title?: string
}

export default function WindowTitle({ title = '' }: WindowTitleProps) {
  const { openSettingModal } = useSetting()

  return (
    <div className="drag w-full flex flex-row gap-x-2 items-start border-b h-6 shrink-0">
      <div className="flex justify-between items-center gap-x-2 nodrag">
        <div
          className=" rounded-full bg-red-500 flex justify-center items-center h-4 w-4 cursor-pointer shrink-0"
          onClick={() => window.electron.ipcRenderer.send('hide-window')}
        >
          <Close size={10} className={cn('text-transparent hover:text-white')} />
        </div>
        <div
          className=" rounded-full bg-green-500 flex justify-center items-center h-4 w-4 cursor-pointer shrink-0"
          onClick={() => window.electron.ipcRenderer.send('minimize-window')}
        >
          <Minus size={10} className={cn('text-transparent hover:text-white')} />
        </div>
      </div>

      <div className="text-gray-700 flex-1 text-sm truncate text-center">{title}</div>
      <div className="flex flex-row items-center gap-x-2 nodrag">
        <div
          className="p-1 rounded-md hover:bg-slate-200 cursor-pointer"
          onClick={() => openSettingModal()}
        >
          <SettingConfig size={14} color="#333" />
        </div>
      </div>
    </div>
  )
}
